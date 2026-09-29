export const affiliatePath = "/leistungen/affiliate";

export const affiliateNav = {
  href: affiliatePath,
  title: "Affiliate-Programme",
  sub: "Ihr Shop bei ADCELL, eingerichtet und betreut.",
} as const;

export const affiliateHero = {
  kicker: "Affiliate-Programm mit ADCELL",
  title: "Mehr Kunden über Partnerseiten. Ohne dass Sie täglich daran sitzen.",
  lead:
    "Partnerseiten wie Gutschein- und Vergleichsportale bringen Ihnen Käufer. Provision fällt erst an, wenn ein Verkauf bestätigt ist. Wir richten das bei ADCELL für Sie ein und kümmern uns darum, dass es läuft.",
} as const;

export const affiliateWhat = {
  kicker: "Kurz erklärt",
  title: "Was ist ADCELL?",
  body:
    "ADCELL ist ein Affiliate-Netzwerk aus Berlin, seit 2003 und auf Deutschland, Österreich und die Schweiz ausgerichtet. Dort finden Onlineshops Partnerseiten, bei ADCELL „Publisher“ genannt: Gutscheinseiten, Vergleichsportale, Bewertungsseiten, Blogs, Cashback-Portale und Social-Media-Kanäle.",
  gainLabel: "Was Sie davon haben",
  gain: ["Mehr Reichweite.", "Bezahlt wird bei Verkauf.", "Läuft im Hintergrund."],
  flowLabel: "So läuft ein Verkauf über ADCELL",
  flow: [
    { label: "Ihr Shop", text: "Sie legen fest, wofür es Provision gibt, zum Beispiel pro Verkauf." },
    { label: "Partnerseite", text: "Eine Gutscheinseite, ein Vergleichsportal oder ein Blog verlinkt Ihr Produkt." },
    { label: "Käufer", text: "Jemand klickt den Link und kauft in Ihrem Shop." },
    { label: "Provision", text: "Erst wenn der Verkauf bestätigt ist, bekommt der Partner seine Provision." },
  ],
  rail: { tag: "ADCELL", text: "erfasst jeden Verkauf, rechnet ab und zahlt die Partner aus." },
} as const;

export const affiliateRollupHead = {
  kicker: "Ablauf",
  title: "Das können Sie auch selbst machen.",
  body:
    "ADCELL ist so gebaut, dass Shops sich selbst anmelden können. Die Frage ist, ob Sie die Zeit haben, sich einzuarbeiten, und wer danach dranbleibt.",
  selfLabel: "Selbst machen",
  usLabel: "Mit BP Agentics",
} as const;

export const affiliateSteps = [
  {
    title: "Setup",
    self: "Programm, Provision, Werbemittel und Produktdaten richten Sie selbst ein.",
    body: "Wir legen Ihr Programm bei ADCELL an: Provision, Werbemittel und alle Produkte als CSV-Datei, mit jedem Shopsystem. Der Account läuft auf Ihren Shop, wir betreuen ihn.",
  },
  {
    title: "Tracking",
    self: "Sie binden ADCELL selbst ein. Fehler merken Sie oft erst, wenn Verkäufe fehlen.",
    body: "Wir verbinden Ihren Shop mit ADCELL und prüfen vor dem Start, dass jeder Verkauf beim richtigen Partner ankommt.",
  },
  {
    title: "Partner",
    self: "Partner legen meist direkt los. Regeln und Überblick liegen bei Ihnen.",
    body: "Gutscheinseiten, Vergleichsportale, Bewertungsseiten und Blogs verlinken Ihre Produkte. Wir legen mit Ihnen die Regeln fest und sehen, wer wirklich verkauft.",
  },
  {
    title: "Betreuung",
    self: "Offene Verkäufe prüfen, Retouren fristgerecht stornieren, Zahlen im Blick behalten.",
    body: "Wir prüfen die Verkäufe im Programm, geben frei oder stornieren und geben Ihnen die Ergebnisse weiter, mit kurzem Status und nächstem Schritt.",
  },
  {
    title: "Vergütung",
    self: "Provision an die Partner und an ADCELL zahlen Sie so oder so.",
    body: "Wir rechnen getrennt per Rechnung ab und verdienen nur mit, wenn Ihr Shop über ADCELL verkauft.",
  },
] as const;

export const affiliatePay = {
  title: "Keine Einrichtungsgebühr.",
  body: "Wir verdienen nur mit, wenn Ihr Shop über ADCELL verkauft (1–2 % Provision).",
  figure: "1–2 %",
} as const;

/** Beträge nur 1–2 % (affiliatePay) und 500 Euro (FAQ, ADCELL-AGB). Keine weiteren Zahlen ohne Sidia/Ops. */
export const affiliatePayFacts = [
  { label: "Partner", text: "Provision nur für bestätigte Verkäufe. Die Höhe legen Sie selbst fest." },
  { label: "ADCELL", text: "Keine Einrichtungs- und keine Monatsgebühr, der Agentur-Account ist kostenlos. Dafür eine eigene Netzwerkprovision, die Sie direkt mit ADCELL vereinbaren." },
  { label: "Startguthaben", text: "Zahlen Sie bei ADCELL ein, nicht bei uns. Daraus werden die Provisionen bezahlt." },
] as const;

