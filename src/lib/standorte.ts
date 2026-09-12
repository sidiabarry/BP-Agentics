import { napShort, site } from "@/lib/site";

/**
 * Standortseiten.  Wichtig: nur Hagen ist ein echter Sitz.  Für Iserlohn und
 * Witten wird ausdrücklich kein Büro behauptet — die Seiten beschreiben das
 * Einsatzgebiet und den Weg zum Termin, nicht eine Niederlassung.
 */
export type Standort = {
  slug: string;
  stadt: string;
  kreis: string;
  istSitz: boolean;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  lead: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const standorte: Standort[] = [
  {
    slug: "webdesign-hagen",
    stadt: "Hagen",
    kreis: "Hagen (kreisfrei)",
    istSitz: true,
    seoTitle: "Webdesign Hagen für Handwerk und Betriebe",
    seoDescription:
      "Websites für Handwerksbetriebe in Hagen — vom Einseiter ab 690 € bis zum individuellen Auftritt. Inhabergeführt, Sitz in Hagen, Erstgespräch im Betrieb.",
    h1: "Webdesign in Hagen — für Handwerk, Werkstatt und Betrieb.",
    lead: `BP Agentics sitzt in Hagen, ${napShort}. Websites, ein Nachrichten-Assistent für WhatsApp- und E-Mail-Anfragen und automatisierte Büroabläufe — entwickelt von einer Person, die zum Termin in Ihren Betrieb kommt.`,
    sections: [
      {
        heading: "Ein Ansprechpartner, kein Agentur-Apparat",
        body: "Sie sprechen mit derselben Person, die die Seite baut. Kein Projektmanager zwischendrin, keine wechselnden Zuständigkeiten. Für einen Betrieb mit fünf oder fünfzig Mitarbeitern ist das meist der Unterschied zwischen einem Projekt, das läuft, und einem, das im E-Mail-Verkehr stecken bleibt.",
      },
      {
        heading: "Warum das Erstgespräch im Betrieb stattfindet",
        body: "90 Minuten vor Ort, kostenlos. In der Werkstatt oder im Büro wird in zehn Minuten sichtbar, was in einem Telefonat eine Stunde dauert: welcher Weg eine Anfrage heute nimmt, wo sie liegen bleibt, welche Programme tatsächlich benutzt werden. Innerhalb von Hagen — Mitte, Haspe, Eilpe, Wehringhausen, Boele, Hohenlimburg — ist das eine Anfahrt von Minuten.",
      },
      {
        heading: "Was in Hagen typischerweise zuerst hilft",
        body: "Hagen ist eine Stadt der gemischten Betriebe: Handwerk, Werkstätten, Zulieferer, kleine Industrie. Wer gewerbliche Auftraggeber hat, profitiert meist zuerst von einer Website, die die eigenen Arbeiten belegt. Wer viele Privatkundenanfragen über WhatsApp bekommt, oft zuerst vom Nachrichten-Assistenten. Was zuerst dran ist, entscheidet das Gespräch — nicht ein Paket.",
      },
    ],
    faqs: [
      {
        q: "Was kostet eine Website für einen Betrieb in Hagen?",
        a: "Website Start 690 €, Website Betrieb 1.790 €, Signature ab 3.490 €. Die monatliche Betreuung ist optional. Der verbindliche Preis steht vor der Beauftragung im Angebot. Alle Preise sind Endpreise ohne ausgewiesene Umsatzsteuer gemäß § 19 UStG.",
      },
      {
        q: "Kommen Sie zu uns in den Betrieb?",
        a: `Ja, das ist der Normalfall. Der Sitz ist ${napShort}, Termine in Hagen sind kurzfristig möglich. Sie senden einen Terminwunsch, bestätigt wird er persönlich.`,
      },
      {
        q: "Gehört die Website danach uns?",
        a: "Ja. Nach Zahlung der Erstellung gehört Ihnen die Website. Sie können die vereinbarten Dateien übernehmen und Hosting und Pflege selbst tragen — oder die optionale Betreuung wählen.",
      },
    ],
  },
  {
    slug: "webdesign-iserlohn",
    stadt: "Iserlohn",
    kreis: "Märkischer Kreis",
    istSitz: false,
    seoTitle: "Webdesign Iserlohn für Handwerk und Betriebe",
    seoDescription:
      "Websites und digitale Abläufe für Betriebe in Iserlohn und im Märkischen Kreis. Ab 690 €. Erstgespräch vor Ort, Sitz in Hagen, rund 20 Minuten entfernt.",
    h1: "Webdesign in Iserlohn — Websites für Betriebe im Märkischen Kreis.",
    lead: "Iserlohn ist die größte Stadt im Märkischen Kreis und über die A46 rund zwanzig Minuten von Hagen entfernt. Nah genug, dass das Erstgespräch vor Ort stattfindet und nicht per Videocall.",
    sections: [
      {
        heading: "Kein Büro in Iserlohn — und das steht hier so",
        body: "Der Sitz von BP Agentics ist Hagen. Iserlohn gehört zum Einsatzgebiet, nicht zu einer Niederlassung. Das ist bewusst so benannt: eine erfundene Ortsadresse hilft niemandem und fällt spätestens beim ersten Termin auf. Was zählt, ist die Anfahrt — und die ist über die A46 kurz.",
      },
      {
        heading: "Industrienähe prägt die Anforderungen",
        body: "Im Märkischen Kreis arbeiten viele Betriebe für gewerbliche Auftraggeber: Metall, Zerspanung, Elektro, technischer Service, Zulieferung. Diese Auftraggeber prüfen vor der Anfrage, ob ein Betrieb ihre Bauart, ihre Größenordnung und ihre Nachweispflichten überhaupt bedient. Eine Website, die das sauber beantwortet, spart beiden Seiten die Anfrage, die nicht passt.",
      },
      {
        heading: "Wo Automatisierung vor der Website kommt",
        body: "Manche Betriebe hier haben volle Auftragsbücher und brauchen keine zusätzliche Anfrage — sondern weniger Reibung zwischen Einsatz und Büro. Dann ist ein abgestimmter Ablauf der bessere erste Schritt: Angaben einmal erfassen, dem Auftrag zuordnen, dem Büro bereitstellen. Ob das trägt, hängt an der vorhandenen Software, die wir uns zuerst ansehen.",
      },
    ],
    faqs: [
      {
        q: "Arbeiten Sie auch für Betriebe in Iserlohn, Letmathe und Umgebung?",
        a: "Ja. Iserlohn mit Letmathe, Hennen, Sümmern und Kalthof liegt im regulären Einsatzgebiet, ebenso der übrige Märkische Kreis, etwa Lüdenscheid und Menden. Termine vor Ort sind der Normalfall.",
      },
      {
        q: "Haben Sie ein Büro in Iserlohn?",
        a: "Nein. Der Sitz ist Hagen, Kleiststraße 9. Das Erstgespräch findet ohnehin in Ihrem Betrieb statt — dort ist der Arbeitsalltag sichtbar, um den es geht.",
      },
      {
        q: "Was kostet eine Website?",
        a: "Website Start 690 €, Website Betrieb 1.790 €, Signature ab 3.490 €; Betreuung optional. Der Nachrichten-Assistent kostet 1.290 € Einrichtung plus 99 € monatlich. Verbindlich wird der Preis im Angebot.",
      },
    ],
  },
  {
    slug: "webdesign-witten",
    stadt: "Witten",
    kreis: "Ennepe-Ruhr-Kreis",
    istSitz: false,
    seoTitle: "Webdesign Witten für Handwerk und Betriebe",
    seoDescription:
      "Websites und WhatsApp-Assistent für Betriebe in Witten und im Ennepe-Ruhr-Kreis. Ab 690 €. Erstgespräch im Betrieb, Sitz in Hagen.",
    h1: "Webdesign in Witten — Websites für Betriebe im Ennepe-Ruhr-Kreis.",
    lead: "Witten ist die größte Stadt im Ennepe-Ruhr-Kreis und liegt keine zwanzig Minuten von Hagen entfernt. Das Einsatzgebiet deckt den Kreis vollständig ab — von Witten über Wetter und Herdecke bis Schwelm und Ennepetal.",
    sections: [
      {
        heading: "Viele Privatkunden, viele Anfragen über WhatsApp",
        body: "In Witten und den umliegenden Ruhrstädten arbeiten auffällig viele Betriebe überwiegend für Privathaushalte: Sanierung, Bad, Dach, Garten, Elektro im Bestand. Diese Kundschaft schreibt, statt anzurufen — und erwartet eine Antwort am selben Tag. Genau dafür ist der Nachrichten-Assistent gebaut: Er antwortet per WhatsApp und E-Mail, erfasst die vereinbarten Angaben und bietet Termine nur aus freigegebenen Kalenderfenstern an.",
      },
      {
        heading: "Die Website muss den Bestand erklären",
        body: "Arbeiten im Bestand sind schwerer zu verkaufen als Neubau, weil das Ergebnis vorher niemand sieht. Bilder vom Zustand vorher, von der Ausführung und vom fertigen Ergebnis leisten hier mehr als jede Leistungsliste — und sie beantworten die Frage, die jeder Privatkunde zuerst stellt: Hat der Betrieb so etwas schon gemacht?",
      },
      {
        heading: "Anfahrt und Ablauf",
        body: "Der Sitz ist Hagen; in Witten gibt es kein Büro, und das wird hier auch nicht behauptet. Für den Termin ist das ohne Bedeutung: Das kostenlose Erstgespräch dauert 90 Minuten und findet in Ihrem Betrieb statt — in Annen, Herbede, Bommern oder Stockum ebenso wie in der Innenstadt.",
      },
    ],
    faqs: [
      {
        q: "Wie schnell kann eine Website online sein?",
        a: "Eine Website Start ist üblicherweise in wenigen Wochen online, sobald Texte und Bilder vorliegen. Größere Auftritte brauchen länger. Eine belastbare Angabe steht im Angebot, nicht im Erstgespräch.",
      },
      {
        q: "Kann der Assistent WhatsApp-Anfragen wirklich allein beantworten?",
        a: "Er beantwortet Textnachrichten per WhatsApp und E-Mail nach vereinbarten Regeln, erfasst Angaben und bietet freigegebene Termine an. Er ersetzt keine Telefonannahme und entscheidet nichts Fachliches — diese Grenze ist Teil der Einrichtung.",
      },
      {
        q: "Welche Orte im Ennepe-Ruhr-Kreis decken Sie ab?",
        a: "Den gesamten Kreis: Witten, Wetter, Herdecke, Gevelsberg, Schwelm, Ennepetal, Sprockhövel, Hattingen und Breckerfeld. Hagen grenzt direkt an.",
      },
    ],
  },
];

export const standortBySlug = Object.fromEntries(
  standorte.map((item) => [item.slug, item]),
) as Record<string, Standort>;

export const standortPaths = standorte.map((item) => `/${item.slug}`);

export const areaServedNodes = site.areaServed.map((name) => ({
  "@type": "AdministrativeArea",
  name,
}));
