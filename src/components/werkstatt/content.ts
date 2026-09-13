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

/** Gleiche Kennzeichnung wie auf /leistungen/auftritt bzw. /referenzen/dachdecker-signature. */
export const webDemo = {
  domain: "meisterbetrieb-mueller.de",
  caption: "Website Signature",
  note: "Dachdecker-Demo",
};

export type ChatExample = {
  sector: string;
  business: string;
  initial: string;
  incoming: string[];
  question: string[];
  answer: string[];
  captured: string;
  offer: string[];
  accept: string[];
  appointment: { day: string; time: string; title: string; subtitle: string; note: string };
};

/**
 * Der Ablauf ist immer derselbe — nur die Branche wechselt. Die Werkstatt zeigt
 * die Beispiele nacheinander, damit nicht der Eindruck entsteht, das Angebot
 * richte sich nur an Handwerksbetriebe. Alle Verläufe sind als Beispiel
 * gekennzeichnet, keiner bildet einen echten Kunden ab.
 */
export const chatExamples: ChatExample[] = [
  {
    sector: "Bau und Ausbau",
    business: "Müller Bedachungen",
    initial: "M",
    incoming: ["Unser Garagendach ist undicht.", "Können wir einen Termin machen?"],
    question: ["Wo ist das Dach und", "wie groß ist die Fläche?"],
    answer: ["In Hagen-Haspe.", "Ungefähr 30 m²."],
    captured: "Ort und Anliegen erfasst",
    offer: ["Donnerstag um 9:00 Uhr ist frei.", "Passt Ihnen der Termin?"],
    accept: ["Ja, das passt. Vielen Dank!"],
    appointment: {
      day: "DO",
      time: "09:00",
      title: "Termin bestätigt",
      subtitle: "Besichtigung",
      note: "Hagen-Haspe · Garagendach",
    },
  },
  {
    sector: "Logistik und Transport",
    business: "Kortmann Spedition",
    initial: "K",
    incoming: ["Wir brauchen regelmäßige Abholungen", "zwischen Hagen und Dortmund."],
    question: ["Wie oft pro Woche und", "welches Volumen ungefähr?"],
    answer: ["Dreimal pro Woche,", "etwa vier Paletten."],
    captured: "Strecke und Volumen erfasst",
    offer: ["Dienstag um 14:30 Uhr ist frei.", "Passt Ihnen der Termin?"],
    accept: ["Ja, sehr gut. Danke!"],
    appointment: {
      day: "DI",
      time: "14:30",
      title: "Termin bestätigt",
      subtitle: "Erstgespräch",
      note: "Hagen–Dortmund · 3× pro Woche",
    },
  },
  {
    sector: "Agentur und Büro",
    business: "Nordlicht Marketing",
    initial: "N",
    incoming: ["Unsere Anfragen laufen über drei Postfächer.", "Wir verlieren den Überblick."],
    question: ["Wie viele Anfragen sind das", "ungefähr pro Woche?"],
    answer: ["Um die 40.", "Vieles doppelt erfasst."],
    captured: "Aufkommen und Kanäle erfasst",
    offer: ["Mittwoch um 11:00 Uhr ist frei.", "Passt Ihnen der Termin?"],
    accept: ["Ja, gerne. Danke!"],
    appointment: {
      day: "MI",
      time: "11:00",
      title: "Termin bestätigt",
      subtitle: "Erstgespräch",
      note: "40 Anfragen · drei Postfächer",
    },
  },
];
