const steps = [
  "Wünsche und Budget mitteilen",
  "Carvoo sucht passende Fahrzeuge",
  "Geeignete Angebote werden geprüft",
  "Du erhältst klare Vorschläge",
];

export default function Steps() {
  return (
    <section id="ablauf" className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Ablauf
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            So funktioniert&apos;s
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-200"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                {index + 1}
              </div>
              <p className="text-lg font-semibold leading-7">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}