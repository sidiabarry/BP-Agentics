"use client";

import { useState } from "react";
import Link from "next/link";
import { ConsequenceReel } from "@/components/consequence-reel";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { officeSlides } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Proof() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="arbeiten" className="bg-[#F3EFE6] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
          Ohne System
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[18ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          Der Schreibtisch füllt sich. Der Auftrag nicht.
        </RevealHeading>
        <RevealIn as="p" variant="lead" className="mt-5 max-w-[40rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
          Anfrage im Festnetz. Lieferschein auf dem Tisch. Lager hinter Glas. Das
          ist kein unfähiger Betrieb. Das ist ein Betrieb, in dem Anfragen und Daten
          niemand einsammelt.
        </RevealIn>
        <div className="mt-12">
          <ConsequenceReel activeIndex={activeIndex} onIndexChange={setActiveIndex} />
        </div>
        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
          {officeSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "flex h-full min-w-0 flex-col rounded-3xl p-7 text-left transition",
                index === activeIndex
                  ? "bg-[#14161C] text-[#F3EFE6] ring-2 ring-[#198BE8]"
                  : "bg-white hover:bg-[#E8F4FC]",
              )}
            >
              <p
                className={cn(
                  "text-sm tracking-[0.16em] uppercase",
                  index === activeIndex ? "text-[#9FD0F8]" : "text-[#198BE8]",
                )}
              >
                {item.label}
              </p>
              <h3 className="mt-3 min-w-0 text-lg leading-snug font-semibold hyphens-manual">
                {item.sub}
              </h3>
              <p
                className={cn(
                  "mt-3 flex-1 text-[1.05rem] leading-relaxed",
                  index === activeIndex ? "text-white/75" : "text-[#3A3D45]",
                )}
              >
                {item.body}
              </p>
            </button>
          ))}
        </div>
        <p className="mt-8 text-[1.02rem] text-[#5C5F66]">
          Danach gebaut:{" "}
          <Link href="/referenzen/feinkost-kreta" className="text-[#198BE8] underline-offset-4 hover:underline">
            Feinkost Kreta
          </Link>
          {" · "}
          <Link href="/referenzen/dachdecker-signature" className="text-[#198BE8] underline-offset-4 hover:underline">
            Dachdecker Signature
          </Link>
          {" · "}
          <Link href="/leistungen/ablaeufe" className="text-[#198BE8] underline-offset-4 hover:underline">
            Betriebsorganisation
          </Link>
        </p>
      </div>
    </section>
  );
}
