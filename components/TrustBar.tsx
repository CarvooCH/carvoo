export default function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 text-sm text-slate-600 md:grid-cols-3 lg:px-8">
        <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
          Persönliche Begleitung statt anonymer Marktplatzsuche
        </div>
        <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
          Klare Anforderungen, gezielte Vorauswahl, weniger Zeitverlust
        </div>
        <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
          Ideale Basis für späteren Ausbau zu einer grösseren Plattform
        </div>
      </div>
    </section>
  );
}