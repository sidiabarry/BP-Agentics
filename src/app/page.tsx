import { HeroPortal } from "@/components/scroll/hero-portal";
import { LeistungsMaschine } from "@/components/scroll/leistungs-maschine";
import { ProblemWall } from "@/components/problem-wall";
import { HomeReferenzen } from "@/components/home-referenzen";
import { LeistungenPreise } from "@/components/leistungen-preise";
import { HomeStart } from "@/components/home-start";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { faqs } from "@/lib/content";
import { faqPage } from "@/lib/json-ld";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: site.defaultTitle,
  },
  description: site.defaultDescription,
  alternates: {
    canonical: site.url,
  },
};

export default function HomePage() {
  return (
    <main id="inhalt">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [faqPage(faqs)],
        }}
      />
      <HeroPortal />
      <LeistungsMaschine />
      <ProblemWall />
      <HomeReferenzen />
      <LeistungenPreise />
      <HomeStart />
      <Faq />
    </main>
  );
}
