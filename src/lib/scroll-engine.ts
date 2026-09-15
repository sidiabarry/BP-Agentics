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
 */

import { useEffect, useRef } from "react";

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
export const smooth = (v: number) => v * v * (3 - 2 * v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

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
  /** Zusätzliche CSS-Variablen pro Frame. Zahlen werden unitless gesetzt. */
  vars?: (p: number) => Record<string, number | string>;
  /** Für alles, was CSS nicht kann (Canvas). Läuft nur im Enhanced-Modus. */
  onFrame?: (p: number, el: HTMLElement) => void;
  /** Wird aufgerufen, wenn zwischen statisch und Enhanced umgeschaltet wird. */
  onMode?: (enhanced: boolean) => void;
};

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
    let last = -1;

    const read = () => {
      if (!enhanced) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const mode = opts.current.mode ?? "pin";
      const p =
        mode === "pin"
          ? clamp01(-rect.top / Math.max(1, el.offsetHeight - vh))
          : clamp01((vh - rect.top) / Math.max(1, vh + rect.height));

      if (p === last) return;
      last = p;

      el.style.setProperty("--p", p.toFixed(4));
      const extra = opts.current.vars?.(p);
      if (extra) {
        for (const key in extra) el.style.setProperty(key, String(extra[key]));
      }
      opts.current.onFrame?.(p, el);
    };

    const configure = () => {
      const next =
        !reduced.matches && window.innerHeight >= (opts.current.minHeight ?? 560);
      if (next !== enhanced) {
        enhanced = next;
        last = -1;
        if (enhanced) {
          el.setAttribute("data-scroll-ready", "");
        } else {
          el.removeAttribute("data-scroll-ready");
          el.removeAttribute("style");
        }
        opts.current.onMode?.(enhanced);
      }
      schedule();
    };

    readers.add(read);
    bind();
    configure();

    window.addEventListener("resize", configure);
    window.addEventListener("orientationchange", configure);
    reduced.addEventListener("change", configure);

    return () => {
      readers.delete(read);
      window.removeEventListener("resize", configure);
      window.removeEventListener("orientationchange", configure);
      reduced.removeEventListener("change", configure);
      unbind();
    };
  }, []);

  return ref;
}
