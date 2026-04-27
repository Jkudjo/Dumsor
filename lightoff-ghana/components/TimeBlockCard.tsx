import { formatDate } from "@/lib/schedule";
import type { OutageWindow } from "@/lib/types";

type Variant = "neutral" | "danger" | "ok";

const ring: Record<Variant, string> = {
  neutral: "ring-1 ring-slate-200",
  danger: "ring-2 ring-red-300 bg-red-50/80",
  ok: "ring-2 ring-emerald-200 bg-emerald-50/80",
};

export default function TimeBlockCard({
  title,
  slot,
  emptyText,
  variant = "neutral",
}: {
  title: string;
  slot: OutageWindow | null;
  emptyText?: string;
  variant?: Variant;
}) {
  return (
    <div className={`rounded-3xl bg-white p-4 sketch-card ${ring[variant]}`}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{title}</p>
      {slot ? (
        <div className="mt-2">
          <p className="text-lg font-black text-slate-950">{slot.label}</p>
          <p className="mt-1 text-sm text-slate-600">{formatDate(slot.date)}</p>
        </div>
      ) : (
        <p className="mt-2 text-sm text-slate-600">{emptyText ?? "No slot found."}</p>
      )}
    </div>
  );
}
