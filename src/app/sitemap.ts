import type { MetadataRoute } from "next";
import { industryList } from "@/lib/content";
import { site } from "@/lib/site";
import { standorte } from "@/lib/standorte";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  /**
   * Datum der letzten inhaltlichen Änderung — bewusst gepflegt und nicht an den
   * Build-Zeitpunkt gekoppelt.  Sonst meldet jede Auslieferung alle Seiten als
   * geändert und das lastmod-Signal wird wertlos.
   */
  lastModified: string;
};

const CONTENT_RELEASE = "2026-09-12";
const STABLE = "2026-07-01";
const LEGAL = "2026-05-01";

const staticRoutes: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1, lastModified: CONTENT_RELEASE },
  { path: "/leistungen", changeFrequency: "monthly", priority: 0.9, lastModified: CONTENT_RELEASE },
  { path: "/leistungen/auftritt", changeFrequency: "monthly", priority: 0.9, lastModified: STABLE },
  { path: "/leistungen/annahme", changeFrequency: "monthly", priority: 0.9, lastModified: STABLE },
  { path: "/leistungen/ablaeufe", changeFrequency: "monthly", priority: 0.9, lastModified: STABLE },
  { path: "/passt-das", changeFrequency: "monthly", priority: 0.8, lastModified: STABLE },
  { path: "/gewerke", changeFrequency: "monthly", priority: 0.8, lastModified: CONTENT_RELEASE },
  { path: "/ueber-mich", changeFrequency: "monthly", priority: 0.7, lastModified: STABLE },
  {
    path: "/foerderung/mid-digitale-prozesse",
    changeFrequency: "weekly",
    priority: 1,
    lastModified: CONTENT_RELEASE,
  },
  { path: "/referenzen", changeFrequency: "monthly", priority: 0.8, lastModified: STABLE },
  {
    path: "/referenzen/feinkost-kreta",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: STABLE,
  },
  {
    path: "/referenzen/dachdecker-signature",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: STABLE,
  },
  { path: "/preise", changeFrequency: "monthly", priority: 0.9, lastModified: CONTENT_RELEASE },
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.8, lastModified: STABLE },
  { path: "/termin", changeFrequency: "monthly", priority: 0.7, lastModified: STABLE },
  { path: "/impressum", changeFrequency: "yearly", priority: 0.2, lastModified: LEGAL },
  { path: "/datenschutz", changeFrequency: "yearly", priority: 0.2, lastModified: LEGAL },
];

const gewerkRoutes: Entry[] = industryList.map((item) => ({
  path: `/gewerke/${item.slug}`,
  changeFrequency: "monthly",
  priority: 0.8,
  lastModified: CONTENT_RELEASE,
}));

const standortRoutes: Entry[] = standorte.map((item) => ({
  path: `/${item.slug}`,
  changeFrequency: "monthly",
  priority: 0.9,
  lastModified: CONTENT_RELEASE,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...gewerkRoutes, ...standortRoutes].map((route) => ({
    url: route.path === "/" ? site.url : `${site.url}${route.path}`,
    lastModified: new Date(`${route.lastModified}T12:00:00Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
