"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

const HERO_VH = 340;
const VIDEO_ASPECT = 828 / 1108;
const VIDEO_SCROLL = 0.66;
const OVERLAY_AT = 0.72;
const SCALE_FROM = 0.8;
const HEADER_SAFE = 96;
const FOOT_SAFE = 32;

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

function startFrame(width: number, height: number) {
  return containSize(width, Math.max(height - HEADER_SAFE - FOOT_SAFE, 1));
}

function subscribeViewport(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

function viewportSnapshot() {
  return `${window.innerWidth}x${window.innerHeight}`;
}

function coverScaleFor(width: number, height: number) {
  const fitted = startFrame(width, height);
  return Math.max(width / fitted.width, height / fitted.height);
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function overlayFrom(progress: number) {
  return Math.min(1, Math.max(0, (progress - OVERLAY_AT) / 0.08));
}

export function HeroScrub() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBoxRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const seekingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const coverScaleRef = useRef(1);

  const viewportKey = useSyncExternalStore(
    subscribeViewport,
    viewportSnapshot,
    () => "1280x800",
  );
  const [viewW, viewH] = viewportKey.split("x").map(Number);
  const coverScale = coverScaleFor(viewW, viewH);
  const frame = startFrame(viewW, viewH);
  coverScaleRef.current = coverScale;
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);
  const [ready, setReady] = useState(false);
  const [headerTone, setHeaderTone] = useState<"light" | "dark">("light");

  const flushSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || seekingRef.current || !video.duration) return;
    const t = targetTimeRef.current;
    if (Math.abs(video.currentTime - t) < 0.02) return;
    seekingRef.current = true;
    video.currentTime = t;
  }, []);

  const applyVisuals = useCallback(
    (progress: number) => {
      const videoProgress = Math.min(1, progress / VIDEO_SCROLL);
      const scaleT = easeInOut(
        Math.min(1, Math.max(0, (videoProgress - SCALE_FROM) / (1 - SCALE_FROM))),
      );
      const scale = 1 + (coverScaleRef.current - 1) * scaleT;
      const overlay = reduced ? 1 : overlayFrom(progress);

      if (videoBoxRef.current) {
        videoBoxRef.current.style.transform = `scale(${scale})`;
      }
      if (overlayRef.current) overlayRef.current.style.opacity = String(overlay);
      if (copyRef.current) {
        copyRef.current.style.opacity = String(overlay);
        const entered = overlay > 0.55;
        copyRef.current.classList.toggle("pointer-events-auto", entered);
        copyRef.current.classList.toggle("pointer-events-none", !entered);
        if (overlay > 0.55) {
          copyRef.current.classList.add("hero-copy-in");
        } else if (overlay <= 0.01) {
          copyRef.current.classList.remove("hero-copy-in");
        }
      }
      if (skipRef.current) {
        skipRef.current.hidden = overlay >= 0.5;
      }

      const nextTone = overlay > 0.35 ? "dark" : "light";
      setHeaderTone((prev) => (prev === nextTone ? prev : nextTone));
    },
    [reduced],
  );

  const sync = useCallback(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const total = wrap.offsetHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
    const next = total > 0 ? scrolled / total : 1;
    applyVisuals(next);

    if (!ready || !video?.duration || !Number.isFinite(video.duration)) return;
    const videoProgress = Math.min(1, next / VIDEO_SCROLL);
    targetTimeRef.current = videoProgress * Math.max(video.duration - 0.04, 0);
    flushSeek();
  }, [applyVisuals, flushSeek, ready]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || video.readyState < 3) return;
    video.pause();
    setReady(true);
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

  const skip = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const total = wrap.offsetHeight - window.innerHeight;
    const top = wrap.offsetTop + total * OVERLAY_AT;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

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
        <SiteHeader tone={reduced ? "dark" : headerTone} />
        <div className="flex h-dvh w-full items-center justify-center pt-24 pb-8">
          <video
            ref={(node) => {
              videoRef.current = node;
              videoBoxRef.current = node;
            }}
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
                    transform: "scale(1)",
                    transformOrigin: "50% 40%",
                  }
            }
            onSeeked={() => {
              seekingRef.current = false;
              flushSeek();
            }}
            onCanPlayThrough={() => {
              const video = videoRef.current;
              if (video) {
                video.pause();
                setReady(true);
              }
            }}
          />
        </div>
        {!reduced && !ready ? (
          <p className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 text-sm tracking-[0.18em] text-[#14161C]/50 uppercase">
            Szene lädt
          </p>
        ) : null}
        {reduced ? (
          <div
            className="relative min-h-dvh bg-cover bg-center"
            style={{ backgroundImage: "url(/media/hero-end.jpg)" }}
          />
        ) : null}

        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: reduced ? 1 : 0,
            background:
              "linear-gradient(180deg, #3d37c8 0%, #5B54E6 38%, #241c78 100%)",
          }}
        />

        <div
          ref={copyRef}
          className={`absolute inset-0 flex flex-col justify-end px-5 pt-28 pb-16 md:justify-center md:px-12 md:pb-24 ${
            reduced ? "hero-copy-in pointer-events-auto" : "pointer-events-none"
          }`}
          style={{ opacity: reduced ? 1 : 0 }}
        >
          <div className="mx-auto w-full max-w-4xl">
            <p className="hero-kicker text-[0.78rem] tracking-[0.28em] text-white/80 uppercase">
              Systems & Automation · BP Agentics / Hagen
            </p>
            <h1 className="mt-4 max-w-[18ch] text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.03em] text-white hyphens-auto sm:text-6xl md:text-7xl">
              <span className="hero-line-1 block">Ihr Betrieb läuft.</span>
              <span className="hero-line-2 block">Nur digital nicht.</span>
            </h1>
            <p className="hero-lead mt-6 max-w-[38rem] text-[1.15rem] leading-relaxed text-white/90 md:text-[1.25rem]">
              Websites und Systeme für mittelständische Betriebe, die noch mit
              Telefon, Zetteln und Excel arbeiten. Fester Festpreis, in Wochen
              einsatzbereit, ein persönlicher Ansprechpartner.
            </p>
            <div className="hero-tags mt-7 flex flex-wrap gap-2">
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
            <div className="hero-cta mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                <Link href="/#arbeiten">Den Alltag ansehen</Link>
              </Button>
            </div>
          </div>
        </div>

        {!reduced ? (
          <button
            ref={skipRef}
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
