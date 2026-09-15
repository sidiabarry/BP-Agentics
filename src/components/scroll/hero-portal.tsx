"use client";

/**
 * AKT I — Der Eintritt.
 *
 * Die Kamera fährt scroll-gesteuert in das Display des Handys. Am Ende der
 * Fahrt öffnet sich das Display zur Seite: der Bildschirminhalt wird der
 * Hintergrund der Landingpage.
 *
 * Wichtig gegenüber der alten system-scroll.tsx:
 *  - Der Schleier (veil) ist im Grundzustand TRANSPARENT. Ohne JS, bei
 *    prefers-reduced-motion oder auf kurzen Viewports sieht man das Poster
 *    mit der Frau – nie eine blaue Fläche.
 *  - Frames werden über die volle Fahrt nachgeladen und gezeichnet, nicht nur
 *    bis 45 %.
 *  - Die Sektion macht genau eine Sache. Kein Layout-Fit-Check, der im
 *    Zweifel die ganze Inszenierung abschaltet.
 */

import { useRef } from "react";
import { useScrollScene, range, smooth } from "@/lib/scroll-engine";
import {
  createImageStore,
  ensureKind,
  pumpFrames,
  nearestLoadedFrame,
  type FrameSet,
} from "@/lib/image-sequence";

const SMALL_MAX = 700;

const SETS = {
  desktop: { dir: "/hero/sequence-desktop", count: 71 },
  mobile: { dir: "/hero/sequence-mobile", count: 48 },
} as const satisfies Record<string, FrameSet>;

type Kind = keyof typeof SETS;

/** Anteil der Scrollstrecke, in dem die Bildsequenz läuft. Danach: Portal. */
const FILM_END = 0.6;
/** Zusätzlicher Kamera-Push, während sich das Portal öffnet. */
const OVERDRIVE = 0.42;

export function HeroPortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // Bildspeicher lebt außerhalb von React – kein Re-Render pro Frame.
  const store = useRef(createImageStore());

  const sectionRef = useScrollScene<HTMLElement>({
    mode: "pin",
    minHeight: 560,
    onFrame: (p) => {
      const canvas = canvasRef.current;
      const pin = pinRef.current;
      if (!canvas || !pin) return;

      const kind: Kind = window.matchMedia(`(max-width: ${SMALL_MAX}px)`).matches
        ? "mobile"
        : "desktop";
      const s = store.current;
      ensureKind(s, kind, SETS[kind].count);

      s.target = Math.round(range(p, 0, FILM_END) * (SETS[kind].count - 1));
      pumpFrames(s, SETS[kind], () => {
        const c = canvasRef.current;
        const pn = pinRef.current;
        if (c && pn) paint(c, pn, 0);
      });

      // Ab hier deckt das Portal die Bühne vollständig ab – Zeichnen spart Akku.
      if (p > 0.94) return;
      paint(canvas, pin, smooth(range(p, FILM_END, 0.92)));
    },
  });

  /** Zeichnet den nächstbesten geladenen Frame, formatfüllend, mit Extra-Zoom. */
  function paint(canvas: HTMLCanvasElement, pin: HTMLElement, overdrive: number) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = store.current;
    const best = nearestLoadedFrame(s);
    if (!best) return;

    const rect = pin.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    const isMobile = s.kind === "mobile";
    const cover = Math.max(w / best.naturalWidth, h / best.naturalHeight);
    const cropZoom = isMobile ? 1.15 : 1;
    const scale = cover * cropZoom * (1 + overdrive * OVERDRIVE);
    const dw = best.naturalWidth * scale;
    const dh = best.naturalHeight * scale;

    const xOff = (w - dw) / 2;
    const yOff = isMobile ? (h - dh) * 0.22 : (h - dh) / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(best, xOff, yOff, dw, dh);
    canvas.dataset.ready = "";
  }

  return (
    <section
      ref={sectionRef}
      id="einstieg"
      className="hero-portal"
      aria-label="BP Agentics — Websites und Systeme für Betriebe"
    >
      <div className="hero-portal__pin" ref={pinRef}>
        <div className="hero-portal__film" aria-hidden="true">
          <picture>
            <source srcSet="/hero/poster.avif" type="image/avif" />
            <img
              src="/hero/poster-fallback.jpg"
              alt="Smartphone zeigt das BP Agentics System — Website, CRM und automatische Antworten in einer Oberfläche"
              width={1440}
              height={810}
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
          <canvas ref={canvasRef} />
        </div>

        {/* Das Display, das sich öffnet. */}
        <div className="hero-portal__portal" aria-hidden="true" />

        <div className="hero-portal__copy">
          <p className="hero-portal__kicker">BP Agentics — Hagen</p>
          <h1>
            Website.
            <br />
            Automatisierung.
            <br />
            <span className="hero-portal__accent">Ein System.</span>
          </h1>
          <p className="hero-portal__lead">
            Anfragen kommen per Formular, WhatsApp oder Mail — und landen automatisch
            im CRM, mit Antwort und Status. Kein Zettel, kein Rückruf-Chaos.
          </p>
        </div>

        <p className="hero-portal__cue" aria-hidden="true">
          Scrollen
        </p>

        {/* Ankunft: der Moment, in dem wir im Display sind. */}
        <div className="hero-portal__arrival">
          <p>Websites, Software, Abläufe.</p>
          <h2>Drei Bausteine. Einzeln beauftragbar.</h2>
        </div>
      </div>
    </section>
  );
}
