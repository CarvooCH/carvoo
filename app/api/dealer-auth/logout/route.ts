import { NextResponse } from "next/server";
import { dealerSessionCookieName } from "@/lib/dealer-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(dealerSessionCookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
