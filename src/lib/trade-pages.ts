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
    bridge: string;
    nextTitle: string;
    nextBody: string;
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
      "Auf der Baustelle ist das Team oft nicht am Telefon. Anfragen zu Sanierungen kommen trotzdem an, häufig als Textnachricht, während die Arbeit auf dem Dach weitergeht. Interessenten wollen vorher erkennen, welche Dacharbeiten der Betrieb übernimmt, ob es Referenzen gibt und ob eine Besichtigung überhaupt infrage kommt. Steht das nur im Rückruf, fehlt der Überblick, bevor jemand Zeit hat.",
      "Eine Website kann Dacharbeiten, Referenzen und das Einsatzgebiet so zeigen, dass der Weg zur Anfrage ohne Umweg erkennbar ist. Für planbare Anfragen kann der Nachrichten-Assistent Angaben zum Vorhaben erfassen und Besichtigungstermine aus dem angebundenen Kalender anbieten. Er bearbeitet Textnachrichten per WhatsApp und E-Mail, keine Anrufe. Website und Assistent sind einzeln beauftragbar. Welche Kombination passt, hängt vom bisherigen Anfrageweg und von der Auslastung ab, nicht von einer pauschalen Paketzuordnung.",
      "Die fachliche Beurteilung bleibt im Dachdeckerbetrieb. Ob saniert werden muss, wie dringend ein Schaden ist und welche Ausführung passt, entscheiden nicht die Website und nicht der Assistent. Die Produktdemo zeigt eine mögliche Gestaltung mit Bildern, Leistungsbeschreibung und Anfrageweg. Sie ist eine Demo und kein Echtbetrieb. Dieses Anwendungsbeispiel ist keine Referenz und keine Kundenliste.",
      "Welche Inhalte schon vorliegen, entscheidet mit über die Stufe. Ein kompakter Einseiter genügt oft, wenn Leistungen, Betrieb und Kontakt auf einer Seite reichen. Mehrere Arbeiten und einzelne Referenzen brauchen mehr Raum. Eine individuelle Gestaltung ist möglich, aber keine Pflicht. Im kostenlosen Gespräch von 90 Minuten vor Ort sehen wir uns an, wie Anfragen heute ankommen. Den Umfang, den Zeitrahmen und den Festpreis halten wir danach im Projektplan fest.",
      "Tragfähig wird die Seite durch Bilder abgeschlossener Dächer, eine verständliche Liste der Arbeiten und ein erkennbares Einsatzgebiet. Fehlt davon etwas, klären wir, was Sie nachreichen und was im Angebot als Text entsteht. Eine Website ersetzt nicht das Gespräch auf dem Dach. Sie sorgt dafür, dass Interessenten vorher sehen, ob sich eine Besichtigung lohnt.",
    ],
    bridge:
      "Wie eine solche Website für einen Dachdeckerbetrieb aufgebaut sein kann, ohne die Paketseite zu wiederholen, steht bei",
    nextTitle: "Besichtigungen und Auftritt für Ihren Dachbetrieb klären.",
    nextBody:
      "Vor Ort in Nordrhein-Westfalen schauen wir auf Sanierungsanfragen, vorhandene Bilder und den Weg zur Besichtigung. Das Gespräch dauert 90 Minuten und ist kostenlos. Eine feste Dauer der Umsetzung nennen wir erst im Projektplan, wenn der Umfang klar ist.",
    leistung: { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
    second: { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
    hub: {
      heading: "Sanierungsprojekte zeigen. Besichtigungen vorbereiten.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Website und Nachrichten-Assistent — je nach Anfrageweg.",
      paragraphs: [
        "Dacharbeiten und Referenzen können online erklärt werden. Bei planbaren Anfragen lassen sich Angaben und Besichtigungswünsche per Textnachricht vorbereiten. Die fachliche Entscheidung über das Dach bleibt im Betrieb.",
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
      "In einem SHK-Betrieb laufen geplante Badsanierungen und kurzfristige Servicemeldungen oft über denselben Eingang. Während das Team beim Kunden ist, sammeln sich WhatsApp-Nachrichten und E-Mails mit halben Angaben: Ort, ungefähre Aufgabe, manchmal ein Foto, selten der richtige Ansprechpartner. Zurückrufen heißt dann nachfragen, was schon in der ersten Nachricht hätte stehen können.",
      "Ein abgestimmter Ablauf kann Angaben zu Badsanierung, Wartung oder Service strukturiert erfassen und beim passenden Ansprechpartner bündeln. Der Nachrichten-Assistent fragt die vereinbarten Punkte ab und kann Termine aus dem angebundenen Kalender anbieten, wenn die Anfrage planbar ist. Eine Website zeigt zusätzlich, welche Arbeiten der Betrieb übernimmt und in welchem Gebiet er unterwegs ist. Beides ist einzeln beauftragbar.",
      "Fachliche Dringlichkeit und die Einsatzentscheidung bleiben bei den zuständigen Personen im Betrieb. Der Assistent trifft keine Notfallentscheidung und nimmt keine Telefonanrufe an. Ob eine Meldung warten kann oder sofort jemanden braucht, beurteilt der Fachbetrieb. Das hier ist ein Anwendungsbeispiel für SHK und Haustechnik, kein Referenzprojekt und keine Zusage, dass jeder Eingang gleich behandelt wird.",
      "Im Gespräch von 90 Minuten vor Ort prüfen wir den heutigen Anfrageweg: was sich wiederholt, welche Angaben fehlen und ob zuerst der Assistent, eine Website oder ein Büroablauf den passenden Anfang macht. Den Zeitrahmen halten wir im Projektplan fest, den Sie vor der Beauftragung erhalten. Zusätzliche Wünsche werden vor der Umsetzung gesondert angeboten.",
      "Für SHK heißt das konkret: Bad, Wartung und Service dürfen verschiedene Angaben verlangen. Wir legen vorher fest, welche Fragen der Assistent stellt und ab wann ein Mensch übernimmt. Eine Notfallentscheidung bleibt außerhalb. Die Website, falls sie fehlt, erklärt die Arbeiten und das Gebiet, ohne die Meldungen selbst zu sortieren.",
    ],
    bridge:
      "Den Aufbau einer Website für diesen Betrieb, getrennt von der SHK-Einordnung hier, beschreibt",
    nextTitle: "Servicemeldungen und geplante SHK-Projekte sortieren.",
    nextBody:
      "Wir sehen uns an, welche Angaben zu Bad, Wartung oder Service heute fehlen, bevor jemand zurückruft. 90 Minuten vor Ort, kostenlos. Dringlichkeit bleibt bei Ihrem Team. Den Umfang schreiben wir in den Projektplan, nicht in eine pauschale Zusage.",
    leistung: { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
    second: { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
    hub: {
      heading: "Geplante Projekte und Servicemeldungen geordnet erfassen.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Abgestimmter digitaler Ablauf — Dringlichkeit bleibt im Betrieb.",
      paragraphs: [
        "Angaben zu Badsanierung, Wartung oder Service können strukturiert ankommen. Welche Meldung dringend ist, entscheiden die zuständigen Personen im Betrieb, nicht ein Formular.",
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
      "Zwischen Baustelle und Büro geht bei Elektroarbeiten oft der Zusammenhang verloren. Fotos liegen im Handy, Freigaben in einer Nachricht, der Auftrag in einem anderen Programm. Wer später nachvollziehen will, was erledigt wurde, sucht in mehreren Kanälen. Das kostet Rückfragen, obwohl die Information unterwegs schon entstanden ist.",
      "Ein Büroablauf kann Angaben, Fotos und Freigaben dem jeweiligen Auftrag zuordnen und dem Büro bereitstellen. Welche Nachweise für Ihren Anwendungsfall erforderlich sind, wird fachlich geklärt und im Angebot festgehalten, nicht pauschal erfunden. Eine Website kann parallel zeigen, welche Arbeiten der Betrieb übernimmt und wie man anfragt. Sie ersetzt keine Dokumentation der ausgeführten Arbeit.",
      "Was nicht automatisiert wird: die fachliche Verantwortung. Ob eine Anlage freigegeben ist, welche Norm gilt und wer unterschreibt, bleibt bei den zuständigen Personen im Betrieb. Ein digitaler Ablauf übergibt Informationen. Er erteilt keine verbindliche Auskunft und ersetzt keine vorhandene Branchensoftware, die zuverlässig arbeitet. Eine Verbindung wird nur dort eingerichtet, wo sie vereinbart ist.",
      "Das Ziel ist eine verlässlichere Übergabe, kein fertiges Komplettsystem am ersten Tag. Datenbasis und ein Prozessmodul sind der beschriebene Einstieg. Weitere Anschlüsse stehen einzeln im Angebot. Im Gespräch von 90 Minuten vor Ort klären wir, wer den Ablauf täglich nutzt und welche Informationen das Büro wirklich braucht. Den Zeitrahmen hält der Projektplan fest.",
      "Typisch für Elektrotechnik ist die Frage, welches Foto zu welchem Auftrag gehört und wer die Freigabe gesehen hat. Der Ablauf hält diese Zuordnung fest, soweit die Daten vorliegen. Er prüft keine Anlage und ersetzt kein Messprotokoll. Was fachlich erforderlich ist, benennen die zuständigen Personen, bevor wir Felder einrichten.",
    ],
    bridge:
      "Wenn der Betrieb seine Arbeiten auch online zeigen will, führt der Überblick zu",
    nextTitle: "Übergabe zwischen Baustelle und Büro besprechen.",
    nextBody:
      "Wir klären, welche Fotos und Freigaben dem Auftrag heute fehlen und welches Programm bleiben soll. 90 Minuten vor Ort, kostenlos. Fachliche Nachweise bleiben in Ihrer Verantwortung. Der Projektplan nennt Umfang und Zeitrahmen vor der Beauftragung.",
    leistung: { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
    second: { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
    hub: {
      heading: "Erbrachte Arbeiten nachvollziehbar dokumentieren.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Dokumentation und Übergabe zwischen Baustelle und Büro.",
      paragraphs: [
        "Angaben, Fotos und Freigaben können einem Auftrag zugeordnet und dem Büro bereitgestellt werden. Welche Nachweise nötig sind, wird fachlich geklärt. Die Verantwortung bleibt im Betrieb.",
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
      "Bei Kälte- und Klimaanlagen beginnt der Einsatz oft mit einer unvollständigen Meldung. Jemand schreibt, dass eine Anlage steht, nennt aber weder die Nummer noch das Fehlerbild, und das Foto kommt in einer zweiten Nachricht. Der Techniker fährt dann mit dem, was gerade greifbar ist, und fragt vor Ort nach, was vorher hätte vorliegen können.",
      "Eine strukturierte Meldung kann Anlagennummer, beobachteten Fehler und vorhandene Fotos erfassen, bevor jemand losfährt. Der Nachrichten-Assistent stellt die vereinbarten Fragen per WhatsApp oder E-Mail und kann, wenn es kein Notfall ist, Termine aus dem angebundenen Kalender anbieten. Ein anschließender Büroablauf kann dieselben Angaben später der weiteren Bearbeitung bereitstellen. Beides wird nur vereinbart, wenn der Anfrageweg das hergibt.",
      "Diagnose, Dringlichkeit und die notwendige Dokumentation beurteilt der Fachbetrieb. Der Assistent stellt keine technische Diagnose und trifft keine Notfallentscheidung. Telefonanrufe nimmt er nicht an. Dieses Beispiel beschreibt, wie Angaben zusammenkommen können. Es ist kein Referenzprojekt und kein Versprechen, dass jede Störung aus der Ferne eingeordnet wird.",
      "Ob zuerst die Meldung oder die weitere Verarbeitung im Büro sinnvoll ist, sehen wir im kostenlosen Gespräch von 90 Minuten vor Ort. Wir prüfen WhatsApp, E-Mail und Kalender vorab, wenn der Assistent infrage kommt. Den Umfang und den Zeitrahmen schreiben wir in den Projektplan. Die Website des Betriebs, falls sie fehlen sollte, ist ein eigener Baustein und nicht Voraussetzung für die Meldung.",
      "Für Kälte- und Klimatechnik zählt, dass Anlagennummer, Fehlerbild und Fotos zusammen ankommen, bevor jemand losfährt. Der Assistent stellt nur die Fragen, die wir vorher festgelegt haben. Er deutet den Fehler nicht. Ob der Einsatz warten kann, entscheidet der Betrieb. Eine Website kann die angebotenen Arbeiten zeigen, sie diagnostiziert keine Anlage.",
    ],
    bridge:
      "Eine Website, die Leistungen und Einsatzgebiet des Kältebetriebs zeigt, ist gesondert beschrieben unter",
    nextTitle: "Anlagenmeldungen vor dem Einsatz sortieren.",
    nextBody:
      "Wir prüfen, ob Anlagennummer, Fehlerbild und Fotos heute verstreut ankommen. 90 Minuten vor Ort, kostenlos. Die Diagnose bleibt bei Ihren Technikern. Den Zeitrahmen halten wir im Projektplan fest, bevor Sie beauftragen.",
    leistung: { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
    second: { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
    hub: {
      heading: "Anlageninformationen vor dem Einsatz zusammenführen.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Strukturierte Meldung — fachliche Bewertung bleibt im Betrieb.",
      paragraphs: [
        "Anlagennummer, beobachteter Fehler und vorhandene Fotos können in einer Meldung zusammenkommen. Diagnose und Dringlichkeit beurteilt der Fachbetrieb.",
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
      "Im Containerdienst und in der Spedition entstehen die entscheidenden Angaben oft am Einsatzort: welche Lieferung, welche Standzeit, welcher Auftrag. Kommen sie als Zettel oder als Sprachnachricht ins Büro, tippt jemand sie später noch einmal ab. Rückfragen entstehen, wenn eine Angabe fehlt, die vor Ort schon bekannt war.",
      "Ein digitaler Lieferschein kann Angaben zu Lieferung, Standzeit und Auftrag mobil erfassen und für die weitere Bearbeitung bereitstellen. Eine Rechnungsanbindung wird nur vereinbart, wenn sie zur vorhandenen Software passt. Vorhandene Programme, die zuverlässig arbeiten, bleiben. Der Ablauf ist kein Ersatz für die kaufmännische Software und kein vollständiges Transportmanagement.",
      "Welche Angaben und welche Freigaben nötig sind, klären wir am konkreten Ablauf, nicht an einem Musterbetrieb. Fachliche und kaufmännische Entscheidungen bleiben bei den zuständigen Personen. Eine Website kann den Betrieb zusätzlich erklären, ist aber ein eigener Baustein und nicht Teil des Lieferscheins. Dieses Anwendungsbeispiel ist keine Referenz und nennt keine Umsätze.",
      "Der beschriebene Einstieg ist eine gemeinsame Datenbasis plus ein Prozessmodul. Weitere Abläufe stehen einzeln im Angebot, ohne monatliche Betreuung in diesem Einstieg. Im Gespräch von 90 Minuten vor Ort sehen wir uns an, wo die Übergabe heute bricht. Den Zeitrahmen und den Festpreis hält der Projektplan fest, den Sie vor der Beauftragung erhalten.",
      "Bei Spedition und Container geht es um die Angaben, die am Fahrzeug oder am Stellplatz entstehen und im Büro noch einmal abgetippt werden. Standzeit, Auftrag und Lieferung sollen einmal erfasst werden. Was danach in die Rechnung wandert, klären wir nur, wenn die vorhandene Software das hergibt. Kein Muster ersetzt diesen Blick in den konkreten Ablauf.",
    ],
    bridge:
      "Soll der Betrieb online zusätzlich erklären, welche Transporte er übernimmt, beginnt das bei",
    nextTitle: "Lieferschein vom Einsatz ins Büro bringen.",
    nextBody:
      "Wir schauen auf Lieferung, Standzeit und Auftrag und darauf, welches Programm bleiben soll. 90 Minuten vor Ort, kostenlos. Eine Rechnungsanbindung nur, wenn sie zur vorhandenen Software passt. Umfang und Zeitrahmen stehen im Projektplan.",
    leistung: { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
    second: { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
    hub: {
      heading: "Lieferscheine vom Einsatz ins Büro bringen.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Digitaler Lieferschein — Rechnungsanbindung nach vorhandener Software.",
      paragraphs: [
        "Angaben zu Lieferung, Standzeit und Auftrag können mobil erfasst und dem Büro bereitgestellt werden. Eine Verbindung zur Rechnung nur passend zur vorhandenen Software.",
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
      "Im Garten- und Landschaftsbau hängen Material, Termine und Zuständigkeiten aneinander. Fehlt auf der Baustelle, was bestellt sein sollte, oder weiß das Büro nicht, wer am nächsten Morgen wo ist, entstehen Anrufe, die der Ablauf selbst schon beantworten könnte. Abgeschlossene Arbeiten sind oft nur als Foto auf dem Handy sichtbar und nicht als Referenz für den nächsten Interessenten.",
      "Ein abgestimmter Ablauf kann Materialinformationen, Termine und Zuständigkeiten zusammenführen, soweit diese Angaben im Betrieb zuverlässig vorliegen. Eine Website kann abgeschlossene Arbeiten und die angebotenen Leistungen zeigen und einen klaren Weg zur Anfrage bieten. Ob zuerst die Planung oder der Auftritt kommt, richtet sich nach dem Bedarf, nicht nach einer festen Reihenfolge. Beide Bausteine sind einzeln beauftragbar.",
      "Fachliche Freigaben bleiben im Betrieb. Der Ablauf entscheidet nicht, welches Material fachlich richtig ist und wer einen Einsatz verbindlich zusagt. Er macht vorhandene Informationen an einer Stelle nutzbar. Das Beispiel ist kein Referenzgarten und kein Kundenprojekt. Es beschreibt eine mögliche Ordnung, keine fertige Branchenlösung.",
      "Im kostenlosen Gespräch von 90 Minuten vor Ort sehen wir uns an, wo Material und Termine heute auseinanderlaufen und welche Bilder für eine Website schon da sind. Den Umfang halten wir im Projektplan fest, einschließlich Zeitrahmen und Festpreis. Zusätzliche Wünsche bieten wir vor der Umsetzung gesondert an.",
      "Im Garten- und Landschaftsbau sind die Fotos abgeschlossener Flächen oft schon da, die Zuordnung zu Material und Termin aber nicht. Eine Website kann die Arbeiten zeigen. Ein Ablauf kann halten, wer wann welches Material braucht. Was davon den Anfang macht, hängt davon ab, wo heute die meisten Rückfragen entstehen, nicht von einer festen Reihenfolge.",
    ],
    bridge:
      "Wie die Website-Stufen für einen solchen Betrieb aussehen, ohne hier Pakete nachzuerzählen, steht unter",
    nextTitle: "Material, Termine und Auftritt für den GaLaBau klären.",
    nextBody:
      "Wir prüfen, ob zuerst der Ablauf oder die Darstellung abgeschlossener Arbeiten fehlt. 90 Minuten vor Ort, kostenlos. Freigaben bleiben bei Ihnen. Den Zeitrahmen schreibt der Projektplan fest, bevor etwas beauftragt wird.",
    leistung: { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
    second: { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
    hub: {
      heading: "Material und Einsätze gemeinsam im Blick behalten.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Ablauf und Website — je nach Bedarf des Betriebs.",
      paragraphs: [
        "Materialinformationen, Termine und Zuständigkeiten können in einem Ablauf zusammenkommen. Eine Website kann abgeschlossene Arbeiten zeigen. Was zuerst kommt, hängt vom Betrieb ab.",
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
      "Im Metallbau wiederholen sich Angebots- und Dokumentationsschritte, während die Kalkulation oft schon in einer Spezialsoftware liegt. Projektangaben und Freigaben wandern daneben per E-Mail oder Ausdruck. Wer ein Angebot fortschreibt, sucht Positionen an zwei Stellen. Das bremst, ohne dass die vorhandene Software schlecht wäre.",
      "Ein passender Ablauf kann vorhandene Positionen, Projektangaben und Freigaben zusammenführen, dort wo die tägliche Arbeit eine Lücke hat. Spezialsoftware für Kalkulation oder Fertigung wird berücksichtigt und nicht ersetzt, wenn sie zuverlässig arbeitet. Gemeinsam wird geprüft, wo eine Verbindung unterstützt und wo sie stört. Eine Website kann die Arbeiten des Betriebs zusätzlich zeigen. Sie ist nicht der Angebotsprozess.",
      "Was nicht passiert: eine pauschale Übernahme der Kalkulation. Fachliche Freigaben und die Verantwortung für Maße, Statik und Ausführung bleiben im Betrieb. Der Ablauf übergibt vereinbarte Informationen. Er erfindet keine Positionen und trifft keine technische Freigabe. Dieses Anwendungsbeispiel ist kein Kundenauftrag und keine Aussage über eine bestimmte Werkstattsoftware.",
      "Datenbasis und ein erstes Prozessmodul sind der beschriebene Einstieg, ohne monatliche Betreuung in diesem Paket. Weitere Anschlüsse werden im Angebot ausgewiesen. Im Gespräch von 90 Minuten vor Ort sehen wir die vorhandenen Programme und den ersten Schritt, der sich lohnt. Den Zeitrahmen halten wir im Projektplan fest.",
      "Im Metallbau lohnt der erste Schritt meist dort, wo Angebotspositionen und Freigaben neben der Kalkulationssoftware herlaufen. Wir schließen nichts an, was die tägliche Arbeit verlangsamt. Maße, Ausführung und die technische Freigabe bleiben bei den Personen, die sie heute verantworten. Die Website ist davon getrennt und zeigt die Arbeiten nach außen.",
    ],
    bridge:
      "Die Website, falls der Betrieb seine Arbeiten auch öffentlich zeigen will, ist eigener Gegenstand von",
    nextTitle: "Angebotsschritte und vorhandene Software ansehen.",
    nextBody:
      "Wir prüfen, welche Positionen und Freigaben heute neben der Spezialsoftware herlaufen. 90 Minuten vor Ort, kostenlos. Kalkulation und technische Freigabe bleiben bei Ihnen. Der Projektplan nennt den ersten Ablauf und den Zeitrahmen.",
    leistung: { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
    second: { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
    hub: {
      heading: "Wiederkehrende Angebots- und Dokumentationsschritte vereinfachen.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Verbindung vorhandener Schritte — Spezialsoftware bleibt berücksichtigt.",
      paragraphs: [
        "Positionen, Projektangaben und Freigaben können zusammenkommen, ohne die Spezialsoftware für Kalkulation oder Fertigung zu verdrängen. Geprüft wird, wo eine Verbindung die tägliche Arbeit stützt.",
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
      "In der Nutzfahrzeug- und Landmaschinenwerkstatt fragen Kunden nach dem Stand, während der Auftrag im Werkstattsystem liegt. Freigaben für Zusatzarbeiten kommen per Telefon oder Nachricht und sind später schwer dem richtigen Auftrag zuzuordnen. Wer verbindlich sagt, wann das Fahrzeug fertig ist, braucht den aktuellen Stand und die offene Freigabe an einer Stelle.",
      "Ein angebundener Ablauf kann Informationen zum Bearbeitungsstand und zu benötigten Freigaben bereitstellen, wenn diese Daten im vorhandenen Werkstattsystem zuverlässig verfügbar sind. Dafür wird festgelegt, welche Felder genutzt werden und wer verbindliche Auskünfte erteilt. Der Nachrichten-Assistent kann, getrennt davon, Textanfragen annehmen und Termine anbieten. Er ersetzt nicht die Auskunft der Werkstatt und nicht das Werkstattsystem.",
      "Solche Funktionen werden passend zum System vereinbart, nicht als fertige Branchenapp. Diagnose, Reparaturumfang und die Zusage gegenüber dem Kunden bleiben bei den zuständigen Personen. Ein digitaler Schritt stellt Informationen bereit. Er entscheidet nicht, ob ein Teil getauscht wird. Das Beispiel ist kein Referenzbetrieb und kein Versprechen über eine bestimmte Softwaremarke.",
      "Im kostenlosen Gespräch von 90 Minuten vor Ort sehen wir uns an, welche Rückfragen sich wiederholen und welche Daten das System schon hergibt. Website, Assistent und Ablauf sind einzeln beauftragbar. Den Umfang und den Zeitrahmen hält der Projektplan fest, den Sie vor der Beauftragung lesen. Zusätzliche Anschlüsse werden vorher gesondert angeboten.",
      "Bei Nutzfahrzeugen und Landmaschinen ist die wiederkehrende Frage oft der Stand des Auftrags und die offene Freigabe für eine Zusatzarbeit. Der Ablauf stellt bereit, was das Werkstattsystem schon kennt. Er verspricht keinen Fertigtermin und ersetzt nicht die Person, die dem Kunden verbindlich antwortet. Welche Felder zuverlässig sind, prüfen wir am vorhandenen System.",
    ],
    bridge:
      "Wie eine Website den Werkstattbetrieb nach außen erklärt, ohne dieses Beispiel zu wiederholen, steht unter",
    nextTitle: "Status und Freigaben am Werkstattauftrag klären.",
    nextBody:
      "Wir prüfen, welche Rückfragen zum Bearbeitungsstand heute am Telefon landen und was das Werkstattsystem schon hergibt. 90 Minuten vor Ort, kostenlos. Verbindliche Auskünfte bleiben bei Ihrem Team. Der Zeitrahmen steht im Projektplan.",
    leistung: { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
    second: { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
    hub: {
      heading: "Status und Freigaben zum Werkstattauftrag bündeln.",
      stuck: "Anwendungsbeispiel, kein Referenzprojekt.",
      level: "Angebundener Ablauf — passend zum Werkstattsystem.",
      paragraphs: [
        "Bearbeitungsstand und benötigte Freigaben können bereitgestellt werden, wenn die Daten im Werkstattsystem zuverlässig vorliegen. Wer verbindlich auskunftet, wird vorher festgelegt.",
      ],
    },
  },
};
