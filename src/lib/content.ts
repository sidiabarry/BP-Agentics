export type TradeId =
  | "bau"
  | "logistik"
  | "notdienst"
  | "spezial";

export const trades = [
  {
    id: "bau" as const,
    label: "Bau und Ausbau",
    quote: "Alles läuft über mein Telefon. Ich verliere Aufträge.",
    firm: "Dachdeckerbetrieb, 8 Mitarbeiter",
    config: "Außen Signature plus Scharnier KI-Setter",
    outcome:
      "Anfragen werden in Sekunden per WhatsApp vorqualifiziert und als Besichtigung in den Meisterkalender gelegt. Sie bleiben auf dem Dach.",
  },
  {
    id: "logistik" as const,
    label: "Logistik und Transport",
    quote: "Wir ertrinken in Papier.",
    firm: "Containerdienst, 40 Mitarbeiter",
    config: "Innen Fundament, Papier aufs Handy, Rechnungen",
    outcome:
      "Fahrer lassen Lieferscheine im Browser gegenzeichnen. Die Rechnung geht am Einsatztag raus, ohne App-Zwang.",
  },
  {
    id: "notdienst" as const,
    label: "Technischer Außendienst",
    quote: "Der Notdienst klingelt nachts durch. Niemand filtert.",
    firm: "Kälte- und Klimabetrieb, 12 Mitarbeiter",
    config: "Scharnier KI-Setter plus Innen Wartung",
    outcome:
      "Störungen werden nach Kältemittel, Anlagennummer und Fehlerbild erfasst. Der Techniker fährt vorbereitet aus.",
  },
  {
    id: "spezial" as const,
    label: "Werkstatt und Spezialbetrieb",
    quote: "Ich weiß nie, was im Lager liegt. Die Saison ist kurz.",
    firm: "Pool- und Gartenbau, 15 Mitarbeiter",
    config: "Innen Fundament, Lager, Terminplanung",
    outcome:
      "Material und Kolonnen sind synchron. Stillstand in der kurzen Saison fällt weg.",
  },
];

export const problems = [
  {
    title: "Erreichbarkeit",
    line: "Die Anfrage kam am Montagmorgen. Zurückgerufen habe ich erst am Mittwochabend.",
  },
  {
    title: "Büro nach Feierabend",
    line: "Tagsüber leite ich die Baustellen. Angebote schreibe ich um zehn.",
  },
  {
    title: "Lager und Material",
    line: "Ich weiß nicht verlässlich, was im Lager liegt, bis der Monteur vor einem leeren Regal steht.",
  },
  {
    title: "Website ohne Auftrag",
    line: "Unsere Firmenwebsite ist veraltet und hat seit zwei Jahren keinen rentablen Auftrag gebracht.",
  },
];

export const levels = [
  {
    id: "aussen",
    roman: "01",
    name: "Außen",
    kicker: "Die Kundenschnittstelle",
    lead: "Website, Web-App oder Shop, der Premium-Anfragen holt statt Preiskämpfer.",
    items: [
      "Website Start, Einseiter",
      "Website Signature mit Scroll-Choreografie",
      "Shop und App, iOS und Android",
    ],
    price: "Einbau 950 € bis ab 7.900 €",
    run: "Betrieb ab 149 € / Monat",
  },
  {
    id: "scharnier",
    roman: "02",
    name: "Scharnier",
    kicker: "Die Brücke ins Büro",
    lead: "Der KI-Setter nimmt Anfragen über WhatsApp an, qualifiziert und schreibt Termine in den Kalender.",
    items: [
      "WhatsApp Business, Antwort in Sekunden",
      "Vorqualifizierung statt Mailbox",
      "Kalenderbuchung und Lead-Reaktivierung",
    ],
    price: "Einbau 1.900 €",
    run: "Betrieb 149 € / Monat",
  },
  {
    id: "innen",
    roman: "03",
    name: "Innen",
    kicker: "Der Betrieb danach",
    lead: "Kunden, Aufträge, Stundenzettel, Lieferscheine, Lager und Rechnung in einem Datenfundament.",
    items: [
      "Fundament auf Postgres",
      "Papier aufs Handy, Unterschrift im Browser",
      "E-Rechnung, GoBD, Module nach Bedarf",
    ],
    price: "Fundament 2.900 €, Module 900 € bis 1.800 €",
    run: "Betrieb ab 190 € / Monat",
  },
];

