import { AffiliateReveal } from "@/components/affiliate/affiliate-reveal";
import { affiliateSteps } from "@/lib/affiliate";

export function AffiliateRollup() {
  return (
    <section className="affiliate-rollup" aria-labelledby="affiliate-ablauf">
      <div className="affiliate-rollup__inner">
        <AffiliateReveal
          as="h2"
          id="affiliate-ablauf"
          className="affiliate-rollup__kicker"
        >
          Ablauf
        </AffiliateReveal>
        <ol className="affiliate-rollup__steps">
          {affiliateSteps.map((step, index) => (
            <AffiliateReveal
              key={step.title}
              as="li"
              id={`affiliate-step-${index}`}
              className="affiliate-rollup__step"
              delay={index * 60}
            >
              <span className="affiliate-rollup__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </AffiliateReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
