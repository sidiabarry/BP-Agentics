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
  title: string;
  text: string;
  button: string;
  href: string;
};

export const stations: Record<StationId, StationContent> = {
  web: {
    num: "01",
    name: "WEBSITES",
    label: "Websites",
    title: "Leistungen zeigen.<br><span>Anfrage möglich machen.</span>",
    text: "Eine Website, die Ihre Leistungen zeigt und den Weg zur Anfrage einfach macht. Vom Einseiter ab 690 € bis zur individuell gestalteten Website Signature ab 3.490 €.",
    button: "Websites entdecken",
    href: "/leistungen/auftritt",
  },
  chat: {
    num: "02",
    name: "NACHRICHTEN-ASSISTENT",
    label: "Nachrichten-Assistent",
    title: "Die Angaben liegen vor,<br><span>bevor Sie zurückrufen.</span>",
    text: "Der KI-Assistent beantwortet WhatsApp- und E-Mail-Anfragen, fragt die nötigen Angaben ab und bietet passende Termine aus Ihrem Kalender an. Textnachrichten, kein Telefon.",
    button: "Assistent entdecken",
    href: "/leistungen/annahme",
  },
  office: {
    num: "03",
    name: "BÜROABLÄUFE",
    label: "Büroabläufe",
    title: "Einmal erfassen.<br><span>Im Büro weitergeben.</span>",
    text: "Lieferscheine und Kundenangaben einmal erfassen und automatisch weitergeben — ohne Doppelerfassung im Büro. Ein Modul, kein Komplettsystem.",
    button: "Büroabläufe entdecken",
    href: "/leistungen/ablaeufe",
  },
};

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
