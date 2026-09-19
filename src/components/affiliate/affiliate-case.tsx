"use client";

import { useEffect, useRef, useState } from "react";
import { affiliateCaseCopy } from "@/lib/affiliate";
import { RevealIn } from "@/components/reveal-in";
import "@/styles/affiliate.css";

export function AffiliateCase() {
  const ref = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      setSettled(true);
      return;
    }
    setMotion(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSettled(true);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealIn as="div" variant="card" className="mt-10">
      <article
        ref={ref}
        className="affiliate-case overflow-hidden rounded-[1.6rem] bg-[#14161C] p-5 text-[#F3EFE6] md:p-7"
        data-settled={settled ? "" : undefined}
        data-motion={motion ? "on" : "off"}
      >
        <p className="text-sm tracking-[0.16em] text-[#9FD0F8] uppercase">
          {affiliateCaseCopy.kicker}
        </p>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <h2 className="text-[1.6rem] leading-snug font-semibold tracking-[-0.03em] md:text-[2rem]">
            {affiliateCaseCopy.title}
          </h2>
          <p className="affiliate-case__status" aria-live="polite">
            {settled ? affiliateCaseCopy.to : affiliateCaseCopy.from}
          </p>
        </div>
        <p className="mt-4 max-w-[40rem] text-[1.08rem] leading-relaxed text-white/75">
          {affiliateCaseCopy.body}
        </p>
      </article>
    </RevealIn>
  );
}
