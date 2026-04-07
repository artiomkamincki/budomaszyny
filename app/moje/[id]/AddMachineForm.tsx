"use client";

import { useState } from "react";
import { EQUIPMENT_CATEGORIES } from "../../lib/types";
import { addMachineToOwner } from "../../lib/actions";

export default function AddMachineForm({ ownerId }: { ownerId: string }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 px-4 py-4 text-sm font-semibold text-gray-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Dodaj nową maszynę
      </button>
    );
  }

  return (
    <form
      action={addMachineToOwner}
      className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-4"
    >
      <input type="hidden" name="owner_id" value={ownerId} />

      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-900">Nowa maszyna</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Anuluj
        </button>
      </div>

      {/* Equipment type */}
      <div>
        <label
          htmlFor="new_equipment_type"
          className="block text-sm font-medium text-gray-700"
        >
          Rodzaj maszyny *
        </label>
        <select
          id="new_equipment_type"
          name="equipment_type"
          required
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
          <option value="inne">Inne — opiszę poniżej</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="new_manufacturer"
            className="block text-sm font-medium text-gray-700"
          >
            Producent
          </label>
          <input
            type="text"
            id="new_manufacturer"
            name="manufacturer"
            placeholder="np. CAT, Kubota"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label
            htmlFor="new_model"
            className="block text-sm font-medium text-gray-700"
          >
            Model
          </label>
          <input
            type="text"
            id="new_model"
            name="model"
            placeholder="np. 320F"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="new_year"
            className="block text-sm font-medium text-gray-700"
          >
            Rok produkcji
          </label>
          <input
            type="number"
            id="new_year"
            name="year"
            min="1990"
            max="2026"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label
            htmlFor="new_daily_rate"
            className="block text-sm font-medium text-gray-700"
          >
            Cena / dzień (PLN)
          </label>
          <input
            type="number"
            id="new_daily_rate"
            name="daily_rate"
            min="0"
            placeholder="opcjonalnie"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="new_location_city"
          className="block text-sm font-medium text-gray-700"
        >
          Lokalizacja maszyny (jeśli inna niż siedziba)
        </label>
        <input
          type="text"
          id="new_location_city"
          name="location_city"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-amber-500 px-6 py-3 font-bold text-white shadow hover:bg-amber-600 transition-colors"
      >
        Dodaj maszynę
      </button>
    </form>
  );
}
