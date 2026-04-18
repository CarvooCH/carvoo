import { NextResponse } from "next/server";
import {
  createDealerSessionToken,
  dealerSessionCookieName,
} from "@/lib/dealer-auth";
import { verifyDealerUserLogin } from "@/lib/dealer-users";

type LoginBody = {
  username?: string;
  password?: string;
};

function parseBody(data: unknown): LoginBody {
  const source = (data ?? {}) as Record<string, unknown>;
  const result: LoginBody = {};

  if (typeof source.username === "string") {
    result.username = source.username;
  }
  if (typeof source.password === "string") {
    result.password = source.password;
  }

  return result;
}

export async function POST(req: Request) {
  try {
    const body = parseBody(await req.json());
    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: "Benutzername und Passwort sind erforderlich." },
        { status: 400 }
      );
    }

    const user = await verifyDealerUserLogin(body.username, body.password);
    if (!user) {
      return NextResponse.json(
        { error: "Login fehlgeschlagen. Bitte Zugang prüfen." },
        { status: 401 }
      );
    }

    const token = createDealerSessionToken(user.username);
    const response = NextResponse.json({ success: true, username: user.username });
    response.cookies.set(dealerSessionCookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Login konnte nicht verarbeitet werden." },
      { status: 500 }
    );
  }
}
