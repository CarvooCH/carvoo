import { NextResponse } from "next/server";
import { listLeads } from "@/lib/leads";

export async function GET() {
  try {
    const leads = await listLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Leads konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}
