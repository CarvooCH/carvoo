import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Leistungen",
  description:
    "Übersicht aller Carvoo Leistungen: strukturierte Fahrzeugsuche, Angebotsfilterung, persönliche Begleitung und transparentes Preismodell in der Schweiz.",
  path: "/leistungen",
  keywords: [
    "Auto Suchservice Leistungen",
    "Fahrzeug Vorauswahl Schweiz",
    "Auto Kauf Begleitung",
    "Gebrauchtwagen Beratung",
  ],
});

const pillars = [
  {
    title: "Suchstrategie nach deinen Kriterien",
    body: "Wir starten nicht mit zufälligen Inseraten, sondern mit einer klaren Suchlogik aus Budget, Fahrzeugtyp, Antrieb, Getriebe und individuellen Wünschen.",
  },
  {
    title: "Filterung unpassender Angebote",
    body: "Carvoo reduziert den Suchaufwand durch frühe Aussortierung auffälliger oder unpassender Inserate. So bleibt nur die relevante Auswahl übrig.",
  },
  {
    title: "Persönliche Entscheidungsgrundlage",
    body: "Du bekommst eine verständliche Auswahl mit Kontext, damit du Entscheidungen schneller und mit mehr Sicherheit treffen kannst.",
  },
];

const included = [
  "Persönliches Briefing über Anfrageformular",
  "Strukturierte Markt- und Angebotsvorauswahl",
  "Bewertung von Passung und Plausibilität",
  "Klare nächste Schritte für deinen Entscheid",
];

const notIncluded = [
  "Eigener Marktplatz mit Tausenden Live-Inseraten",
  "Automatisierter Blindkauf ohne Rückfragen",
  "Unklare Massen-Empfehlungen ohne Filter",
];

export default function LeistungenPage() {
  return (
    <>
      <PageIntro
        eyebrow="Leistungen"
        title="Was Carvoo konkret für deine Autosuche übernimmt"
        description="Unser Fokus liegt auf klarer Vorauswahl und persönlicher Unterstützung statt Informationsüberlastung. Hier siehst du transparent, was enthalten ist und worauf wir bewusst verzichten."
        primaryCta={{ href: "/anfrage", label: "Suchauftrag anfragen" }}
        secondaryCta={{ href: "/preise", label: "Preise ansehen" }}
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
                {pillar.title}
              </h2>
              <p className="mt-4 leading-7 text-slate-700">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Transparente Preisstruktur
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            Die Suche startet mit einer klaren Suchgebühr, bei erfolgreichem Kauf
            fällt eine Provision an, und Besichtigung oder Fahrzeugcheck können
            optional dazugebucht werden.
          </p>
          <p className="mt-3 text-sm font-semibold text-slate-800">
            Suchgebühr: ??? CHF · Provision bei Erfolg: ??? % (mind. ??? CHF) ·
            Fahrzeugcheck optional: ??? CHF
          </p>
          <Link
            href="/preise"
            className="mt-5 inline-flex rounded-xl border border-violet-300 bg-white px-5 py-3 text-sm font-semibold text-violet-800 transition hover:bg-violet-100"
          >
            Zum Preismodell
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7">
            <h2 className="text-2xl font-black tracking-tight text-emerald-950">
              Inbegriffen
            </h2>
            <ul className="mt-5 space-y-3 text-emerald-900">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-7">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-xs font-black !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)]">
                    &gt;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
            <h2 className="text-2xl font-black tracking-tight text-amber-950">
              Nicht unser Ansatz
            </h2>
            <ul className="mt-5 space-y-3 text-amber-900">
              {notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-7">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-700 text-xs font-black !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)]">
                    !
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-violet-200 bg-violet-50 p-8 text-slate-900 lg:p-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Bereit für weniger Suchaufwand?
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-700">
            Starte mit einer Anfrage zur Machbarkeitsprüfung. Je klarer deine Angaben,
            desto schneller können wir passende Fahrzeugoptionen für dich
            priorisieren.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
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
            <Link
              href="/faq"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Häufige Fragen lesen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
