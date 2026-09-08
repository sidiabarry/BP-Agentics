import { foerderungFaq } from "@/lib/foerderung";
import { automationOffer, whatsappOffer } from "@/lib/offers";

export type TradeId = "bau" | "logistik" | "notdienst" | "spezial";

export const trades = [
  {
    id: "bau" as const,
    label: "Bau und Ausbau",
    quote:
      "Anfragen sollen den Betrieb erreichen, während das Team auf der Baustelle arbeitet.",
    firm: "Anwendungsbeispiel · Dachdeckerbetrieb",
    config: "Website und Nachrichten-Assistent",
    outcome:
      "Leistungen und Referenzen werden online erklärt. Projektangaben und Besichtigungswünsche können per WhatsApp oder E-Mail erfasst werden.",
  },
  {
    id: "logistik" as const,
    label: "Logistik und Transport",
    quote: "Angaben zu Lieferung und Auftrag sollen vom Einsatz ins Büro gelangen.",
    firm: "Anwendungsbeispiel · Containerdienst",
    config: "Gemeinsame Datenbasis und digitaler Lieferschein",
    outcome:
      "Angaben können mobil erfasst und dem Büro zur weiteren Bearbeitung bereitgestellt werden. Eine Rechnungsanbindung wird passend zur vorhandenen Software vereinbart.",
  },
  {
    id: "notdienst" as const,
    label: "Technischer Außendienst",
    quote: "Servicemeldungen und geplante Projekte sollen geordnet erfasst werden.",
    firm: "Anwendungsbeispiel · Kälte- und Klimabetrieb",
    config: "Nachrichten-Assistent und abgestimmter Ablauf",
    outcome:
      "Eine strukturierte Meldung kann Anlagennummer, beobachteten Fehler und vorhandene Fotos erfassen. Diagnose und Dringlichkeit bleiben beim Fachbetrieb.",
  },
  {
    id: "spezial" as const,
    label: "Werkstatt und Spezialbetrieb",
    quote: "Material, Termine und Zuständigkeiten sollen gemeinsam im Blick bleiben.",
    firm: "Anwendungsbeispiel · Garten- und Landschaftsbau",
    config: "Gemeinsame Datenbasis und ein erstes Modul",
    outcome:
      "Ein abgestimmter Ablauf kann Materialinformationen, Termine und Zuständigkeiten zusammenführen. Fachliche Freigaben bleiben im Betrieb.",
  },
];

export const problems = [
  {
    title: "Leistungen online erklären",
    line: "Interessenten sollen erkennen, welche Arbeiten der Betrieb übernimmt und wie sie anfragen können.",
  },
  {
    title: "WhatsApp- und E-Mail-Anfragen vorbereiten",
    line: "Projektangaben und Terminwünsche sollen vorliegen, bevor das persönliche Gespräch beginnt.",
  },
  {
    title: "Unterlagen zusammenführen",
    line: "Auftragsdaten sollen dort verfügbar sein, wo Büro und Außendienst sie benötigen.",
  },
];

export const levels = [
  {
    id: "auftritt",
    roman: "01",
    name: "Websites",
    sub: "Leistungen, Referenzen und Einsatzgebiet verständlich zeigen.",
    lead: "Vom kompakten Einseiter bis zum individuell gestalteten Auftritt.",
    items: [
      "Website Start, kompakter Einseiter",
      "Website Betrieb, mehrere Leistungen und Referenzen",
      "Website Signature, individuelle Gestaltung",
    ],
    price: "ab 690 € einmalig, Betreuung ab 149 € monatlich optional",
    run: "ab 149 € monatlich, optional",
    href: "/leistungen/auftritt",
    linkLabel: "Website-Pakete ansehen",
  },
  {
    id: "annahme",
    roman: "02",
    name: "Nachrichten-Assistent",
    sub: "Anfragen per WhatsApp und E-Mail beantworten, Angaben erfassen und Termine anbieten.",
    lead: "Der KI-Assistent für WhatsApp- und E-Mail-Anfragen erfasst vereinbarte Angaben und bietet Termine aus dem angebundenen Kalender an.",
    items: [
      "Antworten per WhatsApp und E-Mail",
      "Vereinbarte Angaben zum Vorhaben erfassen",
      "Termine nach festgelegten Kalenderregeln anbieten",
    ],
    price: `${whatsappOffer.once} Einrichtung + ${whatsappOffer.month} monatlich`,
    run: `${whatsappOffer.month} monatlich`,
    href: "/leistungen/annahme",
    linkLabel: "Nachrichten-Assistent ansehen",
  },
  {
    id: "ablaeufe",
    roman: "03",
    name: "Büroabläufe automatisieren",
    sub: "Zum Beispiel Lieferscheine digital erfassen oder Auftragsinformationen weitergeben.",
    lead: "Der erste Ablauf wird auf die vorhandenen Programme und die tägliche Arbeit abgestimmt.",
    items: [
      "Gemeinsame Datenbasis",
      "Ein vereinbartes Prozessmodul",
      "Weitere Abläufe bei Bedarf",
    ],
    price: `Datenbasis + 1 Prozessmodul: ${automationOffer.combined}, ${automationOffer.run}`,
    run: automationOffer.run,
    href: "/leistungen/ablaeufe",
    linkLabel: "Büroabläufe ansehen",
  },
];

