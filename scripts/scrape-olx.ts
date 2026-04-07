/**
 * OLX Scraper — ищет объявления по аренде строительной техники.
 *
 * Запуск: npx tsx scripts/scrape-olx.ts
 *
 * Результаты сохраняются в Supabase таблицу `prospects`.
 */

import * as cheerio from "cheerio";
import { supabase } from "./lib/supabase";
import { buildDedupKey, randomDelay } from "./lib/dedup";

const SEARCH_QUERIES = [
  "wynajem koparki",
  "wynajem maszyn budowlanych",
  "koparka do wynajęcia",
  "wynajem dźwigu",
  "wynajem ładowarki",
  "wynajem rusztowania",
  "wynajem agregatu",
  "wynajem walca",
  "wynajem zagęszczarki",
];

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
];

function randomUA(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

interface OlxListing {
  title: string;
  url: string;
  olxId: string;
  city: string;
  price: string | null;
}

async function fetchSearchPage(query: string, page: number = 1): Promise<OlxListing[]> {
  const encoded = encodeURIComponent(query);
  const url = `https://www.olx.pl/oferty/q-${encoded}/${page > 1 ? `?page=${page}` : ""}`;

  console.log(`  Fetching: ${url}`);

  const res = await fetch(url, {
    headers: {
      "User-Agent": randomUA(),
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "pl-PL,pl;q=0.9",
    },
  });

  if (!res.ok) {
    console.error(`  HTTP ${res.status} for ${url}`);
    return [];
  }

  const html = await res.text();
  const $ = cheerio.load(html);
  const listings: OlxListing[] = [];

  // OLX renders listing cards as <div data-cy="l-card">
  $('[data-cy="l-card"]').each((_, el) => {
    const $el = $(el);
    const linkEl = $el.find("a").first();
    const href = linkEl.attr("href") || "";

    // Skip promoted/external links
    if (!href.startsWith("/d/") && !href.startsWith("https://www.olx.pl/d/")) return;

    const fullUrl = href.startsWith("http") ? href : `https://www.olx.pl${href}`;

    // Extract OLX ID from URL
    const idMatch = href.match(/ID([a-zA-Z0-9]+)/);
    const olxId = idMatch ? idMatch[1] : "";

    const title = $el.find("h6").first().text().trim();
    const city = $el.find('[data-testid="location-date"]').first().text().trim().split(" - ")[0].trim();
    const price = $el.find('[data-testid="ad-price"]').first().text().trim() || null;

    if (title && olxId) {
      listings.push({ title, url: fullUrl, olxId, city, price });
    }
  });

  return listings;
}

async function fetchListingDetails(url: string): Promise<{
  description: string | null;
  phone: string | null;
  sellerName: string | null;
}> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": randomUA(),
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "pl-PL,pl;q=0.9",
      },
    });

    if (!res.ok) return { description: null, phone: null, sellerName: null };

    const html = await res.text();
    const $ = cheerio.load(html);

    const description = $('[data-cy="ad_description"]').text().trim().slice(0, 1000) || null;
    const sellerName = $('[data-cy="seller_card"] h4').first().text().trim() || null;

    // Phone is usually hidden behind a button, try to find in page data
    let phone: string | null = null;
    const scriptTags = $("script").toArray();
    for (const script of scriptTags) {
      const text = $(script).html() || "";
      const phoneMatch = text.match(/"phone_number":\s*"(\+?[\d\s-]+)"/);
      if (phoneMatch) {
        phone = phoneMatch[1].trim();
        break;
      }
    }

    return { description, phone, sellerName };
  } catch {
    return { description: null, phone: null, sellerName: null };
  }
}

async function upsertProspect(data: {
  olxId: string;
  title: string;
  url: string;
  city: string;
  price: string | null;
  description: string | null;
  phone: string | null;
  sellerName: string | null;
}) {
  const dedup_key = buildDedupKey({ phone: data.phone }) || `olx:${data.olxId}`;

  const { error } = await supabase.from("prospects").upsert(
    {
      source: "olx",
      source_url: data.url,
      source_id: data.olxId,
      company_name: data.sellerName,
      phone: data.phone,
      city: data.city,
      equipment_description: `${data.title}${data.price ? ` (${data.price})` : ""}`,
      dedup_key,
    },
    { onConflict: "dedup_key" }
  );

  if (error) {
    console.error(`  Upsert error: ${error.message}`);
  }
}

async function main() {
  console.log("=== OLX Scraper ===\n");

  let totalFound = 0;
  let totalSaved = 0;

  for (const query of SEARCH_QUERIES) {
    console.log(`\nSearch: "${query}"`);

    // Fetch first 2 pages per query
    for (let page = 1; page <= 2; page++) {
      const listings = await fetchSearchPage(query, page);
      console.log(`  Page ${page}: ${listings.length} listings`);

      if (listings.length === 0) break;

      totalFound += listings.length;

      for (const listing of listings) {
        // Fetch details for each listing
        await randomDelay(1500, 3000);
        const details = await fetchListingDetails(listing.url);

        await upsertProspect({
          ...listing,
          ...details,
        });

        totalSaved++;
        process.stdout.write(`  Saved ${totalSaved}/${totalFound}\r`);
      }

      await randomDelay(2000, 4000);
    }
  }

  console.log(`\n\nDone! Found: ${totalFound}, Saved/Updated: ${totalSaved}`);
}

main().catch(console.error);
