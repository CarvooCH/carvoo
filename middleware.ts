import { NextResponse, type NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Projektzentrale"',
    },
  });
}

export function middleware(request: NextRequest) {
  const user = process.env.PROJEKTZENTRALE_USER;
  const pass = process.env.PROJEKTZENTRALE_PASS;

  // If credentials are not configured, keep routes accessible in development.
  if (!user || !pass) {
    return NextResponse.next();
  }

  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Basic ")) {
    return unauthorized();
  }

  try {
    const encoded = header.slice("Basic ".length);
    const decoded = atob(encoded);
    const [inputUser, inputPass] = decoded.split(":");

    if (inputUser !== user || inputPass !== pass) {
      return unauthorized();
    }
  } catch {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/projektzentrale/:path*",
    "/api/leads/:path*",
    "/api/form-briefing/:path*",
  ],
};