export const steps = [
  {
    n: "01",
    title: "Betrieb und Aufgabe kennenlernen",
    body: "Im kostenlosen 90-Minuten-Gespräch vor Ort sehen wir uns an, wie Anfragen und Informationen heute durch den Betrieb laufen und was leichter werden soll.",
  },
  {
    n: "02",
    title: "Umfang und Preis festhalten",
    body: "Sie erhalten einen Projektplan mit den vereinbarten Leistungen, einem Zeitrahmen und einem Festpreis. Zusätzliche Wünsche werden vor der Umsetzung gesondert angeboten.",
  },
  {
    n: "03",
    title: "Einrichten und übergeben",
    body: "Website oder Ablauf werden für den vereinbarten Einsatz eingerichtet. Wie die Einführung mit Ihrem Team aussieht, klären wir im Projektplan.",
  },
  {
    n: "04",
    title: "Laufend betreuen",
    body: "Hosting, Pflege und Unterstützung richten sich nach dem gewählten Angebot. Die laufenden Kosten sehen Sie vor der Beauftragung.",
  },
];

export const officeSlides = [
  {
    id: "morgen",
    src: "/media/buero-morgen.mp4",
    poster: "/media/buero-morgen.jpg",
    time: "MO 07:45",
    alt: "Papierstapel und Festnetztelefon auf einem Handwerks-Schreibtisch am Montagmorgen",
    caption: "Der Tag fängt geordnet an.",
    label: "Morgen",
    sub: "Anfragen und Unterlagen.",
    body: "Wenn Anfragen über mehrere Kanäle eintreffen, braucht das Team einen Überblick, bevor die Tour beginnt.",
  },
  {
    id: "nachmittag",
    src: "/media/buero-nachmittag.mp4",
    poster: "/media/buero-nachmittag.jpg",
    time: "MO 14:20",
    alt: "Ordner, Zettel und Excel-Ausdruck auf einem überladenen Büroschreibtisch am Nachmittag",
    caption: "Anfragen, Aufträge, Rückfragen.",
    label: "Nachmittag",
    sub: "Übergaben im Büro.",
    body: "Wenn Unterlagen erst später im Büro ankommen, entstehen zusätzliche Rückfragen.",
  },
  {
    id: "nacht",
    src: "/media/buero-nacht.mp4",
    poster: "/media/buero-nacht.jpg",
    time: "MO 17:15",
    alt: "Leeres Büro am Abend, nur die Schreibtischlampe brennt über offenen Unterlagen",
    caption: "Was noch übertragen werden muss.",
    label: "Abend",
    sub: "Wiederkehrende Büroarbeit.",
    body: "Digitale Unterstützung kann Übergaben vereinfachen und wiederkehrende Arbeitsschritte übernehmen.",
  },
] as const;

export const workReferences =
  "Danach zu sehen: Feinkost Kreta · Dachdecker Signature · Automatisierung";

