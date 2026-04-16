import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import PageIntro from "@/components/PageIntro";
import { createPageMetadata, siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Kontakt",
  description:
    "Stelle Carvoo direkt eine Frage. Nutze das Kontaktformular für allgemeine Fragen zum Service, Ablauf oder nächsten Schritten.",
  path: "/kontakt",
  keywords: [
    "Kontakt Carvoo",
    "Frage stellen",
    "Auto Suchservice Kontakt",
    "Carvoo Hilfe",
  ],
});

const contactBenefits = [
  "Für allgemeine Fragen zum Service",
  "Antwort per E-Mail auf deine Anfrage",
  "Ideal, wenn du noch nicht direkt eine Autosuche starten willst",
];

export default function KontaktPage() {
  return (
    <>
      <PageIntro
        eyebrow="Kontakt"
        title="Noch Fragen offen? Schreib uns direkt."
        description="Wenn du zuerst etwas klären willst, nutze einfach dieses Formular. Für eine konkrete Fahrzeugsuche kannst du jederzeit zur Anfrage-Seite wechseln."
        primaryCta={{ href: "/anfrage", label: "Zur Auto-Anfrage" }}
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-7 lg:p-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              Wofür ist dieses Formular?
            </h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              {contactBenefits.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-7">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-700 text-xs font-black text-white">
                    &gt;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl border border-violet-200 bg-violet-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                Direkter Kontakt
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Falls du lieber direkt mailst:
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-2 inline-flex text-sm font-semibold text-violet-700 underline underline-offset-2"
              >
                {siteConfig.email}
              </a>
            </div>

            <Link
              href="/anfrage"
              className="mt-7 inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Direkt zur Fahrzeug-Anfrage
            </Link>
          </aside>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
