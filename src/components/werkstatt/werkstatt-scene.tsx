"use client";

/**
 * Die Werkstatt — interaktive 3D-Bühne für die drei Leistungen.
 *
 * Aufteilung:
 *  - Diese Komponente besitzt das DOM (Topbar, Hotspots, Detailpanel, Navigation,
 *    Intro-Overlay, Fallback) und den Scroll-Fortschritt über `useScrollScene`.
 *  - `scene-engine.ts` besitzt Three.js: Raum, Stationen, Roboter, Kamera und
 *    eine eigene, dauerhafte Renderschleife (läuft auch ohne Scrollen weiter).
 *
 * Pro Scroll-Frame wird bewusst kein React-State gesetzt — alles Frame-bezogene
 * (Intro-Canvas, Deckkraft, Fortschrittsbalken, Kamera) geht imperativ über refs,
 * wie auch in hero-portal.tsx und leistungs-maschine.tsx.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/brand";
import { cta } from "@/lib/offers";
import { useScrollScene, clamp01, range, smooth } from "@/lib/scroll-engine";
import {
  createImageStore,
  ensureKind,
  pumpFrames,
  nearestLoadedFrame,
  type FrameSet,
} from "@/lib/image-sequence";
import { createWerkstattScene, type StationId, type ViewId, type WerkstattSceneController } from "./scene-engine";
import { stations, stationOrder } from "./content";
import "./werkstatt.css";

const SMALL_MAX = 800;

const SETS = {
  desktop: { dir: "/hero/sequence-desktop", count: 71 },
  mobile: { dir: "/hero/sequence-mobile", count: 48 },
} as const satisfies Record<string, FrameSet>;

type Kind = keyof typeof SETS;

/** Ab hier blendet das Intro aus und gibt die 3D-Werkstatt frei. */
const REVEAL_START = 0.55;
const REVEAL_END = 0.85;
/** Ab hier ist die Werkstatt bedienbar (Hotspots, Klicks in die Szene). */
const INTRO_DONE = 0.99;

const STATION_ICONS: Record<StationId, React.ReactNode> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  chat: (
    <>
      <path d="M6 4h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-7l-5 3v-3a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" />
      <path d="M7 9h10M7 13h7" />
    </>
  ),
  office: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Zm0 0v6h6M8 14l3 3 5-5" />
    </>
  ),
};

function StationIcon({ id }: { id: StationId }) {
  return (
    <svg
      className="werkstatt__station-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {STATION_ICONS[id]}
    </svg>
  );
}

