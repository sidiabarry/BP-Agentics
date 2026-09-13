import * as THREE from "three";
import { werkstattCopy } from "@/lib/journey";
import { createRobot } from "./robot.js";
import { chatPhaseCaptions, chatExamples, webDemo } from "./content";
import { loadDecorAssets } from "./decor";

/**
 * Die Werkstatt-Szene — portiert aus der Three.js-Vorlage, unverändert in
 * Geometrie/Materialien/Kamera-Choreografie, aber an die React-Integration
 * angepasst:
 *  - lokale Asset-Pfade statt externer bpagentics.com-URLs (keine Base64-Inlining-
 *    Tricks mehr nötig — Next.js liefert /demos/* und robot.js direkt aus).
 *  - keine eigene DOM-Erzeugung für Topbar/Detail/Nav/Intro — das ist React.
 *    Die Engine kennt nur: den WebGL-Container, die drei Hotspot-Elemente (zum
 *    Positionieren) und die Callback-API unten.
 *  - kein eigener `#scrollport`-Scroll-Listener (siehe Plan §0) — der
 *    Scroll-Fortschritt kommt von außen über `setIntroProgress(p)`, gespeist
 *    von `useScrollScene` in werkstatt-scene.tsx.
 *  - eine eigene, dauerhafte requestAnimationFrame-Schleife (unabhängig vom
 *    Scroll-Zustand), weil Roboter/Staub/Video weiterlaufen müssen, auch wenn
 *    nicht gescrollt wird.
 */

export type StationId = "web" | "chat" | "office";
export type ViewId = StationId | "overview";

export interface SceneCallbacks {
  /** Erststart erfolgreich (WebGL da, erster Frame gerendert). */
  onReady: () => void;
  /** WebGL fehlt oder der Kontext ging verloren — UI soll auf Fallback-Links umschalten. */
  onFallback: (message: string) => void;
  /** Aktuelle Station hat sich geändert (Klick auf Hotspot/Nav/Objekt oder "Zur Übersicht"). */
  onStationChange: (station: ViewId) => void;
}

export interface WerkstattSceneController {
  goTo: (id: ViewId) => void;
  /** 0..1 Scroll-Fortschritt des Intros — treibt den Kamera-„Näherkommen"-Effekt vor der Aufdeckung. */
  setIntroProgress: (p: number) => void;
  /** OS-Einstellung ODER manueller Schalter, bereits zusammengeführt. */
  setReduced: (reduced: boolean) => void;
  /** Einmalig nach dem Mount aufrufen, sobald die drei Hotspot-Buttons im DOM existieren. */
  setHotspotElements: (elements: Partial<Record<StationId, HTMLElement>>) => void;
  dispose: () => void;
}

type Vec3Tuple = [number, number, number];

const POSES: Record<ViewId, { p: Vec3Tuple; t: Vec3Tuple }> = {
  // Näher und tiefer als der Entwurf: die drei Stationen füllen das Bild,
  // statt in einer dunklen Tischfläche zu schwimmen.
  overview: { p: [0.3, 4.35, 10.6], t: [0, 1.1, -0.9] },
  web: { p: [-0.0, 1.75, 1.85], t: [-0.52, 1.05, -2.15] },
  chat: { p: [0.25, 2.55, 5.05], t: [-0.25, 0.8, 2.38] },
  office: { p: [2.25, 0.94, 2.8], t: [1.52, 0.92, -0.15] },
};

const MOBILE_POSES: Partial<Record<ViewId, { p: Vec3Tuple; t: Vec3Tuple }>> = {
  overview: { p: [0.15, 5.4, 11.4], t: [0, 1.05, -0.7] },
  office: { p: [2.6, 1.65, 5.2], t: [1.03, 0.6, -0.05] },
  web: { p: [-0.8, 2.15, 4.8], t: [-1, 0.55, -2.25] },
  chat: { p: [-0.65, 3.6, 7.7], t: [-0.72, 0.3, 2.45] },
};

/** Zusätzliches Licht je Station — hebt beim Zoomen genau das hervor, worum es geht. */
const EMPHASIS: Record<StationId, { pos: Vec3Tuple; color: string; peak: number }> = {
  web: { pos: [-1.0, 2.5, -0.7], color: "#cfe6ff", peak: 26 },
  chat: { pos: [-0.7, 2.1, 3.5], color: "#e2f2f7", peak: 22 },
  office: { pos: [1.5, 2.1, 1.2], color: "#ffe6c4", peak: 24 },
};

const STATION_IDS: StationId[] = ["web", "chat", "office"];

const READY_TIMEOUT_MS = 12000;

