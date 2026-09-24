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
 * Film, Iris, Typo und Three.js lesen dieselbe gedämpfte --p. Der Film
 * blendet zwei Nachbarframes, statt auf ganze Indizes zu springen.
 */

import { useEffect, useRef } from "react";
import { useScrollScene, range, smooth } from "@/lib/scroll-engine";
import "./arrival-system.css";

type ArrivalSystem = {
  setProgress: (p: number) => void;
  setPointer: (nx: number, ny: number, active: boolean) => void;
  dispose: () => void;
};

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
const RESIZE_WAIT = 140;

function frameSrc(kind: Kind, index: number) {
  return `${SETS[kind].dir}/${String(index + 1).padStart(4, "0")}.webp`;
}

function readyImg(img: HTMLImageElement | null | undefined) {
  return img && img.naturalWidth > 0 ? img : null;
}

export function HeroPortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const systemHostRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<ArrivalSystem | null>(null);
  const systemBoot = useRef(false);
  const systemProgress = useRef(0);

  // Bildspeicher lebt außerhalb von React – kein Re-Render pro Frame.
  const store = useRef({
    kind: "" as Kind | "",
    images: [] as (HTMLImageElement | null)[],
    inflight: 0,
    target: 0,
    index: 0,
    overdrive: 0,
    pixelW: 0,
    pixelH: 0,
  });

  const sectionRef = useScrollScene<HTMLElement>({
    mode: "pin",
    minHeight: 560,
    damp: 0.26,
    onFrame: (p) => {
      const canvas = canvasRef.current;
      const pin = pinRef.current;
      if (!canvas || !pin) return;

      const s = store.current;
      if (!s.kind) syncKind();
      if (!s.pixelW) measurePin(pin);

      const kind = s.kind || "desktop";
      const count = SETS[kind].count;
      const f = range(p, 0, FILM_END) * (count - 1);
      s.index = f;
      s.target = Math.round(f);
      s.overdrive = smooth(range(p, FILM_END, 0.92));
      pump(kind);

      if (p > 0.38) bootArrival();
      systemProgress.current = range(p, 0.5, 1);
      systemRef.current?.setProgress(systemProgress.current);
      pin.toggleAttribute("data-arrival", p > 0.52);

      // Ab hier deckt das Portal die Bühne vollständig ab – Zeichnen spart Akku.
      if (p > 0.94) return;
      paint(canvas);
    },
  });

  function syncKind() {
    const kind: Kind = window.matchMedia(`(max-width: ${SMALL_MAX}px)`).matches
      ? "mobile"
      : "desktop";
    const s = store.current;
    if (s.kind === kind) return;
    s.kind = kind;
    s.images = new Array(SETS[kind].count).fill(null);
    s.inflight = 0;
  }

  function measurePin(pin: HTMLElement) {
    const s = store.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = pin.clientWidth;
    const height = pin.clientHeight;
    if (width < 2 || height < 2) return;
    s.pixelW = Math.max(1, Math.round(width * dpr));
    s.pixelH = Math.max(1, Math.round(height * dpr));
  }

  function bootArrival() {
    if (systemBoot.current || !systemHostRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    systemBoot.current = true;
    const host = systemHostRef.current;
    void import("./arrival-system").then(({ createArrivalSystem }) => {
      if (!host.isConnected) return;
      systemRef.current?.dispose();
      systemRef.current = createArrivalSystem(host);
      systemRef.current.setProgress(systemProgress.current);
    });
  }

  useEffect(() => {
    const pin = pinRef.current;
    const point = (event: PointerEvent, active: boolean) => {
      const host = systemHostRef.current;
      const sys = systemRef.current;
      if (!host || !sys) return;
      if (!active) {
        sys.setPointer(0.5, 0.5, false);
        return;
      }
      const r = host.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      sys.setPointer((event.clientX - r.left) / r.width, (event.clientY - r.top) / r.height, true);
    };
    const onMove = (event: PointerEvent) => point(event, true);
    const onLeave = (event: PointerEvent) => point(event, false);
    pin?.addEventListener("pointermove", onMove, { passive: true });
    pin?.addEventListener("pointerdown", onMove, { passive: true });
    pin?.addEventListener("pointerleave", onLeave, { passive: true });
    pin?.addEventListener("pointercancel", onLeave, { passive: true });
    const onUp = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.pointerType === "pen") point(event, false);
    };
    pin?.addEventListener("pointerup", onUp, { passive: true });

    syncKind();
    if (pin) measurePin(pin);

    const mq = window.matchMedia(`(max-width: ${SMALL_MAX}px)`);
    const onKind = () => {
      syncKind();
      pump(store.current.kind || "desktop");
    };
    mq.addEventListener("change", onKind);

    let resizeTimer = 0;
    let sized = false;
    const applySize = (width: number, height: number) => {
      const s = store.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      s.pixelW = Math.max(1, Math.round(width * dpr));
      s.pixelH = Math.max(1, Math.round(height * dpr));
      const canvas = canvasRef.current;
      if (canvas) paint(canvas);
    };
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr || cr.width < 2 || cr.height < 2) return;
      const width = cr.width;
      const height = cr.height;
      if (!sized) {
        sized = true;
        applySize(width, height);
        return;
      }
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => applySize(width, height), RESIZE_WAIT);
    });
    if (pin) ro.observe(pin);

    return () => {
      pin?.removeEventListener("pointermove", onMove);
      pin?.removeEventListener("pointerdown", onMove);
      pin?.removeEventListener("pointerleave", onLeave);
      pin?.removeEventListener("pointercancel", onLeave);
      pin?.removeEventListener("pointerup", onUp);
      mq.removeEventListener("change", onKind);
      ro.disconnect();
      if (resizeTimer) window.clearTimeout(resizeTimer);
      systemRef.current?.dispose();
      systemRef.current = null;
      systemBoot.current = false;
    };
  }, []);

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
        if (canvas) paint(canvas);
        pump(kind);
      };
      img.onerror = () => {
        s.inflight -= 1;
      };
      img.src = frameSrc(kind, index);
    }
  }

  function nearestReady(around: number) {
    const s = store.current;
    let best: HTMLImageElement | null = null;
    let delta = Infinity;
    for (let i = 0; i < s.images.length; i += 1) {
      const img = readyImg(s.images[i]);
      if (!img) continue;
      const d = Math.abs(i - around);
      if (d < delta) {
        delta = d;
        best = img;
      }
    }
    return best;
  }

  function drawCover(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    w: number,
    h: number,
    overdrive: number,
    isMobile: boolean,
  ) {
    const cover = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const cropZoom = isMobile ? 1.15 : 1;
    const scale = cover * cropZoom * (1 + overdrive * OVERDRIVE);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const xOff = (w - dw) / 2;
    const yOff = isMobile ? (h - dh) * 0.22 : (h - dh) / 2;
    ctx.drawImage(img, xOff, yOff, dw, dh);
  }

  /** Zwei Nachbarframes, weich überblendet — kein Sprung von Keyframe zu Keyframe. */
  function paint(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = store.current;
    if (!s.pixelW || !s.pixelH) return;

    const i0 = Math.floor(s.index);
    const i1 = Math.min(s.images.length - 1, i0 + 1);
    const mix = s.index - i0;
    const a = readyImg(s.images[i0]);
    const b = readyImg(s.images[i1]);
    const base = a ?? b ?? nearestReady(s.index);
    if (!base) return;

    const w = s.pixelW;
    const h = s.pixelH;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    const isMobile = s.kind === "mobile";
    ctx.clearRect(0, 0, w, h);
    drawCover(ctx, base, w, h, s.overdrive, isMobile);
    if (a && b && a !== b && mix > 0.012) {
      ctx.save();
      ctx.globalAlpha = mix;
      drawCover(ctx, b, w, h, s.overdrive, isMobile);
      ctx.restore();
    }
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
        <div className="hero-portal__system" ref={systemHostRef} aria-hidden="true" />

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

        {/* Ankunft: Iris + Three.js-System, Typo setzt sich schlicht. */}
        <div className="hero-portal__intro">
          <h2>Was BP Agentics für Ihren Betrieb einrichten kann</h2>
        </div>

        <div className="hero-portal__arrival">
          <p className="hero-portal__arrival-kicker">Websites, Software, Abläufe.</p>
          <p className="hero-portal__arrival-line">Drei Bausteine. Einzeln beauftragbar.</p>
        </div>
      </div>
    </section>
  );
}
