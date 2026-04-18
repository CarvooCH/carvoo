import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Ablauf",
  description:
    "So läuft Carvoo Schritt für Schritt: von der Anfrage über Suchgebühr und aktive Suche bis zur passenden Fahrzeugauswahl in der Schweiz.",
  path: "/ablauf",
  keywords: [
    "Auto Suche Ablauf",
    "Suchauftrag Ablauf Schweiz",
    "Carvoo Prozess",
    "Fahrzeugauswahl Schweiz",
    "Auto Kauf Ablauf",
  ],
});

const steps = [
  {
    title: "Suchanfrage stellen",
    description:
      "Du teilst uns deine Kriterien mit, zum Beispiel Budget, Fahrzeugtyp, Antrieb, Getriebe und wichtige Ausstattungen.",
  },
  {
    title: "Machbarkeit prüfen",
    description:
      "Wir prüfen jede Anfrage auf realistische Umsetzbarkeit und nehmen nur Suchaufträge an, die wir seriös erfüllen können.",
  },
  {
    title: "Auftrag bestätigen",
    description:
      "Nach gemeinsamer Bestätigung des Auftrags wird die Suchgebühr fällig und der Suchauftrag offiziell gestartet.",
  },
  {
    title: "Aktive Suche starten",
    description:
      "Wir recherchieren den Markt, filtern unpassende Angebote und priorisieren passende Fahrzeuge für dein Profil.",
  },
  {
    title: "Passende Fahrzeuge erhalten",
    description:
      "Du bekommst eine strukturierte Auswahl mit relevanten Optionen statt einer unübersichtlichen Massenliste.",
  },
  {
    title: "Optional Fahrzeugcheck",
    description:
      "Auf Wunsch übernehmen wir Besichtigungen, Probefahrten, Zustandsanalyse sowie Foto- und Videodokumentation.",
  },
  {
    title: "Provision nur bei Erfolg",
    description:
      "Kommt ein Kauf zustande, fällt die Vermittlungsprovision an. Die bereits bezahlte Suchgebühr wird angerechnet.",
  },
];

const expectations = [
  {
    title: "Leistungsumfang",
    points: [
      "Ein Auftrag gilt als erfüllt bei 1-5 passenden Fahrzeugen",
      "Die Fahrzeuge orientieren sich an deinen vereinbarten Suchkriterien",
      "Die Suche läuft je nach Auftrag in der Regel über 14-30 Tage",
    ],
  },
  {
    title: "Preislogik",
    points: [
      "Suchgebühr vor Start: ??? CHF (nicht rückerstattbar)",
      "Vermittlungsprovision bei Erfolg: ??? % (mindestens ??? CHF)",
      "Optionaler Fahrzeugcheck: ??? CHF pro Fahrzeug",
    ],
  },
];

export default function AblaufPage() {
  return (
    <>
      <PageIntro
        eyebrow="Ablauf"
        title="In sieben klaren Schritten zur passenden Fahrzeugauswahl"
        description="Unser Ablauf ist klar strukturiert: von der Anfrage über die Suchgebühr bis zur fokussierten Fahrzeugauswahl und optionalen Checks."
        primaryCta={{ href: "/anfrage", label: "Suchauftrag anfragen" }}
        secondaryCta={{ href: "/preise", label: "Preismodell ansehen" }}
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <ol className="grid gap-5 md:grid-cols-2">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                Schritt {index + 1}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                {step.title}
              </h2>
              <p className="mt-4 leading-7 text-slate-700">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          {expectations.map((column) => (
            <article
              key={column.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3 text-slate-700">
                {column.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 leading-7">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-700 text-xs font-black !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)]">
                      &gt;
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-violet-100 via-white to-fuchsia-100 p-8 lg:p-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Bereit für deinen nächsten Schritt?
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-slate-700">
            Starte jetzt mit dem Anfrageformular und gib uns die Eckdaten, die
            wir für eine hochwertige Vorauswahl brauchen.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/anfrage"
              className="rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-5 py-3 text-sm font-semibold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)] transition hover:brightness-105"
            >
              Suchauftrag anfragen
            </Link>
            <Link
              href="/kontakt"
              className="rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
            >
              Erst eine Frage stellen
            </Link>
            <Link
              href="/preise"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Preise im Detail
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
