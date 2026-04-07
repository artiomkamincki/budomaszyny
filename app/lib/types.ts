// Equipment categories for the Polish construction market
export const EQUIPMENT_CATEGORIES = [
  {
    category: "Maszyny ziemne",
    types: [
      { value: "koparka-do-7t", label: "Koparka do 7 t" },
      { value: "koparka-powyzej-8t", label: "Koparka powyżej 8 t" },
      { value: "minikoparka", label: "Minikoparka" },
      { value: "koparko-ladowarka", label: "Koparko-ładowarka" },
      { value: "spycharka", label: "Spycharka / buldożer" },
      { value: "wozidlo-budowlane", label: "Wozidło budowlane" },
    ],
  },
  {
    category: "Ładowarki i transport",
    types: [
      { value: "ladowarka-kolowa", label: "Ładowarka kołowa (3–15 t)" },
      { value: "miniladowarka", label: "Miniładowarka (do 3 t)" },
      { value: "ladowarka-teleskopowa", label: "Ładowarka teleskopowa" },
      { value: "wozek-widlowy", label: "Wózek widłowy" },
    ],
  },
  {
    category: "Dźwigi i podnośniki",
    types: [
      { value: "dzwig-samojezdny", label: "Dźwig samojezdny" },
      { value: "zuraw-wiezowy", label: "Żuraw wieżowy" },
      { value: "podnosnik-koszowy", label: "Podnośnik koszowy" },
      { value: "podnosnik-nozycowy", label: "Podnośnik nożycowy" },
      { value: "dzwig-budowlany", label: "Dźwig budowlany / wyciąg" },
    ],
  },
  {
    category: "Maszyny drogowe",
    types: [
      { value: "walec-jednobbnowy", label: "Walec jednobębnowy (do gruntu)" },
      { value: "walec-dwubbnowy", label: "Walec dwubębnowy (do asfaltu)" },
      { value: "zageszczarka", label: "Zagęszczarka / ubijak" },
    ],
  },
  {
    category: "Zasilanie i ogrzewanie",
    types: [
      { value: "agregat-pradotworczy", label: "Agregat prądotwórczy" },
      { value: "kompresor", label: "Kompresor" },
      { value: "nagrzewnica", label: "Nagrzewnica / ogrzewanie" },
    ],
  },
  {
    category: "Lekki sprzęt budowlany",
    types: [
      { value: "betoniarka", label: "Betoniarka / wibrator / zacieraczka" },
      { value: "pompa", label: "Pompa (wodna / do betonu)" },
      { value: "spawarka", label: "Spawarka / agregat spawalniczy" },
      { value: "maszyna-tnaca", label: "Maszyna tnąca / piła" },
      { value: "osuszacz", label: "Osuszacz / oczyszczacz powietrza" },
      { value: "myjka-cisnieniowa", label: "Myjka ciśnieniowa" },
    ],
  },
  {
    category: "Wyposażenie budowy",
    types: [
      { value: "rusztowanie", label: "Rusztowanie" },
      { value: "szalunek", label: "Szalunek" },
      { value: "kontener-budowlany", label: "Kontener budowlany / biurowy" },
      { value: "ogrodzenie-budowlane", label: "Ogrodzenie budowlane" },
      { value: "drabina", label: "Drabina / podest" },
    ],
  },
] as const;

// Flat list for dropdowns and label lookup
export const EQUIPMENT_TYPES = EQUIPMENT_CATEGORIES.flatMap((c) =>
  c.types.map((t) => ({ value: t.value, label: t.label }))
);

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
