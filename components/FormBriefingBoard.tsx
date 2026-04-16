"use client";

import { useState } from "react";
import type { FormBriefing } from "@/lib/form-briefing";

function formatDate(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function FormBriefingBoard({
  initialBriefing,
}: {
  initialBriefing: FormBriefing;
}) {
  const [requestForm, setRequestForm] = useState(initialBriefing.requestForm);
  const [contactForm, setContactForm] = useState(initialBriefing.contactForm);
  const [updatedAt, setUpdatedAt] = useState(initialBriefing.updatedAt);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function saveBriefing() {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/form-briefing", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestForm,
          contactForm,
        }),
      });

      if (!response.ok) {
        throw new Error("Saving form briefing failed");
      }

      const payload = (await response.json()) as {
        briefing: FormBriefing;
      };

      setRequestForm(payload.briefing.requestForm);
      setContactForm(payload.briefing.contactForm);
      setUpdatedAt(payload.briefing.updatedAt);
      setNotice("Briefing gespeichert.");
    } catch (saveError) {
      console.error(saveError);
      setError("Briefing konnte nicht gespeichert werden.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.55)] lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Formular-Briefing
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Vorgaben für die Formulare
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Hier kannst du direkt reinschreiben, wie die Formulare umgebaut
              werden sollen. Zuletzt aktualisiert: {formatDate(updatedAt)}
            </p>
          </div>
        </div>

        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
        {notice && (
          <p className="mt-4 text-sm font-medium text-emerald-700">{notice}</p>
        )}

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700">
            Suchanfrage-Formular
            <textarea
              rows={14}
              value={requestForm}
              onChange={(e) => setRequestForm(e.target.value)}
              placeholder="Schreibe hier rein, wie das Suchanfrage-Formular aussehen und funktionieren soll."
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-normal text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Kontaktformular
            <textarea
              rows={14}
              value={contactForm}
              onChange={(e) => setContactForm(e.target.value)}
              placeholder="Schreibe hier rein, wie das Kontaktformular aufgebaut sein soll."
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-normal text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={saveBriefing}
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-5 py-3 text-sm font-bold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Speichert..." : "Briefing speichern"}
          </button>
        </div>
      </div>
    </section>
  );
}
