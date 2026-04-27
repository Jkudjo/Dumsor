import type { Group } from "@/lib/types";

const groupClass: Record<Group, string> = {
  A: "bg-amber-100 text-amber-900 border-amber-300",
  B: "bg-sky-100 text-sky-900 border-sky-300",
  C: "bg-emerald-100 text-emerald-900 border-emerald-300",
};

export default function GroupBadge({ group, large = false }: { group: Group; large?: boolean }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full border font-black ${groupClass[group]} ${large ? "px-5 py-2 text-2xl" : "px-3 py-1 text-sm"}`}>
      Group {group}
    </span>
  );
}
