"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Framing, ViewId, WerkstattSceneController } from "./scene-engine";
import { nextStation, stationOrder, stations, type StationId } from "./content";
import { useSoftScrollHold } from "./use-soft-scroll-hold";
import "./werkstatt.css";

/**
 * Die Werkstatt als Leistungsübersicht der Startseite (v6).
 *
 * Bewusst ohne Scroll-Pinning. Beim Eintritt dämpft useSoftScrollHold Wheel
 * und Touch für 1,5 s — kein Schloss, kein overflow:hidden auf html/body.
 * Die 3D-Szene lädt erst kurz bevor sie ins Bild kommt, rendert nur solange
 * sie sichtbar ist und bleibt danach bestehen (kein Abbau beim Wegscrollen).
 *
 * Bedienung: Station antippen → Sheet mit einer Aussage, Preis und einem Button.
 * Zurück über „Übersicht", Tippen ins Leere oder Escape. Wischen wechselt die
 * Station. Unter der Bühne stehen die drei Leistungen als normale Links — ohne
 * 3D, ohne JavaScript, für alle, die nicht erkunden wollen.
 */

const MODEL_URL = "/models/studio-room.v6.glb";
const POSTER = "/werkstatt/studio-v6";

type Phase = "idle" | "loading" | "ready" | "fallback";

function detectLite() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < 800
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function prefersSaveData() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return nav.connection?.saveData === true;
}

function titleLines(html: string) {
  return html
    .split(/<br\s*\/?>/i)
    .map((part) => part.replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);
}

function BackIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12.5 4.5 7 10l5.5 5.5" />
    </svg>
  );
}

