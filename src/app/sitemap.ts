import type { MetadataRoute } from "next";
import { industryList } from "@/lib/content";
import { foerderung } from "@/lib/foerderung";
import { site } from "@/lib/site";

const contentUpdated = new Date("2026-09-08");
const foerderungUpdated = new Date(foerderung.reviewed);

/** Keine echten Seiten. Die Sitemap listet nur vorhandene URLs und verspricht keine Indexierung. */
const notShipped = new Set(["/referenzen/poolseller"]);

const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified: Date;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1, lastModified: contentUpdated },
  { path: "/leistungen", changeFrequency: "monthly", priority: 0.9, lastModified: contentUpdated },
  { path: "/leistungen/auftritt", changeFrequency: "monthly", priority: 0.9, lastModified: contentUpdated },
  { path: "/leistungen/annahme", changeFrequency: "monthly", priority: 0.9, lastModified: contentUpdated },
  { path: "/leistungen/ablaeufe", changeFrequency: "monthly", priority: 0.9, lastModified: contentUpdated },
  { path: "/leistungen/affiliate", changeFrequency: "monthly", priority: 0.9, lastModified: contentUpdated },
  { path: "/passt-das", changeFrequency: "monthly", priority: 0.8, lastModified: contentUpdated },
  { path: "/gewerke", changeFrequency: "monthly", priority: 0.8, lastModified: contentUpdated },
  { path: "/ueber-mich", changeFrequency: "monthly", priority: 0.7, lastModified: contentUpdated },
  {
    path: "/foerderung/mid-digitale-prozesse",
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: foerderungUpdated,
  },
  { path: "/referenzen", changeFrequency: "monthly", priority: 0.8, lastModified: contentUpdated },
  { path: "/referenzen/feinkost-kreta", changeFrequency: "monthly", priority: 0.8, lastModified: contentUpdated },
  {
    path: "/referenzen/dachdecker-signature",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: contentUpdated,
  },
  { path: "/preise", changeFrequency: "monthly", priority: 0.9, lastModified: contentUpdated },
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.8, lastModified: contentUpdated },
  { path: "/termin", changeFrequency: "monthly", priority: 0.7, lastModified: contentUpdated },
  { path: "/impressum", changeFrequency: "yearly", priority: 0.2, lastModified: contentUpdated },
  { path: "/datenschutz", changeFrequency: "yearly", priority: 0.2, lastModified: contentUpdated },
  ...industryList.map((item) => ({
    path: `/${item.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: contentUpdated,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.filter((route) => !notShipped.has(route.path)).map((route) => ({
    url: route.path === "/" ? site.url : `${site.url}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
