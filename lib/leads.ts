import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import {
  leadPriorities,
  leadStatuses,
  leadTypes,
  type LeadPriority,
  type LeadRecord,
  type LeadStatus,
  type LeadType,
} from "@/lib/lead-schema";

type LeadCreateInput = Omit<
  LeadRecord,
  "id" | "createdAt" | "updatedAt" | "status" | "priority"
> & {
  status?: LeadStatus;
  priority?: LeadPriority;
};

export type LeadUpdateInput = Partial<
  Pick<
    LeadRecord,
    | "status"
    | "priority"
    | "owner"
    | "nextFollowUp"
    | "notes"
    | "partnerForwardingConsent"
    | "partnerForwardedOn"
    | "partnerForwardedTo"
  >
>;

const dataDir = path.join(process.cwd(), "data");
const leadsFilePath = path.join(dataDir, "leads.json");

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(leadsFilePath);
  } catch {
    await fs.writeFile(leadsFilePath, "[]\n", "utf8");
  }
}

async function readLeadsFile(): Promise<LeadRecord[]> {
  await ensureStore();

  try {
    const raw = await fs.readFile(leadsFilePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((entry) => normalizeStoredLead(entry))
      .filter((entry): entry is LeadRecord => entry !== null);
  } catch {
    return [];
  }
}

async function writeLeadsFile(leads: LeadRecord[]) {
  await ensureStore();
  await fs.writeFile(leadsFilePath, `${JSON.stringify(leads, null, 2)}\n`, "utf8");
}

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function normalizeStatus(value: unknown, fallback: LeadStatus): LeadStatus {
  if (typeof value !== "string") return fallback;
  return leadStatuses.includes(value as LeadStatus)
    ? (value as LeadStatus)
    : fallback;
}

function normalizePriority(value: unknown, fallback: LeadPriority): LeadPriority {
  if (typeof value !== "string") return fallback;
  return leadPriorities.includes(value as LeadPriority)
    ? (value as LeadPriority)
    : fallback;
}

function normalizeType(value: unknown): LeadType {
  if (typeof value !== "string") return "frage";
  return leadTypes.includes(value as LeadType) ? (value as LeadType) : "frage";
}

function normalizeDateInput(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim();
  if (!cleaned) return "";
  return /^\d{4}-\d{2}-\d{2}$/.test(cleaned) ? cleaned : "";
}

function normalizeBoolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const cleaned = value.trim().toLowerCase();
    if (["true", "1", "ja", "yes"].includes(cleaned)) return true;
    if (["false", "0", "nein", "no"].includes(cleaned)) return false;
  }
  return fallback;
}

function normalizeIsoDateTime(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.trim();
  if (!cleaned) return fallback;
  return cleaned;
}

function normalizeStoredLead(value: unknown): LeadRecord | null {
  if (!value || typeof value !== "object") return null;
  const source = value as Record<string, unknown>;
  const createdAt = normalizeIsoDateTime(source.createdAt, new Date().toISOString());

  return {
    id: normalizeText(source.id, 80) || randomUUID(),
    createdAt,
    updatedAt: normalizeIsoDateTime(source.updatedAt, createdAt),
    type: normalizeType(source.type),
    status: normalizeStatus(source.status, "neu"),
    priority: normalizePriority(source.priority, "mittel"),
    name: normalizeText(source.name, 120),
    email: normalizeText(source.email, 180).toLowerCase(),
    phone: normalizeText(source.phone, 80),
    subject: normalizeText(source.subject, 160),
    message: normalizeText(source.message, 3000),
    owner: normalizeText(source.owner, 80),
    nextFollowUp: normalizeDateInput(source.nextFollowUp),
    notes: normalizeText(source.notes, 5000),
    budget: normalizeText(source.budget, 20),
    carType: normalizeText(source.carType, 60),
    fuelType: normalizeText(source.fuelType, 60),
    transmission: normalizeText(source.transmission, 60),
    driveType: normalizeText(source.driveType, 60),
    equipment: normalizeText(source.equipment, 800),
    partnerForwardingConsent: normalizeBoolean(source.partnerForwardingConsent),
    partnerForwardedOn: normalizeDateInput(source.partnerForwardedOn),
    partnerForwardedTo: normalizeText(source.partnerForwardedTo, 400),
    landingPage: normalizeText(source.landingPage, 300),
    referrer: normalizeText(source.referrer, 300),
    utmSource: normalizeText(source.utmSource, 120),
    utmMedium: normalizeText(source.utmMedium, 120),
    utmCampaign: normalizeText(source.utmCampaign, 140),
    utmTerm: normalizeText(source.utmTerm, 140),
    utmContent: normalizeText(source.utmContent, 140),
  };
}

