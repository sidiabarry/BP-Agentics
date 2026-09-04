"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { officeSlides } from "@/lib/content";

const FADE_MS = 220;

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
  const videosRef = useRef<Array<HTMLVideoElement | null>>([]);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [heldIndex, setHeldIndex] = useState(activeIndex);
  const [incomingOn, setIncomingOn] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);
  const slide = officeSlides[activeIndex] ?? officeSlides[0];
  const held = officeSlides[heldIndex] ?? slide;

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

  const rewindOthers = useCallback((keep: number) => {
    videosRef.current.forEach((video, index) => {
      if (!video || index === keep) return;
      video.pause();
      if (video.currentTime > 0.01) {
        video.currentTime = 0;
      }
    });
  }, []);

  useEffect(() => {
    if (reduced || !near) return;
    const incoming = videosRef.current[activeIndex];
    if (!incoming) return;
    let cancelled = false;

    if (activeIndex !== heldIndex) {
      setIncomingOn(false);
    }

    if (!inView) {
      videosRef.current.forEach((video) => video?.pause());
      return;
    }

    const playIncoming = () => {
      if (cancelled) return;
      incoming.play().catch(() => {});
    };

    if (incoming.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      playIncoming();
    } else {
      incoming.addEventListener("loadeddata", playIncoming, { once: true });
    }

    return () => {
      cancelled = true;
      incoming.removeEventListener("loadeddata", playIncoming);
    };
  }, [activeIndex, heldIndex, near, inView, reduced]);

  useEffect(() => {
    if (reduced || !incomingOn || heldIndex === activeIndex) return;
    const id = window.setTimeout(() => {
      setHeldIndex(activeIndex);
    }, FADE_MS);
    return () => window.clearTimeout(id);
  }, [incomingOn, heldIndex, activeIndex, reduced]);

  useEffect(() => {
    if (reduced || heldIndex !== activeIndex) return;
    const id = window.setTimeout(() => {
      rewindOthers(heldIndex);
    }, FADE_MS);
    return () => window.clearTimeout(id);
  }, [heldIndex, activeIndex, reduced, rewindOthers]);

  useEffect(() => {
    if (!reduced) return;
    setHeldIndex(activeIndex);
    setIncomingOn(false);
  }, [activeIndex, reduced]);

  const isShown = (index: number) =>
    (index === activeIndex && incomingOn) ||
    (index === heldIndex && (activeIndex !== heldIndex || incomingOn));

  return (
    <div ref={wrapRef}>
      <div className="overflow-hidden rounded-[2rem] bg-[#14161C]">
        {reduced ? (
          <Image
            src={slide.poster}
            alt={slide.alt}
            width={1600}
            height={900}
            className="aspect-video h-auto w-full object-cover"
          />
        ) : (
          <div className="relative aspect-video w-full bg-[#14161C]">
            <Image
              src={held.poster}
              alt={held.alt}
              fill
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover"
            />
            {officeSlides.map((item, index) => (
              <video
                key={item.id}
                ref={(node) => {
                  videosRef.current[index] = node;
                }}
                className={cn(
                  "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity ease-out",
                  isShown(index) ? "opacity-100" : "opacity-0",
                )}
                style={{
                  transitionDuration: `${FADE_MS}ms`,
                  zIndex: index === activeIndex ? 2 : 1,
                }}
                src={near ? item.src : undefined}
                muted
                playsInline
                preload={near ? "auto" : "none"}
                aria-hidden={index !== activeIndex}
                aria-label={index === activeIndex ? `${item.time}: ${item.caption}` : undefined}
                onPlaying={() => {
                  if (index === activeIndex) setIncomingOn(true);
                }}
                onEnded={() => {
                  if (index !== activeIndex) return;
                  onIndexChange((index + 1) % officeSlides.length);
                }}
              />
            ))}
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
              onClick={() => onIndexChange(itemIndex)}
              className="flex size-11 items-center justify-center rounded-full"
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
