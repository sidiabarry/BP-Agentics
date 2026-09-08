"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { chatBeats, chatSteps } from "@/lib/content";
import { cn } from "@/lib/utils";

const PIN_VH = 260;
const TYPING_RATIO = 0.34;

function subscribeMotion(cb: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", cb);
  return () => media.removeEventListener("change", cb);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function viewFromProgress(progress: number) {
  const n = chatBeats.length;
  const t = clamp01((progress - 0.04) / 0.9) * n;
  if (t <= 0) return { shown: 0, typing: false };
  if (t >= n) return { shown: n, typing: false };
  const i = Math.floor(t);
  const frac = t - i;
  if (frac < TYPING_RATIO) return { shown: i, typing: true };
  return { shown: i + 1, typing: false };
}

function TypingDots({ from }: { from: "in" | "out" }) {
  return (
    <div
      className={cn(
        "flex max-w-[4.5rem] items-center gap-1 rounded-2xl px-4 py-3",
        from === "in" ? "self-start bg-white" : "self-end bg-[#198BE8]",
      )}
    >
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className={cn(
            "chat-dot size-1.5 rounded-full",
            from === "in" ? "bg-[#14161C]/45" : "bg-white/80",
          )}
          style={{ animationDelay: `${dot * 160}ms` }}
        />
      ))}
    </div>
  );
}

function PhoneChat({
  shown,
  typing,
}: {
  shown: number;
  typing: boolean;
}) {
  const nextFrom = chatBeats[shown]?.from ?? "in";

  return (
    <div className="rounded-[2.4rem] border-[10px] border-[#14161C] bg-[#E8F4FC] p-4 shadow-[0_30px_80px_-28px_rgba(25,139,232,0.55)]">
      <div className="mb-4 flex items-center justify-between px-2 text-sm text-[#14161C]/60">
        <span>WhatsApp · Betrieb</span>
        <span>jetzt</span>
      </div>
      <div className="flex min-h-[18rem] flex-col justify-end gap-3 sm:min-h-[22rem]">
        {chatBeats.slice(0, shown).map((beat) => (
          <p
            key={beat.time + beat.text}
            className={cn(
              "chat-bubble max-w-[85%] rounded-2xl px-4 py-3 text-[1.05rem] leading-snug",
              beat.from === "in"
                ? "origin-bottom-left self-start bg-white text-[#14161C]"
                : "origin-bottom-right self-end bg-[#198BE8] text-white",
            )}
          >
            {beat.text}
            <span
              className={cn(
                "mt-1 block text-right text-[0.72rem] tracking-wide",
                beat.from === "in" ? "text-[#14161C]/40" : "text-white/70",
              )}
            >
              {beat.time}
            </span>
          </p>
        ))}
        {typing && shown < chatBeats.length ? <TypingDots from={nextFrom} /> : null}
      </div>
    </div>
  );
}

export function LivingChat() {
  const wrapRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);

  const sync = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const total = wrap.offsetHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
    const next = total > 0 ? scrolled / total : 1;
    setProgress((prev) => (Math.abs(prev - next) < 0.002 ? prev : next));
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, sync]);

  const { shown, typing } = reduced
    ? { shown: chatBeats.length, typing: false }
    : viewFromProgress(progress);
  const highlight = Math.min(
    chatSteps.length - 1,
    typing ? shown : Math.max(shown - 1, 0),
  );

  return (
    <section
      id="setter"
      ref={wrapRef}
      className="relative bg-white"
      style={{ height: reduced ? "auto" : `${PIN_VH}vh` }}
      aria-label="Nachrichten-Assistent, Beispieldialog per WhatsApp"
    >
      <div
        className={
          reduced
            ? "px-5 py-24 md:px-8"
            : "sticky top-0 flex min-h-dvh items-center overflow-hidden px-5 py-8 pb-24 md:px-8 md:py-0 md:pb-0"
        }
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
              Beispieldialog · KI-Assistent · keine echte Buchung
            </RevealIn>
            <RevealHeading className="mt-3 max-w-[16ch] text-3xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
              WhatsApp- und E-Mail-Anfragen vorbereiten. Termine leichter abstimmen.
            </RevealHeading>
            <RevealIn as="p" variant="lead" className="mt-5 hidden max-w-[40rem] text-[1.15rem] leading-relaxed text-[#3A3D45] lg:block">
              Der Assistent erfasst vereinbarte Angaben per WhatsApp oder E-Mail und
              bietet Termine aus dem angebundenen Kalender an. Die Zeiten in diesem
              Dialog sind Teil der Demo, kein echter Kalenderbestand.
            </RevealIn>
            <ol className="mt-8 hidden space-y-3 lg:block">
              {chatSteps.map((step, index) => {
                const on = index <= highlight && shown + Number(typing) > 0;
                const current = index === highlight && (shown > 0 || typing);
                return (
                  <li
                    key={step.n}
                    className={cn(
                      "flex items-baseline gap-4 border-l-2 pl-4 transition-colors duration-300",
                      current
                        ? "border-[#198BE8] text-[#14161C]"
                        : on
                          ? "border-[#198BE8]/40 text-[#14161C]"
                          : "border-[#14161C]/12 text-[#14161C]/35",
                    )}
                  >
                    <span className="text-sm tracking-[0.18em]">{step.n}</span>
                    <span>
                      <span className="block text-[1.05rem] font-semibold">{step.title}</span>
                      <span className="block text-[0.95rem] text-current/70">{step.hint}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="mx-auto w-full max-w-[22rem]">
            <ol className="sr-only">
              {chatBeats.map((beat) => (
                <li key={beat.text}>
                  {beat.from === "in" ? "Kunde" : "Assistent"}: {beat.text}
                </li>
              ))}
            </ol>
            <div aria-hidden="true">
              <PhoneChat shown={shown} typing={typing} />
            </div>
            <p className="mt-4 text-center text-sm tracking-[0.16em] text-[#14161C]/50 uppercase">
              {shown === 0 && !typing
                ? "Scrollen, der Chat läuft"
                : chatSteps[highlight]?.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
