const steps = [
  {
    title: "Anfrage senden",
    text: "Du beschreibst dein Wunschauto, dein Budget und die wichtigsten Anforderungen.",
  },
  {
    title: "Wir suchen und filtern",
    text: "Wir prüfen passende Fahrzeuge und sortieren unpassende Angebote frühzeitig aus.",
  },
  {
    title: "Passende Optionen erhalten",
    text: "Du bekommst eine bessere Auswahl, mit der du gezielter entscheiden kannst.",
  },
];

export default function Steps() {
  return (
    <section id="ablauf" className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
            So funktioniert’s
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            In drei einfachen Schritten
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Klarer Ablauf, persönliche Unterstützung und weniger Aufwand für
            dich.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.14)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-200">
                {index + 1}
              </div>

              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}