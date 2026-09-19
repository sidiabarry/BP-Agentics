"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { RevealIn } from "@/components/reveal-in";
import { Button } from "@/components/ui/button";
import { affiliateNext } from "@/lib/affiliate";

function Action({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a href={href} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <Link href={href}>{children}</Link>;
}

export function AffiliateCta() {
  const primary = affiliateNext.primary;

  return (
    <section className="affiliate-cta" aria-labelledby="affiliate-cta-title">
      <RevealIn as="div" variant="rise">
        <p className="affiliate-cta__kicker">Nächster Schritt</p>
        <h2 id="affiliate-cta-title">{affiliateNext.title}</h2>
        <p className="affiliate-cta__body">{affiliateNext.body}</p>
        <ul className="affiliate-cta__chips">
          {affiliateNext.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
        <div className="affiliate-cta__actions">
          <Button
            asChild
            className="h-12 rounded-full bg-[#198BE8] px-6 text-white hover:bg-[#1576C4]"
          >
            <Action href={primary.href}>{primary.label}</Action>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full border-white/20 bg-transparent px-6 text-[#F3EFE6] hover:bg-white/8"
          >
            <Action href={affiliateNext.secondary.href}>
              {affiliateNext.secondary.label}
            </Action>
          </Button>
        </div>
      </RevealIn>
    </section>
  );
}
