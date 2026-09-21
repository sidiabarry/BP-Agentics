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
 * Hochformat: Blick schräg von vorn rechts (45°, 30° von oben). Frontal würden die
 * drei Stationen zu einem schmalen Band schrumpfen; schräg läuft die Reihe in die
 * Tiefe und alle drei Bildschirme bleiben lesbar. Das etwas weitere Sichtfeld hält
 * die Kamera nah genug, um im Raum zu bleiben.
 */
const PORTRAIT_OVERVIEW: V3 = [0.612, 0.5, 0.612];
const PORTRAIT_OVERVIEW_FOV = 58;

/** Wie viel der freien Fläche das Objekt füllen darf. */
const FILL: Record<ViewId, number> = { overview: 0.9, web: 0.94, chat: 0.92, office: 0.94 };

const FOCUS_LIGHT: Record<StationId, { pos: V3; color: string; peak: number }> = {
  web: { pos: [-3.05, 1.95, 1.7], color: "#cfe6ff", peak: 22 },
  chat: { pos: [0, 2.05, 2.1], color: "#e2f2f7", peak: 20 },
  office: { pos: [3.0, 1.95, 1.7], color: "#ffe6c4", peak: 20 },
};

const ROOM_TIMEOUT_MS = 20000;

const easeInOutCubic = (q: number) => (q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function createWerkstattScene(
  container: HTMLElement,
  callbacks: SceneCallbacks,
  options: SceneOptions,
): WerkstattSceneController | null {
  const { lite } = options;
  const BASE_FOV = lite ? 46 : 40;
  let reduced = options.reduced;
  let disposed = false;
  let visible = true;
  let current: ViewId = "overview";
  let rafId = 0;
  let webglFailed = false;
  let roomReady = false;
  let readyFired = false;
  let needsRender = true;
  let framing: Framing = { right: 0, bottom: 0 };

  const pixelRatio = () => Math.min(window.devicePixelRatio || 1, 2);
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: pixelRatio() < 2,
      alpha: false,
      powerPreference: lite ? "default" : "high-performance",
    });
  } catch {
    callbacks.onFallback("Die 3D-Ansicht wird auf diesem Gerät nicht unterstützt.");
    return null;
  }
  const size = () => ({ w: Math.max(1, container.clientWidth), h: Math.max(1, container.clientHeight) });
  renderer.setPixelRatio(pixelRatio());
  renderer.setSize(size().w, size().h, false);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.shadowMap.enabled = !lite;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.domElement.setAttribute("aria-hidden", "true");
  container.appendChild(renderer.domElement);

  const onContextLost = (e: Event) => {
    e.preventDefault();
    webglFailed = true;
    callbacks.onFallback("Die 3D-Ansicht wurde unterbrochen. Die Leistungen bleiben unten erreichbar.");
  };
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#0b1a27");
  scene.fog = new THREE.FogExp2("#0b1a27", 0.035);

  const camera = new THREE.PerspectiveCamera(BASE_FOV, size().w / size().h, 0.06, 80);

  const mat = (color: THREE.ColorRepresentation, roughness = 0.6, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const dark = mat("#14222b", 0.55, 0.55);
  const cream = mat("#b8b2a1", 0.62, 0.12);
  const black = mat("#071116", 0.34, 0.15);

  function meshAt(geo: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D, pos: V3 = [0, 0, 0]) {
    const o = new THREE.Mesh(geo, material);
    o.position.set(...pos);
    o.castShadow = !lite;
    o.receiveShadow = !lite;
    parent.add(o);
    return o;
  }
  function box(w: number, h: number, d: number, m: THREE.Material, p: V3, parent: THREE.Object3D) {
    return meshAt(new THREE.BoxGeometry(w, h, d), m, parent, p);
  }
  function rounded(w: number, h: number, d: number, r: number, m: THREE.Material, p: V3, parent: THREE.Object3D) {
    const s = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;
    r = Math.min(r, w / 2, h / 2);
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: Math.max(0.005, d - r * 0.3),
      bevelEnabled: true,
      bevelThickness: r * 0.15,
      bevelSize: r * 0.15,
      bevelSegments: lite ? 2 : 3,
      steps: 1,
      curveSegments: lite ? 5 : 8,
    });
    g.translate(0, 0, -d / 2);
    return meshAt(g, m, parent, p);
  }
  function cylinder(r1: number, r2: number, h: number, m: THREE.Material, p: V3, parent: THREE.Object3D) {
    return meshAt(new THREE.CylinderGeometry(r1, r2, h, lite ? 16 : 32), m, parent, p);
  }
  function point(color: THREE.ColorRepresentation, p: V3, intensity: number, dist = 16) {
    const l = new THREE.PointLight(color, intensity, dist, 2);
    l.position.set(...p);
    scene.add(l);
    return l;
  }

  scene.add(new THREE.HemisphereLight("#b8d5ec", "#70452a", lite ? 1.6 : 1.4));
  const key = new THREE.SpotLight("#f8ce9c", 125, 20, 0.85, 0.8, 1.7);
  key.position.set(-3, 6, 4);
  key.target.position.set(0, 0, -0.5);
  key.castShadow = !lite;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.00015;
  key.shadow.normalBias = 0.025;
  scene.add(key, key.target);
  point("#83bdef", [4.8, 3, -1], 65, 14);
  point("#e8b781", [-4, 2.8, 1], 28, 10);
  point("#dce9f1", [0, 3.2, 5], 35, 14);
  if (!lite) {
    point("#ffe0af", [0, 2, -1.35], 8, 4);
    point("#fac081", [0, -0.4, 2.1], 5, 6);
  }
  const focusLight = point("#ffffff", [0, 2, 2], 0, 9);
  const focusColor = new THREE.Color();

  let roomRoot: THREE.Object3D | null = null;
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(
    options.modelUrl,
    (gltf) => {
      if (disposed) return;
      const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      gltf.scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        m.castShadow = !lite;
        m.receiveShadow = !lite;
        for (const mm of Array.isArray(m.material) ? m.material : [m.material]) {
          const std = mm as THREE.MeshStandardMaterial;
          if (std?.map) std.map.anisotropy = maxAniso;
        }
      });
      roomRoot = gltf.scene;
      scene.add(gltf.scene);
      roomReady = true;
      callbacks.onProgress?.(1);
      needsRender = true;
    },
    (event) => {
      if (event.lengthComputable && event.total > 0) callbacks.onProgress?.(Math.min(0.98, event.loaded / event.total));
    },
    () => callbacks.onFallback("Das Studio konnte nicht geladen werden. Die Leistungen bleiben unten erreichbar."),
  );
  const roomTimeout = window.setTimeout(() => {
    if (!roomReady && !disposed) callbacks.onFallback("Das Studio lädt gerade zu langsam. Die Leistungen bleiben unten erreichbar.");
  }, ROOM_TIMEOUT_MS);

  const monitor = new THREE.Group();
  monitor.position.set(-3.05, 0.025, 0.3);
  monitor.rotation.y = 0.16;
  scene.add(monitor);
  rounded(1.48, 0.12, 0.85, 0.08, dark, [0, 0.08, 0], monitor);
  rounded(0.45, 0.38, 0.3, 0.08, cream, [0, 0.29, -0.04], monitor);
  rounded(2.14, 1.65, 0.85, 0.13, cream, [0, 1.19, 0], monitor);
  rounded(1.87, 1.34, 0.08, 0.14, dark, [-0.04, 1.24, 0.46], monitor);

  const screenCanvas = document.createElement("canvas");
  screenCanvas.width = 1024;
  screenCanvas.height = 720;
  const sc = screenCanvas.getContext("2d")!;
  const roofImage = new Image();
  roofImage.decoding = "async";
  const roofVideo: HTMLVideoElement | null = lite ? null : document.createElement("video");
  if (roofVideo) {
    roofVideo.muted = true;
    roofVideo.loop = true;
    roofVideo.playsInline = true;
    roofVideo.preload = "none";
  }
  const screenTex = new THREE.CanvasTexture(screenCanvas);
  screenTex.colorSpace = THREE.SRGBColorSpace;
  screenTex.generateMipmaps = false;
  screenTex.minFilter = THREE.LinearFilter;
  screenTex.magFilter = THREE.LinearFilter;
  const screenMesh = meshAt(
    new THREE.PlaneGeometry(1.7, 1.15),
    new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }),
    monitor,
    [-0.04, 1.25, 0.525],
  );
  screenMesh.castShadow = false;

  for (let i = 0; i < 5; i++) {
    const knob = cylinder(0.035, 0.035, 0.025, dark, [0.67 - i * 0.12, 0.48, 0.45], monitor);
    knob.rotation.x = Math.PI / 2;
  }
  meshAt(new THREE.SphereGeometry(0.023, 12, 8), new THREE.MeshBasicMaterial({ color: "#9dd5b0" }), monitor, [0.82, 0.48, 0.48]);
  for (let i = 0; i < 11; i++) box(0.028, 0.52, 0.03, dark, [0.92, 1.05, 0.47], monitor);

  const keyboard = new THREE.Group();
  monitor.add(keyboard);
  keyboard.position.set(0.05, 0.09, 1.04);
  keyboard.rotation.x = -0.08;
  rounded(1.84, 0.12, 0.65, 0.06, cream, [0, 0, 0], keyboard);
  const keys = new THREE.InstancedMesh(new THREE.BoxGeometry(0.113, 0.055, 0.104), mat("#d2c6ad", 0.73), 60);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 60; i++) {
    dummy.position.set(((i % 15) - 7) * 0.115, 0.075, (Math.floor(i / 15) - 1.5) * 0.12);
    dummy.updateMatrix();
    keys.setMatrixAt(i, dummy.matrix);
  }
  keys.castShadow = !lite;
  keyboard.add(keys);
  meshAt(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(
        (
          [
            [-0.1, 0.1, -2.5],
            [-0.5, 0.045, -3.2],
            [-2.1, 0.04, -2.6],
            [-2.45, 0.03, 0.4],
          ] as V3[]
        ).map((p) => new THREE.Vector3(...p)),
      ),
      lite ? 24 : 40,
      0.022,
      lite ? 5 : 8,
      false,
    ),
    black,
    scene,
  );

  function rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, col: string) {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
  }
  function txt(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, px: number, color = "#172d37", weight = "400") {
    ctx.fillStyle = color;
    ctx.font = `${weight} ${px}px "Source Sans 3", sans-serif`;
    ctx.fillText(text, x, y);
  }

  const videoRunning = () => Boolean(roofVideo && !reduced && roofVideo.readyState >= 2 && !roofVideo.paused);

  function drawMonitor() {
    const running = videoRunning();
    sc.fillStyle = "#102633";
    sc.fillRect(0, 0, 1024, 720);
    const media: CanvasImageSource | null = running
      ? roofVideo
      : roofImage.complete && roofImage.naturalWidth
        ? roofImage
        : null;
    if (media) {
      const mw = running ? roofVideo!.videoWidth : roofImage.naturalWidth;
      const mh = running ? roofVideo!.videoHeight : roofImage.naturalHeight;
      const scale = Math.min(1024 / mw, 570 / mh);
      sc.drawImage(media, (1024 - mw * scale) / 2, 48 + (570 - mh * scale) / 2, mw * scale, mh * scale);
    }
    sc.fillStyle = "#102633";
    sc.fillRect(0, 0, 1024, 48);
    ["#cba66e", "#b7cad4", "#9fcdb7"].forEach((c, i) => {
      sc.beginPath();
      sc.arc(24 + i * 21, 24, 5, 0, 7);
      sc.fillStyle = c;
      sc.fill();
    });
    txt(sc, webDemo.domain, 110, 32, 23, "#b7cad4", "500");
    sc.fillStyle = "#102633";
    sc.fillRect(0, 618, 1024, 102);
    txt(sc, webDemo.caption, 32, 659, 41, "#f3efe6", "600");
    txt(sc, webDemo.note, 32, 697, 30, "#b7cad4");
    screenTex.needsUpdate = true;
    needsRender = true;
  }
  roofImage.addEventListener("load", drawMonitor);
  roofImage.src = "/demos/dach-poster.jpg";

  const tablet = new THREE.Group();
  tablet.position.set(0, 1.08, 1);
  tablet.rotation.set(-0.27, 0, 0);
  scene.add(tablet);
  rounded(1.42, 1.98, 0.1, 0.12, mat("#253c49", 0.27, 0.75), [0, 0, 0], tablet);
  rounded(1.32, 1.87, 0.025, 0.1, black, [0, 0, 0.065], tablet);
  const chatCanvas = document.createElement("canvas");
  chatCanvas.width = 990;
  chatCanvas.height = 1350;
  const cc = chatCanvas.getContext("2d")!;
  cc.scale(1.5, 1.5);
  const chatTex = new THREE.CanvasTexture(chatCanvas);
  chatTex.colorSpace = THREE.SRGBColorSpace;
  chatTex.generateMipmaps = false;
  chatTex.minFilter = THREE.LinearFilter;
  chatTex.magFilter = THREE.LinearFilter;
  chatTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const chatMesh = meshAt(
    new THREE.PlaneGeometry(1.23, 1.76),
    new THREE.MeshBasicMaterial({ map: chatTex, toneMapped: false }),
    tablet,
    [0, 0, 0.092],
  );
  chatMesh.castShadow = false;
  meshAt(new THREE.SphereGeometry(0.013, 10, 6), dark, tablet, [0, 0.94, 0.072]);

  const bigType = lite;
  function bubble(lines: string[], y: number, outgoing = false) {
    const px = bigType ? 43 : 32;
    const lh = bigType ? 51 : 42;
    let list = lines;
    if (bigType) {
      cc.font = `400 ${px}px "Source Sans 3", sans-serif`;
      list = lines.flatMap((line) => {
        const out: string[] = [];
        let row = "";
        for (const word of line.split(" ")) {
          const candidate = row ? `${row} ${word}` : word;
          if (row && cc.measureText(candidate).width > 516) {
            out.push(row);
            row = word;
          } else row = candidate;
        }
        if (row) out.push(row);
        return out;
      });
    }
    const x = outgoing ? 68 : 28;
    const h = list.length * lh + 38;
    rect(cc, x, y, 564, h, 22, outgoing ? "#d0e3e5" : "#ffffff");
    list.forEach((line, i) => txt(cc, line, x + 24, y + 50 + i * lh, px, "#102633"));
    return y + h;
  }

  let chatStarted = 0;
  let chatKey = "";
  function chatState(t: number) {
    const elapsed = (((t - chatStarted) % 20) + 20) % 20;
    const phase = reduced ? 3 : elapsed < 4 ? 0 : elapsed < 8 ? 1 : elapsed < 12 ? 2 : 3;
    const loop = reduced ? 0 : Math.floor((t - chatStarted) / 20);
    const index = ((loop % chatExamples.length) + chatExamples.length) % chatExamples.length;
    return { phase, index };
  }
  function drawChat(phase: number, index: number) {
    const ex = chatExamples[index];
    cc.fillStyle = "#eef2ef";
    cc.fillRect(0, 0, 660, 900);
    rect(cc, 0, 0, 660, 160, 0, "#102633");
    rect(cc, 28, 39, 70, 70, 24, "#cba66e");
    txt(cc, ex.initial, 49, 87, 37, "#102633", "600");
    txt(cc, ex.business, 118, 72, 32, "#f3efe6", "600");
    txt(cc, "Nachrichten-Assistent", 118, 112, 27, "#b7cad4");
    txt(cc, chatPhaseCaptions[phase], 30, 212, 31, "#274c5c", "600");
    if (phase === 0) {
      bubble(ex.question, bubble(ex.incoming, 249) + 24, true);
    } else if (phase === 1) {
      const last = bubble(ex.answer, bubble(ex.question, 249, true) + 24);
      txt(cc, ex.captured, 32, last + 64, bigType ? 36 : 29, "#315d52", "600");
    } else if (phase === 2) {
      bubble(ex.accept, bubble(ex.offer, 249, true) + 24);
    } else {
      bubble(ex.accept, 249);
      rect(cc, 28, 383, 604, 303, 24, "#102633");
      rect(cc, 54, 412, 85, 88, 15, "#9fcdb7");
      txt(cc, ex.appointment.day, 70, 451, 30, "#102633", "700");
      txt(cc, ex.appointment.time, 63, 484, 26, "#102633", "600");
      txt(cc, ex.appointment.title, 158, 451, bigType ? 42 : 36, "#f3efe6", "600");
      txt(cc, ex.appointment.subtitle, 158, 492, 30, "#b7cad4");
      cc.strokeStyle = "#9fcdb7";
      cc.lineWidth = 5;
      cc.lineCap = "round";
      cc.beginPath();
      cc.moveTo(58, 554);
      cc.lineTo(70, 566);
      cc.lineTo(93, 542);
      cc.stroke();
      txt(cc, "Im Kalender eingetragen", 115, 565, bigType ? 38 : 32, "#f3efe6", "600");
      txt(cc, ex.appointment.note, 54, 631, bigType ? 35 : 29, "#b7cad4");
    }
    for (let i = 0; i < 4; i++) rect(cc, 28 + i * 155, 752, 139, 5, 2, i <= phase ? "#3c756d" : "#cfdbd8");
    txt(cc, `Beispiel: ${ex.sector}`, 28, 813, 25, "#456573", "600");
    txt(cc, "Keine echte Buchung", 28, 849, 27, "#456573");
    chatTex.needsUpdate = true;
    needsRender = true;
  }

  const robot = createRobot(THREE, scene);
  robot.group.position.set(3, 0.025, 0.25);
  robot.group.rotation.y = -0.13;
  robot.group.scale.setScalar(1.12);
  if (lite) robot.group.traverse((o) => ((o as THREE.Mesh).castShadow = false));
  point("#f3e4cb", [3.4, 2, 1.7], 4, 3);

  let seed = 9271;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const dustCount = lite ? 90 : 180;
  const dustA = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustA.length; i += 3) {
    dustA[i] = (rand() - 0.5) * 12;
    dustA[i + 1] = rand() * 5;
    dustA[i + 2] = (rand() - 0.5) * 12;
  }
  const dustG = new THREE.BufferGeometry();
  dustG.setAttribute("position", new THREE.BufferAttribute(dustA, 3));
  const dust = new THREE.Points(
    dustG,
    new THREE.PointsMaterial({ color: "#b8ccca", size: 0.014, transparent: true, opacity: 0.28, depthWrite: false }),
  );
  scene.add(dust);

  const stationObjects: Record<StationId, THREE.Object3D> = { web: monitor, chat: tablet, office: robot.group };
  robot.animate(0, true);
  scene.updateMatrixWorld(true);
  const focusBoxes = {} as Record<StationId, THREE.Box3>;
  const hitBoxes = {} as Record<StationId, THREE.Box3>;
  const labelAnchors = {} as Record<StationId, THREE.Vector3>;
  for (const id of stationOrder) {
    const b = new THREE.Box3().setFromObject(stationObjects[id]);
    focusBoxes[id] = b;
    hitBoxes[id] = b.clone().expandByScalar(0.22);
    labelAnchors[id] = new THREE.Vector3((b.min.x + b.max.x) / 2, b.max.y + 0.18, (b.min.z + b.max.z) / 2);
  }
  const overviewBox = new THREE.Box3();
  stationOrder.forEach((id) => overviewBox.union(focusBoxes[id]));

  const fitCam = camera.clone();
  const corner = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  function isPortrait() {
    const { w, h } = size();
    return w / h < 0.9;
  }

  function solvePose(view: ViewId) {
    const { w, h } = size();
    const b = view === "overview" ? overviewBox : focusBoxes[view];
    const target = b.getCenter(new THREE.Vector3());
    const portraitOverview = view === "overview" && isPortrait();
    const dir = new THREE.Vector3(...(portraitOverview ? PORTRAIT_OVERVIEW : DIRECTIONS[view])).normalize();
    const fov = portraitOverview ? PORTRAIT_OVERVIEW_FOV : BASE_FOV;
    const f = view === "overview" ? { right: 0, bottom: framing.bottom } : framing;
    const freeW = Math.max(140, w - f.right);
    const freeH = Math.max(140, h - f.bottom);
    const fill = FILL[view];

    fitCam.fov = fov;
    fitCam.aspect = w / h;
    fitCam.clearViewOffset();
    fitCam.updateProjectionMatrix();

    const fits = (d: number) => {
      fitCam.position.copy(target).addScaledVector(dir, d);
      fitCam.lookAt(target);
      fitCam.updateMatrixWorld(true);
      let maxX = 0;
      let maxY = 0;
      for (let i = 0; i < 8; i++) {
        corner.set(i & 1 ? b.max.x : b.min.x, i & 2 ? b.max.y : b.min.y, i & 4 ? b.max.z : b.min.z);
        tmp.copy(corner).applyMatrix4(fitCam.matrixWorldInverse);
        if (tmp.z > -0.05) return false;
        corner.project(fitCam);
        maxX = Math.max(maxX, Math.abs(corner.x));
        maxY = Math.max(maxY, Math.abs(corner.y));
      }
      return maxX * (w / 2) <= (freeW / 2) * fill && maxY * (h / 2) <= (freeH / 2) * fill;
    };
    let lo = 0.5;
    let hi = 60;
    for (let i = 0; i < 22; i++) {
      const mid = (lo + hi) / 2;
      if (fits(mid)) hi = mid;
      else lo = mid;
    }
    return {
      pos: target.clone().addScaledVector(dir, hi),
      target,
      offset: new THREE.Vector2(f.right / 2, f.bottom / 2),
      fov,
    };
  }

  const start = solvePose("overview");
  const basePos = start.pos.clone();
  const baseTarget = start.target.clone();
  const baseOffset = start.offset.clone();
  let baseFov = start.fov;
  const drift = new THREE.Vector2();
  const pointer = new THREE.Vector2();

  type Transition = {
    t0: number;
    dur: number;
    p0: THREE.Vector3;
    p1: THREE.Vector3;
    ctrl: THREE.Vector3;
    t0v: THREE.Vector3;
    t1v: THREE.Vector3;
    o0: THREE.Vector2;
    o1: THREE.Vector2;
    f0: number;
    f1: number;
  };
  let transition: Transition | null = null;

  function applyOffset(o: THREE.Vector2) {
    const { w, h } = size();
    camera.setViewOffset(w, h, o.x, o.y, w, h);
  }

  function startTransition(view: ViewId, instant: boolean) {
    const dest = solvePose(view);
    if (instant || reduced) {
      transition = null;
      basePos.copy(dest.pos);
      baseTarget.copy(dest.target);
      baseOffset.copy(dest.offset);
      baseFov = dest.fov;
      needsRender = true;
      return;
    }
    const chord = basePos.distanceTo(dest.pos);
    const mid = basePos.clone().add(dest.pos).multiplyScalar(0.5);
    const outward = basePos
      .clone()
      .sub(baseTarget)
      .normalize()
      .add(dest.pos.clone().sub(dest.target).normalize())
      .normalize();
    const ctrl = mid.addScaledVector(outward, chord * 0.32).add(new THREE.Vector3(0, chord * 0.12, 0));
    transition = {
      t0: performance.now(),
      dur: clamp(760 + chord * 60, 820, 1500),
      p0: basePos.clone(),
      p1: dest.pos,
      ctrl,
      t0v: baseTarget.clone(),
      t1v: dest.target,
      o0: baseOffset.clone(),
      o1: dest.offset,
      f0: baseFov,
      f1: dest.fov,
    };
  }

  function syncVideo() {
    if (!roofVideo) return;
    const want = visible && current === "web" && !reduced;
    if (want) {
      if (!roofVideo.getAttribute("src")) roofVideo.src = "/demos/dach-loop.mp4";
      roofVideo.play().catch(() => {});
    } else if (!roofVideo.paused) {
      roofVideo.pause();
      drawMonitor();
    }
  }

  function goTo(view: ViewId, opts?: { instant?: boolean }) {
    if (disposed) return;
    const changed = view !== current;
    current = view;
    if (view === "chat" && changed) {
      chatStarted = performance.now() / 1000;
      chatKey = "";
    }
    startTransition(view, Boolean(opts?.instant));
    syncVideo();
    if (changed) callbacks.onViewChange(view);
  }

  function step(dir: 1 | -1) {
    if (current === "overview") {
      goTo(dir === 1 ? stationOrder[0] : stationOrder[stationOrder.length - 1]);
      return;
    }
    const i = stationOrder.indexOf(current) + dir;
    if (i >= 0 && i < stationOrder.length) goTo(stationOrder[i]);
  }

  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const hitPoint = new THREE.Vector3();
  let hovered: StationId | null = null;
  const el = renderer.domElement;

  function pick(clientX: number, clientY: number): StationId | null {
    const r = el.getBoundingClientRect();
    ndc.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    camera.updateMatrixWorld();
    raycaster.setFromCamera(ndc, camera);
    let best: StationId | null = null;
    let bestDist = Infinity;
    for (const id of stationOrder) {
      if (raycaster.ray.intersectBox(hitBoxes[id], hitPoint)) {
        const d = hitPoint.distanceTo(raycaster.ray.origin);
        if (d < bestDist) {
          bestDist = d;
          best = id;
        }
      }
    }
    return best;
  }

  let down: { x: number; y: number; t: number; id: number } | null = null;
  const onDown = (e: PointerEvent) => {
    down = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId };
  };
  const onCancel = () => {
    down = null;
  };
  const onUp = (e: PointerEvent) => {
    if (!down || down.id !== e.pointerId) return;
    const dx = e.clientX - down.x;
    const dy = e.clientY - down.y;
    const dt = performance.now() - down.t;
    down = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4 && dt < 1600) {
      if (current !== "overview") step(dx < 0 ? 1 : -1);
      return;
    }
    if (Math.hypot(dx, dy) > 10 || dt > 700) return;
    const hit = pick(e.clientX, e.clientY);
    if (hit) goTo(hit);
    else if (current !== "overview") goTo("overview");
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    pointer.set((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
    const hit = pick(e.clientX, e.clientY);
    if (hit !== hovered) {
      hovered = hit;
      el.style.cursor = hit && hit !== current ? "pointer" : current !== "overview" ? "zoom-out" : "default";
    }
  };
  const onLeave = () => {
    pointer.set(0, 0);
    hovered = null;
  };
  el.addEventListener("pointerdown", onDown);
  el.addEventListener("pointerup", onUp);
  el.addEventListener("pointercancel", onCancel);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);

  let labelEls: Partial<Record<StationId, HTMLElement>> = {};
  let leaderEls: Partial<Record<StationId, { line: SVGLineElement; dot: SVGCircleElement }>> = {};
  const proj = new THREE.Vector3();
  function placeLabels() {
    if (current !== "overview" && !transition) return;
    const { w, h } = size();
    const lift = w < 560 ? 34 : 14;
    const items = stationOrder
      .map((id) => {
        const node = labelEls[id];
        if (!node) return null;
        proj.copy(labelAnchors[id]).project(camera);
        const ax = (proj.x * 0.5 + 0.5) * w;
        const ay = (-proj.y * 0.5 + 0.5) * h;
        return { id, node, ax, ay, x: ax, y: ay - lift, half: node.offsetWidth / 2 };
      })
      .filter((v): v is NonNullable<typeof v> => v !== null)
      .sort((a, b) => a.x - b.x);
    const top = 64;
    const bottom = h - Math.max(72, framing.bottom + 16);
    const boxes = items.map((it) => ({
      ...it,
      x: clamp(it.x, it.half + 10, w - it.half - 10),
      y: clamp(it.y, top + it.node.offsetHeight, bottom),
      hh: it.node.offsetHeight,
    }));
    boxes.sort((a, b) => b.y - a.y);
    for (let pass = 0; pass < 3; pass++) {
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const low = boxes[i];
          const high = boxes[j];
          const overlapX = Math.abs(low.x - high.x) < low.half + high.half + 6;
          const overlapY = Math.abs(low.y - high.y) < Math.max(low.hh, high.hh) + 6;
          if (!overlapX || !overlapY) continue;
          const up = low.y - low.hh - 6;
          if (up >= top + high.hh) high.y = up;
          else low.y = Math.min(bottom, high.y + high.hh + 6);
        }
      }
    }
    for (const it of boxes) {
      const leader = leaderEls[it.id];
      if (leader) {
        leader.line.setAttribute("x1", String(Math.round(it.x)));
        leader.line.setAttribute("y1", String(Math.round(it.y)));
        leader.line.setAttribute("x2", String(Math.round(it.ax)));
        leader.line.setAttribute("y2", String(Math.round(it.ay)));
        leader.dot.setAttribute("cx", String(Math.round(it.ax)));
        leader.dot.setAttribute("cy", String(Math.round(it.ay)));
      }
      it.node.style.transform = `translate3d(${Math.round(it.x - it.half)}px, ${Math.round(it.y)}px, 0) translateY(-100%)`;
    }
  }

  function resize() {
    const { w, h } = size();
    renderer.setPixelRatio(pixelRatio());
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    startTransition(current, true);
  }
  const ro = new ResizeObserver(() => resize());
  ro.observe(container);

  const minInterval = lite ? 1000 / 30 : 0;
  let last = 0;
  let lastVideoDraw = 0;

  function frame(ms: number) {
    if (disposed) return;
    rafId = requestAnimationFrame(frame);
    if (!visible || document.hidden || webglFailed) return;
    if (minInterval && ms - last < minInterval - 2) return;
    last = ms;
    const t = ms / 1000;
    let moving = false;

    if (transition) {
      const q = clamp((ms - transition.t0) / transition.dur, 0, 1);
      const k = easeInOutCubic(q);
      const a = (1 - k) * (1 - k);
      const b2 = 2 * (1 - k) * k;
      const c = k * k;
      basePos.set(
        a * transition.p0.x + b2 * transition.ctrl.x + c * transition.p1.x,
        a * transition.p0.y + b2 * transition.ctrl.y + c * transition.p1.y,
        a * transition.p0.z + b2 * transition.ctrl.z + c * transition.p1.z,
      );
      baseTarget.lerpVectors(transition.t0v, transition.t1v, k);
      baseOffset.lerpVectors(transition.o0, transition.o1, k);
      baseFov = transition.f0 + (transition.f1 - transition.f0) * k;
      moving = true;
      if (q >= 1) transition = null;
    }

    const reach = current === "overview" ? 0.5 : 0.22;
    const wantX = reduced || lite ? 0 : pointer.x * 0.8 * reach;
    const wantY = reduced || lite ? 0 : -pointer.y * 0.4 * reach;
    const ddx = wantX - drift.x;
    const ddy = wantY - drift.y;
    if (Math.abs(ddx) > 1e-4 || Math.abs(ddy) > 1e-4) {
      drift.x += ddx * 0.06;
      drift.y += ddy * 0.06;
      moving = true;
    }
    camera.position.set(basePos.x + drift.x, basePos.y + drift.y, basePos.z);
    camera.lookAt(baseTarget);
    camera.fov = baseFov;
    applyOffset(baseOffset);

    const active = current === "overview" ? null : FOCUS_LIGHT[current];
    const wantI = active ? active.peak : 0;
    if (active) {
      focusLight.position.lerp(tmp.set(...active.pos), 0.12);
      focusLight.color.lerp(focusColor.set(active.color), 0.12);
    }
    if (Math.abs(wantI - focusLight.intensity) > 0.05) {
      focusLight.intensity += (wantI - focusLight.intensity) * 0.08;
      moving = true;
    }

    const { phase, index } = chatState(t);
    const chatNow = `${phase}-${index}`;
    if (chatNow !== chatKey) {
      chatKey = chatNow;
      drawChat(phase, index);
    }
    if (videoRunning() && ms - lastVideoDraw > 66) {
      lastVideoDraw = ms;
      drawMonitor();
    }

    if (!reduced) {
      robot.animate(t, false);
      dust.rotation.y = Math.sin(t * 0.045) * 0.025;
      moving = true;
    }

    if (moving || needsRender) {
      renderer.render(scene, camera);
      placeLabels();
      needsRender = false;
      if (roomReady && !readyFired) {
        readyFired = true;
        callbacks.onReady();
      }
    }
  }
  rafId = requestAnimationFrame(frame);

  document.fonts?.ready
    ?.then(() => {
      if (disposed) return;
      drawMonitor();
      chatKey = "";
    })
    .catch(() => {});
  drawMonitor();

  const onVisibility = () => {
    if (!document.hidden) needsRender = true;
  };
  document.addEventListener("visibilitychange", onVisibility);

  return {
    goTo,
    step,
    setFraming(next) {
      if (Math.abs(next.right - framing.right) < 1 && Math.abs(next.bottom - framing.bottom) < 1) return;
      framing = next;
      if (transition && !reduced) {
        const dest = solvePose(current);
        const chord = transition.p0.distanceTo(dest.pos);
        const outward = transition.p0
          .clone()
          .sub(transition.t0v)
          .normalize()
          .add(dest.pos.clone().sub(dest.target).normalize())
          .normalize();
        transition.p1 = dest.pos;
        transition.t1v = dest.target;
        transition.o1 = dest.offset;
        transition.f1 = dest.fov;
        transition.ctrl = transition.p0
          .clone()
          .add(dest.pos)
          .multiplyScalar(0.5)
          .addScaledVector(outward, chord * 0.32)
          .add(new THREE.Vector3(0, chord * 0.12, 0));
      } else {
        startTransition(current, false);
      }
    },
    setVisible(next) {
      visible = next;
      needsRender = true;
      syncVideo();
    },
    setReduced(next) {
      reduced = next;
      if (reduced) transition = null;
      chatKey = "";
      startTransition(current, true);
      syncVideo();
    },
    setLabelElements(elements, leaders) {
      labelEls = elements;
      leaderEls = leaders ?? {};
      needsRender = true;
    },
    dispose() {
      disposed = true;
      window.clearTimeout(roomTimeout);
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onCancel);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("webglcontextlost", onContextLost);
      roofImage.removeEventListener("load", drawMonitor);
      if (roofVideo) {
        roofVideo.pause();
        roofVideo.removeAttribute("src");
        roofVideo.load();
      }
      if (roomRoot) scene.remove(roomRoot);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        m.geometry.dispose();
        for (const mm of Array.isArray(m.material) ? m.material : [m.material]) {
          (mm as THREE.MeshStandardMaterial)?.map?.dispose();
          mm?.dispose();
        }
      });
      screenTex.dispose();
      chatTex.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (el.parentElement === container) container.removeChild(el);
    },
  };
}
