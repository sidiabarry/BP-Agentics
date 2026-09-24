"use client";

/**
 * Ein einziger rAF-Loop für die ganze Seite.
 *
 * Prinzip: JavaScript rechnet nur Zahlen aus und schreibt sie als CSS-Variablen
 * auf das Szenen-Element. Die gesamte Choreografie liegt in CSS
 * (siehe styles/scroll-experience.css). Vorteile:
 *  - kein React-Re-Render pro Scroll-Frame
 *  - die Animation lässt sich in den DevTools live tunen
 *  - ohne JS bleibt die Seite lesbar (Choreografie hängt an [data-scroll-ready])
 *
 * --p ist nicht der rohe Wheel-Wert. Ein zeitbasiertes Dämpfen zieht die
 * Anzeige hinter das Scrollziel, damit Pin, Iris, Film und 3D dieselbe
 * lange Ease teilen statt an Ticks zu kleben.
 */

import { useEffect, useRef } from "react";

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
export const smooth = (v: number) => v * v * (3 - 2 * v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Wie in Sidias Referenz: weiche Mitte, ruhige Enden — nur für Schicht-Blends. */
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

/** Dreiecksfenster: 0 an den Rändern, 1 in der Mitte des Abschnitts. */
export function window3(v: number, start: number, end: number, edge = 0.18) {
  const span = end - start;
  return Math.min(
    smooth(range(v, start, start + span * edge)),
    smooth(1 - range(v, end - span * edge, end)),
  );
}

type Reader = () => void;

const readers = new Set<Reader>();
let frame = 0;
let bound = false;

function flush() {
  frame = 0;
  for (const read of readers) read();
}

function schedule() {
  if (!frame && typeof document !== "undefined" && !document.hidden) {
    frame = requestAnimationFrame(flush);
  }
}

function bind() {
  if (bound) return;
  bound = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("orientationchange", schedule);
  document.addEventListener("visibilitychange", schedule);
}

function unbind() {
  if (!bound || readers.size) return;
  bound = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  window.removeEventListener("orientationchange", schedule);
  document.removeEventListener("visibilitychange", schedule);
  cancelAnimationFrame(frame);
  frame = 0;
}

export type SceneOptions = {
  /**
   * "pin"   – Szene ist höher als der Viewport, das Kind klebt (position: sticky).
   *           p = 0 wenn die Szene oben andockt, p = 1 wenn sie durchgescrollt ist.
   * "enter" – normale Sektion, p läuft während sie durch den Viewport wandert.
   */
  mode?: "pin" | "enter";
  /** Unter dieser Viewport-Höhe bleibt die Szene statisch. */
  minHeight?: number;
  /**
   * Zeitkonstante der --p-Dämpfung in Sekunden.
   * Größer = längere Ease, weniger Stottern an Wheel-Ticks.
   */
  damp?: number;
  /** Zusätzliche CSS-Variablen pro Frame. Zahlen werden unitless gesetzt. */
  vars?: (p: number) => Record<string, number | string>;
  /** Für alles, was CSS nicht kann (Canvas). Läuft nur im Enhanced-Modus. */
  onFrame?: (p: number, el: HTMLElement) => void;
  /** Wird aufgerufen, wenn zwischen statisch und Enhanced umgeschaltet wird. */
  onMode?: (enhanced: boolean) => void;
};

const DAMP_TAU = 0.24;
const SETTLE = 0.00028;
const RESIZE_WAIT = 140;
const SNAP_GAP = 0.18;

/**
 * Hängt eine Szene an den globalen Loop. Rückgabewert ist die ref für das
 * äußere Szenen-Element.
 */
export function useScrollScene<T extends HTMLElement>(options: SceneOptions = {}) {
  const ref = useRef<T>(null);
  const opts = useRef(options);
  opts.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enhanced = false;
    let target = 0;
    let shown = -1;
    let chase = 0;
    let lastTick = 0;
    let onScreen = true;
    let travel = 1;
    let resizeTimer = 0;

    const apply = (p: number) => {
      el.style.setProperty("--p", p.toFixed(5));
      const extra = opts.current.vars?.(p);
      if (extra) {
        for (const key in extra) el.style.setProperty(key, String(extra[key]));
      }
      opts.current.onFrame?.(p, el);
    };

    const measureTravel = () => {
      const vh = window.innerHeight;
      const mode = opts.current.mode ?? "pin";
      travel =
        mode === "pin"
          ? Math.max(1, el.offsetHeight - vh)
          : Math.max(1, vh + el.offsetHeight);
    };

    const stopChase = () => {
      if (chase) cancelAnimationFrame(chase);
      chase = 0;
      lastTick = 0;
    };

    const tick = (now: number) => {
      chase = 0;
      if (!enhanced || !onScreen || document.hidden) return;

      const dt = lastTick ? Math.min(0.048, Math.max(0, (now - lastTick) / 1000)) : 1 / 60;
      lastTick = now;

      if (shown < 0) {
        shown = target;
        apply(shown);
        return;
      }

      const gap = target - shown;
      if (Math.abs(gap) < SETTLE) {
        if (shown !== target) {
          shown = target;
          apply(shown);
        }
        lastTick = 0;
        return;
      }

      const tau = Math.max(0.08, opts.current.damp ?? DAMP_TAU);
      shown += gap * (1 - Math.exp(-dt / tau));
      apply(shown);
      chase = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!enhanced || !onScreen || document.hidden || chase) return;
      chase = requestAnimationFrame(tick);
    };

    const read = () => {
      if (!enhanced) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const mode = opts.current.mode ?? "pin";
      target =
        mode === "pin"
          ? clamp01(-rect.top / travel)
          : clamp01((vh - rect.top) / Math.max(1, vh + rect.height));
      kick();
    };

    const setEnhanced = (next: boolean) => {
      if (next === enhanced) return;
      enhanced = next;
      if (enhanced) {
        shown = -1;
        lastTick = 0;
        measureTravel();
        el.setAttribute("data-scroll-ready", "");
      } else {
        stopChase();
        el.removeAttribute("data-scroll-ready");
        el.removeAttribute("style");
      }
      opts.current.onMode?.(enhanced);
    };

    const configure = () => {
      setEnhanced(!reduced.matches && window.innerHeight >= (opts.current.minHeight ?? 560));
      if (enhanced) measureTravel();
      schedule();
    };

    const onResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(configure, RESIZE_WAIT);
    };

    const onVisible = () => {
      if (document.hidden) {
        stopChase();
        return;
      }
      kick();
      schedule();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const next = Boolean(entry?.isIntersecting);
        if (next === onScreen) return;
        onScreen = next;
        if (!onScreen) {
          stopChase();
          return;
        }
        if (shown >= 0 && Math.abs(target - shown) > SNAP_GAP) {
          shown = target;
          apply(shown);
          return;
        }
        kick();
      },
      { threshold: 0, rootMargin: "18% 0px" },
    );
    io.observe(el);

    readers.add(read);
    bind();
    configure();

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    reduced.addEventListener("change", configure);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      readers.delete(read);
      stopChase();
      if (resizeTimer) window.clearTimeout(resizeTimer);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      reduced.removeEventListener("change", configure);
      document.removeEventListener("visibilitychange", onVisible);
      unbind();
    };
  }, []);

  return ref;
}
