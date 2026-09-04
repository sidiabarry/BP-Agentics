"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

const HERO_VH = 360;
const VIDEO_END = 0.8;
const OVERLAY_AT = 0.9;
const OVERLAY_DUR = 0.07;
const DESKTOP_FRAMES = 71;
const MOBILE_FRAMES = 48;
const HEADER_AT = 0.8;

function subscribeMotion(cb: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", cb);
  return () => media.removeEventListener("change", cb);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeMobile(cb: () => void) {
  const media = window.matchMedia("(max-width: 767px)");
  media.addEventListener("change", cb);
  return () => media.removeEventListener("change", cb);
}

function mobileSnapshot() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function overlayFrom(progress: number) {
  return Math.min(1, Math.max(0, (progress - OVERLAY_AT) / OVERLAY_DUR));
}

function sequenceProgressFrom(progress: number) {
  return Math.min(1, Math.max(0, progress / VIDEO_END));
}

function frameIndexFrom(progress: number, count: number) {
  return Math.round(sequenceProgressFrom(progress) * (count - 1));
}

function frameSrc(kind: "desktop" | "mobile", index: number) {
  return `/media/hero-sequence/${kind}/${String(index + 1).padStart(4, "0")}.webp`;
}

function lastFrameSrc(kind: "desktop" | "mobile") {
  const count = kind === "mobile" ? MOBILE_FRAMES : DESKTOP_FRAMES;
  return frameSrc(kind, count - 1);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(src));
    img.src = src;
  });
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
) {
  const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
}

function nearestLoaded(cache: Array<HTMLImageElement | undefined>, index: number) {
  if (cache[index]) return cache[index];
  for (let distance = 1; distance < cache.length; distance += 1) {
    const next = cache[index + distance];
    if (next) return next;
    const prev = cache[index - distance];
    if (prev) return prev;
  }
  return undefined;
}

const HERO_TAGS = ["Aus Hagen", "Alle Daten in der EU", "Feste Preise, keine Stundenzettel"];

export function HeroScrub() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef(0);
  const cacheRef = useRef<Array<HTMLImageElement | undefined>>([]);
  const kindRef = useRef<"desktop" | "mobile">("desktop");
  const rafRef = useRef(0);

  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);
  const mobile = useSyncExternalStore(subscribeMobile, mobileSnapshot, () => false);
  const kind: "desktop" | "mobile" = mobile ? "mobile" : "desktop";
  const frameCount = kind === "mobile" ? MOBILE_FRAMES : DESKTOP_FRAMES;
  kindRef.current = kind;

  const [hasFrame, setHasFrame] = useState(false);
  const [headerTone, setHeaderTone] = useState<"light" | "dark">("light");

  const applyVisuals = useCallback(
    (progress: number) => {
      const overlay = reduced ? 1 : overlayFrom(progress);
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
      const nextTone =
        overlay > 0.35 || sequenceProgressFrom(progress) >= HEADER_AT ? "dark" : "light";
      setHeaderTone((prev) => (prev === nextTone ? prev : nextTone));
    },
    [reduced],
  );

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const count = kindRef.current === "mobile" ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const index = frameIndexFrom(progressRef.current, count);
    const img = nearestLoaded(cacheRef.current, index);
    if (!img) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const pixelW = Math.max(1, Math.round(width * dpr));
    const pixelH = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== pixelW || canvas.height !== pixelH) {
      canvas.width = pixelW;
      canvas.height = pixelH;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawCover(ctx, img, width, height);
  }, []);

  const readProgress = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return 0;
    const rect = wrap.getBoundingClientRect();
    const total = wrap.offsetHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
    return total > 0 ? scrolled / total : 1;
  }, []);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      progressRef.current = readProgress();
      applyVisuals(progressRef.current);
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        paint();
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, applyVisuals, readProgress, paint]);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const count = kind === "mobile" ? MOBILE_FRAMES : DESKTOP_FRAMES;
    cacheRef.current = new Array(count);
    setHasFrame(false);

    const loadRange = async (start: number, end: number, concurrency: number) => {
      let cursor = start;
      const workers = Array.from({ length: concurrency }, async () => {
        while (!cancelled) {
          const index = cursor;
          cursor += 1;
          if (index > end) return;
          try {
            const img = await loadImage(frameSrc(kind, index));
            if (cancelled) return;
            cacheRef.current[index] = img;
            if (index === 0) {
              setHasFrame(true);
              paint();
            }
          } catch {
            // Frame failed; nearestLoaded will skip it.
          }
        }
      });
      await Promise.all(workers);
    };

    const run = async () => {
      await loadRange(0, 0, 1);
      if (cancelled) return;
      paint();
      await loadRange(1, count - 1, 6);
      if (!cancelled) paint();
    };
    void run();

    return () => {
      cancelled = true;
    };
  }, [kind, reduced, paint]);

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
          reduced ? "relative" : "sticky top-0 h-dvh overflow-hidden bg-[#f4f4f2]"
        }
      >
        <SiteHeader tone={reduced ? "dark" : headerTone} />

        {reduced ? (
          <div className="relative min-h-dvh">
            <Image
              src={lastFrameSrc(kind)}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            />
            {!hasFrame ? (
              <picture>
                <source srcSet="/media/hero-sequence/poster.avif" type="image/avif" />
                <img
                  src="/media/hero-sequence/poster-fallback.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
            ) : null}
          </>
        )}

        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: reduced ? 1 : 0,
            background:
              "linear-gradient(180deg, #63A6EC 0%, #198BE8 38%, #0C5A9A 100%)",
          }}
        />

        <div
          ref={copyRef}
          className={`absolute inset-0 flex flex-col justify-end px-5 pt-28 pb-28 md:justify-center md:px-12 md:pb-24 ${
            reduced ? "hero-copy-in pointer-events-auto" : "pointer-events-none"
          }`}
          style={{ opacity: reduced ? 1 : 0 }}
        >
          <div className="mx-auto w-full max-w-4xl">
            <p className="hero-kicker text-[0.72rem] tracking-[0.16em] text-white/80 uppercase sm:text-[0.78rem] sm:tracking-[0.28em]">
              Systems & Automation · BP Agentics / Hagen
            </p>
            <h1 className="mt-4 max-w-[18ch] text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.03em] text-white text-balance sm:text-6xl md:text-7xl">
              <span className="hero-line-1 block">Ihr Betrieb läuft.</span>
              <span className="hero-line-2 block">Nur digital nicht.</span>
            </h1>
            <p className="hero-lead mt-5 max-w-[40rem] text-[1.15rem] leading-relaxed text-pretty text-white/90 md:text-[1.25rem]">
              Websites und Systeme für mittelständische Betriebe, die noch mit
              Telefon, Zetteln und Excel arbeiten. Fester Festpreis, in Wochen
              einsatzbereit, ein persönlicher Ansprechpartner.
            </p>
            <div className="hero-tags mt-7 flex flex-wrap gap-2">
              {HERO_TAGS.map((tag, index) => (
                <span
                  key={tag}
                  className="hero-tag rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-sm text-white"
                  style={{ "--i": index } as CSSProperties}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="hero-cta mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                className="h-13 rounded-full bg-white px-7 text-[1.05rem] text-[#0C5A9A] hover:bg-[#F3EFE6]"
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
            className="absolute right-5 bottom-24 z-10 inline-flex items-center gap-2 rounded-full bg-black/45 px-4 py-2 text-sm text-white backdrop-blur-sm md:right-8 md:bottom-6"
          >
            In den Bildschirm
            <ChevronDown className="size-4" />
          </button>
        ) : null}
      </div>
    </section>
  );
}
