import Link from "next/link";

export const metadata = {
  title: "Dziękujemy za rejestrację! — BudoMaszyny",
};

export default function DziekujemyOwnerPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="text-5xl mb-6">&#10003;</div>
      <h1 className="text-3xl font-bold text-gray-900">
        Dziękujemy za rejestrację!
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Twoja maszyna została dodana do bazy. Gdy pojawi się zapytanie
        pasujące do Twojej oferty, wyślemy Ci <strong>email z danymi kontaktowymi</strong> klienta.
      </p>
      <p className="mt-2 text-gray-500">
        Chcesz dodać więcej maszyn? Napisz do nas: artiom.kamincki@gmail.com
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 font-bold text-white hover:bg-amber-600 transition-colors"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}
