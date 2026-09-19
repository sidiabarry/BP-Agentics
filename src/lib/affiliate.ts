export const affiliatePath = "/leistungen/affiliate";

export const affiliateNav = {
  href: affiliatePath,
  title: "Affiliate-Programme",
  sub: "Merchants auf ADCELL bringen.",
} as const;

export const affiliateHero = {
  kicker: "Affiliate-Programme",
  title: "Sie zahlen, wenn Publisher verkaufen.",
  lead:
    "Wir setzen ADCELL auf. Wir verdienen nur mit, wenn die Provision wirklich bestätigt ist. Das Netzwerk bleibt ADCELL.",
} as const;

export const affiliateSteps = [
  {
    title: "Setup",
    body: "Wir bauen Ihr Partnerprogramm bei ADCELL (Angebote, Feeds, Konditionen, Werbemittel). Ohne Programm können Publisher nichts bewerben. Ergebnis: ein echtes Programm, keine Idee.",
  },
  {
    title: "Tracking",
    body: "Shop und ADCELL werden verbunden (Shopify / Woo / GTM), damit jeder Verkauf dem richtigen Publisher gehört. Stimmt das Tracking nicht, stimmen die Zahlen nicht. Ergebnis: Zahlen, denen alle vertrauen.",
  },
  {
    title: "Publisher",
    body: "Blogs, Coupons, Creator bewerben Ihre Produkte mit Ihren Links. Sie zahlen nicht für leere Klicks — Sie zahlen bei Verkauf. Ergebnis: Reichweite unter Ihren Regeln.",
  },
  {
    title: "Reporting",
    body: "Was läuft, was bricht, wer performt, wo Ausreißer bei Auszahlungen. Blindflug vermeiden. Ergebnis: kurzer Status + klarer nächster Schritt.",
  },
  {
    title: "Vergütung",
    body: "Publisher-Provision läuft über ADCELL. Wir rechnen außerhalb ab: 1–2 % der bestätigten Publisher-Provision. Kein In-Network-Override. Ergebnis: Sie zahlen Erfolg, nicht Hoffnung.",
  },
] as const;

export const affiliatePay = {
  title: "Sie zahlen Erfolg, nicht Hoffnung.",
  body:
    "1–2 % bestätigt, per Rechnung. Agentur-Account kostenlos. ADCELL-AGB und Netzwerkprovision bleiben — „keine Gebühren“ ≠ „nichts an ADCELL“. Oft mind. 500 € Transaktionsguthaben (AGB).",
} as const;

/** Nur Auszüge aus affiliatePay.body — keine neuen Zahlen. */
export const affiliatePayFacts = [
  {
    label: "Beteiligung",
    text: "1–2 % bestätigt, per Rechnung. Agentur-Account kostenlos.",
  },
  {
    label: "Netzwerk",
    text: "ADCELL-AGB und Netzwerkprovision bleiben — „keine Gebühren“ ≠ „nichts an ADCELL“.",
  },
  {
    label: "Guthaben",
    text: "oft mind. 500 € Transaktionsguthaben (AGB).",
  },
] as const;

export const affiliateCaseCopy = {
  kicker: "Beispiel",
  title: "Poolseller GmbH",
  body:
    "Sidia hat beim Aufbau des ADCELL-Setups mitgewirkt. Das Programm läuft ohne täglichen Eingriff. Der vermittelte Erfolg liegt im sechsstelligen Bereich.",
  from: "Setup",
  to: "läuft",
} as const;

export const affiliateNext = {
  title: "Affiliate-Setup besprechen",
  body:
    "Sinnvoll, wenn Sie Merchant auf ADCELL werden wollen und Tracking, Publisher und Konditionen geklärt werden sollen. 90 Minuten.",
  chips: ["Setup und Feeds", "Tracking", "1–2 % Beteiligung"],
  primary: { href: "/termin", label: "Affiliate-Setup besprechen" },
  secondary: { href: "/kontakt", label: "Nachricht schreiben" },
} as const;

export const affiliateFaqs = [
  {
    q: "Was ist ADCELL?",
    a: "ADCELL ist das Affiliate-Netzwerk von Firstlead GmbH, erreichbar unter adcell.de. Rollen dort sind Publisher, Advertiser und Agenturen.",
  },
  {
    q: "Gibt es einen Agentur-Account?",
    a: "Der offizielle Agentur-Account von Firstlead GmbH / adcell.de ist kostenlos. Mehrere Kunden und Reporting sind vorgesehen.",
  },
  {
    q: "Heißt „keine Gebühren“, dass nichts an ADCELL geht?",
    a: "Nein. Die Werbeaussage „keine Gebühren“ heißt nicht „keine Netzwerkprovision“ an ADCELL. Für Merchants gilt oft mindestens 500 € Transaktionsguthaben (AGB).",
  },
  {
    q: "Wie wird BP Agentics vergütet?",
    a: "Über einen Servicevertrag: 1–2 % der bestätigten Publisher-Provision, per Rechnung. Es gibt keinen dokumentierten Agency-Override im Netzwerk.",
  },
] as const;

export const affiliatePicker = {
  id: "affiliate",
  name: "Affiliate-Programme",
  sub: "Merchants auf ADCELL bringen.",
  lead: affiliateHero.lead,
  href: affiliatePath,
  linkLabel: "Affiliate-Programme ansehen",
} as const;

export const affiliateRelated = {
  href: affiliatePath,
  label: "Affiliate-Programme",
} as const;
