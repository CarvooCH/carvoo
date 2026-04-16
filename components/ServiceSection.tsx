const items = [
  {
    title: "Passende Fahrzeuge finden",
    text: "Du sagst uns, was du suchst, und wir übernehmen die strukturierte Suche nach passenden Autos.",
  },
  {
    title: "Angebote vorsortieren",
    text: "Wir filtern unpassende oder auffällige Inserate frühzeitig aus und reduzieren den Suchaufwand.",
  },
  {
    title: "Bessere Auswahl erhalten",
    text: "Du bekommst nicht hunderte Inserate, sondern eine klarere und relevantere Auswahl.",
  },
];

export default function ServiceSection() {
  return (
    <section id="service" className="bg-slate-50 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
            Unser Service
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Carvoo macht die Autosuche einfacher, klarer und persönlicher.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Statt selbst stundenlang Inserate zu vergleichen, beschreibst du
            einfach dein Wunschauto. Carvoo übernimmt die Vorauswahl und hilft
            dir, schneller die richtigen Optionen zu sehen.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.14)]"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}