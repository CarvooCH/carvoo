import Link from "next/link";
import GaragePartnerForm from "@/components/GaragePartnerForm";
import PageIntro from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Garage Partner werden",
  description:
    "Werde Garage-Partner bei Carvoo. Erhalte passende Suchaufträge, wenn Kundenfahrzeuge über das Carvoo Netzwerk vermittelt werden können.",
  path: "/partner-werden",
  keywords: [
    "Garage Partner Schweiz",
    "Autohaus Kooperation",
    "Fahrzeug Suchaufträge",
    "Carvoo Partnernetzwerk",
  ],
});

const benefits = [
  "Zusätzliche qualifizierte Suchaufträge aus der Schweiz",
  "Schneller Kontakt bei passenden Kundenanfragen",
  "Klare Abstimmung statt unstrukturierter Leads",
];

export default function PartnerWerdenPage() {
  return (
    <>
      <PageIntro
        eyebrow="Partnernetzwerk"
        title="Als Garage Partner von Carvoo werden"
        description="Wenn eine passende Anfrage vorliegt und ein Fahrzeug in unserem eigenen Netzwerk nicht gefunden wird, arbeiten wir mit ausgewählten Partner-Garagen zusammen."
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-7 lg:p-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              Warum mit Carvoo als Partner arbeiten?
            </h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              {benefits.map((item) => (
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
                Hinweis
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Suchaufträge werden nur nach interner Freigabe durch Carvoo an
                Partner-Garagen weitergeleitet.
              </p>
            </div>

            <Link
              href="/anfrage"
              className="mt-7 inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Suchauftrag anfragen
            </Link>
          </aside>

          <GaragePartnerForm />
        </div>
      </section>
    </>
  );
}
