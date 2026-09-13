import { foerderung } from "@/lib/foerderung";
import { cta, offerFamilies, type OfferFamilyId } from "@/lib/offers";

/**
 * Eine Quelle für Akte, Labels und hrefs.
 * Sitemap, Navigation, Werkstatt und Stage-`related`/`next` lesen nur hier.
 */

export const paths = {
  home: "/",
  leistungen: "/leistungen",
  auftritt: "/leistungen/auftritt",
  annahme: "/leistungen/annahme",
  ablaeufe: "/leistungen/ablaeufe",
  passtDas: "/passt-das",
  gewerke: "/gewerke",
  ueberMich: "/ueber-mich",
  foerderung: "/foerderung/mid-digitale-prozesse",
  referenzen: "/referenzen",
  feinkost: "/referenzen/feinkost-kreta",
  dachdecker: "/referenzen/dachdecker-signature",
  werkstattAlias: "/werkstatt",
  preise: "/preise",
  kontakt: "/kontakt",
  termin: cta.href,
  impressum: "/impressum",
  datenschutz: "/datenschutz",
} as const;

export const anchors = {
  eintritt: "einstieg",
  werkstatt: "werkstatt",
  beweis: "beweis",
  person: "person",
  entscheidung: "entscheidung",
  referenzen: "referenzen",
  preise: "preise",
  problem: "problem",
  start: "start",
} as const;

export const chapter = {
  eintritt: `${paths.home}#${anchors.eintritt}`,
  werkstatt: `${paths.home}#${anchors.werkstatt}`,
  beweis: `${paths.home}#${anchors.beweis}`,
  person: `${paths.home}#${anchors.person}`,
  entscheidung: `${paths.home}#${anchors.entscheidung}`,
  referenzen: `${paths.home}#${anchors.referenzen}`,
  preise: `${paths.home}#${anchors.preise}`,
} as const;

export const labels = {
  home: "Startseite",
  leistungen: "Leistungen",
  leistungenOverview: "Leistungen im Überblick",
  auftritt: "Websites",
  annahme: "Nachrichten-Assistent",
  ablaeufe: "Büroabläufe",
  passtDas: "Welcher Einstieg passt?",
  passtDasShort: "Welcher Einstieg",
  gewerke: "Alle Gewerke",
  ueberMich: "Über mich",
  foerderung: "Förderung",
  foerderungMid: "MID-Digitale Prozesse",
  referenzen: "Arbeiten und Demos",
  feinkost: "Projekt Feinkost Kreta",
  dachdecker: "Website-Demo ansehen",
  werkstatt: "Die Werkstatt",
  werkstattNav: "Die Werkstatt",
  preise: "Preise",
  kontakt: "Kontakt",
  impressum: "Impressum",
  datenschutz: "Datenschutz",
  weiterArbeiten: "Weiter zu den Arbeiten",
  zurWerkstatt: "Zur Werkstatt",
  leistungenAnsehen: "Leistungen ansehen",
  preisAnsehen: "Preis ansehen",
  foerderungPruefen: "Förderung prüfen",
  kontaktSeite: "Zur Kontaktseite",
  kontaktBp: "Kontakt zu BP Agentics",
  orientierung: "Erst Orientierung holen",
} as const;

function family(id: OfferFamilyId) {
  const item = offerFamilies.find((entry) => entry.id === id);
  if (!item) {
    throw new Error(`Unbekannte Angebotslinie: ${id}`);
  }
  return item;
}

const websites = family("websites");
const assistent = family("assistent");
const ablaeufe = family("ablaeufe");

export type StationId = "web" | "chat" | "office";

export const stations = [
  {
    id: "web" as const satisfies StationId,
    num: "01",
    familyId: websites.id,
    href: websites.href,
    button: websites.linkLabel,
    label: websites.label,
    shortLabel: websites.shortLabel,
  },
  {
    id: "chat" as const satisfies StationId,
    num: "02",
    familyId: assistent.id,
    href: assistent.href,
    button: assistent.linkLabel,
    label: assistent.label,
    shortLabel: assistent.shortLabel,
  },
  {
    id: "office" as const satisfies StationId,
    num: "03",
    familyId: ablaeufe.id,
    href: ablaeufe.href,
    button: ablaeufe.linkLabel,
    label: ablaeufe.label,
    shortLabel: ablaeufe.shortLabel,
  },
] as const;

export const stationOrder = stations.map((station) => station.id);

export function stationById(id: StationId) {
  const station = stations.find((item) => item.id === id);
  if (!station) {
    throw new Error(`Unbekannte Station: ${id}`);
  }
  return station;
}

