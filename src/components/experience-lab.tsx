"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import {
  a01Projects,
  a03Sources,
  experienceIntro,
  experienceScenes,
  type ExperienceScene,
} from "@/lib/experience";
import { cn } from "@/lib/utils";

type Phase = "start" | "transform" | "result";

function subscribeMotion(cb: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", cb);
  return () => media.removeEventListener("change", cb);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeSaveData(cb: () => void) {
  const connection = (navigator as Navigator & { connection?: EventTarget }).connection;
  connection?.addEventListener("change", cb);
  return () => connection?.removeEventListener("change", cb);
}

function saveDataSnapshot() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(connection?.saveData);
}

function phaseFrom(progress: number): Phase {
  if (progress < 0.15) return "start";
  if (progress < 0.7) return "transform";
  return "result";
}

function transformAmount(progress: number) {
  return Math.min(1, Math.max(0, (progress - 0.15) / 0.55));
}

function pickVideoSrc(scene: ExperienceScene, width: number) {
  return width < 720 ? scene.videoSmall : scene.video;
}

function subscribeNever() {
  return () => {};
}

export function ExperienceLab() {
  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);
  const [active, setActive] = useState(0);
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);

  return (
    <section id="leistungen" className="bg-[#F3EFE6] px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm tracking-[0.2em] text-[#0C5A9A] uppercase">
          {experienceIntro.kicker}
        </p>
        <h2 className="mt-3 max-w-[20ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          {experienceIntro.title}
        </h2>
        <p className="mt-5 max-w-[42rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
          {experienceIntro.lead}
        </p>

        <div
          role="tablist"
          aria-label="Engpass wählen"
          className="mt-8 grid gap-3 md:grid-cols-3"
        >
          {experienceScenes.map((scene, index) => {
            const selected = active === index;
            return (
              <a
                key={scene.id}
                href={`#${scene.solutionId}`}
                role="tab"
                id={`${scene.solutionId}-tab`}
                aria-selected={selected}
                aria-controls={scene.solutionId}
                className={cn(
                  "rounded-2xl border px-4 py-4 text-left no-underline transition",
                  selected
                    ? "border-[#14161C] bg-[#14161C] text-[#F3EFE6]"
                    : "border-black/10 bg-white text-[#14161C] hover:border-[#14161C]/40",
                )}
                onClick={(event) => {
                  event.preventDefault();
                  setActive(index);
                }}
              >
                <span className="block text-sm tracking-[0.16em] text-current/70 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-[1.05rem] font-semibold leading-snug">
                  {scene.problem}
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-8">
          {experienceScenes.map((scene, index) => {
            const visible = !hydrated || active === index;
            return (
              <article
                key={scene.id}
                id={scene.solutionId}
                role="tabpanel"
                aria-labelledby={`${scene.solutionId}-tab`}
                hidden={!visible}
                className={visible ? "block" : undefined}
                suppressHydrationWarning
              >
                <p className="text-sm tracking-[0.18em] text-[#0C5A9A] uppercase">
                  Interaktives Beispiel
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                  {scene.title}
                </h3>
                <p className="mt-3 max-w-[40rem] text-[1.12rem] leading-relaxed text-[#3A3D45]">
                  {scene.benefit}
                </p>
                <p className="mt-4">
                  <Link
                    href={scene.href}
                    className="text-[#0C5A9A] underline-offset-4 hover:underline"
                  >
                    {scene.linkLabel}
                  </Link>
                </p>
                {active === index ? (
                  <SceneStudio key={scene.id} scene={scene} reduced={reduced} />
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SceneStudio({
  scene,
  reduced,
}: {
  scene: ExperienceScene;
  reduced: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef(0);
  const htmlStartedAt = useRef(0);
  const htmlElapsed = useRef(0);
  const saveData = useSyncExternalStore(subscribeSaveData, saveDataSnapshot, () => false);

  const [progress, setProgress] = useState(reduced ? 1 : 0);
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState<string>();
  const [mediaFailed, setMediaFailed] = useState(false);
  const [status, setStatus] = useState(
    reduced
      ? "Bewegung reduziert: das Ergebnis steht sofort in den Karten."
      : "Poster bereit. Der Film startet erst auf Ihren Klick.",
  );
  const [choice, setChoice] = useState<string | null>(null);
  const [source, setSource] = useState<(typeof a03Sources)[number]["id"] | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [project, setProject] = useState<(typeof a01Projects)[number]["id"] | null>(null);
  const [posterOk, setPosterOk] = useState(true);
  const progressRef = useRef(progress);

  const phase = phaseFrom(progress);
  const amount = reduced ? 1 : transformAmount(progress);

  const stopRaf = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const startHtmlClock = useCallback(() => {
    htmlElapsed.current = progressRef.current * 4000;
    htmlStartedAt.current = performance.now();
  }, []);

  const resetScene = useCallback(
    (message: string) => {
      stopRaf();
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      htmlStartedAt.current = 0;
      htmlElapsed.current = 0;
      setPlaying(false);
      setProgress(reduced ? 1 : 0);
      setChoice(null);
      setSource(null);
      setInquiryOpen(false);
      setProject(null);
      setStatus(message);
    },
    [reduced, stopRaf],
  );

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      video?.pause();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!playing) {
      stopRaf();
      return;
    }
    const frame = () => {
      const video = videoRef.current;
      let next = 0;
      if (video && src && !mediaFailed && video.duration) {
        next = Math.min(1, Math.max(0, video.currentTime / video.duration));
      } else if (htmlStartedAt.current) {
        next = Math.min(1, (htmlElapsed.current + performance.now() - htmlStartedAt.current) / 4000);
      }
      setProgress(next);
      if (next >= 1) {
        setPlaying(false);
        setStatus("Ergebnis ansehen: die Karten sind der nächste Schritt, nicht der Film.");
        return;
      }
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);
    return stopRaf;
  }, [playing, src, mediaFailed, stopRaf]);

  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden) return;
      videoRef.current?.pause();
      if (htmlStartedAt.current) {
        htmlElapsed.current += performance.now() - htmlStartedAt.current;
        htmlStartedAt.current = 0;
      }
      setPlaying(false);
      stopRaf();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [stopRaf]);

  useEffect(() => {
    if (!playing || reduced) return;
    if (mediaFailed || !src) {
      if (!htmlStartedAt.current) startHtmlClock();
      return;
    }
    const video = videoRef.current;
    if (!video) {
      if (!htmlStartedAt.current) startHtmlClock();
      return;
    }
    void video.play().catch(() => {
      setMediaFailed(true);
      startHtmlClock();
      setStatus("Der Film lädt nicht. Das Beispiel läuft mit den Karten weiter.");
    });
  }, [playing, src, reduced, mediaFailed, startHtmlClock]);

  const startDemo = () => {
    if (reduced) {
      setProgress(1);
      setStatus("Bewegung reduziert: das Ergebnis steht sofort in den Karten.");
      return;
    }
    const width = stageRef.current?.clientWidth ?? 640;
    const nextSrc = pickVideoSrc(scene, width);
    if (!mediaFailed) {
      setSrc(nextSrc);
    }
    setPlaying(true);
    setStatus(
      mediaFailed
        ? "Der Film lädt nicht. Das Beispiel läuft mit den Karten weiter."
        : saveData
          ? "Sparmodus: der Film startet erst jetzt, nach Ihrem Klick."
          : "Beispiel läuft. Pause und Ergebnis bleiben erreichbar.",
    );
    if (mediaFailed) startHtmlClock();
  };

  const pauseDemo = () => {
    videoRef.current?.pause();
    if (htmlStartedAt.current) {
      htmlElapsed.current += performance.now() - htmlStartedAt.current;
      htmlStartedAt.current = 0;
    }
    setPlaying(false);
    stopRaf();
    setStatus("Pause. Die Erklärung und der Leistungslink bleiben bedienbar.");
  };

  const showResult = () => {
    stopRaf();
    const video = videoRef.current;
    if (video && video.duration) {
      video.pause();
      video.currentTime = video.duration;
    }
    htmlElapsed.current = 4000;
    htmlStartedAt.current = 0;
    setPlaying(false);
    setProgress(1);
    setStatus("Ergebnis direkt angezeigt. Der Film behauptet keinen abgeschlossenen Auftrag.");
  };

  const repeatDemo = () => {
    resetScene("Zurück zum Ausgang. Starten Sie das Beispiel erneut, wenn Sie möchten.");
  };

  return (
    <div className="experience-lab mt-8">
      <div className="experience-frame">
      <div
        ref={stageRef}
        className="experience-stage relative overflow-hidden rounded-[1.6rem] bg-[#E7E2D6] ring-1 ring-black/10"
      >
        {posterOk ? (
          // Poster stays decorative until the visitor starts the clip.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={scene.poster}
            alt=""
            width={1200}
            height={900}
            className="absolute inset-0 h-full w-full object-cover"
            decoding="async"
            onError={() => setPosterOk(false)}
          />
        ) : (
          <div className="absolute inset-0 bg-[#E7E2D6]" aria-hidden="true" />
        )}
        {src && !reduced ? (
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            preload="none"
            width={1200}
            height={900}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            onWaiting={() => {
              if (htmlStartedAt.current) {
                htmlElapsed.current += performance.now() - htmlStartedAt.current;
                htmlStartedAt.current = 0;
              }
            }}
            onPlaying={() => {
              if (playing && !htmlStartedAt.current && mediaFailed) {
                htmlStartedAt.current = performance.now();
              }
            }}
            onError={() => {
              setMediaFailed(true);
              startHtmlClock();
              setStatus("Der Film lädt nicht. Das Beispiel läuft mit den Karten weiter.");
            }}
            onLoadedMetadata={() => {
              if (playing) {
                void videoRef.current?.play().catch(() => {
                  setMediaFailed(true);
                  startHtmlClock();
                  setStatus("Der Film lädt nicht. Das Beispiel läuft mit den Karten weiter.");
                });
              }
            }}
            onEnded={() => {
              setPlaying(false);
              setProgress(1);
              setStatus("Ergebnis ansehen: die Karten sind der nächste Schritt, nicht der Film.");
            }}
          />
        ) : null}
      </div>
      {scene.id === "auftritt" ? <AuftrittOverlay amount={amount} /> : null}
      {scene.id === "annahme" ? <AnnahmeOverlay amount={amount} choice={choice} /> : null}
      {scene.id === "ablaeufe" ? <AblaeufeOverlay amount={amount} source={source} /> : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {!playing && phase !== "result" ? (
          <button type="button" className="experience-btn experience-btn-primary" onClick={startDemo}>
            {scene.startLabel}
          </button>
        ) : null}
        {playing ? (
          <button type="button" className="experience-btn" onClick={pauseDemo}>
            Pause
          </button>
        ) : null}
        <button type="button" className="experience-btn" onClick={showResult}>
          Ergebnis direkt anzeigen
        </button>
        <button type="button" className="experience-btn" onClick={repeatDemo}>
          Wiederholen
        </button>
        {scene.id === "ablaeufe" ? (
          <>
            <button
              type="button"
              className="experience-btn"
              onClick={() => {
                resetScene("Vorher: lose Informationen, noch kein gemeinsamer Vorgang.");
              }}
            >
              Vorher
            </button>
            <button type="button" className="experience-btn" onClick={showResult}>
              Nachher
            </button>
          </>
        ) : null}
      </div>

      {scene.id === "auftritt" && phase === "result" ? (
        <div className="mt-5 rounded-2xl bg-white p-5 ring-1 ring-black/8">
          {!inquiryOpen ? (
            <button
              type="button"
              className="experience-btn experience-btn-primary"
              onClick={() => {
                setInquiryOpen(true);
                setStatus("Lokale Beispielanfrage geöffnet. Es wird nichts versendet.");
              }}
            >
              Beispielanfrage öffnen
            </button>
          ) : (
            <div className="grid gap-3">
              <p className="text-[1.05rem] font-medium">Welche Projektart passt als Beispiel?</p>
              <div className="flex flex-wrap gap-2">
                {a01Projects.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(
                      "experience-btn",
                      project === item.id && "experience-btn-primary",
                    )}
                    onClick={() => {
                      setProject(item.id);
                      setStatus(`Auswahl: ${item.label}. Nur lokal, keine Nachricht gesendet.`);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="rounded-xl bg-[#F3EFE6] px-4 py-3">
                <p className="text-sm tracking-[0.14em] text-[#0C5A9A] uppercase">
                  Lokale Anfrageübersicht
                </p>
                <p className="mt-2 text-[1.05rem]">
                  {project
                    ? a01Projects.find((item) => item.id === project)?.summary
                    : "Noch keine Projektart gewählt."}
                </p>
              </div>
              <p>
                <Link href="/kontakt" className="text-[#0C5A9A] underline-offset-4 hover:underline">
                  Echte Anfrage stellen
                </Link>
                <span className="text-[#5C5F66]"> — getrennter Kontaktweg, kein Demo-Versand.</span>
              </p>
            </div>
          )}
        </div>
      ) : null}

      {scene.id === "annahme" && phase === "result" ? (
        <div className="mt-5 rounded-2xl bg-white p-5 ring-1 ring-black/8">
          <p className="text-[1.05rem] font-medium">Beispiel: Ich möchte mein Projekt besprechen.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className={cn("experience-btn", choice === "callback" && "experience-btn-primary")}
              onClick={() => {
                setChoice("callback");
                setStatus("Rückrufwunsch erfasst – Beispiel. Kein echter Anruf wurde ausgelöst.");
              }}
            >
              Rückruf
            </button>
            <button
              type="button"
              className={cn("experience-btn", choice === "appointment" && "experience-btn-primary")}
              onClick={() => {
                setChoice("appointment");
                setStatus("Terminwunsch zur Abstimmung – Beispiel. Es ist kein Termin gebucht.");
              }}
            >
              Terminwunsch
            </button>
          </div>
          {choice ? (
            <div className="mt-4 rounded-xl bg-[#F3EFE6] px-4 py-3">
              <p className="font-medium">
                {choice === "callback"
                  ? "Rückrufwunsch erfasst – Beispiel"
                  : "Terminwunsch zur Abstimmung – Beispiel"}
              </p>
              <p className="mt-2 text-[#3A3D45]">
                {choice === "callback"
                  ? "Nächster Schritt: ein Rückruf in der genannten Zeit. Das bleibt ein Beispiel."
                  : "Nächster Schritt: Wunschdatum und Uhrzeit abstimmen. Das ist keine Buchung."}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      {scene.id === "ablaeufe" && phase === "result" ? (
        <div className="mt-5 rounded-2xl bg-white p-5 ring-1 ring-black/8">
          <p className="text-[1.05rem] font-medium">
            Einmal erfassen. Gemeinsam weiterarbeiten.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {a03Sources.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn("experience-btn", source === item.id && "experience-btn-primary")}
                onClick={() => {
                  setSource(item.id);
                  setStatus(`${item.label}: ${item.detail}. Zuordnung im Beispiel, keine Texterkennung.`);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[#3A3D45]">
            {source
              ? a03Sources.find((item) => item.id === source)?.detail
              : "Wählen Sie eine Quelle, um die zugeordnete Beispielinformation zu sehen."}
          </p>
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {status}
      </p>
      <p className="mt-3 text-[1.02rem] text-[#5C5F66]" aria-hidden="true">
        {status}
      </p>
      <p className="mt-1 text-sm text-[#5C5F66]">{scene.caption} Kein Kundenprojekt.</p>
    </div>
  );
}

function AuftrittOverlay({ amount }: { amount: number }) {
  const layers = [
    { label: "Leistung", x: -18, y: 16, rotY: -10, rotX: 8, z: 20 },
    { label: "Arbeitsprobe", x: -4, y: 4, rotY: -4, rotX: 3, z: 40 },
    { label: "Anfrage", x: 14, y: -8, rotY: 8, rotX: -6, z: 60 },
  ];
  return (
    <div className="experience-overlay experience-overlay-right" aria-hidden="true">
      {layers.map((layer) => (
        <div
          key={layer.label}
          className="experience-card"
          style={
            {
              transform: `translate3d(${layer.x * (1 - amount)}%, ${layer.y * (1 - amount)}%, ${layer.z}px) rotateX(${layer.rotX * (1 - amount)}deg) rotateY(${layer.rotY * (1 - amount)}deg)`,
            } as CSSProperties
          }
        >
          {layer.label}
        </div>
      ))}
    </div>
  );
}

function AnnahmeOverlay({
  amount,
  choice,
}: {
  amount: number;
  choice: string | null;
}) {
  return (
    <div className="experience-overlay experience-overlay-right" aria-hidden="true">
      <div
        className="experience-card"
        style={{
          transform: `translate3d(${-28 * (1 - amount)}%, ${10 * (1 - amount)}%, ${40 + amount * 20}px) rotateX(${6 * (1 - amount)}deg) rotateY(${-8 * (1 - amount)}deg)`,
        }}
      >
        Beispiel: Ich möchte mein Projekt besprechen.
      </div>
      {choice ? (
        <div
          className="experience-card mt-3"
          style={{ transform: `translate3d(0, 0, 70px)` }}
        >
          {choice === "callback"
            ? "Rückrufwunsch erfasst – Beispiel"
            : "Terminwunsch zur Abstimmung – Beispiel"}
        </div>
      ) : null}
    </div>
  );
}

function AblaeufeOverlay({
  amount,
  source,
}: {
  amount: number;
  source: string | null;
}) {
  return (
    <div className="experience-overlay experience-overlay-right" aria-hidden="true">
      <div
        className="experience-card experience-card-wide"
        style={{
          transform: `translate3d(0, 0, 10px) rotateX(${4 * (1 - amount)}deg) rotateY(${-6 * (1 - amount)}deg)`,
        }}
      >
        <p className="text-sm tracking-[0.14em] uppercase">Vorgang</p>
        <p className="mt-1 font-medium">Einmal erfassen. Gemeinsam weiterarbeiten.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {a03Sources.map((item, index) => {
            const fromX = -36 + index * 10;
            const fromY = 28 - index * 8;
            return (
              <span
                key={item.id}
                className={cn(
                  "experience-chip",
                  source === item.id && "experience-chip-active",
                )}
                style={{
                  transform: `translate3d(${fromX * (1 - amount)}px, ${fromY * (1 - amount)}px, ${20 + amount * 16}px)`,
                }}
              >
                {item.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
