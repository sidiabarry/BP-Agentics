import type { Metadata } from "next";
import Link from "next/link";
import { DemoLoop } from "@/components/demo-player";
import { PageFaqs } from "@/components/page-faqs";
import { WebsiteCards } from "@/components/pricing";
import { StageCard, StageGrid } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { auftrittFaqs } from "@/lib/content";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import {
  PRICE_NOTE,
  cta,
  websiteCare,
  websiteOwnership,
  websitePackages,
} from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Arbeiten, Einsatzgebiet und der Weg zur Anfrage",
  description:
    "Website Start 690 €, Betrieb 1.790 €, Signature ab 3.490 €. Monatliche Betreuung 149 € bzw. 290 €, optional. Für Betriebe in NRW.",
  path: "/leistungen/auftritt",
});

export default function AuftrittPage() {
  return (
    <StagePage
      kicker="Websites"
      title="Arbeiten, Einsatzgebiet und der Weg zur Anfrage."
      lead="Interessenten sollen sehen, welche Arbeiten Sie übernehmen, welche Projekte Sie zeigen können und wie sie Kontakt aufnehmen. Vom Einseiter bis zur individuellen Projektpräsentation."
      crumbs={[
        { name: "Leistungen", path: "/leistungen" },
        { name: "Websites", path: "/leistungen/auftritt" },
      ]}
      extraJsonLd={[
        serviceOffer({
          name: "Website für Betriebe",
          description:
            "Website Start, Betrieb und Signature für Betriebe in Nordrhein-Westfalen.",
          path: "/leistungen/auftritt",
          offers: [
            { name: "Website Start", price: "690" },
            { name: "Website Betrieb", price: "1790" },
            { name: "Website Signature", price: "3490" },
            { name: "Betreuung Start und Betrieb", price: "149", unit: "MON" },
            { name: "Betreuung Signature", price: "290", unit: "MON" },
          ],
        }),
        faqPage(auftrittFaqs),
      ]}
      related={[
        { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
        { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
        { href: "/referenzen/dachdecker-signature", label: "Website-Demo ansehen" },
        { href: "/preise", label: "Preise" },
      ]}
      next={{
        title: "Website-Projekt besprechen",
        body: "Welche Stufe passt, hängt von Leistungen, vorhandenen Inhalten und dem gewünschten Umfang ab. 90 Minuten vor Ort. Den Wunschtermin bestätigen wir persönlich.",
        chips: ["Start, Betrieb oder Signature", "Betreuung optional", "Umfang im Angebot"],
        primary: { href: cta.href, label: "Website-Projekt besprechen" },
        secondary: { href: "/referenzen/dachdecker-signature", label: "Demo ansehen" },
      }}
      visual={
        <DemoLoop
          src="/demos/dach-loop.mp4"
          poster="/demos/dach-poster.jpg"
          fullSrc="/demos/dach-full.mp4"
          posterAlt="Standbild einer Signature-Website für einen Dachdeckerbetrieb"
          caption="Mögliche Gestaltung für einen Dachdeckerbetrieb."
          note="Produktdemo · kein Echtbetrieb"
        />
      }
    >
      <WebsiteCards showDetailLink={false} />

      <StageGrid className="mt-10" cols={2}>
        <StageCard kicker="Welche Stufe" title="So finden wir den Umfang.">
          <p>
            Die Stufe richtet sich nach Leistungen, Projekten und vorhandenen
            Inhalten. Eine klare Anfrage gehört zu jedem Auftritt. Den Umfang
            halten wir im Angebot fest.
          </p>
        </StageCard>
        <StageCard kicker="Nach der Einrichtung" title="Betreuung ist optional.">
          <p>
            Wird sie gewählt, deckt sie Hosting, Updates und die vereinbarten
            Pflegeleistungen ab.
          </p>
          <ul className="mt-4 space-y-2">
            {websiteCare.map((item) => (
              <li key={item} className="border-t border-black/8 pt-2">
                {item}
              </li>
            ))}
          </ul>
        </StageCard>
      </StageGrid>

      <StageCard className="mt-4" kicker="Übergabe oder Betrieb" title="Die Website gehört Ihnen.">
        <p>{websiteOwnership}</p>
        <p className="mt-3">{PRICE_NOTE}</p>
        <p className="mt-3">
          Im Angebot steht, welche Seiten, Texte, Bilder und Funktionen umgesetzt
          werden. Der Nachrichten-Assistent und interne Abläufe werden bei Bedarf
          separat vereinbart.
        </p>
      </StageCard>

      <div className="mt-10 overflow-x-auto rounded-[1.4rem] bg-white p-4 md:p-6">
        <table className="w-full min-w-[32rem] border-collapse text-left text-[1.02rem]">
          <caption className="mb-3 text-left text-sm tracking-[0.14em] text-[#198BE8] uppercase">
            Website-Stufen
          </caption>
          <thead>
            <tr className="border-b border-black/10">
              {["Stufe", "Erstellung", "Betreuung", "Erstellung + 12 Monate Betreuung"].map((header) => (
                <th key={header} scope="col" className="py-2 pr-4 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {websitePackages.map((plan) => (
              <tr key={plan.name} className="border-b border-black/5 align-top">
                <th scope="row" className="py-3 pr-4 font-medium">
                  {plan.name.replace("Website ", "")}
                </th>
                <td className="py-3 pr-4 text-[#3A3D45]">{plan.once}</td>
                <td className="py-3 pr-4 text-[#3A3D45]">{plan.run}</td>
                <td className="py-3 pr-4 text-[#3A3D45]">{plan.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-[1.05rem] text-[#3A3D45]">
        Eine mögliche Gestaltung zeigt die{" "}
        <Link href="/referenzen/dachdecker-signature" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          Website-Demo
        </Link>
        .
      </p>

      <PageFaqs items={auftrittFaqs} />
    </StagePage>
  );
}
