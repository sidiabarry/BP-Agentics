"use client";

import { useEffect, useRef, useState } from "react";
import { affiliateCaseCopy } from "@/lib/affiliate";

export function AffiliateCase() {
  const ref = useRef<HTMLElement>(null);
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
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="affiliate-case"
      data-settled={settled ? "" : undefined}
      data-motion={motion ? "on" : "off"}
    >
      <p className="affiliate-case__kicker">{affiliateCaseCopy.kicker}</p>
      <div className="affiliate-case__top">
        <h2>{affiliateCaseCopy.title}</h2>
        <p className="affiliate-case__status" aria-live="polite">
          {settled ? affiliateCaseCopy.to : affiliateCaseCopy.from}
        </p>
      </div>
      <p className="affiliate-case__body">{affiliateCaseCopy.body}</p>
      <p className="affiliate-case__track" aria-hidden="true">
        <span>{affiliateCaseCopy.from}</span>
        <span className="affiliate-case__bar" />
        <span>{affiliateCaseCopy.to}</span>
      </p>
    </article>
  );
}
