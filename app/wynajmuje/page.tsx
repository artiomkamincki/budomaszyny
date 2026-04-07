import { registerOwner } from "../lib/actions";
import MachineFields from "../components/MachineFields";

export const metadata = {
  title: "Zarejestruj maszynę — BudoMaszyny",
  description:
    "Zarejestruj swoją maszynę budowlaną i otrzymuj zapytania od firm szukających wynajmu.",
};

export default function WynajmujePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        Zarejestruj maszynę
      </h1>
      <p className="mt-2 text-gray-600">
        Dodaj swoją maszynę do bazy i zacznij otrzymywać zapytania od firm
        budowlanych. Rejestracja za darmo.
      </p>

      <form action={registerOwner} className="mt-8 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Dane firmy</h2>

        {/* Company name */}
        <div>
          <label
            htmlFor="company_name"
            className="block text-sm font-medium text-gray-700"
          >
            Nazwa firmy *
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* Contact person */}
        <div>
          <label
            htmlFor="contact_person"
            className="block text-sm font-medium text-gray-700"
          >
            Osoba kontaktowa *
          </label>
          <input
            type="text"
            id="contact_person"
            name="contact_person"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Miasto *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          {/* NIP */}
          <div>
            <label
              htmlFor="nip"
              className="block text-sm font-medium text-gray-700"
            >
              NIP (opcjonalnie)
            </label>
            <input
              type="text"
              id="nip"
              name="nip"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        <h2 className="text-lg font-semibold text-gray-900">
          Twoje maszyny
        </h2>
        <p className="text-sm text-gray-500">
          Dodaj swoje maszyny. Możesz dodać jedną lub od razu cały park.
        </p>

        <MachineFields />

        <button
          type="submit"
          className="w-full rounded-xl bg-amber-500 px-6 py-3.5 text-lg font-bold text-white shadow-lg hover:bg-amber-600 transition-colors"
        >
          Zarejestruj maszynę — za darmo
        </button>

        <p className="text-xs text-gray-500 text-center">
          Rejestracja jest darmowa. Będziemy Ci wysyłać zapytania od firm
          szukających wynajmu maszyn.
        </p>
      </form>
    </div>
  );
}
