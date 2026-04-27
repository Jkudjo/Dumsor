"use client";

import { useMemo, useState } from "react";
import GroupBadge from "./GroupBadge";
import RegionFilter from "./RegionFilter";
import { searchAreasForListing } from "@/lib/search";
import type { Area, Group, Region } from "@/lib/types";

const groups: Group[] = ["A", "B", "C"];

function byName(a: Area, b: Area): number {
  return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
}

export default function GroupsListing() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "All">("All");

  const filtered = useMemo(() => searchAreasForListing(query, region), [query, region]);

  const byGroup = useMemo(() => {
    const map: Record<Group, Area[]> = { A: [], B: [], C: [] };
    for (const area of filtered) {
      map[area.group].push(area);
    }
    for (const g of groups) {
      map[g].sort(byName);
    }
    return map;
  }, [filtered]);

  const total = filtered.length;

  return (
    <div>
      <label htmlFor="groups-search" className="text-sm font-black uppercase tracking-[0.18em] text-slate-600">
        Search areas
      </label>
      <input
        id="groups-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter by place name, region, alias..."
        className="mt-2 w-full rounded-3xl border-2 border-slate-200 bg-white px-5 py-4 text-lg font-bold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
      />

      <div className="mt-4">
        <RegionFilter value={region} onChange={setRegion} />
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-500">
        {total === 0 ? "No areas match." : `${total} area${total === 1 ? "" : "s"} shown`}
      </p>

      <div className="mt-5 grid gap-4">
        {groups.map((group) => (
          <section key={group} className="rounded-[2rem] bg-white p-5 sketch-card">
            <GroupBadge group={group} />
            <div className="mt-4 grid gap-2">
              {byGroup[group].length === 0 ? (
                <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500">
                  No areas in Group {group} for this search.
                </p>
              ) : (
                byGroup[group].map((area) => (
                  <div key={`${area.name}-${area.region}`} className="rounded-2xl bg-slate-50 px-4 py-3">
                    <p className="font-black text-slate-950">{area.name}</p>
                    <p className="text-sm font-semibold text-slate-500">{area.region}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
