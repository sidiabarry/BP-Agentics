"use client";

/**
 * HUD und Three.js-Laufzeit der Werkstatt (Akt II).
 * Kein Hero-Intro: die Bildsequenz läuft nur im Hero. Die Szene startet geöffnet.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cta } from "@/lib/offers";
import { werkstattCopy, werkstattExit } from "@/lib/journey";
import { createWerkstattScene, type StationId, type ViewId, type WerkstattSceneController } from "./scene-engine";
import { stations, stationOrder, nextStation } from "./content";
import "./werkstatt.css";

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

export function WerkstattScene({
  reduced = false,
}: {
  reduced?: boolean;
}) {
  const sceneHostRef = useRef<HTMLDivElement>(null);
  const detailHeadingRef = useRef<HTMLHeadingElement>(null);
  const hotspotRefs = useRef<Partial<Record<StationId, HTMLButtonElement | null>>>({});
  const navRefs = useRef<Partial<Record<StationId, HTMLButtonElement | null>>>({});
  const controllerRef = useRef<WerkstattSceneController | null>(null);
  const pendingFocusRef = useRef<ViewId | null>(null);

  const [active, setActive] = useState<ViewId>("overview");
  const [manualReduced, setManualReduced] = useState(false);
  const [fallback, setFallback] = useState<string | null>(null);

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
    controller?.setIntroProgress(1);
    controller?.setReduced(reduced || manualReduced);
    controller?.goTo("overview");

    return () => {
      controller?.dispose();
      controllerRef.current = null;
    };
    // Szene einmalig aufbauen. reduced/manualReduced gehen über setReduced.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    controllerRef.current?.setReduced(reduced || manualReduced);
  }, [manualReduced, reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active !== "overview") controllerRef.current?.goTo("overview");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

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

  const detail = active === "overview" ? null : stations[active];
  const nextId = active === "overview" ? null : nextStation(active);

  return (
    <>
      <div
        className="werkstatt__scene"
        ref={sceneHostRef}
        role="img"
        aria-label="Eine beleuchtete Werkstatt mit drei Stationen: Website-Bildschirm, Tablet für Nachrichten und Termine, und ein Büro-Roboter, der Unterlagen sortiert."
      />
      <div className="werkstatt__vignette" aria-hidden="true" />
      <div className="werkstatt__grain" aria-hidden="true" />

      <header className="werkstatt__topbar">
        <p className="werkstatt__eyebrow werkstatt__eyebrow--bar">{werkstattCopy.eyebrow}</p>
        <div className="werkstatt__actions">
          <button
            type="button"
            className="werkstatt__quiet-btn"
            aria-pressed={manualReduced}
            onClick={() => setManualReduced((value) => !value)}
          >
            {manualReduced ? werkstattCopy.reduceOn : werkstattCopy.reduceOff}
          </button>
          {active !== "overview" && (
            <button type="button" className="werkstatt__outline-btn" onClick={() => goTo("overview")}>
              <span aria-hidden="true">↖</span> {werkstattCopy.overview}
            </button>
          )}
          <Link href={cta.href} className="werkstatt__top-link">
            {cta.short} ↗
          </Link>
        </div>
      </header>

      <div className="werkstatt__world-ui">
        <div className="werkstatt__copy" data-hidden={active !== "overview"}>
          <p className="werkstatt__eyebrow">{werkstattCopy.eyebrow}</p>
          <h2>
            {werkstattCopy.titleLead}
            <br />
            <span>{werkstattCopy.titleAccent}</span>
          </h2>
          <p>{werkstattCopy.lead}</p>
          {active === "overview" && (
            <button type="button" className="werkstatt__tour" onClick={() => goTo(stationOrder[0])}>
              {werkstattCopy.tour} <span aria-hidden="true">→</span>
            </button>
          )}
        </div>

        {active === "overview" && (
          <p className="werkstatt__marker">
            <span className="werkstatt__led" aria-hidden="true" /> {werkstattCopy.marker}
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
              <span className="werkstatt__hotspot-labels">
                <strong>{stations[id].label}</strong>
                <small>{stations[id].promise}</small>
              </span>
              <span className="werkstatt__hotspot-plus" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>

        {active === "overview" && <p className="werkstatt__caption">{werkstattCopy.caption}</p>}

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

        <p className="werkstatt__note">{werkstattCopy.note}</p>
        <p className="werkstatt__index">
          {detail ? `${detail.name} / ${detail.num}` : werkstattCopy.overviewIndex}
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

            <ol className="werkstatt__steps">
              {detail.steps.map((step, i) => (
                <li key={step}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>

            <p className="werkstatt__limit">{detail.limit}</p>
            <p className="werkstatt__price">{detail.price}</p>

            <Link href={detail.href} className="werkstatt__cta">
              <span>{detail.button}</span>
              <span aria-hidden="true">↗</span>
            </Link>

            {nextId ? (
              <button type="button" className="werkstatt__next" onClick={() => goTo(nextId)}>
                Weiter zu {stations[nextId].num} · {stations[nextId].label}
                <span aria-hidden="true">→</span>
              </button>
            ) : (
              <div className="werkstatt__exit-row">
                <Link href={werkstattExit.continue.href} className="werkstatt__next">
                  {werkstattExit.continue.label}
                  <span aria-hidden="true">→</span>
                </Link>
                <Link href={werkstattExit.talk.href} className="werkstatt__next">
                  {werkstattExit.talk.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </>
        )}
      </aside>

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
    </>
  );
}
