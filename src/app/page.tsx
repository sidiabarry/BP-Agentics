import { HeroPortal } from "@/components/scroll/hero-portal";
import { WerkstattSection } from "@/components/werkstatt/werkstatt-section";
import { ProblemWall } from "@/components/problem-wall";
import { HomeReferenzen } from "@/components/home-referenzen";
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
      <link rel="preload" as="image" href="/hero/poster.avif" type="image/avif" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [faqPage(faqs)],
        }}
      />
      <HeroPortal />
      <WerkstattSection />
      <ProblemWall />
      <HomeReferenzen />
      <HomeStart />
      <Faq />
    </main>
  );
}
