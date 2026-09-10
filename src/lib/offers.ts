export const PRICE_NOTE =
  "Alle Preise sind Endpreise. Es wird keine Umsatzsteuer gemäß § 19 UStG ausgewiesen.";

export const cta = {
  primary: "Kostenloses Erstgespräch anfragen",
  short: "Erstgespräch anfragen",
  submit: "Terminwunsch senden",
  href: "/termin",
  duration: "90 Minuten",
} as const;

export const whatsappDefaultMessage =
  "Guten Tag, ich möchte eine Website oder einen digitalen Ablauf für meinen Betrieb besprechen.";

export const websiteCare = [
  "Hosting in Deutschland und SSL",
  "Sicherheitsupdates",
  "Tägliche Backups",
  "Bis zu 3 Textänderungen pro Monat",
  "Störungsbehebung innerhalb von 24 Stunden an Werktagen",
] as const;

export const websiteOwnership =
  "Nach Zahlung der Erstellung gehört Ihnen die Website. Sie können die vereinbarten Dateien übernehmen und Hosting, Sicherheitsupdates und den laufenden Betrieb selbst tragen. Alternativ übernimmt BP Agentics Hosting und die vereinbarte Pflege gegen die monatliche Betreuung. Diese Betreuung ist optional. Wird sie gewählt, gilt eine Mindestlaufzeit von 12 Monaten und ist danach monatlich kündbar. Nutzungsrechte an fremden Medien oder Diensten werden im Angebot gesondert benannt.";

export const yearTableHint =
  "Die 12-Monats-Spalte bei Websites zeigt die einmalige Erstellung plus optionale Betreuung über 12 Monate. Bei „ab“-Preisen ist dies der Mindestbetrag. Beim Nachrichten-Assistenten gehören Einrichtung und monatliche Betreuung zusammen. Wo keine monatliche Betreuung ausgewiesen ist, entspricht die Vergleichsspalte dem einmaligen Endpreis. Zusätzliche Leistungen und vereinbarte Fremdkosten werden im Angebot ausgewiesen.";

export const offerFamilies = [
  {
    id: "websites",
    label: "Websites",
    shortLabel: "Websites",
    href: "/leistungen/auftritt",
    linkLabel: "Website-Pakete ansehen",
  },
  {
    id: "assistent",
    label: "Nachrichten-Assistent",
    shortLabel: "Assistent",
    href: "/leistungen/annahme",
    linkLabel: "Nachrichten-Assistent ansehen",
  },
  {
    id: "ablaeufe",
    label: "Büroabläufe",
    shortLabel: "Abläufe",
    href: "/leistungen/ablaeufe",
    linkLabel: "Büroabläufe ansehen",
  },
] as const;

export type OfferFamilyId = (typeof offerFamilies)[number]["id"];
export type OfferCare = "optional" | "required" | "none";
export type StructureKind = "sections" | "pages" | "steps" | "modules";

export type StructureNode = {
  id: string;
  label: string;
  hint?: string;
};

export type CatalogOffer = {
  id: "start" | "betrieb" | "signature" | "whatsapp" | "automation";
  family: OfferFamilyId;
  name: string;
  once: string;
  month: string;
  year: string;
  run: string;
  href: string;
  body: string;
  differences: readonly string[];
  care: OfferCare;
  inquiryLabel: string;
  structureTitle: string;
  structureCaption: string;
  structureKind: StructureKind;
  structure: readonly StructureNode[];
  badge?: string;
  structureLink?: { href: string; label: string; note: string };
};

