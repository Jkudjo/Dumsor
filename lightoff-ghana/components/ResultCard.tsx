"use client";

import Link from "next/link";
import GroupBadge from "./GroupBadge";
import TimeBlockCard from "./TimeBlockCard";
import { formatDate, getCurrentOutage, getNextOutage, getTodayOutages, hasScheduleForDate, isSameTimetableDay } from "@/lib/schedule";
import type { Area } from "@/lib/types";

export default function ResultCard({ area }: { area: Area }) {
  const hasScheduleToday = hasScheduleForDate();
  const current = getCurrentOutage(area.group);
  const next = getNextOutage(area.group);
  const today = getTodayOutages(area.group);

  return (
    <section className="mt-5 rounded-3xl bg-white p-5 sketch-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Matched place</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">{area.name}</h2>
          <p className="mt-1 text-sm font-semibold text-slate-600">{area.region} Region / area listing</p>
        </div>
        <GroupBadge group={area.group} large />
      </div>

      {!hasScheduleToday ? (
        <div className="mt-5 rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">Schedule unavailable for today</p>
          <p className="mt-2 text-lg font-black leading-snug text-amber-950">
            This area is in Group {area.group}, but the current dataset does not include a timetable entry for today.
          </p>
          <p className="mt-2 text-sm font-semibold text-amber-900/90">
            The app is only showing outage answers for dates that exist in the available schedule data.
          </p>
        </div>
      ) : current ? (
        <div className="mt-5 rounded-2xl border-2 border-red-200 bg-red-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-800">Dumsor in progress</p>
          <p className="mt-2 text-lg font-black leading-snug text-red-950">
            Group {area.group} is scheduled for supply interruption in this window - treat this period as dumsor unless you know otherwise.
          </p>
          <p className="mt-2 text-sm font-semibold text-red-900/90">
            Active now: <span className="font-black">{current.label}</span>
          </p>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">Not in a dumsor window now</p>
          <p className="mt-2 text-lg font-black leading-snug text-emerald-950">
            For Group {area.group}, the timetable does not show a supply interruption during the current time block - you are not inside a scheduled dumsor slot right now.
          </p>
          {next ? (
            <p className="mt-2 text-sm font-semibold text-emerald-900/90">
              Next scheduled dumsor: <span className="font-black">{next.label}</span>
              {!isSameTimetableDay(next.date) ? ` · ${formatDate(next.date)}` : ""}
              {isSameTimetableDay(next.date) ? " (later today)" : ""}
            </p>
          ) : null}
        </div>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <TimeBlockCard
          title={!hasScheduleToday ? "Light-off right now" : current ? "This light-off window (now)" : "Light-off right now"}
          slot={hasScheduleToday ? current : null}
          emptyText={!hasScheduleToday ? "No timetable entry is available for today in the current dataset." : `No light-off slot for Group ${area.group} at the current time.`}
          variant={!hasScheduleToday ? "neutral" : current ? "danger" : "ok"}
        />
        <TimeBlockCard
          title={!hasScheduleToday ? "Next light-off on timetable" : current ? "Next light-off after this one" : "Next light-off on timetable"}
          slot={hasScheduleToday ? next : null}
          emptyText={!hasScheduleToday ? "No future outage can be shown because today is missing from the current timetable data." : undefined}
          variant="neutral"
        />
      </div>

      <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-900">{hasScheduleToday ? `Today's affected time for Group ${area.group}` : `Today's timetable status for Group ${area.group}`}</p>
        {hasScheduleToday ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {today.map((slot) => (
              <span key={`${slot.date}-${slot.timeRange}`} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
                {slot.label}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm font-semibold text-slate-600">No timetable entry is available for today in the current dataset.</p>
        )}
      </div>

      <Link
        href={`/report?area=${encodeURIComponent(area.name)}`}
        className="mt-4 inline-flex w-full justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
      >
        Report wrong area
      </Link>
    </section>
  );
}
