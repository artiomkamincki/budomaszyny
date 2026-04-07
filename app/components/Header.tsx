import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className="text-amber-500">Budo</span>Maszyny
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/szukam"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Szukam maszyny
          </Link>
          <Link
            href="/wynajmuje"
            className="rounded-lg bg-amber-500 px-4 py-2 text-white font-semibold hover:bg-amber-600 transition-colors"
          >
            Mam maszynę
          </Link>
        </nav>
      </div>
    </header>
  );
}