export const steps = [
  {
    n: "01",
    title: "Erstgespräch",
    body: "90 Minuten vor Ort, kostenlos. Drei Fragen: Wie kommen Anfragen rein, warum sitzen Sie abends im Büro, was ist zuletzt schiefgelaufen.",
  },
  {
    n: "02",
    title: "Systemplan",
    body: "In drei Werktagen ein verbindliches Konzept: Bausteine, Zeitrahmen, Festpreis und eine Ausschlussliste. Nichts Offenes.",
  },
  {
    n: "03",
    title: "Einbau",
    body: "Schlüsselfertig in höchstens sechs Wochen. Ein 30-Minuten-Termin pro Woche. Der Betrieb läuft weiter.",
  },
  {
    n: "04",
    title: "Laufender Betrieb",
    body: "Hosting, Wartung, Änderungen auf Zuruf. Kein Ticketsystem. Ohne Betriebsvertrag bauen wir nichts, weil verwaiste Software nach zwei Jahren verfällt.",
  },
];

export const consequenceClips = [
  {
    src: "/media/buero-morgen.mp4",
    poster: "/media/buero-morgen.jpg",
    time: "Morgen",
    caption: "Die erste Papierlage.",
  },
  {
    src: "/media/buero-nachmittag.mp4",
    poster: "/media/buero-nachmittag.jpg",
    time: "Nachmittag",
    caption: "Binder, Zettel, Excel.",
  },
  {
    src: "/media/buero-nacht.mp4",
    poster: "/media/buero-nacht.jpg",
    time: "Nacht",
    caption: "Nur noch die Schreibtischlampe.",
  },
];

export const consequenceCards = [
  {
    time: "Morgen",
    title: "Die erste Papierlage.",
    body: "Die Anfrage liegt auf dem Tisch. Zurückgerufen wird später, wenn die Tour es zulässt.",
  },
  {
    time: "Nachmittag",
    title: "Binder, Zettel, Excel.",
    body: "Der Meister ist auf der Baustelle. Das Büro sammelt Papier, nicht Aufträge.",
  },
  {
    time: "Nacht",
    title: "Nur noch die Schreibtischlampe.",
    body: "Das Lager hinter Glas ist dunkel. Der Laptop bleibt an, weil nichts im System steht.",
  },
];

export const workReferences =
  "Danach gebaut: Feinkost Kreta · Dachdecker Signature · Innenbetrieb";

export const faqs = [
  {
    q: "Wir haben keine IT-Kenntnisse im Betrieb.",
    a: "Das ist der Normalzustand, nicht das Problem. Sie müssen keine Schnittstellen verstehen. Im Erstgespräch beschreiben Sie, wie Aufträge, Material und Personal heute durch den Betrieb laufen. Wir bauen um diese Gewohnheiten herum. Gesellen und Fahrer bedienen das auf dem Handy, ohne Schulungsmarathon.",
  },
  {
    q: "Was, wenn nachträglich Kosten kommen?",
    a: "Nach dem Gespräch erhalten Sie einen Systemplan mit unverrückbarem Festpreis und Fertigstellungstermin. Keine offenen Stundensätze. Zusätzliche Wünsche laufen nur über ein separates Angebot, das Sie vorher freigeben.",
  },
  {
    q: "Warum 149 € im Monat, wenn der Einbau schon bezahlt ist?",
    a: "Ein System ist kein Möbelstück. Es läuft auf Servern, braucht Updates und ändert sich, wenn Preise, Adressen oder Mitarbeiter wechseln. Die Pauschale deckt Hosting, Wartung und inhaltliche Änderungen auf Zuruf. Ohne laufenden Betrieb bauen wir nicht, weil verwaiste Software beide Seiten unzufrieden macht. Quellcode geben wir nicht heraus. Das hält den Einbau für den Mittelstand bezahlbar.",
  },
  {
    q: "Wo liegen die Daten?",
    a: "Auf Servern in der Europäischen Union. Zu jedem Projekt gehört ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Die Hoheit bleibt beim Betrieb. Einen vollständigen Export können Sie jederzeit anfordern. Weiterverkauf oder Kaltakquise über zugekaufte Daten findet nicht statt.",
  },
  {
    q: "Wird Umsatzsteuer ausgewiesen?",
    a: "Nein. BP Agentics rechnet als Kleinunternehmer nach § 19 UStG. Die genannten Beträge sind Endpreise.",
  },
];

