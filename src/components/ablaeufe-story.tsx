"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import styles from "./ablaeufe-story.module.css";

const markerClass =
  "h-11 w-11 rounded-full bg-[#198BE8] px-0 text-[0.95rem] font-semibold text-white";

function Marker({ n }: { n: string }) {
  return (
    <div className={styles.marker}>
      <Badge className={markerClass}>{n}</Badge>
    </div>
  );
}

function FieldSlip() {
  return (
    <div className={styles.slip} aria-hidden="true">
      <div className={styles.slipTop}>
        <span>Termin</span>
        <span className={styles.slipId}>Do 9:00</span>
      </div>
      <p className={styles.slipPlace}>Frau Keller</p>
      <ul className={styles.slipRows}>
        <li className={styles.slipRow}>
          <span className={styles.slipLabel}>Anlass</span>
          <span>Rückruf</span>
        </li>
        <li className={styles.slipRow}>
          <span className={styles.slipLabel}>Stand</span>
          <span className={styles.pill}>
            <span className={styles.dot} />
            erfasst
          </span>
        </li>
      </ul>
      <p className={styles.example}>Beispiel</p>
    </div>
  );
}

function Face({
  where,
  status,
  arrive = false,
}: {
  where: string;
  status: string;
  arrive?: boolean;
}) {
  return (
    <div className={arrive ? `${styles.face} ${styles.arrive}` : styles.face} aria-hidden="true">
      <p className={styles.faceWhere}>{where}</p>
      <p className={styles.faceId}>Do 9:00</p>
      <p className={styles.facePlace}>Frau Keller · Rückruf</p>
      <p className={styles.pill}>{status}</p>
    </div>
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
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const scenes = root.querySelectorAll("[data-scene]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.on);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={styles.path}>
      <div className={styles.track}>
        <div className={styles.rail} aria-hidden="true">
          <span className={styles.railLine} />
          <span className={styles.bead} />
        </div>
        <ol className={styles.steps}>
          <li className={styles.step} data-scene>
            <Marker n="1" />
            <div className={styles.panelField}>
              <div>
                <p className={styles.kicker}>Einmal</p>
                <h2 className={styles.title}>Einmal erfassen</h2>
                <p className={styles.body}>
                  Sie notieren den Termin einmal, am Telefon, am Tresen oder unterwegs.
                  Uhrzeit, Name und Anlass gehen so ins Büro.
                </p>
              </div>
              <FieldSlip />
            </div>
          </li>

          <li className={styles.step} data-scene>
            <Marker n="2" />
            <div className={styles.panelInk}>
              <p className={styles.kicker}>Im Büro</p>
              <h2 className={styles.title}>Büro sieht denselben Stand</h2>
              <p className={styles.body}>
                Das Büro sieht Do 9:00 und Frau Keller, ohne die Uhrzeit noch einmal
                zu erfragen. Fachliche Freigaben bleiben bei den zuständigen Personen
                im Betrieb.
              </p>
              <div className={styles.handoff}>
                <Face where="Erfasst" status="liegt vor" />
                <div className={styles.bridge} aria-hidden="true">
                  <span className={styles.bridgeLine} />
                  <span>derselbe Stand</span>
                  <span className={styles.bridgeLine} />
                </div>
                <Face where="Büro" status="dieselbe Uhrzeit" arrive />
              </div>
            </div>
          </li>

          <li className={styles.step} data-scene>
            <Marker n="3" />
            <div className={styles.once}>
              <div className={styles.onceCopy}>
                <p className={styles.kicker}>Danach</p>
                <h2 className={styles.title}>Nichts wird ein zweites Mal getippt</h2>
                <p className={styles.body}>
                  Dieselbe Angabe wird nicht noch einmal abgetippt. Programme, die
                  bei Ihnen zuverlässig laufen, bleiben. Eine Verbindung entsteht nur
                  dort, wo Sie sie vereinbaren.
                </p>
              </div>
              <div className={styles.ledger} aria-hidden="true">
                <p className={styles.kept}>
                  <span>Do 9:00 · Frau Keller</span>
                  <span>einmal</span>
                </p>
                <p className={styles.dropped}>
                  <span>Do 9:00 · Frau Keller</span>
                  <span>noch einmal</span>
                  <span className={styles.strike} />
                </p>
              </div>
            </div>
          </li>
        </ol>
      </div>

      <div className={styles.price}>
        <div className={styles.priceInner}>
          <Separator className="bg-[#14161C]/15" />
          <p className={styles.priceLabel}>Datenbasis + 1 Prozessmodul</p>
          <p className={styles.priceValue}>{price}</p>
          <p className={styles.priceBody}>
            Eine monatliche Betreuung ist in diesem Einstieg nicht enthalten. Die
            Datenbasis ist keine kaufmännische Software. Weitere Module kommen nur,
            wenn sie im Angebot stehen.
          </p>
          <p className={styles.priceNote}>{note}</p>
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
        </div>
      </div>

      {children ? <div className={styles.follow}>{children}</div> : null}
    </div>
  );
}
