"use client";

import { useMemo, useState } from "react";
import {
  garagePartnerStatusLabel,
  garagePartnerStatuses,
  type GaragePartnerRecord,
} from "@/lib/garage-partner-schema";

type PartnerPatch = Pick<
  GaragePartnerRecord,
  "status" | "owner" | "lastContactOn" | "notes"
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

export default function GaragePartnerBoard({
  initialPartners,
}: {
  initialPartners: GaragePartnerRecord[];
}) {
  const [partners, setPartners] = useState<GaragePartnerRecord[]>(initialPartners);
  const [filter, setFilter] = useState<"alle" | GaragePartnerRecord["status"]>(
    "alle"
  );
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [drafts, setDrafts] = useState<Record<string, PartnerPatch>>(() =>
    Object.fromEntries(
      initialPartners.map((partner) => [
        partner.id,
        {
          status: partner.status,
          owner: partner.owner,
          lastContactOn: toInputDate(partner.lastContactOn),
          notes: partner.notes,
        },
      ])
    )
  );

  function hydrateDrafts(items: GaragePartnerRecord[]) {
    setDrafts((prev) => {
      const next: Record<string, PartnerPatch> = { ...prev };
      for (const partner of items) {
        next[partner.id] = {
          status: partner.status,
          owner: partner.owner,
          lastContactOn: toInputDate(partner.lastContactOn),
          notes: partner.notes,
        };
      }
      return next;
    });
  }

  async function reloadPartners() {
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/garage-partners", { cache: "no-store" });
      if (!response.ok) throw new Error("Partner list failed");
      const payload = (await response.json()) as { partners: GaragePartnerRecord[] };
      setPartners(payload.partners);
      hydrateDrafts(payload.partners);
    } catch (reloadError) {
      console.error(reloadError);
      setError("Partner konnten nicht neu geladen werden.");
    }
  }

  function updateDraft<K extends keyof PartnerPatch>(
    id: string,
    key: K,
    value: PartnerPatch[K]
  ) {
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? {
          status: "neu",
          owner: "",
          lastContactOn: "",
          notes: "",
        }),
        [key]: value,
      },
    }));
    setError("");
    setNotice("");
  }

  async function savePartner(id: string) {
    const draft = drafts[id];
    if (!draft) return;

    setSavingId(id);
    setError("");
    setNotice("");

    try {
      const response = await fetch(`/api/garage-partners/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draft),
      });

      if (!response.ok) throw new Error("Partner update failed");

      const payload = (await response.json()) as { partner: GaragePartnerRecord };
      setPartners((prev) =>
        prev.map((item) => (item.id === payload.partner.id ? payload.partner : item))
      );
      hydrateDrafts([payload.partner]);
      setNotice(`Partner ${payload.partner.garageName} gespeichert.`);
    } catch (saveError) {
      console.error(saveError);
      setError("Partner konnte nicht gespeichert werden.");
    } finally {
      setSavingId("");
    }
  }

  const filteredPartners = useMemo(() => {
    if (filter === "alle") return partners;
    return partners.filter((partner) => partner.status === filter);
  }, [filter, partners]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_26px_80px_-44px_rgba(15,23,42,0.5)] lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Partnernetzwerk
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Garagen-Partner verwalten
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Gesamt: <strong>{partners.length}</strong> Partneranfragen.
            </p>
          </div>

          <button
            type="button"
            onClick={reloadPartners}
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
          {garagePartnerStatuses.map((status) => (
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
              {garagePartnerStatusLabel[status]}
            </button>
          ))}
        </div>

        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
        {notice && (
          <p className="mt-4 text-sm font-medium text-emerald-700">{notice}</p>
        )}

        <div className="mt-8 space-y-6">
          {filteredPartners.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              Keine Partner im gewählten Filter.
            </div>
          )}

          {filteredPartners.map((partner) => {
            const draft = drafts[partner.id] ?? {
              status: partner.status,
              owner: partner.owner,
              lastContactOn: toInputDate(partner.lastContactOn),
              notes: partner.notes,
            };

            return (
              <article
                key={partner.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 lg:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-950">
                      {partner.garageName || "Unbekannte Garage"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Eingang: {formatDate(partner.createdAt)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-bold text-violet-800">
                        {garagePartnerStatusLabel[partner.status]}
                      </span>
                    </div>
                  </div>

                  <div className="min-w-[220px]">
                    <label className="text-xs font-semibold text-slate-600">
                      Status
                      <select
                        value={draft.status}
                        onChange={(e) =>
                          updateDraft(
                            partner.id,
                            "status",
                            e.target.value as GaragePartnerRecord["status"]
                          )
                        }
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      >
                        {garagePartnerStatuses.map((status) => (
                          <option key={status} value={status}>
                            {garagePartnerStatusLabel[status]}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
                  <div className="space-y-2 text-sm text-slate-700">
                    <p>
                      <strong>Ansprechperson:</strong> {partner.contactName || "-"}
                    </p>
                    <p>
                      <strong>E-Mail:</strong> {partner.email || "-"}
                    </p>
                    <p>
                      <strong>Telefon:</strong> {partner.phone || "-"}
                    </p>
                    <p>
                      <strong>Website:</strong> {partner.website || "-"}
                    </p>
                    <p>
                      <strong>Region:</strong> {partner.location || "-"}
                    </p>
                    <p>
                      <strong>Spezialgebiete:</strong> {partner.specialties || "-"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Nachricht
                    </p>
                    <p className="mt-2 whitespace-pre-wrap leading-7">
                      {partner.message || "-"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-[1fr_180px]">
                  <label className="text-xs font-semibold text-slate-600">
                    Zuständig
                    <input
                      type="text"
                      value={draft.owner}
                      onChange={(e) =>
                        updateDraft(partner.id, "owner", e.target.value)
                      }
                      placeholder="z. B. Timo"
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>

                  <label className="text-xs font-semibold text-slate-600">
                    Letzter Kontakt
                    <input
                      type="date"
                      value={draft.lastContactOn}
                      onChange={(e) =>
                        updateDraft(partner.id, "lastContactOn", e.target.value)
                      }
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>
                </div>

                <label className="mt-3 block text-xs font-semibold text-slate-600">
                  Interne Notizen
                  <textarea
                    rows={4}
                    value={draft.notes}
                    onChange={(e) =>
                      updateDraft(partner.id, "notes", e.target.value)
                    }
                    placeholder="z. B. Interessant für SUV bis 50k in Region Zürich."
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                  />
                </label>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">
                    Zuletzt aktualisiert: {formatDate(partner.updatedAt)}
                  </p>
                  <button
                    type="button"
                    onClick={() => savePartner(partner.id)}
                    disabled={savingId === partner.id}
                    className="rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-4 py-2 text-sm font-bold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)] disabled:opacity-60"
                  >
                    {savingId === partner.id ? "Speichert..." : "Speichern"}
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
