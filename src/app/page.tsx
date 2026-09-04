import { HeroSequence } from "@/components/hero-sequence";
import { ProblemWall } from "@/components/problem-wall";
import { TradeSelector } from "@/components/trade-selector";
import { ThreeLevels } from "@/components/three-levels";
import { LivingChat } from "@/components/living-chat";
import { Proof } from "@/components/proof";
import { Process } from "@/components/process";
import { Pricing } from "@/components/pricing";
import { SchnellCheck } from "@/components/schnell-check";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
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
      <HeroSequence />
      <ProblemWall />
      <TradeSelector />
      <Process />
      <ThreeLevels />
      <LivingChat />
      <Proof />
      <Pricing />
      <SchnellCheck />
      <Faq />
      <CtaBand dark />
    </main>
  );
}
