"use client";

/**
 * Die vier Bühnen im Gerät.
 *
 * Bewusst reines Markup: jede Animation hängt an --s1 … --s4 und wird in
 * styles/scroll-experience.css definiert. Damit lässt sich das Timing tunen,
 * ohne eine einzige Zeile TSX anzufassen.
 *
 * Alle Bühnen sind dekorative Reproduktionen — die Sektion ist über die
 * Textspalte vollständig lesbar, deshalb aria-hidden am Container.
 */

import type { CSSProperties } from "react";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/* ------------------------------------------------------------------ */
/* Station 1 — die Website baut sich auf                               */
/* ------------------------------------------------------------------ */

export function StageAuftritt() {
  return (
    <div className="stage stage--auftritt">
      <div className="browser">
        <span className="browser__dot" />
        <span className="browser__dot" />
        <span className="browser__dot" />
        <span className="browser__url">meisterbetrieb-mueller.de</span>
      </div>

      <div className="site">
        <div className="site__nav" style={i(0)}>
          <strong>MÜLLER BEDACHUNGEN</strong>
          <span>Leistungen</span>
          <span>Referenzen</span>
          <em>Anfragen</em>
        </div>

        <div className="site__hero">
          <div className="site__photo" style={i(1)} />
          <div className="site__words">
            <span className="site__h1" style={i(2)} />
            <span className="site__h2" style={i(3)} />
            <span className="site__cta" style={i(4)}>
              Dach prüfen lassen
            </span>
          </div>
        </div>

        <div className="site__grid">
          <span style={i(5)} />
          <span style={i(6)} />
          <span style={i(7)} />
        </div>
      </div>

      <span className="site__pointer" />
      <span className="site__toast">Anfrage abgeschickt</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Station 2 — der Setter schreibt zurück                              */
/* ------------------------------------------------------------------ */

const chat = [
  { from: "in", text: "Guten Abend, bei uns tropft es seit heute durchs Dach." },
  { from: "out", text: "Danke für die Nachricht. Steht aktuell Wasser im Raum?" },
  { from: "in", text: "Nur ein Eimer, aber es läuft weiter." },
  { from: "out", text: "Verstanden. Passt Dienstag 14:30 für eine Besichtigung?" },
  { from: "in", text: "Ja, das geht." },
];

export function StageAnnahme() {
  return (
    <div className="stage stage--annahme">
      <div className="chat__bar">
        <span className="chat__avatar" />
        <span>
          Müller Bedachungen
          <small>antwortet sofort</small>
        </span>
      </div>

      <ol className="chat">
        {chat.map((m, n) => (
          <li key={m.text} className={`chat__${m.from}`} style={i(n)}>
            {m.text}
          </li>
        ))}
      </ol>

      <div className="chat__slot">
        <span className="chat__slot-day">Di</span>
        <span>
          14:30 Besichtigung
          <small>im Kalender des Meisters</small>
        </span>
      </div>

      <p className="chat__stamp">21:47 Uhr — niemand im Büro</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Station 3 — der Vorgang läuft durch                                 */
/* ------------------------------------------------------------------ */

const nodes = ["Eingang", "Klärung", "Zuordnung", "Vorgang"];
const rows = [
  ["Lieferschein 4412", "Baustelle Hagen", "unterschrieben"],
  ["Stunden KW 37", "Kolonne 2", "freigegeben"],
  ["Rechnung R-2291", "Müller GmbH", "raus"],
];

export function StageAblaeufe() {
  return (
    <div className="stage stage--ablaeufe">
      <div className="flow">
        <svg className="flow__wire" viewBox="0 0 560 40" preserveAspectRatio="none">
          <path d="M28 20 H532" pathLength={1} />
        </svg>
        <span className="flow__packet" />
        {nodes.map((n, idx) => (
          <span key={n} className="flow__node" style={i(idx)}>
            {n}
          </span>
        ))}
      </div>

      <div className="ledger">
        <div className="ledger__head">
          <span>Beleg</span>
          <span>Zuordnung</span>
          <span>Status</span>
        </div>
        {rows.map((r, idx) => (
          <div key={r[0]} className="ledger__row" style={i(idx)}>
            <span>{r[0]}</span>
            <span>{r[1]}</span>
            <span className="ledger__state">{r[2]}</span>
          </div>
        ))}
      </div>

      <span className="ledger__paper" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Station 4 — die drei Bausteine greifen ineinander                   */
/* ------------------------------------------------------------------ */

export function StageSystem() {
  return (
    <div className="stage stage--system">
      <div className="combo">
        <svg className="combo__wire" viewBox="0 0 520 20" preserveAspectRatio="none">
          <path d="M70 10 H450" pathLength={1} />
        </svg>
        <span className="combo__piece combo__piece--browser" style={i(0)}>
          Auftritt
        </span>
        <span className="combo__piece combo__piece--phone" style={i(1)}>
          Annahme
        </span>
        <span className="combo__piece combo__piece--board" style={i(2)}>
          Abläufe
        </span>
      </div>
      <p className="combo__caption">
        Eine Anfrage, ein Weg, ein Vorgang — vom ersten Klick bis zur Rechnung.
      </p>
    </div>
  );
}
