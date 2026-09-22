"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Weicher Halt an der Werkstatt-Bühne: etwa 1 s stark dämpfen
 * (kein Pin, kein overflow:hidden, keine Falle). Einmal pro Eintritt.
 * Offene Station: kein Halt. Tastatur bleibt frei.
 */

const HOLD_MS = 1000;
const SOLID_MS = 480;
const DAMP_START = 0.14;
const DAMP_END = 1;
const REARM_MS = 900;

function headerPx() {
  const header = document.querySelector("header");
  if (header instanceof HTMLElement) {
    const h = header.getBoundingClientRect().height;
    if (h > 0) return h;
  }
  return 76;
}

function dampAt(holdStart: number) {
  const elapsed = performance.now() - holdStart;
  if (elapsed >= HOLD_MS) return DAMP_END;
  if (elapsed <= SOLID_MS) return DAMP_START;
  const t = (elapsed - SOLID_MS) / (HOLD_MS - SOLID_MS);
  const eased = t * t;
  return DAMP_START + (DAMP_END - DAMP_START) * eased;
}

function stageArrived(rect: DOMRectReadOnly) {
  const header = headerPx();
  const vh = window.innerHeight;
  return rect.top <= header + vh * 0.38 && rect.bottom > header + 80;
}

function stageClearlyAway(rect: DOMRectReadOnly) {
  const header = headerPx();
  const vh = window.innerHeight;
  return rect.bottom < header - 24 || rect.top > vh * 0.82;
}

function mark(el: HTMLElement | null, on: boolean, at = 0) {
  if (!el) return;
  if (on) {
    el.setAttribute("data-ws-hold", "on");
    el.setAttribute("data-ws-hold-at", String(Math.round(at)));
  } else {
    el.removeAttribute("data-ws-hold");
    el.removeAttribute("data-ws-hold-at");
  }
}

export function useSoftScrollHold(
  stageRef: RefObject<HTMLElement | null>,
  options: { enabled: boolean },
) {
  const enabledRef = useRef(options.enabled);
  enabledRef.current = options.enabled;
  const releaseRef = useRef<() => void>(() => {});

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let cancelled = false;
    let armed = true;
    let holding = false;
    let releasedAt = 0;
    let holdStart = 0;
    let holdTimer = 0;
    let pulse = 0;
    let lastTouchY = 0;
    let expectedY = 0;
    let syncing = false;
    let observer: IntersectionObserver | null = null;
    let retry = 0;
    let poll = 0;
    let bound: HTMLElement | null = null;

    const stage = () =>
      stageRef.current ?? document.querySelector<HTMLElement>("#werkstatt .ws__stage");

    const release = () => {
      if (holding) releasedAt = performance.now();
      holding = false;
      mark(stage(), false);
      if (holdTimer) {
        window.clearTimeout(holdTimer);
        holdTimer = 0;
      }
      if (pulse) {
        window.clearInterval(pulse);
        pulse = 0;
      }
    };

    const tick = () => {
      if (!holding || cancelled) return;
      if (performance.now() - holdStart >= HOLD_MS) {
        release();
        return;
      }
      restrain();
    };

    const begin = () => {
      const el = stage();
      if (!el || !enabledRef.current || !armed || holding) return;
      if (releasedAt && performance.now() - releasedAt < REARM_MS) return;
      if (!stageArrived(el.getBoundingClientRect())) return;
      armed = false;
      holding = true;
      holdStart = performance.now();
      expectedY = window.scrollY;
      mark(el, true, holdStart);
      holdTimer = window.setTimeout(release, HOLD_MS);
      if (!pulse) pulse = window.setInterval(tick, 16);
    };

    const inspect = () => {
      const el = stage();
      if (!el) return;
      if (holding) return;
      if (releasedAt && performance.now() - releasedAt < REARM_MS) return;
      const rect = el.getBoundingClientRect();
      if (stageClearlyAway(rect)) {
        armed = true;
        releasedAt = 0;
        return;
      }
      if (enabledRef.current) begin();
    };

    const applyDelta = (raw: number) => {
      if (!holding || raw === 0) return;
      expectedY += raw * dampAt(holdStart);
      syncing = true;
      window.scrollTo(0, expectedY);
      syncing = false;
    };

    const restrain = () => {
      if (syncing || !holding) return;
      if (performance.now() - holdStart >= HOLD_MS) {
        release();
        return;
      }
      const current = window.scrollY;
      const raw = current - expectedY;
      if (Math.abs(raw) < 0.5) return;
      expectedY += raw * dampAt(holdStart);
      syncing = true;
      window.scrollTo(0, expectedY);
      syncing = false;
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
      applyDelta(event.deltaY);
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
      applyDelta(raw);
    };

    const onScroll = () => {
      if (syncing) return;
      inspect();
      restrain();
    };

    const watch = (el: HTMLElement) => {
      observer?.disconnect();
      const header = headerPx();
      observer = new IntersectionObserver(inspect, {
        rootMargin: `-${Math.round(header)}px 0px -36% 0px`,
        threshold: [0, 0.08, 0.2, 0.35],
      });
      observer.observe(el);
      bound = el;
    };

    const attach = () => {
      if (cancelled) return;
      const el = stage();
      if (!el) {
        retry = window.setTimeout(attach, 80);
        return;
      }
      if (bound !== el) watch(el);
      inspect();
    };

    releaseRef.current = release;
    attach();
    poll = window.setInterval(attach, 140);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", attach);
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    motion.addEventListener("change", () => {
      if (motion.matches) release();
    });

    return () => {
      cancelled = true;
      releaseRef.current = () => {};
      release();
      observer?.disconnect();
      window.clearTimeout(retry);
      window.clearInterval(poll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", attach);
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
    };
  }, [stageRef]);

  useEffect(() => {
    enabledRef.current = options.enabled;
    if (!options.enabled) releaseRef.current();
  }, [options.enabled]);
}
