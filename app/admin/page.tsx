import { getServiceClient } from "../lib/admin-data";
import { sendLead, closeRequest } from "../lib/admin-actions";
import { EQUIPMENT_TYPES } from "../lib/types";
import type { RentalRequest, Owner, Lead } from "../lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — BudoMaszyny",
  robots: "noindex, nofollow",
};

function getTypeLabel(value: string) {
  return EQUIPMENT_TYPES.find((t) => t.value === value)?.label ?? value;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL");
}

export default async function AdminPage() {
  const db = getServiceClient();

  const [requestsRes, ownersRes, leadsRes] = await Promise.all([
    db
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false }),
    db
      .from("owners")
      .select("*, listings(*)")
      .order("created_at", { ascending: false }),
    db
      .from("leads")
      .select("*, request:requests(*), owner:owners(*)")
      .order("sent_at", { ascending: false })
      .limit(50),
  ]);

  const requests = (requestsRes.data ?? []) as RentalRequest[];
  const owners = (ownersRes.data ?? []) as (Owner & {
    listings: { id: string; equipment_type: string; location_city: string }[];
  })[];
  const leads = (leadsRes.data ?? []) as Lead[];

  const newRequests = requests.filter((r) => r.status === "new");
  const stats = {
    totalRequests: requests.length,
    newRequests: newRequests.length,
    totalOwners: owners.length,
    totalLeads: leads.length,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        <div className="rounded-lg bg-blue-50 p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalRequests}
          </p>
          <p className="text-sm text-blue-800">Zapytań</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-4 text-center">
          <p className="text-3xl font-bold text-amber-600">
            {stats.newRequests}
          </p>
          <p className="text-sm text-amber-800">Nowych</p>
        </div>
        <div className="rounded-lg bg-green-50 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">
            {stats.totalOwners}
          </p>
          <p className="text-sm text-green-800">Właścicieli</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">
            {stats.totalLeads}
          </p>
          <p className="text-sm text-purple-800">Leadów</p>
        </div>
      </div>

      {/* New Requests */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          Nowe zapytania ({newRequests.length})
        </h2>
        {newRequests.length === 0 ? (
          <p className="mt-4 text-gray-500">Brak nowych zapytań</p>
        ) : (
          <div className="mt-4 space-y-4">
            {newRequests.map((req) => (
              <div
                key={req.id}
                className="rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {getTypeLabel(req.equipment_type)} — {req.city}
                    </p>
                    {req.description && (
                      <p className="text-sm text-gray-600">{req.description}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      {req.name} | {req.phone}
                      {req.email ? ` | ${req.email}` : ""}
                      {req.company ? ` | ${req.company}` : ""}
                    </p>
                    {req.start_date && (
                      <p className="text-sm text-gray-500">
                        {formatDate(req.start_date)}
                        {req.end_date ? ` — ${formatDate(req.end_date)}` : ""}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">
                      {formatDate(req.created_at)}
                    </p>
                  </div>
                  <form action={closeRequest}>
                    <input type="hidden" name="request_id" value={req.id} />
                    <button
                      type="submit"
                      className="rounded bg-gray-200 px-3 py-1 text-xs hover:bg-gray-300"
                    >
                      Zamknij
                    </button>
                  </form>
                </div>

                {/* Send lead to owner */}
                <div className="mt-3 border-t pt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Wyślij lead do:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {owners.map((owner) => (
                      <form key={owner.id} action={sendLead}>
                        <input
                          type="hidden"
                          name="request_id"
                          value={req.id}
                        />
                        <input
                          type="hidden"
                          name="owner_id"
                          value={owner.id}
                        />
                        <button
                          type="submit"
                          className="rounded-lg bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-200 transition-colors"
                        >
                          {owner.company_name} ({owner.city})
                        </button>
                      </form>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* All Requests */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          Wszystkie zapytania ({requests.length})
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-3 py-2">Data</th>
                <th className="px-3 py-2">Typ</th>
                <th className="px-3 py-2">Miasto</th>
                <th className="px-3 py-2">Kontakt</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr key={req.id}>
                  <td className="px-3 py-2 text-gray-500">
                    {formatDate(req.created_at)}
                  </td>
                  <td className="px-3 py-2">
                    {getTypeLabel(req.equipment_type)}
                  </td>
                  <td className="px-3 py-2">{req.city}</td>
                  <td className="px-3 py-2">
                    {req.name} ({req.phone})
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        req.status === "new"
                          ? "bg-amber-100 text-amber-800"
                          : req.status === "matched"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Owners */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          Właściciele ({owners.length})
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-3 py-2">Firma</th>
                <th className="px-3 py-2">Kontakt</th>
                <th className="px-3 py-2">Miasto</th>
                <th className="px-3 py-2">Maszyny</th>
                <th className="px-3 py-2">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {owners.map((o) => (
                <tr key={o.id}>
                  <td className="px-3 py-2 font-medium">{o.company_name}</td>
                  <td className="px-3 py-2">
                    {o.contact_person} | {o.phone} | {o.email}
                  </td>
                  <td className="px-3 py-2">{o.city}</td>
                  <td className="px-3 py-2">
                    {o.listings
                      .map((l) => getTypeLabel(l.equipment_type))
                      .join(", ") || "—"}
                  </td>
                  <td className="px-3 py-2 text-gray-500">
                    {formatDate(o.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Leads */}
      <section className="mt-10 mb-10">
        <h2 className="text-xl font-bold text-gray-900">
          Ostatnie leady ({leads.length})
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-3 py-2">Data</th>
                <th className="px-3 py-2">Zapytanie</th>
                <th className="px-3 py-2">Właściciel</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-3 py-2 text-gray-500">
                    {formatDate(lead.sent_at)}
                  </td>
                  <td className="px-3 py-2">
                    {lead.request
                      ? `${getTypeLabel(lead.request.equipment_type)} — ${lead.request.city}`
                      : lead.request_id.slice(0, 8)}
                  </td>
                  <td className="px-3 py-2">
                    {lead.owner?.company_name ?? lead.owner_id.slice(0, 8)}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        lead.status === "sent"
                          ? "bg-blue-100 text-blue-800"
                          : lead.status === "viewed"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
