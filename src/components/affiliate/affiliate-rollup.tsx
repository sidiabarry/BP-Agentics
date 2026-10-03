import { AffiliateReveal } from "@/components/affiliate/affiliate-reveal";
import { affiliateRollupHead, affiliateSteps } from "@/lib/affiliate";

export function AffiliateRollup() {
  const { kicker, title, body, selfLabel, usLabel } = affiliateRollupHead;

  return (
    <section className="affiliate-rollup" aria-labelledby="affiliate-ablauf">
      <div className="affiliate-rollup__inner">
        <AffiliateReveal as="p" className="affiliate-rollup__kicker">
          {kicker}
        </AffiliateReveal>
        <AffiliateReveal
          as="h2"
          id="affiliate-ablauf"
          className="affiliate-rollup__title"
          delay={60}
        >
          {title}
        </AffiliateReveal>
        <AffiliateReveal as="p" className="affiliate-rollup__lead" delay={120}>
          {body}
        </AffiliateReveal>
        <p className="affiliate-rollup__legend" aria-hidden="true">
          <span className="is-self">{selfLabel}</span>
          <span className="is-us">{usLabel}</span>
        </p>
        <ol className="affiliate-rollup__steps">
          {affiliateSteps.map((step, index) => (
            <AffiliateReveal
              key={step.title}
              as="li"
              id={`affiliate-step-${index}`}
              className="affiliate-rollup__step"
              delay={Math.min(index, 4) * 60}
            >
              <span className="affiliate-rollup__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p className="affiliate-rollup__self">
                <span className="sr-only">{selfLabel}: </span>
                {step.self}
              </p>
              <p className="affiliate-rollup__us">
                <span className="sr-only">{usLabel}: </span>
                {step.body}
              </p>
            </AffiliateReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
