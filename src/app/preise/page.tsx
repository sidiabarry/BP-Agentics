import type { Metadata } from "next";
import { Pricing } from "@/components/pricing";
import { StagePage } from "@/components/stage-page";
import { pageMetadata } from "@/lib/seo";
import { offerTable, yearTableHint } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Was Einrichtung und laufende Betreuung kosten",
  description:
    "Website Start 690 €, Betrieb 1.790 €, Signature ab 3.490 €. Website-Betreuung optional. Nachrichten-Assistent 1.290 € + 99 € monatlich. Datenbasis + 1 Modul ab 2.490 € ohne monatliche Betreuung. Endpreise ohne Umsatzsteuer.",
  path: "/preise",
});

export default function PreisePage() {
  return (
    <StagePage
      kicker="Preise"
      title="Einmalig, monatlich, im Angebot festgehalten."
      lead="Die Größenordnung für Websites und Automatisierung. Einmalige Leistungen und monatliche Kosten sind getrennt. Die Website-Betreuung ist optional. Der verbindliche Preis steht vor der Beauftragung im Angebot."
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
      next={{
        title: "Umfang und Preis im Gespräch festlegen",
        body: "Vor der Beauftragung erhalten Sie ein Angebot mit Leistungsumfang, einmaligem Preis und laufenden Kosten. Zusätzliche Wünsche werden vor der Umsetzung gesondert angeboten.",
        chips: ["Festpreis im Angebot", "Keine versteckte Pauschale", "90 Minuten vor Ort"],
        secondary: { href: "/foerderung/mid-digitale-prozesse", label: "Förderung prüfen" },
      }}
    >
      <div className="overflow-x-auto rounded-[1.6rem] bg-white">
        <table className="w-full min-w-[36rem] border-collapse text-left text-[1.02rem]">
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

      <div className="mt-12">
        <Pricing embedded />
      </div>
    </StagePage>
  );
}
