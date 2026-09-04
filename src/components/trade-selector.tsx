"use client";

import { useState } from "react";
import { trades, type TradeId } from "@/lib/content";
import { cn } from "@/lib/utils";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";

export function TradeSelector() {
  const [active, setActive] = useState<TradeId>("bau");
  const current = trades.find((item) => item.id === active) ?? trades[0];

  return (
    <section id="gewerke" className="bg-[#14161C] px-5 py-24 text-[#F3EFE6] md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#9FD0F8] uppercase">
          Welches Gewerk
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[20ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          Dieselbe Lücke. Anderer Tagesablauf.
        </RevealHeading>
        <div className="mt-10 flex flex-wrap gap-2">
          {trades.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={cn(
                "rounded-full px-4 py-2.5 text-[1.02rem] transition",
                active === item.id
                  ? "bg-[#198BE8] text-white"
                  : "bg-white/8 text-white/80 hover:bg-white/12",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-8 rounded-[2rem] bg-white/5 p-7 md:grid-cols-5 md:p-10">
          <blockquote className="md:col-span-3">
            <p key={current.id} className="trade-fade text-2xl leading-snug md:text-3xl">
              „{current.quote}“
            </p>
            <p key={`${current.id}-firm`} className="trade-fade mt-4 text-white/65">
              {current.firm}
            </p>
          </blockquote>
          <div key={`${current.id}-config`} className="trade-fade md:col-span-2">
            <p className="text-sm tracking-[0.16em] text-[#9FD0F8] uppercase">
              Konfiguration
            </p>
            <p className="mt-2 text-xl">{current.config}</p>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-white/75">
              {current.outcome}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
