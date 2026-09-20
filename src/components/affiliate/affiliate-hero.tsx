"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { RevealIn } from "@/components/reveal-in";
import { affiliateHero, affiliatePath, affiliateSteps } from "@/lib/affiliate";

const crumbs = [
  { name: "Startseite", path: "/" },
  { name: "Leistungen", path: "/leistungen" },
  { name: "Affiliate-Programme", path: affiliatePath },
] as const;

export function AffiliateHero() {
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-in", "");
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-in", "");
        observer.disconnect();
      },
      { threshold: 0.18 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
          return;
        }
        setArmed(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = affiliateHero.title.trim().split(/\s+/);

  return (
    <header ref={ref} className="affiliate-hero">
      <div className="affiliate-hero__inner">
        <nav aria-label="Brotkrumen" className="affiliate-hero__crumbs">
          <ol>
            {crumbs.map((item, index) => (
              <li key={item.path}>
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {index === crumbs.length - 1 ? (
                  <span>{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <RevealIn as="p" variant="kicker" className="affiliate-hero__kicker">
          {affiliateHero.kicker}
        </RevealIn>
        <h1
          ref={titleRef}
          className={`affiliate-hero__title${armed ? " reveal-armed" : ""}${revealed ? " reveal-heading-on" : ""}`}
        >
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <span className="reveal-word" style={{ "--i": index } as CSSProperties}>
                {word}
              </span>
              {index < words.length - 1 ? " " : null}
            </span>
          ))}
        </h1>
        <RevealIn as="p" variant="lead" className="affiliate-hero__lead">
          {affiliateHero.lead}
        </RevealIn>

        <p className="affiliate-hero__rail-label" aria-hidden="true">
          Ablauf
        </p>
        <ol className="affiliate-hero__rail" aria-label="Ablauf im Überblick">
          <li className="affiliate-hero__line" aria-hidden="true" />
          {affiliateSteps.map((step, index) => (
            <li key={step.title} className="affiliate-hero__node">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {step.title}
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}
