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
import {
  PRICE_NOTE,
  cta,
  websiteOwnership,
} from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Leistungen zeigen. Anfrage möglich machen.",
  description:
    "Eine Website, die Arbeiten und den Weg zur Anfrage zeigt. Stufen von 690 € bis ab 3.490 €. Betreuung optional.",
  path: "/leistungen/auftritt",
});

export default function AuftrittPage() {
  return (
    <StagePage
      kicker="Websites"
      title="Leistungen zeigen. Anfrage möglich machen."
      lead="Interessenten sehen, welche Arbeiten Sie übernehmen — und wie sie Kontakt aufnehmen. Die Stufe richtet sich nach dem Umfang."
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
        <Link href="/referenzen/dachdecker-signature" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          Website-Demo
        </Link>
        {" "}
        — Produktdemo, kein Echtbetrieb. Einen Bestellweg als Kundengeschichte
        zeigt das{" "}
        <Link href="/referenzen/feinkost-kreta" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          Projekt Feinkost Kreta
        </Link>
        .
      </p>

      <PageFaqs items={auftrittFaqs} />
    </StagePage>
  );
}
