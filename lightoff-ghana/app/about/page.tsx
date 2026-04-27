export default function AboutPage() {
  return (
    <main className="rounded-[2rem] bg-white p-6 sketch-card">
      <h1 className="text-3xl font-black text-slate-950">About Dumsor</h1>
      <p className="mt-3 leading-7 text-slate-600">
        Dumsor is a simple checker for Ghana load management schedules. Users search their area and see the group and affected window without digging through long PDF pages.
      </p>
      <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950">
        This version ships with sample data only. Paste the full cleaned list into /data/areas.json when ready.
      </div>
      <h2 className="mt-6 text-xl font-black text-slate-950">Data source</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
        Based on the PDF titled “800MW Global Load Management Time Table and Grouping 2026 6hrs”.
      </p>
    </main>
  );
}
