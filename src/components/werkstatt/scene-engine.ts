import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { createRobot } from "./robot.js";
import { chatExamples, chatPhaseCaptions, stationOrder, webDemo, type StationId } from "./content";

/**
 * Werkstatt v6 — Three.js-Laufzeit.
 *
 * Was sich gegenüber v5 geändert hat und warum:
 *  - Bildausschnitt wird gerechnet, nicht von Hand gesetzt. Jede Ansicht kennt
 *    nur Blickrichtung und Objekt; der Abstand ergibt sich aus Seitenformat und
 *    der Fläche, die Panel bzw. Sheet frei lassen (`setFraming`). Dadurch sitzt
 *    das Objekt auf jedem Gerät in der sichtbaren Fläche und nicht unter dem Text.
 *  - Kamerawege laufen auf einem Bogen (quadratische Bézierkurve) statt gerade
 *    durch den Raum; Blickziel und Bildversatz laufen im selben Takt mit.
 *  - Die Stationen sind direkt antippbar (vergrößerte Trefferflächen), Wischen
 *    wechselt die Station, Tippen ins Leere führt zur Übersicht.
 *  - Gerendert wird nur, solange die Bühne sichtbar ist; auf schwächeren Geräten
 *    mit 30 fps, ohne Echtzeitschatten und ohne Video-Textur. Chat- und
 *    Monitorbild werden nur neu gezeichnet, wenn sich ihr Inhalt ändert.
 */

export type { StationId };
export type ViewId = StationId | "overview";

/** Fläche in px, die von UI verdeckt ist (Panel rechts, Sheet unten). */
export type Framing = { right: number; bottom: number };

export interface SceneOptions {
  modelUrl: string;
  /** Schwächeres Gerät / Touch: 30 fps, keine Schatten, kein Video. */
  lite: boolean;
  reduced: boolean;
}

export interface SceneCallbacks {
  onProgress?: (ratio: number) => void;
  onReady: () => void;
  onFallback: (message: string) => void;
  onViewChange: (view: ViewId) => void;
}

export interface WerkstattSceneController {
  goTo: (view: ViewId, opts?: { instant?: boolean }) => void;
  step: (dir: 1 | -1) => void;
  setFraming: (framing: Framing) => void;
  setVisible: (visible: boolean) => void;
  setReduced: (reduced: boolean) => void;
  setLabelElements: (
    elements: Partial<Record<StationId, HTMLElement>>,
    leaders?: Partial<Record<StationId, { line: SVGLineElement; dot: SVGCircleElement }>>,
  ) => void;
  dispose: () => void;
}

type V3 = [number, number, number];

/** Blickrichtungen (vom Ziel zur Kamera). Längen sind egal, der Abstand wird gerechnet. */
const DIRECTIONS: Record<ViewId, V3> = {
  overview: [0.2, 2.45, 11.75],
  web: [0.42, 0.75, 3.85],
  chat: [0.12, 0.9, 3.3],
  office: [0.7, 0.2, 3.3],
};

/**
 * Hochformat: Blick Schräg von vorn rechts (45°, 30° von oben). Frontal würden die
 * drei Stationen zu einem schmalen Band schrumpfen; schräg läuft die Reihe in die
 * Tiefe und alle drei Bildschirme bleiben lesbar. Das etwas weitere Sichtfeld hält
 * die Kamera nah genug, um im Raum zu bleiben.
 */
const PORTRAIT_OVERVIEW: V3 = [0.612, 0.5, 0.612];
const PORTRAIT_OVERVIEW_FOV = 58;

/** Wie viel der freien Fläche das Objekt füllen darf. */
const FILL: Record<ViewId, number> = { overview: 0.9, web: 0.94, chat: 0.92, office: 0.94 };
