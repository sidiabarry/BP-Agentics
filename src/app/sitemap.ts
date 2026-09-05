import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

function lastModified(relPath: string) {
  try {
    return fs.statSync(path.join(process.cwd(), relPath)).mtime;
  } catch {
    return new Date();
  }
}

const staticRoutes: {
  path: string;
  file: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", file: "src/app/page.tsx", changeFrequency: "weekly", priority: 1 },
  { path: "/leistungen", file: "src/app/leistungen/page.tsx", changeFrequency: "monthly", priority: 0.9 },
  { path: "/leistungen/auftritt", file: "src/app/leistungen/auftritt/page.tsx", changeFrequency: "monthly", priority: 0.9 },
  { path: "/leistungen/annahme", file: "src/app/leistungen/annahme/page.tsx", changeFrequency: "monthly", priority: 0.9 },
  { path: "/leistungen/ablaeufe", file: "src/app/leistungen/ablaeufe/page.tsx", changeFrequency: "monthly", priority: 0.9 },
  { path: "/passt-das", file: "src/app/passt-das/page.tsx", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gewerke", file: "src/app/gewerke/page.tsx", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ueber-mich", file: "src/app/ueber-mich/page.tsx", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/foerderung/mid-digitale-prozesse",
    file: "src/app/foerderung/mid-digitale-prozesse/page.tsx",
    changeFrequency: "weekly",
    priority: 1,
  },
  { path: "/referenzen", file: "src/app/referenzen/page.tsx", changeFrequency: "monthly", priority: 0.8 },
  { path: "/referenzen/feinkost-kreta", file: "src/app/referenzen/feinkost-kreta/page.tsx", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/referenzen/dachdecker-signature",
    file: "src/app/referenzen/dachdecker-signature/page.tsx",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/preise", file: "src/app/preise/page.tsx", changeFrequency: "monthly", priority: 0.9 },
  { path: "/kontakt", file: "src/app/kontakt/page.tsx", changeFrequency: "monthly", priority: 0.8 },
  { path: "/termin", file: "src/app/termin/page.tsx", changeFrequency: "monthly", priority: 0.7 },
  { path: "/impressum", file: "src/app/impressum/page.tsx", changeFrequency: "yearly", priority: 0.2 },
  { path: "/datenschutz", file: "src/app/datenschutz/page.tsx", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: route.path === "/" ? site.url : `${site.url}${route.path}`,
    lastModified: lastModified(route.file),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return pages;
}
