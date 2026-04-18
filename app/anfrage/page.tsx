import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import RequestForm from "@/components/RequestForm";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Anfrage starten",
  description:
    "Starte jetzt deine Carvoo Anfrage: teile uns Wunschfahrzeug und Budget mit, wir prüfen die Umsetzbarkeit und starten danach mit klarer Preisstruktur.",
  path: "/anfrage",
  keywords: [
    "Auto Anfrage Schweiz",
    "Wunschauto finden",
    "Carvoo Anfrage",
    "Auto Suchhilfe Formular",
  ],
});

const trustFacts = [
  "Anfrage senden und Machbarkeit prüfen lassen",
  "Auftragsannahme nur bei realistischer Umsetzbarkeit",
  "Transparente Preislogik mit Suchgebühr und Erfolgsprovision",
  "Persönlicher Service in der Schweiz",
  "Klare Rückmeldung statt automatischer Massenantworten",
];

export default function AnfragePage() {
  return (
    <>
      <PageIntro
        eyebrow="Anfrage"
        title="Starte jetzt deine Fahrzeugsuche mit Carvoo"
        description="Je präziser deine Angaben, desto schneller können wir die Umsetzbarkeit prüfen. Nach Auftragsbestätigung startet die Suche mit klar definiertem Preismodell."
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
                  Wir prüfen deine Angaben und die Umsetzbarkeit.
                </p>
              </li>
              <li className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                  Schritt 2
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  Nach Auftragsbestätigung startet die Suche mit Suchgebühr.
                </p>
              </li>
              <li className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                  Schritt 3
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  Du erhältst eine strukturierte Auswahl passender Fahrzeuge.
                </p>
              </li>
            </ol>

            <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                Preisübersicht
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                <li>
                  Suchgebühr vor Start: <strong>??? CHF</strong>
                </li>
                <li>
                  Vermittlungsprovision bei Erfolg: <strong>??? %</strong> (mind.
                  <strong> ??? CHF</strong>)
                </li>
                <li>
                  Optionaler Fahrzeugcheck: <strong>??? CHF</strong> pro Fahrzeug
                </li>
              </ul>
            </div>

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

            <Link
              href="/preise"
              className="mt-3 inline-flex rounded-xl border border-violet-300 bg-violet-50 px-5 py-3 text-sm font-semibold text-violet-800 transition hover:bg-violet-100"
            >
              Preismodell im Detail
            </Link>

            <Link
              href="/partner-werden"
              className="mt-3 inline-flex rounded-xl border border-violet-300 bg-violet-50 px-5 py-3 text-sm font-semibold text-violet-800 transition hover:bg-violet-100"
            >
              Du bist Garage? Partner werden
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
