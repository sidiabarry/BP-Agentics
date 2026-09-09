"use client";

import { useState } from "react";
import Link from "next/link";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { checkPaths } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SchnellCheck({
  teaser = false,
  embedded = false,
}: {
  teaser?: boolean;
  embedded?: boolean;
}) {
  const [path, setPath] = useState<string | null>(null);
  const chosen = checkPaths.find((item) => item.id === path);

  if (teaser) {
    return (
      <div className="bg-white px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
            Schnell-Check
          </RevealIn>
        <RevealHeading className="mt-3 max-w-[22ch] text-[1.85rem] leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          Welcher Einstieg passt zu Ihrem Vorhaben?
        </RevealHeading>
          <div className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
            {checkPaths.map((item) => (
              <p
                key={item.id}
                className="h-full rounded-3xl border border-black/10 bg-[#F3EFE6] px-5 py-5 text-[1.05rem] leading-snug text-[#14161C]"
              >
                {item.label}
              </p>
            ))}
          </div>
          <p className="mt-6">
            <Link href="/passt-das" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
              Was leichter werden soll, im vollen Check wählen
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      id="check"
      className={embedded ? "" : "bg-white px-5 py-24 md:px-8"}
    >
      <div className={embedded ? "" : "mx-auto max-w-6xl"}>
        {embedded ? (
          <h2 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
            Eine Angabe genügt.
          </h2>
        ) : (
          <>
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
          Orientierung
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[22ch] text-[1.85rem] leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          Welcher Einstieg passt zu Ihrem Vorhaben?
        </RevealHeading>
          </>
        )}
        <div className={embedded ? "mt-6 grid gap-3" : "mt-10 grid gap-3"}>
          {checkPaths.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPath(item.id)}
              className={cn(
                "rounded-2xl border px-5 py-4 text-left text-[1.08rem] leading-snug transition",
                path === item.id
                  ? "border-[#198BE8] bg-[#E8F4FC]"
                  : embedded
                    ? "min-h-14 border-black/10 bg-white hover:border-black/25"
                    : "border-black/10 bg-[#F3EFE6] hover:border-black/25",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        {chosen ? (
          <div className="mt-10 rounded-[2rem] bg-[#14161C] p-8 text-[#F3EFE6]">
            <p className="text-sm tracking-[0.16em] text-[#9FD0F8] uppercase">
              Erste Richtung
            </p>
            <h3 className="mt-3 text-3xl font-semibold">{chosen.resultTitle}</h3>
            <p className="mt-4 max-w-[40rem] text-[1.12rem] leading-relaxed text-white/80">
              {chosen.result}
            </p>
            <Button
              asChild
              className="mt-8 h-13 rounded-full bg-[#198BE8] px-6 text-[1.05rem] text-white hover:bg-[#1576C4]"
            >
              <Link href="/termin">
                Empfehlung im Erstgespräch besprechen
              </Link>
            </Button>
          </div>
        ) : (
          <p className="mt-8 text-[#5C5F66]">
            Wählen Sie, was leichter werden soll. Sie erhalten eine erste Richtung.
            Der genaue Umfang wird im Gespräch geklärt.
          </p>
        )}
      </div>
    </section>
  );
}
