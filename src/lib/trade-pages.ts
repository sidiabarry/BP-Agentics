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
  },
};
