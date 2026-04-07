/**
 * CEIDG Scraper — ищет фирмы по PKD 77.32.Z (wynajem maszyn budowlanych).
 *
 * Требует API key от https://dane.biznes.gov.pl
 * Задайте CEIDG_API_KEY в .env.local
 *
 * Запуск: npx tsx scripts/scrape-ceidg.ts
 */

import { supabase } from "./lib/supabase";
import { buildDedupKey, sleep } from "./lib/dedup";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env.local") });

const API_KEY = process.env.CEIDG_API_KEY;
const BASE_URL = "https://dane.biznes.gov.pl/api/ceidg/v2/firmy";
const PKD_CODE = "77.32.Z"; // Wynajem i dzierżawa maszyn budowlanych

const VOIVODESHIPS = [
  "dolnośląskie",
  "kujawsko-pomorskie",
  "lubelskie",
  "lubuskie",
  "łódzkie",
  "małopolskie",
  "mazowieckie",
  "opolskie",
  "podkarpackie",
  "podlaskie",
  "pomorskie",
  "śląskie",
  "świętokrzyskie",
  "warmińsko-mazurskie",
  "wielkopolskie",
  "zachodniopomorskie",
];

interface CeidgFirma {
  id: string;
  nazwa: string;
  wlasciciel?: {
    imie?: string;
    nazwisko?: string;
  };
  adresGlownegoMiejscaWykonywaniaDzialalnosci?: {
    miasto?: string;
    wojewodztwo?: string;
  };
  adresDoPoreczenstw?: {
    email?: string;
    telefon?: string;
  };
  nip?: string;
  regon?: string;
}

async function fetchPage(
  voivodeship: string,
  page: number
): Promise<{ firms: CeidgFirma[]; hasMore: boolean }> {
  const params = new URLSearchParams({
    pkd: PKD_CODE,
    wojewodztwo: voivodeship,
    page: page.toString(),
    limit: "25",
  });

  const url = `${BASE_URL}?${params}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`  HTTP ${res.status}: ${text.slice(0, 200)}`);
    return { firms: [], hasMore: false };
  }

  const data = await res.json();

  // CEIDG API v2 returns { firmy: [...], links: { next: ... } }
  const firms = data.firmy ?? data.items ?? data ?? [];
  const hasMore = !!(data.links?.next);

  return { firms: Array.isArray(firms) ? firms : [], hasMore };
}

async function upsertFromCeidg(firma: CeidgFirma, voivodeship: string) {
  const addr = firma.adresGlownegoMiejscaWykonywaniaDzialalnosci;
  const contact = firma.adresDoPoreczenstw;
  const owner = firma.wlasciciel;

  const contactPerson =
    owner?.imie && owner?.nazwisko
      ? `${owner.imie} ${owner.nazwisko}`
      : null;

  const phone = contact?.telefon ?? null;
  const email = contact?.email ?? null;
  const nip = firma.nip ?? null;

  const dedup_key = buildDedupKey({ phone, nip, email });
  if (!dedup_key) {
    // No way to dedup — skip
    return;
  }

  const { error } = await supabase.from("prospects").upsert(
    {
      source: "ceidg",
      source_id: firma.id,
      source_url: `https://aplikacja.ceidg.gov.pl/ceidg/ceidg.public.ui/SearchDetails.aspx?Id=${firma.id}`,
      company_name: firma.nazwa,
      contact_person: contactPerson,
      phone,
      email,
      city: addr?.miasto ?? null,
      voivodeship: addr?.wojewodztwo ?? voivodeship,
      nip,
      regon: firma.regon ?? null,
      equipment_description: `PKD ${PKD_CODE} — wynajem maszyn budowlanych`,
      dedup_key,
    },
    { onConflict: "dedup_key" }
  );

  if (error) {
    console.error(`  Upsert error: ${error.message}`);
  }
}

async function main() {
  if (!API_KEY) {
    console.error(
      "Missing CEIDG_API_KEY in .env.local!\n" +
        "Register at https://dane.biznes.gov.pl to get an API key."
    );
    process.exit(1);
  }

  console.log("=== CEIDG Scraper ===");
  console.log(`PKD: ${PKD_CODE}\n`);

  let totalSaved = 0;

  for (const voivodeship of VOIVODESHIPS) {
    console.log(`\nWojewództwo: ${voivodeship}`);

    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const { firms, hasMore: more } = await fetchPage(voivodeship, page);
      hasMore = more;

      if (firms.length === 0) break;

      console.log(`  Page ${page}: ${firms.length} firms`);

      for (const firma of firms) {
        await upsertFromCeidg(firma, voivodeship);
        totalSaved++;
      }

      page++;
      await sleep(500); // Rate limit
    }
  }

  console.log(`\n\nDone! Total saved/updated: ${totalSaved}`);
}

main().catch(console.error);