export const catalogOffers: readonly CatalogOffer[] = [
  {
    id: "start",
    family: "websites",
    name: "Website Start",
    once: "690 €",
    month: "149 €",
    year: "2.478 €",
    run: "149 € monatlich, optional",
    href: "/leistungen/auftritt",
    body: "Ein kompakter Einseiter für einen klaren Überblick über Leistungen, Betrieb und Kontakt.",
    differences: [
      "Kompakter Einseiter",
      "Abschnitte zu Leistungen, Betrieb und Kontakt",
      "Weg zur Anfrage",
    ],
    care: "optional",
    inquiryLabel: "Website Start anfragen",
    structureTitle: "So ist Ihre Website aufgebaut.",
    structureCaption: "Eine Seite mit folgenden Abschnitten.",
    structureKind: "sections",
    structure: [
      { id: "leistungen", label: "Leistungen" },
      { id: "betrieb", label: "Betrieb" },
      { id: "kontakt", label: "Kontakt" },
    ],
  },
  {
    id: "betrieb",
    family: "websites",
    name: "Website Betrieb",
    once: "1.790 €",
    month: "149 €",
    year: "3.578 €",
    run: "149 € monatlich, optional",
    href: "/leistungen/auftritt",
    body: "Eine mehrseitige Website mit Raum für einzelne Leistungen und Referenzen.",
    differences: [
      "Mehrseitige Website",
      "Raum für einzelne Leistungen",
      "Raum für Referenzen",
    ],
    care: "optional",
    inquiryLabel: "Website Betrieb anfragen",
    badge: "Für mehrere Leistungen und Referenzen",
    structureTitle: "Beispielhafte Seitenstruktur",
    structureCaption: "Seiten Ihrer Website.",
    structureKind: "pages",
    structure: [
      { id: "leistungen", label: "Leistungen" },
      { id: "referenzen", label: "Referenzen" },
      {
        id: "anfrage",
        label: "Anfrage",
        hint: "Eine Anfrage gehört zu jeder Website.",
      },
    ],
  },
  {
    id: "signature",
    family: "websites",
    name: "Website Signature",
    once: "ab 3.490 €",
    month: "290 €",
    year: "ab 6.970 €",
    run: "290 € monatlich, optional",
    href: "/leistungen/auftritt",
    body: "Ein individuell gestalteter Auftritt mit besonderer Bild- und Bewegungsführung.",
    differences: [
      "Individuell gestalteter Auftritt",
      "Besondere Bild- und Bewegungsführung",
      "Umfang im Angebot",
    ],
    care: "optional",
    inquiryLabel: "Website Signature anfragen",
    structureTitle: "So kann ein individueller Auftritt aufgebaut sein.",
    structureCaption: "Beispielhafte Seitenstruktur. Der Umfang wird im Angebot festgehalten.",
    structureKind: "pages",
    structure: [
      { id: "leistungen", label: "Leistungen" },
      { id: "referenzen", label: "Referenzen" },
      {
        id: "anfrage",
        label: "Anfrage",
        hint: "Eine Anfrage gehört zu jeder Website.",
      },
    ],
    structureLink: {
      href: "/referenzen/dachdecker-signature",
      label: "Website-Demo ansehen",
      note: "Produktdemo · kein Echtbetrieb",
    },
  },
  {
    id: "whatsapp",
    family: "assistent",
    name: "Nachrichten-Assistent",
    once: "1.290 €",
    month: "99 €",
    year: "2.478 €",
    run: "99 € monatlich",
    href: "/leistungen/annahme",
    body: "Der KI-Assistent beantwortet Nachrichten per WhatsApp und E-Mail, fragt vereinbarte Angaben ab und bietet Termine aus dem angebundenen Kalender an.",
    differences: [
      "Antworten per WhatsApp und E-Mail",
      "Vereinbarte Angaben zum Vorhaben erfassen",
      "Termine nach festgelegten Kalenderregeln anbieten",
    ],
    care: "required",
    inquiryLabel: "Nachrichten-Assistent anfragen",
    structureTitle: "So läuft eine Anfrage ab.",
    structureCaption: "Textnachrichten per WhatsApp und E-Mail. Telefonanrufe gehören nicht dazu.",
    structureKind: "steps",
    structure: [
      { id: "nachricht", label: "Nachricht kommt an" },
      { id: "angaben", label: "Angaben werden erfasst" },
      { id: "termine", label: "Termine stehen bereit" },
      { id: "kalender", label: "Eintrag im Kalender" },
    ],
  },
  {
    id: "automation",
    family: "ablaeufe",
    name: "Datenbasis + 1 Prozessmodul",
    once: "ab 2.490 €",
    month: "—",
    year: "ab 2.490 €",
    run: "ohne monatliche Betreuung",
    href: "/leistungen/ablaeufe",
    body: "Der erste Ablauf wird auf die vorhandenen Programme und die tägliche Arbeit abgestimmt.",
    differences: [
      "Gemeinsame Datenbasis",
      "Ein vereinbartes Prozessmodul",
      "Weitere Abläufe bei Bedarf",
    ],
    care: "none",
    inquiryLabel: "Datenbasis und Modul anfragen",
    structureTitle: "So ist der Einstieg aufgebaut.",
    structureCaption: "Datenbasis und ein Prozessmodul. Das Modul wird im Gespräch festgelegt.",
    structureKind: "modules",
    structure: [
      { id: "datenbasis", label: "Gemeinsame Datenbasis" },
      {
        id: "modul",
        label: "Ein vereinbartes Prozessmodul",
        hint: "Zum Beispiel ein digitaler Lieferschein — nur als Beispiel, nicht fest enthalten.",
      },
    ],
  },
];

