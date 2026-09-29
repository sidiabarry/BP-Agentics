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
 *
 * Im geöffneten Display läuft danach die WebGL-Szene (hero-scene.ts) und
 * führt in die Nacht der Werkstatt. Der Intro-Text darunter ist die einzige
 * Überschrift für Szene und Werkstatt; er scrollt normal über die Szene.
 */

import { useEffect, useRef } from "react";
import { useScrollScene, range, smooth } from "@/lib/scroll-engine";
import type { HeroScene } from "./hero-scene";

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
/** Ab hier wird die Szene geladen – weit vor dem Portal, damit sie bereitsteht. */
const SCENE_PRELOAD = 0.3;
/** Ab hier ist das Display so weit offen, dass die Szene die ganze Bühne deckt. */
const SCENE_COVERS = 0.72;

function frameSrc(kind: Kind, index: number) {
  return `${SETS[kind].dir}/${String(index + 1).padStart(4, "0")}.webp`;
}

export function HeroPortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const sceneCanvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  // Bildspeicher lebt außerhalb von React – kein Re-Render pro Frame.
  const store = useRef({
    kind: "" as Kind | "",
    images: [] as (HTMLImageElement | null)[],
    inflight: 0,
    target: 0,
  });

  const sceneState = useRef({
    started: false,
    alive: true,
    controller: null as HeroScene | null,
  });

  const sectionRef = useScrollScene<HTMLElement>({
    mode: "pin",
    minHeight: 560,
    onMode: (enhanced) => sceneState.current.controller?.setEnabled(enhanced),
    onFrame: (p, section) => {
      if (p >= SCENE_PRELOAD) void startScene(section);
      sceneState.current.controller?.wake();

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

      // Liegt die Szene deckend darüber, müssen Film und Portal weder zeichnen noch compositen.
      const covered = p >= SCENE_COVERS && sceneRef.current?.dataset.state === "ready";
      if (pin.hasAttribute("data-covered") !== covered) pin.toggleAttribute("data-covered", covered);

      // Ab hier deckt das Portal die Bühne vollständig ab – Zeichnen spart Akku.
      if (covered || p > 0.94) return;
      paint(canvas, pin, smooth(range(p, FILM_END, 0.92)));
    },
  });

  useEffect(() => {
    const state = sceneState.current;
    state.alive = true;
    return () => {
      state.alive = false;
      state.controller?.dispose();
      state.controller = null;
    };
  }, []);

  async function startScene(section: HTMLElement) {
    const state = sceneState.current;
    const layer = sceneRef.current;
    const canvas = sceneCanvasRef.current;
    const pin = pinRef.current;
    const portal = portalRef.current;
    const intro = introRef.current;
    if (state.started || !layer || !canvas || !pin || !portal || !intro) return;
    state.started = true;
    const fail = () => {
      state.controller?.dispose();
      state.controller = null;
      layer.dataset.state = "fallback";
      pin.removeAttribute("data-covered");
    };
    try {
      const { createHeroScene, idle } = await import("./hero-scene");
      // Laden des Chunks und Anlegen des WebGL-Kontexts: zwei getrennte Tasks.
      await idle();
      if (!state.alive) return;
      state.controller = createHeroScene({
        canvas,
        section,
        pin,
        portal,
        intro,
        onReady: () => {
          layer.dataset.state = "ready";
        },
        onLost: fail,
      });
      if (!state.controller) fail();
    } catch {
      fail();
    }
  }

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
        <div className="hero-portal__portal" ref={portalRef} aria-hidden="true" />

        {/* Licht im Display, dann Dämmerung. Ohne WebGL übernimmt der CSS-Verlauf. */}
        <div className="hero-portal__scene" ref={sceneRef} aria-hidden="true">
          <div className="hero-portal__dusk" />
          <canvas ref={sceneCanvasRef} />
        </div>

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
      </div>

      {/* Benennt auch die Werkstatt darunter (aria-labelledby="ws-title"). */}
      <div className="hero-portal__intro" ref={introRef}>
        <p className="hero-portal__intro-kicker">Websites, Software, Abläufe.</p>
        <h2 id="ws-title">Drei Bausteine. Einzeln beauftragbar.</h2>
        <p className="hero-portal__intro-lead">
          Jede Station zeigt einen Baustein bei der Arbeit. Tippen Sie eine an, um mehr zu sehen.
        </p>
      </div>
    </section>
  );
}
