import type { Metadata } from "next";
import Link from "next/link";
import { DemoLoop } from "@/components/demo-player";
import { PageFaqs } from "@/components/page-faqs";
import { WebsiteCards } from "@/components/pricing";
import { StageCard } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { auftrittFaqs } from "@/lib/content";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { paths, stageThread } from "@/lib/journey";
import {
  PRICE_NOTE,
  websiteOwnership,
} from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Website für Handwerksbetriebe in NRW",
  description:
    "Website für Handwerksbetriebe in NRW: Arbeiten zeigen und den Weg zur Anfrage klar machen. Stufen von 690 € bis ab 3.490 €, Betreuung optional.",
  path: paths.auftritt,
});

export default function AuftrittPage() {
  return (
    <StagePage
      kicker="Websites"
      title="Leistungen zeigen. Anfrage möglich machen."
      lead="Interessenten sehen, welche Arbeiten Sie übernehmen — und wie sie Kontakt aufnehmen. Die Stufe richtet sich nach dem Umfang."
      crumbs={[
        { name: "Leistungen", path: paths.leistungen },
        { name: "Websites", path: paths.auftritt },
      ]}
      extraJsonLd={[
        serviceOffer({
          name: "Website für Betriebe",
          description:
            "Website Start, Betrieb und Signature für Betriebe in Nordrhein-Westfalen.",
          path: paths.auftritt,
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
      related={stageThread(paths.auftritt).related}
      next={stageThread(paths.auftritt).next}
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

      <StageCard className="mt-10" kicker="Umfang" title="Stufe nach Bedarf. Website gehört Ihnen.">
        <p>
          Die Stufe richtet sich nach Leistungen, Projekten und vorhandenen
          Inhalten. Betreuung ist optional. {websiteOwnership}
        </p>
        <p className="mt-3">
          12 Monate Mindestlaufzeit nur bei gewählter Betreuung.
        </p>
        <p className="mt-3">{PRICE_NOTE}</p>
      </StageCard>

      <p className="mt-6 text-[1.05rem] text-[#3A3D45]">
        Eine mögliche Gestaltung zeigt die{" "}
        <Link href={paths.dachdecker} className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          Website-Demo
        </Link>
        {" "}
        — Produktdemo, kein Echtbetrieb. Einen Bestellweg als Kundengeschichte
        zeigt das{" "}
        <Link href={paths.feinkost} className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          Projekt Feinkost Kreta
        </Link>
        .
      </p>

      <PageFaqs items={auftrittFaqs} />
    </StagePage>
  );
}
