import { getServiceClient } from "../../lib/supabase";
import { EQUIPMENT_TYPES } from "../../lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddMachineForm from "./AddMachineForm";
import MachineCard from "./MachineCard";

export const dynamic = "force-dynamic";

function getTypeLabel(value: string) {
  return EQUIPMENT_TYPES.find((t) => t.value === value)?.label ?? value;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL");
}

export default async function OwnerDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = getServiceClient();

  // Fetch owner
  const { data: owner } = await supabase
    .from("owners")
    .select("*")
    .eq("id", id)
    .single();

  if (!owner) notFound();

  // Fetch listings
  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("owner_id", id)
    .order("created_at", { ascending: false });

  // Fetch leads with request data
  const { data: leads } = await supabase
    .from("leads")
    .select("*, request:requests(*)")
    .eq("owner_id", id)
    .order("sent_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {owner.company_name}
          </h1>
          <p className="mt-1 text-gray-600">
            {owner.contact_person} &middot; {owner.city}
          </p>
        </div>
        <div className="text-right text-sm text-gray-500">
          <p>{owner.phone}</p>
          <p>{owner.email}</p>
        </div>
      </div>

      {/* Machines */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          Twoje maszyny ({listings?.length ?? 0})
        </h2>

        {listings && listings.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {listings.map((listing) => (
              <MachineCard
                key={listing.id}
                listing={listing}
                ownerId={id}
                ownerCity={owner.city}
              />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-500">
            Nie masz jeszcze żadnych maszyn. Dodaj pierwszą poniżej.
          </p>
        )}

        {/* Add machine form */}
        <AddMachineForm ownerId={id} />
      </section>

      {/* Leads */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900">
          Zapytania ({leads?.length ?? 0})
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Zapytania od firm szukających maszyn w Twojej okolicy
        </p>

        {leads && leads.length > 0 ? (
          <div className="mt-4 space-y-3">
            {leads.map((lead) => {
              const req = lead.request as {
                equipment_type: string;
                city: string;
                name: string;
                phone: string;
                email: string | null;
                description: string | null;
                start_date: string | null;
                created_at: string;
              } | null;
              if (!req) return null;

              return (
                <Link
                  key={lead.id}
                  href={`/lead/${lead.id}`}
                  className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {getTypeLabel(req.equipment_type)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {req.city}
                        {req.start_date
                          ? ` · od ${formatDate(req.start_date)}`
                          : ""}
                      </p>
                      {req.description && (
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {req.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {lead.status === "sent" && (
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                          Nowe
                        </span>
                      )}
                      {lead.status === "viewed" && (
                        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                          Wyświetlone
                        </span>
                      )}
                      {lead.status === "responded" && (
                        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                          Odpowiedź
                        </span>
                      )}
                      <p className="mt-1 text-xs text-gray-400">
                        {formatDate(lead.sent_at)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
            <p className="text-gray-500">
              Jeszcze nie masz zapytań. Gdy ktoś będzie szukał maszyny
              w Twojej okolicy — dostaniesz email z powiadomieniem.
            </p>
          </div>
        )}
      </section>

      {/* Bookmark reminder */}
      <div className="mt-12 rounded-xl bg-amber-50 border border-amber-200 p-5 text-center">
        <p className="text-sm font-medium text-amber-800">
          Zapisz tę stronę w zakładkach — to Twój panel do zarządzania maszynami i zapytaniami.
        </p>
        <p className="mt-1 text-xs text-amber-600">
          Link do panelu jest też w emailu powitalnym.
        </p>
      </div>
    </div>
  );
}