export function nextStationId(id: StationId): StationId | null {
  const index = stationOrder.indexOf(id);
  return index >= 0 && index < stationOrder.length - 1 ? stationOrder[index + 1] : null;
}

export const acts = [
  {
    id: "eintritt",
    roman: "I",
    label: "Eintritt",
    href: chapter.eintritt,
    hash: anchors.eintritt,
  },
  {
    id: "werkstatt",
    roman: "II",
    label: "Werkstatt",
    href: chapter.werkstatt,
    hash: anchors.werkstatt,
  },
  {
    id: "beweis",
    roman: "III",
    label: "Beweis",
    href: chapter.beweis,
    hash: anchors.beweis,
  },
  {
    id: "person",
    roman: "IV",
    label: "Person",
    href: chapter.person,
    hash: anchors.person,
  },
  {
    id: "entscheidung",
    roman: "V",
    label: "Entscheidung",
    href: chapter.entscheidung,
    hash: anchors.entscheidung,
  },
] as const;

export type ActId = (typeof acts)[number]["id"];

export const werkstattCopy = {
  eyebrow: "Die digitale Werkstatt",
  titleLead: "Gute Arbeit.",
  titleAccent: "Starke Systeme.",
  lead: "Drei Bausteine, die zusammenarbeiten. Jeder einzeln beauftragbar.",
  tour: "Rundgang starten",
  marker: "Drei Bausteine. Ihr nächster Schritt.",
  caption: "Eine Station öffnen. Danach die Leistungsseite.",
  overview: "Zur Übersicht",
  overviewIndex: "Übersicht / 00",
  note: "Mit Sorgfalt verbunden.",
  reduceOn: "Bewegung reduziert",
  reduceOff: "Bewegung reduzieren",
  fallback: "Die Werkstatt ist auf diesem Gerät als Übersicht verfügbar.",
} as const;

export const werkstattExit = {
  kicker: "Ausgang",
  title: "Das steht nicht nur hier.",
  body: "Die Werkstatt zeigt die drei Bausteine. Arbeiten, Ablauf und Gespräch liegen auf den nächsten Seiten — mit Preisen, Grenzen und Anfrage.",
  continue: { href: chapter.beweis, label: labels.weiterArbeiten },
  talk: { href: cta.href, label: cta.short },
  links: [
    { href: chapter.beweis, label: labels.weiterArbeiten },
    { href: paths.ueberMich, label: labels.ueberMich },
    { href: paths.passtDas, label: labels.passtDasShort },
    { href: cta.href, label: cta.short },
  ],
} as const;

export const entscheidungLinks = [
  { href: paths.preise, label: labels.preise },
  { href: paths.foerderung, label: labels.foerderung },
  { href: paths.kontakt, label: labels.kontakt },
  { href: cta.href, label: cta.short },
] as const;

export const personLinks = [
  { href: paths.ueberMich, label: labels.ueberMich },
  { href: paths.passtDas, label: labels.passtDas },
] as const;

export const werkstattPage = {
  title: "Die Werkstatt — die drei Leistungen",
  description:
    "Die drei Leistungen als Werkstatt: Website, Nachrichten-Assistent und Büroabläufe. Jede Station führt zur passenden Leistungsseite. Danach Beweis, Person und Gespräch.",
} as const;

export const sitemapPaths = [
  paths.home,
  paths.leistungen,
  paths.auftritt,
  paths.annahme,
  paths.ablaeufe,
  paths.passtDas,
  paths.gewerke,
  paths.ueberMich,
  paths.foerderung,
  paths.referenzen,
  paths.feinkost,
  paths.dachdecker,
  paths.werkstattAlias,
  paths.preise,
  paths.kontakt,
  paths.termin,
  paths.impressum,
  paths.datenschutz,
] as const;

export function gewerkHref(slug: string) {
  return `${paths.gewerke}#${slug}`;
}

export type ThreadLink = { href: string; label: string };

export type StageThread = {
  related: ThreadLink[];
  next: {
    kicker?: string;
    title: string;
    body: string;
    chips?: readonly string[];
    primary?: ThreadLink;
    secondary?: ThreadLink;
  } | null;
};

const stationWeb = stationById("web");
const stationChat = stationById("chat");
const stationOffice = stationById("office");

