import type { MetadataRoute } from "next";
import { industryList } from "@/lib/content";
import { foerderung } from "@/lib/foerderung";
import { site } from "@/lib/site";

const unchanged = new Date("2026-09-08");
const revised = new Date("2026-09-29");
const foerderungUpdated = new Date(foerderung.reviewed);

const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified: Date;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1, lastModified: revised },
  { path: "/leistungen", changeFrequency: "monthly", priority: 0.9, lastModified: unchanged },
  { path: "/leistungen/auftritt", changeFrequency: "monthly", priority: 0.9, lastModified: revised },
  { path: "/leistungen/annahme", changeFrequency: "monthly", priority: 0.9, lastModified: revised },
  { path: "/leistungen/ablaeufe", changeFrequency: "monthly", priority: 0.9, lastModified: unchanged },
  { path: "/leistungen/affiliate", changeFrequency: "monthly", priority: 0.9, lastModified: revised },
  { path: "/webdesign-fuer-handwerker", changeFrequency: "monthly", priority: 0.9, lastModified: revised },
  { path: "/passt-das", changeFrequency: "monthly", priority: 0.8, lastModified: revised },
  { path: "/gewerke", changeFrequency: "monthly", priority: 0.8, lastModified: revised },
  { path: "/ueber-mich", changeFrequency: "monthly", priority: 0.7, lastModified: unchanged },
  {
    path: "/foerderung/mid-digitale-prozesse",
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: foerderungUpdated,
  },
  { path: "/referenzen", changeFrequency: "monthly", priority: 0.8, lastModified: revised },
  {
    path: "/referenzen/dachdecker-signature",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: revised,
  },
  { path: "/preise", changeFrequency: "monthly", priority: 0.9, lastModified: unchanged },
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.8, lastModified: revised },
  { path: "/termin", changeFrequency: "monthly", priority: 0.7, lastModified: unchanged },
  { path: "/impressum", changeFrequency: "yearly", priority: 0.2, lastModified: unchanged },
  { path: "/datenschutz", changeFrequency: "yearly", priority: 0.2, lastModified: unchanged },
  ...industryList.map((item) => ({
    path: `/${item.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: revised,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: route.path === "/" ? site.url : `${site.url}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
