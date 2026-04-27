import Fuse from "fuse.js";
import areas from "@/data/areas.json";
import type { Area, Region } from "./types";

const typedAreas = areas as Area[];

const fuse = new Fuse(typedAreas, {
  keys: ["name", "region", "aliases"],
  threshold: 0.36,
  ignoreLocation: true,
  includeScore: true,
});

export function searchAreas(query: string, region: Region | "All" = "All"): Area[] {
  const cleanQuery = query.trim();
  const base = region === "All" ? typedAreas : typedAreas.filter((area) => area.region === region);

  if (!cleanQuery) return base.slice(0, 8);

  const localFuse = region === "All" ? fuse : new Fuse(base, {
    keys: ["name", "region", "aliases"],
    threshold: 0.36,
    ignoreLocation: true,
    includeScore: true,
  });

  return localFuse.search(cleanQuery).map((result) => result.item).slice(0, 8);
}

/** Full-text search with no cap — for /groups listing. Empty query returns every area in scope (optionally filtered by region only). */
export function searchAreasForListing(query: string, region: Region | "All" = "All"): Area[] {
  const cleanQuery = query.trim();
  const base = region === "All" ? typedAreas : typedAreas.filter((area) => area.region === region);

  if (!cleanQuery) {
    return base;
  }

  const localFuse = region === "All" ? fuse : new Fuse(base, {
    keys: ["name", "region", "aliases"],
    threshold: 0.36,
    ignoreLocation: true,
    includeScore: true,
  });

  return localFuse.search(cleanQuery).map((result) => result.item);
}

export function allAreas(): Area[] {
  return typedAreas;
}
