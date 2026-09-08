import type { IndustrySlug } from "@/lib/content";

export const tradePages: Record<
  IndustrySlug,
  {
    metaTitle: string;
    metaDescription: string;
    question: string;
    answer: string;
    local: string;
    body: string[];
    leistung: { href: string; label: string };
    second: { href: string; label: string };
    hub: {
      heading: string;
      stuck: string;
      level: string;
      paragraphs: string[];
    };
  }
> = {
  dachdecker: {
    metaTitle: "Dachdecker: Website und Besichtigungen",
    metaDescription:
      "Anwendungsbeispiel: Sanierungsprojekte zeigen und Besichtigungen vorbereiten. Website und Nachrichten-Assistent für Dachdeckerbetriebe in NRW.",
    question: "Was kann für einen Dachdeckerbetrieb leichter werden?",
    answer:
      "Eine Website kann Dacharbeiten und Referenzen verständlich präsentieren. Bei planbaren Anfragen kann der Nachrichten-Assistent Angaben zum Vorhaben erfassen und Besichtigungstermine anbieten.",
    local:
      "Vor-Ort-Gespräche in Nordrhein-Westfalen. Welche Unterstützung sinnvoll ist, hängt vom bisherigen Anfrageweg und der Auslastung ab.",
    body: [
      "Eine Website kann Dacharbeiten und Referenzen verständlich präsentieren. Bei planbaren Anfragen kann der Nachrichten-Assistent Angaben zum Vorhaben erfassen und Besichtigungstermine anbieten.",
      "Welche Unterstützung sinnvoll ist, hängt vom bisherigen Anfrageweg und der Auslastung ab. Das ist ein Anwendungsbeispiel, keine pauschale Paketzuordnung.",
    ],
    leistung: { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
    second: { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
    hub: {
      heading: "Sanierungsprojekte zeigen. Besichtigungen vorbereiten.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Website und Nachrichten-Assistent — je nach Anfrageweg.",
      paragraphs: [
        "Eine Website kann Dacharbeiten und Referenzen verständlich präsentieren. Bei planbaren Anfragen kann der Nachrichten-Assistent Angaben zum Vorhaben erfassen und Besichtigungstermine anbieten. Welche Unterstützung sinnvoll ist, hängt vom bisherigen Anfrageweg und der Auslastung ab.",
      ],
    },
  },
  "shk-haustechnik": {
    metaTitle: "SHK: geplante Projekte und Servicemeldungen",
    metaDescription:
      "Anwendungsbeispiel: Angaben zu Badsanierung, Wartung oder Service geordnet erfassen. Fachliche Dringlichkeit bleibt im Betrieb.",
    question: "Wie können geplante Projekte und Servicemeldungen geordnet ankommen?",
    answer:
      "Angaben zu Badsanierung, Wartung oder Service sollen beim passenden Ansprechpartner ankommen. Ein abgestimmter digitaler Ablauf kann diese Informationen strukturiert erfassen.",
    local:
      "Fachliche Dringlichkeit und Einsatzentscheidungen bleiben bei den zuständigen Personen im Betrieb.",
    body: [
      "Angaben zu Badsanierung, Wartung oder Service sollen beim passenden Ansprechpartner ankommen. Ein abgestimmter digitaler Ablauf kann diese Informationen strukturiert erfassen.",
      "Fachliche Dringlichkeit und Einsatzentscheidungen bleiben bei den zuständigen Personen im Betrieb.",
    ],
    leistung: { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
    second: { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
    hub: {
      heading: "Geplante Projekte und Servicemeldungen geordnet erfassen.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Abgestimmter digitaler Ablauf — Dringlichkeit bleibt im Betrieb.",
      paragraphs: [
        "Angaben zu Badsanierung, Wartung oder Service sollen beim passenden Ansprechpartner ankommen. Ein abgestimmter digitaler Ablauf kann diese Informationen strukturiert erfassen. Fachliche Dringlichkeit und Einsatzentscheidungen bleiben bei den zuständigen Personen im Betrieb.",
      ],
    },
  },
  elektrotechnik: {
    metaTitle: "Elektrotechnik: Arbeiten nachvollziehbar dokumentieren",
    metaDescription:
      "Anwendungsbeispiel: Angaben, Fotos und Freigaben dem Auftrag zuordnen und dem Büro bereitstellen.",
    question: "Wie lassen sich erbrachte Arbeiten nachvollziehbar dokumentieren?",
    answer:
      "Angaben, Fotos und Freigaben können dem jeweiligen Auftrag zugeordnet und dem Büro bereitgestellt werden. Welche Nachweise erforderlich sind, wird für Ihren Anwendungsfall fachlich geklärt.",
    local: "Das Ziel ist eine verlässlichere Übergabe zwischen Baustelle und Büro.",
    body: [
      "Angaben, Fotos und Freigaben können dem jeweiligen Auftrag zugeordnet und dem Büro bereitgestellt werden.",
      "Welche Nachweise erforderlich sind, wird für Ihren Anwendungsfall fachlich geklärt. Das Ziel ist eine verlässlichere Übergabe zwischen Baustelle und Büro.",
    ],
    leistung: { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
    second: { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
    hub: {
      heading: "Erbrachte Arbeiten nachvollziehbar dokumentieren.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Dokumentation und Übergabe zwischen Baustelle und Büro.",
      paragraphs: [
        "Angaben, Fotos und Freigaben können dem jeweiligen Auftrag zugeordnet und dem Büro bereitgestellt werden. Welche Nachweise erforderlich sind, wird für Ihren Anwendungsfall fachlich geklärt. Das Ziel ist eine verlässlichere Übergabe zwischen Baustelle und Büro.",
      ],
    },
  },
  kaeltetechnik: {
    metaTitle: "Kälte- und Klimatechnik: Anlageninformationen bündeln",
    metaDescription:
      "Anwendungsbeispiel: Anlagennummer, beobachteten Fehler und Fotos vor dem Einsatz zusammenführen.",
    question: "Wie können Anlageninformationen vor dem Einsatz zusammenkommen?",
    answer:
      "Eine strukturierte Meldung kann Anlagennummer, beobachteten Fehler und vorhandene Fotos erfassen. So erhält der zuständige Techniker die verfügbaren Angaben zusammen.",
    local:
      "Diagnose, Dringlichkeit und notwendige Dokumentation werden vom Fachbetrieb beurteilt.",
    body: [
      "Eine strukturierte Meldung kann Anlagennummer, beobachteten Fehler und vorhandene Fotos erfassen. So erhält der zuständige Techniker die verfügbaren Angaben zusammen.",
      "Diagnose, Dringlichkeit und notwendige Dokumentation werden vom Fachbetrieb beurteilt.",
    ],
    leistung: { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
    second: { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
    hub: {
      heading: "Anlageninformationen vor dem Einsatz zusammenführen.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Strukturierte Meldung — fachliche Bewertung bleibt im Betrieb.",
      paragraphs: [
        "Eine strukturierte Meldung kann Anlagennummer, beobachteten Fehler und vorhandene Fotos erfassen. So erhält der zuständige Techniker die verfügbaren Angaben zusammen. Diagnose, Dringlichkeit und notwendige Dokumentation werden vom Fachbetrieb beurteilt.",
      ],
    },
  },
  "spedition-container": {
    metaTitle: "Spedition und Container: Lieferscheine ins Büro",
    metaDescription:
      "Anwendungsbeispiel: Angaben zu Lieferung, Standzeit und Auftrag mobil erfassen und bereitstellen.",
    question: "Wie kommen Lieferscheine vom Einsatz ins Büro?",
    answer:
      "Angaben zu Lieferung, Standzeit und Auftrag können mobil erfasst und für die weitere Bearbeitung bereitgestellt werden. Eine Rechnungsanbindung wird passend zur vorhandenen Software vereinbart.",
    local: "Welche Angaben und Freigaben nötig sind, klären wir am konkreten Ablauf.",
    body: [
      "Angaben zu Lieferung, Standzeit und Auftrag können mobil erfasst und für die weitere Bearbeitung bereitgestellt werden.",
      "Eine Rechnungsanbindung wird passend zur vorhandenen Software vereinbart. Welche Angaben und Freigaben nötig sind, klären wir am konkreten Ablauf.",
    ],
    leistung: { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
    second: { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
    hub: {
      heading: "Lieferscheine vom Einsatz ins Büro bringen.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Digitaler Lieferschein — Rechnungsanbindung nach vorhandener Software.",
      paragraphs: [
        "Angaben zu Lieferung, Standzeit und Auftrag können mobil erfasst und für die weitere Bearbeitung bereitgestellt werden. Eine Rechnungsanbindung wird passend zur vorhandenen Software vereinbart. Welche Angaben und Freigaben nötig sind, klären wir am konkreten Ablauf.",
      ],
    },
  },
  galabau: {
    metaTitle: "Garten- und Landschaftsbau: Material und Einsätze",
    metaDescription:
      "Anwendungsbeispiel: Materialinformationen, Termine und Zuständigkeiten zusammenführen. Website für abgeschlossene Arbeiten.",
    question: "Wie bleiben Material und Einsätze gemeinsam im Blick?",
    answer:
      "Ein abgestimmter Ablauf kann Materialinformationen, Termine und Zuständigkeiten zusammenführen. Eine Website zeigt abgeschlossene Arbeiten und die angebotenen Leistungen.",
    local:
      "Ob zuerst Planung oder Auftritt im Vordergrund steht, richtet sich nach dem Bedarf des Betriebs.",
    body: [
      "Ein abgestimmter Ablauf kann Materialinformationen, Termine und Zuständigkeiten zusammenführen. Eine Website zeigt abgeschlossene Arbeiten und die angebotenen Leistungen.",
      "Ob zuerst Planung oder Auftritt im Vordergrund steht, richtet sich nach dem Bedarf des Betriebs.",
    ],
    leistung: { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
    second: { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
    hub: {
      heading: "Material und Einsätze gemeinsam im Blick behalten.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Ablauf und Website — je nach Bedarf des Betriebs.",
      paragraphs: [
        "Ein abgestimmter Ablauf kann Materialinformationen, Termine und Zuständigkeiten zusammenführen. Eine Website zeigt abgeschlossene Arbeiten und die angebotenen Leistungen. Ob zuerst Planung oder Auftritt im Vordergrund steht, richtet sich nach dem Bedarf des Betriebs.",
      ],
    },
  },
  metallbau: {
    metaTitle: "Metallbau: Angebote und Dokumentation",
    metaDescription:
      "Anwendungsbeispiel: wiederkehrende Angebots- und Dokumentationsschritte vereinfachen. Vorhandene Spezialsoftware berücksichtigen.",
    question: "Wie lassen sich wiederkehrende Angebots- und Dokumentationsschritte vereinfachen?",
    answer:
      "Vorhandene Positionen, Projektangaben und Freigaben können in einem passenden Ablauf zusammenkommen. Spezialsoftware für Kalkulation oder Fertigung wird dabei berücksichtigt.",
    local: "Gemeinsam wird geprüft, wo eine Verbindung die tägliche Arbeit unterstützt.",
    body: [
      "Vorhandene Positionen, Projektangaben und Freigaben können in einem passenden Ablauf zusammenkommen. Spezialsoftware für Kalkulation oder Fertigung wird dabei berücksichtigt.",
      "Gemeinsam wird geprüft, wo eine Verbindung die tägliche Arbeit unterstützt.",
    ],
    leistung: { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
    second: { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
    hub: {
      heading: "Wiederkehrende Angebots- und Dokumentationsschritte vereinfachen.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Verbindung vorhandener Schritte — Spezialsoftware bleibt berücksichtigt.",
      paragraphs: [
        "Vorhandene Positionen, Projektangaben und Freigaben können in einem passenden Ablauf zusammenkommen. Spezialsoftware für Kalkulation oder Fertigung wird dabei berücksichtigt. Gemeinsam wird geprüft, wo eine Verbindung die tägliche Arbeit unterstützt.",
      ],
    },
  },
  nutzfahrzeuge: {
    metaTitle: "Nutzfahrzeuge: Status und Freigaben",
    metaDescription:
      "Anwendungsbeispiel: Status und Freigaben zum Werkstattauftrag bündeln. Passend zum vorhandenen Werkstattsystem.",
    question: "Wie lassen sich Status und Freigaben zum Werkstattauftrag bündeln?",
    answer:
      "Ein angebundener Ablauf kann Informationen zum Bearbeitungsstand und zu benötigten Freigaben bereitstellen. Dafür wird festgelegt, welche Daten zuverlässig verfügbar sind und wer verbindliche Auskünfte erteilt.",
    local: "Solche Funktionen werden passend zum Werkstattsystem vereinbart.",
    body: [
      "Ein angebundener Ablauf kann Informationen zum Bearbeitungsstand und zu benötigten Freigaben bereitstellen.",
      "Dafür wird festgelegt, welche Daten zuverlässig verfügbar sind und wer verbindliche Auskünfte erteilt. Solche Funktionen werden passend zum Werkstattsystem vereinbart.",
    ],
    leistung: { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
    second: { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
    hub: {
      heading: "Status und Freigaben zum Werkstattauftrag bündeln.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Angebundener Ablauf — passend zum Werkstattsystem.",
      paragraphs: [
        "Ein angebundener Ablauf kann Informationen zum Bearbeitungsstand und zu benötigten Freigaben bereitstellen. Dafür wird festgelegt, welche Daten zuverlässig verfügbar sind und wer verbindliche Auskünfte erteilt. Solche Funktionen werden passend zum Werkstattsystem vereinbart.",
      ],
    },
  },
};
