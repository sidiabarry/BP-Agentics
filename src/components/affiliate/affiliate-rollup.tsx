"use client";

import { affiliateSteps } from "@/lib/affiliate";
import { scrollAffiliateToStep, useAffiliatePin } from "@/components/affiliate/use-affiliate-pin";

export function AffiliateRollup() {
  const ref = useAffiliatePin<HTMLElement>(affiliateSteps.length);

  return (
    <section
      ref={ref}
      className="affiliate-rollup"
      aria-label="Ablauf"
      data-step="0"
    >
      <div className="affiliate-rollup__pin" data-affiliate-pin>
        <div className="affiliate-rollup__head">
          <p className="affiliate-rollup__kicker">Ablauf</p>
          <p className="affiliate-rollup__count" aria-live="polite" />
        </div>

        <div className="affiliate-rollup__stage">
          <ol className="affiliate-rollup__rail">
            {affiliateSteps.map((step, index) => (
              <li key={step.title}>
                <button
                  type="button"
                  className="affiliate-rollup__rail-btn"
                  data-index={index}
                  onClick={() => {
                    const scene = ref.current;
                    if (!scene) return;
                    if (scene.hasAttribute("data-scroll-ready")) {
                      scrollAffiliateToStep(scene, index, affiliateSteps.length);
                      return;
                    }
                    document
                      .getElementById(`affiliate-step-${index}`)
                      ?.scrollIntoView({ block: "start" });
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {step.title}
                </button>
              </li>
            ))}
          </ol>

          <ol className="affiliate-rollup__panels">
            {affiliateSteps.map((step, index) => (
              <li
                key={step.title}
                id={`affiliate-step-${index}`}
                className="affiliate-rollup__step"
                data-index={index}
              >
                <p className="affiliate-rollup__index">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2>{step.title}</h2>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="affiliate-rollup__progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
