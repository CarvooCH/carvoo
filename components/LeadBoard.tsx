"use client";

import { useMemo, useState } from "react";
import {
  leadPriorities,
  leadPriorityLabel,
  leadStatusLabel,
  leadStatuses,
  leadTypeLabel,
  type LeadRecord,
} from "@/lib/lead-schema";

type LeadPatch = Pick<
  LeadRecord,
  | "status"
  | "priority"
  | "owner"
  | "nextFollowUp"
  | "notes"
  | "partnerForwardingConsent"
  | "partnerForwardedOn"
  | "partnerForwardedTo"
>;

function toInputDate(value: string) {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return value.slice(0, 10);
}

function formatDate(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function LeadBoard({ initialLeads }: { initialLeads: LeadRecord[] }) {
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [filter, setFilter] = useState<"alle" | LeadRecord["status"]>("alle");
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [drafts, setDrafts] = useState<Record<string, LeadPatch>>(() =>
    Object.fromEntries(
      initialLeads.map((lead) => [
        lead.id,
        {
          status: lead.status,
          priority: lead.priority,
          owner: lead.owner,
          nextFollowUp: toInputDate(lead.nextFollowUp),
          notes: lead.notes,
          partnerForwardingConsent: lead.partnerForwardingConsent,
          partnerForwardedOn: toInputDate(lead.partnerForwardedOn),
          partnerForwardedTo: lead.partnerForwardedTo,
        },
      ])
    )
  );

  function hydrateDrafts(items: LeadRecord[]) {
    setDrafts((prev) => {
      const next: Record<string, LeadPatch> = { ...prev };
      for (const lead of items) {
        next[lead.id] = {
          status: lead.status,
          priority: lead.priority,
          owner: lead.owner,
          nextFollowUp: toInputDate(lead.nextFollowUp),
          notes: lead.notes,
          partnerForwardingConsent: lead.partnerForwardingConsent,
          partnerForwardedOn: toInputDate(lead.partnerForwardedOn),
          partnerForwardedTo: lead.partnerForwardedTo,
        };
      }
      return next;
    });
  }

  async function reloadLeads() {
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/leads", { cache: "no-store" });
      if (!response.ok) throw new Error("Lead list failed");
      const payload = (await response.json()) as { leads: LeadRecord[] };
      setLeads(payload.leads);
      hydrateDrafts(payload.leads);
    } catch (reloadError) {
      console.error(reloadError);
      setError("Leads konnten nicht neu geladen werden.");
    }
  }

  function updateDraft<K extends keyof LeadPatch>(
    id: string,
    key: K,
    value: LeadPatch[K]
  ) {
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? {
          status: "neu",
          priority: "mittel",
          owner: "",
          nextFollowUp: "",
          notes: "",
          partnerForwardingConsent: false,
          partnerForwardedOn: "",
          partnerForwardedTo: "",
        }),
        [key]: value,
      },
    }));
    setError("");
    setNotice("");
  }

  async function saveLead(id: string) {
    const draft = drafts[id];
    if (!draft) return;

    setSavingId(id);
    setError("");
    setNotice("");

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draft),
      });

      if (!response.ok) throw new Error("Lead update failed");

      const payload = (await response.json()) as { lead: LeadRecord };
      setLeads((prev) =>
        prev.map((item) => (item.id === payload.lead.id ? payload.lead : item))
      );
      hydrateDrafts([payload.lead]);
      setNotice(`Lead ${payload.lead.name} gespeichert.`);
    } catch (saveError) {
      console.error(saveError);
      setError("Speichern fehlgeschlagen. Bitte erneut versuchen.");
    } finally {
      setSavingId("");
    }
  }

  const filteredLeads = useMemo(() => {
    if (filter === "alle") return leads;
    return leads.filter((lead) => lead.status === filter);
  }, [filter, leads]);

  const openCount = useMemo(
    () =>
      leads.filter((lead) => !["abgeschlossen", "verloren"].includes(lead.status))
        .length,
    [leads]
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_26px_80px_-44px_rgba(15,23,42,0.5)] lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Projektzentrale
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Anfragen sammeln und strukturiert abarbeiten
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Offen: <strong>{openCount}</strong> von insgesamt{" "}
              <strong>{leads.length}</strong> Leads.
            </p>
          </div>

          <button
            type="button"
            onClick={reloadLeads}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Neu laden
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("alle")}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
              filter === "alle"
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            Alle
          </button>
          {leadStatuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                filter === status
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {leadStatusLabel[status]}
            </button>
          ))}
        </div>

        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
        {notice && (
          <p className="mt-4 text-sm font-medium text-emerald-700">{notice}</p>
        )}

        <div className="mt-8 space-y-6">
          {filteredLeads.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              Keine Leads im gewählten Filter.
            </div>
          )}

          {filteredLeads.map((lead) => {
            const draft = drafts[lead.id] ?? {
              status: lead.status,
              priority: lead.priority,
              owner: lead.owner,
              nextFollowUp: toInputDate(lead.nextFollowUp),
              notes: lead.notes,
              partnerForwardingConsent: lead.partnerForwardingConsent,
              partnerForwardedOn: toInputDate(lead.partnerForwardedOn),
              partnerForwardedTo: lead.partnerForwardedTo,
            };

            return (
              <article
                key={lead.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 lg:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-950">
                      {lead.name || "Unbekannt"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Eingang: {formatDate(lead.createdAt)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-bold text-violet-800">
                        {leadTypeLabel[lead.type]}
                      </span>
                      {lead.partnerForwardingConsent && (
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800">
                          Partnerfreigabe
                        </span>
                      )}
                      {!lead.partnerForwardingConsent && lead.type === "anfrage" && (
                        <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-bold text-slate-700">
                          Keine Partnerfreigabe
                        </span>
                      )}
                      {lead.utmSource && (
                        <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">
                          UTM: {lead.utmSource}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid min-w-[240px] gap-2 sm:grid-cols-2">
                    <label className="text-xs font-semibold text-slate-600">
                      Status
                      <select
                        value={draft.status}
                        onChange={(e) =>
                          updateDraft(
                            lead.id,
                            "status",
                            e.target.value as LeadRecord["status"]
                          )
                        }
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      >
                        {leadStatuses.map((status) => (
                          <option key={status} value={status}>
                            {leadStatusLabel[status]}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="text-xs font-semibold text-slate-600">
                      Priorität
                      <select
                        value={draft.priority}
                        onChange={(e) =>
                          updateDraft(
                            lead.id,
                            "priority",
                            e.target.value as LeadRecord["priority"]
                          )
                        }
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      >
                        {leadPriorities.map((priority) => (
                          <option key={priority} value={priority}>
                            {leadPriorityLabel[priority]}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
                  <div className="space-y-2 text-sm text-slate-700">
                    <p>
                      <strong>E-Mail:</strong> {lead.email || "-"}
                    </p>
                    <p>
                      <strong>Telefon:</strong> {lead.phone || "-"}
                    </p>
                    {lead.subject && (
                      <p>
                        <strong>Betreff:</strong> {lead.subject}
                      </p>
                    )}
                    {lead.budget && (
                      <p>
                        <strong>Budget:</strong>{" "}
                        {Number(lead.budget).toLocaleString("de-CH")} CHF
                      </p>
                    )}
                    {(lead.carType ||
                      lead.fuelType ||
                      lead.transmission ||
                      lead.driveType) && (
                      <p>
                        <strong>Fahrzeug:</strong>{" "}
                        {[
                          lead.carType,
                          lead.fuelType,
                          lead.transmission,
                          lead.driveType,
                        ]
                          .filter(Boolean)
                          .join(" | ")}
                      </p>
                    )}
                    {lead.equipment && (
                      <p>
                        <strong>Ausstattung:</strong> {lead.equipment}
                      </p>
                    )}
                    {lead.type === "anfrage" && (
                      <p>
                        <strong>Partnerfreigabe (intern):</strong>{" "}
                        {lead.partnerForwardingConsent ? "Ja" : "Nein"}
                      </p>
                    )}
                    {lead.partnerForwardedTo && (
                      <p>
                        <strong>Weitergeleitet an:</strong> {lead.partnerForwardedTo}
                      </p>
                    )}
                    <p className="text-xs text-slate-500">
                      Quelle: {lead.utmSource || "-"} | Kampagne:{" "}
                      {lead.utmCampaign || "-"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Nachricht
                    </p>
                    <p className="mt-2 whitespace-pre-wrap leading-7">
                      {lead.message || "-"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-[1fr_180px]">
                  <label className="text-xs font-semibold text-slate-600">
                    Zuständig
                    <input
                      type="text"
                      value={draft.owner}
                      onChange={(e) => updateDraft(lead.id, "owner", e.target.value)}
                      placeholder="z. B. Timo"
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>

                  <label className="text-xs font-semibold text-slate-600">
                    Nächstes Follow-up
                    <input
                      type="date"
                      value={draft.nextFollowUp}
                      onChange={(e) =>
                        updateDraft(lead.id, "nextFollowUp", e.target.value)
                      }
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>
                </div>

                {lead.type === "anfrage" && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-slate-600">
                      Für Partnernetzwerk freigeben
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateDraft(lead.id, "partnerForwardingConsent", true)
                        }
                        className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                          draft.partnerForwardingConsent
                            ? "bg-emerald-700 text-white"
                            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        Ja, freigegeben
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateDraft(lead.id, "partnerForwardingConsent", false)
                        }
                        className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                          !draft.partnerForwardingConsent
                            ? "bg-slate-900 text-white"
                            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        Nein
                      </button>
                    </div>
                  </div>
                )}

                {lead.type === "anfrage" && draft.partnerForwardingConsent && (
                  <div className="mt-3 grid gap-3 md:grid-cols-[1fr_180px]">
                    <label className="text-xs font-semibold text-slate-600">
                      Weitergeleitet an Partner
                      <input
                        type="text"
                        value={draft.partnerForwardedTo}
                        onChange={(e) =>
                          updateDraft(lead.id, "partnerForwardedTo", e.target.value)
                        }
                        placeholder="z. B. Garage Muster AG, Autohaus XY"
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                    </label>

                    <label className="text-xs font-semibold text-slate-600">
                      Weitergeleitet am
                      <input
                        type="date"
                        value={draft.partnerForwardedOn}
                        onChange={(e) =>
                          updateDraft(lead.id, "partnerForwardedOn", e.target.value)
                        }
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                    </label>
                  </div>
                )}

                <label className="mt-3 block text-xs font-semibold text-slate-600">
                  Interne Notizen
                  <textarea
                    rows={4}
                    value={draft.notes}
                    onChange={(e) => updateDraft(lead.id, "notes", e.target.value)}
                    placeholder="z. B. Rückruf morgen 10:00, Interesse an SUV bis 35k."
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                  />
                </label>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">
                    Zuletzt aktualisiert: {formatDate(lead.updatedAt)}
                  </p>
                  <button
                    type="button"
                    onClick={() => saveLead(lead.id)}
                    disabled={savingId === lead.id}
                    className="rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-4 py-2 text-sm font-bold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)] disabled:opacity-60"
                  >
                    {savingId === lead.id ? "Speichert..." : "Speichern"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
