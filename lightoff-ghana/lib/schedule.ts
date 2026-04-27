import timetable from "@/data/timetable.json";
import type { Group, OutageWindow, TimeTable } from "./types";

const typedTimetable = timetable as TimeTable;

/** Timetable entries are Ghana (ECG) days; avoid mixing UTC calendar with local clock (breaks SSR hydration). */
const GHANA_TZ = "Africa/Accra";

const labels: Record<string, string> = {
  "00:00-06:00": "12:00AM to 6:00AM",
  "06:00-12:00": "6:00AM to 12:00PM",
  "12:00-18:00": "12:00PM to 6:00PM",
  "18:00-00:00": "6:00PM to 12:00AM",
};

/** YYYY-MM-DD calendar day in Ghana for the given instant (same on server + browser for that instant). */
export function dateKey(date = new Date()): string | null {
  const key = new Intl.DateTimeFormat("en-CA", {
    timeZone: GHANA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  return typedTimetable[key] ? key : null;
}

function minutesFromTime(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

/** Minutes since midnight in Ghana — must match timetable block boundaries. */
function currentMinutes(date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: GHANA_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

function inRange(range: string, date = new Date()): boolean {
  const [start, end] = range.split("-");
  const now = currentMinutes(date);
  const startMinutes = minutesFromTime(start);
  const endMinutes = end === "00:00" ? 24 * 60 : minutesFromTime(end);
  return now >= startMinutes && now < endMinutes;
}

export function getTodayOutages(group: Group, date = new Date()): OutageWindow[] {
  const key = dateKey(date);
  if (!key) return [];
  return Object.entries(typedTimetable[key])
    .filter(([, activeGroup]) => activeGroup === group)
    .map(([timeRange]) => ({ date: key, timeRange, group, label: labels[timeRange] ?? timeRange }));
}

export function getCurrentOutage(group: Group, date = new Date()): OutageWindow | null {
  return getTodayOutages(group, date).find((slot) => inRange(slot.timeRange, date)) ?? null;
}

export function getNextOutage(group: Group, date = new Date()): OutageWindow | null {
  const keys = Object.keys(typedTimetable).sort();
  const today = dateKey(date);
  if (!today) return null;
  const todayIndex = keys.indexOf(today);
  const orderedDates = [...keys.slice(todayIndex), ...keys.slice(0, todayIndex)];
  const now = currentMinutes(date);

  for (const key of orderedDates) {
    for (const [timeRange, activeGroup] of Object.entries(typedTimetable[key])) {
      if (activeGroup !== group) continue;
      const [start] = timeRange.split("-");
      if (key !== today || minutesFromTime(start) >= now) {
        return { date: key, timeRange, group, label: labels[timeRange] ?? timeRange };
      }
    }
  }
  return null;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00Z`));
}

/** Same calendar day as the timetable key used for “today” lookups (consistent with dateKey). */
export function isSameTimetableDay(outageDate: string, date = new Date()): boolean {
  return outageDate === dateKey(date);
}

export function hasScheduleForDate(date = new Date()): boolean {
  return dateKey(date) !== null;
}
