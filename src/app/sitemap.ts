import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const staticRoutes: {
  path: string;
  updated: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", updated: "2026-09-06", changeFrequency: "weekly", priority: 1 },
  { path: "/leistungen", updated: "2026-09-04", changeFrequency: "monthly", priority: 0.9 },
  { path: "/leistungen/auftritt", updated: "2026-09-04", changeFrequency: "monthly", priority: 0.9 },
  { path: "/leistungen/annahme", updated: "2026-09-04", changeFrequency: "monthly", priority: 0.9 },
  { path: "/leistungen/ablaeufe", updated: "2026-09-04", changeFrequency: "monthly", priority: 0.9 },
  { path: "/passt-das", updated: "2026-09-04", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gewerke", updated: "2026-09-05", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ueber-mich", updated: "2026-09-04", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/foerderung/mid-digitale-prozesse",
    updated: "2026-09-04",
    changeFrequency: "weekly",
    priority: 1,
  },
  { path: "/referenzen", updated: "2026-09-04", changeFrequency: "monthly", priority: 0.8 },
  { path: "/referenzen/feinkost-kreta", updated: "2026-09-06", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/referenzen/dachdecker-signature",
    updated: "2026-09-04",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/preise", updated: "2026-09-06", changeFrequency: "monthly", priority: 0.9 },
  { path: "/kontakt", updated: "2026-09-04", changeFrequency: "monthly", priority: 0.8 },
  { path: "/termin", updated: "2026-09-06", changeFrequency: "monthly", priority: 0.7 },
  { path: "/impressum", updated: "2026-09-03", changeFrequency: "yearly", priority: 0.2 },
  { path: "/datenschutz", updated: "2026-09-03", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: route.path === "/" ? site.url : `${site.url}${route.path}`,
    lastModified: new Date(`${route.updated}T00:00:00.000Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
