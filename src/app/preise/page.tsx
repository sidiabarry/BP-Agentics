import type { Metadata } from "next";
import Link from "next/link";
import { DataTable, DocPage } from "@/components/doc-page";
import { Pricing } from "@/components/pricing";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Preise für Website und Systeme",
  description:
    "Endpreise: Website 690 bis ab 3.490 Euro, Setter 1.290 plus 99, Fundament ab 2.490. Wartung und Eigentum.",
  path: "/preise",
});

export default function PreisePage() {
  return (
    <>
    <DocPage
      kicker="Preise"
      title="Endpreise, die nach dem Gespräch feststehen"
      lead="Website, Setter und Abläufe in einer Tabelle. Der Einbau ist Festpreis. Die Wartung ist Pflege, nicht Miete Ihres Eigentums."
      crumbs={[{ name: "Preise", path: "/preise" }]}
      extraJsonLd={[
        {
          "@type": "OfferCatalog",
          name: "Endpreise BP Agentics",
          itemListElement: [
            { "@type": "Offer", name: "Website Start", price: "690", priceCurrency: "EUR" },
            { "@type": "Offer", name: "Website Betrieb", price: "1790", priceCurrency: "EUR" },
            { "@type": "Offer", name: "Website Signature", price: "3490", priceCurrency: "EUR" },
            { "@type": "Offer", name: "KI-Setter Einrichtung", price: "1290", priceCurrency: "EUR" },
            { "@type": "Offer", name: "KI-Setter Wartung", price: "99", priceCurrency: "EUR", unitText: "MON" },
            { "@type": "Offer", name: "Fundament", price: "2490", priceCurrency: "EUR" },
          ],
        },
      ]}
      related={[
        { href: "/leistungen/auftritt", label: "Was in Website Start, Betrieb und Signature steckt" },
        { href: "/leistungen/annahme", label: "Was der KI-Setter für 1.290 Euro tut" },
        { href: "/leistungen/ablaeufe", label: "Fundament und Module im Detail" },
        { href: "/foerderung/mid-digitale-prozesse", label: "Wie MID den Eigenanteil senken kann" },
      ]}
    >
      <h2>Was kosten die Leistungen von BP Agentics?</h2>
      <p className="answer">
        Website Start kostet sechshundertneunzig Euro, Betrieb eintausendsiebenhundertneunzig Euro, Signature beginnt bei dreitausendvierhundertneunzig Euro; der KI-Setter kostet eintausendzweihundertneunzig Euro plus neunundneunzig Euro im Monat; das Fundament beginnt bei zweitausendvierhundertneunzig Euro ohne monatliche Betreuung.
      </p>
      <p>
        Diese Seite ist die Preisliste zum Nachschlagen. Die Startseite verkauft im Scroll. Hier stehen dieselben Endpreise in Ruhe, mit Wartung, Eigentum und dem, was nicht enthalten ist. Sidia Jerome Barry nennt den verbindlichen Betrag nach dem neunzigminütigen Gespräch im Betrieb — nicht als verhandelbare Agenturspanne, sondern als Festpreis mit Ausschlussliste.
      </p>

      <DataTable
        caption="Endpreise Einbau und Wartung"
        headers={["Leistung", "Einbau", "Wartung", "Seite"]}
        rows={[
          ["Website Start", "690 Euro", "149 Euro / Monat, optional", "Website"],
          ["Website Betrieb", "1.790 Euro", "149 Euro / Monat, optional", "Website"],
          ["Website Signature", "ab 3.490 Euro", "290 Euro / Monat, optional", "Website"],
          ["KI-Setter", "1.290 Euro", "99 Euro / Monat", "KI-Setter"],
          ["Fundament", "ab 2.490 Euro", "ohne monatliche Betreuung", "Abläufe"],
        ]}
      />

      <h2>Was ist in der Wartung enthalten — und wem gehört die Seite?</h2>
      <p className="answer">
        In der Wartung enthalten sind Hosting in Deutschland, SSL, Sicherheitsupdates, tägliche Backups, bis zu drei Textänderungen im Monat und Störungsbehebung innerhalb von vierundzwanzig Stunden an Werktagen; die Seite gehört Ihnen ab Zahlung des Einbaus.
      </p>
      <p>
        Nach zwölf Monaten ist monatlich kündbar. Bei Kündigung übergeben wir die vollständigen Dateien, kostenfrei. Sie zahlen für die Wartung, nicht für Ihr Eigentum. Die Wartung ist bei allen Website-Stufen optional. Signature liegt bei zweihundertneunzig Euro monatlich, Start und Betrieb bei einhundertneunundvierzig Euro. Der Setter bleibt bei neunundneunzig. Das Fundament kommt ohne monatliche Betreuung. Alle Beträge auf dieser Seite sind Endpreise. Der Hinweis auf § 19 UStG steht im Impressum, nicht in der Preistabelle.
      </p>

      <h2>Warum steht der Preis nicht schon vor dem Gespräch fest bis auf den Cent?</h2>
      <p className="answer">
        Weil Module und Signature einen Korridor haben: der Centbetrag sitzt nach dem Systemplan, die Größenordnung sitzt schon hier.
      </p>
      <p>
        Signature für einen Einseiter-Ersatz ist nicht Signature für einen Betrieb, der über die Seite verkauft. Der Korridor bleibt eng. Offene Stundensätze gibt es nicht. Zusätzliches läuft nur über ein neues Angebot.
      </p>
      <p>
        MID Digitale Prozesse kann bei internen Vorhaben bis zu fünfzig Prozent übernehmen, höchstens fünfzehntausend Euro, nur wenn die Arbeit erst nach dem Bescheid beginnt. Lesen Sie{" "}
        <Link href="/foerderung/mid-digitale-prozesse">MID Digitale Prozesse in Nordrhein-Westfalen</Link>, bevor Sie intern beauftragen. Die Website bleibt meist außerhalb dieses Topfes.
      </p>

      <h2>Wie liest man die Tabelle neben den Leistungsseiten?</h2>
      <p className="answer">
        Die Tabelle nennt den Betrag; die Leistungsseiten nennen den Gegenstand — beide zusammen sind das Angebot, nicht die Tabelle allein.
      </p>
      <ul>
        <li>
          <Link href="/leistungen/auftritt">Website für Betriebe</Link> — Start, Betrieb, Signature.
        </li>
        <li>
          <Link href="/leistungen/annahme">KI-Setter</Link> — Annahme, Qualifizierung, Kalender.
        </li>
        <li>
          <Link href="/leistungen/ablaeufe">Interne Abläufe</Link> — Fundament und Module.
        </li>
        <li>
          <Link href="/referenzen">Referenzen</Link> — Feinkost Bestell-App, Dachdecker Auftritt.
        </li>
      </ul>
      <p>
        Hagen, Kleiststraße 9, Telefon +49 162 2843869. Wer den Plan vor Ort durchsprechen will, nutzt{" "}
        <Link href="/kontakt">die Kontaktseite</Link> oder direkt das{" "}
        <Link href="/termin">90-Minuten-Gespräch</Link>. Zurück zur{" "}
        <Link href="/">Startseite von BP Agentics</Link>, wenn Sie die Verkaufsstrecke im Zusammenhang sehen wollen.
      </p>

      <h2>Was steht nicht in der Preistabelle?</h2>
      <p className="answer">
        In der Preistabelle stehen keine Stundensätze, keine Reisekostenfantasien und kein „ab 79 Euro im Monat für immer“ — Reise ins Gesprächsgebiet Nordrhein-Westfalen steckt im Festpreis des Einbaus, soweit der Systemplan nichts anderes ausweist.
      </p>
      <p>
        Wer außerhalb liegt, hören wir uns an und sagen vorher, ob die Anfahrt extra steht. Wer Hardware will, kauft Hardware selbst. Wer eine bestehende Branchensoftware behalten will, zahlt die Anbindung als eigenes Modul, nicht als Überraschung auf der Schlussrechnung. Wer Texte in einer zweiten Sprache will, bekommt ein separates Angebot. Deutsch ist die Sprache dieser Website und der Systeme, die wir hier beschreiben.
      </p>
      <p>
        Vergleichen Sie nicht gegen eine 199-Euro-Baukasten-Seite ohne Annahme und ohne Abläufe. Vergleichen Sie gegen Feierabend, verpasste Anrufe und Rechnungen, die drei Tage in der Kabine liegen. Das ist der Preis, den der Betrieb heute schon zahlt — nur ohne Rechnung.
      </p>
      <p>
        Offer-Markup auf dieser Seite wiederholt die Beträge, die sichtbar in der Tabelle stehen. Keine Sterne, keine „aggrierten“ Bewertungen, keine SearchAction.         Wer uns findet, soll denselben Centbetrag in der Tabelle und im Schema lesen.
      </p>
    </DocPage>
    <Pricing />
    </>
  );
}
