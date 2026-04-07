"use client";

import { useState } from "react";
import { EQUIPMENT_CATEGORIES } from "../lib/types";

export default function MachineFields() {
  const [machines, setMachines] = useState([0]);
  const [nextId, setNextId] = useState(1);

  function addMachine() {
    setMachines((prev) => [...prev, nextId]);
    setNextId((n) => n + 1);
  }

  function removeMachine(id: number) {
    setMachines((prev) => prev.filter((m) => m !== id));
  }

  return (
    <div className="space-y-6">
      <input type="hidden" name="machine_count" value={machines.length} />

      {machines.map((id, index) => (
        <div
          key={id}
          className="relative rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">
              Maszyna {index + 1}
            </p>
            {machines.length > 1 && (
              <button
                type="button"
                onClick={() => removeMachine(id)}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Usuń
              </button>
            )}
          </div>

          {/* Equipment type */}
          <div>
            <label
              htmlFor={`equipment_type_${id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Rodzaj maszyny *
            </label>
            <select
              id={`equipment_type_${id}`}
              name={`equipment_type_${index}`}
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
            {/* Manufacturer */}
            <div>
              <label
                htmlFor={`manufacturer_${id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Producent
              </label>
              <input
                type="text"
                id={`manufacturer_${id}`}
                name={`manufacturer_${index}`}
                placeholder="np. CAT, Kubota"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            {/* Model */}
            <div>
              <label
                htmlFor={`model_${id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Model
              </label>
              <input
                type="text"
                id={`model_${id}`}
                name={`model_${index}`}
                placeholder="np. 320F"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Year */}
            <div>
              <label
                htmlFor={`year_${id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Rok produkcji
              </label>
              <input
                type="number"
                id={`year_${id}`}
                name={`year_${index}`}
                min="1990"
                max="2026"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            {/* Daily rate */}
            <div>
              <label
                htmlFor={`daily_rate_${id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Cena / dzień (PLN)
              </label>
              <input
                type="number"
                id={`daily_rate_${id}`}
                name={`daily_rate_${index}`}
                min="0"
                placeholder="opcjonalnie"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Location city */}
          <div>
            <label
              htmlFor={`location_city_${id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Lokalizacja maszyny (jeśli inna niż siedziba)
            </label>
            <input
              type="text"
              id={`location_city_${id}`}
              name={`location_city_${index}`}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addMachine}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Dodaj kolejną maszynę
      </button>
    </div>
  );
}
