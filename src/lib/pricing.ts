export type PriceStatus = "aktiv" | "auf-anfrage";

export type PriceLine = {
  id: string;
  name: string;
  setup: number;
  setupPrefix?: "ab";
  setupTo?: number;
  run?: number;
  runPrefix?: "ab";
  termMonths: number;
  status: PriceStatus;
  href: string;
  hrefLabel: string;
};

function euro(value: number) {
  return `${value.toLocaleString("de-DE")} €`;
}

function setupLabel(line: PriceLine) {
  if (line.setupTo != null) {
    return `${euro(line.setup)} bis ${line.setupPrefix ? `${line.setupPrefix} ` : ""}${euro(line.setupTo)}`;
  }
  return `${line.setupPrefix ? `${line.setupPrefix} ` : ""}${euro(line.setup)}`;
}

function runLabel(line: PriceLine) {
  if (line.run == null) return "in der Systemwartung";
  return `${line.runPrefix ? `${line.runPrefix} ` : ""}${euro(line.run)} / Monat`;
}

export const pricing = {
  currency: "EUR",
  ownership:
    "Die Seite gehört Ihnen ab Zahlung des Einbaus. Sie zahlen für die Wartung, nicht für Ihr Eigentum.",
  termNote: "Nach zwölf Monaten monatlich kündbar. Bei Kündigung übergeben wir die Dateien kostenfrei.",
  websites: {
    start: {
      id: "website-start",
      name: "Website Start",
      setup: 950,
      run: 149,
      termMonths: 12,
      status: "aktiv",
      href: "/leistungen/auftritt",
      hrefLabel: "Website",
    },
    betrieb: {
      id: "website-betrieb",
      name: "Website Betrieb",
      setup: 3900,
      run: 149,
      termMonths: 12,
      status: "aktiv",
      href: "/leistungen/auftritt",
      hrefLabel: "Website",
    },
    signature: {
      id: "website-signature",
      name: "Website Signature",
      setup: 7900,
      setupPrefix: "ab",
      run: 290,
      termMonths: 12,
      status: "aktiv",
      href: "/leistungen/auftritt",
      hrefLabel: "Website",
    },
  },
  setter: {
    id: "ki-setter",
    name: "KI-Setter",
    setup: 1900,
    run: 99,
    termMonths: 12,
    status: "aktiv",
    href: "/leistungen/annahme",
    hrefLabel: "KI-Setter",
  },
  fundament: {
    id: "fundament",
    name: "Fundament",
    setup: 2900,
    run: 190,
    runPrefix: "ab",
    termMonths: 12,
    status: "aktiv",
    href: "/leistungen/ablaeufe",
    hrefLabel: "Abläufe",
  },
  module: {
    id: "modul",
    name: "Modul",
    setup: 900,
    setupTo: 1800,
    termMonths: 12,
    status: "aktiv",
    href: "/leistungen/ablaeufe",
    hrefLabel: "Abläufe",
  },
} as const satisfies {
  currency: string;
  ownership: string;
  termNote: string;
  websites: Record<string, PriceLine>;
  setter: PriceLine;
  fundament: PriceLine;
  module: PriceLine;
};

export const priceLines: PriceLine[] = [
  pricing.websites.start,
  pricing.websites.betrieb,
  pricing.websites.signature,
  pricing.setter,
  pricing.fundament,
  pricing.module,
];

export function formatSetup(line: PriceLine) {
  return setupLabel(line);
}

export function formatRun(line: PriceLine) {
  return runLabel(line);
}

export function formatSetupEuroWords(line: PriceLine) {
  return formatSetup(line).replace("€", "Euro").replace("  ", " ");
}

export const priceCopy = {
  teaserHeading: `${euro(pricing.websites.start.setup)} Einbau. ${euro(pricing.websites.start.run ?? 149)} im Monat.`,
  websiteRange: `${euro(pricing.websites.start.setup)} bis ${formatSetup(pricing.websites.signature)}`,
  websiteRun: `${euro(pricing.websites.start.run ?? 149)} bis ${euro(pricing.websites.signature.run ?? 290)} / Monat`,
  levels: {
    auftritt: {
      price: `Einbau ${euro(pricing.websites.start.setup)} bis ${formatSetup(pricing.websites.signature)}`,
      run: `Wartung ${euro(pricing.websites.start.run ?? 149)} bis ${euro(pricing.websites.signature.run ?? 290)} / Monat`,
    },
    annahme: {
      price: `Einbau ${euro(pricing.setter.setup)}`,
      run: `Wartung ${euro(pricing.setter.run ?? 99)} / Monat`,
    },
    ablaeufe: {
      price: `Fundament ${euro(pricing.fundament.setup)}, Module ${euro(pricing.module.setup)} bis ${euro(pricing.module.setupTo ?? 1800)}`,
      run: `Wartung ${formatRun(pricing.fundament)}`,
    },
  },
};
