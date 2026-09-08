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
            <p className="site__h1" style={i(2)}>
              Dach. Dicht. In Hagen.
            </p>
            <p className="site__h2" style={i(3)}>
              Sanierung und Dacharbeiten in Hagen.
            </p>
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
/* Station 2 — der Nachrichten-Assistent schreibt zurück               */
/* ------------------------------------------------------------------ */

const chat = [
  { from: "in", text: "Hallo, Garagendach in Hagen — geht eine Besichtigung?" },
  { from: "out", text: "Gern. Stadtteil und Dachfläche?" },
  { from: "in", text: "Haspe, ca. 30 m²." },
  { from: "out", text: "Im Beispiel frei: Di 14:30 oder Do 9:00. Was passt?" },
  { from: "in", text: "Donnerstag 9:00." },
  { from: "out", text: "Do 9:00 steht im Beispielkalender." },
];

export function StageAnnahme() {
  return (
    <div className="stage stage--annahme">
      <div className="chat__bar">
        <span className="chat__avatar" />
        <span>
          Müller Bedachungen
          <small>KI-Assistent · Beispiel</small>
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
        <span className="chat__slot-day">Do</span>
        <span>
          9:00 Besichtigung
          <small>Beispiel · keine echte Buchung</small>
        </span>
      </div>

      <p className="chat__stamp">Beispieldialog · keine echte Buchung</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Station 3 — der Vorgang läuft durch                                 */
/* ------------------------------------------------------------------ */

const nodes = ["Eingang", "Klärung", "Zuordnung", "Vorgang"];
const rows = [
  ["Besichtigung Do 9:00", "Hagen-Haspe", "im Kalender"],
  ["Lieferschein 4412", "Baustelle Hagen", "unterschrieben"],
  ["Stunden KW 37", "Kolonne 2", "freigegeben"],
  ["Rechnung R-2291", "Müller GmbH", "raus"],
];
const bits = [
  ["Heute", "Besichtigung Do 9:00"],
  ["Offen", "1 Klärung"],
  ["Weitergabe", "an das Büro"],
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

      <ul className="ablaeufe__bits">
        {bits.map(([k, v]) => (
          <li key={k}>
            <strong>{k}</strong>
            <span>{v}</span>
          </li>
        ))}
      </ul>

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
        <div className="combo__steps">
          <article className="combo__step" style={i(0)}>
            <span className="combo__num">1</span>
            <div className="combo__copy">
              <p className="combo__kicker">Websites</p>
              <h4>Die Seite erklärt die Arbeit.</h4>
              <p className="combo__lede">Besucher findet Leistungen, Referenzen und einen Anfrageweg.</p>
            </div>
          </article>

          <article className="combo__step" style={i(1)}>
            <span className="combo__num">2</span>
            <div className="combo__copy">
              <p className="combo__kicker">Nachrichten-Assistent</p>
              <h4>Angaben und Terminwunsch werden erfasst.</h4>
              <p className="combo__lede">Per WhatsApp und E-Mail.</p>
            </div>
          </article>

          <article className="combo__step" style={i(2)}>
            <span className="combo__num">3</span>
            <div className="combo__copy">
              <p className="combo__kicker">Büroabläufe</p>
              <h4>Die Angaben stehen zusammen.</h4>
              <ul>
                <li>Do 9:00 Besichtigung</li>
                <li>Angaben zum Vorhaben</li>
                <li>Übergabe an das Team</li>
              </ul>
            </div>
          </article>
        </div>

        <p className="combo__caption" style={i(3)}>
          Drei Bausteine, ein Weg — einzeln beauftragbar, zusammen ein System.
        </p>
      </div>
    </div>
  );
}
