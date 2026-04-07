import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-12 items-center gap-6">
            <span className="text-sm font-bold text-gray-900">Admin</span>
            <Link
              href="/admin"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/prospects"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Prospects
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
