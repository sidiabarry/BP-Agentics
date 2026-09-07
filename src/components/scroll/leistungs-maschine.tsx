"use client";

/**
 * AKT III — Die Leistungs-Maschine.
 *
 * Eine gepinnte Szene mit vier Stationen. Links läuft der Text durch, rechts
 * steht EIN Gerät, das seine Form verändert: Browser → Handy → Dashboard →
 * Zusammenspiel. In jeder Station baut sich im Gerät die Leistung selbst auf.
 *
 * Der Beweis ist die Sektion selbst: Wer sehen will, ob ich so etwas bauen
 * kann, scrollt daran entlang.
 *
 * Alles Sichtbare hängt an CSS-Variablen, die hier pro Frame gesetzt werden:
 *   --p               Fortschritt der ganzen Szene (0…1)
 *   --s1 … --s4       Fortschritt innerhalb einer Station (0…1)
 *   --f1 … --f4       Fokus einer Station (0 an den Rändern, 1 in der Mitte)
 *   --shell-w/h/r     Maße des Geräts (wird zwischen den Stationen morphed)
 */

import Link from "next/link";
import {
  useScrollScene,
  clamp01,
  lerp,
  range,
  smooth,
  window3,
} from "@/lib/scroll-engine";
import { StageAuftritt, StageAnnahme, StageAblaeufe, StageSystem } from "./machine-stages";

const LEAD = 0.07; // Vorlauf: Gerät fährt herein
const SEG = 0.22; // Länge einer Station
const STATIONS = 4;

/** Gerätemaße je Station in rem. */
const SHELL = [
  { w: 44, h: 27.5, r: 14 }, // Browserfenster
  { w: 18.5, h: 37, r: 38 }, // Handy
  { w: 43, h: 29, r: 16 }, // Dashboard
  { w: 45, h: 25, r: 20 }, // Zusammenspiel
];

const stations = [
  {
    id: "auftritt",
    name: "Auftritt",
    promise: "Die Website, die die Anfrage überhaupt erst auslöst.",
    text:
      "Kein Baukasten mit Stockfotos. Eine Seite, die Ihre Arbeit zeigt und Besucher zu einer Anfrage führt, die Sie auch beantworten wollen.",
    facts: [
      "Einseiter oder Signature-Seite mit Scroll-Choreografie",
      "Auf Ihr Gewerk und Ihr Einzugsgebiet zugeschnitten",
      "Anfragestrecke, die schon vorqualifiziert",
    ],
    href: "/leistungen/auftritt",
  },
  {
    id: "annahme",
    name: "Annahme",
    promise: "Der Setter, der antwortet, während Sie auf dem Dach stehen.",
    text:
      "Eine Anfrage um 21:40 ist am nächsten Morgen kalt. Der Setter schreibt zurück, fragt das Nötige nach und legt den Termin in Ihren Kalender.",
    facts: [
      "Antwortet per WhatsApp, Formular oder Chat",
      "Fragt nach, statt einen Zettel weiterzureichen",
      "Übergibt erst, wenn der Kontext vollständig ist",
    ],
    href: "/leistungen/annahme",
  },
  {
    id: "ablaeufe",
    name: "Abläufe",
    promise: "Das System hinter dem Tresen.",
    text:
      "Lieferschein, Stundenzettel, Materialliste. Was heute auf Papier durch den Betrieb wandert, läuft als Vorgang durch — vom Handy des Monteurs bis zur Rechnung.",
    facts: [
      "Papierprozesse ohne App-Zwang aufs Handy",
      "Zuständigkeit und Status an einem Ort",
      "Rechnung am Einsatztag statt am Monatsende",
    ],
    href: "/leistungen/ablaeufe",
  },
  {
    id: "system",
    name: "Zusammenspiel",
    promise: "Einzeln nützlich. Zusammen ein System.",
    text:
      "Die Website holt die Anfrage, die Annahme klärt sie, die Abläufe erledigen sie. Sie müssen nicht alles auf einmal bauen — aber alles passt aufeinander.",
    facts: [
      "Schrittweise aufbaubar, ein Baustein nach dem anderen",
      "Festpreis für den Einbau, fester Monatsbetrag für den Betrieb",
      "Ein Ansprechpartner, keine Agenturkette",
    ],
    href: "/leistungen",
  },
];

/** Interpoliert die Geräteform. Morph passiert im letzten Viertel jeder Station. */
function shellAt(p: number) {
  const raw = clamp01((p - LEAD) / (SEG * STATIONS)) * STATIONS;
  const i = Math.min(STATIONS - 1, Math.floor(raw));
  const t = smooth(range(raw - i, 0.72, 1));
  const a = SHELL[i];
  const b = SHELL[Math.min(STATIONS - 1, i + 1)];
  return {
    w: lerp(a.w, b.w, t),
    h: lerp(a.h, b.h, t),
    r: lerp(a.r, b.r, t),
  };
}

export function LeistungsMaschine() {
  const ref = useScrollScene<HTMLElement>({
    mode: "pin",
    minHeight: 600,
    vars: (p) => {
      const out: Record<string, number | string> = {
        "--intro": smooth(range(p, 0, LEAD)),
        "--rail": clamp01((p - LEAD) / (SEG * STATIONS)),
      };
      for (let i = 0; i < STATIONS; i += 1) {
        const start = LEAD + i * SEG;
        const end = start + SEG;
        out[`--s${i + 1}`] = range(p, start, end).toFixed(4);
        const f = window3(p, start - 0.02, end + 0.02, 0.16);
        out[`--f${i + 1}`] = f.toFixed(4);
        // Unsichtbare Stationen dürfen keine klickbaren Links behalten.
        out[`--v${i + 1}`] = f > 0.05 ? "visible" : "hidden";
      }
      const s = shellAt(p);
      out["--shell-w"] = `${s.w.toFixed(2)}rem`;
      out["--shell-h"] = `${s.h.toFixed(2)}rem`;
      out["--shell-r"] = `${s.r.toFixed(1)}px`;
      return out;
    },
  });

  return (
    <section ref={ref} id="maschine" className="machine" aria-label="Leistungen">
      <div className="machine__pin">
        <header className="machine__intro">
          <h2>Was ich in einen Betrieb einbaue</h2>
          <p>Drei Bausteine, in dieser Reihenfolge sinnvoll.</p>
        </header>

        <ol className="machine__rail" aria-hidden="true">
          {stations.map((s, i) => (
            <li key={s.id} style={{ "--i": i } as React.CSSProperties}>
              <span className="machine__tick" />
              {s.name}
            </li>
          ))}
        </ol>

        <div className="machine__copy">
          {stations.map((s, i) => (
            <article
              key={s.id}
              className="station"
              style={
                {
                  "--f": `var(--f${i + 1})`,
                  "--v": `var(--v${i + 1}, visible)`,
                } as React.CSSProperties
              }
            >
              <p className="station__index">
                Baustein {i + 1} von {STATIONS} — {s.name}
              </p>
              <h3>{s.promise}</h3>
              <p className="station__text">{s.text}</p>
              <ul className="station__facts">
                {s.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link href={s.href} className="station__link">
                {s.id === "system" ? "Alle Leistungen ansehen" : `${s.name} im Detail`}
              </Link>
            </article>
          ))}
        </div>

        <div className="machine__stage" aria-hidden="true">
          <div className="machine__shell">
            <div className="machine__glass" />
            <StageAuftritt />
            <StageAnnahme />
            <StageAblaeufe />
            <StageSystem />
          </div>
          <div className="machine__shadow" />
        </div>

        <div className="machine__progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
