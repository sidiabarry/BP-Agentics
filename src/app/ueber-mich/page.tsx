import type { Metadata } from "next";
import Link from "next/link";
import { DataTable, DocPage } from "@/components/doc-page";
import { napLine, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Über mich — Sidia Jerome Barry",
  description:
    "Sidia Jerome Barry, Inhaber von BP Agentics in Hagen. Ein Ansprechpartner, 90 Minuten vor Ort, Festpreis nach dem Gespräch.",
  path: "/ueber-mich",
});

export default function UeberMichPage() {
  return (
    <DocPage
      kicker="Über mich"
      title="Sidia Jerome Barry baut das, was der Betrieb nach Feierabend nicht mehr tragen soll"
      lead="Inhaber von BP Agentics in Hagen. Ein Ansprechpartner, kein Account-Karussell. Das Gespräch findet in Ihrem Betrieb statt."
      crumbs={[{ name: "Über mich", path: "/ueber-mich" }]}
      related={[
        { href: "/passt-das", label: "Schnell-Check: welche Ebene zuerst" },
        { href: "/leistungen", label: "Die drei Ebenen" },
        { href: "/kontakt", label: "Anschrift und Telefon in Hagen" },
        { href: "/termin", label: "90-Minuten-Gespräch legen" },
      ]}
    >
      <h2>Wer steckt hinter BP Agentics?</h2>
      <p className="answer">
        Hinter BP Agentics steht Sidia Jerome Barry, Inhaber, mit Sitz in der Kleiststraße 9 in 58095 Hagen.
      </p>
      <p>
        Es gibt keinen zweiten Sitz, keine Partneragentur dazwischen und keine Projektbörse. Wer anruft, erreicht dieselbe Nummer, die im Footer, im Impressum und auf WhatsApp steht: {site.phoneDisplay}. Wer schreibt, schreibt an {site.email}. Die ladungsfähige Zeile ist überall dieselbe: {napLine}.
      </p>
      <p>
        Kleinunternehmer gemäß § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen. Alle Preise auf dieser Website sind Endpreise. Der Hinweis steht im{" "}
        <Link href="/impressum">Impressum</Link>, nicht als Kleingedrucktes unter einer Preiskarte.
      </p>

      <DataTable
        caption="Person und Erreichbarkeit"
        headers={["Feld", "Wert"]}
        rows={[
          ["Name", site.founder.name],
          ["Rolle", site.founder.jobTitle],
          ["Firma", site.name],
          ["Anschrift", `${site.streetAddress}, ${site.postalCode} ${site.addressLocality}`],
          ["Telefon", site.phoneDisplay],
          ["E-Mail", site.email],
        ]}
      />

      <h2>Wie läuft die Zusammenarbeit?</h2>
      <p className="answer">
        Die Zusammenarbeit läuft in vier Schritten: neunzig Minuten vor Ort, Systemplan in drei Werktagen, Einbau in höchstens sechs Wochen, danach Wartungsvertrag.
      </p>
      <p>
        Das Erstgespräch ist kostenlos und findet in Ihrem Betrieb statt — nicht in einem Agenturfoyer. Drei Fragen: Wie kommen Anfragen rein, warum sitzen Sie abends im Büro, was ist zuletzt schiefgelaufen. Sie müssen keine Schnittstellen verstehen. Sie beschreiben, wie Aufträge, Material und Personal heute durch den Betrieb laufen. Darum herum wird gebaut.
      </p>
      <p>
        In drei Werktagen liegt ein verbindliches Konzept auf dem Tisch: Bausteine, Zeitrahmen, Festpreis, Ausschlussliste. Nichts Offenes. Zusätzliche Wünsche laufen nur über ein separates Angebot, das Sie vorher freigeben. Keine Stundenabrechnung nach Feierabend.
      </p>
      <p>
        Der Einbau ist schlüsselfertig in höchstens sechs Wochen. Ein dreißigminütiger Termin pro Woche. Der Betrieb läuft weiter. Gesellen und Fahrer bedienen das auf dem Handy, ohne Schulungsmarathon. Hosting liegt in Deutschland beziehungsweise in der Europäischen Union. Zu jedem Projekt gehört ein Auftragsverarbeitungsvertrag nach Artikel 28 der Datenschutz-Grundverordnung. Die Hoheit über die Daten bleibt beim Betrieb.
      </p>
      <p>
        Nach zwölf Monaten ist monatlich kündbar. Bei Kündigung übergeben wir die vollständigen Dateien, kostenfrei. Sie zahlen für die Wartung, nicht für Ihr Eigentum. Das ist derselbe Gedanke, den ein Betrieb seinen eigenen Wartungskunden schreibt.
      </p>

      <h2>Was wird gebaut — und was nicht?</h2>
      <p className="answer">
        Gebaut werden drei Ebenen: der öffentliche Auftritt, die Annahme am Telefon und die internen Abläufe. Nicht gebaut wird ein monolithisches Großprojekt, das drei Probleme unter einem Preis verbirgt.
      </p>
      <p>
        Auftritt ist die Website: Start, Betrieb oder Signature. Annahme ist der KI-Setter: Text, Qualifizierung, Kalender. Abläufe sind Fundament und Module: Papier aufs Handy, Lager, Rechnung. Die Ebenen greifen ineinander und bleiben einzeln beauftragbar. Nachrüsten, wenn der Betrieb soweit ist — das ist die Regel, nicht die Ausnahme.
      </p>
      <p>
        Nicht zur Arbeit gehören DATEV, Lohn und Dinge, die der Steuerberater bereits sauber führt. Nicht zur Arbeit gehören Callcenter in einem Drittland und Stimmen, die sich als Ihr Geselle ausgeben. Nicht zur Arbeit gehören erfundenen Bewertungssterne und Fallstudien, die niemand nachprüfen kann. Zwei Systeme kann man sehen: die Bestell-App von{" "}
        <Link href="/referenzen/feinkost-kreta">Feinkost Kreta</Link> und die{" "}
        <Link href="/referenzen/dachdecker-signature">Signature-Website eines Dachdeckerbetriebs</Link>.
      </p>
      <p>
        Interne Digitalisierung kann in Nordrhein-Westfalen unter{" "}
        <Link href="/foerderung/mid-digitale-prozesse">MID Digitale Prozesse</Link> fallen. Fünfzig Prozent, höchstens fünfzehntausend Euro, Antrag vor Arbeitsbeginn, Fenster bis zum 1. Dezember 2026. Ob ein Vorhaben förderfähig ist, klären wir gegen die Richtlinie, nicht gegen Wunschdenken. Eine reine Marketingseite ist selten der Kern dieses Topfes.
      </p>

      <h2>Für wen ist die Anfahrt im Festpreis?</h2>
      <p className="answer">
        Die Anfahrt steckt im Festpreis, soweit der Betrieb in Nordrhein-Westfalen liegt — schwerpunktmäßig Hagen, Iserlohn, Lüdenscheid, Witten, Schwelm, Ennepe-Ruhr-Kreis und Märkischer Kreis.
      </p>
      <p>
        Außerhalb hören wir zu und sagen vorher, ob die Anfahrt extra steht. Es gibt kein zweites Büro in Düsseldorf und keine virtuelle Adresse. Wer uns auf einer Karte sucht, soll vor der Kleiststraße 9 stehen. Wer anruft, soll dieselbe Nummer erreichen, die auf dem Transporter stehen könnte: {site.phoneDisplay}.
      </p>
      <p>
        Typische Größen: ein bis fünf Mitarbeiter, wenn der Inhaber selbst auf der Baustelle oder im Fahrzeug steht. Sechs bis zwanzig, wenn Vorarbeiter Kolonnen leiten und das Büro zum Flaschenhals wird. Über zwanzig, wenn Teams, Standorte oder Fuhrpark Daten verlieren. Keine IT-Abteilung nötig.
      </p>
      <p>
        Gewerke mit eigenem Einstieg gibt es für Dachdecker, SHK, Elektrotechnik, Kälte, Spedition und Container, Garten und Landschaft, Metallbau sowie Nutzfahrzeuge. Jede Seite beschreibt den Engpass dieses Gewerks, nicht eine generische Agenturleistung. Der Schnell-Check unter{" "}
        <Link href="/passt-das">Passt das zu mir?</Link> sortiert in zwei Fragen, wo der Schmerz sitzt.
      </p>
      <p>
        Wer schreiben will, ohne sofort zu buchen, nutzt die{" "}
        <Link href="/kontakt">Kontaktseite</Link>. Wer einen Slot will, nutzt das{" "}
        <Link href="/termin">90-Minuten-Gespräch</Link>. Dieselbe Person antwortet. Dieselbe Anschrift. Derselbe Ton: klar, ohne Folie, ohne offenen Stundenzettel.
      </p>
    </DocPage>
  );
}
