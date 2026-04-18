export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white px-6 pb-24 pt-16 lg:px-8 lg:pb-32 lg:pt-20"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.10),transparent_38%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_left,rgba(59,130,246,0.06),transparent_28%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
            Persönlicher Auto-Suchservice Schweiz
          </div>

          <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight text-slate-900 md:text-6xl xl:text-7xl">
            Wir finden das passende Auto für dich.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Kein Stress, keine endlose Suche und keine unübersichtlichen
            Inserate. Du sagst uns, was du suchst, und wir finden passende
            Fahrzeuge für dich.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#anfrage"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:scale-[1.02] hover:opacity-95"
            >
              Suchauftrag anfragen
            </a>

            <a
              href="#service"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Unser Service
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
            <span>✓ Klare Preisstruktur</span>
            <span>✓ Persönlicher Service</span>
            <span>✓ Schweizweit</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-violet-100 blur-3xl opacity-70" />
          <div className="absolute -right-8 bottom-8 h-40 w-40 rounded-full bg-blue-100 blur-3xl opacity-70" />

          <div className="relative rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_80px_-20px_rgba(15,23,42,0.18)]">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Beispiel-Anfrage
              </span>
              <span className="rounded-full bg-gradient-to-r from-blue-50 to-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                Premium Service
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Fahrzeugtyp</p>
                <p className="mt-1 font-semibold text-slate-900">
                  SUV / Kombi / Limousine
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Budget</p>
                <p className="mt-1 font-semibold text-slate-900">
                  20’000 – 35’000 CHF
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Bevorzugt</p>
                <p className="mt-1 font-semibold text-slate-900">
                  Automatik · Hybrid · max. 70’000 km
                </p>
              </div>

              <div className="rounded-2xl border border-violet-100 bg-gradient-to-r from-blue-50 to-violet-50 p-4">
                <p className="text-sm text-slate-600">Carvoo prüft für dich</p>
                <p className="mt-1 font-semibold text-slate-900">
                  Preis · Zustand · Historie · Plausibilität
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
