export const EQUIPMENT_TYPES = [
  { value: "koparka", label: "Koparka" },
  { value: "minikoparka", label: "Minikoparka" },
  { value: "ladowarka", label: "Ładowarka" },
  { value: "koparko-ladowarka", label: "Koparko-ładowarka" },
  { value: "dzwig", label: "Dźwig" },
  { value: "podnosnik", label: "Podnośnik" },
  { value: "walec", label: "Walec" },
  { value: "zageszczarka", label: "Zagęszczarka" },
  { value: "ladowarka-teleskopowa", label: "Ładowarka teleskopowa" },
  { value: "rusztowanie", label: "Rusztowanie" },
  { value: "agregat", label: "Agregat prądotwórczy" },
  { value: "inne", label: "Inne" },
] as const;

export type EquipmentType = (typeof EQUIPMENT_TYPES)[number]["value"];

export interface RentalRequest {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  equipment_type: string;
  description: string | null;
  city: string;
  start_date: string | null;
  end_date: string | null;
  status: "new" | "matched" | "closed";
  created_at: string;
}

export interface Owner {
  id: string;
  email: string;
  phone: string;
  company_name: string;
  contact_person: string;
  city: string;
  nip: string | null;
  verified: boolean;
  created_at: string;
}

export interface Listing {
  id: string;
  owner_id: string;
  equipment_type: string;
  manufacturer: string | null;
  model: string | null;
  year: number | null;
  description: string | null;
  daily_rate: number | null;
  location_city: string;
  available: boolean;
  photo_url: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  request_id: string;
  owner_id: string;
  listing_id: string | null;
  status: "sent" | "viewed" | "responded";
  sent_at: string;
  viewed_at: string | null;
  responded_at: string | null;
  // Joined data
  request?: RentalRequest;
  owner?: Owner;
}
