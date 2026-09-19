import type { Metadata } from "next";
import { AffiliateCase } from "@/components/affiliate/affiliate-case";
import { AffiliatePreview } from "@/components/affiliate/affiliate-preview";
import { AffiliateRollup } from "@/components/affiliate/affiliate-rollup";
import { PageFaqs } from "@/components/page-faqs";
import { RevealIn } from "@/components/reveal-in";
import { StageCard } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import {
  affiliateFaqs,
  affiliateHero,
  affiliateNext,
  affiliatePath,
  affiliatePay,
  affiliateRelated,
} from "@/lib/affiliate";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import "@/styles/affiliate.css";

export const metadata: Metadata = pageMetadata({
  title: affiliateHero.title,
  description: affiliateHero.lead,
  path: affiliatePath,
});

export default function AffiliatePage() {
  return (
    <StagePage
      kicker={affiliateHero.kicker}
      title={affiliateHero.title}
      lead={affiliateHero.lead}
      crumbs={[
        { name: "Leistungen", path: "/leistungen" },
        { name: "Affiliate-Programme", path: affiliatePath },
      ]}
      extraJsonLd={[
        serviceOffer({
          name: "Affiliate-Programme",
          description: affiliateHero.lead,
          path: affiliatePath,
        }),
        faqPage([...affiliateFaqs]),
      ]}
      related={[
        { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
        { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
        { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
        affiliateRelated,
        { href: "/preise", label: "Preise" },
      ]}
      next={affiliateNext}
      visual={<AffiliatePreview />}
    >
      <AffiliateRollup />

      <RevealIn as="div" variant="rise" className="mt-10">
        <StageCard tone="ink" title={affiliatePay.title}>
          <p>{affiliatePay.body}</p>
        </StageCard>
      </RevealIn>

      <AffiliateCase />

      <PageFaqs items={[...affiliateFaqs]} />
    </StagePage>
  );
}
