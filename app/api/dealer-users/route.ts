import { NextResponse } from "next/server";
import { createDealerUser, listDealerUsers } from "@/lib/dealer-users";

type CreateDealerBody = {
  username?: string;
  password?: string;
  notes?: string;
};

function parseCreate(data: unknown): CreateDealerBody {
  const source = (data ?? {}) as Record<string, unknown>;
  const result: CreateDealerBody = {};

  if (typeof source.username === "string") {
    result.username = source.username;
  }

  if (typeof source.password === "string") {
    result.password = source.password;
  }

  if (typeof source.notes === "string") {
    result.notes = source.notes;
  }

  return result;
}

export async function GET() {
  try {
    const users = await listDealerUsers();
    return NextResponse.json({ users });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Partner-Zugänge konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = parseCreate(await req.json());
    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: "Benutzername und Passwort sind erforderlich." },
        { status: 400 }
      );
    }

    const user = await createDealerUser({
      username: body.username,
      password: body.password,
      notes: body.notes ?? "",
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error
        ? error.message
        : "Partner-Zugang konnte nicht erstellt werden.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
