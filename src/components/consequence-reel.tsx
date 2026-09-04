"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CLIPS = [
  {
    src: "/media/buero-morgen.mp4",
    poster: "/media/buero-morgen.jpg",
    time: "Morgen",
    caption: "Die erste Papierlage.",
  },
  {
    src: "/media/buero-nachmittag.mp4",
    poster: "/media/buero-nachmittag.jpg",
    time: "Nachmittag",
    caption: "Binder, Zettel, Excel.",
  },
  {
    src: "/media/buero-nacht.mp4",
    poster: "/media/buero-nacht.jpg",
    time: "Nacht",
    caption: "Nur noch die Schreibtischlampe.",
  },
] as const;

function subscribeMotion(cb: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", cb);
  return () => media.removeEventListener("change", cb);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ConsequenceReel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);
  const clip = CLIPS[index] ?? CLIPS[0];
  const nextClip = CLIPS[(index + 1) % CLIPS.length] ?? CLIPS[0];

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
  }, [index]);

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
  }, [playIfVisible, index]);

  const goTo = (nextIndex: number) => {
    setPlaying(false);
    setIndex(nextIndex);
  };

  const advance = () => {
    goTo((index + 1) % CLIPS.length);
  };

  return (
    <div ref={wrapRef}>
      <div className="overflow-hidden rounded-[2rem] bg-[#14161C]">
        {reduced ? (
          <Image
            src="/media/buero.jpg"
            alt="Büro am Lager: Laptop, Festnetz, Zettel. Der Alltag ohne Setter und ohne Datenfundament."
            width={1600}
            height={900}
            className="aspect-video h-auto w-full object-cover"
          />
        ) : (
          <div className="relative aspect-video w-full bg-[#14161C]">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={near ? clip.src : undefined}
              poster={clip.poster}
              muted
              playsInline
              preload={near ? "auto" : "none"}
              aria-label={`${clip.time}: ${clip.caption}`}
              onEnded={advance}
              onLoadedData={playIfVisible}
              onPlaying={() => setPlaying(true)}
            />
            {!playing ? (
              <Image
                src={clip.poster}
                alt=""
                fill
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
              />
            ) : null}
            {near ? (
              <video
                src={nextClip.src}
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
          <span className="font-semibold">{clip.time}</span>
          <span className="text-[#3A3D45]"> — {clip.caption}</span>
        </p>
        <div className="flex items-center gap-2" role="tablist" aria-label="Tageszeit">
          {CLIPS.map((item, itemIndex) => (
            <button
              key={item.time}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={item.time}
              onClick={() => goTo(itemIndex)}
              className={cn(
                "size-2.5 rounded-full transition-colors",
                itemIndex === index ? "bg-[#198BE8]" : "bg-[#14161C]/20 hover:bg-[#14161C]/40",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
