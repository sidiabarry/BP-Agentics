"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Weicher Halt an der Werkstatt: Wheel- und Touch-Deltas werden 1,5 s
 * gedämpft (0,2 → 1,0), nicht auf 0 gesetzt und nicht per Pin / body-overflow
 * gesperrt. Einmal pro Eintritt. Tastatur bleibt frei.
 */

const HOLD_MS = 1500;
const DAMP_START = 0.2;
const DAMP_END = 1;
const WHEEL_RELEASE = 140;
const TOUCH_RELEASE = 80;
const LEAVE_ABOVE = 32;
const LEAVE_BELOW = 96;

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

export function useSoftScrollHold(
  sectionRef: RefObject<HTMLElement | null>,
  options: { enabled: boolean },
) {
  const enabledRef = useRef(options.enabled);
  enabledRef.current = options.enabled;
  const armedRef = useRef(true);
  const releaseRef = useRef<() => void>(() => {});

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let holding = false;
    let holdStart = 0;
    let holdTimer = 0;
    let lastTouchY = 0;
    let touchAccum = 0;
    let observer: IntersectionObserver | null = null;

    const release = () => {
      holding = false;
      if (holdTimer) {
        window.clearTimeout(holdTimer);
        holdTimer = 0;
      }
    };

    const begin = () => {
      if (!enabledRef.current || !armedRef.current || holding) return;
      armedRef.current = false;
      holding = true;
      holdStart = performance.now();
      holdTimer = window.setTimeout(release, HOLD_MS);
    };

    const clearlyLeft = (rect: DOMRectReadOnly) => {
      const header = headerPx();
      return rect.bottom < header - LEAVE_ABOVE || rect.top > header + LEAVE_BELOW;
    };

    const onWheel = (event: WheelEvent) => {
      if (!enabledRef.current) {
        release();
        return;
      }
      if (!holding) return;
      if (performance.now() - holdStart >= HOLD_MS) {
        release();
        return;
      }
      if (Math.abs(event.deltaY) >= WHEEL_RELEASE) {
        release();
        return;
      }
      event.preventDefault();
      const dy = event.deltaY * dampAt(holdStart);
      if (dy !== 0) window.scrollBy(0, dy);
    };

    const onTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? 0;
      touchAccum = 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!enabledRef.current) {
        release();
        return;
      }
      if (!holding) return;
      if (performance.now() - holdStart >= HOLD_MS) {
        release();
        return;
      }
      const y = event.touches[0]?.clientY ?? lastTouchY;
      const raw = lastTouchY - y;
      lastTouchY = y;
      if (Math.abs(raw) < 2) return;
      touchAccum += raw;
      if (Math.abs(raw) >= TOUCH_RELEASE || Math.abs(touchAccum) >= TOUCH_RELEASE * 1.4) {
        release();
        return;
      }
      event.preventDefault();
      window.scrollBy(0, raw * dampAt(holdStart));
    };

    const connectObserver = () => {
      observer?.disconnect();
      const header = headerPx();
      const band = Math.max(0, window.innerHeight - header - 2);
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          if (entry.isIntersecting) {
            begin();
            return;
          }
          if (clearlyLeft(entry.boundingClientRect)) {
            armedRef.current = true;
            release();
          }
        },
        { rootMargin: `-${header}px 0px -${band}px 0px`, threshold: 0 },
      );
      observer.observe(section);
    };

    const onMotionChange = () => {
      if (motion.matches) release();
    };

    releaseRef.current = release;
    connectObserver();
    window.addEventListener("resize", connectObserver);
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    motion.addEventListener("change", onMotionChange);

    return () => {
      releaseRef.current = () => {};
      release();
      observer?.disconnect();
      window.removeEventListener("resize", connectObserver);
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [sectionRef]);

  useEffect(() => {
    enabledRef.current = options.enabled;
    if (!options.enabled) releaseRef.current();
  }, [options.enabled]);
}
