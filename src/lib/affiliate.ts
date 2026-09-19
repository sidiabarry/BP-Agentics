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
    "Wir richten Ihr Merchant-Programm auf ADCELL ein. Feeds, Tracking, Publisher, Reporting. Unsere Vergütung ist ein Anteil an der bestätigten Provision. Das Netzwerk bleibt das Netzwerk.",
} as const;

export const affiliateSteps = [
  {
    title: "Setup",
    body: "Programm, Feeds, Konditionen. Nur was Vertrag und Netzwerk hergeben.",
  },
  {
    title: "Tracking",
    body: "Shopify, WooCommerce oder GTM. Eine Quelle, die sich prüfen lässt.",
  },
  {
    title: "Publisher",
    body: "Qualität statt Masse. Wer wirbt, ist ausgewählt.",
  },
  {
    title: "Reporting",
    body: "Zahlen aus ADCELL, nicht aus einer Folie.",
  },
  {
    title: "Vergütung",
    body: "1–2 % der bestätigten Publisher-Provision. Rechnung außerhalb des Netzwerks, kein In-Network-Override.",
  },
] as const;

export const affiliatePay = {
  title: "Sie zahlen Erfolg, nicht Hoffnung.",
  body:
    "ADCELL bleibt das Netzwerk. Dessen Provision und AGB gelten weiter — „keine Gebühren“ heißt nicht „keine Netzwerkprovision“. Merchant oft mindestens 500 € Transaktionsguthaben (AGB). Offizieller Agentur-Account von Firstlead GmbH / adcell.de ist kostenlos (Multi-Kunden, Reporting). Unsere Betreuung läuft per Servicevertrag: 1–2 % der bestätigten Publisher-Provision, per Rechnung.",
} as const;

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
