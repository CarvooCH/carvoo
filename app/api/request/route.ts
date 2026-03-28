import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      name,
      email,
      phone,
      budget,
      carType,
      fuelType,
      transmission,
      message,
    } = data;

    const emailContent = `
Neue Carvoo Anfrage 🚀

Name: ${name}
Email: ${email}
Telefon: ${phone || "-"}

Budget: ${budget} CHF

Fahrzeugtyp: ${carType || "-"}
Antrieb: ${fuelType || "-"}
Getriebe: ${transmission || "-"}

Wünsche:
${message || "-"}
`;

    await resend.emails.send({
      from: "Carvoo <onboarding@resend.dev>",
      to: "info@carvoo.ch",
      subject: "Neue Carvoo Anfrage",
      text: emailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Fehler beim Senden" },
      { status: 500 }
    );
  }
}