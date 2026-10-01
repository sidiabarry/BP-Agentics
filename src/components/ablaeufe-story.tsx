"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { AblaeufeLight } from "@/components/ablaeufe-light";
import styles from "./ablaeufe-story.module.css";

const PHRASES = ["Do 9:00 ·", "Frau Keller ·", "Rückruf"] as const;

type Phase = "notiz" | "twice" | "shared" | "fade";

function Line({ again = false }: { again?: boolean }) {
  return (
    <p className={again ? `${styles.line} ${styles.lineAgain}` : `${styles.line} ${styles.lineFirst}`}>
      {PHRASES.map((phrase, index) => (
        <span
          key={`${phrase}-${index}`}
          className={styles.word}
          style={{ "--i": index } as CSSProperties}
        >
          <span className={styles.wordInner}>{phrase}</span>
        </span>
      ))}
    </p>
  );
}

export function AblaeufeStory({
  price,
  note,
  children,
}: {
  price: string;
  note: string;
  children?: ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("notiz");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let stop = false;
    const timers: number[] = [];
    const later = (ms: number, run: () => void) => {
      timers.push(
        window.setTimeout(() => {
          if (!stop) run();
        }, ms),
      );
    };

    const cycle = () => {
      setPhase("notiz");
      later(1700, () => setPhase("twice"));
      later(4200, () => setPhase("shared"));
      later(9800, () => setPhase("fade"));
      later(10600, () => {
        setCycle((value) => value + 1);
        cycle();
      });
    };
    cycle();

    return () => {
      stop = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div className={styles.path}>
      <section className={styles.scene} data-phase={phase} aria-label="Dieselbe Zeile im Büro und unterwegs">
        <AblaeufeLight className={styles.canvas} />
        <div key={cycle} className={styles.copy}>
          <p className={styles.caption}>notiert</p>
          <Line />
          <div className={styles.duplicate} aria-hidden={phase !== "twice"}>
            <div className={styles.duplicateInner}>
              <p className={styles.captionAgain}>noch einmal</p>
              <Line again />
            </div>
          </div>
          <p className={styles.relief}>Dieselbe Zeile im Büro und unterwegs.</p>
          <p className={styles.reliefSub}>Sie wird nicht noch einmal getippt.</p>
          <Separator className={styles.rule} />
          <p className={styles.offer}>
            Gemeinsame Datenbasis und ein Prozessmodul, {price}, einmal. Ohne monatliche Bindung.
          </p>
          <p className={styles.note}>{note}</p>
        </div>
      </section>

      <p className={styles.aside}>
        Wie ein Bestellweg in einem Laden aussehen kann, zeigt die Kundengeschichte{" "}
        <Link
          href="/referenzen/feinkost-kreta"
          className="text-[#198BE8] underline-offset-4 hover:underline"
        >
          Projekt Feinkost Kreta
        </Link>
        .
      </p>
      {children ? <div className={styles.follow}>{children}</div> : null}
    </div>
  );
}
