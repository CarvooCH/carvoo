import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Preise",
  description:
    "Transparentes Carvoo Preismodell: Suchgebühr, Vermittlungsprovision, optionaler Fahrzeugcheck und klarer Ablauf für die Fahrzeugsuche.",
  path: "/preise",
  keywords: [
    "Carvoo Preise",
    "Auto Suchservice Kosten",
    "Vermittlungsprovision Auto",
    "Fahrzeugcheck Preis",
  ],
});

const processSteps = [
  "Der Kunde stellt eine Suchanfrage mit den gewünschten Fahrzeugkriterien.",
  "Die Anfrage wird geprüft und nur bei realistischer Umsetzbarkeit angenommen.",
  "Nach Bestätigung des Auftrags erfolgt die Zahlung der Suchgebühr.",
  "Anschließend beginnt die aktive Fahrzeugsuche.",
  "Der Kunde erhält eine Auswahl passender Fahrzeuge.",
  "Optional werden Besichtigungen und Checks durchgeführt.",
  "Bei erfolgreichem Kauf fällt eine Vermittlungsprovision an.",
];

const includedInSearchFee = [
  "Marktanalyse",
  "Recherche und Vorauswahl",
  "Zusammenstellung von 3-5 passenden Fahrzeugen",
];

const optionalServices = ["Fahrzeugcheck", "Aufbereitung", "Lieferung"];

export default function PreisePage() {
  return (
    <>
      <PageIntro
        eyebrow="Preise"
        title="Transparentes Preismodell für deinen Suchauftrag"
        description="So ist der Ablauf aufgebaut: klare Startgebühr, faire Provision bei erfolgreichem Kauf und optionale Zusatzleistungen für mehr Sicherheit."
        primaryCta={{ href: "/anfrage", label: "Suchauftrag anfragen" }}
        secondaryCta={{ href: "/kontakt", label: "Frage zu Preisen" }}
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Ablauf deines Auftrags
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <li
              key={step}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                Schritt {index + 1}
              </p>
              <p className="mt-2 leading-7 text-slate-700">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Preisstruktur
          </h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">Suchgebühr</h3>
              <p className="mt-3 text-3xl font-black text-violet-700">??? CHF</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Pauschal vor Start der Suche zu bezahlen.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {includedInSearchFee.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 text-violet-700">&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Vermittlungsprovision
              </h3>
              <p className="mt-3 text-3xl font-black text-violet-700">??? %</p>
              <p className="mt-2 text-sm text-slate-700">
                Mindestbetrag: <strong>??? CHF</strong>
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Fällig nur bei erfolgreichem Fahrzeugkauf über den Service.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Die bereits bezahlten <strong>??? CHF</strong> werden auf die
                Provision angerechnet.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Besichtigung & Fahrzeugcheck
              </h3>
              <p className="mt-3 text-3xl font-black text-violet-700">??? CHF</p>
              <p className="mt-2 text-sm text-slate-700">pro Fahrzeug</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Besichtigung vor Ort</li>
                <li>Probefahrt</li>
                <li>Zustandsanalyse</li>
                <li>Foto- und Videodokumentation</li>
                <li>Ehrliche Bewertung und Empfehlung</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Leistungsumfang und Dauer
            </h2>
            <ul className="mt-4 space-y-2 leading-7 text-slate-700">
              <li>Ein Auftrag gilt als erfüllt, wenn 1-5 passende Fahrzeuge geliefert wurden.</li>
              <li>Die Fahrzeuge müssen den vereinbarten Suchkriterien entsprechen.</li>
              <li>Die Suche erfolgt innerhalb von maximal 14-30 Tagen (je nach Auftrag).</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Wichtige Hinweise
            </h2>
            <ul className="mt-4 space-y-2 leading-7 text-slate-700">
              <li>Die Suchgebühr ist nicht rückerstattbar.</li>
              <li>Bei erfolgreichem Kauf wird die Suchgebühr vollständig angerechnet.</li>
              <li>Es besteht keine Kaufverpflichtung für den Kunden.</li>
              <li>Die finale Entscheidung liegt immer beim Kunden.</li>
              <li>Preise und Leistungen können je nach Aufwand variieren.</li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-slate-800">
              Mögliche Optionen: {optionalServices.join(", ")}
            </p>
          </article>
        </div>

        <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            Nächster Schritt
          </h2>
          <p className="mt-3 max-w-3xl leading-8 text-slate-700">
            Wenn du starten möchtest, sende jetzt deine Anfrage. Danach prüfen wir
            die Umsetzbarkeit und bestätigen den Auftrag.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/anfrage"
              className="rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-5 py-3 text-sm font-bold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)]"
            >
              Suchauftrag anfragen
            </Link>
            <Link
              href="/kontakt"
              className="rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
            >
              Frage stellen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
