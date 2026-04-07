import { getServiceClient } from "../../lib/admin-data";
import type { Prospect } from "../../lib/types";


import AddProspectForm from "./AddProspectForm";
import StatusSelect from "./StatusSelect";
import DeleteButton from "./DeleteButton";
import SendEmailButton from "./SendEmailButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Prospects — Admin",
  robots: "noindex, nofollow",
};

const SOURCE_BADGES: Record<string, { bg: string; text: string }> = {
  olx: { bg: "bg-blue-100", text: "text-blue-800" },
  ceidg: { bg: "bg-green-100", text: "text-green-800" },
  google_maps: { bg: "bg-red-100", text: "text-red-800" },
  manual: { bg: "bg-gray-100", text: "text-gray-800" },
};

const STATUS_BADGES: Record<string, { bg: string; text: string }> = {
  new: { bg: "bg-gray-100", text: "text-gray-800" },
  queued: { bg: "bg-amber-100", text: "text-amber-800" },
  contacted: { bg: "bg-blue-100", text: "text-blue-800" },
  responded: { bg: "bg-purple-100", text: "text-purple-800" },
  registered: { bg: "bg-green-100", text: "text-green-800" },
  rejected: { bg: "bg-red-100", text: "text-red-800" },
};

const STATUSES = [
  "new",
  "queued",
  "contacted",
  "responded",
  "registered",
  "rejected",
] as const;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL");
}

export default async function ProspectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; source?: string; city?: string }>;
}) {
  const filters = await searchParams;
  const db = getServiceClient();

  // Build query
  let query = db
    .from("prospects")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.source) {
    query = query.eq("source", filters.source);
  }
  if (filters.city) {
    query = query.ilike("city", `%${filters.city}%`);
  }

  const { data, count } = await query.limit(200);
  const prospects = (data ?? []) as Prospect[];

  // Stats
  const { data: statsData } = await db
    .from("prospects")
    .select("status")
    .limit(10000);
  const allProspects = statsData ?? [];
  const funnel = {
    total: allProspects.length,
    new: allProspects.filter((p) => p.status === "new").length,
    queued: allProspects.filter((p) => p.status === "queued").length,
    contacted: allProspects.filter((p) => p.status === "contacted").length,
    responded: allProspects.filter((p) => p.status === "responded").length,
    registered: allProspects.filter((p) => p.status === "registered").length,
    rejected: allProspects.filter((p) => p.status === "rejected").length,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Prospects CRM ({funnel.total})
      </h1>

      {/* Funnel stats */}
      <div className="mt-4 grid grid-cols-6 gap-3">
        {(
          [
            ["new", "Nowe", funnel.new],
            ["queued", "W kolejce", funnel.queued],
            ["contacted", "Skontaktowane", funnel.contacted],
            ["responded", "Odpowiedź", funnel.responded],
            ["registered", "Zarejestrowani", funnel.registered],
            ["rejected", "Odrzucone", funnel.rejected],
          ] as const
        ).map(([key, label, count]) => {
          const badge = STATUS_BADGES[key];
          return (
            <a
              key={key}
              href={`/admin/prospects?status=${key}`}
              className={`rounded-lg ${badge.bg} p-3 text-center hover:opacity-80 transition-opacity`}
            >
              <p className={`text-2xl font-bold ${badge.text}`}>{count}</p>
              <p className={`text-xs ${badge.text}`}>{label}</p>
            </a>
          );
        })}
      </div>

      {/* Filters */}
      <form className="mt-6 flex items-center gap-3">
        <select
          name="status"
          defaultValue={filters.status ?? ""}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Wszystkie statusy</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          name="source"
          defaultValue={filters.source ?? ""}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Wszystkie źródła</option>
          <option value="olx">OLX</option>
          <option value="ceidg">CEIDG</option>
          <option value="google_maps">Google Maps</option>
          <option value="manual">Ręczny</option>
        </select>
        <input
          type="text"
          name="city"
          placeholder="Miasto..."
          defaultValue={filters.city ?? ""}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Filtruj
        </button>
        <a
          href="/admin/prospects"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Wyczyść
        </a>
      </form>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="px-3 py-2">Firma</th>
              <th className="px-3 py-2">Miasto</th>
              <th className="px-3 py-2">Źródło</th>
              <th className="px-3 py-2">Kontakt</th>
              <th className="px-3 py-2">Sprzęt</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Data</th>
              <th className="px-3 py-2">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prospects.map((p) => {
              const srcBadge = SOURCE_BADGES[p.source] ?? SOURCE_BADGES.manual;
              const stsBadge = STATUS_BADGES[p.status] ?? STATUS_BADGES.new;

              return (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">
                    <div className="font-medium text-gray-900">
                      {p.company_name || "—"}
                    </div>
                    {p.contact_person && (
                      <div className="text-xs text-gray-500">
                        {p.contact_person}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2 text-gray-700">
                    {p.city || "—"}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${srcBadge.bg} ${srcBadge.text}`}
                    >
                      {p.source}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {p.phone && (
                      <div className="text-xs">{p.phone}</div>
                    )}
                    {p.email && (
                      <div className="text-xs text-gray-500">{p.email}</div>
                    )}
                    {!p.phone && !p.email && "—"}
                  </td>
                  <td className="px-3 py-2 max-w-[200px] truncate text-xs text-gray-600">
                    {p.equipment_description || "—"}
                  </td>
                  <td className="px-3 py-2">
                    <StatusSelect prospectId={p.id} currentStatus={p.status} />
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-500">
                    {formatDate(p.created_at)}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <SendEmailButton
                        prospectId={p.id}
                        hasEmail={!!p.email}
                        source={p.source}
                      />
                      {p.source_url && (
                        <a
                          href={p.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:text-blue-700"
                        >
                          Link
                        </a>
                      )}
                      <DeleteButton prospectId={p.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {prospects.length === 0 && (
          <p className="py-8 text-center text-gray-500">
            Brak prospektów. Dodaj ręcznie lub uruchom skraper.
          </p>
        )}
      </div>

      {/* Add prospect form */}
      <AddProspectForm />
    </div>
  );
}
