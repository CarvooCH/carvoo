import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  "/",
  "/leistungen",
  "/preise",
  "/ablauf",
  "/ueber-uns",
  "/faq",
  "/kontakt",
  "/anfrage",
  "/partner-werden",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
