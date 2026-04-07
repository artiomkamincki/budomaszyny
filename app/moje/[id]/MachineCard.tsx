"use client";

import { useState } from "react";
import { EQUIPMENT_CATEGORIES, EQUIPMENT_TYPES } from "../../lib/types";
import { updateMachine, removeMachine } from "../../lib/actions";

function getTypeLabel(value: string) {
  return EQUIPMENT_TYPES.find((t) => t.value === value)?.label ?? value;
}

interface Listing {
  id: string;
  equipment_type: string;
  manufacturer: string | null;
  model: string | null;
  year: number | null;
  daily_rate: number | null;
  location_city: string | null;
  available: boolean;
}

export default function MachineCard({
  listing,
  ownerId,
  ownerCity,
}: {
  listing: Listing;
  ownerId: string;
  ownerCity: string;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        action={updateMachine}
        className="rounded-xl border border-amber-200 bg-amber-50 p-5 space-y-4"
      >
        <input type="hidden" name="listing_id" value={listing.id} />
        <input type="hidden" name="owner_id" value={ownerId} />

        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-900">Edytuj maszynę</p>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Anuluj
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rodzaj maszyny *
          </label>
          <select
            name="equipment_type"
            required
            defaultValue={listing.equipment_type}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
          >
            <option value="">Wybierz typ...</option>
            {EQUIPMENT_CATEGORIES.map((cat) => (
              <optgroup key={cat.category} label={cat.category}>
                {cat.types.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="inne">Inne</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Producent
            </label>
            <input
              type="text"
              name="manufacturer"
              defaultValue={listing.manufacturer ?? ""}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              name="model"
              defaultValue={listing.model ?? ""}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rok produkcji
            </label>
            <input
              type="number"
              name="year"
              min="1990"
              max="2026"
              defaultValue={listing.year ?? ""}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cena / dzień (PLN)
            </label>
            <input
              type="number"
              name="daily_rate"
              min="0"
              defaultValue={listing.daily_rate ?? ""}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lokalizacja maszyny
          </label>
          <input
            type="text"
            name="location_city"
            defaultValue={listing.location_city ?? ""}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-amber-500 px-6 py-3 font-bold text-white shadow hover:bg-amber-600 transition-colors"
        >
          Zapisz zmiany
        </button>
      </form>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-gray-900">
            {getTypeLabel(listing.equipment_type)}
          </p>
          <p className="text-sm text-gray-500">
            {[listing.manufacturer, listing.model, listing.year]
              .filter(Boolean)
              .join(" · ") || "Brak szczegółów"}
          </p>
        </div>
        {listing.available ? (
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
            Dostępna
          </span>
        ) : (
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
            Niedostępna
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {listing.location_city || ownerCity}
          {listing.daily_rate ? ` · ${listing.daily_rate} PLN/dzień` : ""}
        </span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-xs text-amber-500 hover:text-amber-700 transition-colors"
          >
            Edytuj
          </button>
          <form action={removeMachine}>
            <input type="hidden" name="listing_id" value={listing.id} />
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
        </div>
      </div>
    </div>
  );
}
