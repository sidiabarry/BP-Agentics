"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { levels } from "@/lib/content";
import { cn } from "@/lib/utils";

type LevelId = (typeof levels)[number]["id"];

function WebsiteMini() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.15rem] bg-white shadow-[0_24px_50px_-28px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-1.5 bg-[#E3EAF0] px-3 py-2">
        <span className="size-1.5 rounded-full bg-[#C9D3DC]" />
        <span className="size-1.5 rounded-full bg-[#C9D3DC]" />
        <span className="size-1.5 rounded-full bg-[#C9D3DC]" />
        <span className="ml-2 rounded-full bg-white px-2.5 py-0.5 text-[0.62rem] font-semibold text-[#1C2C38]">
          meisterbetrieb-mueller.de
        </span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.05fr_1fr] gap-3 p-3">
        <div className="rounded-md bg-[radial-gradient(120%_90%_at_18%_8%,#7eb7e6_0,#1d6fb3_48%,#0b3a5c_100%)]" />
        <div className="flex flex-col justify-center">
          <p className="text-[0.95rem] leading-none font-semibold tracking-[-0.03em] text-[#0B1A27]">
            Dach. Dicht. In Hagen.
          </p>
          <p className="mt-1.5 text-[0.7rem] leading-snug text-[#3A4A56]">
            Sanierung und Dacharbeiten.
          </p>
          <span className="mt-2.5 inline-flex w-fit rounded-md bg-[#0B1A27] px-2 py-1 text-[0.62rem] font-semibold text-white">
            Dach prüfen lassen
          </span>
        </div>
      </div>
    </div>
  );
}

function ChatMini() {
  return (
    <div className="mx-auto flex h-full w-[min(100%,16.5rem)] flex-col overflow-hidden rounded-[1.4rem] bg-[#E8F4FC] shadow-[0_24px_50px_-28px_rgba(25,139,232,0.45)]">
      <div className="flex items-center gap-2 bg-[#0B1A27] px-3 py-2.5 text-white">
        <span className="size-5 rounded-full bg-[#198BE8]" />
        <span className="text-[0.72rem] font-semibold">
          Müller Bedachungen
          <span className="block text-[0.58rem] font-normal text-white/55">
            KI-Assistent · Beispiel
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 p-3">
        <p className="max-w-[88%] self-start rounded-2xl rounded-bl-sm bg-white px-2.5 py-1.5 text-[0.7rem] leading-snug text-[#14161C]">
          Hallo, Garagendach in Hagen — geht eine Besichtigung?
        </p>
        <p className="max-w-[82%] self-end rounded-2xl rounded-br-sm bg-[#D6ECFF] px-2.5 py-1.5 text-[0.7rem] leading-snug text-[#0B1A27]">
          Gern. Stadtteil und Dachfläche?
        </p>
      </div>
    </div>
  );
}

