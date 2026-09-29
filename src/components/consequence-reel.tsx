"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { officeSlides } from "@/lib/content";

const FADE_MS = 580;

function subscribeMotion(cb: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", cb);
  return () => media.removeEventListener("change", cb);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function chapterAt(stamps: readonly { at: number }[], seconds: number) {
  return stamps.reduce((chapter, stamp, index) => (seconds >= stamp.at ? index : chapter), 0);
}

// The clips burn their own clock chip and typed line into the bottom-left of the frame,
// so the overlay sits on the dark wall at the top left and never carries a caption.
function OfficeStamp({ time }: { time: string }) {
  const [day, clock] = time.split(/\s+/, 2);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-4 left-4 z-10 sm:top-6 sm:left-6 md:top-8 md:left-8"
    >
      <p className="font-heading text-[0.7rem] tracking-[0.32em] text-white/80 uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] sm:text-sm md:text-base">
        {day}
      </p>
      <p className="font-heading mt-0.5 text-4xl leading-none font-semibold tracking-[-0.04em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl">
        {clock}
      </p>
    </div>
  );
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
  const [incomingFor, setIncomingFor] = useState(activeIndex);
  const [stamp, setStamp] = useState({ slide: activeIndex, chapter: 0 });
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);

  // Reset while rendering, not in an effect: a stale `incomingOn` would paint one frame of the new clip's clock.
  if (incomingFor !== activeIndex) {
    setIncomingFor(activeIndex);
    if (activeIndex !== heldIndex) setIncomingOn(false);
  }

  const slide = officeSlides[activeIndex] ?? officeSlides[0];
  const held = officeSlides[heldIndex] ?? slide;
  const frameIndex = reduced || incomingOn ? activeIndex : heldIndex;
  const frameIsVideo = !reduced && (incomingOn || activeIndex !== heldIndex);
  const framed = officeSlides[frameIndex] ?? slide;
  const chapter = frameIsVideo && stamp.slide === frameIndex ? stamp.chapter : 0;
  const stampTime = (framed.stamps[chapter] ?? framed.stamps[0]).time;

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

  useEffect(() => {
    if (!frameIsVideo) return;
    const video = videosRef.current[frameIndex];
    if (!video) return;
    const { stamps } = officeSlides[frameIndex];
    const show = (seconds: number) => {
      const next = chapterAt(stamps, seconds);
      setStamp((prev) =>
        prev.slide === frameIndex && prev.chapter === next ? prev : { slide: frameIndex, chapter: next },
      );
    };
    const readClock = () => show(video.currentTime);
    const first = window.requestAnimationFrame(readClock);
    let frame = 0;
    const onFrame: VideoFrameRequestCallback = (_now, meta) => {
      show(meta.mediaTime);
      frame = video.requestVideoFrameCallback(onFrame);
    };
    const frameSync = typeof video.requestVideoFrameCallback === "function";
    if (frameSync) {
      frame = video.requestVideoFrameCallback(onFrame);
    } else {
      video.addEventListener("timeupdate", readClock);
    }
    video.addEventListener("seeked", readClock);

    return () => {
      window.cancelAnimationFrame(first);
      if (frameSync) video.cancelVideoFrameCallback(frame);
      video.removeEventListener("timeupdate", readClock);
      video.removeEventListener("seeked", readClock);
    };
  }, [frameIndex, frameIsVideo]);

  const isShown = (index: number) =>
    (index === activeIndex && incomingOn) ||
    (index === heldIndex && (activeIndex !== heldIndex || incomingOn));

  return (
    <div ref={wrapRef}>
      <div className="relative overflow-hidden rounded-[2rem] bg-[#14161C]">
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
                  "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out",
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
        <OfficeStamp time={stampTime} />
      </div>
      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-[1.15rem] text-[#3A3D45]">{slide.caption}</p>
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
