import { AffiliateReveal } from "@/components/affiliate/affiliate-reveal";
import { affiliateWhat } from "@/lib/affiliate";

export function AffiliateWhat() {
  const { kicker, title, body, gainLabel, gain, flowLabel, flow, rail } =
    affiliateWhat;

  return (
    <section className="affiliate-what" aria-labelledby="affiliate-what-title">
      <div className="affiliate-what__head">
        <div>
          <AffiliateReveal as="p" className="affiliate-what__kicker">
            {kicker}
          </AffiliateReveal>
          <AffiliateReveal as="h2" id="affiliate-what-title" delay={60}>
            {title}
          </AffiliateReveal>
          <AffiliateReveal as="p" className="affiliate-what__body" delay={120}>
            {body}
          </AffiliateReveal>
        </div>
        <ul className="affiliate-gain" aria-label={gainLabel}>
          {gain.map((item, index) => (
            <AffiliateReveal as="li" key={item} delay={index * 60}>
              {item}
            </AffiliateReveal>
          ))}
        </ul>
      </div>
      <figure className="affiliate-flow">
        <ol className="affiliate-flow__steps" aria-label={flowLabel}>
          {flow.map((node, index) => (
            <AffiliateReveal
              as="li"
              key={node.label}
              delay={index * 60}
              className={
                index === 3
                  ? "affiliate-flow__node affiliate-flow__node--pay"
                  : "affiliate-flow__node"
              }
            >
              <span className="affiliate-flow__dot" aria-hidden="true" />
              <strong className="affiliate-flow__label">{node.label}</strong>
              <span className="affiliate-flow__text">{node.text}</span>
            </AffiliateReveal>
          ))}
        </ol>
        <AffiliateReveal as="figcaption" className="affiliate-flow__rail" delay={240}>
          <b>{rail.tag}</b> <span>{rail.text}</span>
        </AffiliateReveal>
      </figure>
    </section>
  );
}
