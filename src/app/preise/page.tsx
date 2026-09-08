import type { Metadata } from "next";
import Link from "next/link";
import { DataTable, DocPage } from "@/components/doc-page";
import { Pricing } from "@/components/pricing";
import { pageMetadata } from "@/lib/seo";
import {
  PRICE_NOTE,
  automationOffer,
  cta,
  offerTable,
  websiteCare,
  websiteOwnership,
  yearTableHint,
} from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Was Einrichtung und laufende Betreuung kosten",
  description:
    "Website Start 950 €, Betrieb 3.900 €, Signature ab 7.900 €, WhatsApp-Assistent 1.900 €, Datenbasis + 1 Modul ab 3.800 €. Endpreise ohne Umsatzsteuer.",
  path: "/preise",
});

export default function PreisePage() {
  return (
    <>
      <DocPage
        kicker="Preise"
        title="Was Einrichtung und laufende Betreuung kosten."
        lead="Hier sehen Sie die Größenordnung für Websites und Automatisierung. Einmalige Leistungen und monatliche Kosten sind getrennt ausgewiesen. Der verbindliche Umfang und Preis stehen vor der Beauftragung im Angebot."
        crumbs={[{ name: "Preise", path: "/preise" }]}
        extraJsonLd={[
          {
            "@type": "OfferCatalog",
            name: "Leistungen BP Agentics",
            itemListElement: [
              { "@type": "Offer", name: "Website Start", price: "950", priceCurrency: "EUR" },
              { "@type": "Offer", name: "Website Betrieb", price: "3900", priceCurrency: "EUR" },
              { "@type": "Offer", name: "Website Signature", price: "7900", priceCurrency: "EUR" },
              { "@type": "Offer", name: "WhatsApp-Assistent Einrichtung", price: "1900", priceCurrency: "EUR" },
              { "@type": "Offer", name: "WhatsApp-Assistent Betreuung", price: "99", priceCurrency: "EUR", unitText: "MON" },
              { "@type": "Offer", name: "Gemeinsame Datenbasis", price: "2900", priceCurrency: "EUR" },
              { "@type": "Offer", name: "Prozessmodul", price: "900", priceCurrency: "EUR" },
            ],
          },
        ]}
        related={[
          { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
          { href: "/leistungen/annahme", label: "WhatsApp-Assistent ansehen" },
          { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
          { href: "/foerderung/mid-digitale-prozesse", label: "MID-Digitale Prozesse" },
        ]}
      >
        <DataTable
          caption="Einrichtung, monatliche Betreuung und 12-Monats-Rechnung"
          headers={["Leistung", "Einmalig", "Monatlich", "Einmalig + 12 Monate"]}
          rows={offerTable.map((row) => [row.name, row.once, row.month, row.year])}
        />
        <p>{yearTableHint}</p>
        <p>
          Aus dieser Vergleichsrechnung folgt keine Mindestvertragslaufzeit von 12
          Monaten. Die tatsächliche Laufzeit steht im jeweiligen Angebot. Für
          Websites gilt die unten beschriebene Betreuung.
        </p>

        <h2>Aufschlüsselung Automatisierung</h2>
        <p>
          Die gemeinsame Datenbasis kostet {automationOffer.basis}. Ein Modul kostet
          je nach vereinbartem Ablauf {automationOffer.module}. Daraus ergeben sich
          mindestens {automationOffer.combined} für Datenbasis und ein Modul. Die
          Betreuung beginnt bei {automationOffer.month.replace("ab ", "")} im Monat.
        </p>

        <h2>Was nach der Einrichtung dazugehört</h2>
        <p>
          Die monatliche Betreuung deckt den laufenden Betrieb und die vereinbarten
          Pflegeleistungen ab. Bei Websites nennt das Angebot Hosting,
          Sicherheitsupdates, Backups und enthaltene Inhaltsänderungen. Für
          Assistenten und interne Abläufe wird die Betreuung passend zum System
          beschrieben.
        </p>
        <ul>
          {websiteCare.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>Ihre Website und die laufende Betreuung</h2>
        <p>{websiteOwnership}</p>
        <p>
          Für interne Systeme und den Assistenten gilt die Laufzeit, die im
          jeweiligen Angebot steht.
        </p>
        <p>{PRICE_NOTE}</p>

        <h2>Wie der genaue Preis festgelegt wird</h2>
        <p>
          Vor der Beauftragung erhalten Sie ein Angebot mit Leistungsumfang,
          einmaligem Preis und laufenden Kosten. Zusätzliche Wünsche werden vor
          ihrer Umsetzung gesondert angeboten.
        </p>
        <ul>
          <li>
            <Link href="/leistungen/auftritt">Websites</Link>
          </li>
          <li>
            <Link href="/leistungen/annahme">WhatsApp-Assistent</Link>
          </li>
          <li>
            <Link href="/leistungen/ablaeufe">Büroabläufe automatisieren</Link>
          </li>
        </ul>
        <p>
          <Link href={cta.href}>{cta.primary}</Link>
          {" — "}
          90 Minuten vor Ort.
        </p>
      </DocPage>
      <Pricing />
    </>
  );
}
