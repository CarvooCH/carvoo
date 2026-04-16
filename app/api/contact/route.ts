import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createLead } from "@/lib/leads";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  contactPreference: string;
  subject: string;
  message: string;
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function parsePayload(data: unknown): ContactPayload {
  const source = (data ?? {}) as Record<string, unknown>;

  return {
    name: cleanText(source.name, 120),
    email: cleanText(source.email, 180).toLowerCase(),
    phone: cleanText(source.phone, 80),
    contactPreference: cleanText(source.contactPreference, 40),
    subject: cleanText(source.subject, 150),
    message: cleanText(source.message, 3000),
    landingPage: cleanText(source.landingPage ?? source.landing_page, 300),
    referrer: cleanText(source.referrer, 300),
    utmSource: cleanText(source.utmSource ?? source.utm_source, 120),
    utmMedium: cleanText(source.utmMedium ?? source.utm_medium, 120),
    utmCampaign: cleanText(source.utmCampaign ?? source.utm_campaign, 140),
    utmTerm: cleanText(source.utmTerm ?? source.utm_term, 140),
    utmContent: cleanText(source.utmContent ?? source.utm_content, 140),
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

export async function POST(req: Request) {
  try {
    const payload = parsePayload(await req.json());

    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json(
        { error: "Name, E-Mail und Nachricht sind erforderlich." },
        { status: 400 }
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige E-Mail an." },
        { status: 400 }
      );
    }

    if (payload.contactPreference === "Anruf" && !payload.phone) {
      return NextResponse.json(
        { error: "Bitte gib für Rückruf eine Telefonnummer an." },
        { status: 400 }
      );
    }

    const mergedMessage = [
      `Kontaktweg: ${payload.contactPreference || "E-Mail"}`,
      payload.message,
    ].join("\n");

    const lead = await createLead({
      type: "frage",
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      message: mergedMessage,
      owner: "",
      nextFollowUp: "",
      notes: "",
      budget: "",
      carType: "",
      fuelType: "",
      transmission: "",
      driveType: "",
      equipment: "",
      landingPage: payload.landingPage,
      referrer: payload.referrer,
      utmSource: payload.utmSource,
      utmMedium: payload.utmMedium,
      utmCampaign: payload.utmCampaign,
      utmTerm: payload.utmTerm,
      utmContent: payload.utmContent,
    });

    const safe = {
      name: escapeHtml(payload.name),
      email: escapeHtml(payload.email),
      phone: escapeHtml(payload.phone || "-"),
      contactPreference: escapeHtml(payload.contactPreference || "E-Mail"),
      subject: escapeHtml(payload.subject || "Ohne Betreff"),
      message: escapeHtml(payload.message),
    };

    const subjectText = payload.subject
      ? `Neue Kontaktfrage: ${payload.subject}`
      : "Neue Kontaktfrage";

    const textBody = `Neue Kontaktfrage

Name: ${payload.name}
E-Mail: ${payload.email}
Telefon: ${payload.phone || "-"}
Kontaktweg: ${payload.contactPreference || "E-Mail"}
Betreff: ${payload.subject || "Ohne Betreff"}

Nachricht:
${payload.message}`;

    const htmlBody = `
      <h2>Neue Kontaktfrage</h2>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>E-Mail:</strong> ${safe.email}</p>
      <p><strong>Telefon:</strong> ${safe.phone}</p>
      <p><strong>Kontaktweg:</strong> ${safe.contactPreference}</p>
      <p><strong>Betreff:</strong> ${safe.subject}</p>
      <p><strong>Nachricht:</strong><br/>${safe.message}</p>
    `;

    let emailSent = false;

    if (!process.env.RESEND_API_KEY) {
      console.warn(
        "RESEND_API_KEY missing, Kontaktanfrage nur im Lead-System gespeichert."
      );
    } else {
      try {
        await resend.emails.send({
          from: "Carvoo <onboarding@resend.dev>",
          to: "info@carvoo.ch",
          replyTo: payload.email,
          subject: subjectText,
          text: textBody,
          html: htmlBody,
        });
        emailSent = true;
      } catch (mailError) {
        console.error("Contact email send failed:", mailError);
      }
    }

    return NextResponse.json({ success: true, leadId: lead.id, emailSent });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Fehler beim Senden der Nachricht" },
      { status: 500 }
    );
  }
}
