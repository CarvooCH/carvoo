export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-200" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            Persönlicher Auto-Suchservice in der Schweiz
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Dein nächstes Auto – gezielt gesucht statt endlos verglichen.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Carvoo hilft dir dabei, passende Fahrzeuge anhand deiner Wünsche zu
            finden, Angebote vorzusortieren und schneller bessere Entscheidungen
            zu treffen.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#anfrage"
              className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Anfrage starten
            </a>
            <a
              href="#ablauf"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              So funktioniert es
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200">
              <p className="text-2xl font-bold">1:1</p>
              <p className="mt-1 text-sm text-slate-600">Persönliche Suche</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200">
              <p className="text-2xl font-bold">Zeit</p>
              <p className="mt-1 text-sm text-slate-600">Weniger Aufwand für dich</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200">
              <p className="text-2xl font-bold">Klar</p>
              <p className="mt-1 text-sm text-slate-600">Vorsortierte Vorschläge</p>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Beispiel-Anfrage
                </p>
                <h2 className="mt-2 text-2xl font-bold">Wunschauto gesucht</h2>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                Live-Service
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Budget</p>
                <p className="mt-1 font-semibold">25’000 CHF</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Fahrzeugtyp</p>
                <p className="mt-1 font-semibold">Kombi oder SUV</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Anforderungen</p>
                <p className="mt-1 font-semibold">
                  Automat, Allrad, familienfreundlich, max. 80’000 km
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-white">
                <p className="text-sm text-slate-300">Carvoo macht daraus</p>
                <p className="mt-2 text-lg font-semibold">
                  Eine gezielte Suche mit passender Vorauswahl und ehrlicher
                  Einschätzung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}