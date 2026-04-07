import { EQUIPMENT_TYPES } from "../lib/types";
import { submitRentalRequest } from "../lib/actions";

export const metadata = {
  title: "Szukam maszyny budowlanej — BudoMaszyny",
  description:
    "Opisz jakiej maszyny budowlanej szukasz, a my znajdziemy dla Ciebie oferty od sprawdzonych firm w Twojej okolicy.",
};

export default async function SzukamPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Szukam maszyny</h1>
      <p className="mt-2 text-gray-600">
        Wypełnij formularz, a my znajdziemy dla Ciebie najlepsze oferty.
        Bezpłatnie.
      </p>

      <form action={submitRentalRequest} className="mt-8 space-y-6">
        {/* Equipment type */}
        <div>
          <label
            htmlFor="equipment_type"
            className="block text-sm font-medium text-gray-700"
          >
            Rodzaj maszyny *
          </label>
          <select
            id="equipment_type"
            name="equipment_type"
            required
            defaultValue={type || ""}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
          >
            <option value="">Wybierz typ...</option>
            {EQUIPMENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Szczegóły
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="np. Koparka gąsienicowa 20t z młotem hydraulicznym"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            Miasto / region *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            placeholder="np. Warszawa, Kraków, Poznań"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="start_date"
              className="block text-sm font-medium text-gray-700"
            >
              Od kiedy
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          <div>
            <label
              htmlFor="end_date"
              className="block text-sm font-medium text-gray-700"
            >
              Do kiedy
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        <h2 className="text-lg font-semibold text-gray-900">Twoje dane</h2>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Imię i nazwisko *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Telefon *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="+48 ..."
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email (opcjonalnie)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Firma (opcjonalnie)
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-amber-500 px-6 py-3.5 text-lg font-bold text-white shadow-lg hover:bg-amber-600 transition-colors"
        >
          Wyślij zapytanie — za darmo
        </button>

        <p className="text-xs text-gray-500 text-center">
          Twoje dane zostaną przekazane tylko sprawdzonym firmom wynajmującym
          maszyny. Żadnego spamu.
        </p>
      </form>
    </div>
  );
}
