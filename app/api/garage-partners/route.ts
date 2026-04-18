import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createGaragePartner, listGaragePartners } from "@/lib/garage-partners";

const resend = new Resend(process.env.RESEND_API_KEY);

type GaragePartnerPayload = {
  garageName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  specialties: string;
  message: string;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function parsePayload(data: unknown): GaragePartnerPayload {
  const source = (data ?? {}) as Record<string, unknown>;

  return {
    garageName: cleanText(source.garageName, 160),
    contactName: cleanText(source.contactName, 120),
    email: cleanText(source.email, 180).toLowerCase(),
    phone: cleanText(source.phone, 80),
    website: cleanText(source.website, 240),
    location: cleanText(source.location, 160),
    specialties: cleanText(source.specialties, 1200),
    message: cleanText(source.message, 3000),
  };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function GET() {
  try {
    const partners = await listGaragePartners();
    return NextResponse.json({ partners });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Partner konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const payload = parsePayload(await req.json());

    if (!payload.garageName || !payload.contactName || !payload.email) {
      return NextResponse.json(
        {
          error:
            "Garagenname, Ansprechperson und E-Mail sind für die Partneranfrage erforderlich.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige E-Mail an." },
        { status: 400 }
      );
    }

    const partner = await createGaragePartner({
      garageName: payload.garageName,
      contactName: payload.contactName,
      email: payload.email,
      phone: payload.phone,
      website: payload.website,
      location: payload.location,
      specialties: payload.specialties,
      message: payload.message,
      owner: "",
      lastContactOn: "",
      notes: "",
    });

    const safe = {
      garageName: escapeHtml(payload.garageName),
      contactName: escapeHtml(payload.contactName),
      email: escapeHtml(payload.email),
      phone: escapeHtml(payload.phone || "-"),
      website: escapeHtml(payload.website || "-"),
      location: escapeHtml(payload.location || "-"),
      specialties: escapeHtml(payload.specialties || "-"),
      message: escapeHtml(payload.message || "-"),
    };

    const textBody = `Neue Partneranfrage von Garage

Garage: ${payload.garageName}
Ansprechperson: ${payload.contactName}
E-Mail: ${payload.email}
Telefon: ${payload.phone || "-"}
Website: ${payload.website || "-"}
Ort/Region: ${payload.location || "-"}
Spezialisierung: ${payload.specialties || "-"}

Nachricht:
${payload.message || "-"}`;

    const htmlBody = `
      <h2>Neue Partneranfrage von Garage</h2>
      <p><strong>Garage:</strong> ${safe.garageName}</p>
      <p><strong>Ansprechperson:</strong> ${safe.contactName}</p>
      <p><strong>E-Mail:</strong> ${safe.email}</p>
      <p><strong>Telefon:</strong> ${safe.phone}</p>
      <p><strong>Website:</strong> ${safe.website}</p>
      <p><strong>Ort/Region:</strong> ${safe.location}</p>
      <p><strong>Spezialisierung:</strong> ${safe.specialties}</p>
      <p><strong>Nachricht:</strong><br/>${safe.message}</p>
    `;

    let emailSent = false;

    if (!process.env.RESEND_API_KEY) {
      console.warn(
        "RESEND_API_KEY missing, Partneranfrage nur lokal gespeichert."
      );
    } else {
      try {
        await resend.emails.send({
          from: "Carvoo <onboarding@resend.dev>",
          to: "info@carvoo.ch",
          replyTo: payload.email,
          subject: "Neue Carvoo Garage-Partneranfrage",
          text: textBody,
          html: htmlBody,
        });
        emailSent = true;
      } catch (mailError) {
        console.error("Garage partner email send failed:", mailError);
      }
    }

    return NextResponse.json({ success: true, partnerId: partner.id, emailSent });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Fehler beim Senden der Partneranfrage" },
      { status: 500 }
    );
  }
}