export function createWerkstattScene(
  container: HTMLElement,
  callbacks: SceneCallbacks,
): WerkstattSceneController | null {
  let disposed = false;
  let reduced = false;
  let introProgress = 1;
  let current: ViewId = "overview";
  let rafId = 0;
  let webglFailed = false;

  // ---------------------------------------------------------------------
  // Grundgerüst
  // ---------------------------------------------------------------------
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#0b1822");
  scene.fog = new THREE.FogExp2("#0b1822", 0.035);

  const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.06, 70);
  const look = new THREE.Vector3(0, 0.55, -0.5);

  let renderer: THREE.WebGLRenderer;
  try {
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) {
      callbacks.onFallback(werkstattCopy.fallback);
      return null;
    }
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    if (!renderer.getContext()) {
      renderer.dispose();
      callbacks.onFallback(werkstattCopy.fallback);
      return null;
    }
  } catch {
    callbacks.onFallback(werkstattCopy.fallback);
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.appendChild(renderer.domElement);

  renderer.domElement.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    webglFailed = true;
    callbacks.onFallback("Die 3D-Ansicht wurde unterbrochen. Ihre Leistungen bleiben erreichbar.");
  });

  // ---------------------------------------------------------------------
  // Kleine Bau-Helfer (identisch zur Vorlage)
  // ---------------------------------------------------------------------
  function mat(color: THREE.ColorRepresentation, roughness = 0.6, metalness = 0.0) {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness });
  }
  const brass = mat("#b89462", 0.34, 0.72);
  const dark = mat("#14222b", 0.55, 0.55);
  const cream = mat("#b8b2a1", 0.62, 0.12);
  const black = mat("#071116", 0.34, 0.15);

  function meshAt(geo: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D = scene, pos: Vec3Tuple = [0, 0, 0]) {
    const o = new THREE.Mesh(geo, material);
    o.position.set(...pos);
    o.castShadow = true;
    o.receiveShadow = true;
    parent.add(o);
    return o;
  }
  function box(w: number, h: number, d: number, m: THREE.Material, p: Vec3Tuple = [0, 0, 0], parent: THREE.Object3D = scene) {
    return meshAt(new THREE.BoxGeometry(w, h, d), m, parent, p);
  }
  function round(w: number, h: number, d: number, r: number, m: THREE.Material, p: Vec3Tuple = [0, 0, 0], parent: THREE.Object3D = scene) {
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
      bevelSegments: 3,
      steps: 1,
      curveSegments: 8,
    });
    g.translate(0, 0, -d / 2);
    return meshAt(g, m, parent, p);
  }
  function cylinder(r1: number, r2: number, h: number, m: THREE.Material, p: Vec3Tuple, parent: THREE.Object3D = scene) {
    return meshAt(new THREE.CylinderGeometry(r1, r2, h, 32), m, parent, p);
  }
  function tube(points: Vec3Tuple[], r: number, m: THREE.Material, parent: THREE.Object3D = scene) {
    return meshAt(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), 40, r, 8, false),
      m,
      parent,
    );
  }
  function glow(color: THREE.ColorRepresentation) {
    return new THREE.MeshBasicMaterial({ color });
  }
  function point(color: THREE.ColorRepresentation, p: Vec3Tuple, intensity: number, dist = 16) {
    const l = new THREE.PointLight(color, intensity, dist, 2);
    l.position.set(...p);
    scene.add(l);
    return l;
  }

  // ---------------------------------------------------------------------
  // Licht
  // ---------------------------------------------------------------------
  scene.add(new THREE.HemisphereLight("#b8d5ec", "#70452a", 1.4));
  const key = new THREE.SpotLight("#f8ce9c", 125, 20, 0.85, 0.8, 1.7);
  key.position.set(-3, 6, 4);
  key.target.position.set(0, 0, -0.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.00015;
  key.shadow.normalBias = 0.025;
  scene.add(key, key.target);
  point("#63b4f7", [3.5, 3, -3.5], 95, 18);
  point("#ee9951", [-3.5, 2, -1], 40, 13);
  point("#baddf3", [0, 3, 5], 22, 12);

  // Streiflicht von hinten: trennt Monitor, Tablet und Roboter von der dunklen Rückwand.
  const rim = new THREE.DirectionalLight("#9fd2ff", 0.75);
  rim.position.set(2.6, 3.4, -4.2);
  rim.target.position.set(0, 0.6, 0.2);
  scene.add(rim, rim.target);

  // Je Station ein Licht, das nur bei geöffneter Station hochgefahren wird.
  const emphasisLights = Object.fromEntries(
    (Object.keys(EMPHASIS) as StationId[]).map((id) => [id, point(EMPHASIS[id].color, EMPHASIS[id].pos, 0, 9)]),
  ) as Record<StationId, THREE.PointLight>;

  // ---------------------------------------------------------------------
  // Holzmaserung (prozedurale Canvas-Textur) + Werkbank
  // ---------------------------------------------------------------------
  const woodCanvas = document.createElement("canvas");
  woodCanvas.width = 256;
  woodCanvas.height = 1024;
  const wc = woodCanvas.getContext("2d")!;
  wc.fillStyle = "#694c34";
  wc.fillRect(0, 0, 256, 1024);
  let seed = 9271;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < 1800; i++) {
    const x = rand() * 256;
    wc.strokeStyle = `rgba(${rand() > 0.5 ? "23,12,3" : "215,176,105"},${rand() * 0.13})`;
    wc.lineWidth = rand() * 1.8 + 0.2;
    wc.beginPath();
    wc.moveTo(x, 0);
    for (let y = 0; y < 1025; y += 24) wc.lineTo(x + Math.sin(y * 0.012 + i) * rand() * 3, y);
    wc.stroke();
  }
  for (let i = 0; i < 45; i++) {
    wc.strokeStyle = "#36261444";
    wc.lineWidth = 0.7;
    wc.beginPath();
    const x = rand() * 256;
    const y = rand() * 1000;
    wc.ellipse(x, y, rand() * 4 + 2, rand() * 24 + 4, 0, 0, Math.PI * 2);
    wc.stroke();
  }
  const woodTex = new THREE.CanvasTexture(woodCanvas);
  woodTex.colorSpace = THREE.SRGBColorSpace;
  woodTex.wrapS = woodTex.wrapT = THREE.RepeatWrapping;
  woodTex.anisotropy = 8;
  const wood = new THREE.MeshStandardMaterial({ map: woodTex, color: "#d6ab78", roughness: 0.62, bumpMap: woodTex, bumpScale: 0.045 });

  const tabletop = new THREE.Group();
  scene.add(tabletop);
  for (let i = 0; i < 6; i++) box(0.816, 0.25, 9.4, wood, [-2.04 + i * 0.824, -0.15, 0.1], tabletop);
  box(5.05, 0.12, 9.5, mat("#32271e"), [0, -0.32, 0.1]);
  for (const x of [-2.05, 2.05])
    for (const z of [-3.6, 3.5]) {
      box(0.22, 2.4, 0.25, dark, [x, -1.5, z]);
      box(0.06, 0.5, 0.43, brass, [x, -0.4, z]);
    }
  for (const x of [-2.05, 2.05]) box(0.13, 0.15, 7.2, dark, [x, -2.25, -0.05]);
  box(24, 0.16, 25, mat("#182027", 0.97), [0, -2.76, -2]);
  box(15, 9, 0.25, mat("#142733", 0.96), [0, 1.5, -6.2]);
  for (let i = 0; i < 22; i++) box(0.025, 7, 0.025, mat("#31414a", 0.9), [-6.5 + i * 0.62, 1.05, -6.05]);
  box(0.2, 9, 20, mat("#121d26", 0.95), [-7, 1.5, -1]);

  // Regale, Fenster, Deckenlampen, rotes Signallicht
  for (let j = 0; j < 3; j++) {
    box(3.6, 0.13, 0.7, wood, [-3.85, 0.1 + j * 1.05, -5.5]);
    // Das mittlere Brett bleibt frei — dort stehen die Aktenordner aus decor.ts.
    if (j === 1) continue;
    for (let i = 0; i < 5; i++) {
      box(0.4 + rand() * 0.15, 0.32 + rand() * 0.22, 0.38, mat(["#5c5d50", "#354b50", "#795b40"][i % 3]), [
        -5.2 + i * 0.63,
        0.37 + j * 1.05,
        -5.43,
      ]);
    }
  }
  box(2.6, 3, 0.1, dark, [3.8, 1.8, -5.97]);
  box(2.4, 2.8, 0.06, glow("#264d72"), [3.8, 1.8, -5.9]);
  for (let i = 0; i < 12; i++) box(2.5, 0.045, 0.12, mat("#0c1b27"), [3.8, 0.45 + i * 0.24, -5.8]);
  box(0.08, 2.8, 0.16, dark, [3.8, 1.8, -5.75]);
  for (const x of [-1.6, 1.5]) {
    tube(
      [
        [x, 5, -2],
        [x, 3.6, -2],
      ],
      0.015,
      dark,
    );
    cylinder(0.12, 0.42, 0.3, dark, [x, 3.47, -2]);
    cylinder(0.36, 0.36, 0.012, glow("#ffcd87"), [x, 3.31, -2]);
    point("#ffba69", [x, 3.19, -2], 12, 7);
  }
  box(0.7, 0.025, 0.03, glow("#c46b52"), [-0.7, 2.7, -5.83]);
  point("#cf6e4a", [-0.7, 2.7, -5.6], 8, 5);

  function contactShadow(x: number, z: number, sx: number, sz: number) {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ct = c.getContext("2d")!;
    const g = ct.createRadialGradient(64, 64, 3, 64, 64, 60);
    g.addColorStop(0, "rgba(0,0,0,.65)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ct.fillStyle = g;
    ct.fillRect(0, 0, 128, 128);
    const m = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false });
    const p = meshAt(new THREE.PlaneGeometry(sx, sz), m, scene, [x, 0.006, z]);
    p.rotation.x = -Math.PI / 2;
    p.castShadow = false;
  }
  contactShadow(-1.05, -2.1, 3, 2.1);
  contactShadow(1, 0.1, 2.2, 2.2);
  contactShadow(-0.65, 2.5, 2.1, 2.4);

  // ---------------------------------------------------------------------
  // Station „Websites" — CRT-Monitor mit Dachdecker-Demo (lokale Assets)
  // ---------------------------------------------------------------------
  const monitor = new THREE.Group();
  monitor.position.set(-1.0, 0, -2.25);
  monitor.rotation.y = 0.1;
  scene.add(monitor);
  round(1.48, 0.12, 0.85, 0.08, dark, [0, 0.08, 0], monitor);
  round(0.45, 0.38, 0.3, 0.08, cream, [0, 0.29, -0.04], monitor);
  round(2.14, 1.65, 0.85, 0.13, cream, [0, 1.19, 0], monitor);
  round(1.87, 1.34, 0.08, 0.14, dark, [-0.04, 1.24, 0.46], monitor);

  const screenC = document.createElement("canvas");
  screenC.width = 1024;
  screenC.height = 720;
  const sc = screenC.getContext("2d")!;
  const roofImage = new Image();
  roofImage.src = "/demos/dach-poster.jpg";
  const roofVideo = document.createElement("video");
  roofVideo.src = "/demos/dach-loop.mp4";
  roofVideo.muted = true;
  roofVideo.loop = true;
  roofVideo.playsInline = true;
  roofVideo.preload = "auto";
  const screenTex = new THREE.CanvasTexture(screenC);
  screenTex.colorSpace = THREE.SRGBColorSpace;
  const websiteScreen = meshAt(
    new THREE.PlaneGeometry(1.7, 1.15),
    new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }),
    monitor,
    [-0.04, 1.25, 0.525],
  );
  websiteScreen.castShadow = false;

  for (let i = 0; i < 5; i++) {
    const knob = cylinder(0.035, 0.035, 0.025, dark, [0.67 - i * 0.12, 0.48, 0.45], monitor);
    knob.rotation.x = Math.PI / 2;
  }
  meshAt(new THREE.SphereGeometry(0.023, 12, 8), glow("#9dd5b0"), monitor, [0.82, 0.48, 0.48]);
  for (let i = 0; i < 11; i++) box(0.028, 0.52, 0.03, dark, [0.92, 1.05, 0.47], monitor);

  const keyboard = new THREE.Group();
  monitor.add(keyboard);
  keyboard.position.set(0.05, 0.09, 1.04);
  keyboard.rotation.x = -0.08;
  round(1.84, 0.12, 0.65, 0.06, cream, [0, 0, 0], keyboard);
  const keyGeo = new THREE.BoxGeometry(0.113, 0.055, 0.104);
  const keyMat = mat("#d2c6ad", 0.73);
  const keys = new THREE.InstancedMesh(keyGeo, keyMat, 60);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 60; i++) {
    dummy.position.set(((i % 15) - 7) * 0.115, 0.075, (Math.floor(i / 15) - 1.5) * 0.12);
    dummy.updateMatrix();
    keys.setMatrixAt(i, dummy.matrix);
  }
  keys.castShadow = true;
  keyboard.add(keys);
  tube(
    [
      [-0.1, 0.1, -2.5],
      [-0.5, 0.045, -3.2],
      [-2.1, 0.04, -2.6],
      [-2.45, 0.03, 0.4],
    ],
    0.022,
    black,
  );

  function rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, col: string) {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
  }
  function txt(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, color = "#172d37", weight = "400") {
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px "Source Sans 3", sans-serif`;
    ctx.fillText(text, x, y);
  }

  function drawMonitor() {
    const running = !reduced && roofVideo.readyState >= 2 && !roofVideo.paused;
    sc.fillStyle = "#102633";
    sc.fillRect(0, 0, 1024, 720);
    const media: CanvasImageSource = running ? roofVideo : roofImage;
    if (running || (roofImage.complete && roofImage.naturalWidth)) {
      const mw = running ? roofVideo.videoWidth : roofImage.naturalWidth;
      const mh = running ? roofVideo.videoHeight : roofImage.naturalHeight;
      const scale = Math.min(1024 / mw, 570 / mh);
      const w = mw * scale;
      const h = mh * scale;
      sc.drawImage(media, (1024 - w) / 2, 48 + (570 - h) / 2, w, h);
    }
    sc.fillStyle = "#102633";
    sc.fillRect(0, 0, 1024, 48);
    for (let i = 0; i < 3; i++) {
      sc.beginPath();
      sc.arc(24 + i * 21, 24, 5, 0, 7);
      sc.fillStyle = ["#cba66e", "#b7cad4", "#9fcdb7"][i];
      sc.fill();
    }
    txt(sc, webDemo.domain, 110, 32, 23, "#b7cad4", "500");
    sc.fillStyle = "#102633";
    sc.fillRect(0, 618, 1024, 102);
    txt(sc, webDemo.caption, 32, 659, 41, "#f3efe6", "600");
    txt(sc, webDemo.note, 32, 697, 30, "#b7cad4");
    rect(sc, 702, 641, 292, 58, 29, "#213d49");
    sc.strokeStyle = "#9fcdb7";
    sc.lineWidth = 3;
    if (running) {
      sc.beginPath();
      sc.moveTo(725, 657);
      sc.lineTo(725, 682);
      sc.lineTo(745, 669.5);
      sc.closePath();
      sc.stroke();
    } else {
      sc.strokeRect(724, 658, 23, 23);
    }
    txt(sc, running ? "Demo läuft" : "Standbild", 765, 682, 38, "#f3efe6", "600");
    screenTex.needsUpdate = true;
  }

  // ---------------------------------------------------------------------
  // Station „Nachrichten-Assistent" — Tablet mit Beispielchat/Kalender
  // ---------------------------------------------------------------------
  const tablet = new THREE.Group();
  tablet.position.set(-0.72, 0.72, 2.45);
  tablet.rotation.set(-1.02, -0.06, 0.015);
  scene.add(tablet);
  round(1.42, 1.98, 0.1, 0.12, mat("#253c49", 0.27, 0.75), [0, 0, 0], tablet);
  round(1.32, 1.87, 0.025, 0.1, black, [0, 0, 0.065], tablet);
  const chatC = document.createElement("canvas");
  chatC.width = 990;
  chatC.height = 1350;
  const cc = chatC.getContext("2d")!;
  const chatTex = new THREE.CanvasTexture(chatC);
  chatTex.colorSpace = THREE.SRGBColorSpace;
  cc.scale(1.5, 1.5);
  chatTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const tabletScreen = meshAt(
    new THREE.PlaneGeometry(1.23, 1.76),
    new THREE.MeshBasicMaterial({ map: chatTex, toneMapped: false }),
    tablet,
    [0, 0, 0.092],
  );
  tabletScreen.castShadow = false;
  meshAt(new THREE.SphereGeometry(0.013, 10, 6), dark, tablet, [0, 0.94, 0.072]);
  box(0.8, 0.14, 0.62, dark, [-0.72, 0.11, 2.35]);

  let chatStarted = 0;
  function bubble(lines: string[], y: number, outgoing = false, mobile = false) {
    let list = lines;
    const size = mobile ? 43 : 32;
    const lineHeight = mobile ? 51 : 42;
    if (mobile) {
      cc.font = `400 ${size}px "Source Sans 3", sans-serif`;
      list = list.flatMap((line) => {
        const result: string[] = [];
        let row = "";
        for (const word of line.split(" ")) {
          const candidate = row ? row + " " + word : word;
          if (row && cc.measureText(candidate).width > 516) {
            result.push(row);
            row = word;
          } else row = candidate;
        }
        if (row) result.push(row);
        return result;
      });
    }
    const x = outgoing ? 68 : 28;
    const w = 564;
    const h = list.length * lineHeight + 38;
    rect(cc, x, y, w, h, 22, outgoing ? "#d0e3e5" : "#ffffff");
    list.forEach((line, i) => txt(cc, line, x + 24, y + 50 + i * lineHeight, size, "#102633"));
    return y + h;
  }

  function drawChat(t: number) {
    const elapsed = (t - chatStarted + 20) % 20;
    const phase = reduced ? 3 : elapsed < 4 ? 0 : elapsed < 8 ? 1 : elapsed < 12 ? 2 : 3;
    // Nach jedem Durchlauf die Branche wechseln — derselbe Ablauf, andere Welt.
    const round = reduced ? 0 : Math.floor((t - chatStarted + 20) / 20);
    const ex = chatExamples[((round % chatExamples.length) + chatExamples.length) % chatExamples.length];

    cc.fillStyle = "#eef2ef";
    cc.fillRect(0, 0, 660, 900);
    rect(cc, 0, 0, 660, 160, 0, "#102633");
    rect(cc, 28, 39, 70, 70, 24, "#cba66e");
    txt(cc, ex.initial, 49, 87, 37, "#102633", "600");
    txt(cc, ex.business, 118, 72, 32, "#f3efe6", "600");
    txt(cc, "Nachrichten-Assistent", 118, 112, 27, "#b7cad4");
    txt(cc, chatPhaseCaptions[phase], 30, 212, 31, "#274c5c", "600");
    const mobile = container.clientWidth < 800;
    if (phase === 0) {
      const bottom = bubble(ex.incoming, 249, false, mobile);
      bubble(ex.question, bottom + 24, true, mobile);
    } else if (phase === 1) {
      const bottom = bubble(ex.question, 249, true, mobile);
      const last = bubble(ex.answer, bottom + 24, false, mobile);
      txt(cc, ex.captured, 32, last + 64, mobile ? 36 : 29, "#315d52", "600");
    } else if (phase === 2) {
      const bottom = bubble(ex.offer, 249, true, mobile);
      bubble(ex.accept, bottom + 24, false, mobile);
    } else {
      bubble(ex.accept, 249, false, mobile);
      rect(cc, 28, 383, 604, 303, 24, "#102633");
      rect(cc, 54, 412, 85, 88, 15, "#9fcdb7");
      txt(cc, ex.appointment.day, 70, 451, 30, "#102633", "700");
      txt(cc, ex.appointment.time, 63, 484, 26, "#102633", "600");
      txt(cc, ex.appointment.title, 158, 451, mobile ? 42 : 36, "#f3efe6", "600");
      txt(cc, ex.appointment.subtitle, 158, 492, 30, "#b7cad4");
      cc.strokeStyle = "#9fcdb7";
      cc.lineWidth = 5;
      cc.lineCap = "round";
      cc.beginPath();
      cc.moveTo(58, 554);
      cc.lineTo(70, 566);
      cc.lineTo(93, 542);
      cc.stroke();
      txt(cc, "Im Kalender eingetragen", 115, 565, mobile ? 38 : 32, "#f3efe6", "600");
      txt(cc, ex.appointment.note, 54, 631, mobile ? 35 : 29, "#b7cad4");
    }
    for (let i = 0; i < 4; i++) rect(cc, 28 + i * 155, 752, 139, 5, 2, i <= phase ? "#3c756d" : "#cfdbd8");
    txt(cc, `BEISPIEL · ${ex.sector.toUpperCase()}`, 28, 813, 23, "#456573", "600");
    txt(cc, "Keine echte Buchung", 28, 849, 27, "#456573");
    chatTex.needsUpdate = true;
  }

  // ---------------------------------------------------------------------
  // Station „Büroabläufe" — Roboter (unveränderter Import aus robot.js)
  // ---------------------------------------------------------------------
  const robot = createRobot(THREE, scene);
  robot.group.position.set(1.03, 0, -0.05);
  robot.group.rotation.y = -0.13;
  point("#f3e4cb", [1.3, 2, 1.5], 4, 3);

  // Schreibtischlampe, Stiftbecher, Wanduhr
  cylinder(0.23, 0.28, 0.06, dark, [1.94, 0.045, -1.78]);
  tube(
    [
      [1.94, 0.06, -1.78],
      [1.94, 0.75, -1.78],
      [1.53, 1.25, -1.65],
    ],
    0.029,
    brass,
  );
  const shade = cylinder(0.1, 0.27, 0.29, mat("#42616a", 0.45, 0.45), [1.5, 1.27, -1.63]);
  shade.rotation.z = -0.3;
  point("#ffc778", [1.43, 1.06, -1.58], 7, 4);
  cylinder(0.12, 0.12, 0.29, mat("#9d917a"), [-1.98, 0.17, 1]);
  for (let i = 0; i < 5; i++) {
    const pen = cylinder(0.012, 0.012, 0.44, mat(["#1b3d50", "#ba9568", "#3b625f"][i % 3]), [
      -2.02 + rand() * 0.09,
      0.44,
      1 + rand() * 0.08,
    ]);
    pen.rotation.z = (rand() - 0.5) * 0.3;
  }
  const clock = cylinder(0.37, 0.37, 0.05, brass, [0.15, 2.65, -6]);
  clock.rotation.x = Math.PI / 2;
  const face = cylinder(0.335, 0.335, 0.055, mat("#d1c4a5"), [0.15, 2.65, -5.965]);
  face.rotation.x = Math.PI / 2;
  box(0.018, 0.22, 0.02, dark, [0.15, 2.74, -5.92]);
  box(0.18, 0.015, 0.02, dark, [0.23, 2.65, -5.92]);

  // Staub
  const dustG = new THREE.BufferGeometry();
  const dustA = new Float32Array(180 * 3);
  for (let i = 0; i < dustA.length; i += 3) {
    dustA[i] = (rand() - 0.5) * 12;
    dustA[i + 1] = rand() * 5;
    dustA[i + 2] = (rand() - 0.5) * 12;
  }
  dustG.setAttribute("position", new THREE.BufferAttribute(dustA, 3));
  const dust = new THREE.Points(dustG, new THREE.PointsMaterial({ color: "#b8ccca", size: 0.014, transparent: true, opacity: 0.28, depthWrite: false }));
  scene.add(dust);

  // Optionale Blender-Deko-Objekte (siehe Plan §9) — no-op ohne Einträge in decor.ts.
  loadDecorAssets(scene);

  const stationObjects: Record<StationId, THREE.Object3D> = { web: monitor, chat: tablet, office: robot.group };
  for (const [id, obj] of Object.entries(stationObjects)) {
    obj.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) o.userData.station = id;
    });
  }

  function attachLabelAnchor(parent: THREE.Object3D, local: Vec3Tuple) {
    const anchor = new THREE.Object3D();
    anchor.position.set(...local);
    parent.add(anchor);
    return anchor;
  }

  const robotHead =
    robot.group.children.find((child) => child instanceof THREE.Group && child.position.y > 1) ??
    robot.group;

  // Anker sitzen am Prop: CRT-Bildschirm, Tabletfläche, Roboter-Kopf.
  const labelAnchors: Record<StationId, THREE.Object3D> = {
    web: attachLabelAnchor(websiteScreen, [0, 0.18, 0]),
    chat: attachLabelAnchor(tabletScreen, [0, 0.08, 0.02]),
    office: attachLabelAnchor(robotHead, [0.12, 0.12, 0.28]),
  };

  // ---------------------------------------------------------------------
  // Kamera-Posen, Übergänge, Raycasting
  // ---------------------------------------------------------------------
  function pose(id: ViewId) {
    const table = container.clientWidth < 800 ? MOBILE_POSES : POSES;
    const s = table[id] ?? POSES[id];
    return { p: new THREE.Vector3(...s.p), t: new THREE.Vector3(...s.t) };
  }

  // Die Kamera hat zwei Ebenen: `base` ist die erzählte Position (Pose/Übergang),
  // darauf liegt ein kleiner Versatz aus Maus-Parallaxe und ruhigem Atmen.
  const home = pose("overview");
  const basePos = home.p.clone();
  const baseLook = home.t.clone();
  const drift = new THREE.Vector2();
  const pointer = new THREE.Vector2();
  camera.position.copy(basePos);
  look.copy(baseLook);
  camera.lookAt(look);

  let transition: { start: number; from: THREE.Vector3; fromT: THREE.Vector3; to: THREE.Vector3; toT: THREE.Vector3; duration: number } | null = null;

  function goTo(id: ViewId) {
    current = id;
    callbacks.onStationChange(id);
    if (id === "chat") chatStarted = performance.now() / 1000;
    const dest = pose(id);
    transition = {
      start: performance.now(),
      from: basePos.clone(),
      fromT: baseLook.clone(),
      to: dest.p,
      toT: dest.t,
      duration: reduced ? 0 : 1300,
    };
    if (!reduced) roofVideo.play().catch(() => {});
  }

  renderer.domElement.addEventListener("pointermove", (e) => {
    const r = renderer.domElement.getBoundingClientRect();
    pointer.set((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
  });
  renderer.domElement.addEventListener("pointerleave", () => pointer.set(0, 0));

  const raycaster = new THREE.Raycaster();
  const v2 = new THREE.Vector2();
  let down: [number, number] | null = null;
  renderer.domElement.addEventListener("pointerdown", (e) => (down = [e.clientX, e.clientY]));
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (introProgress < 1 || !down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 8) return;
    const r = renderer.domElement.getBoundingClientRect();
    v2.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(v2, camera);
    const hits = raycaster.intersectObjects(Object.values(stationObjects), true);
    if (hits.length) goTo(hits[0].object.userData.station as StationId);
  });

  // ---------------------------------------------------------------------
  // Hotspot-Projektion (DOM-Elemente werden von außen registriert)
  // ---------------------------------------------------------------------
  let hotspotElements: Partial<Record<StationId, HTMLElement>> = {};
  const projected = new THREE.Vector3();
  const world = new THREE.Vector3();
  function updateLabels() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    const headerPad = width < 800 ? 72 : 92;
    const footerPad = width < 800 ? 78 : 88;
    for (const id of STATION_IDS) {
      const el = hotspotElements[id];
      if (!el) continue;
      if (current !== "overview" || introProgress < 0.99) {
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
        el.tabIndex = -1;
        continue;
      }
      labelAnchors[id].getWorldPosition(world);
      projected.copy(world).project(camera);
      const onScreen =
        projected.z < 1 &&
        projected.x > -1.2 &&
        projected.x < 1.2 &&
        projected.y > -1.25 &&
        projected.y < 1.25;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const x = clamp((projected.x * 0.5 + 0.5) * width, w / 2 + 8, width - w / 2 - 8);
      const y = clamp((-projected.y * 0.5 + 0.5) * height, headerPad, height - footerPad);
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.opacity = onScreen ? "1" : "0";
      el.style.pointerEvents = onScreen ? "auto" : "none";
      el.tabIndex = onScreen ? 0 : -1;
    }
  }
  function clamp(v: number, a: number, b: number) {
    return Math.max(a, Math.min(b, v));
  }

  // ---------------------------------------------------------------------
  // Größe
  // ---------------------------------------------------------------------
  function resize() {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    if (!transition) {
      const d = pose(current);
      basePos.copy(d.p);
      baseLook.copy(d.t);
    }
  }
  window.addEventListener("resize", resize);

  // ---------------------------------------------------------------------
  // Dauerhafte Render-Schleife
  // ---------------------------------------------------------------------
  let lastTexture = -1;
  let readyFired = false;

  function render(ms: number) {
    if (disposed) return;
    rafId = requestAnimationFrame(render);
    if (document.hidden || webglFailed) return;
    const t = ms / 1000;

    if (transition) {
      const q = transition.duration ? clamp((ms - transition.start) / transition.duration, 0, 1) : 1;
      const k = q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2;
      basePos.lerpVectors(transition.from, transition.to, k);
      baseLook.lerpVectors(transition.fromT, transition.toT, k);
      if (q === 1) transition = null;
    } else if (introProgress < 1) {
      // Vor Abschluss des Intros: leichter Näherkommen-Effekt (kein eigener Kamera-Tween nötig).
      const h = pose("overview");
      basePos.copy(h.p);
      basePos.z += reduced ? 0 : (1 - introProgress) * 2;
      baseLook.copy(h.t);
    }

    // Maus-Parallaxe und ruhiges Atmen in der Übersicht — gedämpft, nie ruckartig.
    const reach = current === "overview" ? 1 : 0.45;
    const wantX = reduced ? 0 : pointer.x * 0.8 * reach;
    const wantY = reduced ? 0 : -pointer.y * 0.45 * reach;
    drift.x += (wantX - drift.x) * 0.045;
    drift.y += (wantY - drift.y) * 0.045;
    const breathe = reduced || current !== "overview" ? 0 : Math.sin(t * 0.16) * 0.13;
    camera.position.set(basePos.x + drift.x + breathe, basePos.y + drift.y, basePos.z);
    look.copy(baseLook);
    camera.lookAt(look);

    // Stationslicht sanft hoch-/runterfahren, damit der Blick geführt wird.
    for (const id of Object.keys(emphasisLights) as StationId[]) {
      const want = current === id ? EMPHASIS[id].peak : 0;
      const light = emphasisLights[id];
      light.intensity += (want - light.intensity) * 0.06;
    }

    if (Math.floor(t * 12) !== lastTexture) {
      drawMonitor();
      drawChat(t);
      lastTexture = Math.floor(t * 12);
    }
    robot.animate(t, reduced);
    if (!reduced) dust.rotation.y = Math.sin(t * 0.045) * 0.025;
    updateLabels();
    renderer.render(scene, camera);

    if (!readyFired) {
      readyFired = true;
      callbacks.onReady();
    }
  }
  rafId = requestAnimationFrame(render);

  // Sobald echte Fonts geladen sind, Texturen einmal neu zeichnen (schärferer Text).
  document.fonts?.ready
    ?.then(() => {
      if (disposed) return;
      drawMonitor();
      drawChat(0);
    })
    .catch(() => {});

  const readyTimeout = window.setTimeout(() => {
    if (!readyFired) callbacks.onFallback("Für die interaktive Werkstatt wird eine Internetverbindung benötigt.");
  }, READY_TIMEOUT_MS);

  return {
    goTo,
    setIntroProgress(p: number) {
      introProgress = p;
      if (p < 0.97 && current !== "overview") goTo("overview");
      if (p > 0.85 && !reduced && roofVideo.paused) roofVideo.play().catch(() => {});
      if (p < 0.7) roofVideo.pause();
    },
    setReduced(next: boolean) {
      reduced = next;
      if (reduced) {
        roofVideo.pause();
        if (transition) transition.duration = 0;
      } else if (introProgress > 0.85) {
        roofVideo.play().catch(() => {});
      }
    },
    setHotspotElements(elements) {
      hotspotElements = elements;
    },
    dispose() {
      disposed = true;
      window.clearTimeout(readyTimeout);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      roofVideo.pause();
      roofVideo.removeAttribute("src");
      roofVideo.load();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.geometry.dispose();
          const materials = Array.isArray(m.material) ? m.material : [m.material];
          for (const mm of materials) mm?.dispose();
        }
      });
    },
  };
}
