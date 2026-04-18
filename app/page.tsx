import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import StructuredData from "@/components/StructuredData";
import { createPageMetadata, siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Auto-Suchservice Schweiz",
  description:
    "Carvoo findet passende Autos für dich: persönliche Vorauswahl, strukturierter Suchprozess und transparentes Preismodell in der Schweiz.",
  path: "/",
  keywords: [
    "Auto Suchservice Schweiz",
    "passendes Auto finden",
    "Fahrzeugsuche Service",
    "Gebrauchtwagen Suche Schweiz",
    "Auto Beratung Schweiz",
    "Auto Suchservice Preise",
  ],
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Persönlicher Auto-Suchservice",
  provider: {
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
  },
  areaServed: {
    "@type": "Country",
    name: "Switzerland",
  },
  description:
    "Carvoo hilft Privatkunden in der Schweiz, passende Fahrzeuge schneller zu finden und unpassende Inserate früh auszusortieren.",
};

const valuePoints = [
  {
    title: "Weniger Suchaufwand",
    text: "Du musst nicht mehr hunderte Inserate einzeln vergleichen. Carvoo übernimmt die Vorarbeit und strukturiert die Suche.",
  },
  {
    title: "Bessere Vorauswahl",
    text: "Wir konzentrieren uns auf passende Fahrzeuge statt auf reine Masse. Du erhältst klarere Optionen für bessere Entscheidungen.",
  },
  {
    title: "Klare Preislogik",
    text: "Vor dem Start erhältst du volle Kostentransparenz: Suchgebühr, Provision bei Erfolg und optionale Zusatzleistungen.",
  },
];

const processPreview = [
  {
    step: "01",
    title: "Anfrage senden",
    text: "Du gibst uns alle wichtigen Eckdaten zu Wunschauto, Budget und Prioritäten.",
  },
  {
    step: "02",
    title: "Machbarkeit klären",
    text: "Wir prüfen deine Anfrage seriös und bestätigen den Suchauftrag nur bei realistischer Umsetzbarkeit.",
  },
  {
    step: "03",
    title: "Suche aktiv starten",
    text: "Nach Auftragsbestätigung beginnt die strukturierte Suche mit fokussierter Vorauswahl.",
  },
  {
    step: "04",
    title: "Passende Fahrzeuge erhalten",
    text: "Du erhältst eine klare Auswahl passender Optionen für eine sichere Entscheidung.",
  },
];

const audience = [
  "Berufstätige, die wenig Zeit für die Autosuche haben",
  "Menschen, die beim Fahrzeugkauf eine zweite Meinung wollen",
  "Käufer, die strukturierte Unterstützung statt Marktplatz-Chaos suchen",
];

export default function Home() {
  return (
    <>
      <StructuredData data={serviceSchema} />

      <PageIntro
        eyebrow="Auto-Suchservice Schweiz"
        title="Wir finden das passende Auto für dich und sparen dir den Suchstress."
        description="Carvoo ist dein persönlicher Auto-Suchservice in der Schweiz. Du nennst Kriterien und Budget, wir übernehmen Vorauswahl, Filterung und den strukturierten Prozess. Vor Suchstart ist die Preisstruktur klar definiert."
        primaryCta={{ href: "/anfrage", label: "Suchauftrag anfragen" }}
        secondaryCta={{ href: "/preise", label: "Preise ansehen" }}
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {valuePoints.map((point) => (
            <article
              key={point.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.6)]"
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
                {point.title}
              </h2>
              <p className="mt-4 leading-7 text-slate-700">{point.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-14 sm:px-6 lg:grid-cols-[1.1fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              So arbeitet Carvoo für deine Fahrzeugsuche
            </h2>
            <p className="mt-4 max-w-xl leading-8 text-slate-700">
              Unsere Struktur ist für hohe Entscheidungsqualität gebaut. Kein
              blindes Durchklicken, sondern ein klarer Suchprozess mit Fokus auf
              passende Fahrzeuge.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/ablauf"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Vollen Ablauf sehen
              </Link>
              <Link
                href="/preise"
                className="rounded-xl border border-violet-200 bg-violet-50 px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
              >
                Preise ansehen
              </Link>
              <Link
                href="/anfrage"
                className="rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-5 py-3 text-sm font-semibold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)] transition hover:brightness-105"
              >
                Suchauftrag anfragen
              </Link>
              <Link
                href="/kontakt"
                className="rounded-xl border border-violet-200 bg-violet-50 px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
              >
                Frage stellen
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {processPreview.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-xs font-bold tracking-[0.2em] text-violet-700">
                  {item.step}
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-50px_rgba(103,41,222,0.52)] lg:grid-cols-[1.2fr_1fr] lg:p-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Für wen ist Carvoo besonders sinnvoll?
            </h2>
            <p className="mt-4 leading-8 text-slate-700">
              Wenn du weniger Zeit verlieren und trotzdem souverän entscheiden
              willst, ist unser Service genau für dich gemacht.
            </p>
            <ul className="mt-6 space-y-3 text-slate-700">
              {audience.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-xs font-black text-violet-900">
                    &gt;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-2xl border border-violet-200 bg-violet-50 p-6 text-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Nächster Schritt
            </p>
            <h3 className="mt-3 text-2xl font-black text-slate-950">
              In wenigen Minuten zur klaren Kostenbasis
            </h3>
            <p className="mt-3 leading-7 text-slate-700">
              Über das Anfrageformular definierst du Fahrzeugtyp, Budget,
              Präferenzen und weitere Wünsche. Danach übernehmen wir die
              strukturierte Suche.
            </p>
            <div className="mt-4 rounded-xl border border-violet-200 bg-white p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Transparente Kostenlogik</p>
              <p className="mt-1">
                Suchgebühr: <strong>??? CHF</strong> · Provision bei Erfolg:{" "}
                <strong>??? %</strong> · Fahrzeugcheck optional: <strong>??? CHF</strong>
              </p>
            </div>
            <Link
              href="/anfrage"
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-5 py-3 text-sm font-bold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)]"
            >
              Suchauftrag anfragen
            </Link>
            <Link
              href="/preise"
              className="mt-3 inline-flex rounded-xl border border-violet-300 bg-white px-5 py-3 text-sm font-semibold text-violet-800 transition hover:bg-violet-100"
            >
              Zum vollständigen Preismodell
            </Link>
            <Link
              href="/kontakt"
              className="mt-3 inline-flex rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
            >
              Erst eine Frage stellen
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
