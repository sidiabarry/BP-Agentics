"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Weicher Halt an der Werkstatt-Bühne: Wheel- und Touch-Deltas werden etwa
 * 1 s stark gedämpft (0,05 → 1,0), nicht auf 0 gesetzt und nicht per Pin /
 * body-overflow gesperrt. Einmal pro Eintritt, sobald die Bühne im Bild ist.
 * Offene Station: kein Halt. Tastatur bleibt frei.
 */

const HOLD_MS = 1000;
const DAMP_START = 0.05;
const DAMP_END = 1;

function headerPx() {
  const header = document.querySelector("header");
  if (header instanceof HTMLElement) {
    const h = header.getBoundingClientRect().height;
    if (h > 0) return h;
  }
  return 76;
}

function dampAt(holdStart: number) {
  const t = Math.min(1, (performance.now() - holdStart) / HOLD_MS);
  const eased = 1 - (1 - t) * (1 - t);
  return DAMP_START + (DAMP_END - DAMP_START) * eased;
}

function stageArrived(rect: DOMRectReadOnly) {
  const header = headerPx();
  const vh = window.innerHeight;
  return rect.top <= header + vh * 0.3 && rect.bottom > header + 96;
}

function stageClearlyAway(rect: DOMRectReadOnly) {
  const header = headerPx();
  const vh = window.innerHeight;
  return rect.bottom < header - 24 || rect.top > vh * 0.7;
}

function mark(el: HTMLElement | null, on: boolean) {
  if (!el) return;
  if (on) el.setAttribute("data-ws-hold", "on");
  else el.removeAttribute("data-ws-hold");
}

export function useSoftScrollHold(
  stageRef: RefObject<HTMLElement | null>,
  options: { enabled: boolean },
) {
  const enabledRef = useRef(options.enabled);
  enabledRef.current = options.enabled;
  const armedRef = useRef(true);
  const releaseRef = useRef<() => void>(() => {});

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let holding = false;
    let holdStart = 0;
    let holdTimer = 0;
    let lastTouchY = 0;
    let observer: IntersectionObserver | null = null;

    const release = () => {
      holding = false;
      mark(stage, false);
      if (holdTimer) {
        window.clearTimeout(holdTimer);
        holdTimer = 0;
      }
    };

    const begin = () => {
      if (!enabledRef.current || !armedRef.current || holding) return;
      if (!stageArrived(stage.getBoundingClientRect())) return;
      armedRef.current = false;
      holding = true;
      holdStart = performance.now();
      mark(stage, true);
      holdTimer = window.setTimeout(release, HOLD_MS);
    };

    const inspect = () => {
      const rect = stage.getBoundingClientRect();
      if (stageClearlyAway(rect)) {
        armedRef.current = true;
        release();
        return;
      }
      if (enabledRef.current) begin();
    };

    const onWheel = (event: WheelEvent) => {
      if (!enabledRef.current) {
        release();
        return;
      }
      inspect();
      if (!holding) return;
      if (performance.now() - holdStart >= HOLD_MS) {
        release();
        return;
      }
      event.preventDefault();
      const dy = event.deltaY * dampAt(holdStart);
      if (dy !== 0) window.scrollBy(0, dy);
    };

    const onTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!enabledRef.current) {
        release();
        return;
      }
      inspect();
      if (!holding) return;
      if (performance.now() - holdStart >= HOLD_MS) {
        release();
        return;
      }
      const y = event.touches[0]?.clientY ?? lastTouchY;
      const raw = lastTouchY - y;
      lastTouchY = y;
      if (Math.abs(raw) < 2) return;
      event.preventDefault();
      window.scrollBy(0, raw * dampAt(holdStart));
    };

    const connectObserver = () => {
      observer?.disconnect();
      const header = headerPx();
      observer = new IntersectionObserver(
        () => inspect(),
        { rootMargin: `-${header}px 0px -45% 0px`, threshold: [0, 0.05, 0.15] },
      );
      observer.observe(stage);
      inspect();
    };

    const onMotionChange = () => {
      if (motion.matches) release();
    };

    releaseRef.current = release;
    connectObserver();
    window.addEventListener("scroll", inspect, { passive: true });
    window.addEventListener("resize", connectObserver);
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    motion.addEventListener("change", onMotionChange);

    return () => {
      releaseRef.current = () => {};
      release();
      observer?.disconnect();
      window.removeEventListener("scroll", inspect);
      window.removeEventListener("resize", connectObserver);
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [stageRef]);

  useEffect(() => {
    enabledRef.current = options.enabled;
    if (!options.enabled) releaseRef.current();
  }, [options.enabled]);
}
