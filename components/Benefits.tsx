export default function ServiceSection() {
  return (
    <section id="service" className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
            Service
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Carvoo filtert für dich die richtigen Fahrzeuge heraus.
          </h2>
        </div>

        <div className="space-y-6 text-slate-600">
          <p className="text-lg leading-8">
            Die meisten Menschen verlieren Zeit mit zu vielen Inseraten,
            unklaren Angeboten und Fahrzeugen, die am Ende gar nicht passen.
          </p>

          <p className="leading-8">
            Genau dort setzt Carvoo an. Du beschreibst dein Wunschauto und wir
            übernehmen die strukturierte Suche, die Vorauswahl und die erste
            Einschätzung. So bekommst du nicht hunderte Inserate, sondern eine
            deutlich bessere Auswahl.
          </p>
        </div>
      </div>
    </section>
  );
}