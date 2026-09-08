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

export const offerTable = [
  {
    id: "start",
    name: "Website Start",
    once: "690 €",
    month: "149 €",
    year: "2.478 €",
    run: "149 € monatlich, optional",
    href: "/leistungen/auftritt",
  },
  {
    id: "betrieb",
    name: "Website Betrieb",
    once: "1.790 €",
    month: "149 €",
    year: "3.578 €",
    run: "149 € monatlich, optional",
    href: "/leistungen/auftritt",
    badge: "Für mehrere Leistungen und Referenzen",
  },
  {
    id: "signature",
    name: "Website Signature",
    once: "ab 3.490 €",
    month: "290 €",
    year: "ab 6.970 €",
    run: "290 € monatlich, optional",
    href: "/leistungen/auftritt",
  },
  {
    id: "whatsapp",
    name: "Nachrichten-Assistent",
    once: "1.290 €",
    month: "99 €",
    year: "2.478 €",
    run: "99 € monatlich",
    href: "/leistungen/annahme",
  },
  {
    id: "automation",
    name: "Datenbasis + 1 Prozessmodul",
    once: "ab 2.490 €",
    month: "—",
    year: "ab 2.490 €",
    run: "ohne monatliche Betreuung",
    href: "/leistungen/ablaeufe",
  },
] as const;

export const websitePackages = [
  {
    name: "Website Start",
    once: "690 €",
    month: "149 €",
    year: "2.478 €",
    run: "149 € monatlich, optional",
    body: "Ein kompakter Einseiter für einen klaren Überblick über Leistungen, Betrieb und Kontakt.",
    featured: false,
  },
  {
    name: "Website Betrieb",
    once: "1.790 €",
    month: "149 €",
    year: "3.578 €",
    run: "149 € monatlich, optional",
    body: "Eine mehrseitige Website mit Raum für einzelne Leistungen und Referenzen.",
    featured: true,
    badge: "Für mehrere Leistungen und Referenzen",
  },
  {
    name: "Website Signature",
    once: "ab 3.490 €",
    month: "290 €",
    year: "ab 6.970 €",
    run: "290 € monatlich, optional",
    body: "Ein individuell gestalteter Auftritt mit besonderer Bild- und Bewegungsführung.",
    featured: false,
  },
] as const;

export const whatsappOffer = {
  name: "Nachrichten-Assistent",
  once: "1.290 €",
  month: "99 €",
  year: "2.478 €",
} as const;

export const automationOffer = {
  combined: "ab 2.490 €",
  month: "—",
  year: "ab 2.490 €",
  run: "ohne monatliche Betreuung",
} as const;
