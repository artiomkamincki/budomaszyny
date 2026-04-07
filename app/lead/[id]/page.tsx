import { getServiceClient } from "../../lib/admin-data";
import { EQUIPMENT_TYPES } from "../../lib/types";
import { notFound } from "next/navigation";
import type { RentalRequest } from "../../lib/types";

export const dynamic = "force-dynamic";

function getTypeLabel(value: string) {
  return EQUIPMENT_TYPES.find((t) => t.value === value)?.label ?? value;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL");
}

export default async function LeadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getServiceClient();

  // Get lead with request data
  const { data: lead } = await db
    .from("leads")
    .select("*, request:requests(*)")
    .eq("id", id)
    .single();

  if (!lead) notFound();

  // Mark as viewed
  if (lead.status === "sent") {
    await db
      .from("leads")
      .update({ status: "viewed", viewed_at: new Date().toISOString() })
      .eq("id", id);
  }

  const request = lead.request as RentalRequest;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <p className="text-sm font-medium text-amber-600">
            Zapytanie od BudoMaszyny
          </p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            {getTypeLabel(request.equipment_type)}
          </h1>
          <p className="text-lg text-gray-600">{request.city}</p>
        </div>

        <div className="mt-8 space-y-4">
          {request.description && (
            <div>
              <p className="text-sm font-medium text-gray-500">Szczegóły</p>
              <p className="text-gray-900">{request.description}</p>
            </div>
          )}

          {request.start_date && (
            <div>
              <p className="text-sm font-medium text-gray-500">Termin</p>
              <p className="text-gray-900">
                {formatDate(request.start_date)}
                {request.end_date
                  ? ` — ${formatDate(request.end_date)}`
                  : " — do uzgodnienia"}
              </p>
            </div>
          )}

          <hr className="border-gray-200" />

          <div>
            <p className="text-sm font-medium text-gray-500">
              Dane kontaktowe
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {request.name}
            </p>
            <p className="text-gray-900">
              Tel:{" "}
              <a
                href={`tel:${request.phone}`}
                className="text-amber-600 font-medium hover:underline"
              >
                {request.phone}
              </a>
            </p>
            {request.email && (
              <p className="text-gray-900">
                Email:{" "}
                <a
                  href={`mailto:${request.email}`}
                  className="text-amber-600 font-medium hover:underline"
                >
                  {request.email}
                </a>
              </p>
            )}
            {request.company && (
              <p className="text-gray-600">Firma: {request.company}</p>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href={`tel:${request.phone}`}
            className="inline-flex items-center justify-center rounded-xl bg-green-600 px-8 py-3.5 text-lg font-bold text-white shadow-lg hover:bg-green-700 transition-colors"
          >
            Zadzwoń teraz
          </a>
          <p className="mt-3 text-xs text-gray-500">
            Ten lead został wysłany przez BudoMaszyny.
          </p>
        </div>
      </div>
    </div>
  );
}
