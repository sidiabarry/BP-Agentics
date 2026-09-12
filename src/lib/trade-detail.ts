import type { IndustrySlug } from "@/lib/content";
import { automationOffer, getCatalogOffer, whatsappOffer } from "@/lib/offers";

/**
 * Inhalte der eigenständigen Gewerke-Seiten unter /gewerke/[slug].
 *
 * `seoTitle` und `seoDescription` sind auf die Suchanfrage geschrieben, mit der
 * ein Betrieb sucht ("Website für Dachdecker"), der Fließtext auf das, was die
 * Seite tatsächlich belegen kann.  Es sind Anwendungsbeispiele, keine
 * Referenzprojekte — der Wortlaut bleibt entsprechend vorsichtig.
 */
export type TradeDetail = {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
};

const websiteStart = getCatalogOffer("start").once;
const websiteBetrieb = getCatalogOffer("betrieb").once;
const websiteSignature = getCatalogOffer("signature").once;

const preisAnker = `Website Start ${websiteStart}, Website Betrieb ${websiteBetrieb}, Signature ${websiteSignature}. Der Nachrichten-Assistent kostet ${whatsappOffer.once} Einrichtung und ${whatsappOffer.month} monatlich. Verbindlich wird der Preis im Angebot vor der Beauftragung.`;

const gebiet =
  "Das Erstgespräch findet vor Ort im Betrieb statt, 90 Minuten und kostenlos. Angefahren werden Hagen, der Ennepe-Ruhr-Kreis, der Märkische Kreis und das übrige Nordrhein-Westfalen nach Absprache.";

