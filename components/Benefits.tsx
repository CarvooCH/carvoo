const benefits = [
  {
    title: "Einfach Wunschauto angeben",
    text: "Kunden beschreiben ihre Wünsche und Anforderungen, statt selbst stundenlang Inserate zu durchsuchen.",
  },
  {
    title: "Persönliche Vorauswahl",
    text: "Carvoo sucht passende Fahrzeuge und filtert unpassende Angebote frühzeitig heraus.",
  },
  {
    title: "Mehr Sicherheit",
    text: "Interessante Fahrzeuge können geprüft und ehrlich eingeschätzt werden, bevor der Kunde Zeit verliert.",
  },
];

export default function Benefits() {
  return (
    <section id="vorteile" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Vorteile
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Warum Carvoo?
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold">{benefit.title}</h3>
            <p className="mt-4 leading-7 text-slate-600">{benefit.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}