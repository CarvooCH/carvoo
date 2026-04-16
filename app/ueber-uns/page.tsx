import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Über uns",
  description:
    "Lerne Carvoo kennen: Mission, Arbeitsweise und Werte hinter dem persönlichen Auto-Suchservice für die Schweiz.",
  path: "/ueber-uns",
  keywords: [
    "Carvoo Über uns",
    "Auto Suchservice Team",
    "Mission Carvoo",
    "Autokauf Unterstützung Schweiz",
  ],
});

const principles = [
  {
    title: "Klarheit vor Komplexität",
    text: "Wir halten den Prozess bewusst schlank. Du sollst jederzeit verstehen, wo du stehst und was als nächstes passiert.",
  },
  {
    title: "Service statt Plattformrauschen",
    text: "Unser Modell ist auf persönliche Betreuung ausgelegt, nicht auf maximale Seitenaufrufe oder zufällige Klickpfade.",
  },
  {
    title: "Passung statt Masse",
    text: "Wir messen Erfolg nicht an der Anzahl Inserate, sondern an relevanten Optionen, die zu deiner Situation passen.",
  },
];

const regions = [
  "Deutschschweiz",
  "Romandie",
  "Tessin",
  "Schweizweite Fahrzeugangebote",
];

export default function UeberUnsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Über Carvoo"
        title="Ein moderner Service für eine stressfreie Autosuche"
        description="Carvoo wurde mit einem klaren Ziel aufgebaut: Menschen in der Schweiz beim Fahrzeugkauf persönlich zu entlasten und bessere Entscheidungen zu ermöglichen."
        primaryCta={{ href: "/anfrage", label: "Mit Carvoo starten" }}
        secondaryCta={{ href: "/leistungen", label: "Leistungen" }}
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10">
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Unsere Mission
            </h2>
            <p className="mt-5 leading-8 text-slate-700">
              Die klassische Autosuche ist oft unübersichtlich, zeitintensiv
              und frustrierend. Carvoo schafft eine verständliche Struktur,
              damit du schneller bei Fahrzeugen landest, die wirklich zu deinem
              Bedarf passen.
            </p>
            <p className="mt-4 leading-8 text-slate-700">
              Wir kombinieren digitale Effizienz mit menschlicher Einordnung.
              Das Ergebnis ist ein Suchprozess, der nicht nur schneller,
              sondern auch sicherer wirkt.
            </p>
          </article>

          <aside className="rounded-3xl border border-violet-200 bg-violet-50 p-8 text-slate-900 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Einsatzgebiet
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Schweizweit aktiv
            </h2>
            <ul className="mt-5 space-y-3 text-slate-700">
              {regions.map((region) => (
                <li key={region} className="flex items-center gap-3">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-200 text-xs font-black text-violet-800">
                    &gt;
                  </span>
                  <span>{region}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/anfrage"
              className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-5 py-3 text-sm font-bold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)]"
            >
              Anfrage einreichen
            </Link>
            <Link
              href="/kontakt"
              className="mt-3 inline-flex rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
            >
              Frage stellen
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Unsere Arbeitsprinzipien
          </h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h3 className="text-xl font-extrabold tracking-tight text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-violet-50 p-8 lg:p-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Wenn du willst, übernehmen wir ab jetzt die Suche
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-slate-700">
            Das Anfrageformular dauert nur wenige Minuten. Danach starten wir
            mit einer strukturierten Vorauswahl für dein Wunschfahrzeug.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/anfrage"
              className="rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-5 py-3 text-sm font-semibold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)] transition hover:brightness-105"
            >
              Kostenlos beginnen
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
