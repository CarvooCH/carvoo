import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import StructuredData from "@/components/StructuredData";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Antworten auf häufige Fragen zum Carvoo Auto-Suchservice: Ablauf, Kosten, Anfrage und Verfügbarkeit in der Schweiz.",
  path: "/faq",
  keywords: [
    "Carvoo FAQ",
    "Auto Suchservice Fragen",
    "Fahrzeugsuche Kosten Schweiz",
    "Anfrage Auto Hilfe",
  ],
});

const faqs = [
  {
    question: "Was macht Carvoo genau?",
    answer:
      "Carvoo ist ein persönlicher Auto-Suchservice für die Schweiz. Du teilst uns dein Suchprofil mit, wir übernehmen die strukturierte Vorauswahl und reduzieren unpassende Angebote.",
  },
  {
    question: "Ist Carvoo ein klassischer Fahrzeug-Marktplatz?",
    answer:
      "Nein. Carvoo ist kein Inserate-Portal mit Massenlisten, sondern ein Service-Modell mit Fokus auf Filterung, Orientierung und persönliche Begleitung.",
  },
  {
    question: "Wie starte ich die Zusammenarbeit?",
    answer:
      "Über das Anfrageformular auf der Seite /anfrage. Dort definierst du Kontaktangaben, Fahrzeugpräferenzen und Budget. Danach melden wir uns mit den nächsten Schritten.",
  },
  {
    question: "Für welche Regionen ist Carvoo verfügbar?",
    answer:
      "Carvoo arbeitet schweizweit und unterstützt Suchanfragen für Angebote in der gesamten Schweiz.",
  },
  {
    question: "Wie detailliert sollte meine Anfrage sein?",
    answer:
      "Je klarer die Angaben, desto effizienter die Vorauswahl. Besonders hilfreich sind Fahrzeugtyp, Budget, bevorzugter Antrieb, Getriebe und spezielle Anforderungen.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <StructuredData data={faqSchema} />

      <PageIntro
        eyebrow="FAQ"
        title="Die wichtigsten Fragen zu Carvoo auf einen Blick"
        description="Hier findest du schnelle Antworten zu unserem Service-Modell, dem Ablauf und der Anfrage. Falls deine Frage offen bleibt, kannst du sie direkt über das Kontaktformular senden."
        primaryCta={{ href: "/kontakt", label: "Frage stellen" }}
        secondaryCta={{ href: "/leistungen", label: "Leistungen" }}
      />

      <section className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-200 bg-white p-6"
            >
              <summary className="cursor-pointer list-none pr-7 text-lg font-extrabold text-slate-950">
                {item.question}
                <span className="float-right text-slate-400 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-7 text-slate-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-violet-200 bg-violet-50 p-8 text-slate-900 lg:p-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Noch Fragen offen?
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-slate-700">
            Sende uns deine Frage direkt über das Kontaktformular. Für eine
            konkrete Fahrzeugsuche kannst du weiterhin die Anfrage nutzen.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-5 py-3 text-sm font-bold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)]"
            >
              Jetzt Frage senden
            </Link>
            <Link
              href="/anfrage"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Zur Fahrzeug-Anfrage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
