"use server";

import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import { notifyNewRequest } from "./email";

export async function submitRentalRequest(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = (formData.get("email") as string) || null;
  const company = (formData.get("company") as string) || null;
  const equipment_type = formData.get("equipment_type") as string;
  const description = (formData.get("description") as string) || null;
  const city = formData.get("city") as string;
  const start_date = (formData.get("start_date") as string) || null;
  const end_date = (formData.get("end_date") as string) || null;

  if (!name || !phone || !equipment_type || !city) {
    throw new Error("Wypełnij wymagane pola");
  }

  const { error } = await supabase.from("requests").insert({
    name,
    phone,
    email,
    company,
    equipment_type,
    description,
    city,
    start_date: start_date || null,
    end_date: end_date || null,
  });

  if (error) throw new Error(error.message);

  // Send email notification (don't block redirect on failure)
  notifyNewRequest({ equipment_type, city, name, phone, email, description }).catch(() => {});

  redirect("/szukam/dziekujemy");
}

export async function registerOwner(formData: FormData) {
  const company_name = formData.get("company_name") as string;
  const contact_person = formData.get("contact_person") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const city = formData.get("city") as string;
  const nip = (formData.get("nip") as string) || null;

  const equipment_type = formData.get("equipment_type") as string;
  const manufacturer = (formData.get("manufacturer") as string) || null;
  const model = (formData.get("model") as string) || null;
  const year = formData.get("year")
    ? parseInt(formData.get("year") as string)
    : null;
  const daily_rate = formData.get("daily_rate")
    ? parseInt(formData.get("daily_rate") as string)
    : null;
  const location_city = (formData.get("location_city") as string) || city;

  if (!company_name || !contact_person || !phone || !email || !city) {
    throw new Error("Wypełnij wymagane pola");
  }

  // Insert owner
  const { data: owner, error: ownerError } = await supabase
    .from("owners")
    .insert({ company_name, contact_person, phone, email, city, nip })
    .select("id")
    .single();

  if (ownerError) throw new Error(ownerError.message);

  // Insert listing if equipment type provided
  if (equipment_type) {
    const { error: listingError } = await supabase.from("listings").insert({
      owner_id: owner.id,
      equipment_type,
      manufacturer,
      model,
      year,
      daily_rate,
      location_city,
    });

    if (listingError) throw new Error(listingError.message);
  }

  redirect("/wynajmuje/dziekujemy");
}
