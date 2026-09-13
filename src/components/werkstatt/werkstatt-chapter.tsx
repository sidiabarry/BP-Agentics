"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { anchors, stations, werkstattCopy, werkstattExit } from "@/lib/journey";
import { range, smooth, useScrollScene } from "@/lib/scroll-engine";
import { stations as stationCopy, stationOrder } from "@/components/werkstatt/content";
import "./werkstatt.css";

const WerkstattScene = dynamic(
  () => import("@/components/werkstatt/werkstatt-scene").then((mod) => mod.WerkstattScene),
  { ssr: false },
);

function WerkstattDock() {
  return (
    <nav className="werkstatt-dock" aria-label="Leistungen der Werkstatt">
      {stations.map((stop) => (
        <Link key={stop.id} href={stop.href} className="werkstatt-dock__link">
          {stop.button}
        </Link>
      ))}
      <Link href={werkstattExit.continue.href} className="werkstatt-dock__exit">
        {werkstattExit.continue.label}
      </Link>
      <Link href={werkstattExit.talk.href} className="werkstatt-dock__exit">
        {werkstattExit.talk.label}
      </Link>
    </nav>
  );
}

function WerkstattStatic() {
  return (
    <div className="werkstatt-static">
      <p className="werkstatt-static__eyebrow">{werkstattCopy.eyebrow}</p>
      <h2 className="werkstatt-static__title">
        {werkstattCopy.titleLead}
        <br />
        <span>{werkstattCopy.titleAccent}</span>
      </h2>
      <p className="werkstatt-static__lead">{werkstattCopy.lead}</p>
      <ol className="werkstatt-static__list">
        {stationOrder.map((id) => {
          const copy = stationCopy[id];
          const stop = stations.find((item) => item.id === id);
          if (!stop) return null;
          return (
            <li key={id} className="werkstatt-static__item">
              <p className="werkstatt-static__num">
                {copy.num} · {copy.label}
              </p>
              <p>{copy.promise}</p>
              <p className="werkstatt-static__price">{copy.price}</p>
              <Link href={stop.href} className="werkstatt-static__link">
                {stop.button}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function WerkstattExit() {
  return (
    <section className="werkstatt-exit" aria-labelledby="werkstatt-ausgang">
      <p className="werkstatt-exit__kicker">{werkstattExit.kicker}</p>
      <h2 id="werkstatt-ausgang" className="werkstatt-exit__title">
        {werkstattExit.title}
      </h2>
      <p className="werkstatt-exit__body">{werkstattExit.body}</p>
      <div className="werkstatt-exit__links">
        {werkstattExit.links.map((item, index) => (
          <Button
            key={item.href}
            asChild
            variant={index === 0 ? "default" : "outline"}
            className={
              index === 0
                ? "h-12 rounded-full bg-[#198BE8] px-6 text-white hover:bg-[#1576C4]"
                : "h-12 rounded-full border-black/15 bg-transparent px-6 text-[#14161C] hover:bg-white"
            }
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </div>
    </section>
  );
}

export function WerkstattChapter() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [osReduced, setOsReduced] = useState(false);
  const [webgl, setWebgl] = useState(false);

  const sectionRef = useScrollScene<HTMLElement>({
    mode: "pin",
    minHeight: 560,
    onFrame: (p, el) => {
      el.style.setProperty("--exit", smooth(range(p, 0.72, 1)).toFixed(4));
    },
    onMode: (_enhanced, reducedMotion) => {
      setOsReduced(reducedMotion);
    },
  });

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    setWebgl(Boolean(gl));
  }, []);

  useEffect(() => {
    const host = pinRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => setLive(entry.isIntersecting),
      { rootMargin: "15% 0px 15% 0px", threshold: 0 },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const skipScene = osReduced || !webgl;

  return (
    <>
      <section
        ref={sectionRef}
        id={anchors.werkstatt}
        className="werkstatt-scroll werkstatt-scroll--chapter scroll-mt-28"
        data-intro="false"
        aria-label="Die Werkstatt — drei Leistungen als Ort"
      >
        <div className="werkstatt-scroll__pin" ref={pinRef}>
          {skipScene || !live ? <WerkstattStatic /> : <WerkstattScene reduced={osReduced} />}
          <WerkstattDock />
          <div className="werkstatt-exit-veil" aria-hidden="true" />
        </div>
      </section>
      <WerkstattExit />
    </>
  );
}
