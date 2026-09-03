"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_VH = 240;

function subscribeMotion(cb: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", cb);
  return () => media.removeEventListener("change", cb);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroScrub() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);
  const [ready, setReady] = useState(false);

  const sync = useCallback(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const total = wrap.offsetHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
    const next = total > 0 ? scrolled / total : 1;
    setProgress(next);
    if (video && video.duration && Number.isFinite(video.duration)) {
      const t = next * (video.duration - 0.04);
      if (Math.abs(video.currentTime - t) > 0.03) {
        video.currentTime = t;
      }
    }
  }, []);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, sync, ready]);

  const skip = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const top = wrap.offsetTop + wrap.offsetHeight - window.innerHeight;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  const entered = reduced || progress > 0.72;
  const overlay = reduced ? 1 : Math.min(1, Math.max(0, (progress - 0.62) / 0.28));

  return (
    <section
      ref={wrapRef}
      className="relative"
      style={{ height: reduced ? "auto" : `${HERO_VH}vh` }}
      aria-label="Einstieg"
    >
      <div
        className={reduced ? "relative" : "sticky top-0 h-dvh overflow-hidden bg-[#0c1020]"}
      >
        <video
          ref={videoRef}
          className={`h-dvh w-full object-cover ${reduced ? "hidden" : "block"}`}
          src="/media/hero.mp4"
          poster="/media/hero-start.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedMetadata={() => {
            const video = videoRef.current;
            if (video) {
              video.pause();
              setReady(true);
            }
          }}
        />
        {reduced ? (
          <div
            className="relative min-h-dvh bg-cover bg-center"
            style={{ backgroundImage: "url(/media/hero-end.jpg)" }}
          />
        ) : null}

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: overlay,
            background:
              "linear-gradient(180deg, #3d37c8 0%, #5B54E6 38%, #241c78 100%)",
          }}
        />

        <div
          className={`absolute inset-0 flex flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-12 md:pb-24 ${
            entered ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{ opacity: overlay }}
        >
          <div className="mx-auto w-full max-w-4xl">
            <p className="text-[0.78rem] tracking-[0.28em] text-white/80 uppercase">
              Systems & Automation · BP Agentics / Hagen
            </p>
            <h1 className="mt-4 max-w-[18ch] text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.03em] text-white hyphens-auto sm:text-6xl md:text-7xl">
              Ihr Betrieb läuft. Nur digital nicht.
            </h1>
            <p className="mt-6 max-w-[38rem] text-[1.15rem] leading-relaxed text-white/90 md:text-[1.25rem]">
              Websites und Systeme für mittelständische Betriebe, die noch mit
              Telefon, Zetteln und Excel arbeiten. Fester Festpreis, in Wochen
              einsatzbereit, ein persönlicher Ansprechpartner.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Aus Hagen", "Alle Daten in der EU", "Feste Preise, keine Stundenzettel"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-sm text-white"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                className="h-13 rounded-full bg-white px-7 text-[1.05rem] text-[#241c78] hover:bg-[#F3EFE6]"
              >
                <Link href="/termin">Erstgespräch vereinbaren</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 rounded-full border-white/70 bg-transparent px-7 text-[1.05rem] text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/#arbeiten">Arbeiten ansehen</Link>
              </Button>
            </div>
          </div>
        </div>

        {!reduced && progress < 0.92 ? (
          <button
            type="button"
            onClick={skip}
            className="absolute right-5 bottom-6 z-10 inline-flex items-center gap-2 rounded-full bg-black/45 px-4 py-2 text-sm text-white backdrop-blur-sm md:right-8"
          >
            In den Bildschirm
            <ChevronDown className="size-4" />
          </button>
        ) : null}
      </div>
    </section>
  );
}
