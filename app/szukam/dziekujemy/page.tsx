import Link from "next/link";

export const metadata = {
  title: "Dziękujemy! — BudoMaszyny",
};

export default function DziekujemyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="text-5xl mb-6">&#10003;</div>
      <h1 className="text-3xl font-bold text-gray-900">
        Dziękujemy za zapytanie!
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Otrzymaliśmy Twoje zapytanie. Skontaktujemy się z Tobą w ciągu{" "}
        <strong>24 godzin</strong> z ofertami od sprawdzonych właścicieli maszyn
        w Twojej okolicy.
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
