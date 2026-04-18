import { randomUUID, pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type { DealerUserRecord, DealerUserSafe } from "@/lib/dealer-user-schema";

type DealerCreateInput = {
  username: string;
  password: string;
  notes?: string;
};

type DealerUpdateInput = {
  active?: boolean;
  notes?: string;
  password?: string;
};

const dataDir = path.join(process.cwd(), "data");
const usersFilePath = path.join(dataDir, "dealer-users.json");
const hashIterations = 120_000;
const hashBytes = 64;

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(usersFilePath);
  } catch {
    await fs.writeFile(usersFilePath, "[]\n", "utf8");
  }
}

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function normalizeUsername(value: unknown) {
  const base = normalizeText(value, 40).toLowerCase();
  return base.replace(/[^a-z0-9._-]/g, "");
}

function normalizeBoolean(value: unknown, fallback: boolean) {
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

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, hashIterations, hashBytes, "sha512");
  return `pbkdf2_sha512$${hashIterations}$${salt}$${hash.toString("hex")}`;
}

function verifyPassword(password: string, storedHash: string) {
  const parts = storedHash.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2_sha512") {
    return false;
  }

  const iterations = Number(parts[1]);
  const salt = parts[2];
  const expectedHex = parts[3];
  if (!Number.isFinite(iterations) || !salt || !expectedHex) return false;

  const candidate = pbkdf2Sync(password, salt, iterations, hashBytes, "sha512");
  const expected = Buffer.from(expectedHex, "hex");
  if (candidate.length !== expected.length) return false;

  return timingSafeEqual(candidate, expected);
}

function toSafeUser(user: DealerUserRecord): DealerUserSafe {
  return {
    id: user.id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    username: user.username,
    active: user.active,
    notes: user.notes,
  };
}

function normalizeStoredUser(value: unknown): DealerUserRecord | null {
  if (!value || typeof value !== "object") return null;
  const source = value as Record<string, unknown>;
  const createdAt = normalizeIsoDateTime(source.createdAt, new Date().toISOString());

  return {
    id: normalizeText(source.id, 80) || randomUUID(),
    createdAt,
    updatedAt: normalizeIsoDateTime(source.updatedAt, createdAt),
    username: normalizeUsername(source.username),
    passwordHash: normalizeText(source.passwordHash, 300),
    active: normalizeBoolean(source.active, true),
    notes: normalizeText(source.notes, 2000),
  };
}

async function readUsersFile(): Promise<DealerUserRecord[]> {
  await ensureStore();

  try {
    const raw = await fs.readFile(usersFilePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((entry) => normalizeStoredUser(entry))
      .filter((entry): entry is DealerUserRecord => {
        return entry !== null && Boolean(entry.username) && Boolean(entry.passwordHash);
      });
  } catch {
    return [];
  }
}

async function writeUsersFile(users: DealerUserRecord[]) {
  await ensureStore();
  await fs.writeFile(usersFilePath, `${JSON.stringify(users, null, 2)}\n`, "utf8");
}

export async function listDealerUsers() {
  const users = await readUsersFile();
  return users
    .sort((a, b) => a.username.localeCompare(b.username))
    .map((entry) => toSafeUser(entry));
}

export async function createDealerUser(input: DealerCreateInput) {
  const username = normalizeUsername(input.username);
  const password = normalizeText(input.password, 120);
  const notes = normalizeText(input.notes, 2000);

  if (!username) {
    throw new Error("Benutzername ist ungültig.");
  }

  if (password.length < 6) {
    throw new Error("Passwort muss mindestens 6 Zeichen haben.");
  }

  const users = await readUsersFile();
  const exists = users.some((entry) => entry.username === username);
  if (exists) {
    throw new Error("Benutzername existiert bereits.");
  }

  const now = new Date().toISOString();
  const next: DealerUserRecord = {
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    username,
    passwordHash: hashPassword(password),
    active: true,
    notes,
  };

  users.push(next);
  await writeUsersFile(users);
  return toSafeUser(next);
}

export async function updateDealerUser(id: string, input: DealerUpdateInput) {
  const users = await readUsersFile();
  const index = users.findIndex((entry) => entry.id === id);
  if (index === -1) return null;

  const current = users[index];
  const next: DealerUserRecord = {
    ...current,
    updatedAt: new Date().toISOString(),
    active:
      input.active === undefined
        ? current.active
        : normalizeBoolean(input.active, current.active),
    notes:
      input.notes === undefined
        ? current.notes
        : normalizeText(input.notes, 2000),
    passwordHash:
      input.password === undefined
        ? current.passwordHash
        : hashPassword(normalizeText(input.password, 120)),
  };

  users[index] = next;
  await writeUsersFile(users);
  return toSafeUser(next);
}

export async function verifyDealerUserLogin(usernameInput: string, passwordInput: string) {
  const username = normalizeUsername(usernameInput);
  const password = normalizeText(passwordInput, 120);
  if (!username || !password) return null;

  const users = await readUsersFile();
  const user = users.find((entry) => entry.username === username);
  if (!user || !user.active) return null;

  const valid = verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  return toSafeUser(user);
}
