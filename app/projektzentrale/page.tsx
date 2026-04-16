import type { Metadata } from "next";
import FormBriefingBoard from "@/components/FormBriefingBoard";
import LeadBoard from "@/components/LeadBoard";
import PageIntro from "@/components/PageIntro";
import { readFormBriefing } from "@/lib/form-briefing";
import { listLeads } from "@/lib/leads";
import { createPageMetadata } from "@/lib/site";

const baseMetadata = createPageMetadata({
  title: "Projektzentrale",
  description:
    "Interne Carvoo Projektzentrale zur Bearbeitung von Anfragen und Kontaktfragen.",
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
  const [leads, briefing] = await Promise.all([listLeads(), readFormBriefing()]);

  return (
    <>
      <PageIntro
        eyebrow="Intern"
        title="Projektzentrale für alle Anfragen"
        description="Hier bearbeitest du neue Leads Schritt für Schritt: Status setzen, Follow-up planen, Notizen pflegen und den Abschluss dokumentieren."
      />

      <FormBriefingBoard initialBriefing={briefing} />
      <LeadBoard initialLeads={leads} />
    </>
  );
}
