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

import Link from "next/link";
import { useRef } from "react";
import { useScrollScene, range, smooth } from "@/lib/scroll-engine";

const SMALL_MAX = 700;

const SETS = {
  desktop: { dir: "/hero/sequence-desktop", count: 71 },
  mobile: { dir: "/hero/sequence-mobile", count: 48 },
} as const;

type Kind = keyof typeof SETS;

/** Anteil der Scrollstrecke, in dem die Bildsequenz läuft. Danach: Portal. */
const FILM_END = 0.6;
/** Zusätzlicher Kamera-Push, während sich das Portal öffnet. */
const OVERDRIVE = 0.42;

function frameSrc(kind: Kind, index: number) {
  return `${SETS[kind].dir}/${String(index + 1).padStart(4, "0")}.webp`;
}

export function HeroPortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // Bildspeicher lebt außerhalb von React – kein Re-Render pro Frame.
  const store = useRef({
    kind: "" as Kind | "",
    images: [] as (HTMLImageElement | null)[],
    inflight: 0,
    target: 0,
  });

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
      if (s.kind !== kind) {
        s.kind = kind;
        s.images = new Array(SETS[kind].count).fill(null);
        s.inflight = 0;
      }

      const count = SETS[kind].count;
      s.target = Math.round(range(p, 0, FILM_END) * (count - 1));
      pump(kind);

      // Ab hier deckt das Portal die Bühne vollständig ab – Zeichnen spart Akku.
      if (p > 0.94) return;
      paint(canvas, pin, smooth(range(p, FILM_END, 0.92)));
    },
  });

  /** Lädt die Frames nach, immer die nächstgelegenen zuerst, max. 4 parallel. */
  function pump(kind: Kind) {
    const s = store.current;
    while (s.inflight < 4) {
      let next = -1;
      let best = Infinity;
      for (let i = 0; i < s.images.length; i += 1) {
        if (s.images[i]) continue;
        const d = Math.abs(i - s.target);
        if (d < best) {
          best = d;
          next = i;
        }
      }
      if (next < 0) return;
      const index = next;
      const img = new window.Image();
      s.images[index] = img; // Platz reservieren, damit er nicht doppelt geladen wird
      s.inflight += 1;
      img.decoding = "async";
      img.onload = () => {
        s.inflight -= 1;
        const canvas = canvasRef.current;
        const pin = pinRef.current;
        if (canvas && pin) paint(canvas, pin, 0);
        pump(kind);
      };
      img.onerror = () => {
        s.inflight -= 1;
      };
      img.src = frameSrc(kind, index);
    }
  }

  /** Zeichnet den nächstbesten geladenen Frame, formatfüllend, mit Extra-Zoom. */
  function paint(canvas: HTMLCanvasElement, pin: HTMLElement, overdrive: number) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = store.current;

    let best: HTMLImageElement | null = null;
    let delta = Infinity;
    for (let i = 0; i < s.images.length; i += 1) {
      const img = s.images[i];
      if (!img || !img.naturalWidth) continue;
      const d = Math.abs(i - s.target);
      if (d < delta) {
        delta = d;
        best = img;
      }
    }
    if (!best) return;

    const rect = pin.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    const cover = Math.max(w / best.naturalWidth, h / best.naturalHeight);
    const scale = cover * (1 + overdrive * OVERDRIVE);
    const dw = best.naturalWidth * scale;
    const dh = best.naturalHeight * scale;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(best, (w - dw) / 2, (h - dh) / 2, dw, dh);
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
              alt=""
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
          <Link href="/termin" className="hero-portal__link">
            Erstgespräch vereinbaren
          </Link>
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
