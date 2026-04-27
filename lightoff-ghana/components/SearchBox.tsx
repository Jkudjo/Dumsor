"use client";

import { useMemo, useState } from "react";
import RegionFilter from "./RegionFilter";
import ResultCard from "./ResultCard";
import { searchAreas } from "@/lib/search";
import type { Area, Region } from "@/lib/types";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "All">("All");
  const results = useMemo(() => searchAreas(query, region), [query, region]);
  const [selected, setSelected] = useState<Area | null>(null);

  const visibleSelected = selected && results.some((item) => item.name === selected.name) ? selected : results[0] ?? null;

  return (
    <div className="mt-6">
      <label htmlFor="search" className="text-sm font-black uppercase tracking-[0.18em] text-slate-600">
        Search your place
      </label>
      <input
        id="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setSelected(null);
        }}
        placeholder="Try Madina, Tema Comm 25, KNUST..."
        className="mt-2 w-full rounded-3xl border-2 border-slate-200 bg-white px-5 py-4 text-lg font-bold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
      />

      <div className="mt-4">
        <RegionFilter value={region} onChange={(value) => { setRegion(value); setSelected(null); }} />
      </div>

      <div className="mt-3 grid gap-2">
        {results.slice(0, 5).map((area) => (
          <button
            key={`${area.name}-${area.region}`}
            onClick={() => setSelected(area)}
            className={`flex items-center justify-between rounded-2xl border bg-white px-4 py-3 text-left transition ${visibleSelected?.name === area.name ? "border-slate-950" : "border-slate-200"}`}
          >
            <span>
              <span className="block font-black text-slate-950">{area.name}</span>
              <span className="text-sm font-semibold text-slate-500">{area.region}</span>
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{area.group}</span>
          </button>
        ))}
      </div>

      {visibleSelected ? <ResultCard area={visibleSelected} /> : (
        <div className="mt-5 rounded-3xl bg-white p-5 text-center sketch-card">
          <p className="font-black text-slate-950">No match found yet.</p>
          <p className="mt-1 text-sm text-slate-600">Try a nearby junction, estate, landmark, or region name.</p>
        </div>
      )}
    </div>
  );
}