const threads: Record<string, StageThread> = {
  [paths.leistungen]: {
    related: [
      { href: stationWeb.href, label: stationWeb.button },
      { href: stationChat.href, label: stationChat.button },
      { href: stationOffice.href, label: stationOffice.button },
      { href: paths.preise, label: labels.preise },
      { href: paths.referenzen, label: labels.referenzen },
      { href: chapter.werkstatt, label: labels.zurWerkstatt },
    ],
    next: {
      title: "Welcher Baustein zuerst?",
      body: "90 Minuten vor Ort in Nordrhein-Westfalen. Sie senden einen Terminwunsch. Den Termin bestätigen wir persönlich.",
      chips: ["90 Minuten im Betrieb", "Kostenloses Erstgespräch", "Persönlich bestätigt"],
      primary: { href: cta.href, label: cta.primary },
      secondary: { href: paths.passtDas, label: labels.orientierung },
    },
  },
  [paths.auftritt]: {
    related: [
      { href: stationChat.href, label: stationChat.button },
      { href: stationOffice.href, label: stationOffice.button },
      { href: paths.dachdecker, label: labels.dachdecker },
      { href: paths.preise, label: labels.preise },
      { href: chapter.werkstatt, label: labels.zurWerkstatt },
    ],
    next: {
      title: "Website-Projekt besprechen",
      body: "Welche Stufe passt, hängt von Leistungen, vorhandenen Inhalten und dem gewünschten Umfang ab. 90 Minuten vor Ort. Den Wunschtermin bestätigen wir persönlich.",
      chips: ["Start, Betrieb oder Signature", "Betreuung optional", "Umfang im Angebot"],
      primary: { href: cta.href, label: "Website-Projekt besprechen" },
      secondary: { href: stationChat.href, label: stationChat.button },
    },
  },
  [paths.annahme]: {
    related: [
      { href: stationWeb.href, label: stationWeb.button },
      { href: stationOffice.href, label: stationOffice.button },
      { href: paths.preise, label: labels.preise },
      { href: chapter.werkstatt, label: labels.zurWerkstatt },
    ],
    next: {
      title: "Nachrichten-Assistent besprechen",
      body: "Sinnvoll, wenn Kunden per WhatsApp oder E-Mail anfragen und wiederkehrende Fragen oder Terminabstimmungen anfallen. 90 Minuten vor Ort.",
      chips: ["WhatsApp und E-Mail", "Kalenderregeln", "Mensch übernimmt bei Bedarf"],
      primary: { href: cta.href, label: "Nachrichten-Assistent besprechen" },
      secondary: { href: stationOffice.href, label: stationOffice.button },
    },
  },
  [paths.ablaeufe]: {
    related: [
      { href: stationWeb.href, label: stationWeb.button },
      { href: stationChat.href, label: stationChat.button },
      { href: paths.feinkost, label: labels.feinkost },
      { href: paths.preise, label: labels.preise },
      { href: chapter.werkstatt, label: labels.zurWerkstatt },
    ],
    next: {
      title: "Ersten Ablauf besprechen",
      body: "Im Gespräch prüfen wir, welche Programme schon zuverlässig arbeiten und welcher Schritt den passenden Anfang macht. 90 Minuten vor Ort.",
      chips: ["Datenbasis + 1 Modul", "Ohne monatliche Betreuung", "Weitere Abläufe im Angebot"],
      primary: { href: cta.href, label: "Ersten Ablauf besprechen" },
      secondary: { href: chapter.beweis, label: labels.weiterArbeiten },
    },
  },
  [paths.passtDas]: {
    related: [
      { href: paths.leistungen, label: labels.leistungen },
      { href: paths.preise, label: labels.preise },
      { href: paths.ueberMich, label: labels.ueberMich },
      { href: cta.href, label: cta.short },
    ],
    next: {
      title: "Die Richtung im Gespräch prüfen",
      body: "Die passende Leistung richtet sich nach Ihrem Vorhaben, nicht nach der Teamgröße. Den verbindlichen Umfang halten wir im Angebot fest.",
      chips: ["Eine Angabe reicht", "Keine Prüfung der Wirtschaftlichkeit", "90 Minuten vor Ort"],
      primary: { href: cta.href, label: cta.primary },
      secondary: { href: paths.leistungen, label: labels.leistungenAnsehen },
    },
  },
  [paths.ueberMich]: {
    related: [
      { href: paths.passtDas, label: labels.passtDas },
      { href: paths.leistungen, label: labels.leistungen },
      { href: paths.referenzen, label: labels.referenzen },
      { href: paths.kontakt, label: labels.kontakt },
    ],
    next: {
      title: "Direkt mit mir sprechen",
      body: "Im Erstgespräch lernen wir das Vorhaben kennen. Danach erhalten Sie ein Angebot mit nachvollziehbarem Umfang und Preis.",
      chips: ["90 Minuten vor Ort", "Ein Ansprechpartner", "Sitz Hagen"],
      primary: { href: cta.href, label: cta.primary },
      secondary: { href: paths.kontakt, label: "Kontakt aufnehmen" },
    },
  },
  [paths.preise]: {
    related: [
      { href: stationWeb.href, label: stationWeb.button },
      { href: stationChat.href, label: stationChat.button },
      { href: stationOffice.href, label: stationOffice.button },
      { href: paths.foerderung, label: labels.foerderungMid },
    ],
    next: {
      title: "Umfang und Preis im Gespräch festlegen",
      body: "Vor der Beauftragung erhalten Sie ein Angebot mit Leistungsumfang, einmaligem Preis und laufenden Kosten. Zusätzliche Wünsche werden vor der Umsetzung gesondert angeboten.",
      chips: ["Festpreis im Angebot", "Keine versteckte Pauschale", "90 Minuten vor Ort"],
      primary: { href: cta.href, label: cta.primary },
      secondary: { href: paths.foerderung, label: labels.foerderungPruefen },
    },
  },
  [paths.referenzen]: {
    related: [
      { href: paths.feinkost, label: labels.feinkost },
      { href: paths.dachdecker, label: labels.dachdecker },
      { href: chapter.werkstatt, label: labels.zurWerkstatt },
      { href: paths.leistungen, label: labels.leistungen },
      { href: paths.kontakt, label: labels.kontakt },
    ],
    next: {
      title: "Ähnlichen Weg für Ihren Betrieb prüfen",
      body: "Im Gespräch klären wir, welcher Ansatz zu Ihrem Vorhaben passt.",
      chips: ["Ein Projekt, eine Demo", "90 Minuten vor Ort"],
      primary: { href: cta.href, label: cta.primary },
      secondary: { href: paths.ueberMich, label: labels.ueberMich },
    },
  },
  [paths.feinkost]: {
    related: [
      { href: stationOffice.href, label: stationOffice.button },
      { href: paths.dachdecker, label: labels.dachdecker },
      { href: stationChat.href, label: stationChat.button },
    ],
    next: {
      title: "Ähnlichen Bestellweg besprechen",
      body: "Im Gespräch klären wir, ob ein vergleichbarer Weg zu Ihrem Betrieb passt — welche Angaben bleiben sollen und wer die Bestellung sieht.",
      primary: { href: cta.href, label: "Ähnlichen Bestellweg besprechen" },
      secondary: { href: stationOffice.href, label: stationOffice.button },
    },
  },
  [paths.dachdecker]: {
    related: [
      { href: stationWeb.href, label: stationWeb.button },
      { href: gewerkHref("dachdecker"), label: "Anwendungsbeispiel Dachdecker" },
      { href: paths.feinkost, label: labels.feinkost },
      { href: paths.preise, label: labels.preise },
    ],
    next: {
      title: "Website-Projekt besprechen",
      body: "Ob ein solcher Umfang sinnvoll ist, wird am konkreten Vorhaben entschieden. 90 Minuten vor Ort. Den Wunschtermin bestätigen wir persönlich.",
      primary: { href: cta.href, label: "Website-Projekt besprechen" },
      secondary: { href: stationWeb.href, label: stationWeb.button },
    },
  },
  [paths.foerderung]: {
    related: [
      { href: stationOffice.href, label: stationOffice.button },
      { href: paths.leistungen, label: labels.leistungen },
      { href: paths.preise, label: labels.preise },
      { href: paths.kontakt, label: labels.kontakt },
    ],
    next: {
      title: "Ob eine Prozessberatung passt, klären wir sachlich.",
      body: "Diese kurze Fassung enthält keine vollständige Förderberatung. Die Bewilligungsstelle entscheidet über einen Antrag.",
      chips: ["Keine pauschale 50-Prozent-Rechnung", "Vor Beauftragung klären", "Offizielle Quellen zuerst"],
      primary: { href: paths.kontakt, label: labels.kontaktBp },
      secondary: { href: foerderung.nrwBankUrl, label: "NRW.BANK-Aufruf" },
    },
  },
  [paths.kontakt]: {
    related: [
      { href: cta.href, label: cta.primary },
      { href: paths.leistungen, label: labels.leistungen },
      { href: paths.preise, label: labels.preise },
      { href: paths.impressum, label: labels.impressum },
    ],
    next: null,
  },
  [paths.termin]: {
    related: [
      { href: paths.kontakt, label: labels.kontaktSeite },
      { href: paths.leistungen, label: labels.leistungen },
      { href: paths.preise, label: labels.preise },
    ],
    next: null,
  },
};

export function stageThread(path: string): StageThread {
  const thread = threads[path];
  if (!thread) {
    throw new Error(`Kein Faden für ${path}`);
  }
  return thread;
}
