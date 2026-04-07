"use client";

import { removeMachine } from "../../lib/actions";

export default function RemoveMachineButton({
  listingId,
  ownerId,
}: {
  listingId: string;
  ownerId: string;
}) {
  return (
    <form action={removeMachine}>
      <input type="hidden" name="listing_id" value={listingId} />
      <input type="hidden" name="owner_id" value={ownerId} />
      <button
        type="submit"
        className="text-xs text-red-400 hover:text-red-600 transition-colors"
        onClick={(e) => {
          if (!confirm("Na pewno chcesz usunąć tę maszynę?")) {
            e.preventDefault();
          }
        }}
      >
        Usuń
      </button>
    </form>
  );
}
