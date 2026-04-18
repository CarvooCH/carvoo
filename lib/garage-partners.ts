import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import {
  garagePartnerStatuses,
  type GaragePartnerRecord,
  type GaragePartnerStatus,
} from "@/lib/garage-partner-schema";

type GaragePartnerCreateInput = Omit<
  GaragePartnerRecord,
  "id" | "createdAt" | "updatedAt" | "status"
> & {
  status?: GaragePartnerStatus;
};

export type GaragePartnerUpdateInput = Partial<
  Pick<GaragePartnerRecord, "status" | "owner" | "lastContactOn" | "notes">
>;

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "garage-partners.json");

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]\n", "utf8");
  }
}

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function normalizeDateInput(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim();
  if (!cleaned) return "";
  return /^\d{4}-\d{2}-\d{2}$/.test(cleaned) ? cleaned : "";
}

function normalizeStatus(
  value: unknown,
  fallback: GaragePartnerStatus
): GaragePartnerStatus {
  if (typeof value !== "string") return fallback;
  return garagePartnerStatuses.includes(value as GaragePartnerStatus)
    ? (value as GaragePartnerStatus)
    : fallback;
}

function normalizeIsoDateTime(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.trim();
  if (!cleaned) return fallback;
  return cleaned;
}

function normalizeStoredPartner(value: unknown): GaragePartnerRecord | null {
  if (!value || typeof value !== "object") return null;
  const source = value as Record<string, unknown>;
  const createdAt = normalizeIsoDateTime(source.createdAt, new Date().toISOString());

  return {
    id: normalizeText(source.id, 80) || randomUUID(),
    createdAt,
    updatedAt: normalizeIsoDateTime(source.updatedAt, createdAt),
    status: normalizeStatus(source.status, "neu"),
    garageName: normalizeText(source.garageName, 160),
    contactName: normalizeText(source.contactName, 120),
    email: normalizeText(source.email, 180).toLowerCase(),
    phone: normalizeText(source.phone, 80),
    website: normalizeText(source.website, 240),
    location: normalizeText(source.location, 160),
    specialties: normalizeText(source.specialties, 1200),
    message: normalizeText(source.message, 3000),
    owner: normalizeText(source.owner, 80),
    lastContactOn: normalizeDateInput(source.lastContactOn),
    notes: normalizeText(source.notes, 5000),
  };
}

async function readPartnersFile(): Promise<GaragePartnerRecord[]> {
  await ensureStore();

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((entry) => normalizeStoredPartner(entry))
      .filter((entry): entry is GaragePartnerRecord => entry !== null);
  } catch {
    return [];
  }
}

async function writePartnersFile(partners: GaragePartnerRecord[]) {
  await ensureStore();
  await fs.writeFile(filePath, `${JSON.stringify(partners, null, 2)}\n`, "utf8");
}

function sanitizePartner(input: GaragePartnerCreateInput): GaragePartnerRecord {
  const now = new Date().toISOString();

  return {
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    status: normalizeStatus(input.status, "neu"),
    garageName: normalizeText(input.garageName, 160),
    contactName: normalizeText(input.contactName, 120),
    email: normalizeText(input.email, 180).toLowerCase(),
    phone: normalizeText(input.phone, 80),
    website: normalizeText(input.website, 240),
    location: normalizeText(input.location, 160),
    specialties: normalizeText(input.specialties, 1200),
    message: normalizeText(input.message, 3000),
    owner: normalizeText(input.owner, 80),
    lastContactOn: normalizeDateInput(input.lastContactOn),
    notes: normalizeText(input.notes, 5000),
  };
}

export async function listGaragePartners() {
  const partners = await readPartnersFile();
  return partners.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createGaragePartner(input: GaragePartnerCreateInput) {
  const partners = await readPartnersFile();
  const partner = sanitizePartner(input);
  partners.unshift(partner);
  await writePartnersFile(partners);
  return partner;
}

export async function updateGaragePartner(
  id: string,
  update: GaragePartnerUpdateInput
) {
  const partners = await readPartnersFile();
  const index = partners.findIndex((item) => item.id === id);

  if (index === -1) return null;

  const current = partners[index];
  const next: GaragePartnerRecord = {
    ...current,
    updatedAt: new Date().toISOString(),
    status: normalizeStatus(update.status, current.status),
    owner:
      update.owner === undefined
        ? current.owner
        : normalizeText(update.owner, 80),
    lastContactOn:
      update.lastContactOn === undefined
        ? current.lastContactOn
        : normalizeDateInput(update.lastContactOn),
    notes:
      update.notes === undefined
        ? current.notes
        : normalizeText(update.notes, 5000),
  };

  partners[index] = next;
  await writePartnersFile(partners);
  return next;
}
