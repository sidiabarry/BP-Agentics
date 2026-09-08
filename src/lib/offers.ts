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
  "Nach Zahlung der Erstellung gehört Ihnen die Website. Der Betreuungsvertrag hat eine Mindestlaufzeit von 12 Monaten und ist danach monatlich kündbar. Bei Kündigung erhalten Sie die vereinbarten Website-Dateien kostenfrei. Nutzungsrechte an fremden Medien oder Diensten werden im Angebot gesondert benannt.";

export const yearTableHint =
  "Die 12-Monats-Rechnung umfasst die einmalige Leistung und 12 monatliche Zahlungen zu den genannten Preisen. Bei „ab“-Preisen ist dies der Mindestbetrag. Zusätzliche Leistungen und vereinbarte Fremdkosten werden im Angebot ausgewiesen.";

export const offerTable = [
  {
    id: "start",
    name: "Website Start",
    once: "950 €",
    month: "149 €",
    year: "2.738 €",
    href: "/leistungen/auftritt",
  },
  {
    id: "betrieb",
    name: "Website Betrieb",
    once: "3.900 €",
    month: "149 €",
    year: "5.688 €",
    href: "/leistungen/auftritt",
    badge: "Für mehrere Leistungen und Referenzen",
  },
  {
    id: "signature",
    name: "Website Signature",
    once: "ab 7.900 €",
    month: "290 €",
    year: "ab 11.380 €",
    href: "/leistungen/auftritt",
  },
  {
    id: "whatsapp",
    name: "WhatsApp-Assistent",
    once: "1.900 €",
    month: "99 €",
    year: "3.088 €",
    href: "/leistungen/annahme",
  },
  {
    id: "automation",
    name: "Datenbasis + 1 Prozessmodul",
    once: "ab 3.800 €",
    month: "ab 190 €",
    year: "ab 6.080 €",
    href: "/leistungen/ablaeufe",
  },
] as const;

export const websitePackages = [
  {
    name: "Website Start",
    once: "950 €",
    month: "149 €",
    year: "2.738 €",
    body: "Ein kompakter Einseiter für einen klaren Überblick über Leistungen, Betrieb und Kontakt.",
    featured: false,
  },
  {
    name: "Website Betrieb",
    once: "3.900 €",
    month: "149 €",
    year: "5.688 €",
    body: "Eine mehrseitige Website mit Raum für einzelne Leistungen und Referenzen.",
    featured: true,
    badge: "Für mehrere Leistungen und Referenzen",
  },
  {
    name: "Website Signature",
    once: "ab 7.900 €",
    month: "290 €",
    year: "ab 11.380 €",
    body: "Ein individuell gestalteter Auftritt mit besonderer Bild- und Bewegungsführung.",
    featured: false,
  },
] as const;

export const whatsappOffer = {
  name: "WhatsApp-Assistent",
  once: "1.900 €",
  month: "99 €",
  year: "3.088 €",
} as const;

export const automationOffer = {
  basis: "2.900 €",
  module: "900–1.800 €",
  combined: "ab 3.800 €",
  month: "ab 190 €",
  year: "ab 6.080 €",
} as const;
