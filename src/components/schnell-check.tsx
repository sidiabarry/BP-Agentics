"use client";

import { useState } from "react";
import Link from "next/link";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { checkPaths, teamSizes } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SchnellCheck() {
  const [path, setPath] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const chosen = checkPaths.find((item) => item.id === path);

  return (
    <section id="check" className="bg-white px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#5B54E6] uppercase">
          Schnell-Check
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[22ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          An welcher Stelle verliert Ihr Betrieb gerade am meisten?
        </RevealHeading>
        <div className="mt-10 grid gap-3">
          {checkPaths.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPath(item.id)}
              className={cn(
                "rounded-2xl border px-5 py-4 text-left text-[1.08rem] leading-snug transition",
                path === item.id
                  ? "border-[#5B54E6] bg-[#EDE8FF]"
                  : "border-black/10 bg-[#F3EFE6] hover:border-black/25",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mt-10 text-sm tracking-[0.16em] text-[#6B7280] uppercase">
          Teamstärke
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {teamSizes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSize(item.id)}
              className={cn(
                "rounded-2xl border px-5 py-4 text-left transition",
                size === item.id
                  ? "border-[#5B54E6] bg-[#EDE8FF]"
                  : "border-black/10 hover:border-black/25",
              )}
            >
              <span className="block text-[1.1rem] font-semibold">{item.label}</span>
              <span className="mt-1 block text-[#3A3D45]">{item.hint}</span>
            </button>
          ))}
        </div>
        {chosen && size ? (
          <div className="mt-10 rounded-[2rem] bg-[#14161C] p-8 text-[#F3EFE6]">
            <p className="text-sm tracking-[0.16em] text-[#A8A4FF] uppercase">
              Empfehlung
            </p>
            <h3 className="mt-3 text-3xl font-semibold">{chosen.resultTitle}</h3>
            <p className="mt-4 max-w-[40rem] text-[1.12rem] leading-relaxed text-white/80">
              {chosen.result}
            </p>
            <Button
              asChild
              className="mt-8 h-13 rounded-full bg-[#5B54E6] px-6 text-[1.05rem] text-white hover:bg-[#4A44D4]"
            >
              <Link href="/termin">
                Diesen Ablaufplan im 90-Minuten-Gespräch durchsprechen
              </Link>
            </Button>
          </div>
        ) : (
          <p className="mt-8 text-[#5C5F66]">
            Wählen Sie Reibungspunkt und Teamstärke. Danach liegt die Empfehlung
            auf dem Tisch.
          </p>
        )}
      </div>
    </section>
  );
}
