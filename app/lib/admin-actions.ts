"use server";

import { getServiceClient } from "./admin-data";
import { revalidatePath } from "next/cache";
import { notifyOwnerLead } from "./email";

export async function sendLead(formData: FormData) {
  const request_id = formData.get("request_id") as string;
  const owner_id = formData.get("owner_id") as string;

  if (!request_id || !owner_id) {
    throw new Error("Missing request_id or owner_id");
  }

  const db = getServiceClient();

  const { data: lead, error } = await db
    .from("leads")
    .insert({ request_id, owner_id })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  // Mark request as matched
  await db
    .from("requests")
    .update({ status: "matched" })
    .eq("id", request_id);

  // Get owner email and request details for notification
  const [ownerRes, requestRes] = await Promise.all([
    db.from("owners").select("email").eq("id", owner_id).single(),
    db.from("requests").select("equipment_type, city").eq("id", request_id).single(),
  ]);

  if (ownerRes.data && requestRes.data) {
    notifyOwnerLead(
      ownerRes.data.email,
      lead.id,
      requestRes.data.equipment_type,
      requestRes.data.city
    ).catch(() => {});
  }

  revalidatePath("/admin");
}

export async function closeRequest(formData: FormData) {
  const request_id = formData.get("request_id") as string;
  const db = getServiceClient();

  await db
    .from("requests")
    .update({ status: "closed" })
    .eq("id", request_id);

  revalidatePath("/admin");
}
