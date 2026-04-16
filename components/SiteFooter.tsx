import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { primaryNavigation, siteConfig } from "@/lib/site";

const legalLinks = [
  { href: "/kontakt", label: "Frage stellen" },
  { href: "/faq", label: "Häufige Fragen" },
  { href: "/anfrage", label: "Anfrage" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/90 text-slate-800">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center">
            <BrandLogo variant="footer" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
            Carvoo ist dein persönlicher Auto-Suchservice für die Schweiz.
            Wir reduzieren Suchaufwand, filtern Angebote und bringen dich
            schneller zu passenden Fahrzeugoptionen.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">
            Navigation
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-slate-700 transition hover:text-violet-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">
            Kontakt
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-slate-700 transition hover:text-violet-700"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <span className="text-slate-700">Schweizweit verfügbar</span>
            </li>
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-slate-700 transition hover:text-violet-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-4 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <span>
            {new Date().getFullYear()} {siteConfig.legalName}. Alle Rechte
            vorbehalten.
          </span>
          <span>Auto-Suchservice Schweiz | Carvoo.ch</span>
        </div>
      </div>
    </footer>
  );
}
