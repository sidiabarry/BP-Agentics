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
  { w: 40, h: 32, r: 16 }, // Zusammenspiel: Handy rechts, Bits links
];

const stations = [
  {
    id: "auftritt",
    name: "Websites",
    promise: "Die Website, die Ihre Arbeit zeigt.",
    text:
      "Leistungen, Referenzen und Einsatzgebiet verständlich machen. Vom kompakten Einseiter bis zum individuell gestalteten Auftritt.",
    facts: [
      "Einseiter, mehrseitiger Auftritt oder individuelle Gestaltung",
      "Auf Ihr Gewerk und Ihr Einsatzgebiet zugeschnitten",
      "Eine klare Anfragemöglichkeit gehört dazu",
    ],
    href: "/leistungen/auftritt",
  },
  {
    id: "annahme",
    name: "Nachrichten-Assistent",
    promise: "Der KI-Assistent für WhatsApp- und E-Mail-Anfragen.",
    text:
      "Er beantwortet Nachrichten per WhatsApp und E-Mail, fragt vereinbarte Angaben ab und bietet Termine aus dem angebundenen Kalender an.",
    facts: [
      "Antwortet per WhatsApp und E-Mail",
      "Erfasst die vereinbarten Angaben zum Vorhaben",
      "Bietet Termine nach den festgelegten Kalenderregeln an",
    ],
    href: "/leistungen/annahme",
  },
  {
    id: "ablaeufe",
    name: "Büroabläufe",
    promise: "Informationen einmal erfassen und weitergeben.",
    text:
      "Zum Beispiel Lieferscheine digital erfassen oder Auftragsinformationen weitergeben. Der erste Ablauf wird auf die vorhandenen Programme abgestimmt.",
    facts: [
      "Angaben mobil erfassen und dem Büro bereitstellen",
      "Zuständigkeit und Status an einem Ort",
      "Weitere Anschlüsse im Angebot ausgewiesen",
    ],
    href: "/leistungen/ablaeufe",
  },
  {
    id: "system",
    name: "Zusammenspiel",
    promise: "Einzeln nützlich. Zusammen ein System.",
    text:
      "Jeder Baustein ist einzeln beauftragbar. Im Gespräch klären wir, ob eine Website, ein Assistent oder ein einzelner automatisierter Ablauf den passenden Anfang macht.",
    facts: [
      "Schrittweise aufbaubar",
      "Festpreis für den vereinbarten Umfang",
      "Ein Ansprechpartner",
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
      out["--shell-wn"] = s.w.toFixed(2);
      out["--shell-hn"] = s.h.toFixed(2);
      out["--shell-r"] = `${s.r.toFixed(1)}px`;
      return out;
    },
  });

  return (
    <section ref={ref} id="maschine" className="machine" aria-label="Leistungen">
      <div className="machine__pin">
        <header className="machine__intro">
          <h2>Was BP Agentics für Ihren Betrieb einrichten kann</h2>
          <p>Drei Bausteine, einzeln beauftragbar.</p>
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
