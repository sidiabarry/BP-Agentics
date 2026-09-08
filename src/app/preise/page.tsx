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
    "Website Start 690 €, Betrieb 1.790 €, Signature ab 3.490 €. Website-Betreuung optional. Nachrichten-Assistent 1.290 € + 99 € monatlich. Datenbasis + 1 Modul ab 2.490 € ohne monatliche Betreuung. Endpreise ohne Umsatzsteuer.",
  path: "/preise",
});

export default function PreisePage() {
  return (
    <>
      <DocPage
        kicker="Preise"
        title="Was Einrichtung und laufende Betreuung kosten."
        lead="Hier sehen Sie die Größenordnung für Websites und Automatisierung. Einmalige Leistungen und monatliche Kosten sind getrennt ausgewiesen. Die Website-Betreuung ist optional. Der verbindliche Umfang und Preis stehen vor der Beauftragung im Angebot."
        crumbs={[{ name: "Preise", path: "/preise" }]}
        extraJsonLd={[
          {
            "@type": "OfferCatalog",
            name: "Leistungen BP Agentics",
            itemListElement: [
              { "@type": "Offer", name: "Website Start", price: "690", priceCurrency: "EUR" },
              { "@type": "Offer", name: "Website Betrieb", price: "1790", priceCurrency: "EUR" },
              { "@type": "Offer", name: "Website Signature", price: "3490", priceCurrency: "EUR" },
              { "@type": "Offer", name: "Nachrichten-Assistent Einrichtung", price: "1290", priceCurrency: "EUR" },
              { "@type": "Offer", name: "Nachrichten-Assistent Betreuung", price: "99", priceCurrency: "EUR", unitText: "MON" },
              { "@type": "Offer", name: "Datenbasis + 1 Prozessmodul", price: "2490", priceCurrency: "EUR" },
            ],
          },
        ]}
        related={[
          { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
          { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
          { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
          { href: "/foerderung/mid-digitale-prozesse", label: "MID-Digitale Prozesse" },
        ]}
      >
        <DataTable
          caption="Einrichtung, monatliche Betreuung und 12-Monats-Rechnung"
          headers={["Leistung", "Einmalig", "Monatlich", "Einmalig + 12 Monate"]}
          rows={offerTable.map((row) => [row.name, row.once, row.run, row.year])}
        />
        <p>{yearTableHint}</p>
        <p>
          Bei Websites gilt die 12-Monats-Mindestlaufzeit nur, wenn die optionale
          Betreuung gewählt wird. Für den Nachrichten-Assistenten und interne
          Systeme steht die Laufzeit im jeweiligen Angebot.
        </p>

        <h2>Datenbasis und ein Prozessmodul</h2>
        <p>
          Datenbasis und ein Prozessmodul kosten zusammen {automationOffer.combined}.
          Eine monatliche Betreuung ist in diesem Einstieg nicht enthalten.
          Weitere Anschlüsse und zusätzliche Abläufe werden im Angebot ausgewiesen.
        </p>

        <h2>Was die optionale Website-Betreuung umfasst</h2>
        <p>
          Wird die Betreuung gewählt, übernimmt BP Agentics Hosting,
          Sicherheitsupdates, Backups und die vereinbarten Inhaltsänderungen.
          Ohne Betreuung liegen Hosting und der laufende Betrieb beim Betrieb.
          Für den Nachrichten-Assistenten gilt die monatliche Betreuung nach dem
          Angebot.
        </p>
        <ul>
          {websiteCare.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>Ihre Website: übergeben oder weiter betreuen</h2>
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
            <Link href="/leistungen/annahme">Nachrichten-Assistent</Link>
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
