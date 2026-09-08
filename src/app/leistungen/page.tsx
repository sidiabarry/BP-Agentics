import type { Metadata } from "next";
import Link from "next/link";
import { DataTable, DocPage } from "@/components/doc-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Leistungen für Betriebe in NRW",
  description:
    "Drei Ebenen für Betriebe in Hagen und NRW: Website, KI-Setter und interne Abläufe. Festpreise, einzeln beauftragbar.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <DocPage
      kicker="Leistungen"
      title="Drei Ebenen, ein Betrieb"
      lead="BP Agentics baut den öffentlichen Auftritt, die Annahme am Telefon und die internen Abläufe — einzeln oder nacheinander, ohne Großprojekt."
      crumbs={[{ name: "Leistungen", path: "/leistungen" }]}
      related={[
        { href: "/leistungen/auftritt", label: "Auftritt: Website Start, Betrieb, Signature" },
        { href: "/leistungen/annahme", label: "Annahme: KI-Setter für Kalender und WhatsApp" },
        { href: "/leistungen/ablaeufe", label: "Interne Abläufe: Fundament und Module" },
        { href: "/foerderung/mid-digitale-prozesse", label: "MID Digitale Prozesse: Zuschuss in Nordrhein-Westfalen" },
        { href: "/preise", label: "Alle Endpreise in einer Tabelle" },
      ]}
    >
      <h2>Was leistet BP Agentics für einen Betrieb?</h2>
      <p className="answer">
        BP Agentics liefert drei zusammenhängende Schichten: eine Website, die Anfragen holt, einen KI-Setter, der Anfragen annimmt, und ein internes System, das Papier und Excel ersetzt.
      </p>
      <p>
        Ein Betriebssystem ist die Summe aus öffentlichem Auftritt, Annahme und Abläufen. Viele Inhaber kaufen zuerst eine Seite und wundern sich, warum abends immer noch der Schreibtisch voll ist. Die Seite holt Anfragen. Sie beantwortet sie nicht und sie schreibt keine Rechnung. Deshalb trennen wir die Ebenen und verkaufen sie einzeln.
      </p>
      <p>
        Sidia Jerome Barry arbeitet aus Hagen. Das Einzugsgebiet ist Nordrhein-Westfalen, vor allem Hagen, Iserlohn, Lüdenscheid, Witten, Schwelm, der Ennepe-Ruhr-Kreis und der Märkische Kreis. Das Erstgespräch dauert neunzig Minuten, ist kostenlos und findet im Betrieb statt — nicht in einem Agenturfoyer.
      </p>

      <h2>Welche Ebene kommt zuerst?</h2>
      <p className="answer">
        Zuerst kommt die Ebene, an der der Betrieb heute Geld oder Zeit verliert: zu wenige Anfragen, verpasste Anrufe oder Feierabendarbeit im Büro.
      </p>
      <p>
        Ein Dachdecker mit voller Auslastung braucht selten zuerst eine Signature-Website. Er braucht Annahme, weil die Besichtigung verloren geht, während er auf dem Dach steht. Ein Betrieb, dessen Seite seit zwei Jahren schweigt, braucht zuerst Auftritt. Ein Containerdienst mit Lieferscheinen in der Kabine braucht Abläufe. Der Schnell-Check unter{" "}
        <Link href="/passt-das">Passt das zu mir?</Link> sortiert das in zwei Fragen. Der Systemplan nach dem Gespräch legt es fest.
      </p>

      <DataTable
        caption="Die drei Leistungsebenen im Vergleich"
        headers={["Ebene", "Was sie löst", "Einbau", "Wartung", "Seite"]}
        rows={[
          [
            "Auftritt",
            "Die richtigen Anfragen",
            "690 bis ab 3.490 Euro",
            "149 bis 290 Euro im Monat, optional",
            "Website",
          ],
          [
            "Annahme",
            "Keine liegengebliebenen Anrufe",
            "1.290 Euro",
            "99 Euro im Monat",
            "KI-Setter",
          ],
          [
            "Abläufe",
            "Kein Büro nach Feierabend",
            "ab 2.490 Euro",
            "ohne monatliche Betreuung",
            "Interne Abläufe",
          ],
        ]}
      />

      <h2>Warum nicht alles auf einmal?</h2>
      <p className="answer">
        Weil ein monolithisches Großprojekt den Betrieb monatelang bindet und am Ende oft die falsche Baustelle zuerst schließt.
      </p>
      <p>
        Die Bausteine greifen ineinander, bleiben aber einzeln beauftragbar. Wer mit der Website startet, kann den Setter nachrüsten, ohne die Seite neu zu kaufen. Wer mit Abläufen startet, kann später eine Signature-Seite davorsetzen. Nachrüsten, wenn der Betrieb soweit ist — das ist die Regel, nicht die Ausnahme.
      </p>
      <p>
        Festpreise stehen nach dem Gespräch. Keine offenen Stundensätze. Zusätzliche Wünsche laufen nur über ein separates Angebot, das Sie vorher freigeben. Alle Beträge auf diesen Seiten sind Endpreise.
      </p>

      <h2>Für wen sind die Leistungen gedacht?</h2>
      <p className="answer">
        Die Leistungen sind für Handwerk, Außendienst, Logistik und lokale Dienstleister gedacht, die noch mit Telefon, Zetteln und Excel arbeiten.
      </p>
      <p>
        Typische Größen: ein bis fünf Mitarbeiter, wenn der Inhaber selbst auf der Baustelle oder im Fahrzeug steht. Sechs bis zwanzig, wenn Vorarbeiter Kolonnen leiten und das Büro zum Flaschenhals wird. Über zwanzig, wenn Teams, Standorte oder Fuhrpark Daten verlieren. Keine IT-Abteilung nötig. Gesellen und Fahrer bedienen das auf dem Handy.
      </p>
      <p>
        Die acht Gewerke sitzen auf einer Seite — Dachdecker, SHK und Haustechnik, Elektrotechnik, Kälte- und Klimatechnik, Spedition und Container, Garten und Landschaft, Metallbau sowie Nutzfahrzeuge. Jeder Abschnitt beschreibt den Engpass dieses Gewerks, nicht eine generische Agenturleistung. Einstieg:{" "}
        <Link href="/gewerke">Gewerke in NRW</Link>.
      </p>
      <ul>
        <li>
          <Link href="/leistungen/auftritt">Website für Betriebe in Nordrhein-Westfalen</Link>
          — Start für sechshundertneunzig Euro, Betrieb für eintausendsiebenhundertneunzig Euro, Signature ab dreitausendvierhundertneunzig Euro.
        </li>
        <li>
          <Link href="/leistungen/annahme">KI-Setter für die telefonische Annahme</Link>
          — eintausendzweihundertneunzig Euro Einrichtung und neunundneunzig Euro im Monat.
        </li>
        <li>
          <Link href="/leistungen/ablaeufe">Interne Abläufe statt Papier und Excel</Link>
          — Fundament ab zweitausendvierhundertneunzig Euro, ohne monatliche Betreuung.
        </li>
      </ul>

      <h2>Was übernimmt die MID-Förderung?</h2>
      <p className="answer">
        Die Richtlinie MID Digitale Prozesse in Nordrhein-Westfalen kann bis zu fünfzig Prozent der förderfähigen Kosten für interne Digitalisierung übernehmen, höchstens fünfzehntausend Euro.
      </p>
      <p>
        Typisch förderfähig sind Setter und Abläufe, nicht die reine Marketing-Website. Die Arbeit darf vor dem Förderbescheid nicht beginnen. Das aktuelle Einreichfenster läuft bis zum 1. Dezember 2026 und wird nach Eingang vergeben. Die ausführliche Erklärung steht auf der Seite{" "}
        <Link href="/foerderung/mid-digitale-prozesse">MID Digitale Prozesse in Nordrhein-Westfalen</Link>.
      </p>
      <p>
        Referenzen zum Anfassen: das Kundensystem von{" "}
        <Link href="/referenzen/feinkost-kreta">Feinkost Kreta</Link> und die{" "}
        <Link href="/referenzen/dachdecker-signature">Signature-Website für einen Dachdeckerbetrieb</Link>.
        Preise ohne Scroll-Choreografie stehen unter{" "}
        <Link href="/preise">Preise für Website und Systeme</Link>.
      </p>

      <h2>Wie läuft die Zusammenarbeit nach dem Klick?</h2>
      <p className="answer">
        Nach dem Klick folgt dasselbe Viererschritt: Gespräch, Systemplan, Einbau, Wartungsvertrag — unabhängig davon, welche Ebene zuerst kommt.
      </p>
      <p>
        Neunzig Minuten vor Ort, kostenlos. In drei Werktagen ein verbindliches Konzept mit Bausteinen, Zeitrahmen, Festpreis und Ausschlussliste. Schlüsselfertig in höchstens sechs Wochen. Ein dreißigminütiger Termin pro Woche, der Betrieb läuft weiter. Hosting, Pflege, Sicherheitsupdates. Nach zwölf Monaten monatlich kündbar. Die Dateien gehören Ihnen ab Zahlung des Einbaus.
      </p>
      <p>
        Es gibt keinen zweiten Sitz, keine Partneragentur dazwischen und keine Projektbörse. Sidia Jerome Barry ist der Ansprechpartner. Kleiststraße 9, 58095 Hagen, Telefon +49 162 2843869. Wer schreiben will, ohne sofort zu buchen, nutzt die{" "}
        <Link href="/kontakt">Kontaktseite mit Anschrift und WhatsApp</Link>.
      </p>
      <p>
        Suchmaschinen und Sprachmodelle sollen diese Seite als Cluster lesen: drei Leistungen, eine Förderung, zwei Referenzen, eine Preistabelle. Deshalb liegen die Unterseiten nicht nur als Anker auf der Startseite, sondern als eigene Adressen mit eigenem Titel, eigener Beschreibung und eigenem Canonical auf https://bpagentics.com. Wer unsicher ist, welche Ebene zuerst kommt, beginnt bei{" "}
        <Link href="/passt-das">Passt das zu mir?</Link>
        , nicht bei einem Paketnamen.
      </p>
    </DocPage>
  );
}
