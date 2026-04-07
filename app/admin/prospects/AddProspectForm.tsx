"use client";

import { useState } from "react";
import { addManualProspect } from "../../lib/prospect-actions";

export default function AddProspectForm() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 px-4 py-4 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
      >
        + Dodaj prospekt ręcznie
      </button>
    );
  }

  return (
    <form
      action={addManualProspect}
      className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-900">Nowy prospekt</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Anuluj
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nazwa firmy
          </label>
          <input
            type="text"
            name="company_name"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Osoba kontaktowa
          </label>
          <input
            type="text"
            name="contact_person"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Telefon
          </label>
          <input
            type="tel"
            name="phone"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Miasto
          </label>
          <input
            type="text"
            name="city"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            NIP
          </label>
          <input
            type="text"
            name="nip"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sprzęt (opis)
          </label>
          <input
            type="text"
            name="equipment_description"
            placeholder="np. koparka 20t, dźwig"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notatki
        </label>
        <textarea
          name="notes"
          rows={2}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="rounded-xl bg-gray-900 px-6 py-2.5 font-medium text-white hover:bg-gray-700 transition-colors"
      >
        Dodaj prospekt
      </button>
    </form>
  );
}
