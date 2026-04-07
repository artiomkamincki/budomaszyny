import Link from "next/link";
import { EQUIPMENT_CATEGORIES } from "./lib/types";

const steps = [
  {
    num: "1",
    title: "Opisz czego szukasz",
    desc: "Wybierz typ maszyny, miasto i termin. Zajmie to 30 sekund.",
  },
  {
    num: "2",
    title: "Otrzymaj oferty",
    desc: "Dopasujemy Twoje zapytanie do sprawdzonych właścicieli maszyn w okolicy.",
  },
  {
    num: "3",
    title: "Wynajmij maszynę",
    desc: "Skontaktuj się bezpośrednio z właścicielem i dogadaj warunki.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Znajdź maszynę budowlaną
            <br />
            <span className="text-amber-500">w 5 minut</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Koparki, dźwigi, ładowarki — wynajem od sprawdzonych firm w całej
            Polsce. Bez pośredników, bez prowizji dla szukających.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/szukam"
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-amber-600 hover:shadow-xl transition-all"
            >
              Szukam maszyny
            </Link>
            <Link
              href="/wynajmuje"
              className="inline-flex items-center justify-center rounded-xl border-2 border-amber-500 px-8 py-4 text-lg font-bold text-amber-600 hover:bg-amber-50 transition-all"
            >
              Mam maszynę do wynajmu
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Jak to działa?
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-600">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment catalog */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Katalog sprzętu
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Znajdziemy dla Ciebie każdy sprzęt budowlany. Kliknij, aby wysłać
            zapytanie.
          </p>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUIPMENT_CATEGORIES.map((cat) => (
              <div key={cat.category} className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-3">
                  {cat.category}
                </h3>
                <ul className="space-y-1">
                  {cat.types.map((t) => (
                    <li key={t.value}>
                      <Link
                        href={`/szukam?type=${t.value}`}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                      >
                        {t.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/szukam"
              className="text-amber-600 font-medium hover:underline"
            >
              Nie znalazłeś swojej maszyny? Wyślij zapytanie z opisem &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* For owners */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white">
              Masz maszynę budowlaną?
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
              Zarejestruj swój sprzęt i otrzymuj zapytania od firm budowlanych
              szukających wynajmu. Darmowa rejestracja.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-left">
              <div className="rounded-lg bg-white/10 p-4">
                <p className="font-semibold text-amber-400">Więcej klientów</p>
                <p className="mt-1 text-sm text-gray-400">
                  Docieramy do firm, które aktywnie szukają maszyn
                </p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="font-semibold text-amber-400">Zero prowizji</p>
                <p className="mt-1 text-sm text-gray-400">
                  Rejestracja i pierwsze zapytania — całkowicie za darmo
                </p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="font-semibold text-amber-400">Prosto i szybko</p>
                <p className="mt-1 text-sm text-gray-400">
                  Rejestracja zajmie 2 minuty. Żadnych skomplikowanych umów
                </p>
              </div>
            </div>
            <Link
              href="/wynajmuje"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-amber-500 px-8 py-4 text-lg font-bold text-white hover:bg-amber-600 transition-colors"
            >
              Zarejestruj maszynę za darmo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
