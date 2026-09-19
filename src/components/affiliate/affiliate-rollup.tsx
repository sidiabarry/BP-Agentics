"use client";

import { affiliateSteps } from "@/lib/affiliate";
import { useScrollScene, window3 } from "@/lib/scroll-engine";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import "@/styles/affiliate.css";

const WINDOWS: [number, number][] = [
  [0, 0.28],
  [0.16, 0.46],
  [0.34, 0.64],
  [0.52, 0.82],
  [0.7, 1],
];

export function AffiliateRollup() {
  const ref = useScrollScene<HTMLElement>({
    mode: "pin",
    minHeight: 560,
    vars: (p) => {
      const next: Record<string, number> = {};
      WINDOWS.forEach(([start, end], index) => {
        next[`--s${index}`] = window3(p, start, end);
      });
      return next;
    },
  });

  return (
    <section
      ref={ref}
      className="affiliate-rollup"
      aria-label="Ablauf"
    >
      <div className="affiliate-rollup__pin">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
          Ablauf
        </RevealIn>
        <RevealHeading className="max-w-[18ch] text-[1.65rem] leading-[1.12] font-semibold tracking-[-0.03em] md:text-4xl">
          Ablauf
        </RevealHeading>
        <div className="affiliate-rollup__ticks" aria-hidden="true">
          {affiliateSteps.map((step, index) => (
            <span key={step.title} style={{ ["--s" as string]: `var(--s${index})` }} />
          ))}
        </div>
        <ol className="affiliate-rollup__steps">
          {affiliateSteps.map((step, index) => (
            <li
              key={step.title}
              className="affiliate-rollup__step"
              style={{ ["--s" as string]: `var(--s${index})` }}
            >
              <p className="affiliate-rollup__index">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-[1.35rem] leading-snug font-semibold tracking-[-0.03em] md:text-[1.55rem]">
                {step.title}
              </h3>
              <p className="mt-2 text-[1.05rem] leading-relaxed text-white/75">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
