import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DealerLogoutButton from "@/components/DealerLogoutButton";
import PageIntro from "@/components/PageIntro";
import {
  dealerSessionCookieName,
  verifyDealerSessionToken,
} from "@/lib/dealer-auth";
import { listLeads } from "@/lib/leads";
import { createPageMetadata } from "@/lib/site";

const baseMetadata = createPageMetadata({
  title: "Partnerbereich",
  description:
    "Geschützter Partnerbereich für freigegebene Suchaufträge im Carvoo Partnernetzwerk.",
  path: "/partnerbereich",
});

export const metadata = {
  ...baseMetadata,
  robots: {
    index: false,
    follow: false,
  },
};

function formatDate(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function PartnerbereichPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(dealerSessionCookieName)?.value ?? "";
  const session = verifyDealerSessionToken(token);

  if (!session?.username) {
    redirect("/partner-login");
  }

  const leads = await listLeads();
  const visibleLeads = leads.filter((lead) => {
    if (lead.type !== "anfrage") return false;
    if (!lead.partnerForwardingConsent) return false;
    return !["abgeschlossen", "verloren"].includes(lead.status);
  });

  return (
    <>
      <PageIntro
        eyebrow="Partnerbereich"
        title="Freigegebene Suchaufträge für Partner-Garagen"
        description="Hier siehst du nur intern freigegebene Suchaufträge. Bitte antworte bei passenden Fahrzeugen direkt per E-Mail oder Telefon."
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            Angemeldet als <strong>{session.username}</strong>
          </p>
          <DealerLogoutButton />
        </div>

        <div className="space-y-5">
          {visibleLeads.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              Aktuell sind keine freigegebenen Suchaufträge vorhanden.
            </div>
          )}

          {visibleLeads.map((lead) => (
            <article
              key={lead.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 lg:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-950">
                    {lead.name || "Anfrage"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Eingang: {formatDate(lead.createdAt)}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800">
                  Freigegeben
                </span>
              </div>

              <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_1fr]">
                <div className="space-y-2 text-sm text-slate-700">
                  <p>
                    <strong>E-Mail:</strong> {lead.email || "-"}
                  </p>
                  <p>
                    <strong>Telefon:</strong> {lead.phone || "-"}
                  </p>
                  <p>
                    <strong>Budget:</strong>{" "}
                    {lead.budget
                      ? `${Number(lead.budget).toLocaleString("de-CH")} CHF`
                      : "-"}
                  </p>
                  <p>
                    <strong>Fahrzeug:</strong>{" "}
                    {[lead.carType, lead.fuelType, lead.transmission, lead.driveType]
                      .filter(Boolean)
                      .join(" | ") || "-"}
                  </p>
                  <p>
                    <strong>Ausstattung:</strong> {lead.equipment || "-"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Weitere Wünsche
                  </p>
                  <p className="mt-2 whitespace-pre-wrap leading-7">
                    {lead.message || "-"}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
