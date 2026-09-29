import { AffiliateReveal } from "@/components/affiliate/affiliate-reveal";
import { affiliateCaseCopy } from "@/lib/affiliate";

export function AffiliateCase() {
  return (
    <article className="affiliate-case">
      <div className="affiliate-case__layout">
        <AffiliateReveal className="affiliate-case__intro">
          <p className="affiliate-case__kicker">{affiliateCaseCopy.kicker}</p>
          <h2>{affiliateCaseCopy.title}</h2>
          <p className="affiliate-case__status">
            <span className="affiliate-case__dot" aria-hidden="true" />
            {affiliateCaseCopy.from} → {affiliateCaseCopy.to}
          </p>
        </AffiliateReveal>
        <AffiliateReveal as="p" className="affiliate-case__body" delay={60}>
          {affiliateCaseCopy.body}
        </AffiliateReveal>
      </div>
    </article>
  );
}
