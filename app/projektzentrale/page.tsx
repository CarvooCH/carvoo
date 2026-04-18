import type { Metadata } from "next";
import DealerUserBoard from "@/components/DealerUserBoard";
import FormBriefingBoard from "@/components/FormBriefingBoard";
import GaragePartnerBoard from "@/components/GaragePartnerBoard";
import LeadBoard from "@/components/LeadBoard";
import PageIntro from "@/components/PageIntro";
import { listDealerUsers } from "@/lib/dealer-users";
import { readFormBriefing } from "@/lib/form-briefing";
import { listGaragePartners } from "@/lib/garage-partners";
import { listLeads } from "@/lib/leads";
import { createPageMetadata } from "@/lib/site";

const baseMetadata = createPageMetadata({
  title: "Projektzentrale",
  description:
    "Interne Carvoo Projektzentrale zur Bearbeitung von Anfragen, Kontaktfragen und Garage-Partnern.",
  path: "/projektzentrale",
});

export const metadata: Metadata = {
  ...baseMetadata,
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProjektzentralePage() {
  const [leads, briefing, partners, dealerUsers] = await Promise.all([
    listLeads(),
    readFormBriefing(),
    listGaragePartners(),
    listDealerUsers(),
  ]);

  return (
    <>
      <PageIntro
        eyebrow="Intern"
        title="Projektzentrale für alle Anfragen"
        description="Hier bearbeitest du neue Leads Schritt für Schritt: Status setzen, Follow-up planen, Notizen pflegen und den Abschluss dokumentieren."
      />

      <FormBriefingBoard initialBriefing={briefing} />
      <DealerUserBoard initialUsers={dealerUsers} />
      <LeadBoard initialLeads={leads} />
      <GaragePartnerBoard initialPartners={partners} />
    </>
  );
}
