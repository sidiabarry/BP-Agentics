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
      stuck: string;
      level: string;
      paragraphs: string[];
    };
  }
> = {
  dachdecker: {
    metaTitle: "Dachdecker-Website Hagen",
    metaDescription:
      "Dachdecker in Hagen: Signature-Website plus KI-Setter. Besichtigungen, während Sie auf dem Dach stehen.",
    question: "Was braucht ein Dachdeckerbetrieb in Hagen zuerst?",
    answer:
      "Ein Dachdeckerbetrieb in Hagen braucht zuerst Annahme und einen Auftritt, der Sanierung vor dem Preiskampf zeigt — nicht eine Mailbox und eine Seite von 2016.",
    local:
      "Steildach, Flachdach, Abdichtung, Sturm: Die Anfrage kommt, während die Kolonne auf dem Gerüst ist. Iserlohn, Schwelm, Ennepe-Ruhr-Kreis dieselbe Lage.",
    body: [
      "Die Website filtert. Signature zeigt das Gewerk, bevor jemand drei Angebote einholt. Der Setter legt zwei Besichtigungsslots in den Meisterkalender. Sie bleiben auf dem Dach.",
      "Betrieb ohne Bürokraft ganztags: Das Festnetz ist der Engpass. Eine neue Visitenkarte ändert das nicht. Deshalb die Konfiguration Signature plus KI-Setter, nachrüstbar um Abläufe, wenn Aufmaß und Rechnung den Abend fressen.",
    ],
    leistung: { href: "/leistungen/auftritt", label: "Website Signature für den Auftritt" },
    second: { href: "/leistungen/annahme", label: "KI-Setter für Besichtigungen" },
    hub: {
      stuck:
        "Sanierungs- und Steildachanfragen bleiben liegen, sobald der Meister auf der Baustelle ist.",
      level:
        "Auftritt plus Annahme: Signature filtert Preiskämpfer, der KI-Setter legt zwei Besichtigungsslots in den Meisterkalender.",
      paragraphs: [
        "Steildach, Flachdach, Abdichtung, Sturm: Die Nachricht kommt, während die Kolonne auf dem Gerüst in Hagen, Iserlohn oder Schwelm steht. Im Ennepe-Ruhr-Kreis dasselbe Bild. Bis der Meister abends die Mailbox öffnet, hat der Bauherr drei andere Betriebe gefragt. Was liegen bleibt, ist nicht die Arbeit auf dem Dach. Es ist die Annahme und die richtige Anfrage.",
        "Eine Seite von 2016 mit Stockfoto und dem Satz „kostenloses Angebot“ holt den Kunden, der Preise gegeneinander setzt. Signature zeigt Gewerk, Einzugsgebiet und Anspruch, bevor jemand anruft. Der Setter antwortet in Sekunden mit zwei freien Slots. Die Zusage sitzt im Meisterkalender. Sie bleiben auf dem Dach.",
        "Betrieb ohne Bürokraft ganztags: Das Festnetz ist der Engpass. Eine neue Visitenkarte ändert das nicht. Abläufe für Aufmaß und Rechnung kommen, wenn der Abend unter Zetteln begraben ist — nicht als erstes System. MID Digitale Prozesse trägt hier selten die öffentliche Fläche; die innere Annahme schon, wenn der Prozess neu ist und vor dem Bescheid nicht begonnen hat.",
        "Die gebaute Demo sitzt unter Referenzen, nicht in diesem Abschnitt. Wer Signature für das eigene Dach prüfen will, bringt Fotos und die drei letzten Anfragen mit. Dann sehen wir, ob Start, Betrieb oder Signature der richtige Schnitt ist — und ob der Setter parallel muss. Das Erstgespräch dauert neunzig Minuten und findet im Betrieb statt, nicht in einem Agenturfoyer. Anschrift und Telefon bleiben Kleiststraße 9, 58095 Hagen, +49 162 2843869.",
      ],
    },
  },
  "shk-haustechnik": {
    metaTitle: "SHK-Systeme Hagen und NRW",
    metaDescription:
      "SHK und Haustechnik: Notdienst triagieren, Sanierung planen. KI-Setter plus Fundament, aus Hagen.",
    question: "Wie trennt ein SHK-Betrieb Notdienst und Sanierung?",
    answer:
      "Ein SHK-Betrieb trennt Notdienst und Sanierung, indem der Setter zuerst fragt, ob die Heizung aus ist oder das Bad geplant wird — und nur echte Havarien nachts durchstellt.",
    local:
      "Hagen, Witten, Lüdenscheid: dieselbe Nummer für beide Welten überlastet die Bereitschaft. Schadensfotos und Monteurbericht gehören in ein Fundament, nicht auf den Messengercourse des Gesellen.",
    body: [
      "Planbare Badsanierung darf nicht hinter dem Heizungsausfall verschwinden. Der Setter sortiert. Das Fundament hält Kunden, Anlagen und Termine, damit der Monteur nicht zweimal fährt.",
      "MID Digitale Prozesse kann genau diese innere Trennung treffen. Die öffentliche Badgalerie ist Website Betrieb oder Signature — getrennt beauftragt, nicht in denselben Förderantrag gemischt.",
    ],
    leistung: { href: "/leistungen/annahme", label: "KI-Setter für Notdienst und Sanierung" },
    second: { href: "/leistungen/ablaeufe", label: "Fundament für Monteurberichte" },
    hub: {
      stuck:
        "Planbare Badsanierung verschwindet hinter dem Heizungsausfall, weil beide über dieselbe Nummer laufen.",
      level:
        "Annahme plus Abläufe: der Setter triagiert nachts, Fotos und Monteurbericht liegen im Fundament, nicht im Messenger des Gesellen.",
      paragraphs: [
        "Hagen, Witten, Lüdenscheid: dieselbe Mobilnummer für tropfenden Kessel und geplantes Bad überlastet die Bereitschaft. Wer nachts durchstellt, weil niemand fragt, ob die Heizung aus ist oder nur die Armatur tropft, zahlt Gesellenstunden für Fälle, die bis Montag warten könnten. Was liegen bleibt, ist die Trennung. Die Sanierung rutscht in den Kalender hinter die Havarie und wird nie sauber geplant.",
        "Der Setter fragt zuerst, ob Wärme fehlt oder das Bad geplant wird. Nur echte Ausfälle gehen nachts durch. Schadensfotos hängen an der Meldung, nicht in einem Chatverlauf, den niemand ins Büro überträgt. Das Fundament hält Kunden, Anlagen und Termine, damit der Monteur nicht zweimal fährt, weil der Bericht auf dem Beifahrersitz liegt.",
        "Die öffentliche Badgalerie ist Auftritt — Betrieb oder Signature, getrennt beauftragt. MID Digitale Prozesse trifft hier eher den inneren Schnitt: Triage, Bericht, Disposition. Die Galerie gehört nicht in denselben Förderantrag. Wer beides in ein Paket mischt, riskiert einen Bescheid, der die Website streicht, oder ein System, das nachts niemand bedient.",
        "Es gibt hier keine gebaute Demo unter Referenzen. Der Engpass ist die Nummer, nicht fehlende Fliesenfotos. Wer prüfen will, ob Setter plus Fundament der Schnitt ist, bringt die letzten zehn Notdienstnotizen und drei liegengebliebene Sanierungsanfragen mit. Dann sehen wir, was der Katalog fragen muss — und was ins Modul gehört. Das Gespräch ist im Betrieb, neunzig Minuten, ohne Folie.",
      ],
    },
  },
  elektrotechnik: {
    metaTitle: "Elektro Nachweise nach VOB",
    metaDescription:
      "Elektrotechnik auf Großbaustellen: Bautagesberichte mit Unterschrift, solange der Auftraggeber da ist.",
    question: "Warum bleiben Regiestunden in der Elektrotechnik unbezahlt?",
    answer:
      "Regiestunden bleiben unbezahlt, weil Zusatzarbeiten nicht erfasst werden, solange der Generalunternehmer noch auf der Fläche steht.",
    local:
      "Witten, Hagen, Märkischer Kreis: VOB/B-Nachweise sterben im Stundenzettel, der abends im Auto liegt. Papier aufs Handy heißt Unterschrift jetzt, Export ins Büro sofort.",
    body: [
      "Das Fundament trägt den Auftrag. Das Modul trägt den Bautagesbericht. Keine Branchensoftware mit zwanzig ungenutzten Masken. Ein Ablauf, der weh tut, wird geschlossen.",
      "Eine Website holt hier selten den Engpass. Wer trotzdem gefunden werden will, nimmt Betrieb. Der Setter hilft auf der Bereitschaft, nicht auf der Großbaustelle.",
    ],
    leistung: { href: "/leistungen/ablaeufe", label: "Abläufe: Papier aufs Handy und Nachweis" },
    second: { href: "/leistungen/auftritt", label: "Website Betrieb, wenn der Auftritt schweigt" },
    hub: {
      stuck:
        "Regiestunden bleiben unbezahlt, weil der Nachweis fehlt, sobald der Generalunternehmer die Fläche verlassen hat.",
      level:
        "Abläufe zuerst: Bautagesbericht mit Unterschrift jetzt, Export ins Büro sofort — keine Branchensoftware mit zwanzig leeren Masken.",
      paragraphs: [
        "Witten, Hagen, Märkischer Kreis: VOB/B-Nachweise sterben im Stundenzettel, der abends im Auto liegt. Zusatzarbeiten sind erledigt, der Auftraggeber ist weg, die Erinnerung sitzt im Kopf des Gesellen. Gegenüber dem GU fehlt die Unterschrift vom selben Tag. Was liegen bleibt, ist nicht die Installation. Es ist der Beleg, der die Stunde bezahlbar macht.",
        "Das Fundament trägt den Auftrag. Das Modul trägt den Bautagesbericht. Papier aufs Handy heißt: Unterschrift, solange der Bauleiter noch da ist, Foto der Fläche, Zeitstempel, Export, bevor die Kolonne den Container schließt. Kein ERP, das niemand öffnet. Ein Ablauf, der weh tut, wird geschlossen. Der Geselle tippt das, was er sowieso gesehen hat — nicht eine zweite Wahrheit fürs Büro.",
        "Eine Website holt hier selten den Engpass. Wer trotzdem gefunden werden will, nimmt Betrieb — Leistungsseiten, Einzugsgebiet, ohne Choreografie. Der Setter hilft auf der Bereitschaft, nicht auf der Großbaustelle, wo der Nachweis zählt. MID Digitale Prozesse liegt hier oft näher als Signature, weil der Gegenstand der innere Prozess ist.",
        "Es gibt keine Video-Demo für diesen Schnitt. Wer prüfen will, bringt drei unbezahlte Nachträge und den letzten Stundenzettel mit. Im Gespräch legen wir fest, welches Feld der Bericht braucht und wohin der Export geht. DATEV oder die vorhandene Bürosoftware bleiben; wir schließen den Bruch zwischen Fläche und Ordner. Das Erstgespräch ist kostenlos, neunzig Minuten, vor Ort in Hagen oder auf der Baustelle, die den Nachweis kostet.",
      ],
    },
  },
  kaeltetechnik: {
    metaTitle: "Kälte-Notdienst ohne Rätsel",
    metaDescription:
      "Kälte- und Klimatechnik: Störung mit Kältemittel und Anlagennummer, bevor der Techniker ausfährt.",
    question: "Was fehlt dem Kälte-Techniker vor der Ausfahrt?",
    answer:
      "Dem Kälte-Techniker fehlen vor der Ausfahrt Kältemittel, Anlagentyp und Fehlerbild — deshalb rückt er unvorbereitet aus.",
    local:
      "Kühlhäuser in Hagen, Logistikflächen im Ennepe-Ruhr-Kreis, Klimaanlagen in Lüdenscheid: F-Gase und Dichtheit dulden kein Rätselraten in der Einfahrt.",
    body: [
      "Der Setter fragt, bevor jemand den Schlüssel dreht. Nach der Instandsetzung liegt das Prüfprotokoll digital, nicht als nasser Durchschlag in der Tasche.",
      "Wartungsmodule hängen am Fundament. MID Digitale Prozesse ist hier oft näher als eine Signature-Seite. Die Seite kann später kommen.",
    ],
    leistung: { href: "/leistungen/annahme", label: "KI-Setter für die Störungsmeldung" },
    second: { href: "/leistungen/ablaeufe", label: "Wartungsmodule und Protokolle" },
    hub: {
      stuck:
        "Der Techniker fährt ohne Kältemittel, Anlagentyp und Fehlerbild aus — die erste Stunde ist Rätselraten.",
      level:
        "Annahme vor dem Zündschlüssel, Abläufe nach der Instandsetzung: Störungsmeldung strukturiert, Prüfprotokoll digital.",
      paragraphs: [
        "Kühlhäuser in Hagen, Logistikflächen im Ennepe-Ruhr-Kreis, Klimaanlagen in Lüdenscheid: F-Gase und Dichtheit dulden kein Rätselraten in der Einfahrt. Die Nachricht lautet „es ist warm“, die Anlage hat eine Nummer, die niemand nennt, das Kältemittel steht im Schrank, der nicht mitfährt. Was liegen bleibt, ist die Auskunft vor der Ausfahrt — und nach der Fahrt der nasse Durchschlag in der Tasche.",
        "Der Setter fragt, bevor jemand den Schlüssel dreht: Typ, Kältemittel, Fehlerbild, Zugang, wer vor Ort ist. Der Techniker kommt vorbereitet oder sagt, dass erst das Material da sein muss. Nach der Instandsetzung liegt das Prüfprotokoll digital, nicht als Zettel, der im Regen weich wird. Wartungsmodule hängen am Fundament: nächster Termin, Dichtheit, Historie der Anlage. F-Gase dulden keine Lücke in der Akte.",
        "Eine Signature-Seite verkauft hier selten den ersten Auftrag. MID Digitale Prozesse ist oft näher, weil der Gegenstand der innere Weg von der Störung zum Protokoll ist. Die öffentliche Seite kann später kommen, wenn der Betrieb gefunden werden will. Zuerst muss die Meldung tragen, sonst bleibt die schöne Seite eine Nummer, die nachts ins Leere läuft.",
        "Es gibt keine gebaute Kälte-Demo unter Referenzen. Wer prüfen will, bringt die letzten fünf Störungsmeldungen und ein Protokoll mit, das niemand wiedergefunden hat. Dann sehen wir, was der Setter fragen muss und welches Modul das Fundament braucht. Das Gespräch ist im Betrieb, neunzig Minuten, ohne Folie, in Hagen oder an der Anlage.",
      ],
    },
  },
  "spedition-container": {
    metaTitle: "Lieferschein aus dem Fahrerhaus",
    metaDescription:
      "Spedition und Container: Kundensignatur im Browser, Rechnung am Einsatztag. Ohne App-Zwang.",
    question: "Warum wartet die Rechnung im Containerdienst Tage?",
    answer:
      "Die Rechnung wartet, weil Wiegescheine, Standzeiten und Lieferscheine in der Kabine liegen bleiben.",
    local:
      "Hagen und das westfälische Umland: Fahrer wollen kein zweites App-Login. Der Browser auf dem Diensthandy reicht, die Unterschrift des Kunden auch.",
    body: [
      "Fundament plus digitaler Lieferschein. Rechnungsanstoß am Einsatztag. Das ist Abläufe, nicht Marketing. Eine Start-Website kann parallel den Hof erklären, sie schreibt keine Rechnung.",
      "Förderrechtlich ist das der Kern von MID Digitale Prozesse: ein interner Geschäftsprozess, kein Flyer.",
    ],
    leistung: { href: "/leistungen/ablaeufe", label: "Fundament plus digitaler Lieferschein" },
    second: { href: "/foerderung/mid-digitale-prozesse", label: "MID Digitale Prozesse für diesen Ablauf" },
    hub: {
      stuck:
        "Wiegescheine, Standzeiten und Lieferscheine bleiben Tage in der Kabine — die Rechnung wartet.",
      level:
        "Abläufe: Kundensignatur im Browser des Diensthandys, Rechnungsanstoß am Einsatztag, ohne zweites App-Login.",
      paragraphs: [
        "Hagen und das westfälische Umland: Der Fahrer will kein zweites Passwort und keinen Store-Download nach der Tour. Der Zettel liegt auf dem Armaturenbrett, die Unterschrift des Kunden ist Bleistift, die Wiegekarte steckt in der Sonnenblende. Montag früh fehlt genau das Blatt, das die Rechnung trägt. Was liegen bleibt, ist der Beleg, nicht die Fahrt.",
        "Fundament plus digitaler Lieferschein: Der Browser auf dem Diensthandy reicht. Der Kunde unterschreibt auf der Fläche. Standzeit und Gewicht sitzen in demselben Vorgang. Der Rechnungsanstoß geht am Einsatztag, nicht nach der Zettelsuche. Das ist kein Marketing und keine Startseite mit einem Foto vom Kran. Das ist der innere Prozess, den MID Digitale Prozesse meint: ein Beleg, der denselben Tag verlässt.",
        "Eine Website kann den Hof erklären und den Containerdienst sichtbar machen. Sie schreibt keine Rechnung. Wer beides gleichzeitig kauft, weil „digital“ gut klingt, mischt zwei Gegenstände. Die Flyer-Seite ist Auftritt. Der Lieferschein ist Abläufe. Den Setter braucht, wer Anrufe auf dem Hof verpasst — nicht, wer Papier in der Kabine sammelt.",
        "Feinkost Kreta zeigt, wie Bestellung und Benachrichtigung in einem Weg zusammenlaufen: anderes Gewerk, dieselbe Idee, nichts bleibt liegen. Eine Container-Demo gibt es hier nicht. Wer prüfen will, bringt drei verspätete Rechnungen und den letzten Wiegeschein mit. Dann legen wir fest, welches Feld der Schein braucht und wohin der Export ins Büro geht. Neunzig Minuten im Betrieb oder auf dem Hof.",
      ],
    },
  },
  galabau: {
    metaTitle: "Galabau Material und Kolonne",
    metaDescription:
      "Garten, Landschaft, Pool: kurze Saison, synchrones Lager. Fundament plus Termine, aus Hagen.",
    question: "Warum steht ein Galabau-Trupp in der Saison still?",
    answer:
      "Ein Galabau-Trupp steht still, weil Schüttgut, Bagger und Kolonne nicht synchron sind — die kurze Saison verzeiht das nicht.",
    local:
      "Schwelm, Hagen, Gärten im Ennepe-Ruhr-Kreis: Wetterfenster sind der Kalender. Wer morgens merkt, dass der Splitt fehlt, hat den Tag verloren.",
    body: [
      "Module für Lager und Termine hängen am Fundament. Kein ERP für Konzerne. Ein Blick, bevor das Hochwasser kommt oder die Hitze die Betonarbeiten verschiebt.",
      "Pool- und Gartenbau verkaufen zusätzlich über Bilder. Website Betrieb oder Signature kann die richtige Anfrage holen. Zuerst aber das Innere, sonst bleibt die schöne Seite ohne Kolonne.",
    ],
    leistung: { href: "/leistungen/ablaeufe", label: "Lager- und Terminmodule" },
    second: { href: "/leistungen/auftritt", label: "Website, wenn die Saison Anfragen braucht" },
    hub: {
      stuck:
        "Schüttgut, Bagger und Kolonne sind nicht synchron — die kurze Saison verzeiht den stillen Tag nicht.",
      level:
        "Abläufe zuerst: Lager und Termine am Fundament. Auftritt nur, wenn die Bücher Anfragen brauchen, nicht wenn der Splitt fehlt.",
      paragraphs: [
        "Schwelm, Hagen, Gärten im Ennepe-Ruhr-Kreis: Wetterfenster sind der Kalender. Wer morgens merkt, dass der Splitt fehlt, hat den Tag verloren. Der Bagger steht, die Kolonne wartet, der Poolbauer hat das Fenster für die Betonarbeit. Was liegen bleibt, ist nicht der Entwurf. Es ist der Blick ins Lager, bevor der Trupp ausfährt.",
        "Module für Lager und Termine hängen am Fundament. Kein ERP für Konzerne. Ein Blick: Ist der Splitt da, ist der Minibagger frei, liegt der nächste Schnitt vor dem Hochwasser oder der Hitze? Stillstand in der kurzen Saison ist kein Softwareproblem. Es ist ein Ablaufproblem. Abläufe kann man bauen, ohne die Gewohnheit mit einem Schulungsordner zu ersetzen.",
        "Pool- und Gartenbau verkaufen zusätzlich über Bilder. Website Betrieb oder Signature kann die richtige Anfrage holen, wenn die Bücher Luft haben. Zuerst aber das Innere. Sonst bleibt die schöne Seite ohne Kolonne, die den Auftrag in der Woche der Anfrage auch fahren kann. MID trifft den inneren Schnitt, nicht die Galerie der Terrassen.",
        "Es gibt keine Galabau-Demo unter Referenzen. Der gebaute Fall innen ist Feinkost Kreta — Bestand und Bestellung in einem Weg, anderes Gewerk. Wer prüfen will, bringt den letzten Saisonplan und drei Tage, an denen Material fehlte. Dann sehen wir, ob Lager, Termine oder beides das erste Modul ist. Das Gespräch ist vor Ort, nicht am Moodboard.",
      ],
    },
  },
  metallbau: {
    metaTitle: "Metallbau ohne Nachtangebote",
    metaDescription:
      "Metallbau: EN 1090, Sonderbauten, Kalkulation und Abnahme per Tablet statt Bürokratienächte.",
    question: "Wohin geht die Werkstattzeit im Metallbau?",
    answer:
      "Die Werkstattzeit geht in Dokumentation und Kalkulation — Angebote entstehen nachts, die Fertigung wartet.",
    local:
      "Märkischer Kreis und Hagen: EN 1090 und Sonderbauten erzeugen Papier, das nicht in die Werkstatt gehört. Standardisierte Kalkulation und Abnahme per Tablet holen die Stunden zurück.",
    body: [
      "Website Start plus Fundament und Angebote: sichtbar genug, um angefragt zu werden, innen genug, um nicht jede Kalkulation neu zu erfinden.",
      "Signature ist selten der erste Schritt. MID kann das Fundament tragen, wenn der Prozess neu digitalisiert wird und noch nicht begonnen hat.",
    ],
    leistung: { href: "/leistungen/ablaeufe", label: "Fundament und Angebotsmodul" },
    second: { href: "/leistungen/auftritt", label: "Website Start als sichtbare Werkstatt" },
    hub: {
      stuck:
        "Dokumentation und Kalkulation fressen die Werkstattzeit — Angebote entstehen nachts, die Fertigung wartet.",
      level:
        "Abläufe: standardisierte Kalkulation und Abnahme per Tablet. Eine Start-Website höchstens parallel, Signature selten zuerst.",
      paragraphs: [
        "Märkischer Kreis und Hagen: EN 1090 und Sonderbauten erzeugen Papier, das nicht in die Werkstatt gehört. Jede Treppe, jedes Geländer, jedes Tor wird neu gerechnet, als gäbe es keine Wiederholung. Die Abnahme sitzt in einem Ordner, den der Meister abends sucht. Was liegen bleibt, ist die Stunde an der Säge, nicht der Stolz auf die Zeichnung.",
        "Fundament plus Angebotsmodul: wiederkehrende Positionen, digitale Abnahme, Tablet statt Nachtarbeit. Wir ersetzen nicht die Branchensoftware, die seit zehn Jahren die Stückliste kann. Wir schließen den Bruch zwischen Skizze, Angebot und Unterschrift. Wo schon etwas sitzt, binden wir an. Wo nur Excel sitzt, legen wir den Kern. Die Werkstatt bleibt Werkstatt — das Tablet trägt die Stunde, die sonst nachts fehlt.",
        "Website Start macht die Werkstatt sichtbar genug, um angefragt zu werden. Sie schreibt kein Angebot. Signature ist selten der erste Schritt — außer der Betrieb verkauft über die Fläche und Preiskämpfer das Telefon zuhängen. MID kann das Fundament tragen, wenn der Prozess neu digitalisiert wird und vor dem Bescheid nicht begonnen hat. Erst der Prozess, dann die Fläche.",
        "Es gibt keine Metallbau-Demo unter Referenzen. Wer prüfen will, bringt drei Nachtangebote und eine Abnahme, die wochenlang unterschrieben im Auto lag. Dann sehen wir, welche Position standardisierbar ist und wohin die Unterschrift muss. Neunzig Minuten im Betrieb, ohne Folie, ohne offenen Stundenzettel. Kleiststraße 9, 58095 Hagen, dieselbe Nummer wie im Footer.",
      ],
    },
  },
  nutzfahrzeuge: {
    metaTitle: "Werkstatt-Status ohne Anrufe",
    metaDescription:
      "Nutzfahrzeuge und Landmaschinen: Fertigstellung und Nachtrag per WhatsApp, nicht über den Meister am Telefon.",
    question: "Warum blockieren Stellplätze in der Nutzfahrzeug-Werkstatt?",
    answer:
      "Stellplätze blockieren, weil Fuhrparkleiter anrufen und Freigaben fehlen — der Meister repariert nicht, er erklärt den Status.",
    local:
      "Freie Werkstätten in Nordrhein-Westfalen, Landmaschinen im Umland von Hagen: Disponenten wollen eine Nachricht, keine Warteschleife.",
    body: [
      "KI-Setter plus Fundament: Status und Nachtragsfreigabe laufen über WhatsApp. Die Annahme ist hier nicht nur der erste Anruf, sie ist der ganze Aufenthalt.",
      "Eine Website erklärt Öffnungszeiten. Sie räumt den Hof nicht. MID trifft den inneren Statusweg, wenn er neu aufgesetzt und erst nach dem Bescheid gebaut wird.",
    ],
    leistung: { href: "/leistungen/annahme", label: "KI-Setter für Status und Freigabe" },
    second: { href: "/leistungen/ablaeufe", label: "Fundament der Werkstattaufträge" },
    hub: {
      stuck:
        "Fuhrparkleiter rufen durch, Stellplätze bleiben blockiert, weil Freigaben fehlen — der Meister erklärt Status, statt zu reparieren.",
      level:
        "Annahme plus Abläufe: Fertigstellung und Nachtragsfreigabe über WhatsApp, nicht über den Meister am Telefon.",
      paragraphs: [
        "Freie Werkstätten in Nordrhein-Westfalen, Landmaschinen im Umland von Hagen: Disponenten wollen eine Nachricht, keine Warteschleife. Der Traktor steht, der Lkw wartet auf den Nachtrag, der Meister hebt ab und sagt denselben Satz zum dritten Mal. Was liegen bleibt, ist die Reparatur. Der Stellplatz bleibt voll, weil niemand freigegeben hat.",
        "KI-Setter plus Fundament: Status und Nachtragsfreigabe laufen über WhatsApp. Die Annahme ist hier nicht nur der erste Anruf. Sie ist der ganze Aufenthalt. Der Setter beantwortet „ist es fertig?“ ohne den Meister aus der Grube zu holen. Das Fundament hält Auftrag, Freigabe und Nachricht, damit der Hof sich leert, wenn das Fahrzeug wirklich fertig ist. Die Nummer bleibt Ihre — kein Callcenter, das sich als Werkstatt ausgibt.",
        "Eine Website erklärt Öffnungszeiten und Marken. Sie räumt den Hof nicht. MID trifft den inneren Statusweg, wenn er neu aufgesetzt und erst nach dem Bescheid gebaut wird. Wer zuerst eine schöne Seite kauft, behält die Anrufe. Wer zuerst den Weg baut, behält die Hände an der Maschine.",
        "Es gibt keine Nutzfahrzeug-Demo unter Referenzen. Der innere gebaute Fall bleibt Feinkost Kreta: eine Nachricht, ein Vorgang, nichts liegt zwischen Theke und Küche. Wer prüfen will, bringt die Anrufliste einer Woche und drei Nachträge, die mündlich versandet sind. Dann legen wir fest, welchen Status der Setter sagen darf und wo die Freigabe unterschrieben wird. Das Gespräch ist in der Werkstatt, nicht am Empfangstresen einer Agentur.",
      ],
    },
  },
};
