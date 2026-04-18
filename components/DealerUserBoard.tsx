"use client";

import { useState } from "react";
import type { DealerUserSafe } from "@/lib/dealer-user-schema";

function formatDate(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function DealerUserBoard({
  initialUsers,
}: {
  initialUsers: DealerUserSafe[];
}) {
  const [users, setUsers] = useState<DealerUserSafe[]>(initialUsers);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [passwordDrafts, setPasswordDrafts] = useState<Record<string, string>>({});
  const [notesDrafts, setNotesDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(initialUsers.map((entry) => [entry.id, entry.notes]))
  );

  function setUserDraft(id: string, value: string) {
    setPasswordDrafts((prev) => ({ ...prev, [id]: value }));
    setError("");
    setNotice("");
  }

  function setNotesDraft(id: string, value: string) {
    setNotesDrafts((prev) => ({ ...prev, [id]: value }));
    setError("");
    setNotice("");
  }

  async function reloadUsers() {
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/dealer-users", { cache: "no-store" });
      if (!response.ok) throw new Error("Reload users failed");
      const payload = (await response.json()) as { users: DealerUserSafe[] };
      setUsers(payload.users);
      setNotesDrafts(
        Object.fromEntries(payload.users.map((entry) => [entry.id, entry.notes]))
      );
    } catch (reloadError) {
      console.error(reloadError);
      setError("Partner-Zugänge konnten nicht neu geladen werden.");
    }
  }

  async function createUser() {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/dealer-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          notes,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Zugang konnte nicht erstellt werden.");
      }

      setUsername("");
      setPassword("");
      setNotes("");
      setNotice("Partner-Zugang erstellt.");
      await reloadUsers();
    } catch (createError) {
      console.error(createError);
      setError(
        createError instanceof Error
          ? createError.message
          : "Partner-Zugang konnte nicht erstellt werden."
      );
    } finally {
      setSaving(false);
    }
  }

  async function updateUser(
    id: string,
    patch: {
      active?: boolean;
      notes?: string;
      password?: string;
    }
  ) {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch(`/api/dealer-users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patch),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Speichern fehlgeschlagen.");
      }

      const payload = (await response.json()) as { user: DealerUserSafe };
      setUsers((prev) =>
        prev.map((entry) => (entry.id === payload.user.id ? payload.user : entry))
      );
      setNotice(`Zugang ${payload.user.username} gespeichert.`);
      setPasswordDrafts((prev) => ({ ...prev, [id]: "" }));
      setNotesDrafts((prev) => ({ ...prev, [id]: payload.user.notes }));
    } catch (updateError) {
      console.error(updateError);
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Speichern fehlgeschlagen."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_26px_80px_-44px_rgba(15,23,42,0.5)] lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Partner-Login
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Partner-Zugänge intern verwalten
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Nur von dir erstellte Zugänge können sich anmelden. Es gibt keine
              öffentliche Registrierung.
            </p>
          </div>

          <button
            type="button"
            onClick={reloadUsers}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Neu laden
          </button>
        </div>

        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
        {notice && (
          <p className="mt-4 text-sm font-medium text-emerald-700">{notice}</p>
        )}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-bold text-slate-900">Neuen Partner anlegen</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_1.4fr_auto]">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Benutzername"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            />
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notiz (optional)"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            />
            <button
              type="button"
              onClick={createUser}
              disabled={saving}
              className="rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-4 py-2 text-sm font-bold !text-white disabled:opacity-60"
            >
              {saving ? "..." : "Erstellen"}
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {users.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
              Noch keine Partner-Zugänge vorhanden.
            </div>
          )}

          {users.map((entry) => (
            <article
              key={entry.id}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-950">
                    {entry.username}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Erstellt: {formatDate(entry.createdAt)} | Letzte Änderung:{" "}
                    {formatDate(entry.updatedAt)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-bold ${
                      entry.active
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {entry.active ? "Aktiv" : "Gesperrt"}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateUser(entry.id, {
                        active: !entry.active,
                        notes: notesDrafts[entry.id] ?? entry.notes,
                      })
                    }
                    disabled={saving}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-60"
                  >
                    {entry.active ? "Sperren" : "Aktivieren"}
                  </button>
                </div>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                <input
                  type="text"
                  value={notesDrafts[entry.id] ?? entry.notes}
                  onChange={(e) => setNotesDraft(entry.id, e.target.value)}
                  placeholder="Interne Notiz"
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
                <input
                  type="text"
                  value={passwordDrafts[entry.id] ?? ""}
                  onChange={(e) => setUserDraft(entry.id, e.target.value)}
                  placeholder="Neues Passwort (optional)"
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
                <button
                  type="button"
                  onClick={() =>
                    updateUser(entry.id, {
                      notes: notesDrafts[entry.id] ?? entry.notes,
                      password: (passwordDrafts[entry.id] ?? "").trim() || undefined,
                    })
                  }
                  disabled={saving}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white disabled:opacity-60"
                >
                  Speichern
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