export type OfferId = (typeof catalogOffers)[number]["id"];

export function isOfferId(value: string): value is OfferId {
  return catalogOffers.some((offer) => offer.id === value);
}

export function getCatalogOffer(id: OfferId): CatalogOffer {
  const offer = catalogOffers.find((item) => item.id === id);
  if (!offer) {
    throw new Error(`Unbekanntes Angebot: ${id}`);
  }
  return offer;
}

export function offersInFamily(family: OfferFamilyId): CatalogOffer[] {
  return catalogOffers.filter((offer) => offer.family === family);
}

export function offerInquiryHref(id: OfferId, careChosen: boolean): string {
  const offer = getCatalogOffer(id);
  const betreuung =
    offer.care === "required" ? 1 : offer.care === "none" ? 0 : careChosen ? 1 : 0;
  return `/termin?paket=${id}&betreuung=${betreuung}`;
}

export function offerInquiryNote(paket: string, careChosen: boolean): string | null {
  if (!isOfferId(paket)) return null;
  const offer = getCatalogOffer(paket);
  if (offer.care === "required") {
    return `Interesse: ${offer.name}, ${offer.once} Einrichtung + ${offer.month} monatlich.`;
  }
  if (offer.care === "none") {
    return `Interesse: ${offer.name}, ${offer.once}, ${offer.run}.`;
  }
  if (careChosen) {
    return `Interesse: ${offer.name}, ${offer.once} einmalig. Monatliche Betreuung: ${offer.month} (optional, 12 Monate Mindestlaufzeit).`;
  }
  return `Interesse: ${offer.name}, ${offer.once} einmalig. Monatliche Betreuung: nicht gewählt.`;
}

export const offerTable = catalogOffers.map((offer) => ({
  id: offer.id,
  name: offer.name,
  once: offer.once,
  month: offer.month,
  year: offer.year,
  run: offer.run,
  href: offer.href,
  badge: offer.badge,
}));

export const websitePackages = catalogOffers
  .filter((offer) => offer.family === "websites")
  .map((offer) => ({
    name: offer.name,
    once: offer.once,
    month: offer.month,
    year: offer.year,
    run: offer.run,
    body: offer.body,
    featured: offer.id === "betrieb",
    badge: offer.badge,
  }));

const whatsapp = getCatalogOffer("whatsapp");
export const whatsappOffer = {
  name: whatsapp.name,
  once: whatsapp.once,
  month: whatsapp.month,
  year: whatsapp.year,
} as const;

const automation = getCatalogOffer("automation");
export const automationOffer = {
  combined: automation.once,
  month: automation.month,
  year: automation.year,
  run: automation.run,
} as const;
