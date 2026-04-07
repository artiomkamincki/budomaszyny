"use client";

import { sendOutreachEmail } from "../../lib/prospect-actions";

export default function SendEmailButton({
  prospectId,
  hasEmail,
  source,
}: {
  prospectId: string;
  hasEmail: boolean;
  source: string;
}) {
  if (!hasEmail) return null;

  // Auto-select template based on source
  const templateKey =
    source === "olx"
      ? "olx_listing"
      : source === "ceidg"
        ? "ceidg_business"
        : "general";

  return (
    <form action={sendOutreachEmail}>
      <input type="hidden" name="prospect_id" value={prospectId} />
      <input type="hidden" name="template_key" value={templateKey} />
      <button
        type="submit"
        className="text-xs text-amber-600 hover:text-amber-800 font-medium"
        onClick={(e) => {
          if (!confirm("Wysłać email outreach do tego prospektu?")) {
            e.preventDefault();
          }
        }}
      >
        Email
      </button>
    </form>
  );
}
