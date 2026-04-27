import type { Region } from "@/lib/types";

const regions: Array<Region | "All"> = ["All", "Accra", "Tema", "Volta", "Ashanti", "Eastern", "Central", "Western"];

export default function RegionFilter({ value, onChange }: { value: Region | "All"; onChange: (region: Region | "All") => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {regions.map((region) => (
        <button
          key={region}
          onClick={() => onChange(region)}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
            value === region ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700"
          }`}
        >
          {region}
        </button>
      ))}
    </div>
  );
}
