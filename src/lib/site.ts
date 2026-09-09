export const site = {
  name: "BP Agentics",
  legalName: "BP Agentics",
  url: "https://bpagentics.com",
  locale: "de_DE",
  language: "de",
  email: "sidiabarry@bpagentics.com",
  phoneDisplay: "+49 162 2843869",
  phoneE164: "+491622843869",
  phoneTel: "+491622843869",
  whatsappUrl: "https://wa.me/491622843869",
  streetAddress: "Kleiststraße 9",
  postalCode: "58095",
  addressLocality: "Hagen",
  addressRegion: "Nordrhein-Westfalen",
  addressCountry: "DE",
  geo: {
    latitude: 51.3595,
    longitude: 7.4638,
  },
  founder: {
    name: "Sidia Jerome Barry",
    jobTitle: "Inhaber",
  },
  areaServed: [
    "Nordrhein-Westfalen",
    "Hagen",
    "Iserlohn",
    "Lüdenscheid",
    "Witten",
    "Schwelm",
    "Ennepe-Ruhr-Kreis",
    "Märkischer Kreis",
  ],
  knowsAbout: [
    "Website-Erstellung",
    "Online-Marketing für Handwerk",
    "Software für Betriebe",
    "Nachrichten-Assistent für WhatsApp und E-Mail",
    "Prozessautomatisierung",
    "MID Digitale Prozesse",
  ],
  sameAs: [
    "https://www.google.com/maps/place/BP+Agentics/@51.4270929,7.6639832,17z/data=!4m6!3m5!1s0x6dbc85bee7fac5bf:0x92c2399e5d22d54f!8m2!3d51.4270929!4d7.6639832!16s%2Fg%2F11zxhxcgv_",
  ] as readonly string[],
  defaultTitle:
    "BP Agentics | Websites & Online-Marketing für Handwerk – Hagen / NRW",
  defaultDescription:
    "BP Agentics ist die Agentur von Sidia Jerome Barry in Hagen. Website-Erstellung, Online-Marketing und digitale Abläufe für Handwerk und Betriebe in NRW.",
} as const;

export const napLine = `${site.streetAddress}, ${site.postalCode} ${site.addressLocality} · ${site.phoneDisplay}`;

export const napShort = `${site.streetAddress}, ${site.postalCode} ${site.addressLocality}`;

/**
 * Live deployment origin — used for metadataBase and media URLs that must be
 * fetchable right now (OG images, JSON-LD logos).  Prefers the explicit
 * NEXT_PUBLIC_SITE_URL env var, then Vercel's auto-injected host vars, then
 * falls back to site.url (the canonical domain).
 */
export function getDeploymentUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelHost) {
    const host = vercelHost.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }
  return site.url;
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalized === "/" ? "/" : normalized}`;
}

/** Like absoluteUrl but resolves against the live deployment host. */
export function deploymentAbsoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const base = getDeploymentUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized === "/" ? "/" : normalized}`;
}

export const mailToTermin = (params: {
  name: string;
  phone: string;
  company: string;
  date: string;
  time: string;
  note?: string;
}) => {
  const subject = encodeURIComponent(
    `Erstgespräch: ${params.company || params.name}`,
  );
  const body = encodeURIComponent(
    [
      "Anfrage für das 90-Minuten-Erstgespräch vor Ort.",
      "",
      `Name: ${params.name}`,
      `Telefon: ${params.phone}`,
      `Betrieb: ${params.company}`,
      `Wunschtermin: ${params.date} um ${params.time} Uhr`,
      params.note ? `Notiz: ${params.note}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
};
