import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import RequestForm from "@/components/RequestForm";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Anfrage starten",
  description:
    "Starte jetzt deine Carvoo Anfrage: teile uns Wunschfahrzeug und Budget mit und erhalte eine strukturierte Vorauswahl für passende Autos in der Schweiz.",
  path: "/anfrage",
  keywords: [
    "Auto Anfrage Schweiz",
    "Wunschauto finden",
    "Carvoo Anfrage",
    "Auto Suchhilfe Formular",
  ],
});

const trustFacts = [
  "Kostenlos und unverbindlich starten",
  "Persönlicher Service in der Schweiz",
  "Klare Rückmeldung statt automatischer Massenantwort",
];

export default function AnfragePage() {
  return (
    <>
      <PageIntro
        eyebrow="Anfrage"
        title="Starte jetzt deine Fahrzeugsuche mit Carvoo"
        description="Je präziser deine Angaben, desto schneller können wir passende Optionen filtern. Das Formular dauert nur wenige Minuten."
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-7 lg:p-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              So geht es nach der Anfrage weiter
            </h2>
            <ol className="mt-6 space-y-4">
              <li className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                  Schritt 1
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  Wir prüfen deine Angaben und sortieren Prioritäten.
                </p>
              </li>
              <li className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                  Schritt 2
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  Carvoo filtert passende Fahrzeugangebote für dich.
                </p>
              </li>
              <li className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                  Schritt 3
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  Du erhältst eine strukturierte Auswahl für deinen Entscheid.
                </p>
              </li>
            </ol>

            <ul className="mt-6 space-y-3 text-slate-700">
              {trustFacts.map((fact) => (
                <li key={fact} className="flex items-start gap-3 leading-7">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-700 text-xs font-black text-white">
                    &gt;
                  </span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/kontakt"
              className="mt-7 inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Nur eine Frage stellen
            </Link>
          </aside>

          <div>
            <RequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
