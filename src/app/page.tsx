import { HeroSequence } from "@/components/hero-sequence";
import { ExperienceLab } from "@/components/experience-lab";
import { HomeReferenzen } from "@/components/home-referenzen";
import { WhyTeaser } from "@/components/why-teaser";
import { Pricing } from "@/components/pricing";
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
      <link rel="preload" as="image" href="/hero/poster.avif" type="image/avif" />
      <link
        rel="preload"
        as="image"
        href="/hero/sequence-desktop/0001.webp"
        media="(min-width: 768px)"
      />
      <link
        rel="preload"
        as="image"
        href="/hero/sequence-mobile/0001.webp"
        media="(max-width: 767px)"
      />
      <HeroSequence />
      <ExperienceLab />
      <HomeReferenzen />
      <WhyTeaser />
      <Pricing teaser />
      <HomeStart />
      <Faq />
    </main>
  );
}
