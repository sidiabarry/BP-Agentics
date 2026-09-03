"use client";

import { useEffect, useRef, useState } from "react";
import { chatBeats } from "@/lib/content";
import { cn } from "@/lib/utils";

export function LivingChat() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.75;
      const end = window.innerHeight * 0.18;
      const t = (start - rect.top) / (start - end);
      const stepped = Math.min(chatBeats.length, Math.max(0, Math.ceil(t * chatBeats.length)));
      setVisible(stepped);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="setter" className="bg-white px-5 py-24 md:px-8">
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm tracking-[0.2em] text-[#5B54E6] uppercase">
            Scharnier, greifbar
          </p>
          <h2 className="mt-3 max-w-[16ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] hyphens-auto md:text-5xl">
            Der lebende Chat. Nicht das Schaubild.
          </h2>
          <p className="mt-5 text-[1.15rem] leading-relaxed text-[#3A3D45]">
            Anfrage kommt rein. Antwort in Sekunden. Zwei Termine. Bestätigung. Der
            Kalender ist voll, Sie waren auf der Baustelle. Das ist der Setter.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[22rem]">
          <div className="rounded-[2.4rem] border-[10px] border-[#14161C] bg-[#EDE8FF] p-4 shadow-[0_30px_80px_-28px_rgba(91,84,230,0.55)]">
            <div className="mb-4 flex items-center justify-between px-2 text-sm text-[#14161C]/60">
              <span>WhatsApp · Betrieb</span>
              <span>jetzt</span>
            </div>
            <div className="flex min-h-[22rem] flex-col gap-3">
              {chatBeats.map((beat, index) => (
                <p
                  key={beat.text}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-[1.05rem] leading-snug transition-all duration-500",
                    beat.from === "in"
                      ? "self-start bg-white text-[#14161C]"
                      : "self-end bg-[#5B54E6] text-white",
                    index < visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-40",
                  )}
                >
                  {beat.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
