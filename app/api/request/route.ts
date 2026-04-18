import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createLead } from "@/lib/leads";

const resend = new Resend(process.env.RESEND_API_KEY);

type RequestPayload = {
  name: string;
  email: string;
  phone: string;
  budget: string;
  carType: string;
  fuelType: string;
  transmission: string;
  driveType: string;
  equipment: string[];
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
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function cleanList(value: unknown, itemMaxLength: number, maxItems: number) {
  if (!Array.isArray(value)) return [] as string[];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => cleanText(item, itemMaxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function parsePayload(data: unknown): RequestPayload {
  const source = (data ?? {}) as Record<string, unknown>;

  return {
    name: cleanText(source.name, 120),
    email: cleanText(source.email, 180).toLowerCase(),
    phone: cleanText(source.phone, 80),
    budget: cleanText(source.budget, 20),
    carType: cleanText(source.carType, 60),
    fuelType: cleanText(source.fuelType, 60),
    transmission: cleanText(source.transmission, 60),
    driveType: cleanText(source.driveType, 60),
    equipment: cleanList(source.equipment, 80, 20),
    message: cleanText(source.message, 2500),
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

    if (!payload.name || !payload.email) {
      return NextResponse.json(
        { error: "Name und E-Mail sind erforderlich." },
        { status: 400 }
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige E-Mail an." },
        { status: 400 }
      );
    }

    const budgetNumber = Number(payload.budget);
    const budget = Number.isFinite(budgetNumber)
      ? budgetNumber.toLocaleString("de-CH")
      : payload.budget || "-";
    const equipmentText = payload.equipment.length
      ? payload.equipment.join(", ")
      : "-";
    const leadMessage = [
      payload.message || "",
      `Antriebsart: ${payload.driveType || "-"}`,
      `Ausstattung: ${equipmentText}`,
    ]
      .filter(Boolean)
      .join("\n");

    const lead = await createLead({
      type: "anfrage",
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: "Fahrzeug-Anfrage",
      message: leadMessage,
      owner: "",
      nextFollowUp: "",
      notes: "",
      budget: payload.budget,
      carType: payload.carType,
      fuelType: payload.fuelType,
      transmission: payload.transmission,
      driveType: payload.driveType,
      equipment: equipmentText,
      partnerForwardingConsent: false,
      partnerForwardedOn: "",
      partnerForwardedTo: "",
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
      budget: escapeHtml(budget),
      carType: escapeHtml(payload.carType || "-"),
      fuelType: escapeHtml(payload.fuelType || "-"),
      transmission: escapeHtml(payload.transmission || "-"),
      driveType: escapeHtml(payload.driveType || "-"),
      equipment: escapeHtml(equipmentText),
      message: escapeHtml(payload.message || "-"),
    };

    const textBody = `Neue Carvoo Anfrage

Name: ${payload.name}
E-Mail: ${payload.email}
Telefon: ${payload.phone || "-"}
Budget: ${budget} CHF
Fahrzeugtyp: ${payload.carType || "-"}
Treibstoff: ${payload.fuelType || "-"}
Getriebe: ${payload.transmission || "-"}
Antriebsart: ${payload.driveType || "-"}
Ausstattung: ${equipmentText}

Weitere Wünsche:
${payload.message || "-"}`;

    const htmlBody = `
      <h2>Neue Carvoo Anfrage</h2>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>E-Mail:</strong> ${safe.email}</p>
      <p><strong>Telefon:</strong> ${safe.phone}</p>
      <p><strong>Budget:</strong> ${safe.budget} CHF</p>
      <p><strong>Fahrzeugtyp:</strong> ${safe.carType}</p>
      <p><strong>Treibstoff:</strong> ${safe.fuelType}</p>
      <p><strong>Getriebe:</strong> ${safe.transmission}</p>
      <p><strong>Antriebsart:</strong> ${safe.driveType}</p>
      <p><strong>Ausstattung:</strong> ${safe.equipment}</p>
      <p><strong>Weitere Wünsche:</strong><br/>${safe.message}</p>
    `;

    let emailSent = false;

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY missing, Anfrage nur im Lead-System gespeichert.");
    } else {
      try {
        await resend.emails.send({
          from: "Carvoo <onboarding@resend.dev>",
          to: "info@carvoo.ch",
          replyTo: payload.email,
          subject: "Neue Carvoo Anfrage",
          text: textBody,
          html: htmlBody,
        });
        emailSent = true;
      } catch (mailError) {
        console.error("Request email send failed:", mailError);
      }
    }

    return NextResponse.json({ success: true, leadId: lead.id, emailSent });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Fehler beim Senden" }, { status: 500 });
  }
}
