"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { acts, type ActId } from "@/lib/journey";
import { cn } from "@/lib/utils";
import "./act-rail.css";

export function ActRail() {
  const [current, setCurrent] = useState<ActId>("eintritt");

  useEffect(() => {
    const nodes = acts
      .map((act) => document.getElementById(act.hash))
      .filter((el): el is HTMLElement => Boolean(el));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const match = acts.find((act) => act.hash === visible?.target.id);
        if (match) setCurrent(match.id);
      },
      { rootMargin: "-18% 0px -55% 0px", threshold: [0.12, 0.3, 0.55] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const active = acts.find((act) => act.id === current) ?? acts[0];

  return (
    <nav
      aria-label="Roter Faden"
      className={cn("act-rail", current === "eintritt" && "act-rail--hidden")}
    >
      <ol className="act-rail__desktop">
        {acts.map((act) => (
          <li key={act.id}>
            <Link
              href={act.href}
              className={cn("act-rail__link", current === act.id && "act-rail__link--on")}
              aria-current={current === act.id ? "step" : undefined}
            >
              <span className="act-rail__roman">{act.roman}</span>
              {act.label}
            </Link>
          </li>
        ))}
      </ol>
      <p className="act-rail__mobile">
        <span className="act-rail__roman">{active.roman}</span>
        {active.label}
      </p>
    </nav>
  );
}