export const tradeDetails: Record<IndustrySlug, TradeDetail> = {
  dachdecker: {
    seoTitle: "Website für Dachdecker: Anfragen vorbereiten",
    seoDescription:
      "Website und WhatsApp-Assistent für Dachdeckerbetriebe in NRW: Sanierungen zeigen, Besichtigungen vorbereiten. Ab 690 €. Erstgespräch vor Ort.",
    h1: "Website für Dachdecker: Sanierungen zeigen, Besichtigungen vorbereiten.",
    intro:
      "Dacharbeiten werden selten spontan vergeben. Zwischen erster Anfrage und Auftrag liegen eine Besichtigung, ein Angebot und oft Wochen Bedenkzeit. Eine Website kann in dieser Zeit die Arbeit des Betriebs sichtbar halten — ein Nachrichten-Assistent kann die Angaben sammeln, die für die Besichtigung nötig sind.",
    sections: [
      {
        heading: "Was auf der Website eines Dachdeckerbetriebs stehen sollte",
        body: "Interessenten unterscheiden nicht zwischen Steildach, Flachdach und Abdichtung — sie beschreiben ein Problem. Eine Website kann die übernommenen Arbeiten in dieser Sprache benennen und mit Bildern belegen: Zustand vorher, ausgeführte Arbeit, Ergebnis. Dazu gehören das Einsatzgebiet, die Ansprechperson und ein Anfrageweg, der ohne Formularhürde funktioniert. Wer Gerüst, Dachfenster oder Photovoltaik mit abdeckt, sollte das benennen — danach wird gesucht.",
      },
      {
        heading: "Was der Nachrichten-Assistent bei planbaren Anfragen übernehmen kann",
        body: "Bei planbaren Vorhaben kann der Assistent per WhatsApp oder E-Mail die Angaben erfassen, die sonst im Rückruf abgefragt werden: Ort und Stadtteil, ungefähre Fläche, Art des Dachs, gewünschter Zeitraum, vorhandene Fotos. Termine bietet er nur aus den Zeitfenstern an, die im Kalender freigegeben sind. Ein Sturmschaden ist kein Fall für den Assistenten — Dringlichkeit bleibt beim Betrieb.",
      },
      {
        heading: "Was das für die Angebotserstellung ändert",
        body: "Liegen Fläche, Fotos und Zeitraum vor dem Termin vor, lässt sich die Besichtigung gezielter vorbereiten und das Angebot schneller schreiben. Ob sich dafür ein eigener Ablauf lohnt, hängt davon ab, wie viele Anfragen pro Woche eingehen und wie sie heute festgehalten werden. Das klären wir im Erstgespräch, bevor etwas beauftragt wird.",
      },
    ],
    faqs: [
      {
        q: "Was kostet eine Website für einen Dachdeckerbetrieb?",
        a: `${preisAnker} Für einen Betrieb mit mehreren Leistungsbereichen und Referenzbildern ist in der Regel Website Betrieb die passende Stufe.`,
      },
      {
        q: "Kann der Assistent auch Notdienst-Anfragen beantworten?",
        a: "Nein. Der Assistent ist für planbare Anfragen gedacht — Sanierung, Neueindeckung, Wartung. Ob ein Sturmschaden dringend ist, entscheidet der Betrieb, nicht ein Assistent. Solche Nachrichten können ausdrücklich an die zuständige Person weitergeleitet werden.",
      },
      {
        q: "Gibt es ein Beispiel, wie so eine Website aussieht?",
        a: "Ja — die Produktdemo „Dachdecker Signature“ zeigt Aufbau, Bildsprache und Anfrageweg an einem vollständigen Beispiel. Sie ist ausdrücklich eine Demo und kein Echtbetrieb.",
      },
    ],
  },

  "shk-haustechnik": {
    seoTitle: "Website für SHK-Betriebe und Haustechnik",
    seoDescription:
      "Website und digitaler Anfrageweg für SHK- und Haustechnikbetriebe in NRW: Badsanierung, Wartung und Service geordnet erfassen. Ab 690 €.",
    h1: "Website für SHK-Betriebe: geplante Projekte und Servicemeldungen trennen.",
    intro:
      "In der Haustechnik laufen zwei sehr unterschiedliche Anfragearten über denselben Kanal: die Badsanierung, die Monate Vorlauf hat, und die Störungsmeldung, die heute beantwortet werden muss. Beides im selben Postfach zu sortieren kostet Zeit — und die Sanierungsanfrage geht dabei am ehesten unter.",
    sections: [
      {
        heading: "Zwei Anfragewege, zwei Erwartungen",
        body: "Eine Website kann die Trennung schon an der Oberfläche vornehmen: ein Weg für geplante Vorhaben wie Bad, Heizungstausch oder Wartungsvertrag, ein anderer für Störungen, mit klarer Aussage, wie und wann darauf reagiert wird. Das nimmt Druck aus dem Telefon und sortiert die Anfragen, bevor sie im Betrieb ankommen.",
      },
      {
        heading: "Welche Angaben bei planbaren Vorhaben vorliegen sollten",
        body: "Für ein erstes Gespräch über eine Badsanierung helfen Angaben, die jeder Kunde geben kann: ungefähre Raumgröße, Baujahr des Hauses, was ersetzt werden soll, ob Fliesen mit dazugehören, gewünschter Zeitraum. Bei Heizungsthemen zusätzlich der vorhandene Wärmeerzeuger und sein Alter. Ein Nachrichten-Assistent kann genau diese vereinbarten Angaben per WhatsApp oder E-Mail erfassen — fachliche Bewertung und Auslegung bleiben im Betrieb.",
      },
      {
        heading: "Wartung und wiederkehrende Termine",
        body: "Wartungsverträge leben von Terminen, die niemand vergisst. Wo Kundendaten, Anlagen und Fälligkeiten heute in getrennten Listen stehen, kann eine gemeinsame Datenbasis mit einem ersten Prozessmodul sie zusammenführen. Ob das sinnvoll ist, hängt von der vorhandenen Software ab — deshalb schauen wir uns die zuerst an.",
      },
    ],
    faqs: [
      {
        q: "Was kostet eine Website für einen SHK-Betrieb?",
        a: preisAnker,
      },
      {
        q: "Ersetzt der Assistent die Notdienst-Nummer?",
        a: "Nein. Der Assistent betrifft Textnachrichten per WhatsApp und E-Mail, keine Telefonannahme. Für Störungen und Notdienst bleibt der Weg bestehen, den der Betrieb festgelegt hat — der Assistent kann ihn nur deutlich benennen.",
      },
      {
        q: "Lässt sich das an unsere vorhandene Software anbinden?",
        a: `Das wird vor der Beauftragung geprüft, nicht danach. Eine gemeinsame Datenbasis mit einem ersten Prozessmodul beginnt bei ${automationOffer.combined}. Welche Schnittstelle Ihr Programm bietet, sehen wir uns im Erstgespräch an.`,
      },
    ],
  },

  elektrotechnik: {
    seoTitle: "Website für Elektrobetriebe in NRW",
    seoDescription:
      "Website und digitale Dokumentation für Elektrobetriebe: Arbeiten, Fotos und Freigaben dem Auftrag zuordnen. Ab 690 €. Erstgespräch vor Ort in NRW.",
    h1: "Website für Elektrobetriebe: Arbeiten nachvollziehbar dokumentieren.",
    intro:
      "Im Elektrohandwerk entscheidet die Dokumentation darüber, ob eine Leistung abgerechnet werden kann. Was auf der Baustelle notiert wird, muss im Büro ankommen — vollständig und dem richtigen Auftrag zugeordnet. Genau an dieser Übergabe geht am meisten Zeit verloren.",
    sections: [
      {
        heading: "Was die Website leisten kann",
        body: "Elektrobetriebe decken sehr unterschiedliche Felder ab: Neubau, Sanierung, Prüfungen nach DGUV V3, Ladeinfrastruktur, Photovoltaik, Smart Home. Eine Website kann sichtbar machen, welche davon der Betrieb tatsächlich übernimmt und für welche Auftraggeber — Privat, Gewerbe, Generalunternehmer. Das filtert Anfragen vor, die sonst im Erstgespräch aussortiert werden müssten.",
      },
      {
        heading: "Übergabe zwischen Baustelle und Büro",
        body: "Angaben, Fotos und Freigaben können dem jeweiligen Auftrag zugeordnet und dem Büro bereitgestellt werden, statt als lose Nachrichten einzugehen. Welche Nachweise erforderlich sind und in welcher Form sie geführt werden müssen, wird für Ihren Anwendungsfall fachlich geklärt — hier wird nichts pauschal digitalisiert.",
      },
      {
        heading: "Wo ein erster Ablauf realistisch anfängt",
        body: "Sinnvoll ist der Einstieg dort, wo derselbe Handgriff jede Woche anfällt: Stundenzettel, Materialerfassung, Fotodokumentation zum Auftrag. Ein Modul, sauber abgestimmt, bringt mehr als ein vollständiges System, das niemand ausfüllt.",
      },
    ],
    faqs: [
      {
        q: "Was kostet eine Website für einen Elektrobetrieb?",
        a: preisAnker,
      },
      {
        q: "Werden Prüfprotokolle rechtssicher ersetzt?",
        a: "Nein. Welche Nachweise in welcher Form zu führen sind, bestimmt die Fachnorm und nicht die Software. Ein digitaler Ablauf kann die Erfassung erleichtern und die Zuordnung zum Auftrag sichern — die fachliche Verantwortung bleibt im Betrieb.",
      },
      {
        q: "Wie lange dauert die Umsetzung?",
        a: "Eine Website Start ist üblicherweise in wenigen Wochen online, ein abgestimmter Ablauf braucht länger, weil die vorhandenen Programme und die tägliche Arbeit einbezogen werden. Eine belastbare Angabe steht im Angebot.",
      },
    ],
  },

  kaeltetechnik: {
    seoTitle: "Website für Kälte- und Klimatechnik",
    seoDescription:
      "Website und strukturierte Servicemeldung für Kälte- und Klimabetriebe in NRW: Anlagendaten vor dem Einsatz zusammenführen. Ab 690 €.",
    h1: "Website für Kälte- und Klimatechnik: Anlagendaten vor dem Einsatz.",
    intro:
      "Wer zu einer Störung fährt, ohne Anlagennummer, Fehlerbild und Zugangssituation zu kennen, fährt oft ein zweites Mal. Die Angaben existieren — sie stehen nur in der falschen Form in einer Nachricht, einem Anruf oder gar nicht.",
    sections: [
      {
        heading: "Eine strukturierte Meldung statt einer freien Nachricht",
        body: "Eine Servicemeldung kann Anlagennummer, Standort, beobachtetes Fehlerbild, vorhandene Fotos und die Erreichbarkeit vor Ort abfragen — in der Reihenfolge, die für den Einsatz zählt. Diagnose, Dringlichkeit und Einsatzplanung bleiben ausdrücklich beim Fachbetrieb. Der Assistent sammelt, er bewertet nicht.",
      },
      {
        heading: "Wartung als planbarer Teil des Geschäfts",
        body: "Kälte- und Klimaanlagen bringen wiederkehrende Prüfungen und Wartungsintervalle mit sich. Wo Anlagen, Kunden und Fälligkeiten in getrennten Listen liegen, kann eine gemeinsame Datenbasis sie verbinden und Fälligkeiten sichtbar machen — bevor der Kunde anruft.",
      },
      {
        heading: "Was die Website zeigen sollte",
        body: "Gewerbliche Auftraggeber prüfen vor der Anfrage, ob ein Betrieb ihre Anlagenart und ihre Größenordnung überhaupt betreut. Eine Website kann betreute Anlagentypen, Einsatzgebiet, Service- und Wartungsleistungen und die Erreichbarkeit klar benennen — das erspart beiden Seiten die Anfrage, die nicht passt.",
      },
    ],
    faqs: [
      {
        q: "Was kostet eine Website für einen Kälte- und Klimabetrieb?",
        a: preisAnker,
      },
      {
        q: "Entscheidet der Assistent, wie dringend ein Ausfall ist?",
        a: "Nein, und das ist bewusst so. Der Assistent erfasst die vereinbarten Angaben und legt sie vor. Wie dringend ein Ausfall ist und wer wann fährt, entscheiden die zuständigen Personen im Betrieb.",
      },
      {
        q: "Können mehrere Standorte eines Kunden getrennt erfasst werden?",
        a: "Ja, das ist einer der häufigen Gründe für eine gemeinsame Datenbasis: Anlagen werden dem Standort zugeordnet, nicht nur dem Kundennamen. Wie das aussieht, hängt davon ab, wie Ihre Anlagen heute geführt werden.",
      },
    ],
  },

  "spedition-container": {
    seoTitle: "Website für Spedition und Containerdienst",
    seoDescription:
      "Website und digitaler Lieferschein für Spedition und Containerdienst in NRW: Angaben vom Einsatz ins Büro bringen. Datenbasis + Modul ab 2.490 €.",
    h1: "Website und digitaler Lieferschein für Spedition und Containerdienst.",
    intro:
      "Der Papierlieferschein ist selten das Problem — der Weg vom Fahrzeug ins Büro ist es. Bis ein Beleg abgegeben, gesucht und erfasst ist, vergehen Tage, in denen die Rechnung nicht geschrieben werden kann.",
    sections: [
      {
        heading: "Erfassung dort, wo der Vorgang passiert",
        body: "Angaben können mobil erfasst und dem Büro unmittelbar bereitgestellt werden: Auftrag, Stellplatz oder Abladestelle, Zeitpunkt, Menge, Unterschrift, Foto. Was genau erfasst wird, wird vorher vereinbart — nicht jeder Betrieb braucht dasselbe Feld, und jedes zusätzliche Feld kostet Zeit auf dem Fahrzeug.",
      },
      {
        heading: "Anbindung an die Rechnungsstellung",
        body: "Eine Rechnungsanbindung wird passend zur vorhandenen Software vereinbart. Ob der Beleg exportiert, übergeben oder direkt verbucht wird, hängt davon ab, womit heute abgerechnet wird. Deshalb steht am Anfang ein Blick auf die vorhandenen Programme und nicht auf ein fertiges Produkt.",
      },
      {
        heading: "Was die Website für gewerbliche Auftraggeber leisten kann",
        body: "Gewerbliche Auftraggeber suchen nach Einsatzgebiet, Fahrzeugtypen, Containergrößen und Verfügbarkeit. Eine Website kann diese Angaben ohne Umweg zeigen und einen Anfrageweg anbieten, der die für ein Angebot nötigen Eckdaten gleich mit erfasst.",
      },
    ],
    faqs: [
      {
        q: "Was kostet ein digitaler Lieferschein?",
        a: `Eine gemeinsame Datenbasis mit einem ersten Prozessmodul beginnt bei ${automationOffer.combined}, ${automationOffer.run}. Der Umfang wird vorher festgelegt und steht im Angebot.`,
      },
      {
        q: "Funktioniert die Erfassung auch ohne Empfang?",
        a: "Das ist eine der Fragen, die vor der Beauftragung geklärt werden müssen, weil sie über die Bauweise entscheidet. Wo Funklöcher zum Alltag gehören, wird die Erfassung entsprechend ausgelegt.",
      },
      {
        q: "Müssen die Fahrer dafür geschult werden?",
        a: "Ein Ablauf, der eine Schulung braucht, ist falsch gebaut. Die Erfassung wird auf so wenige Schritte wie möglich ausgelegt und vor dem Echtbetrieb gemeinsam durchgegangen.",
      },
    ],
  },

  galabau: {
    seoTitle: "Website für Garten- und Landschaftsbau",
    seoDescription:
      "Website für GaLaBau-Betriebe in NRW: Projekte zeigen, Material und Termine im Blick behalten. Ab 690 €. Kostenloses Erstgespräch vor Ort.",
    h1: "Website für Garten- und Landschaftsbau: Projekte zeigen, Termine halten.",
    intro:
      "Der Garten- und Landschaftsbau verkauft ein Ergebnis, das man sehen muss. Gleichzeitig hängt die Marge daran, ob Material, Termine und Zuständigkeiten über eine ganze Saison zusammenpassen.",
    sections: [
      {
        heading: "Projekte sind das stärkste Argument",
        body: "Eine Bildstrecke vom Zustand vorher bis zum fertigen Garten überzeugt schneller als jede Leistungsliste. Eine Website kann abgeschlossene Projekte nach Art sortieren — Terrasse, Pflasterarbeiten, Bepflanzung, Zaun, Teich, Pflege — und für jede Art zeigen, was der Betrieb tatsächlich übernimmt.",
      },
      {
        heading: "Anfragen in der Hochsaison",
        body: "Zwischen März und Juni kommen die meisten Anfragen, oft genau dann, wenn niemand im Büro ist. Der Nachrichten-Assistent kann per WhatsApp und E-Mail antworten, die vereinbarten Angaben erfassen — Fläche, Ort, Vorstellung, Zeitraum — und Termine aus den freigegebenen Kalenderfenstern anbieten.",
      },
      {
        heading: "Material, Termine und Zuständigkeiten zusammenführen",
        body: "Ein abgestimmter Ablauf kann Materialinformationen, Termine und Zuständigkeiten an einer Stelle zusammenführen, statt sie über Zettel, Chats und Kalender zu verteilen. Fachliche Freigaben und die Planung der Kolonnen bleiben im Betrieb.",
      },
    ],
    faqs: [
      {
        q: "Was kostet eine Website für einen GaLaBau-Betrieb?",
        a: `${preisAnker} Für eine umfangreiche Projektgalerie ist meist Website Betrieb oder Signature die passende Stufe.`,
      },
      {
        q: "Können wir eigene Projektfotos verwenden?",
        a: "Ja, und das ist der Regelfall — eigene Bilder sind besser als jedes Stockfoto. Nutzungsrechte an fremden Medien werden im Angebot gesondert benannt.",
      },
      {
        q: "Lohnt sich das für einen Betrieb mit fünf Mitarbeitern?",
        a: `Das hängt davon ab, wie viele Anfragen pro Woche eingehen und was heute Zeit kostet. ${gebiet}`,
      },
    ],
  },

  metallbau: {
    seoTitle: "Website für Metallbau und Schlosserei",
    seoDescription:
      "Website für Metallbaubetriebe und Schlossereien in NRW: Angebots- und Dokumentationsschritte vereinfachen. Ab 690 €. Erstgespräch vor Ort.",
    h1: "Website für Metallbau: wiederkehrende Angebotsschritte vereinfachen.",
    intro:
      "Im Metallbau ist fast jeder Auftrag ein Einzelstück — und trotzdem wiederholen sich die Schritte bis zum Angebot jedes Mal. Genau dort, in den wiederkehrenden Schritten, liegt der Zeitgewinn.",
    sections: [
      {
        heading: "Was Auftraggeber vor der Anfrage wissen wollen",
        body: "Geländer, Treppen, Tore, Vordächer, Stahlbau, Schweißfachbetrieb-Qualifikationen: Auftraggeber prüfen zuerst, ob der Betrieb ihre Bauart und Größenordnung überhaupt fertigt. Eine Website kann gefertigte Bauteile, Materialien und typische Auftraggeber zeigen — mit Bildern der eigenen Arbeiten statt Katalogmotiven.",
      },
      {
        heading: "Angaben, die ein Angebot überhaupt möglich machen",
        body: "Ohne Maße, Material, Stückzahl, Montageort und Terminvorstellung lässt sich kein Angebot rechnen. Ein digitaler Anfrageweg kann diese Angaben strukturiert erfassen, statt sie über drei Rückrufe einzusammeln. Die Bewertung der Machbarkeit bleibt beim Betrieb.",
      },
      {
        heading: "Dokumentation zum Auftrag",
        body: "Aufmaße, Freigaben, Montagefotos und Übergabeprotokolle gehören zum Auftrag und nicht in ein separates Postfach. Ein abgestimmter Ablauf kann sie dem Vorgang zuordnen und dem Büro bereitstellen.",
      },
    ],
    faqs: [
      {
        q: "Was kostet eine Website für einen Metallbaubetrieb?",
        a: preisAnker,
      },
      {
        q: "Können auch Ausschreibungsunterlagen verarbeitet werden?",
        a: "Das wird im Einzelfall geprüft. Was strukturiert vorliegt, lässt sich in der Regel weiterverarbeiten; was als Scan kommt, nur eingeschränkt. Eine belastbare Aussage dazu gehört ins Angebot, nicht in ein Werbeversprechen.",
      },
      {
        q: "Wir haben schon eine Website — lohnt sich ein Wechsel?",
        a: "Nicht automatisch. Wenn die vorhandene Seite die Arbeiten zeigt und Anfragen erzeugt, ist der Nachrichten-Assistent oder ein Büroablauf oft der nützlichere erste Schritt. Was zuerst hilft, klären wir im Erstgespräch.",
      },
    ],
  },

  nutzfahrzeuge: {
    seoTitle: "Website für Nutzfahrzeug-Werkstätten",
    seoDescription:
      "Website und digitaler Werkstattauftrag für Nutzfahrzeug-Betriebe in NRW: Status und Freigaben bündeln. Ab 690 €. Erstgespräch vor Ort.",
    h1: "Website für Nutzfahrzeug-Werkstätten: Status und Freigaben bündeln.",
    intro:
      "Ein stehendes Fahrzeug kostet den Kunden Geld. Deshalb ist die häufigste Frage in der Nutzfahrzeug-Werkstatt nicht „was kostet es“, sondern „wann ist es fertig“ — und sie wird mehrmals am Tag gestellt.",
    sections: [
      {
        heading: "Status zum Werkstattauftrag",
        body: "Wo Statusauskünfte über Zurufe und Rückrufe laufen, kann ein abgestimmter Ablauf sie zum Auftrag bündeln: eingegangen, in Arbeit, Teil bestellt, Freigabe nötig, fertig. Das ersetzt keine Werkstattsoftware — es schließt die Lücke zwischen ihr und dem Kunden, der anruft.",
      },
      {
        heading: "Freigaben, die schriftlich vorliegen",
        body: "Eine Reparaturfreigabe, die telefonisch erteilt wurde, ist schwer zu belegen. Angaben, Fotos und Freigaben können dem Auftrag zugeordnet und festgehalten werden — inklusive Zeitpunkt und Person. Was davon nötig ist, hängt von Ihren Kunden und Ihrer Abrechnung ab.",
      },
      {
        heading: "Was die Website gewerblichen Flottenkunden zeigen muss",
        body: "Flottenverantwortliche prüfen Fahrzeugklassen, Marken, Prüfungen und Hauptuntersuchung, Ersatzteilversorgung und Erreichbarkeit — und ob es einen Hol- und Bringdienst gibt. Eine Website kann das ohne Umweg beantworten, statt es im Erstgespräch abzufragen.",
      },
    ],
    faqs: [
      {
        q: "Was kostet eine Website für eine Nutzfahrzeug-Werkstatt?",
        a: preisAnker,
      },
      {
        q: "Ersetzt das unsere Werkstattsoftware?",
        a: "Nein. Der Ansatz ist ausdrücklich, die vorhandene Software zu behalten und die Lücken zu schließen, die sie offenlässt — meist bei Status, Freigaben und Übergabe an den Kunden.",
      },
      {
        q: "Kommen Sie zu uns in den Betrieb?",
        a: gebiet,
      },
    ],
  },
};
