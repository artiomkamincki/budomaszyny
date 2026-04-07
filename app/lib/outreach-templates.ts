import type { Prospect } from "./types";

const SITE_URL = process.env.SITE_URL || "https://budomaszyny.vercel.app";

export interface OutreachTemplate {
  key: string;
  name: string;
  subject: (p: Prospect) => string;
  body: (p: Prospect) => string;
}

export const OUTREACH_TEMPLATES: Record<string, OutreachTemplate> = {
  olx_listing: {
    key: "olx_listing",
    name: "OLX — widzieliśmy ogłoszenie",
    subject: (p) =>
      `Dodatkowe zapytania na wynajem${p.equipment_description ? ` — ${p.equipment_description.slice(0, 40)}` : ""}`,
    body: (p) => `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1a1a1a;">Dzień dobry${p.contact_person ? `, ${p.contact_person}` : ""}!</h2>
        <p>Znaleźliśmy Państwa ogłoszenie na OLX dotyczące wynajmu maszyn budowlanych${p.city ? ` w okolicy <strong>${p.city}</strong>` : ""}.</p>
        <p>Uruchomiliśmy platformę <strong>BudoMaszyny</strong> — marketplace wynajmu maszyn budowlanych w Polsce. Dajemy właścicielom maszyn <strong>darmowe zapytania od firm szukających sprzętu</strong>.</p>
        <p><strong>Co zyskujesz:</strong></p>
        <ul>
          <li>Dodatkowe zapytania od klientów — <strong>za darmo</strong></li>
          <li>Rejestracja zajmuje 2 minuty</li>
          <li>Bez prowizji, bez opłat — na start</li>
        </ul>
        <br/>
        <a href="${SITE_URL}/wynajmuje" style="background:#f59e0b;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
          Zarejestruj się za darmo →
        </a>
        <br/><br/>
        <p style="color:#666;font-size:13px;">Jeśli nie chcesz więcej otrzymywać wiadomości od nas, odpowiedz na tego maila słowem "STOP".</p>
        <p style="color:#999;font-size:12px;">BudoMaszyny — wynajem maszyn budowlanych w całej Polsce.</p>
      </div>
    `,
  },

  ceidg_business: {
    key: "ceidg_business",
    name: "CEIDG — firma z branży",
    subject: () => "Dodatkowe zapytania na wynajem maszyn — BudoMaszyny",
    body: (p) => `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1a1a1a;">Dzień dobry${p.contact_person ? `, ${p.contact_person}` : ""}!</h2>
        <p>Piszemy do Państwa, ponieważ${p.company_name ? ` firma <strong>${p.company_name}</strong>` : " Państwa firma"} działa w branży wynajmu maszyn budowlanych${p.city ? ` w okolicy <strong>${p.city}</strong>` : ""}.</p>
        <p>Uruchomiliśmy <strong>BudoMaszyny</strong> — platformę, która łączy właścicieli maszyn z firmami budowlanymi szukającymi sprzętu do wynajmu.</p>
        <p><strong>Jak to działa:</strong></p>
        <ol>
          <li>Rejestrujesz swoje maszyny (2 minuty)</li>
          <li>Firmy szukają sprzętu na naszej stronie</li>
          <li>Dostajesz zapytanie z danymi kontaktowymi klienta</li>
        </ol>
        <p><strong>Rejestracja i zapytania są całkowicie darmowe</strong> — chcemy zbudować bazę maszyn w Polsce.</p>
        <br/>
        <a href="${SITE_URL}/wynajmuje" style="background:#f59e0b;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
          Zarejestruj maszynę za darmo →
        </a>
        <br/><br/>
        <p style="color:#666;font-size:13px;">Jeśli nie chcesz więcej otrzymywać wiadomości od nas, odpowiedz "STOP".</p>
        <p style="color:#999;font-size:12px;">BudoMaszyny — wynajem maszyn budowlanych w całej Polsce.</p>
      </div>
    `,
  },

  general: {
    key: "general",
    name: "Ogólny — zaproszenie",
    subject: () => "BudoMaszyny — darmowa platforma wynajmu maszyn budowlanych",
    body: (p) => `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1a1a1a;">Dzień dobry${p.contact_person ? `, ${p.contact_person}` : ""}!</h2>
        <p>Czy wynajmujesz maszyny budowlane? Uruchomiliśmy <strong>BudoMaszyny</strong> — darmową platformę, dzięki której otrzymasz dodatkowe zapytania od klientów.</p>
        <p><strong>Dlaczego warto:</strong></p>
        <ul>
          <li>Dodatkowy kanał pozyskiwania klientów</li>
          <li>Rejestracja zajmuje 2 minuty</li>
          <li>100% za darmo — bez prowizji, bez opłat</li>
        </ul>
        <br/>
        <a href="${SITE_URL}/wynajmuje" style="background:#f59e0b;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
          Zarejestruj się za darmo →
        </a>
        <br/><br/>
        <p style="color:#666;font-size:13px;">Jeśli nie chcesz więcej otrzymywać wiadomości, odpowiedz "STOP".</p>
        <p style="color:#999;font-size:12px;">BudoMaszyny — wynajem maszyn budowlanych w całej Polsce.</p>
      </div>
    `,
  },
};

export const TEMPLATE_LIST = Object.values(OUTREACH_TEMPLATES);
