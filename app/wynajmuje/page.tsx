import RegisterForm from "./RegisterForm";

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

      <RegisterForm />
    </div>
  );
}
