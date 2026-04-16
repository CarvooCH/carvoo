"use client";

import { useEffect, useState } from "react";

type ContactState = {
  name: string;
  email: string;
  phone: string;
  contactPreference: string;
  subject: string;
  message: string;
};

type TrackingState = {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
};

const initialState: ContactState = {
  name: "",
  email: "",
  phone: "",
  contactPreference: "E-Mail",
  subject: "",
  message: "",
};

const initialTracking: TrackingState = {
  landingPage: "",
  referrer: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmTerm: "",
  utmContent: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactState>(initialState);
  const [tracking, setTracking] = useState<TrackingState>(initialTracking);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setTracking({
      landingPage: window.location.href,
      referrer: document.referrer || "",
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      utmTerm: params.get("utm_term") ?? "",
      utmContent: params.get("utm_content") ?? "",
    });
  }, []);

  function updateField(name: keyof ContactState, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess(false);
  }

  function validate() {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Bitte Name, E-Mail und Nachricht ausfüllen.");
      return false;
    }

    if (form.contactPreference === "Anruf" && !form.phone.trim()) {
      setError("Bitte gib eine Telefonnummer an, damit wir dich anrufen können.");
      return false;
    }

    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, ...tracking }),
      });

      if (!response.ok) {
        let message =
          "Nachricht konnte nicht gesendet werden. Bitte erneut versuchen.";
        try {
          const payload = (await response.json()) as { error?: string };
          if (payload.error) {
            message = payload.error;
          }
        } catch {}
        setError(message);
        return;
      }

      setSuccess(true);
      setForm(initialState);
    } catch (submitError) {
      console.error(submitError);
      setError("Nachricht konnte nicht gesendet werden. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.5)] md:p-8"
    >
      <div className="mb-6 rounded-2xl border border-violet-200 bg-violet-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
          Premium Kontakt
        </p>
        <p className="mt-2 text-sm text-slate-700">
          Schnell gefragt, klar beantwortet. Wähle einfach, ob wir per E-Mail
          oder Rückruf antworten sollen.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            placeholder="Dein Name"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">E-Mail</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            placeholder="name@email.ch"
          />
        </label>
      </div>

      <div className="mt-5">
        <p className="mb-2 block text-sm font-semibold text-slate-700">
          Gewünschter Kontaktweg
        </p>
        <div className="flex flex-wrap gap-3">
          {["E-Mail", "Anruf"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField("contactPreference", option)}
              className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                form.contactPreference === option
                  ? "border-violet-700 bg-violet-700 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">
          Telefon (optional)
        </span>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
          placeholder="+41 xx xxx xx xx"
        />
      </label>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">
          Betreff (optional)
        </span>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
          placeholder="Worum geht es?"
        />
      </label>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">
          Nachricht
        </span>
        <textarea
          name="message"
          rows={6}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
          placeholder="Stelle uns hier deine Frage."
        />
      </label>

      {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
      {success && (
        <p className="mt-4 text-sm font-medium text-emerald-700">
          Danke, deine Frage wurde gesendet. Wir melden uns wie gewünscht.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-6 py-3 text-sm font-bold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Wird gesendet..." : "Frage senden"}
      </button>
    </form>
  );
}
