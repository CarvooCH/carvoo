export const leadStatuses = [
  "neu",
  "kontaktiert",
  "qualifiziert",
  "in_bearbeitung",
  "abgeschlossen",
  "verloren",
] as const;

export const leadPriorities = ["niedrig", "mittel", "hoch"] as const;
export const leadTypes = ["anfrage", "frage"] as const;

export type LeadStatus = (typeof leadStatuses)[number];
export type LeadPriority = (typeof leadPriorities)[number];
export type LeadType = (typeof leadTypes)[number];

export type LeadRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: LeadType;
  status: LeadStatus;
  priority: LeadPriority;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  owner: string;
  nextFollowUp: string;
  notes: string;
  budget: string;
  carType: string;
  fuelType: string;
  transmission: string;
  driveType: string;
  equipment: string;
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
};

export const leadStatusLabel: Record<LeadStatus, string> = {
  neu: "Neu",
  kontaktiert: "Kontaktiert",
  qualifiziert: "Qualifiziert",
  in_bearbeitung: "In Bearbeitung",
  abgeschlossen: "Abgeschlossen",
  verloren: "Verloren",
};

export const leadPriorityLabel: Record<LeadPriority, string> = {
  niedrig: "Niedrig",
  mittel: "Mittel",
  hoch: "Hoch",
};

export const leadTypeLabel: Record<LeadType, string> = {
  anfrage: "Anfrage",
  frage: "Frage",
};
