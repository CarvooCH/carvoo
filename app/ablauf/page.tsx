import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Ablauf",
  description:
    "So funktioniert Carvoo Schritt für Schritt: von der Anfrage bis zur passenden Fahrzeugauswahl für deinen Auto-Kauf in der Schweiz.",
  path: "/ablauf",
  keywords: [
    "Auto Suche Ablauf",
    "Carvoo Prozess",
    "Fahrzeug Auswahl Schweiz",
    "Auto Kauf Struktur",
  ],
});

const steps = [
  {
    title: "Anfrage und Zielbild",
    description:
      "Du definierst Fahrzeugtyp, Budget und Prioritäten. Damit schaffen wir ein klares Suchprofil statt einer unscharfen Wunschliste.",
  },
  {
    title: "Markt-Sichtung und Vorauswahl",
    description:
      "Wir filtern Inserate anhand deiner Kriterien und trennen unpassende Optionen früh aus, um den Fokus auf relevante Fahrzeuge zu halten.",
  },
  {
    title: "Prüfung auf Plausibilität",
    description:
      "Carvoo achtet auf stimmige Eckdaten und reduziert typische Fehlgriffe, die bei der eigenständigen Suche oft erst spät auffallen.",
  },
  {
    title: "Klarer Entscheidungsrahmen",
    description:
      "Du erhältst eine verdauliche Auswahl und kannst mit mehr Sicherheit entscheiden, wie es im Kaufprozess weitergeht.",
  },
];

const expectations = [
  {
    title: "Wofür wir stehen",
    points: [
      "Persönliche Betreuung statt anonymem Massenprozess",
      "Klarer Ablauf mit nachvollziehbaren Schritten",
      "Fokus auf passende Optionen statt auf Menge",
    ],
  },
  {
    title: "Was du einplanen solltest",
    points: [
      "Je genauer deine Anfrage, desto effizienter die Vorauswahl",
      "Ein realistisch gesetztes Budget verbessert Trefferquote",
      "Rückfragen sind Teil eines seriösen Suchprozesses",
    ],
  },
];

export default function AblaufPage() {
  return (
    <>
      <PageIntro
        eyebrow="Ablauf"
        title="In vier klaren Schritten zur passenden Fahrzeugauswahl"
        description="Unser Prozess ist auf Verständlichkeit, Geschwindigkeit und Entscheidungsqualität ausgelegt. So bleibt die Suche strukturiert und nicht überladen."
        primaryCta={{ href: "/anfrage", label: "Schritt 1 starten" }}
        secondaryCta={{ href: "/leistungen", label: "Leistungen" }}
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
              Anfrage absenden
            </Link>
            <Link
              href="/kontakt"
              className="rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
            >
              Erst eine Frage stellen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
