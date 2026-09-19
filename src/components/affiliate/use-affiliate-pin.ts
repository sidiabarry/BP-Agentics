"use client";

import { useEffect, useRef } from "react";
import { clamp01 } from "@/lib/scroll-engine";

const STEP_COUNT = 5;

function headerHeight() {
  const header = document.querySelector("body > header");
  return header instanceof HTMLElement ? header.getBoundingClientRect().height : 76;
}

/**
 * Pin-Szene nur für Affiliate.
 * Anders als useScrollScene: kein minHeight-560-Tor, kein kurzer Viewport
 * als Reduced-Motion. Pin arm't, sobald JS da ist — außer prefers-reduced-motion.
 */
export function useAffiliatePin<T extends HTMLElement>(stepCount = STEP_COUNT) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enhanced = false;
    let lastP = -1;
    let lastStep = -1;
    let frame = 0;

    const pin = () => el.querySelector<HTMLElement>("[data-affiliate-pin]");

    const releasePin = () => {
      const node = pin();
      if (!node) return;
      node.removeAttribute("data-fixed");
      node.style.removeProperty("position");
      node.style.removeProperty("top");
      node.style.removeProperty("left");
      node.style.removeProperty("right");
      node.style.removeProperty("width");
    };

    const apply = () => {
      if (!enhanced) {
        releasePin();
        return;
      }

      const header = headerHeight();
      el.style.setProperty("--header-offset", `${header}px`);

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = Math.max(1, el.offsetHeight - vh);
      const p = clamp01(-rect.top / travel);
      const step = Math.min(stepCount - 1, Math.floor(p * stepCount + 1e-4));

      if (p !== lastP) {
        lastP = p;
        el.style.setProperty("--p", p.toFixed(4));
      }
      if (step !== lastStep) {
        lastStep = step;
        el.style.setProperty("--step", String(step));
        el.dataset.step = String(step);
        el.querySelectorAll<HTMLElement>(".affiliate-rollup__rail-btn").forEach((btn) => {
          const i = Number(btn.dataset.index);
          if (i === step) btn.setAttribute("aria-current", "step");
          else btn.removeAttribute("aria-current");
        });
        el.querySelectorAll<HTMLElement>(".affiliate-rollup__step").forEach((panel) => {
          const i = Number(panel.dataset.index);
          panel.setAttribute("aria-hidden", i === step ? "false" : "true");
        });
      }

      const node = pin();
      if (!node) return;

      const pinH = node.offsetHeight;
      const shouldStick = rect.top <= header && rect.bottom > header + pinH;
      if (!shouldStick) {
        releasePin();
        return;
      }

      const pinTop = node.getBoundingClientRect().top;
      if (Math.abs(pinTop - header) > 3) {
        node.setAttribute("data-fixed", "");
        node.style.position = "fixed";
        node.style.top = `${header}px`;
        node.style.left = "0";
        node.style.right = "0";
        node.style.width = "100%";
      }
    };

    const schedule = () => {
      if (frame || document.hidden) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        apply();
      });
    };

    const configure = () => {
      const next = !reduced.matches;
      if (next !== enhanced) {
        enhanced = next;
        lastP = -1;
        lastStep = -1;
        if (enhanced) {
          el.setAttribute("data-scroll-ready", "");
          el.dataset.step = el.dataset.step ?? "0";
          el.querySelectorAll<HTMLElement>(".affiliate-rollup__step").forEach((panel) => {
            panel.removeAttribute("aria-hidden");
          });
          el.querySelectorAll<HTMLElement>(".affiliate-rollup__rail-btn").forEach((btn) => {
            btn.removeAttribute("aria-current");
          });
        } else {
          el.removeAttribute("data-scroll-ready");
          el.removeAttribute("data-step");
          el.style.removeProperty("--p");
          el.style.removeProperty("--step");
          el.style.removeProperty("--header-offset");
          el.querySelectorAll<HTMLElement>(".affiliate-rollup__step").forEach((panel) => {
            panel.removeAttribute("aria-hidden");
          });
          el.querySelectorAll<HTMLElement>(".affiliate-rollup__rail-btn").forEach((btn) => {
            btn.removeAttribute("aria-current");
          });
          releasePin();
        }
      }
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", configure);
    window.addEventListener("orientationchange", configure);
    document.addEventListener("visibilitychange", schedule);
    reduced.addEventListener("change", configure);
    configure();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", configure);
      window.removeEventListener("orientationchange", configure);
      document.removeEventListener("visibilitychange", schedule);
      reduced.removeEventListener("change", configure);
      if (frame) cancelAnimationFrame(frame);
      releasePin();
    };
  }, [stepCount]);

  return ref;
}

export function scrollAffiliateToStep(scene: HTMLElement, index: number, steps = STEP_COUNT) {
  const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
  const top = window.scrollY + scene.getBoundingClientRect().top;
  const p = (index + 0.45) / steps;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: top + travel * p, behavior: reduced ? "auto" : "smooth" });
}