export const whyPoints = [
  {
    title: "Die Erfahrung Ihres Teams gehört in den Ablauf",
    body: "Die Mitarbeitenden kennen die täglichen Handgriffe und Ausnahmen. Im Gespräch klären wir, welche Informationen sie brauchen, wo doppelte Eingaben entstehen und wie der neue Ablauf eingeführt werden soll. Fachliche Entscheidungen und Freigaben bleiben im Betrieb.",
  },
  {
    title: "Ein Ansprechpartner",
    body: "Ich bin Inhaber von BP Agentics und entwickle Websites und digitale Abläufe für Betriebe in NRW. Während der Umsetzung sprechen Sie direkt mit mir über die vereinbarten Schritte.",
  },
  {
    title: "Klarer Leistungsumfang",
    body: "Vor der Beauftragung erhalten Sie ein Angebot mit Leistungsumfang, einmaligem Preis und laufenden Kosten. Zusätzliche Wünsche werden vor ihrer Umsetzung gesondert angeboten.",
  },
  {
    title: "Einzeln beauftragbar",
    body: "Websites, Nachrichten-Assistent und interne Abläufe sind einzeln beauftragbar. Im Gespräch klären wir, welcher Baustein den passenden Anfang macht.",
  },
];

export const auftrittFaqs = [
  {
    q: "Was kostet eine Website insgesamt?",
    a: "Website Start kostet 690 € einmalig. Website Betrieb kostet 1.790 €. Signature beginnt bei 3.490 €. Hosting und Pflege können Sie selbst übernehmen oder optional bei BP Agentics belassen: 149 € monatlich bei Start und Betrieb, 290 € bei Signature. Die 12-Monats-Rechnung auf der Preisseite gilt nur mit gewählter Betreuung."
  },
  {
    q: "Welche Stufe passt?",
    a: "Die passende Stufe hängt davon ab, wie viele Leistungen und Projekte erklärt werden sollen und welche Inhalte bereits vorliegen. Eine klare Anfragemöglichkeit gehört zu jedem Auftritt. Den genauen Umfang halten wir im Angebot fest.",
  },
  {
    q: "Was zur Website gehört",
    a: "Im Angebot steht, welche Seiten, Texte, Bilder und Funktionen umgesetzt werden. Der Nachrichten-Assistent und interne Abläufe werden bei Bedarf separat vereinbart.",
  },
  {
    q: "Wer kümmert sich um die Website nach dem Start?",
    a: "Nach der Erstellung können Sie die Website übernehmen und Hosting sowie Updates selbst tragen. Alternativ übernimmt BP Agentics Hosting und die vereinbarte Pflege gegen die optionale monatliche Betreuung. Welche Leistungen und welche Laufzeit dann gelten, steht im Angebot und auf der Preisseite."
  },
];

export const annahmeFaqs = [
  {
    q: "Nimmt der Nachrichten-Assistent auch Telefonanrufe an?",
    a: "Das hier beschriebene Angebot bearbeitet Nachrichten per WhatsApp und E-Mail. Eine automatische Annahme von Telefonanrufen ist darin nicht enthalten.",
  },
  {
    q: "Wie läuft eine Anfrage ab?",
    a: "Eine Person schreibt dem Betrieb auf WhatsApp oder per E-Mail. Der Assistent erfasst die vereinbarten Angaben zum Vorhaben, bietet verfügbare Termine nach den festgelegten Kalenderregeln an und trägt die Auswahl im angebundenen Kalender ein.",
  },
  {
    q: "Was kostet der Nachrichten-Assistent?",
    a: "1.290 € Einrichtung und 99 € monatlich. Einrichtung und 12 Monate Betrieb: 2.478 €. Voraussetzungen Ihrer WhatsApp-Nummer, Ihres E-Mail-Postfachs und Ihres Kalenders werden vorab geprüft.",
  },
  {
    q: "Passt das zum Betrieb?",
    a: "Sinnvoll ist der Assistent, wenn Kunden per WhatsApp oder E-Mail anfragen und wiederkehrende Fragen oder Terminabstimmungen anfallen. Im Gespräch prüfen wir das anhand Ihres Anfragewegs.",
  },
];

