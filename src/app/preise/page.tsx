import type { Metadata } from "next";
import { CareAndOwnership, LeistungenPreise } from "@/components/leistungen-preise";
import { PageFaqs } from "@/components/page-faqs";
import { StagePage } from "@/components/stage-page";
import { faqPage } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { PRICE_NOTE, offerTable, yearTableHint } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Was eine Website für Handwerker kostet",
  description:
    "Website ab 690 €, Nachrichten-Assistent 1.290 € + 99 € monatlich, Büroablauf ab 2.490 €. Betreuung optional, Endpreise ohne Umsatzsteuer.",
  path: "/preise",
});

const preiseFaqs = [
  {
    q: "Was kostet eine Website für einen Handwerksbetrieb?",
    a: "Website Start 690 € als kompakter Einseiter, Website Betrieb 1.790 € für mehrere Leistungen und Referenzen, Website Signature ab 3.490 € mit individueller Gestaltung. Die monatliche Betreuung ist optional und beginnt bei 149 €.",
  },
  {
    q: "Gibt es laufende Kosten?",
    a: "Bei Websites nur, wenn Sie die optionale Betreuung wählen — sie umfasst Hosting in Deutschland, Sicherheitsupdates, Backups und vereinbarte Textänderungen. Beim Nachrichten-Assistenten gehören Einrichtung und 99 € monatlich zusammen. Der Büroablauf läuft ohne monatliche Betreuung.",
  },
  {
    q: "Warum wird keine Umsatzsteuer ausgewiesen?",
    a: "Alle genannten Beträge sind Endpreise. Es wird keine Umsatzsteuer gemäß § 19 UStG ausgewiesen — was Sie sehen, ist der Betrag, der in Rechnung gestellt wird.",
  },
  {
    q: "Kann die Digitalisierung gefördert werden?",
    a: "Das Programm MID-Digitale Prozesse unterstützt bestimmte externe Beratungsleistungen zur Digitalisierung interner Prozesse. Es ist ausdrücklich keine pauschale Förderung von Website- oder Softwarepaketen. Die Einordnung steht auf der Förderseite.",
  },
];

export default function PreisePage() {
  return (
    <StagePage
      kicker="Preise"
      title="Was eine Website für Handwerksbetriebe kostet."
      lead="Die Größenordnung für Websites und Automatisierung. Einmalige Leistungen und monatliche Kosten sind getrennt. Die Website-Betreuung ist optional. Der verbindliche Preis steht vor der Beauftragung im Angebot."
      crumbs={[{ name: "Preise", path: "/preise" }]}
      extraJsonLd={[
        faqPage(preiseFaqs),
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
      next={{
        title: "Umfang und Preis im Gespräch festlegen",
        body: "Vor der Beauftragung erhalten Sie ein Angebot mit Leistungsumfang, einmaligem Preis und laufenden Kosten. Zusätzliche Wünsche werden vor der Umsetzung gesondert angeboten.",
        chips: ["Festpreis im Angebot", "Keine versteckte Pauschale", "90 Minuten vor Ort"],
        secondary: { href: "/foerderung/mid-digitale-prozesse", label: "Förderung prüfen" },
      }}
    >
      <LeistungenPreise embedded />

      <h2
        id="jahresrechnung"
        className="mt-16 scroll-mt-24 text-[1.65rem] leading-snug font-semibold tracking-[-0.03em] md:text-4xl"
      >
        Einmalig und über 12 Monate
      </h2>
      <p className="mt-4 max-w-[42rem] text-[1.08rem] leading-relaxed text-[#3A3D45]">
        Die 12-Monats-Spalte rechnet Erstellung und Betreuung nur zusammen, wenn
        eine monatliche Betreuung zum Angebot gehört oder gewählt wird. Im
        interaktiven Überblick oben bleiben beide Beträge getrennt.
      </p>

      {/* Mobile: stacked cards */}
      <div className="mt-8 grid gap-4 md:hidden">
        {offerTable.map((row) => (
          <article key={row.id} className="rounded-[1.4rem] bg-white p-5">
            <p className="text-lg font-semibold tracking-[-0.02em]">{row.name}</p>
            <p className="mt-2 text-2xl font-semibold">{row.once}</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.98rem]">
              <dt className="text-[#5C5F66]">Monatlich</dt>
              <dd className="text-right text-[#3A3D45]">{row.run}</dd>
              <dt className="text-[#5C5F66]">Einmalig + 12 Mo.</dt>
              <dd className="text-right font-medium text-[#3A3D45]">{row.year}</dd>
            </dl>
          </article>
        ))}
      </div>

      {/* Desktop: full table */}
      <div className="mt-8 hidden overflow-x-auto rounded-[1.6rem] bg-white md:block">
        <table className="w-full border-collapse text-left text-[1.02rem]">
          <caption className="sr-only">
            Einrichtung, monatliche Betreuung und 12-Monats-Rechnung
          </caption>
          <thead>
            <tr className="border-b border-black/10 bg-[#EDE7DA]">
              {["Leistung", "Einmalig", "Monatlich", "Einmalig + 12 Monate"].map((header) => (
                <th key={header} scope="col" className="px-5 py-3 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {offerTable.map((row) => (
              <tr key={row.id} className="border-b border-black/5 align-top">
                <th scope="row" className="px-5 py-4 font-medium">
                  {row.name}
                </th>
                <td className="px-5 py-4 whitespace-nowrap text-[#3A3D45]">{row.once}</td>
                <td className="px-5 py-4 text-[#3A3D45]">{row.run}</td>
                <td className="px-5 py-4 whitespace-nowrap text-[#3A3D45]">{row.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-[46rem] text-[1.02rem] leading-relaxed text-[#5C5F66]">
        {yearTableHint} Bei Websites gilt die 12-Monats-Mindestlaufzeit nur, wenn
        die optionale Betreuung gewählt wird.
      </p>

      <CareAndOwnership />
      <PageFaqs items={preiseFaqs} heading="Häufige Fragen zu den Preisen" />
      <p className="mt-8 text-[1.02rem] text-[#5C5F66]">{PRICE_NOTE}</p>
    </StagePage>
  );
}
