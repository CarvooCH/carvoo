import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "API funktioniert",
    hasKey: !!process.env.RESEND_API_KEY,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, budget, car, requirements } = body;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "RESEND_API_KEY fehlt in .env.local",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "Carvoo <onboarding@resend.dev>",
      to: ["info@carvoo.ch"],
      subject: "Neue Carvoo Anfrage",
      html: `
        <h2>Neue Carvoo Anfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Wunschauto:</strong> ${car}</p>
        <p><strong>Anforderungen:</strong> ${requirements}</p>
      `,
    });

    console.log("RESEND RESULT:", result);

    if ((result as { error?: unknown }).error) {
      return NextResponse.json(
        {
          success: false,
          message: "Resend hat einen Fehler zurückgegeben.",
          result,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Anfrage erfolgreich gesendet.",
      result,
    });
  } catch (error) {
    console.error("Fehler beim Senden der Anfrage:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unbekannter Fehler",
      },
      { status: 500 }
    );
  }
}