export const ablaeufeFaqs = [
  {
    q: "Kann unsere vorhandene Software bleiben?",
    a: "Im Gespräch wird geprüft, welche Programme genutzt werden und welche Anbindungen möglich sind. Daraus ergibt sich, ob ein ergänzender Ablauf genügt oder eine gemeinsame Datenbasis gebraucht wird.",
  },
  {
    q: "Was kostet der Einstieg?",
    a: "Datenbasis und ein Prozessmodul kosten zusammen ab 2.490 €. Eine monatliche Betreuung ist in diesem Einstieg nicht enthalten. Weitere Anschlüsse und zusätzliche Abläufe werden im Angebot ausgewiesen.",
  },
  {
    q: "Wie wird das Team einbezogen?",
    a: "Wir klären, wer den Ablauf täglich nutzt, welche Informationen benötigt werden und wie die Einführung erfolgen soll. Fachliche Entscheidungen und Freigaben bleiben bei den zuständigen Personen im Betrieb.",
  },
  {
    q: "Ersetzt das DATEV oder die Branchensoftware?",
    a: "Nein. Eine gemeinsame Datenbasis ist nicht der vollständige Umfang einer kaufmännischen Software. Vorhandene Programme, die zuverlässig arbeiten, bleiben. Eine Verbindung wird nur dort eingerichtet, wo sie vereinbart ist.",
  },
];

export const faqs = [
  {
    q: "Was passt zu Ihrem Betrieb?",
    a: "Eine Website hilft dabei, Leistungen und Referenzen verständlich zu präsentieren. Ein Nachrichten-Assistent unterstützt Anfragen per WhatsApp und E-Mail. Automatisierung verbindet wiederkehrende Arbeitsschritte. Im Gespräch klären wir, welches Vorhaben zuerst sinnvoll ist.",
  },
  {
    q: "Muss ich alle Leistungen zusammen beauftragen?",
    a: "Nein. Websites, Nachrichten-Assistent und interne Abläufe sind einzeln beauftragbar. Erweiterungen werden bei Bedarf separat vereinbart.",
  },
  {
    q: "Was kostet eine Website insgesamt?",
    a: "Website Start kostet 690 € einmalig. Website Betrieb kostet 1.790 €. Signature beginnt bei 3.490 €. Hosting und Pflege können Sie selbst übernehmen oder optional bei BP Agentics belassen: 149 € monatlich bei Start und Betrieb, 290 € bei Signature. Die 12-Monats-Rechnung auf der Preisseite gilt nur mit gewählter Betreuung."
  },
  {
    q: "Wie wird der genaue Preis festgelegt?",
    a: "Vor der Beauftragung erhalten Sie ein Angebot mit Leistungsumfang, einmaligem Preis und laufenden Kosten. Zusätzliche Wünsche werden vor ihrer Umsetzung gesondert angeboten.",
  },
  {
    q: "Ist nach dem Formular der Termin schon gebucht?",
    a: "Sie senden zunächst einen Terminwunsch. Ich melde mich unter der angegebenen Nummer und bestätige den Termin persönlich.",
  },
  foerderungFaq,
];

export const moreFaqs = [
  {
    q: "Kann unsere vorhandene Software bleiben?",
    a: "Im Gespräch wird geprüft, welche Programme genutzt werden und welche Anbindungen möglich sind. Daraus ergibt sich, ob ein ergänzender Ablauf genügt oder eine gemeinsame Datenbasis gebraucht wird.",
  },
  {
    q: "Wie wird das Team einbezogen?",
    a: "Wir klären, wer den Ablauf täglich nutzt, welche Informationen benötigt werden und wie die Einführung erfolgen soll. Fachliche Entscheidungen und Freigaben bleiben bei den zuständigen Personen im Betrieb.",
  },
  {
    q: "Nimmt der Nachrichten-Assistent auch Telefonanrufe an?",
    a: "Das hier beschriebene Angebot bearbeitet Nachrichten per WhatsApp und E-Mail. Eine automatische Annahme von Telefonanrufen ist darin nicht enthalten.",
  },
  {
    q: "Was passiert im Erstgespräch?",
    a: "In 90 Minuten vor Ort sprechen wir über Ihr Vorhaben, vorhandene Programme und den Arbeitsalltag. Danach wird festgehalten, welcher Leistungsumfang und welches weitere Vorgehen passen.",
  },
  {
    q: "Wer kümmert sich um die Website nach dem Start?",
    a: "Nach der Erstellung können Sie die Website übernehmen und Hosting sowie Updates selbst tragen. Alternativ übernimmt BP Agentics Hosting und die vereinbarte Pflege gegen die optionale monatliche Betreuung. Welche Leistungen und welche Laufzeit dann gelten, steht im Angebot und auf der Preisseite."
  },
];

