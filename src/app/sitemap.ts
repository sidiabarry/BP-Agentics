import type { MetadataRoute } from "next";
import { foerderung } from "@/lib/foerderung";
import { paths, sitemapPaths } from "@/lib/journey";
import { site } from "@/lib/site";

const contentUpdated = new Date("2026-09-08");
const foerderungUpdated = new Date(foerderung.reviewed);

const meta: Record<
  string,
  {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }
> = {
  [paths.home]: { changeFrequency: "weekly", priority: 1 },
  [paths.leistungen]: { changeFrequency: "monthly", priority: 0.9 },
  [paths.auftritt]: { changeFrequency: "monthly", priority: 0.9 },
  [paths.annahme]: { changeFrequency: "monthly", priority: 0.9 },
  [paths.ablaeufe]: { changeFrequency: "monthly", priority: 0.9 },
  [paths.passtDas]: { changeFrequency: "monthly", priority: 0.8 },
  [paths.gewerke]: { changeFrequency: "monthly", priority: 0.8 },
  [paths.ueberMich]: { changeFrequency: "monthly", priority: 0.7 },
  [paths.foerderung]: { changeFrequency: "weekly", priority: 0.8 },
  [paths.referenzen]: { changeFrequency: "monthly", priority: 0.8 },
  [paths.feinkost]: { changeFrequency: "monthly", priority: 0.8 },
  [paths.dachdecker]: { changeFrequency: "monthly", priority: 0.8 },
  [paths.werkstattAlias]: { changeFrequency: "monthly", priority: 0.7 },
  [paths.preise]: { changeFrequency: "monthly", priority: 0.9 },
  [paths.kontakt]: { changeFrequency: "monthly", priority: 0.8 },
  [paths.termin]: { changeFrequency: "monthly", priority: 0.7 },
  [paths.impressum]: { changeFrequency: "yearly", priority: 0.2 },
  [paths.datenschutz]: { changeFrequency: "yearly", priority: 0.2 },
};

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPaths.map((path) => {
    const item = meta[path] ?? { changeFrequency: "monthly" as const, priority: 0.5 };
    return {
      url: path === paths.home ? site.url : `${site.url}${path}`,
      lastModified: path === paths.foerderung ? foerderungUpdated : contentUpdated,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    };
  });
}