export const affiliateCaseCopy = {
  kicker: "Aus der Praxis",
  title: "Poolseller GmbH",
  body:
    "Sidia hat beim Aufbau des ADCELL-Setups für Poolseller mitgewirkt. Der Account wurde im Namen des Shops eingerichtet. Tracking und Produktfeed wurden aufgesetzt, dann wurden Partnerseiten eingebunden: Bewertungsportale, Gutscheinseiten und Vergleichsportale. Heute läuft das Programm ohne täglichen Eingriff.",
  from: "Setup",
  to: "läuft",
} as const;

export const affiliateNext = {
  title: "Erst mal schauen, ob es zu Ihrem Shop passt.",
  body:
    "In 15 Minuten schauen wir gemeinsam auf Ihren Shop und welche Partnerseiten für Sie in Frage kommen. Danach wissen Sie, ob sich ADCELL für Sie lohnt und ob Sie es selbst machen oder abgeben wollen.",
  chips: ["15 Minuten", "Jedes Shopsystem", "Keine Einrichtungsgebühr"],
  primary: { href: "/termin", label: "15-Minuten-Gespräch vereinbaren" },
  secondary: { href: "/kontakt", label: "Nachricht schreiben" },
} as const;

export const affiliateFaqs = [
  {
    q: "Was ist ADCELL?",
    a: "Ein Affiliate-Netzwerk der Firstlead GmbH aus Berlin, seit 2003 und auf Deutschland, Österreich und die Schweiz ausgerichtet. Shops stellen dort ein Partnerprogramm ein. Partnerseiten wie Gutscheinseiten, Vergleichsportale oder Blogs verlinken die Produkte und bekommen Provision, wenn über ihren Link gekauft wird. ADCELL erfasst die Verkäufe, rechnet ab und zahlt die Partner aus.",
  },
  {
    q: "Kann ich das nicht selbst machen?",
    a: "Doch. ADCELL ist so gebaut, dass sich Shops selbst anmelden können. Die Arbeit steckt in den Details: Tracking, das jeden Verkauf richtig zuordnet, alle Produkte sauber als CSV bei ADCELL, klare Regeln für Partner und das laufende Prüfen, Freigeben und Stornieren von Verkäufen. Das übernehmen wir im Programm und geben Ihnen die Ergebnisse weiter. Wenn Sie dafür selbst Zeit haben, machen Sie es selbst.",
  },
  {
    q: "Was kostet ADCELL selbst?",
    a: "ADCELL nimmt keine Einrichtungs- und keine Monatsgebühr. Neben der Provision für die Partner berechnet ADCELL eine eigene Netzwerkprovision, deren Höhe Sie direkt mit ADCELL vereinbaren. Zum Start braucht Ihr Transaktionskonto bei ADCELL ein Guthaben von mindestens 500 Euro. Das ist eine Regel von ADCELL (AGB, Ziffer 14.2), kein Preis von uns: Sie zahlen das Geld bei ADCELL ein, und daraus werden die Provisionen bezahlt.",
  },
  {
    q: "Wie wird BP Agentics bezahlt?",
    a: "Keine Einrichtungsgebühr. Wir verdienen nur mit, wenn Ihr Shop über ADCELL verkauft: 1–2 % der bestätigten Partner-Provision, per Rechnung und getrennt von ADCELL. Das läuft nicht über das Netzwerk, ADCELL zieht dafür nichts ab.",
  },
  {
    q: "Gibt es einen Agentur-Account?",
    a: "Ja. ADCELL bietet Agenturen einen eigenen Account, und der ist kostenlos. Darin lassen sich mehrere Kunden und ihr Reporting verwalten.",
  },
  {
    q: "Auf wessen Namen läuft das Programm?",
    a: "Auf Ihren. Der ADCELL-Account wird im Namen Ihres Shops angelegt, und wir betreuen ihn für Sie. Programm, Partner und Zahlen bleiben bei Ihnen.",
  },
  {
    q: "Mit welchen Shopsystemen geht das?",
    a: "Mit jedem. Wir stellen alle Ihre Produkte in eine CSV-Datei und hinterlegen sie bei ADCELL. Das funktioniert unabhängig davon, welches Shopsystem Sie nutzen.",
  },
] as const;

export const affiliatePicker = {
  id: "affiliate",
  name: "Affiliate-Programme",
  sub: "Ihr Shop bei ADCELL, eingerichtet und betreut.",
  lead: affiliateHero.lead,
  href: affiliatePath,
  linkLabel: "Affiliate-Programme ansehen",
} as const;

export const affiliateRelated = {
  href: affiliatePath,
  label: "Affiliate-Programme",
} as const;
