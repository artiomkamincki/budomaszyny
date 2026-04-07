"use server";

import { getServiceClient } from "./admin-data";
import { revalidatePath } from "next/cache";

export async function sendLead(formData: FormData) {
  const request_id = formData.get("request_id") as string;
  const owner_id = formData.get("owner_id") as string;

  if (!request_id || !owner_id) {
    throw new Error("Missing request_id or owner_id");
  }

  const db = getServiceClient();

  const { error } = await db.from("leads").insert({
    request_id,
    owner_id,
  });

  if (error) throw new Error(error.message);

  // Mark request as matched
  await db
    .from("requests")
    .update({ status: "matched" })
    .eq("id", request_id);

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