export function WerkstattScene() {
  const pinRef = useRef<HTMLDivElement>(null);
  const sceneHostRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introCanvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const detailHeadingRef = useRef<HTMLHeadingElement>(null);
  const hotspotRefs = useRef<Partial<Record<StationId, HTMLButtonElement | null>>>({});
  const navRefs = useRef<Partial<Record<StationId, HTMLButtonElement | null>>>({});
  const controllerRef = useRef<WerkstattSceneController | null>(null);
  const osReducedRef = useRef(false);
  const frameStore = useRef(createImageStore());
  const pendingFocusRef = useRef<ViewId | null>(null);

  const [active, setActive] = useState<ViewId>("overview");
  const [manualReduced, setManualReduced] = useState(false);
  const [fallback, setFallback] = useState<string | null>(null);

  /** Zeichnet den aktuell besten Intro-Frame formatfüllend mit leichtem Zoom-Push. */
  const paintIntro = useCallback((p: number) => {
    const canvas = introCanvasRef.current;
    const host = pinRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const best = nearestLoadedFrame(frameStore.current);
    if (!best) return;

    const rect = host.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    const cover = Math.max(w / best.naturalWidth, h / best.naturalHeight);
    const scale = cover * (1 + 0.16 * smooth(clamp01(p / REVEAL_END)));
    const dw = best.naturalWidth * scale;
    const dh = best.naturalHeight * scale;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(best, (w - dw) / 2, (h - dh) * 0.35, dw, dh);
  }, []);

  const sectionRef = useScrollScene<HTMLElement>({
    mode: "pin",
    minHeight: 560,
    onFrame: (p, el) => {
      const kind: Kind = window.matchMedia(`(max-width: ${SMALL_MAX - 1}px)`).matches ? "mobile" : "desktop";
      const store = frameStore.current;
      ensureKind(store, kind, SETS[kind].count);
      store.target = Math.round(range(p, 0, REVEAL_END) * (SETS[kind].count - 1));
      pumpFrames(store, SETS[kind], () => paintIntro(p));

      const reveal = smooth(range(p, REVEAL_START, REVEAL_END));
      const intro = introRef.current;
      if (intro) {
        intro.style.opacity = String(1 - reveal);
        intro.style.visibility = reveal >= 1 ? "hidden" : "visible";
        intro.inert = reveal >= 1;
      }
      if (reveal < 1) paintIntro(p);

      el.dataset.intro = String(p < INTRO_DONE);
      if (progressRef.current) progressRef.current.style.width = `${p * 100}%`;
      controllerRef.current?.setIntroProgress(p);
    },
    onMode: (enhanced, osReducedMotion) => {
      osReducedRef.current = osReducedMotion;
      controllerRef.current?.setReduced(osReducedMotion || manualReduced);
      if (!enhanced) {
        // Kein Scroll-Intro: direkt in der Werkstatt starten.
        const intro = introRef.current;
        if (intro) {
          intro.style.opacity = "0";
          intro.style.visibility = "hidden";
          intro.inert = true;
        }
        sectionRef.current?.setAttribute("data-intro", "false");
        controllerRef.current?.setIntroProgress(1);
        controllerRef.current?.goTo("overview");
      }
    },
  });

  // Szene aufbauen und beim Verlassen der Route sauber abbauen.
  useEffect(() => {
    const host = sceneHostRef.current;
    if (!host) return;

    const controller = createWerkstattScene(host, {
      onReady: () => setFallback(null),
      onFallback: (message) => setFallback(message),
      onStationChange: (station) => {
        setActive(station);
        pendingFocusRef.current = station;
      },
    });
    controllerRef.current = controller;
    controller?.setHotspotElements({
      web: hotspotRefs.current.web ?? undefined,
      chat: hotspotRefs.current.chat ?? undefined,
      office: hotspotRefs.current.office ?? undefined,
    });
    controller?.setReduced(osReducedRef.current || manualReduced);

    return () => {
      controller?.dispose();
      controllerRef.current = null;
    };
    // Absichtlich einmalig: die Szene wird nicht bei State-Änderungen neu gebaut.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manueller Schalter und OS-Einstellung zusammenführen.
  useEffect(() => {
    controllerRef.current?.setReduced(osReducedRef.current || manualReduced);
  }, [manualReduced]);

  // Escape kehrt zur Übersicht zurück.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active !== "overview") controllerRef.current?.goTo("overview");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  // Fokus nach einem Stationswechsel sinnvoll setzen.
  useEffect(() => {
    const target = pendingFocusRef.current;
    if (!target) return;
    pendingFocusRef.current = null;
    if (target === "overview") {
      const first = navRefs.current[stationOrder[0]];
      first?.focus({ preventScroll: true });
    } else {
      detailHeadingRef.current?.focus({ preventScroll: true });
    }
  }, [active]);

  const goTo = useCallback((id: ViewId) => {
    controllerRef.current?.goTo(id);
  }, []);

  const jumpToWorkshop = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY + el.offsetHeight - window.innerHeight;
    window.scrollTo({ top, behavior: "instant" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detail = active === "overview" ? null : stations[active];

  return (
    <section
      ref={sectionRef}
      className="werkstatt-scroll"
      data-intro="true"
      aria-label="Die Werkstatt — interaktiver 3D-Rundgang durch die drei Leistungen"
    >
      <div className="werkstatt-scroll__pin" ref={pinRef}>
        <div
          className="werkstatt__scene"
          ref={sceneHostRef}
          role="img"
          aria-label="Eine beleuchtete Werkstatt mit drei Stationen: Website-Bildschirm, Tablet für Nachrichten und Termine, und ein Büro-Roboter, der Unterlagen sortiert."
        />
        <div className="werkstatt__vignette" aria-hidden="true" />
        <div className="werkstatt__grain" aria-hidden="true" />

        <header className="werkstatt__topbar">
          <Link href="/" className="werkstatt__brand">
            <LogoMark className="h-9 w-12" />
            <span className="werkstatt__brand-name">
              BP AGENTICS<small>HAGEN · NRW</small>
            </span>
          </Link>
          <div className="werkstatt__actions">
            <button
              type="button"
              className="werkstatt__quiet-btn"
              aria-pressed={manualReduced}
              onClick={() => setManualReduced((v) => !v)}
            >
              {manualReduced ? "Bewegung reduziert" : "Bewegung reduzieren"}
            </button>
            {active !== "overview" && (
              <button type="button" className="werkstatt__outline-btn" onClick={() => goTo("overview")}>
                <span aria-hidden="true">↖</span> Zur Übersicht
              </button>
            )}
            <Link href={cta.href} className="werkstatt__top-link">
              {cta.short} ↗
            </Link>
          </div>
        </header>

        <div className="werkstatt__world-ui">
          <div className="werkstatt__copy" data-hidden={active !== "overview"}>
            <p className="werkstatt__eyebrow">Die digitale Werkstatt</p>
            <h1>
              Gute Arbeit.
              <br />
              <span>Starke Systeme.</span>
            </h1>
            <p>Entdecken Sie, was Ihren Auftritt stärkt und Ihren Alltag leichter macht.</p>
          </div>

          {active === "overview" && (
            <p className="werkstatt__marker">
              <span className="werkstatt__led" aria-hidden="true" /> DREI BAUSTEINE. IHR NÄCHSTER SCHRITT.
            </p>
          )}

          <div className="werkstatt__hotspots" inert={active !== "overview"}>
            {stationOrder.map((id) => (
              <button
                key={id}
                type="button"
                ref={(el) => {
                  hotspotRefs.current[id] = el;
                }}
                className="werkstatt__hotspot"
                style={{ opacity: 0 }}
                onClick={() => goTo(id)}
              >
                <StationIcon id={id} />
                <span className="werkstatt__hotspot-num">{stations[id].num}</span>
                <strong>{stations[id].label}</strong>
                <span className="werkstatt__hotspot-plus" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
          </div>

          {active === "overview" && (
            <p className="werkstatt__caption">
              EINE STATION ANKLICKEN.
              <br />
              DIE MÖGLICHKEITEN ENTDECKEN.
            </p>
          )}

          <nav className="werkstatt__nav" aria-label="Werkstatt-Stationen">
            {stationOrder.map((id) => (
              <button
                key={id}
                type="button"
                ref={(el) => {
                  navRefs.current[id] = el;
                }}
                className="werkstatt__nav-station"
                aria-pressed={active === id}
                onClick={() => goTo(id)}
              >
                <span>{stations[id].num}</span> {stations[id].label}
              </button>
            ))}
          </nav>

          <p className="werkstatt__note">MIT SORGFALT VERBUNDEN.</p>
          <p className="werkstatt__index">
            {detail ? `${detail.name} / ${detail.num}` : "ÜBERSICHT / 00"}
          </p>
        </div>

        <aside className="werkstatt__detail" data-open={Boolean(detail)} aria-hidden={!detail}>
          {detail && (
            <>
              <p className="werkstatt__eyebrow">
                {detail.num} / {detail.name}
              </p>
              <h2 ref={detailHeadingRef} tabIndex={-1} dangerouslySetInnerHTML={{ __html: detail.title }} />
              <p>{detail.text}</p>
              <Link href={detail.href} className="werkstatt__cta">
                <span>{detail.button}</span>
                <span aria-hidden="true">↗</span>
              </Link>
              <p className="werkstatt__detail-note">EINZELN BEAUFTRAGBAR · PERSÖNLICH BETREUT</p>
            </>
          )}
        </aside>

        {/* Intro: Bildsequenz, die in die Werkstatt hineinführt. */}
        <div className="werkstatt__intro" ref={introRef} aria-label="Scroll-Einstieg">
          <canvas ref={introCanvasRef} aria-hidden="true" />
          <div className="werkstatt__intro-shade" aria-hidden="true" />
          <div className="werkstatt__intro-copy">
            <p className="werkstatt__eyebrow">Websites. Automatisierung. Ein System.</p>
            <h2>
              Mehr Möglichkeiten.
              <br />
              <span>Weniger Aufwand.</span>
            </h2>
            <p>
              Für Ihren Betrieb steckt mehr drin.
              <br />
              Entdecken Sie die Welt dahinter.
            </p>
          </div>
          <p className="werkstatt__intro-cue">
            <span className="werkstatt__scroll-symbol" aria-hidden="true" /> Scrollen und eintauchen
          </p>
          <button type="button" className="werkstatt__outline-btn werkstatt__intro-jump" onClick={jumpToWorkshop}>
            Direkt zur Werkstatt <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="werkstatt__progress" ref={progressRef} aria-hidden="true" />

        {fallback && (
          <>
            <p className="werkstatt__status" role="status">
              {fallback}
            </p>
            <div className="werkstatt__fallback-links">
              {stationOrder.map((id) => (
                <Link key={id} href={stations[id].href}>
                  {stations[id].button} ↗
                </Link>
              ))}
            </div>
          </>
        )}

        <p className="werkstatt__sr" aria-live="polite">
          {detail ? `${detail.name} geöffnet.` : "Übersicht der drei Leistungen."}
        </p>
      </div>
    </section>
  );
}
