import { NextResponse } from "next/server";
import { leadPriorities, leadStatuses } from "@/lib/lead-schema";
import { type LeadUpdateInput, updateLead } from "@/lib/leads";

type LeadUpdateBody = {
  status?: string;
  priority?: string;
  owner?: string;
  nextFollowUp?: string;
  notes?: string;
  partnerForwardingConsent?: boolean;
  partnerForwardedOn?: string;
  partnerForwardedTo?: string;
};

function parseUpdate(data: unknown): LeadUpdateBody {
  const source = (data ?? {}) as Record<string, unknown>;
  const result: LeadUpdateBody = {};

  if (typeof source.status === "string") {
    result.status = source.status;
  }

  if (typeof source.priority === "string") {
    result.priority = source.priority;
  }

  if (typeof source.owner === "string") {
    result.owner = source.owner;
  }

  if (typeof source.nextFollowUp === "string") {
    result.nextFollowUp = source.nextFollowUp;
  }

  if (typeof source.notes === "string") {
    result.notes = source.notes;
  }

  if (typeof source.partnerForwardingConsent === "boolean") {
    result.partnerForwardingConsent = source.partnerForwardingConsent;
  }

  if (typeof source.partnerForwardedOn === "string") {
    result.partnerForwardedOn = source.partnerForwardedOn;
  }

  if (typeof source.partnerForwardedTo === "string") {
    result.partnerForwardedTo = source.partnerForwardedTo;
  }

  return result;
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const payload = parseUpdate(await req.json());

    if (
      payload.status &&
      !leadStatuses.includes(payload.status as (typeof leadStatuses)[number])
    ) {
      return NextResponse.json(
        { error: "Ungültiger Status." },
        { status: 400 }
      );
    }

    if (
      payload.priority &&
      !leadPriorities.includes(
        payload.priority as (typeof leadPriorities)[number]
      )
    ) {
      return NextResponse.json(
        { error: "Ungültige Priorität." },
        { status: 400 }
      );
    }

    const update: LeadUpdateInput = {};

    if (payload.status) {
      update.status = payload.status as LeadUpdateInput["status"];
    }

    if (payload.priority) {
      update.priority = payload.priority as LeadUpdateInput["priority"];
    }

    if (payload.owner !== undefined) {
      update.owner = payload.owner;
    }

    if (payload.nextFollowUp !== undefined) {
      update.nextFollowUp = payload.nextFollowUp;
    }

    if (payload.notes !== undefined) {
      update.notes = payload.notes;
    }

    if (payload.partnerForwardingConsent !== undefined) {
      update.partnerForwardingConsent = payload.partnerForwardingConsent;
    }

    if (payload.partnerForwardedOn !== undefined) {
      update.partnerForwardedOn = payload.partnerForwardedOn;
    }

    if (payload.partnerForwardedTo !== undefined) {
      update.partnerForwardedTo = payload.partnerForwardedTo;
    }

    const updated = await updateLead(id, update);
    if (!updated) {
      return NextResponse.json(
        { error: "Lead nicht gefunden." },
        { status: 404 }
      );
    }

    return NextResponse.json({ lead: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Lead konnte nicht aktualisiert werden." },
      { status: 500 }
    );
  }
}