export const checkPaths = [
  {
    id: "a",
    label:
      "Zu wenige oder die falschen Anfragen. Die Website wirkt veraltet und spricht Preiskämpfer an.",
    resultTitle: "Einstieg über Außen",
    result:
      "Eine Signature-Website positioniert den Betrieb als Qualitätsführer in der Region. Danach kommen die richtigen Anfragen.",
  },
  {
    id: "b",
    label:
      "Wir verpassen Anfragen, weil tagsüber niemand ans Telefon geht und Rückrufe zu lange dauern.",
    resultTitle: "Einstieg über Scharnier",
    result:
      "Der KI-Setter fängt Anfragen in Sekunden über WhatsApp ab, qualifiziert und bucht Besichtigungen in den Kalender.",
  },
  {
    id: "c",
    label:
      "Wir ersticken in Papier, Stundenzetteln und Lieferscheinen. Angebote und Rechnungen bleiben bis zum Abend liegen.",
    resultTitle: "Einstieg über Innen",
    result:
      "Fundament plus die Module, die den Engpass schließen: Papier aufs Handy, Lager oder Rechnung. Feierabendarbeit fällt weg.",
  },
];

export const teamSizes = [
  {
    id: "s",
    label: "1 bis 5 Mitarbeiter",
    hint: "Der Inhaber arbeitet auf der Baustelle oder im Fahrzeug mit.",
  },
  {
    id: "m",
    label: "6 bis 20 Mitarbeiter",
    hint: "Vorarbeiter leiten Kolonnen. Disposition im Büro wird zum Flaschenhals.",
  },
  {
    id: "l",
    label: "Über 20 Mitarbeiter",
    hint: "Verteilte Teams, mehrere Standorte oder Fuhrpark. Medienbrüche zwischen Zentrale und Außendienst.",
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
    h1: "Wenn Sie auf dem Dach stehen, holt unser System Ihre Aufträge rein.",
    h2: "Dach, Wand und Abdichtung. Premium-Auftritt statt Mailbox.",
    bottleneck:
      "Steildach- und Sanierungsanfragen gehen verloren, sobald der Meister auf der Baustelle ist.",
    config: "Außen Signature plus KI-Setter",
    argument:
      "Die Website filtert Preiskämpfer. Der Setter terminiert Besichtigungen direkt in den Kalender.",
  },
  "shk-haustechnik": {
    title: "SHK und Haustechnik",
    h1: "Heizungsausfall wartet nicht. Ihr Notdienst-System auch nicht.",
    h2: "Badsanierung planen, Havarie triagieren.",
    bottleneck:
      "Planbare Sanierungen und akute Notfälle laufen über dieselbe Nummer. Die Bereitschaft überlastet.",
    config: "Scharnier KI-Setter plus Innen Fundament",
    argument:
      "Automatische Notfall-Triage, Schadensfotos und digitale Monteurberichte.",
  },
  elektrotechnik: {
    title: "Elektrotechnik",
    h1: "Schluss mit unbezahlten Regiestunden auf Großbaustellen.",
    h2: "Nachweise nach VOB/B, solange der Auftraggeber noch da ist.",
    bottleneck:
      "Zusatzarbeiten werden nicht erfasst. Gegenüber dem Generalunternehmer fehlt der Nachweis.",
    config: "Innen Fundament plus Papier aufs Handy",
    argument:
      "Digitale Bautagesberichte mit Unterschrift und Live-Export ins Büro.",
  },
  kaeltetechnik: {
    title: "Kälte- und Klimatechnik",
    h1: "Kühlhaus ausgefallen? Strukturierte Störungsmeldung in Sekunden.",
    h2: "F-Gase, Dichtheit, Notdienst ohne Rätselraten.",
    bottleneck:
      "Techniker rücken ohne Kältemittel, Anlagentyp oder Fehlerbild aus.",
    config: "Scharnier KI-Setter plus Innen Wartung",
    argument:
      "Abfrage vor der Ausfahrt. Digitale Prüfprotokolle nach der Instandsetzung.",
  },
  "spedition-container": {
    title: "Spedition und Container",
    h1: "Vom Lieferschein bis zur Rechnung: papierlos aus dem Fahrerhaus.",
    h2: "Ohne App-Download, im Browser des Mobilgeräts.",
    bottleneck:
      "Wiegescheine, Standzeiten und Lieferscheine bleiben Tage in der Kabine. Die Rechnung wartet.",
    config: "Innen Fundament plus digitaler Lieferschein",
    argument:
      "Kundensignatur im Browser. Rechnungsanstoß am Einsatztag.",
  },
  galabau: {
    title: "Garten, Landschaft, Pool",
    h1: "Volle Bücher, kurze Saison. Behalten Sie Material und Maschinen im Blick.",
    h2: "Keine Stillstände wegen fehlender Kleinteile.",
    bottleneck:
      "Schüttgut, Bagger und Kolonnen sind nicht synchron. Die Saison verzeiht das nicht.",
    config: "Innen Fundament, Lager, Terminplanung",
    argument:
      "Einsatz und Materialdisposition in einem System, bevor das Wetter kippt.",
  },
  metallbau: {
    title: "Metallbau",
    h1: "75 Tage Bürokratie im Jahr sind genug. Holen Sie sich die Werkstattzeit zurück.",
    h2: "EN 1090, Sonderbauten, Angebote ohne Nachtarbeit.",
    bottleneck:
      "Dokumentation und Kalkulation fressen die Zeit, die in die Fertigung gehört.",
    config: "Außen Start plus Innen Fundament und Angebote",
    argument:
      "Standardisierte Kalkulation und digitale Abnahme per Tablet.",
  },
  nutzfahrzeuge: {
    title: "Nutzfahrzeuge und Landmaschinen",
    h1: "Kunden wollen Status. Sie wollen reparieren. Wir bauen die Brücke.",
    h2: "Freie Werkstatt, ohne ständige Anrufe vom Disponenten.",
    bottleneck:
      "Fuhrparkleiter rufen durch. Stellplätze bleiben blockiert, weil Freigaben fehlen.",
    config: "Scharnier KI-Setter plus Innen Fundament",
    argument:
      "Fertigstellung und Nachtragsfreigabe laufen über WhatsApp, nicht über den Meister am Telefon.",
  },
};

export const industryList = Object.entries(industries).map(([slug, data]) => ({
  slug: slug as IndustrySlug,
  ...data,
}));

export const chatBeats = [
  {
    from: "in" as const,
    time: "16:41",
    text: "Hallo, unser Dach tropft im Anbau. Kommen Sie diese Woche?",
  },
  {
    from: "out" as const,
    time: "16:41",
    text: "Zwei Termine frei: morgen 09:00 oder Freitag 14:30.",
  },
  {
    from: "in" as const,
    time: "16:42",
    text: "Ja, ja, das passt. Morgen um neun.",
  },
  {
    from: "out" as const,
    time: "16:42",
    text: "Bestätigung! ✔ Morgen 09:00, Meister Schmidt.",
  },
];

export const chatSteps = [
  { n: "01", title: "Anfrage", hint: "Kunde schreibt auf WhatsApp." },
  { n: "02", title: "Zwei Slots", hint: "Setter antwortet in Sekunden." },
  { n: "03", title: "Zusage", hint: "Kein Telefon, keine Mailbox." },
  { n: "04", title: "Kalender", hint: "Termin sitzt beim Meister." },
];
