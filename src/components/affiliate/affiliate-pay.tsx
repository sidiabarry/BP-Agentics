import { RevealIn } from "@/components/reveal-in";
import { affiliatePay, affiliatePayFacts } from "@/lib/affiliate";

export function AffiliatePay() {
  return (
    <section className="affiliate-pay" aria-labelledby="affiliate-pay-title">
      <RevealIn as="div" variant="rise">
        <p className="affiliate-pay__kicker">Vergütung</p>
        <h2 id="affiliate-pay-title">{affiliatePay.title}</h2>
        <p className="affiliate-pay__body">{affiliatePay.body}</p>
        <dl className="affiliate-pay__facts">
          {affiliatePayFacts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.text}</dd>
            </div>
          ))}
        </dl>
      </RevealIn>
    </section>
  );
}