function LedgerMini() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.15rem] bg-white shadow-[0_24px_50px_-28px_rgba(0,0,0,0.55)]">
      <div className="flex gap-1.5 px-3 pt-3">
        {["Eingang", "Klärung", "Zuordnung"].map((node, index) => (
          <span
            key={node}
            className={cn(
              "rounded-full border px-2 py-0.5 text-[0.62rem] font-semibold",
              index === 0
                ? "border-[#198BE8] text-[#0B5EA8]"
                : "border-[#CBD7E0] text-[#64737E]",
            )}
          >
            {node}
          </span>
        ))}
      </div>
      <div className="mt-3 min-h-0 flex-1 border-t border-[#E4EAF0]">
        <div className="grid grid-cols-[1.3fr_0.8fr] bg-[#EEF2F6] px-3 py-1.5 text-[0.58rem] tracking-[0.06em] text-[#64737E]">
          <span>Beleg</span>
          <span>Status</span>
        </div>
        {[
          ["Besichtigung Do 9:00", "im Kalender"],
          ["Lieferschein 4412", "unterschrieben"],
          ["Stunden KW 37", "freigegeben"],
        ].map(([beleg, status], index) => (
          <div
            key={beleg}
            className="grid grid-cols-[1.3fr_0.8fr] border-t border-[#E4EAF0] px-3 py-2 text-[0.7rem]"
          >
            <span className="font-medium text-[#14161C]">{beleg}</span>
            <span className={index === 0 ? "font-semibold text-[#0B5EA8]" : "text-[#3A4A56]"}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const previews: Record<LevelId, { kicker: string; node: ReactNode }> = {
  auftritt: { kicker: "Website · Beispiel", node: <WebsiteMini /> },
  annahme: { kicker: "WhatsApp · Beispiel", node: <ChatMini /> },
  ablaeufe: { kicker: "Büro · Beispiel", node: <LedgerMini /> },
};

export function LeistungPicker() {
  const [active, setActive] = useState<LevelId>(levels[0].id);
  const current = levels.find((level) => level.id === active) ?? levels[0];

  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace("#", "");
      if (levels.some((level) => level.id === id)) setActive(id as LevelId);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  function select(id: LevelId) {
    setActive(id);
  }

  return (
    <div className="mt-10 flex flex-col-reverse overflow-hidden rounded-[2rem] bg-[#14161C] text-[#F3EFE6] lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(17rem,0.75fr)]">
      <div className="relative isolate min-h-[22rem] overflow-hidden px-5 pt-5 pb-6 md:min-h-[24rem] md:px-8 md:pt-7 md:pb-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff0a 1px, transparent 1px), linear-gradient(90deg, #ffffff0a 1px, transparent 1px)",
            backgroundSize: "2.6rem 2.6rem",
          }}
        />
        <p className="relative text-sm tracking-[0.16em] text-[#9FD0F8] uppercase">
          {previews[current.id].kicker}
        </p>
        <div className="relative mt-4 h-[12.5rem] md:h-[13.5rem]" aria-hidden="true">
          {levels.map((level) => (
            <div
              key={level.id}
              className={cn(
                "absolute inset-0 transition-all duration-300 ease-out motion-reduce:transition-none",
                active === level.id
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-2 opacity-0",
              )}
            >
              {previews[level.id].node}
            </div>
          ))}
        </div>
        <div
          className="relative mt-6 max-w-[34rem]"
          role="tabpanel"
          id={`${current.id}-tafel`}
          aria-labelledby={current.id}
        >
          <h3 className="text-[1.65rem] leading-tight font-semibold tracking-[-0.03em] md:text-[1.85rem]">
            {current.name}
          </h3>
          <p className="mt-2 text-[1.05rem] leading-relaxed text-white/72">
            {current.lead}
          </p>
          <p className="mt-4">
            <Link
              href={current.href}
              className="font-semibold text-[#9FD0F8] underline-offset-4 hover:underline"
            >
              {current.linkLabel}
            </Link>
          </p>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Leistungsbausteine"
        className="flex flex-col border-b border-white/10 lg:border-b-0 lg:border-l lg:border-white/10"
      >
        {levels.map((level) => {
          const on = level.id === active;
          return (
            <button
              key={level.id}
              id={level.id}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${level.id}-tafel`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(level.id)}
              onMouseEnter={() => {
                if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                  select(level.id);
                }
              }}
              onKeyDown={(event) => {
                const index = levels.findIndex((item) => item.id === active);
                const next =
                  event.key === "ArrowDown" || event.key === "ArrowRight"
                    ? levels[(index + 1) % levels.length]
                    : event.key === "ArrowUp" || event.key === "ArrowLeft"
                      ? levels[(index - 1 + levels.length) % levels.length]
                      : null;
                if (!next) return;
                event.preventDefault();
                select(next.id);
                document.getElementById(next.id)?.focus();
              }}
              className={cn(
                "flex flex-1 flex-col justify-center border-t border-white/10 px-5 py-3.5 text-left transition-colors duration-200 first:border-t-0 md:px-7 lg:py-5",
                "focus-visible:bg-white/8 focus-visible:outline-none",
                on ? "bg-white/8" : "bg-transparent hover:bg-white/4",
              )}
            >
              <span
                className={cn(
                  "text-sm tracking-[0.18em]",
                  on ? "text-[#9FD0F8]" : "text-white/40",
                )}
              >
                {level.roman}
              </span>
              <span
                className={cn(
                  "mt-2 text-[1.2rem] leading-snug font-semibold tracking-[-0.02em]",
                  on ? "text-[#F3EFE6]" : "text-white/70",
                )}
              >
                {level.name}
              </span>
              <span
                className={cn(
                  "mt-1 hidden text-[0.98rem] leading-snug lg:block",
                  on ? "text-white/70" : "text-white/40",
                )}
              >
                {level.sub}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "mt-2 block h-px origin-left bg-[#198BE8] transition-transform duration-300 motion-reduce:transition-none lg:mt-3",
                  on ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
