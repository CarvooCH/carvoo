import type { Metadata } from "next";

export const siteConfig = {
  name: "Carvoo",
  legalName: "Carvoo Auto-Suchservice",
  description:
    "Persönlicher Auto-Suchservice in der Schweiz. Carvoo filtert Angebote, spart dir Zeit und hilft dir, schneller das passende Fahrzeug zu finden.",
  url: "https://carvoo.ch",
  locale: "de_CH",
  email: "info@carvoo.ch",
};

export const primaryNavigation = [
  { href: "/", label: "Start" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ablauf", label: "Ablauf" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetaInput): Metadata {
  const canonicalUrl = new URL(path, siteConfig.url).toString();
  const completeTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: completeTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords,
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonicalUrl,
      title: completeTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: "/carvoo.png",
          width: 1024,
          height: 1024,
          alt: "Carvoo Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: completeTitle,
      description,
      images: ["/carvoo.png"],
    },
  };
}