function sanitizeLead(input: LeadCreateInput): LeadRecord {
  const now = new Date().toISOString();

  return {
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    type: normalizeType(input.type),
    status: normalizeStatus(input.status, "neu"),
    priority: normalizePriority(input.priority, "mittel"),
    name: normalizeText(input.name, 120),
    email: normalizeText(input.email, 180).toLowerCase(),
    phone: normalizeText(input.phone, 80),
    subject: normalizeText(input.subject, 160),
    message: normalizeText(input.message, 3000),
    owner: normalizeText(input.owner, 80),
    nextFollowUp: normalizeDateInput(input.nextFollowUp),
    notes: normalizeText(input.notes, 5000),
    budget: normalizeText(input.budget, 20),
    carType: normalizeText(input.carType, 60),
    fuelType: normalizeText(input.fuelType, 60),
    transmission: normalizeText(input.transmission, 60),
    driveType: normalizeText(input.driveType, 60),
    equipment: normalizeText(input.equipment, 800),
    partnerForwardingConsent: normalizeBoolean(input.partnerForwardingConsent),
    partnerForwardedOn: normalizeDateInput(input.partnerForwardedOn),
    partnerForwardedTo: normalizeText(input.partnerForwardedTo, 400),
    landingPage: normalizeText(input.landingPage, 300),
    referrer: normalizeText(input.referrer, 300),
    utmSource: normalizeText(input.utmSource, 120),
    utmMedium: normalizeText(input.utmMedium, 120),
    utmCampaign: normalizeText(input.utmCampaign, 140),
    utmTerm: normalizeText(input.utmTerm, 140),
    utmContent: normalizeText(input.utmContent, 140),
  };
}

export async function listLeads() {
  const leads = await readLeadsFile();
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createLead(input: LeadCreateInput) {
  const leads = await readLeadsFile();
  const lead = sanitizeLead(input);
  leads.unshift(lead);
  await writeLeadsFile(leads);
  return lead;
}

export async function updateLead(id: string, update: LeadUpdateInput) {
  const leads = await readLeadsFile();
  const index = leads.findIndex((item) => item.id === id);

  if (index === -1) return null;

  const current = leads[index];
  const next: LeadRecord = {
    ...current,
    updatedAt: new Date().toISOString(),
    status: normalizeStatus(update.status, current.status),
    priority: normalizePriority(update.priority, current.priority),
    owner:
      update.owner === undefined
        ? current.owner
        : normalizeText(update.owner, 80),
    nextFollowUp:
      update.nextFollowUp === undefined
        ? current.nextFollowUp
        : normalizeDateInput(update.nextFollowUp),
    notes:
      update.notes === undefined
        ? current.notes
        : normalizeText(update.notes, 5000),
    partnerForwardingConsent:
      update.partnerForwardingConsent === undefined
        ? current.partnerForwardingConsent
        : normalizeBoolean(update.partnerForwardingConsent),
    partnerForwardedOn:
      update.partnerForwardedOn === undefined
        ? current.partnerForwardedOn
        : normalizeDateInput(update.partnerForwardedOn),
    partnerForwardedTo:
      update.partnerForwardedTo === undefined
        ? current.partnerForwardedTo
        : normalizeText(update.partnerForwardedTo, 400),
  };

  leads[index] = next;
  await writeLeadsFile(leads);
  return next;
}
