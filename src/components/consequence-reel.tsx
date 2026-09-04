"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { officeSlides } from "@/lib/content";

function subscribeMotion(cb: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", cb);
  return () => media.removeEventListener("change", cb);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ConsequenceReel({
  activeIndex,
  onIndexChange,
}: {
  activeIndex: number;
  onIndexChange: (index: number) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);
  const slide = officeSlides[activeIndex] ?? officeSlides[0];
  const nextSlide = officeSlides[(activeIndex + 1) % officeSlides.length] ?? officeSlides[0];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35);
      },
      { threshold: [0, 0.35, 0.6] },
    );
    nearObserver.observe(el);
    playObserver.observe(el);
    return () => {
      nearObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setPlaying(false);
  }, [activeIndex]);

  const playIfVisible = useCallback(() => {
    const video = videoRef.current;
    if (!video || reduced || !near) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, near, reduced]);

  useEffect(() => {
    playIfVisible();
  }, [playIfVisible, activeIndex]);

  const goTo = (nextIndex: number) => {
    setPlaying(false);
    onIndexChange(nextIndex);
  };

  const advance = () => {
    goTo((activeIndex + 1) % officeSlides.length);
  };

  return (
    <div ref={wrapRef}>
      <div className="overflow-hidden rounded-[2rem] bg-[#14161C]">
        {reduced ? (
          <Image
            src={slide.poster}
            alt={`${slide.time} — ${slide.caption}`}
            width={1600}
            height={900}
            className="aspect-video h-auto w-full object-cover"
          />
        ) : (
          <div className="relative aspect-video w-full bg-[#14161C]">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={near ? slide.src : undefined}
              poster={slide.poster}
              muted
              playsInline
              preload={near ? "auto" : "none"}
              aria-label={`${slide.time}: ${slide.caption}`}
              onEnded={advance}
              onLoadedData={playIfVisible}
              onPlaying={() => setPlaying(true)}
            />
            {!playing ? (
              <Image
                src={slide.poster}
                alt=""
                fill
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
              />
            ) : null}
            {near ? (
              <video
                src={nextSlide.src}
                muted
                playsInline
                preload="auto"
                tabIndex={-1}
                aria-hidden
                className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
              />
            ) : null}
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-[1.05rem] text-[#14161C]">
          <span className="font-semibold">{slide.time}</span>
          <span className="text-[#3A3D45]"> — {slide.caption}</span>
        </p>
        <div className="flex items-center gap-2" role="tablist" aria-label="Tageszeit">
          {officeSlides.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === activeIndex}
              aria-label={`${item.label}: ${item.time}`}
              onClick={() => goTo(itemIndex)}
              className={cn(
                "flex size-11 items-center justify-center rounded-full",
              )}
            >
              <span
                className={cn(
                  "size-2.5 rounded-full transition-colors",
                  itemIndex === activeIndex ? "bg-[#198BE8]" : "bg-[#14161C]/20",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
