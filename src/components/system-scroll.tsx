"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  DESKTOP_FRAMES,
  MIN_ENHANCED_HEIGHT,
  MOBILE_FRAMES,
  SMALL_MAX,
  frameSrc,
  narratives,
  phaseFrom,
  phaseLabels,
  scenarios,
  type ScenarioId,
} from "@/lib/system-scroll";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function range(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start));
}

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

export function SystemScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scenario, setScenario] = useState<ScenarioId>("angebot");
  const copy = scenarios[scenario];

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const canvas = canvasRef.current;
    if (!section || !pin || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    section.classList.add("system-scroll--js");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia(`(max-width: ${SMALL_MAX}px)`);
    const nodes = [...section.querySelectorAll<HTMLElement>("[data-module]")];
    const progressLine = section.querySelector(".timeline-line > span");
    const world = section.querySelector<HTMLElement>(".system-scroll-world");
    const shell = section.querySelector<HTMLElement>(".system-scroll-shell");
    const paths = section.querySelector("#signal");
    const packet = section.querySelector("#packet");
    const veil = section.querySelector<HTMLElement>(".system-scroll-veil");
    const camera = section.querySelector<HTMLElement>(".system-scroll-camera");
    const opening = section.querySelector<HTMLElement>(".system-scroll-opening");
    const heading = section.querySelector<HTMLElement>(".system-scroll-heading");
    const narrative = section.querySelector("#narrative");
    const phaseCount = section.querySelector("#phase-count");
    const labels = [...section.querySelectorAll(".timeline-labels span")];
    const routeLength = paths instanceof SVGPathElement ? paths.getTotalLength() : 0;

    let enabled = false;
    let raf = 0;
    let progress = 0;
    let kind: "desktop" | "mobile" | "" = "";
    let count = 0;
    let target = 0;
    let generation = 0;
    let lastPhase = -1;
    const cache = new Map<number, HTMLImageElement>();
    const pending = new Set<number>();
    const failed = new Set<number>();

    const schedule = () => {
      if (!raf && !document.hidden) raf = requestAnimationFrame(render);
    };

    const trim = () => {
      while (cache.size > 6) {
        let worst = -1;
        let distance = -1;
        for (const index of cache.keys()) {
          const next = Math.abs(index - target);
          if (next > distance) {
            worst = index;
            distance = next;
          }
        }
        cache.delete(worst);
      }
    };

    const pump = () => {
      if (!enabled || document.hidden || section.getBoundingClientRect().bottom < 0 || progress > 0.45) {
        return;
      }
      const desired = [target, target + 1, target - 1, target + 2, target - 2].filter(
        (index) => index >= 0 && index < count,
      );
      for (const index of desired) {
        if (pending.size >= 2) break;
        if (cache.has(index) || pending.has(index) || failed.has(index)) continue;
        const epoch = generation;
        const img = new window.Image();
        pending.add(index);
        img.decoding = "async";
        img.onload = () => {
          if (epoch !== generation) return;
          pending.delete(index);
          cache.set(index, img);
          trim();
          schedule();
          pump();
        };
        img.onerror = () => {
          if (epoch !== generation) return;
          pending.delete(index);
          failed.add(index);
          pump();
        };
        img.src = frameSrc(kind === "mobile" ? "mobile" : "desktop", index);
      }
    };

    const configureFrames = () => {
      const next = small.matches ? "mobile" : "desktop";
      if (next === kind) return;
      kind = next;
      count = small.matches ? MOBILE_FRAMES : DESKTOP_FRAMES;
      generation += 1;
      cache.clear();
      pending.clear();
      failed.clear();
    };

    const paint = () => {
      const rect = pin.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      let best: HTMLImageElement | null = null;
      let delta = Infinity;
      for (const [index, img] of cache) {
        const next = Math.abs(index - target);
        if (next < delta) {
          best = img;
          delta = next;
        }
      }
      if (!best) return;
      const scale = Math.max(width / best.naturalWidth, height / best.naturalHeight);
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(
        best,
        (width - best.naturalWidth * scale) / 2,
        (height - best.naturalHeight * scale) / 2,
        best.naturalWidth * scale,
        best.naturalHeight * scale,
      );
    };

    const render = () => {
      raf = 0;
      if (!enabled) return;
      const rect = section.getBoundingClientRect();
      progress = clamp(-rect.top / Math.max(1, section.offsetHeight - pin.offsetHeight));
      target = Math.round(range(progress, 0, 0.34) * (count - 1));
      pump();
      if (progress < 0.46) paint();

      const reveal = smooth(range(progress, 0.34, 0.45));
      if (veil) veil.style.opacity = String(reveal);
      if (camera) camera.style.opacity = String(1 - range(progress, 0.37, 0.46));
      const openingAmount = 1 - smooth(range(progress, 0.08, 0.19));
      if (opening) {
        opening.style.opacity = String(openingAmount);
        opening.style.visibility = openingAmount < 0.01 ? "hidden" : "visible";
        opening.style.transform = `translate3d(0, ${-range(progress, 0.08, 0.19) * 24}px, 0)`;
      }
      if (heading) heading.style.opacity = String(reveal);
      if (shell) {
        shell.style.opacity = String(reveal);
        shell.style.visibility = reveal > 0.01 ? "visible" : "hidden";
      }
      const build = smooth(range(progress, 0.39, 0.86));
      if (world) {
        world.style.transform = `rotateX(${(1 - build) * 28}deg) rotateY(${(1 - build) * -15}deg) rotateZ(${(1 - build) * -5}deg) scale(${0.91 + build * 0.09})`;
      }
      for (const node of nodes) {
        const index = Number(node.dataset.module);
        const amount = smooth(range(progress, 0.39 + index * 0.105, 0.51 + index * 0.105));
        node.style.transform = `translate3d(${(index % 2 ? 1 : -1) * (1 - amount) * 22}px, ${(1 - amount) * 26}px, ${(1 - amount) * (index + 1) * -75}px)`;
        node.style.opacity = String(0.15 + 0.85 * amount);
        node.style.borderColor = progress > 0.45 + index * 0.105 ? "#fff" : "#ffffff44";
      }
      const flow = range(progress, 0.48, 0.89);
      if (paths instanceof SVGElement) paths.style.strokeDashoffset = String(1 - flow);
      if (packet instanceof SVGCircleElement && paths instanceof SVGPathElement) {
        const point = paths.getPointAtLength(flow * routeLength);
        packet.setAttribute("cx", String(point.x));
        packet.setAttribute("cy", String(point.y));
        packet.style.opacity = String(reveal * (flow < 1 ? 1 : 0));
      }
      const phase = phaseFrom(progress);
      if (phase !== lastPhase) {
        lastPhase = phase;
        if (narrative) narrative.textContent = narratives[phase];
        if (phaseCount) phaseCount.textContent = `0${phase + 1} / 05`;
        labels.forEach((label, index) => label.classList.toggle("current", index === phase));
      }
      if (progressLine instanceof HTMLElement) progressLine.style.width = `${progress * 100}%`;
      section.dataset.progress = progress.toFixed(4);
    };

    const clearStyles = () => {
      for (const el of [veil, camera, opening, heading, shell, world, ...nodes]) {
        el?.removeAttribute("style");
      }
      if (packet instanceof SVGElement) packet.style.opacity = "0";
      if (paths instanceof SVGElement) paths.style.strokeDashoffset = "0";
    };

    const configure = () => {
      const next = !reduced.matches && window.innerHeight >= MIN_ENHANCED_HEIGHT;
      enabled = next;
      section.classList.toggle("system-scroll--enhanced", enabled);
      configureFrames();
      if (!enabled) {
        cancelAnimationFrame(raf);
        raf = 0;
        generation += 1;
        pending.clear();
        cache.clear();
        clearStyles();
      } else {
        schedule();
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        schedule();
      }
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", configure);
    reduced.addEventListener("change", configure);
    small.addEventListener("change", configure);
    document.addEventListener("visibilitychange", onVisibility);
    configure();

    return () => {
      cancelAnimationFrame(raf);
      generation += 1;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", configure);
      reduced.removeEventListener("change", configure);
      small.removeEventListener("change", configure);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section
      id="einstieg"
      ref={sectionRef}
      className="system-scroll"
      aria-label="Vom ersten Kontakt zum geordneten Vorgang"
    >
      <div className="system-scroll-pin" ref={pinRef}>
        <div className="system-scroll-camera" aria-hidden="true">
          <picture>
            <source media={`(max-width: ${SMALL_MAX}px)`} srcSet="/hero/sequence-mobile/0001.webp" />
            <img
              src="/hero/sequence-desktop/0001.webp"
              alt=""
              width={1440}
              height={810}
              fetchPriority="high"
            />
          </picture>
          <canvas ref={canvasRef} id="film" aria-hidden="true" />
        </div>
        <div className="system-scroll-veil" aria-hidden="true" />

        <div className="system-scroll-opening">
          <p className="system-scroll-eyebrow">BP Agentics / Websites &amp; Systeme</p>
          <h1>
            Ihr Betrieb läuft.
            <br />
            Nur digital nicht.
          </h1>
          <p className="system-scroll-lead">
            Von der ersten Anfrage bis zum nächsten Arbeitsschritt. Scrollen Sie, wie
            Informationen zusammenfinden.
          </p>
          <Link href="#leistungen" className="system-scroll-textlink">
            Was wir für Ihren Betrieb entwickeln
          </Link>
        </div>

        <div className="system-scroll-heading">
          <p className="system-scroll-eyebrow">Ein Anfrageweg / vier verbundene Schritte</p>
          <h2>
            Was vorne ankommt,
            <br />
            <em>kommt hinten weiter.</em>
          </h2>
          <p id="narrative">{narratives[0]}</p>
        </div>

        <div className="system-scroll-shell">
          <div className="system-scroll-meta">
            <span>Systemansicht</span>
            <span>Illustratives Beispiel</span>
          </div>
          <div className="system-scroll-perspective">
            <div className="system-scroll-world">
              <svg
                className="system-scroll-routes"
                viewBox="0 0 1000 620"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="route">
                    <stop stopColor="#66b5ff" />
                    <stop offset="1" stopColor="#c8e7ff" />
                  </linearGradient>
                </defs>
                <path className="rail" d="M240 140 H760 V480 H240" />
                <path id="signal" d="M240 140 H760 V480 H240" pathLength="1" />
                <circle id="packet" r="7" cx="240" cy="140" />
              </svg>

              <article className="system-scroll-module" data-module="0">
                <div className="system-scroll-module-top">
                  <span>01 / Eingang</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <h3>Eine neue Anfrage.</h3>
                <p className="system-scroll-message">
                  „Ich möchte mein Projekt
                  <br />
                  mit Ihnen besprechen.“
                </p>
                <div className="system-scroll-field">
                  <span>Interesse</span>
                  <strong>{copy.interest}</strong>
                </div>
                <p className="system-scroll-badge">Website → Anfrage</p>
              </article>

              <article className="system-scroll-module" data-module="1">
                <div className="system-scroll-module-top">
                  <span>02 / Klärung</span>
                  <span aria-hidden="true">⌘</span>
                </div>
                <h3>Der Kontext wird klar.</h3>
                <div className="system-scroll-field">
                  <span>Anliegen</span>
                  <strong>{copy.concern}</strong>
                </div>
                <div className="system-scroll-field">
                  <span>Noch offen</span>
                  <strong>{copy.missing}</strong>
                </div>
                <p className="system-scroll-badge">{copy.clarifyBadge}</p>
              </article>

              <article className="system-scroll-module system-scroll-module-record" data-module="3">
                <div className="system-scroll-module-top">
                  <span>04 / Gemeinsamer Vorgang</span>
                  <span aria-hidden="true">▤</span>
                </div>
                <h3>Alles an einem Ort.</h3>
                <p>
                  Eine Übersicht.
                  <br />
                  Ein nachvollziehbarer nächster Schritt.
                </p>
                <div className="system-scroll-chips">
                  <span>Anfrage</span>
                  <span>Kontext</span>
                  <span>Zuständigkeit</span>
                </div>
                <p className="system-scroll-badge">Bereit für die Bearbeitung</p>
              </article>

              <article className="system-scroll-module" data-module="2">
                <div className="system-scroll-module-top">
                  <span>03 / Übergabe</span>
                  <span aria-hidden="true">⑂</span>
                </div>
                <h3>Die richtige Person.</h3>
                <div className="system-scroll-field">
                  <span>Geht an</span>
                  <strong>{copy.owner}</strong>
                </div>
                <div className="system-scroll-field">
                  <span>Nächster Schritt</span>
                  <strong>{copy.next}</strong>
                </div>
                <p className="system-scroll-badge">Menschliche Klärung vorgesehen</p>
              </article>
            </div>
          </div>

          <fieldset className="system-scroll-scenario">
            <legend>Dasselbe System. Ein anderes Anliegen.</legend>
            <button
              type="button"
              aria-pressed={scenario === "angebot"}
              onClick={() => setScenario("angebot")}
            >
              Angebotsanfrage
            </button>
            <button
              type="button"
              aria-pressed={scenario === "rueckruf"}
              onClick={() => setScenario("rueckruf")}
            >
              Rückrufwunsch
            </button>
          </fieldset>
        </div>

        <div className="system-scroll-timeline" aria-hidden="true">
          <div className="timeline-line">
            <span />
          </div>
          <div className="timeline-labels">
            {phaseLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <p>
            <span id="phase-count">01 / 05</span>
            <span>Scrollen führt durch den Ablauf</span>
          </p>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {copy.status}
      </p>
    </section>
  );
}
