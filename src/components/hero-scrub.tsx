"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

const HERO_VH = 340;
const VIDEO_ASPECT = 828 / 1108;
/** First share of the pin distance plays the clip. The rest holds the last frame. */
const VIDEO_SCROLL = 0.66;
/** Overlay only after the clip has reached the filled phone screen. */
const OVERLAY_AT = 0.72;
const SCALE_FROM = 0.8;

function subscribeMotion(cb: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", cb);
  return () => media.removeEventListener("change", cb);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function containSize(width: number, height: number) {
  if (width / height > VIDEO_ASPECT) {
    return { width: height * VIDEO_ASPECT, height };
  }
  return { width, height: width / VIDEO_ASPECT };
}

function subscribeViewport(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

function viewportSnapshot() {
  return `${window.innerWidth}x${window.innerHeight}`;
}

function coverScaleFor(width: number, height: number) {
  const fitted = containSize(width, height);
  return Math.max(width / fitted.width, height / fitted.height);
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function HeroScrub() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const viewportKey = useSyncExternalStore(
    subscribeViewport,
    viewportSnapshot,
    () => "1280x800",
  );
  const [viewW, viewH] = viewportKey.split("x").map(Number);
  const coverScale = coverScaleFor(viewW, viewH);
  const frame = containSize(viewW, viewH);
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

    const videoProgress = Math.min(1, next / VIDEO_SCROLL);
    if (video && video.duration && Number.isFinite(video.duration)) {
      const t = videoProgress * Math.max(video.duration - 0.04, 0);
      if (Math.abs(video.currentTime - t) > 0.025) {
        video.currentTime = t;
      }
    }
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
  }, [reduced, sync, ready]);

  const skip = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const total = wrap.offsetHeight - window.innerHeight;
    const top = wrap.offsetTop + total * OVERLAY_AT;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  const videoProgress = Math.min(1, progress / VIDEO_SCROLL);
  const scaleT = easeInOut(Math.min(1, Math.max(0, (videoProgress - SCALE_FROM) / (1 - SCALE_FROM))));
  const scale = 1 + (coverScale - 1) * scaleT;
  const overlay = reduced ? 1 : Math.min(1, Math.max(0, (progress - OVERLAY_AT) / 0.08));
  const entered = reduced || overlay > 0.55;
  const headerTone = overlay > 0.35 ? "dark" : "light";

  return (
    <section
      ref={wrapRef}
      className="relative"
      style={{ height: reduced ? "auto" : `${HERO_VH}vh` }}
      aria-label="Einstieg"
    >
      <div
        className={
          reduced
            ? "relative"
            : "sticky top-0 h-dvh overflow-hidden bg-[#f4f4f2]"
        }
      >
        <SiteHeader tone={headerTone} />
        <div className="flex h-dvh w-full items-center justify-center">
          <video
            ref={videoRef}
            className={reduced ? "hidden" : "max-h-none max-w-none object-contain"}
            src="/media/hero.mp4"
            poster="/media/hero-start.jpg"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            style={
              reduced
                ? undefined
                : {
                    width: frame.width,
                    height: frame.height,
                    transform: `scale(${scale})`,
                    transformOrigin: "50% 40%",
                  }
            }
            onLoadedMetadata={() => {
              const video = videoRef.current;
              if (video) {
                video.pause();
                setReady(true);
              }
            }}
          />
        </div>
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
          className={`absolute inset-0 flex flex-col justify-end px-5 pt-28 pb-16 md:justify-center md:px-12 md:pb-24 ${
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

        {!reduced && overlay < 0.5 ? (
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
