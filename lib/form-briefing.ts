import { promises as fs } from "fs";
import path from "path";

export type FormBriefing = {
  requestForm: string;
  contactForm: string;
  updatedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const briefingFilePath = path.join(dataDir, "form-briefing.json");

const defaultBriefing: FormBriefing = {
  requestForm: "",
  contactForm: "",
  updatedAt: "",
};

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(briefingFilePath);
  } catch {
    await fs.writeFile(
      briefingFilePath,
      `${JSON.stringify(defaultBriefing, null, 2)}\n`,
      "utf8"
    );
  }
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export async function readFormBriefing(): Promise<FormBriefing> {
  await ensureStore();

  try {
    const raw = await fs.readFile(briefingFilePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<FormBriefing>;

    return {
      requestForm: cleanText(parsed.requestForm, 12000),
      contactForm: cleanText(parsed.contactForm, 12000),
      updatedAt: cleanText(parsed.updatedAt, 100),
    };
  } catch {
    return defaultBriefing;
  }
}

export async function updateFormBriefing(data: {
  requestForm?: string;
  contactForm?: string;
}) {
  const current = await readFormBriefing();
  const next: FormBriefing = {
    requestForm:
      data.requestForm === undefined
        ? current.requestForm
        : cleanText(data.requestForm, 12000),
    contactForm:
      data.contactForm === undefined
        ? current.contactForm
        : cleanText(data.contactForm, 12000),
    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(briefingFilePath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  return next;
}
