import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/leistungen", changeFrequency: "monthly", priority: 0.9 },
  { path: "/leistungen/auftritt", changeFrequency: "monthly", priority: 0.9 },
  { path: "/leistungen/annahme", changeFrequency: "monthly", priority: 0.9 },
  { path: "/leistungen/ablaeufe", changeFrequency: "monthly", priority: 0.9 },
  { path: "/passt-das", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gewerke", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ueber-mich", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/foerderung/mid-digitale-prozesse",
    changeFrequency: "weekly",
    priority: 1,
  },
  { path: "/referenzen", changeFrequency: "monthly", priority: 0.8 },
  { path: "/referenzen/feinkost-kreta", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/referenzen/dachdecker-signature",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/preise", changeFrequency: "monthly", priority: 0.9 },
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.8 },
  { path: "/termin", changeFrequency: "monthly", priority: 0.7 },
  { path: "/impressum", changeFrequency: "yearly", priority: 0.2 },
  { path: "/datenschutz", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return staticRoutes.map((route) => ({
    url: route.path === "/" ? site.url : `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
