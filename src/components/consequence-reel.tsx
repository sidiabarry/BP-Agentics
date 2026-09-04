"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { consequenceClips } from "@/lib/content";
import { cn } from "@/lib/utils";

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
  const [inView, setInView] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);
  const clip = consequenceClips[index];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35);
      },
      { threshold: [0, 0.35, 0.6] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const playIfVisible = useCallback(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, reduced]);

  useEffect(() => {
    playIfVisible();
  }, [playIfVisible, index]);

  const advance = () => {
    setIndex((current) => (current + 1) % consequenceClips.length);
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
          <video
            key={clip.src}
            ref={videoRef}
            className="aspect-video h-auto w-full object-cover"
            src={clip.src}
            poster={clip.poster}
            muted
            playsInline
            preload="auto"
            aria-label={`${clip.time}: ${clip.caption}`}
            onEnded={advance}
            onLoadedData={playIfVisible}
          />
        )}
      </div>
      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-[1.05rem] text-[#14161C]">
          <span className="font-semibold">{clip.time}</span>
          <span className="text-[#3A3D45]"> — {clip.caption}</span>
        </p>
        <div className="flex items-center gap-2" role="tablist" aria-label="Tageszeit">
          {consequenceClips.map((item, itemIndex) => (
            <button
              key={item.time}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={item.time}
              onClick={() => setIndex(itemIndex)}
              className={cn(
                "size-2.5 rounded-full transition-colors",
                itemIndex === index ? "bg-[#5B54E6]" : "bg-[#14161C]/20 hover:bg-[#14161C]/40",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
