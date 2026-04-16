import { NextResponse } from "next/server";
import { readFormBriefing, updateFormBriefing } from "@/lib/form-briefing";

type BriefingPayload = {
  requestForm?: string;
  contactForm?: string;
};

function parsePayload(value: unknown): BriefingPayload {
  const source = (value ?? {}) as Record<string, unknown>;
  const result: BriefingPayload = {};

  if (typeof source.requestForm === "string") {
    result.requestForm = source.requestForm;
  }

  if (typeof source.contactForm === "string") {
    result.contactForm = source.contactForm;
  }

  return result;
}

export async function GET() {
  try {
    const briefing = await readFormBriefing();
    return NextResponse.json({ briefing });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Formular-Briefing konnte nicht geladen werden." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const payload = parsePayload(await req.json());
    const briefing = await updateFormBriefing(payload);
    return NextResponse.json({ briefing });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Formular-Briefing konnte nicht gespeichert werden." },
      { status: 500 }
    );
  }
}
