export const DESKTOP_FRAMES = 71;
export const MOBILE_FRAMES = 48;
export const SMALL_MAX = 700;

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

export const moduleNames = ["Eingang", "Klärung", "Übergabe", "Vorgang"] as const;

export type ModuleDetail = {
  title: string;
  description: string;
  fields: readonly (readonly [string, string])[];
};

export function moduleDetails(scenario: ScenarioId): ModuleDetail[] {
  const callback = scenario === "rueckruf";
  const label = callback ? "Rückrufwunsch" : "Angebotsanfrage";
  return [
    {
      title: "Eine Anfrage bekommt einen Platz.",
      description:
        "Der Webauftritt führt Interessenten zu einem verständlichen Anfrageweg. Ihr Anliegen bleibt als zusammenhängender Ausgangspunkt erhalten.",
      fields: [
        ["Eingang", label],
        ["Beispielinhalt", "Ich möchte mein Projekt mit Ihnen besprechen."],
        ["Weitergabe", "Anliegen und vorhandene Informationen gehen gemeinsam in die Klärung."],
      ],
    },
    {
      title: "Erst verstehen. Dann weitergeben.",
      description:
        "Vor der Übergabe wird deutlich, was bereits bekannt ist und welche Information für den nächsten Schritt noch fehlt.",
      fields: [
        [
          "Bekannt",
          callback
            ? "Die Person möchte zurückgerufen werden."
            : "Die Person interessiert sich für ein Angebot.",
        ],
        [
          "Noch zu klären",
          callback
            ? "Ein passendes Zeitfenster für den Rückruf."
            : "Details zum Vorhaben und zum gewünschten Umfang.",
        ],
        ["Ergebnis", "Eine gezielte Rückfrage statt einer unvollständigen Übergabe."],
      ],
    },
    {
      title: "Die richtige Person kann übernehmen.",
      description:
        "Die Anfrage wird mit ihrem Kontext und einem konkreten nächsten Schritt einer zuständigen Person zugeordnet.",
      fields: [
        ["Zuständig", callback ? "Ansprechpartner" : "Projektberatung"],
        [
          "Nächster Schritt",
          callback
            ? "Zeitfenster abstimmen und Rückruf vorbereiten."
            : "Projektumfang gemeinsam abstimmen.",
        ],
        [
          "Grenze",
          "Die fachliche Entscheidung bleibt bei einem Menschen. Dieses Beispiel führt keine Buchung aus.",
        ],
      ],
    },
    {
      title: "Ein Vorgang statt einzelner Nachrichten.",
      description:
        "Anfrage, Kontext und Zuständigkeit bilden eine gemeinsame Übersicht. Das Team kann erkennen, was als Nächstes zu tun ist.",
      fields: [
        ["Enthalten", `${label}, offene Rückfragen und zuständige Person.`],
        ["Status", "Für die weitere Bearbeitung vorbereitet – als Beispiel."],
        [
          "Nutzen",
          "Zusammengehörige Angaben bleiben auffindbar und müssen nicht aus einzelnen Nachrichten zusammengesucht werden.",
        ],
      ],
    },
  ];
}

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
