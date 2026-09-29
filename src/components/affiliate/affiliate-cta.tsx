"use client";

import { AffiliateAction } from "@/components/affiliate/affiliate-action";
import { AffiliateReveal } from "@/components/affiliate/affiliate-reveal";
import { Button } from "@/components/ui/button";
import { affiliateNext } from "@/lib/affiliate";

const primaryClass =
  "h-12 min-h-12 rounded-full bg-[#1576C4] px-6 text-base font-semibold text-white hover:bg-[#0b5ea8]";

const secondaryClass =
  "h-12 min-h-12 rounded-full border-white/30 bg-[#1c2633] px-6 text-base font-semibold text-[#F3EFE6] hover:bg-[#243140] hover:text-white";

export function AffiliateCta() {
  return (
    <section className="affiliate-cta" aria-labelledby="affiliate-cta-title">
      <div className="affiliate-cta__layout">
        <div className="affiliate-cta__copy">
          <AffiliateReveal as="p" className="affiliate-cta__kicker">
            Nächster Schritt
          </AffiliateReveal>
          <AffiliateReveal as="h2" id="affiliate-cta-title" delay={60}>
            {affiliateNext.title}
          </AffiliateReveal>
          <AffiliateReveal as="p" className="affiliate-cta__body" delay={120}>
            {affiliateNext.body}
          </AffiliateReveal>
          <AffiliateReveal as="ul" className="affiliate-cta__chips" delay={180}>
            {affiliateNext.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </AffiliateReveal>
        </div>
        <AffiliateReveal as="div" className="affiliate-cta__actions" delay={240}>
          <Button asChild className={primaryClass}>
            <AffiliateAction href={affiliateNext.primary.href}>
              {affiliateNext.primary.label}
            </AffiliateAction>
          </Button>
          <Button asChild variant="outline" className={secondaryClass}>
            <AffiliateAction href={affiliateNext.secondary.href}>
              {affiliateNext.secondary.label}
            </AffiliateAction>
          </Button>
        </AffiliateReveal>
      </div>
    </section>
  );
}
