"use client";

import { useState } from "react";
import { trades, type TradeId } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TradeSelector() {
  const [active, setActive] = useState<TradeId>("bau");
  const current = trades.find((item) => item.id === active) ?? trades[0];

  return (
    <section id="gewerke" className="bg-[#14161C] px-5 py-24 text-[#F3EFE6] md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm tracking-[0.2em] text-[#A8A4FF] uppercase">
          Welches Gewerk
        </p>
        <h2 className="mt-3 max-w-[20ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] hyphens-auto md:text-5xl">
          Dieselbe Lücke. Anderer Tagesablauf.
        </h2>
        <div className="mt-10 flex flex-wrap gap-2">
          {trades.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={cn(
                "rounded-full px-4 py-2.5 text-[1.02rem] transition",
                active === item.id
                  ? "bg-[#5B54E6] text-white"
                  : "bg-white/8 text-white/80 hover:bg-white/12",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-8 rounded-[2rem] bg-white/5 p-7 md:grid-cols-5 md:p-10">
          <blockquote className="md:col-span-3">
            <p className="text-2xl leading-snug md:text-3xl">„{current.quote}“</p>
            <p className="mt-4 text-white/65">{current.firm}</p>
          </blockquote>
          <div className="md:col-span-2">
            <p className="text-sm tracking-[0.16em] text-[#A8A4FF] uppercase">
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
