import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "artiom.kamincki@gmail.com";
const SITE_URL = process.env.SITE_URL || "https://budomaszyny.vercel.app";

export async function notifyNewRequest(request: {
  equipment_type: string;
  city: string;
  name: string;
  phone: string;
  email?: string | null;
  description?: string | null;
}) {
  await resend.emails.send({
    from: "BudoMaszyny <onboarding@resend.dev>",
    to: ADMIN_EMAIL,
    subject: `Nowe zapytanie: ${request.equipment_type} — ${request.city}`,
    html: `
      <h2>Nowe zapytanie na BudoMaszyny!</h2>
      <p><strong>Typ:</strong> ${request.equipment_type}</p>
      <p><strong>Miasto:</strong> ${request.city}</p>
      ${request.description ? `<p><strong>Szczegóły:</strong> ${request.description}</p>` : ""}
      <hr/>
      <p><strong>Kontakt:</strong> ${request.name}</p>
      <p><strong>Telefon:</strong> ${request.phone}</p>
      ${request.email ? `<p><strong>Email:</strong> ${request.email}</p>` : ""}
      <br/>
      <a href="${SITE_URL}/admin" style="background:#f59e0b;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
        Otwórz panel admina
      </a>
    `,
  });
}

export async function notifyOwnerLead(
  ownerEmail: string,
  leadId: string,
  equipmentType: string,
  city: string
) {
  await resend.emails.send({
    from: "BudoMaszyny <onboarding@resend.dev>",
    to: ownerEmail,
    subject: `Nowe zapytanie: ${equipmentType} — ${city}`,
    html: `
      <h2>Masz nowe zapytanie!</h2>
      <p>Ktoś szuka <strong>${equipmentType}</strong> w okolicy <strong>${city}</strong>.</p>
      <p>Kliknij poniżej, aby zobaczyć dane kontaktowe:</p>
      <br/>
      <a href="${SITE_URL}/lead/${leadId}" style="background:#f59e0b;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
        Zobacz zapytanie
      </a>
      <br/><br/>
      <p style="color:#999;font-size:12px;">Ten email został wysłany przez BudoMaszyny.</p>
    `,
  });
}

export async function notifyOwnerWelcome(data: {
  email: string;
  company_name: string;
  ownerId: string;
}) {
  await resend.emails.send({
    from: "BudoMaszyny <onboarding@resend.dev>",
    to: data.email,
    subject: `Witamy w BudoMaszyny, ${data.company_name}!`,
    html: `
      <h2>Rejestracja zakończona!</h2>
      <p>Cześć! Twoja firma <strong>${data.company_name}</strong> została dodana do bazy BudoMaszyny.</p>
      <p>Twój panel — tutaj możesz zarządzać maszynami i przeglądać zapytania:</p>
      <br/>
      <a href="${SITE_URL}/moje/${data.ownerId}" style="background:#f59e0b;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
        Mój panel
      </a>
      <br/><br/>
      <p style="color:#666;">Zapisz ten link — to Twój dostęp do panelu.</p>
      <p style="color:#999;font-size:12px;">BudoMaszyny — wynajem maszyn budowlanych w całej Polsce.</p>
    `,
  });
}
