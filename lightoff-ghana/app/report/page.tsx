export default async function ReportPage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}) {
  const { area: areaParam } = await searchParams;
  const area = areaParam ?? "";
  return (
    <main className="rounded-[2rem] bg-white p-6 sketch-card">
      <h1 className="text-3xl font-black text-slate-950">Report wrong area</h1>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
        This MVP does not submit reports yet. For production, connect this form to Formspree, Google Forms, Supabase, or a small API route.
      </p>
      <form className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font-black text-slate-700">
          Area name
          <input defaultValue={area} className="rounded-2xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-slate-950" />
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-700">
          Correct group or note
          <textarea rows={5} placeholder="Example: I think this area should be Group B..." className="rounded-2xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-slate-950" />
        </label>
        <button type="button" className="rounded-2xl bg-slate-950 px-4 py-3 font-black text-white">Save later in production</button>
      </form>
    </main>
  );
}
