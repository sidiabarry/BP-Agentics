"use client";

/**
 * DemoPlayer — BP Agentics
 * ---------------------------------------------------------------------------
 * <DemoLoop />   Querformat-Schleife (Dachdecker) mit optionaler Vollversion
 * <PhoneDemo />  Hochformat-Schleife im Telefonrahmen (Feinkost Kreta)
 *
 * src steht erst, wenn der Block nahe ist. preload="none" allein reicht in
 * Chrome nicht. prefers-reduced-motion lädt nie ein Video.
 * ---------------------------------------------------------------------------
 */

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function useNearAndPlaying(wrapRef: RefObject<HTMLElement | null>, motion: boolean) {
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !motion) {
      setNear(false);
      setInView(false);
      return;
    }
    const nearObserver = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    const playObserver = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25),
      { threshold: [0, 0.25, 0.6] },
    );
    nearObserver.observe(el);
    playObserver.observe(el);
    return () => {
      nearObserver.disconnect();
      playObserver.disconnect();
    };
  }, [wrapRef, motion]);

  return { near, inView };
}

function useMotionAllowed() {
  const [allowed, setAllowed] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAllowed(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return allowed;
}

function useLoopPlayback(
  videoRef: RefObject<HTMLVideoElement | null>,
  inView: boolean,
  motion: boolean,
) {
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !motion) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [videoRef, inView, motion]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onVisibility = () => {
      if (document.hidden) el.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [videoRef]);
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        className="max-w-[min(96vw,72rem)] border-0 bg-black p-3 text-white sm:max-w-[min(96vw,72rem)]"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">Vollständige Produktdemo</DialogTitle>
        <video
          src={src}
          controls
          autoPlay
          playsInline
          className="max-h-[88dvh] w-auto max-w-full justify-self-center rounded-xl"
        />
      </DialogContent>
    </Dialog>
  );
}

type DemoLoopProps = {
  src: string;
  poster: string;
  fullSrc?: string;
  caption?: string;
  note?: string;
  posterAlt?: string;
  className?: string;
};

export function DemoLoop({
  src,
  poster,
  fullSrc,
  caption,
  note,
  posterAlt,
  className = "",
}: DemoLoopProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const motion = useMotionAllowed();
  const [open, setOpen] = useState(false);
  const { near, inView } = useNearAndPlaying(wrapRef, motion);
  useLoopPlayback(videoRef, inView, motion);
  const close = useCallback(() => setOpen(false), []);

  return (
    <figure ref={wrapRef} className={className}>
      <div className="relative overflow-hidden rounded-2xl bg-[#14161C] shadow-xl ring-1 ring-black/10">
        {motion ? (
          <video
            ref={videoRef}
            src={near ? src : undefined}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label={posterAlt ?? caption ?? "Produktdemo"}
            width={1440}
            height={810}
            className="block aspect-video h-auto w-full"
            onLoadedData={() => {
              if (inView) videoRef.current?.play().catch(() => {});
            }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt={posterAlt ?? caption ?? "Produktdemo"} width={1440} height={810} className="block aspect-video h-auto w-full" />
        )}
        {fullSrc ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute right-4 bottom-4 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-[#14161C] shadow-lg transition hover:bg-white focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:outline-none"
          >
            Ganze Demo ansehen
          </button>
        ) : null}
      </div>
      {caption || note ? (
        <figcaption className="mt-3 text-sm text-[#5C5F66]">
          {caption}
          {note ? <span className="ml-2 text-[#5C5F66]/70">{note}</span> : null}
        </figcaption>
      ) : null}
      {open && fullSrc ? <Lightbox src={fullSrc} onClose={close} /> : null}
    </figure>
  );
}

type PhoneDemoProps = Omit<DemoLoopProps, "className"> & {
  className?: string;
  width?: number;
};

export function PhoneDemo({
  src,
  poster,
  fullSrc,
  caption,
  note,
  posterAlt,
  className = "",
  width = 300,
}: PhoneDemoProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const motion = useMotionAllowed();
  const [open, setOpen] = useState(false);
  const { near, inView } = useNearAndPlaying(wrapRef, motion);
  useLoopPlayback(videoRef, inView, motion);
  const close = useCallback(() => setOpen(false), []);

  return (
    <figure ref={wrapRef} className={cn("flex flex-col items-center", className)}>
      <div
        style={{ width }}
        className="relative rounded-[2.2rem] bg-[#14161C] p-2 shadow-2xl ring-1 ring-black/20"
      >
        <div className="absolute top-3 left-1/2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/20" />
        <div className="overflow-hidden rounded-[1.7rem] bg-black">
          {motion ? (
            <video
              ref={videoRef}
              src={near ? src : undefined}
              poster={poster}
              muted
              loop
              playsInline
              preload="none"
              aria-label={posterAlt ?? caption ?? "App-Demo"}
              width={390}
              height={844}
              className="block aspect-[390/844] h-auto w-full"
              onLoadedData={() => {
                if (inView) videoRef.current?.play().catch(() => {});
              }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt={posterAlt ?? caption ?? "App-Demo"} width={390} height={844} className="block aspect-[390/844] h-auto w-full" />
          )}
        </div>
      </div>
      {fullSrc ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 text-sm font-medium text-[#9FD0F8] underline underline-offset-4 hover:text-white"
        >
          Ganzen Bestellweg ansehen
        </button>
      ) : null}
      {caption || note ? (
        <figcaption className="mt-3 max-w-xs text-center text-sm text-white/70">
          {caption}
          {note ? <span className="mt-1 block text-white/45">{note}</span> : null}
        </figcaption>
      ) : null}
      {open && fullSrc ? <Lightbox src={fullSrc} onClose={close} /> : null}
    </figure>
  );
}
