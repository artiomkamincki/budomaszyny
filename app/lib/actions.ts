"use server";

import { getServiceClient } from "./supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { notifyNewRequest, notifyOwnerWelcome } from "./email";

export async function submitRentalRequest(formData: FormData) {
  const supabase = getServiceClient();
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
  const supabase = getServiceClient();
  const company_name = formData.get("company_name") as string;
  const contact_person = formData.get("contact_person") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const city = formData.get("city") as string;
  const nip = (formData.get("nip") as string) || null;

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

  // Insert all machines
  const machineCount = parseInt(formData.get("machine_count") as string) || 1;

  const listings = [];
  for (let i = 0; i < machineCount; i++) {
    const equipment_type = formData.get(`equipment_type_${i}`) as string;
    if (!equipment_type) continue;

    listings.push({
      owner_id: owner.id,
      equipment_type,
      manufacturer: (formData.get(`manufacturer_${i}`) as string) || null,
      model: (formData.get(`model_${i}`) as string) || null,
      year: formData.get(`year_${i}`)
        ? parseInt(formData.get(`year_${i}`) as string)
        : null,
      daily_rate: formData.get(`daily_rate_${i}`)
        ? parseInt(formData.get(`daily_rate_${i}`) as string)
        : null,
      location_city:
        (formData.get(`location_city_${i}`) as string) || city,
    });
  }

  if (listings.length > 0) {
    const { error: listingError } = await supabase
      .from("listings")
      .insert(listings);

    if (listingError) throw new Error(listingError.message);
  }

  // Send welcome email with dashboard link (don't block redirect)
  notifyOwnerWelcome({ email, company_name, ownerId: owner.id }).catch(() => {});

  redirect(`/moje/${owner.id}`);
}

export async function addMachineToOwner(formData: FormData) {
  const supabase = getServiceClient();
  const owner_id = formData.get("owner_id") as string;
  const equipment_type = formData.get("equipment_type") as string;
  const manufacturer = (formData.get("manufacturer") as string) || null;
  const model = (formData.get("model") as string) || null;
  const year = formData.get("year")
    ? parseInt(formData.get("year") as string)
    : null;
  const daily_rate = formData.get("daily_rate")
    ? parseInt(formData.get("daily_rate") as string)
    : null;
  const location_city = (formData.get("location_city") as string) || null;

  if (!owner_id || !equipment_type) {
    throw new Error("Wypełnij wymagane pola");
  }

  const { error } = await supabase.from("listings").insert({
    owner_id,
    equipment_type,
    manufacturer,
    model,
    year,
    daily_rate,
    location_city,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/moje/${owner_id}`);
  redirect(`/moje/${owner_id}`);
}

export async function removeMachine(formData: FormData) {
  const supabase = getServiceClient();
  const listing_id = formData.get("listing_id") as string;
  const owner_id = formData.get("owner_id") as string;

  if (!listing_id || !owner_id) return;

  const { error } = await supabase
    .from("listings")
    .delete()
    .eq("id", listing_id)
    .eq("owner_id", owner_id);

  if (error) throw new Error(error.message);

  revalidatePath(`/moje/${owner_id}`);
  redirect(`/moje/${owner_id}`);
}
