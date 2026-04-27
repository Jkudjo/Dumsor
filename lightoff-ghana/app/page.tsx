import SearchBox from "@/components/SearchBox";

export default function HomePage() {
  return (
    <main>
      <section className="rounded-[2rem] bg-white p-6 sketch-card">
        <div className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-amber-900">
          Dumsor · 800MW load management
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-600">
          Dumsor calendar · Developed by{" "}
          <a
            href="https://vertaforge.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-slate-950 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-950"
          >
            Vertaforge.com
          </a>
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Find your group. Know your dumsor window.
        </h1>
        <p className="mt-3 text-base font-medium leading-7 text-slate-600">
          Search your town, estate, school, junction, or landmark.
        </p>
        <div className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-900">
          Schedule may change without notice. Treat this as a helper, not the final authority.
        </div>
      </section>
      <SearchBox />
    </main>
  );
}