export function WerkstattSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const labelRefs = useRef<Partial<Record<StationId, HTMLButtonElement>>>({});
  const lineRefs = useRef<Partial<Record<StationId, SVGLineElement>>>({});
  const dotRefs = useRef<Partial<Record<StationId, SVGCircleElement>>>({});
  const controllerRef = useRef<WerkstattSceneController | null>(null);
  const startedRef = useRef(false);
  const inViewRef = useRef(false);
  const aliveRef = useRef(true);

  const [phase, setPhase] = useState<Phase>("idle");
  const [view, setView] = useState<ViewId>("overview");
  const [shown, setShown] = useState<StationId>("web");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [needsConsent, setNeedsConsent] = useState(false);

  const open = view !== "overview";
  const detail = stations[shown];
  const next = nextStation(shown);

  useSoftScrollHold(sectionRef, { enabled: !open });

  const goTo = useCallback((target: ViewId) => {
    controllerRef.current?.goTo(target);
  }, []);

  // --- Szene starten ----------------------------------------------------
  const start = useCallback(async () => {
    if (startedRef.current) return;
    const host = hostRef.current;
    if (!host) return;
    startedRef.current = true;
    if (!hasWebGL()) {
      setMessage("Die 3D-Ansicht wird auf diesem Gerät nicht unterstützt.");
      setPhase("fallback");
      return;
    }
    setPhase("loading");
    try {
      const { createWerkstattScene } = await import("./scene-engine");
      if (!aliveRef.current) return;
      const controller = createWerkstattScene(
        host,
        {
          onProgress: (p) => setProgress(p),
          onReady: () => setPhase((prev) => (prev === "fallback" ? prev : "ready")),
          onFallback: (text) => {
            setMessage(text);
            setView("overview");
            setPhase("fallback");
          },
          onViewChange: (v) => {
            setView(v);
            if (v !== "overview") setShown(v);
          },
        },
        {
          modelUrl: MODEL_URL,
          lite: detectLite(),
          reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        },
      );
      if (!controller) {
        setPhase("fallback");
        return;
      }
      controllerRef.current = controller;
      const leaders: Partial<Record<StationId, { line: SVGLineElement; dot: SVGCircleElement }>> = {};
      for (const id of stationOrder) {
        const line = lineRefs.current[id];
        const dot = dotRefs.current[id];
        if (line && dot) leaders[id] = { line, dot };
      }
      controller.setLabelElements({ ...labelRefs.current }, leaders);
      controller.setVisible(inViewRef.current);
    } catch {
      setMessage("Die 3D-Ansicht konnte nicht geladen werden.");
      setPhase("fallback");
    }
  }, []);

  // Bei Fallback die Szene abbauen: Standbild und Liste bleiben.
  useEffect(() => {
    if (phase !== "fallback") return;
    controllerRef.current?.dispose();
    controllerRef.current = null;
  }, [phase]);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      controllerRef.current?.dispose();
      controllerRef.current = null;
    };
  }, []);

  // --- Laden kurz vor dem Sichtbarwerden, Rendern nur solange sichtbar ---
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        // Datensparmodus: erst nach ausdrücklichem Tippen laden.
        if (prefersSaveData()) setNeedsConsent(true);
        else void start();
      },
      { rootMargin: "700px 0px" },
    );
    const seen = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        // Direkt am DOM, ohne Re-Render: blendet den WhatsApp-Knopf über der Bühne aus.
        sectionRef.current?.toggleAttribute("data-stage-visible", entry.isIntersecting);
        const controller = controllerRef.current;
        if (!controller) return;
        controller.setVisible(entry.isIntersecting);
        if (!entry.isIntersecting) controller.goTo("overview", { instant: true });
      },
      { threshold: 0 },
    );
    near.observe(stage);
    seen.observe(stage);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, [start]);

  // --- Bewegung reduzieren (Systemeinstellung) ---------------------------
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => controllerRef.current?.setReduced(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // --- Freie Bildfläche an die Kamera melden ------------------------------
  useEffect(() => {
    const stage = stageRef.current;
    const sheet = sheetRef.current;
    if (!stage || !sheet) return;
    const update = () => {
      const narrow = stage.clientWidth < 800;
      const framing: Framing = { right: 0, bottom: 0 };
      if (open) {
        if (narrow) framing.bottom = sheet.offsetHeight + 16;
      } else if (narrow) {
        framing.bottom = 56;
      }
      controllerRef.current?.setFraming(framing);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(stage);
    ro.observe(sheet);
    return () => ro.disconnect();
  }, [open, phase]);

  // --- Fokus: nur wenn die Bedienung aus der Sektion kam (Tastatur/Buttons)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !section.contains(document.activeElement)) return;
    if (open) headingRef.current?.focus({ preventScroll: true });
    else labelRefs.current[shown]?.focus({ preventScroll: true });
  }, [open, shown]);

  // Tastatur: Escape wirkt seitenweit, solange eine Station offen ist; Pfeile
  // nur, wenn nichts anderes den Fokus hat (sonst stören sie Formulare & Co.).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const controller = controllerRef.current;
      if (!controller || e.defaultPrevented) return;
      const active = document.activeElement;
      const free = !active || active === document.body || Boolean(sectionRef.current?.contains(active));
      if (e.key === "Escape") {
        e.preventDefault();
        controller.goTo("overview");
      } else if (free && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        e.preventDefault();
        controller.step(e.key === "ArrowRight" ? 1 : -1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const lines = titleLines(detail.title);

  return (
    <section
      ref={sectionRef}
      id="werkstatt"
      className="ws"
      data-view={view}
      data-phase={phase}
      aria-label="Die Werkstatt"
    >
      <div className="ws__stage" ref={stageRef}>
        <picture className="ws__poster">
          <source media="(max-width: 799px)" type="image/webp" srcSet={`${POSTER}-mobile.webp`} />
          <source media="(max-width: 799px)" srcSet={`${POSTER}-mobile.jpg`} />
          <source type="image/webp" srcSet={`${POSTER}-desktop.webp`} />
          <img src={`${POSTER}-desktop.jpg`} alt="" loading="lazy" decoding="async" />
        </picture>

        <div className="ws__canvas" ref={hostRef} />

        {phase === "loading" && (
          <div className="ws__progress" role="progressbar" aria-label="Werkstatt wird geladen" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
            <span style={{ transform: `scaleX(${Math.max(0.06, progress)})` }} />
          </div>
        )}

        {needsConsent && phase === "idle" && (
          <button type="button" className="ws__start" onClick={() => void start()}>
            3D-Werkstatt laden (etwa 0,5 MB)
          </button>
        )}

        {phase === "fallback" && message && (
          <p className="ws__message" role="status">
            {message}
          </p>
        )}

        <svg className="ws__leaders" aria-hidden="true">
          {stationOrder.map((id) => (
            <g key={id}>
              <line
                ref={(node) => {
                  if (node) lineRefs.current[id] = node;
                }}
              />
              <circle
                r="3.5"
                ref={(node) => {
                  if (node) dotRefs.current[id] = node;
                }}
              />
            </g>
          ))}
        </svg>

        <div className="ws__labels" inert={open || phase !== "ready"}>
          {stationOrder.map((id) => (
            <button
              key={id}
              type="button"
              className="ws__label"
              ref={(node) => {
                if (node) labelRefs.current[id] = node;
              }}
              onClick={() => goTo(id)}
              aria-label={`${stations[id].label} öffnen`}
            >
              <span className="ws__label-num">{stations[id].num}</span>
              <span className="ws__label-text">
                <span className="ws__label-long">{stations[id].label}</span>
                <span className="ws__label-short">{stations[id].short}</span>
              </span>
            </button>
          ))}
        </div>

        <p className="ws__hint" aria-hidden="true">
          <span className="ws__hint-touch">Station antippen</span>
          <span className="ws__hint-mouse">Station anklicken</span>
        </p>

        <aside
          ref={sheetRef}
          className="ws__sheet"
          data-open={open}
          aria-hidden={!open}
          inert={!open}
          aria-labelledby="ws-detail-title"
        >
          <div className="ws__sheet-bar">
            <button type="button" className="ws__back" onClick={() => goTo("overview")}>
              <BackIcon />
              Übersicht
            </button>
            <div className="ws__dots" role="group" aria-label="Station wählen">
              {stationOrder.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="ws__dot"
                  aria-label={`${stations[id].num} ${stations[id].label}`}
                  aria-current={shown === id ? "true" : undefined}
                  onClick={() => goTo(id)}
                >
                  <span aria-hidden="true">{stations[id].num}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="ws__kicker">
            {detail.num} {detail.label}
          </p>
          <h3 id="ws-detail-title" ref={headingRef} tabIndex={-1}>
            {lines[0]}
            {lines[1] ? (
              <>
                <br />
                {lines[1]}
              </>
            ) : null}
          </h3>
          <p className="ws__text">{detail.text}</p>
          <p className="ws__price">{detail.price}</p>

          <div className="ws__actions">
            <Link href={detail.href} className="ws__cta">
              {detail.button}
            </Link>
            {next ? (
              <button type="button" className="ws__next" onClick={() => goTo(next)}>
                Weiter: {stations[next].short}
              </button>
            ) : (
              <button type="button" className="ws__next" onClick={() => goTo("overview")}>
                Alle drei ansehen
              </button>
            )}
          </div>

          <details className="ws__more" key={shown}>
            <summary>So läuft es ab</summary>
            <ol>
              {detail.steps.map((stepText) => (
                <li key={stepText}>{stepText}</li>
              ))}
            </ol>
            <p>{detail.limit}</p>
          </details>
        </aside>

        <p className="ws__sr" aria-live="polite">
          {open ? `${detail.label} geöffnet.` : phase === "ready" ? "Übersicht der drei Leistungen." : ""}
        </p>
      </div>

      <ul className="ws__list">
        {stationOrder.map((id) => (
          <li key={id}>
            <Link href={stations[id].href} className="ws__list-link">
              <span className="ws__list-num">{stations[id].num}</span>
              <span className="ws__list-body">
                <span className="ws__list-name">{stations[id].label}</span>
                <span className="ws__list-promise">{stations[id].promise}</span>
              </span>
              <span className="ws__list-price">{stations[id].from}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
