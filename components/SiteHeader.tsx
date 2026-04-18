"use client";

import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { primaryNavigation } from "@/lib/site";

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = useMemo(
    () =>
      primaryNavigation.map((item) => ({
        ...item,
        active: isActiveLink(pathname, item.href),
      })),
    [pathname]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-[5.75rem] w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <BrandLogo variant="header" />
          <span className="sr-only">Carvoo Startseite</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label="Navigation umschalten"
        >
          {isOpen ? "Schließen" : "Menü"}
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Hauptnavigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                item.active
                  ? "bg-violet-100 text-violet-900 ring-1 ring-violet-200"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/partner-login"
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Partner Login
          </Link>
          <Link
            href="/anfrage"
            className="rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-4 py-2.5 text-sm font-bold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)] shadow-[0_10px_30px_-16px_rgba(103,41,222,0.55)] transition hover:translate-y-[-1px]"
          >
            Suchauftrag anfragen
          </Link>
        </div>
      </div>

      {isOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-slate-200 bg-white px-5 py-4 md:hidden"
          aria-label="Mobile Navigation"
        >
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  item.active
                    ? "bg-violet-100 text-violet-900 ring-1 ring-violet-200"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/anfrage"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex w-full justify-center rounded-xl bg-gradient-to-r from-[#241ab6] via-[#5420bb] to-[#8a28c2] px-4 py-3 text-sm font-bold !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.45)]"
            >
              Suchauftrag anfragen
            </Link>

            <Link
              href="/partner-login"
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Partner Login
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
