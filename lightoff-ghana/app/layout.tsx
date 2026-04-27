import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dumsor",
  description: "Search your area and check your load management group and dumsor window for Ghana.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto min-h-screen max-w-3xl px-4 py-5 sm:px-6">
          <header className="mb-5 flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-white">⚡</span>
              <span>
                <span className="block text-lg font-black leading-5 text-slate-950">Dumsor</span>
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Ghana</span>
                <span className="mt-1 block text-[11px] font-semibold leading-tight text-slate-400">
                  Developed by{" "}
                  <a
                    href="https://vertaforge.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 underline decoration-slate-300 underline-offset-2 hover:text-slate-950"
                  >
                    Vertaforge.com
                  </a>
                </span>
              </span>
            </a>
            <nav className="flex gap-2 text-sm font-bold text-slate-600">
              <a href="/groups" className="rounded-full bg-white px-3 py-2 shadow-sm">Groups</a>
              <a href="/about" className="rounded-full bg-white px-3 py-2 shadow-sm">About</a>
            </nav>
          </header>
          {children}
          <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs font-semibold text-slate-500">
            <p>
              Dumsor calendar · Developed by{" "}
              <a
                href="https://vertaforge.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-slate-950"
              >
                Vertaforge.com
              </a>
            </p>
            <p className="mt-2">
              Built for quick checks. Verify major updates with official ECG/NEDCo communication.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
