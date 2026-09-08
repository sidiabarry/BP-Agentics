export const site = {
  name: "BP Agentics",
  legalName: "BP Agentics",
  url: "https://bp-agentics.de",
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
    "Software für Betriebe",
    "Nachrichten-Assistent für WhatsApp und E-Mail",
    "Prozessautomatisierung",
    "MID Digitale Prozesse",
    "Next.js",
    "n8n",
  ],
  defaultTitle:
    "BP Agentics — Websites und Software für Betriebe in NRW",
  defaultDescription:
    "BP Agentics entwickelt Websites und Software: Auftritt, Nachrichten-Assistent und Büroabläufe. Für Betriebe in NRW. Sidia Jerome Barry, Hagen.",
} as const;

export const napLine = `${site.streetAddress}, ${site.postalCode} ${site.addressLocality} · ${site.phoneDisplay}`;

export const napShort = `${site.streetAddress}, ${site.postalCode} ${site.addressLocality}`;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalized === "/" ? "/" : normalized}`;
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
