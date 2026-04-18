import { NextResponse } from "next/server";
import { updateDealerUser } from "@/lib/dealer-users";

type DealerUserUpdateBody = {
  active?: boolean;
  notes?: string;
  password?: string;
};

function parseUpdate(data: unknown): DealerUserUpdateBody {
  const source = (data ?? {}) as Record<string, unknown>;
  const result: DealerUserUpdateBody = {};

  if (typeof source.active === "boolean") {
    result.active = source.active;
  }

  if (typeof source.notes === "string") {
    result.notes = source.notes;
  }

  if (typeof source.password === "string") {
    result.password = source.password;
  }

  return result;
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = parseUpdate(await req.json());

    const next = await updateDealerUser(id, {
      active: body.active,
      notes: body.notes,
      password: body.password,
    });

    if (!next) {
      return NextResponse.json(
        { error: "Partner-Zugang nicht gefunden." },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: next });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Partner-Zugang konnte nicht gespeichert werden." },
      { status: 500 }
    );
  }
}
