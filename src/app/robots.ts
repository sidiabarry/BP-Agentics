import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const allowAll = {
  allow: "/",
} as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...allowAll },
      { userAgent: "GPTBot", ...allowAll },
      { userAgent: "OAI-SearchBot", ...allowAll },
      { userAgent: "ClaudeBot", ...allowAll },
      { userAgent: "PerplexityBot", ...allowAll },
      { userAgent: "Google-Extended", ...allowAll },
      { userAgent: "Applebot-Extended", ...allowAll },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: "bpagentics.com",
  };
}
