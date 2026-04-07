"use client";

import { deleteProspect } from "../../lib/prospect-actions";

export default function DeleteButton({ prospectId }: { prospectId: string }) {
  return (
    <form action={deleteProspect}>
      <input type="hidden" name="prospect_id" value={prospectId} />
      <button
        type="submit"
        className="text-xs text-red-400 hover:text-red-600"
        onClick={(e) => {
          if (!confirm("Usunąć prospekt?")) {
            e.preventDefault();
          }
        }}
      >
        Usuń
      </button>
    </form>
  );
}