export const checkPaths = [
  {
    id: "a",
    label: "Leistungen und Referenzen online zeigen",
    resultTitle: "Eine Website könnte zu Ihrem Vorhaben passen.",
    result:
      "Welche Stufe sinnvoll ist, hängt von Ihren Leistungen, vorhandenen Inhalten und dem gewünschten Umfang ab. Das ist eine erste Richtung, keine Wirtschaftlichkeitsprüfung.",
  },
  {
    id: "b",
    label: "WhatsApp- und E-Mail-Anfragen und Termine vorbereiten",
    resultTitle: "Ein Nachrichten-Assistent könnte wiederkehrende Fragen und Terminabstimmungen unterstützen.",
    result:
      "Voraussetzung ist, dass WhatsApp oder E-Mail zu Ihren Kundenanfragen passt. Im Gespräch prüfen wir das anhand Ihres Anfragewegs.",
  },
  {
    id: "c",
    label: "Wiederkehrende Büroabläufe verbinden",
    resultTitle: "Ein einzelner automatisierter Ablauf könnte den passenden Anfang bilden.",
    result:
      "Im Gespräch prüfen wir die vorhandenen Programme und den ersten Arbeitsschritt. Daraus ergibt sich, ob eine gemeinsame Datenbasis benötigt wird.",
  },
];

export type IndustrySlug =
  | "dachdecker"
  | "shk-haustechnik"
  | "elektrotechnik"
  | "kaeltetechnik"
  | "spedition-container"
  | "galabau"
  | "metallbau"
  | "nutzfahrzeuge";

export const industries: Record<
  IndustrySlug,
  {
    title: string;
    h1: string;
    h2: string;
    bottleneck: string;
    config: string;
    argument: string;
  }
