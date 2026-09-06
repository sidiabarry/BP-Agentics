export const DESKTOP_FRAMES = 71;
export const MOBILE_FRAMES = 48;
export const SMALL_MAX = 700;
export const MIN_ENHANCED_HEIGHT = 680;

export const narratives = [
  "Eine Anfrage verlässt das Handy und bekommt einen Platz im Betrieb.",
  "Das Anliegen wird sichtbar. Der nächste Schritt beginnt mit den richtigen Informationen.",
  "Was ist schon bekannt? Was fehlt noch? Der Kontext wird vor der Übergabe geklärt.",
  "Die zuständige Person erhält die Anfrage mit ihrem Kontext – statt einzelner Nachrichten.",
  "Anfrage, Kontext und Zuständigkeit bilden einen gemeinsamen Vorgang.",
] as const;

export const phaseLabels = ["Kontakt", "Eingang", "Klärung", "Übergabe", "Vorgang"] as const;

export type ScenarioId = "angebot" | "rueckruf";

export const scenarios = {
  angebot: {
    interest: "Angebot",
    concern: "Projektumfang",
    missing: "Details zum Vorhaben",
    owner: "Projektberatung",
    next: "Umfang abstimmen",
    clarifyBadge: "Rückfrage vorbereiten",
    status: "Beispiel Angebot: Vorhaben klären, Projektberatung zuordnen, Umfang abstimmen.",
  },
  rueckruf: {
    interest: "Rückruf",
    concern: "Gesprächswunsch",
    missing: "Passendes Zeitfenster",
    owner: "Ansprechpartner",
    next: "Rückruf abstimmen",
    clarifyBadge: "Zeitfenster klären",
    status: "Beispiel Rückruf: Zeitfenster klären, Ansprechpartner zuordnen, Rückruf abstimmen.",
  },
} as const;

export function frameSrc(kind: "desktop" | "mobile", index: number) {
  return `/hero/sequence-${kind}/${String(index + 1).padStart(4, "0")}.webp`;
}

export function phaseFrom(progress: number) {
  if (progress < 0.37) return 0;
  if (progress < 0.55) return 1;
  if (progress < 0.67) return 2;
  if (progress < 0.82) return 3;
  return 4;
}
