"use client";

import { useRef } from "react";
import { updateProspectStatus } from "../../lib/prospect-actions";

const STATUSES = [
  "new",
  "queued",
  "contacted",
  "responded",
  "registered",
  "rejected",
] as const;

const STATUS_STYLES: Record<string, string> = {
  new: "bg-gray-100 text-gray-800",
  queued: "bg-amber-100 text-amber-800",
  contacted: "bg-blue-100 text-blue-800",
  responded: "bg-purple-100 text-purple-800",
  registered: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function StatusSelect({
  prospectId,
  currentStatus,
}: {
  prospectId: string;
  currentStatus: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form action={updateProspectStatus} ref={formRef}>
      <input type="hidden" name="prospect_id" value={prospectId} />
      <select
        name="status"
        defaultValue={currentStatus}
        onChange={() => formRef.current?.requestSubmit()}
        className={`rounded-full border-0 px-2 py-0.5 text-xs font-medium cursor-pointer ${STATUS_STYLES[currentStatus] ?? ""}`}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </form>
  );
}
