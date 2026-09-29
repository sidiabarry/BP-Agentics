"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import { AffiliateAction } from "@/components/affiliate/affiliate-action";
import { RevealIn } from "@/components/reveal-in";
import { Button } from "@/components/ui/button";
import { affiliateHero, affiliateNext, affiliatePath, affiliateSteps } from "@/lib/affiliate";

const crumbs = [
  { name: "Startseite", path: "/" },
  { name: "Leistungen", path: "/leistungen" },
  { name: "Affiliate-Programme", path: affiliatePath },
] as const;

const primaryClass =
  "h-12 min-h-12 rounded-full bg-[#1576C4] px-6 text-base font-semibold text-white hover:bg-[#0b5ea8]";

const secondaryClass =
  "h-12 min-h-12 rounded-full border-[#14161c]/15 bg-white px-6 text-base font-semibold text-[#14161c] hover:bg-[#e7eef6] hover:text-[#14161c]";

function scrollToStep(event: MouseEvent<HTMLAnchorElement>, index: number) {
  const target = document.getElementById(`affiliate-step-${index}`);
  if (!target) return;
  event.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function AffiliateHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    <header className="affiliate-hero">
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

        <RevealIn as="p" variant="rise" className="affiliate-hero__kicker">
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

        <div className="affiliate-hero__actions">
          <Button asChild className={primaryClass}>
            <AffiliateAction href={affiliateNext.primary.href}>
              {affiliateNext.primary.label}
            </AffiliateAction>
          </Button>
          <Button asChild variant="outline" className={secondaryClass}>
            <AffiliateAction href={affiliateNext.secondary.href}>
              {affiliateNext.secondary.label}
            </AffiliateAction>
          </Button>
        </div>

        <ol className="affiliate-hero__rail" aria-label="Ablauf im Überblick">
          <li className="affiliate-hero__line" aria-hidden="true" />
          {affiliateSteps.map((step, index) => (
            <li key={step.title} className="affiliate-hero__node">
              <a href={`#affiliate-step-${index}`} onClick={(event) => scrollToStep(event, index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}
