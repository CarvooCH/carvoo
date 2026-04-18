export const garagePartnerStatuses = [
  "neu",
  "aktiv",
  "pausiert",
  "abgelehnt",
] as const;

export type GaragePartnerStatus = (typeof garagePartnerStatuses)[number];

export type GaragePartnerRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: GaragePartnerStatus;
  garageName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  specialties: string;
  message: string;
  owner: string;
  lastContactOn: string;
  notes: string;
};

export const garagePartnerStatusLabel: Record<GaragePartnerStatus, string> = {
  neu: "Neu",
  aktiv: "Aktiv",
  pausiert: "Pausiert",
  abgelehnt: "Abgelehnt",
};