> = {
  dachdecker: {
    title: "Dachdecker",
    h1: "Sanierungsprojekte zeigen. Besichtigungen vorbereiten.",
    h2: "Website und Nachrichten-Assistent als Anwendungsbeispiel.",
    bottleneck:
      "Planbare Anfragen sollen Angaben zum Vorhaben und einen Besichtigungstermin enthalten.",
    config: "Website und Nachrichten-Assistent",
    argument:
      "Eine Website kann Dacharbeiten und Referenzen verständlich präsentieren. Bei planbaren Anfragen kann der Nachrichten-Assistent Angaben erfassen und Besichtigungstermine anbieten.",
  },
  "shk-haustechnik": {
    title: "SHK und Haustechnik",
    h1: "Geplante Projekte und Servicemeldungen geordnet erfassen.",
    h2: "Anwendungsbeispiel für strukturierte Angaben.",
    bottleneck:
      "Angaben zu Badsanierung, Wartung oder Service sollen beim passenden Ansprechpartner ankommen.",
    config: "Abgestimmter digitaler Ablauf",
    argument:
      "Ein abgestimmter digitaler Ablauf kann diese Informationen strukturiert erfassen. Fachliche Dringlichkeit und Einsatzentscheidungen bleiben bei den zuständigen Personen im Betrieb.",
  },
  elektrotechnik: {
    title: "Elektrotechnik",
    h1: "Erbrachte Arbeiten nachvollziehbar dokumentieren.",
    h2: "Übergabe zwischen Baustelle und Büro.",
    bottleneck:
      "Angaben, Fotos und Freigaben sollen dem jeweiligen Auftrag zugeordnet werden.",
    config: "Dokumentationsablauf",
    argument:
      "Welche Nachweise erforderlich sind, wird für Ihren Anwendungsfall fachlich geklärt. Das Ziel ist eine verlässlichere Übergabe zwischen Baustelle und Büro.",
  },
  kaeltetechnik: {
    title: "Kälte- und Klimatechnik",
    h1: "Anlageninformationen vor dem Einsatz zusammenführen.",
    h2: "Strukturierte Meldung als Anwendungsbeispiel.",
    bottleneck:
      "Anlagennummer, beobachteter Fehler und vorhandene Fotos sollen zusammen vorliegen.",
    config: "Strukturierte Meldung",
    argument:
      "So erhält der zuständige Techniker die verfügbaren Angaben zusammen. Diagnose, Dringlichkeit und notwendige Dokumentation werden vom Fachbetrieb beurteilt.",
  },
  "spedition-container": {
    title: "Spedition und Container",
    h1: "Lieferscheine vom Einsatz ins Büro bringen.",
    h2: "Digitaler Lieferschein als möglicher Einstieg.",
    bottleneck:
      "Angaben zu Lieferung, Standzeit und Auftrag sollen mobil erfasst werden.",
    config: "Digitaler Lieferschein",
    argument:
      "Eine Rechnungsanbindung wird passend zur vorhandenen Software vereinbart. Welche Angaben und Freigaben nötig sind, klären wir am konkreten Ablauf.",
  },
  galabau: {
    title: "Garten- und Landschaftsbau",
    h1: "Material und Einsätze gemeinsam im Blick behalten.",
    h2: "Ablauf und Website nach Bedarf.",
    bottleneck:
      "Materialinformationen, Termine und Zuständigkeiten sollen zusammengeführt werden.",
    config: "Abgestimmter Ablauf und Website",
    argument:
      "Eine Website zeigt abgeschlossene Arbeiten und die angebotenen Leistungen. Ob zuerst Planung oder Auftritt im Vordergrund steht, richtet sich nach dem Bedarf des Betriebs.",
  },
  metallbau: {
    title: "Metallbau",
    h1: "Wiederkehrende Angebots- und Dokumentationsschritte vereinfachen.",
    h2: "Vorhandene Software berücksichtigen.",
    bottleneck:
      "Vorhandene Positionen, Projektangaben und Freigaben sollen in einem passenden Ablauf zusammenkommen.",
    config: "Verbindung vorhandener Schritte",
    argument:
      "Spezialsoftware für Kalkulation oder Fertigung wird dabei berücksichtigt. Gemeinsam wird geprüft, wo eine Verbindung die tägliche Arbeit unterstützt.",
  },
  nutzfahrzeuge: {
    title: "Nutzfahrzeuge und Landmaschinen",
    h1: "Status und Freigaben zum Werkstattauftrag bündeln.",
    h2: "Passend zum Werkstattsystem vereinbaren.",
    bottleneck:
      "Informationen zum Bearbeitungsstand und zu benötigten Freigaben sollen verfügbar sein.",
    config: "Angebundener Ablauf",
    argument:
      "Dafür wird festgelegt, welche Daten zuverlässig verfügbar sind und wer verbindliche Auskünfte erteilt. Solche Funktionen werden passend zum Werkstattsystem vereinbart.",
  },
};

export const industryList = Object.entries(industries).map(([slug, data]) => ({
  slug: slug as IndustrySlug,
  ...data,
}));

export const chatBeats = [
  {
    from: "in" as const,
    time: "09:12",
    text: "Guten Tag, wir wollen unser Garagendach in Hagen sanieren. Geht ein Besichtigungstermin?",
  },
  {
    from: "out" as const,
    time: "09:12",
    text: "Guten Tag, digitaler Assistent des Betriebs. Welcher Stadtteil, und wie groß ist die Fläche ungefähr?",
  },
  {
    from: "in" as const,
    time: "09:13",
    text: "In Haspe, ungefähr 30 Quadratmeter.",
  },
  {
    from: "out" as const,
    time: "09:13",
    text: "Danke. Im Beispiel frei: Dienstag 14:30 oder Donnerstag 9:00. Was passt?",
  },
  {
    from: "in" as const,
    time: "09:14",
    text: "Donnerstag um 9:00 Uhr.",
  },
  {
    from: "out" as const,
    time: "09:14",
    text: "Donnerstag 9:00 ist im Beispielkalender eingetragen.",
  },
];

export const chatSteps = [
  { n: "01", title: "Nachricht", hint: "Eine Person schreibt dem Betrieb auf WhatsApp oder per E-Mail." },
  { n: "02", title: "Angaben", hint: "Der Assistent erfasst die vereinbarten Angaben." },
  { n: "03", title: "Termine", hint: "Er bietet Zeitfenster nach den Kalenderregeln an." },
  { n: "04", title: "Kalender", hint: "Die Auswahl wird im angebundenen Kalender eingetragen." },
];
