"use client";

import { useState } from "react";

type GaragePartnerFormState = {
  garageName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  specialties: string;
  message: string;
};

const initialState: GaragePartnerFormState = {
  garageName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  location: "",
  specialties: "",
  message: "",
};

export default function GaragePartnerForm() {
  const [form, setForm] = useState<GaragePartnerFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof GaragePartnerFormState>(
    key: K,
    value: GaragePartnerFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSuccess(false);
    setError("");
  }

  function validate() {
    if (!form.garageName.trim() || !form.contactName.trim() || !form.email.trim()) {
      setError("Bitte Garagenname, Ansprechperson und E-Mail ausfüllen.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return false;
    }

    return true;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/garage-partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        let message = "Partneranfrage konnte nicht gesendet werden.";
        try {
          const payload = (await response.json()) as { error?: string };
          if (payload.error) message = payload.error;
        } catch {}
        setError(message);
        return;
      }

      setSuccess(true);
      setForm(initialState);
    } catch (submitError) {
      console.error(submitError);
      setError("Partneranfrage konnte nicht gesendet werden.");
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
          Garage-Partnernetzwerk
        </p>
        <p className="mt-2 text-sm text-slate-700">
          Trage deine Garage ein. Wir melden uns nach Prüfung und sprechen die
          Zusammenarbeit für passende Suchaufträge ab.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Garagenname
          </span>
          <input
            type="text"
            value={form.garageName}
            onChange={(e) => updateField("garageName", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            placeholder="Garage Muster AG"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Ansprechperson
          </span>
          <input
            type="text"
            value={form.contactName}
            onChange={(e) => updateField("contactName", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            placeholder="Vorname Nachname"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            E-Mail
          </span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            placeholder="info@garage.ch"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Telefon
          </span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            placeholder="+41 xx xxx xx xx"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Website (optional)
          </span>
          <input
            type="url"
            value={form.website}
            onChange={(e) => updateField("website", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            placeholder="https://..."
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Standort / Region
          </span>
          <input
            type="text"
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            placeholder="z. B. Zürich, Aargau, Ostschweiz"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">
          Spezialgebiete / verfügbare Fahrzeuge
        </span>
        <textarea
          rows={4}
          value={form.specialties}
          onChange={(e) => updateField("specialties", e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
          placeholder="z. B. SUV, Elektro, Jungwagen, Premium, Nutzfahrzeuge"
        />
      </label>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">
          Nachricht (optional)
        </span>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
          placeholder="Weitere Infos zu eurer Garage oder Zusammenarbeit."
        />
      </label>

      {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
      {success && (
        <p className="mt-4 text-sm font-medium text-emerald-700">
          Danke, die Partneranfrage wurde gesendet.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-6 py-3 text-sm font-bold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Wird gesendet..." : "Als Partner anfragen"}
      </button>
    </form>
  );
}
