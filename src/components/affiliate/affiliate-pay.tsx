import { AffiliateReveal } from "@/components/affiliate/affiliate-reveal";
import { affiliatePay, affiliatePayFacts } from "@/lib/affiliate";

export function AffiliatePay() {
  return (
    <section className="affiliate-pay" aria-labelledby="affiliate-pay-title">
      <div className="affiliate-pay__layout">
        <div className="affiliate-pay__copy">
          <AffiliateReveal as="p" className="affiliate-pay__kicker">
            Vergütung
          </AffiliateReveal>
          <AffiliateReveal as="h2" id="affiliate-pay-title" delay={60}>
            {affiliatePay.title}
          </AffiliateReveal>
          <AffiliateReveal as="p" className="affiliate-pay__body" delay={120}>
            {affiliatePay.body}
          </AffiliateReveal>
        </div>
        <dl className="affiliate-pay__facts">
          {affiliatePayFacts.map((fact, index) => (
            <AffiliateReveal as="div" key={fact.label} delay={index * 60}>
              <dt>{fact.label}</dt>
              <dd>{fact.text}</dd>
            </AffiliateReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
