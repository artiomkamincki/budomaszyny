"use server";

import { getServiceClient } from "./admin-data";
import { revalidatePath } from "next/cache";
import type { ProspectStatus } from "./types";

export async function addManualProspect(formData: FormData) {
  const db = getServiceClient();

  const company_name = (formData.get("company_name") as string) || null;
  const contact_person = (formData.get("contact_person") as string) || null;
  const phone = (formData.get("phone") as string) || null;
  const email = (formData.get("email") as string) || null;
  const city = (formData.get("city") as string) || null;
  const nip = (formData.get("nip") as string) || null;
  const equipment_description =
    (formData.get("equipment_description") as string) || null;
  const notes = (formData.get("notes") as string) || null;

  // Build dedup key from phone or NIP
  const dedup_key = phone
    ? normalizePhone(phone)
    : nip
      ? nip.replace(/\D/g, "")
      : null;

  const { error } = await db.from("prospects").insert({
    source: "manual",
    company_name,
    contact_person,
    phone,
    email,
    city,
    nip,
    equipment_description,
    notes,
    dedup_key,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/prospects");
}

export async function updateProspectStatus(formData: FormData) {
  const db = getServiceClient();
  const id = formData.get("prospect_id") as string;
  const status = formData.get("status") as ProspectStatus;

  if (!id || !status) return;

  const { error } = await db
    .from("prospects")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/prospects");
}

export async function updateProspectNotes(formData: FormData) {
  const db = getServiceClient();
  const id = formData.get("prospect_id") as string;
  const notes = formData.get("notes") as string;

  if (!id) return;

  const { error } = await db
    .from("prospects")
    .update({ notes, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/prospects");
}

export async function deleteProspect(formData: FormData) {
  const db = getServiceClient();
  const id = formData.get("prospect_id") as string;

  if (!id) return;

  const { error } = await db.from("prospects").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/prospects");
}

export async function sendOutreachEmail(formData: FormData) {
  const { Resend } = await import("resend");
  const { OUTREACH_TEMPLATES } = await import("./outreach-templates");

  const db = getServiceClient();
  const resend = new Resend(process.env.RESEND_API_KEY);

  const prospectId = formData.get("prospect_id") as string;
  const templateKey = (formData.get("template_key") as string) || "general";

  if (!prospectId) return;

  // Get prospect
  const { data: prospect } = await db
    .from("prospects")
    .select("*")
    .eq("id", prospectId)
    .single();

  if (!prospect || !prospect.email) {
    throw new Error("Prospect nie ma adresu email");
  }

  if (prospect.status === "rejected") {
    throw new Error("Prospect oznaczony jako rejected — nie wysyłamy");
  }

  // Check daily limit
  const today = new Date().toISOString().split("T")[0];
  const { count } = await db
    .from("outreach_logs")
    .select("*", { count: "exact", head: true })
    .eq("channel", "email")
    .gte("sent_at", `${today}T00:00:00`);

  if ((count ?? 0) >= 95) {
    throw new Error(`Dzienny limit email osiągnięty (${count}/100)`);
  }

  // Get template
  const template = OUTREACH_TEMPLATES[templateKey];
  if (!template) throw new Error(`Template "${templateKey}" not found`);

  const subject = template.subject(prospect);
  const html = template.body(prospect);

  // Send email
  const { data: emailResult, error: emailError } = await resend.emails.send({
    from: "BudoMaszyny <onboarding@resend.dev>",
    to: prospect.email,
    subject,
    html,
  });

  if (emailError) throw new Error(`Email error: ${emailError.message}`);

  // Log outreach
  await db.from("outreach_logs").insert({
    prospect_id: prospectId,
    channel: "email",
    template_key: templateKey,
    subject,
    resend_email_id: emailResult?.id ?? null,
  });

  // Update prospect status
  await db
    .from("prospects")
    .update({ status: "contacted", updated_at: new Date().toISOString() })
    .eq("id", prospectId);

  revalidatePath("/admin/prospects");
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").replace(/^48/, "").replace(/^0/, "");
}
