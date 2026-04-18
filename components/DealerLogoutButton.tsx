"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DealerLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/dealer-auth/logout", { method: "POST" });
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/partner-login");
      router.refresh();
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
    >
      {loading ? "Abmelden..." : "Abmelden"}
    </button>
  );
}
