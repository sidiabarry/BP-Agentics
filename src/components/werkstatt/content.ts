/**
 * Stationsinhalte der Werkstatt.
 *
 * Titel/Preise/Beispiele sind bewusst wörtlich bzw. eng an den echten
 * Leistungsseiten orientiert (`/leistungen/auftritt`, `/leistungen/annahme`,
 * `/leistungen/ablaeufe`), damit die 3D-Darstellung nichts verspricht, was die
 * eigentlichen Seiten nicht auch sagen.
 */

export type StationId = "web" | "chat" | "office";

export type StationContent = {
  num: string;
  name: string;
  label: string;
  /** Eine Zeile Nutzen — steht auf dem Schild in der Szene. */
  promise: string;
  title: string;
  text: string;
  /** Was hier konkret passiert, in der Reihenfolge der echten Leistungsseite. */
  steps: string[];
  /** Was diese Leistung bewusst nicht ist — schafft Vertrauen statt Überversprechen. */
  limit: string;
  price: string;
  button: string;
  href: string;
};

export const stations: Record<StationId, StationContent> = {
  web: {
    num: "01",
    name: "WEBSITES",
    label: "Websites",
    promise: "Damit Interessenten sehen, was Sie können",
    title: "Leistungen zeigen.<br><span>Anfrage möglich machen.</span>",
    text: "Eine Website, die Ihre Leistungen zeigt und den Weg zur Anfrage einfach macht — zugeschnitten auf Ihr Gewerk und Ihr Einsatzgebiet.",
    steps: ["Leistungen und Referenzen zeigen", "Einsatzgebiet klarmachen", "Ein klarer Weg zur Anfrage"],
    limit: "Betreuung ist optional. Die Website gehört Ihnen.",
    price: "Einseiter ab 690 € · Website Signature ab 3.490 €",
    button: "Websites entdecken",
    href: "/leistungen/auftritt",
  },
  chat: {
    num: "02",
    name: "NACHRICHTEN-ASSISTENT",
    label: "Nachrichten-Assistent",
    promise: "Damit aus einer Anfrage ein Termin wird",
    title: "Die Angaben liegen vor,<br><span>bevor Sie zurückrufen.</span>",
    text: "Der KI-Assistent beantwortet WhatsApp- und E-Mail-Anfragen, fragt die nötigen Angaben ab und bietet passende Termine aus Ihrem Kalender an.",
    steps: ["Nachricht kommt an", "Angaben werden erfasst", "Termine stehen bereit", "Eintrag im Kalender"],
    limit: "Textnachrichten, kein Telefon.",
    price: "Einrichtung 1.290 € · Betreuung 99 €/Monat",
    button: "Assistent entdecken",
    href: "/leistungen/annahme",
  },
  office: {
    num: "03",
    name: "BÜROABLÄUFE",
    label: "Büroabläufe",
    promise: "Damit Papier nicht zweimal getippt wird",
    title: "Einmal erfassen.<br><span>Im Büro weitergeben.</span>",
    text: "Lieferscheine und Kundenangaben einmal erfassen und automatisch weitergeben — ohne Doppelerfassung im Büro.",
    steps: ["Unterlagen erfassen", "Informationen zuordnen", "Ans Büro weitergeben"],
    limit: "Ein Modul, kein Komplettsystem.",
    price: "Datenbasis + 1 Prozessmodul ab 2.490 €",
    button: "Büroabläufe entdecken",
    href: "/leistungen/ablaeufe",
  },
};

/** Reihenfolge für den geführten Rundgang: 01 → 02 → 03 → Erstgespräch. */
export function nextStation(id: StationId): StationId | null {
  const i = stationOrder.indexOf(id);
  return i >= 0 && i < stationOrder.length - 1 ? stationOrder[i + 1] : null;
}

export const stationOrder: StationId[] = ["web", "chat", "office"];

/** Reale 4-Schritt-Formulierung von /leistungen/annahme — für die Tablet-Chat-Demo. */
export const chatPhaseCaptions = [
  "01  Nachricht kommt an",
  "02  Angaben werden erfasst",
  "03  Termine stehen bereit",
  "04  Eintrag im Kalender",
] as const;

/** Gleiches Beispiel wie auf /leistungen/ablaeufe, für Konsistenz über die Seiten hinweg. */
export const officeExample = {
  reference: "LS-1042 · Hagen-Haspe · Garagendach",
  label: "Beispiel · kein Echtbetrieb",
};

/** Gleiche Kennzeichnung wie auf /leistungen/auftritt bzw. /referenzen/dachdecker-signature. */
export const webDemo = {
  domain: "meisterbetrieb-mueller.de",
  caption: "Website Signature",
  note: "Dachdecker-Demo · Produktdemo, kein Echtbetrieb",
};
