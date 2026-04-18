import { NextResponse } from "next/server";
import { garagePartnerStatuses } from "@/lib/garage-partner-schema";
import {
  type GaragePartnerUpdateInput,
  updateGaragePartner,
} from "@/lib/garage-partners";

type GaragePartnerUpdateBody = {
  status?: string;
  owner?: string;
  lastContactOn?: string;
  notes?: string;
};

function parseUpdate(data: unknown): GaragePartnerUpdateBody {
  const source = (data ?? {}) as Record<string, unknown>;
  const result: GaragePartnerUpdateBody = {};

  if (typeof source.status === "string") {
    result.status = source.status;
  }

  if (typeof source.owner === "string") {
    result.owner = source.owner;
  }

  if (typeof source.lastContactOn === "string") {
    result.lastContactOn = source.lastContactOn;
  }

  if (typeof source.notes === "string") {
    result.notes = source.notes;
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
      !garagePartnerStatuses.includes(
        payload.status as (typeof garagePartnerStatuses)[number]
      )
    ) {
      return NextResponse.json(
        { error: "Ungültiger Partner-Status." },
        { status: 400 }
      );
    }

    const update: GaragePartnerUpdateInput = {};

    if (payload.status) {
      update.status = payload.status as GaragePartnerUpdateInput["status"];
    }

    if (payload.owner !== undefined) {
      update.owner = payload.owner;
    }

    if (payload.lastContactOn !== undefined) {
      update.lastContactOn = payload.lastContactOn;
    }

    if (payload.notes !== undefined) {
      update.notes = payload.notes;
    }

    const updated = await updateGaragePartner(id, update);
    if (!updated) {
      return NextResponse.json(
        { error: "Partner nicht gefunden." },
        { status: 404 }
      );
    }

    return NextResponse.json({ partner: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Partner konnte nicht aktualisiert werden." },
      { status: 500 }
    );
  }
}
