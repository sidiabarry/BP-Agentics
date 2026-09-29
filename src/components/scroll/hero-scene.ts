import {
  BufferAttribute,
  BufferGeometry,
  CustomBlending,
  DstAlphaFactor,
  Mesh,
  NoBlending,
  type Object3D,
  OneFactor,
  OneMinusSrcAlphaFactor,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
  ZeroFactor,
} from "three";
import { clamp01, range, smooth } from "@/lib/scroll-engine";

/**
 * AKT I, Ausklang — Licht im geöffneten Display.
 *
 * Wenn sich das Display öffnet, zeichnet der Canvas exakt dieselbe Form und
 * denselben Verlauf wie .hero-portal__portal und legt sich darüber. Darin
 * fließen drei Lichtbänder (die drei Bausteine). Beim Weiterscrollen steigt von
 * unten die Nacht der Werkstatt auf, die Bänder sinken hinein, und am Ende der
 * Pin-Strecke ist die Unterkante reines #0b1a27 — dieselbe Farbe, mit der .ws
 * beginnt.
 *
 * Scroll setzt nur Zielwerte; Bild und Bewegung laufen gedämpft hinterher.
 * Gerendert wird nur, solange die Szene sichtbar ist.
 */

/** Muss zu --open von .hero-portal__portal in scroll-experience.css passen. */
const PORTAL_START = 0.62;
const PORTAL_SPAN = 0.16;
/** Muss zu --dusk von .hero-portal__scene passen (CSS-Fallback ohne WebGL). */
const DUSK_START = 0.76;
const DUSK_END = 0.99;

const MAX_DPR = 1.5;
const MIN_DPR = 0.75;
/** Obergrenze für die Puffergröße (Pixel), damit große Displays nicht teurer werden als nötig. */
const PIXEL_BUDGET = 3_500_000;
const LINK_WAIT_MS = 3000;
const CALM_MS = 150;
const SEGMENTS = 160;

/** Nächste ruhige Lücke im Main Thread (Safari: kurzer Timeout). */
function idle() {
  return new Promise<void>((resolve) => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout: 300 });
    else setTimeout(resolve, 32);
  });
}

const still = { y: NaN, since: 0 };

/**
 * Nächste Scroll-Pause, dann eine ruhige Lücke im Main Thread. Solange gescrollt wird,
 * rechnet der GPU-Prozess am Bild, und jede synchrone WebGL-Abfrage wartet auf ihn.
 * Mehrere Schritte nutzen dieselbe Pause. `urgent` beendet das Warten, sobald die
 * Szene gleich gebraucht wird.
 */
export function pause(urgent: () => boolean) {
  return new Promise<void>((resolve) => {
    const check = () => {
      const now = performance.now();
      if (window.scrollY !== still.y) {
        still.y = window.scrollY;
        still.since = now;
      }
      if (now - still.since >= CALM_MS || urgent()) resolve();
      else window.setTimeout(check, 50);
    };
    check();
  }).then(idle);
}

/**
 * Wartet, bis der GPU-Prozess alle gesendeten Befehle (auch das Linken) abgearbeitet hat.
 * Der Fence-Status wird zwischen Tasks aktualisiert; die Abfrage blockiert nie.
 */
async function drained(gl: WebGL2RenderingContext) {
  const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
  if (!sync) return;
  gl.flush();
  const end = performance.now() + LINK_WAIT_MS;
  while (gl.getSyncParameter(sync, gl.SYNC_STATUS) !== gl.SIGNALED && performance.now() < end) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  gl.deleteSync(sync);
}

function vec3(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return new Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

function glsl(hex: string) {
  const v = vec3(hex);
  return `vec3(${v.x.toFixed(4)}, ${v.y.toFixed(4)}, ${v.z.toFixed(4)})`;
}

/* Farben bleiben sRGB-Werte, wie im CSS: die Shader umgehen das Farbmanagement von three. */
const SKY_FRAGMENT = /* glsl */ `
uniform vec2 uBuf;
uniform vec2 uView;
uniform float uDpr;
uniform vec3 uPortal;
uniform float uOpen;
uniform float uFlow;
uniform float uDusk;
uniform float uSeam;
uniform float uTime;

const vec3 P0 = ${glsl("#d9ecfc")};
const vec3 P1 = ${glsl("#7cbcf1")};
const vec3 P2 = ${glsl("#2288d8")};
const vec3 P3 = ${glsl("#0b5ea8")};
const vec3 NIGHT = ${glsl("#0b1a27")};
const vec3 LINE = ${glsl("#198be8")};
const vec3 SOFT = ${glsl("#9fd0f8")};

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 px = vec2(gl_FragCoord.x, uBuf.y - gl_FragCoord.y) / uDpr;

  // Display-Form wie im CSS: Quadrat 100vmax, scale(0.3 + open * 2.5), Radius 50 % -> 20 %.
  float side = uPortal.z * (0.3 + uOpen * 2.5);
  float radius = side * (0.5 - uOpen * 0.3);
  vec2 q = abs(px - uPortal.xy) - vec2(side * 0.5) + radius;
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
  float alpha = clamp(0.5 - d * uDpr, 0.0, 1.0) * clamp(uOpen * 5.0, 0.0, 1.0);

  // radial-gradient(circle at 42% 34%, ...) des Displays, mitskaliert.
  vec2 g = uPortal.xy + side * vec2(-0.08, -0.16);
  float t = length(px - g) / (side * 0.878635);
  vec3 col = mix(P0, P1, clamp(t / 0.3, 0.0, 1.0));
  col = mix(col, P2, clamp((t - 0.3) / 0.3, 0.0, 1.0));
  col = mix(col, P3, clamp((t - 0.6) / 0.4, 0.0, 1.0));

  float h = uView.y;
  vec2 n = px / h;
  float aspect = uView.x / h;
  float tm = uTime;

  // Das Display lebt weiter: drei weiche Lichtflecken ziehen langsam.
  if (uFlow > 0.0) {
    vec2 b1 = vec2(aspect * (0.26 + 0.09 * sin(tm * 0.23)), 0.24 + 0.08 * cos(tm * 0.19));
    vec2 b2 = vec2(aspect * (0.76 + 0.07 * cos(tm * 0.17 + 1.3)), 0.5 + 0.1 * sin(tm * 0.21 + 0.7));
    vec2 b3 = vec2(aspect * (0.48 + 0.13 * sin(tm * 0.13 + 2.1)), 0.84 + 0.06 * cos(tm * 0.25));
    col = mix(col, P0, exp(-dot(n - b1, n - b1) * 7.0) * 0.42 * uFlow);
    col = mix(col, LINE, exp(-dot(n - b2, n - b2) * 5.0) * 0.34 * uFlow);
    col = mix(col, SOFT, exp(-dot(n - b3, n - b3) * 8.0) * 0.3 * uFlow);
  }

  // Dämmerung: eine weiche, wellige Kante steigt von unten auf.
  float hz = mix(1.4, -0.5, uDusk)
    + 0.05 * sin(n.x * 5.2 + tm * 0.35)
    + 0.025 * sin(n.x * 11.0 - tm * 0.5 + 1.7);
  float y = n.y;
  col = mix(col, P3, smoothstep(hz - 0.6, hz - 0.12, y) * 0.9);
  col = mix(col, NIGHT, smoothstep(hz - 0.25, hz + 0.2, y));
  col = mix(col, LINE, exp(-abs(y - hz + 0.1) * 12.0) * 0.2 * (1.0 - uDusk * uDusk));

  // Das Licht bleibt oben, wo das Display war.
  float lift = exp(-length(px - g) / (h * 0.6));
  col = mix(col, LINE, lift * 0.2 * smoothstep(0.35, 1.0, uDusk));

  // Unterkante: exakt die Farbe, mit der die Werkstatt beginnt.
  float seam = uSeam * smoothstep(0.62, 0.96, y);
  col = mix(col, NIGHT, seam);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0 * (1.0 - seam);

  gl_FragColor = vec4(col * alpha, alpha);
}
`;

const SKY_VERTEX = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const RIBBON_VERTEX = /* glsl */ `
attribute float aS;
attribute float aSide;
uniform float uTime;
uniform float uMorph;
uniform float uExit;
uniform vec2 uHalf;
uniform float uTilt;
uniform vec4 uA;
uniform vec4 uB;
uniform vec2 uShape;
varying float vS;
varying float vSide;
varying float vFacing;

const float TAU = 6.2831853;

// Im Licht: ein langer Schwung quer durchs Bild, im Hochformat diagonal.
vec3 drift(float s, float t) {
  float v = uA.x
    + uTilt * (s - 0.5)
    + uA.y * sin(TAU * 0.8 * s + t * 0.25 + uA.z)
    + uA.y * 0.45 * sin(TAU * 1.9 * s - t * 0.33 + uA.z * 2.0);
  return vec3(mix(-1.35, 1.35, s), v, 0.9 * sin(TAU * 0.6 * s + t * 0.18 + uA.z));
}

// In der Dämmerung: von oben nach unten, hinein in die Werkstatt.
vec3 fall(float s, float t) {
  float e = s * s * (3.0 - 2.0 * s);
  float u = mix(uB.x, uB.y, e) + uB.w * sin(TAU * 1.1 * s + t * 0.3 + uA.z);
  return vec3(u, mix(1.4, uB.z, s), 0.7 * sin(TAU * 0.7 * s + t * 0.21 + uA.z));
}

vec3 path(float s) {
  float t = uTime * uA.w;
  vec3 p = mix(drift(s, t), fall(s, t), uMorph);
  p.y -= uExit * 0.5;
  return vec3(p.xy * uHalf, p.z);
}

void main() {
  vec3 c = path(aS);
  vec3 tangent = normalize(path(aS + 0.003) - c);
  vec3 side = normalize(cross(tangent, vec3(0.0, 0.0, 1.0)));
  vec3 lift = cross(side, tangent);
  float angle = uShape.y * (aS - 0.5) + 0.5 * sin(uTime * 0.2 * uA.w + uA.z);
  vec3 across = cos(angle) * side + sin(angle) * lift;
  float width = uShape.x * sqrt(uHalf.x * uHalf.y) * (0.3 + 0.7 * sin(3.14159 * aS));
  vec3 pos = c + across * aSide * width * 0.5;
  vFacing = abs(normalize(cross(tangent, across)).z);
  vS = aS;
  vSide = aSide;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const RIBBON_FRAGMENT = /* glsl */ `
uniform vec3 uCore;
uniform vec3 uDeep;
uniform vec3 uHi;
uniform float uAlpha;
uniform float uDusk;
uniform float uTime;
uniform float uBufH;
uniform float uGuard;
varying float vS;
varying float vSide;
varying float vFacing;

void main() {
  float soft = smoothstep(0.0, 0.9, 1.0 - abs(vSide));
  float fibre = 0.93 + 0.07 * sin(vSide * 26.0 + vS * 11.0);
  float sheen = pow(vFacing, 1.6);
  // Glanzlinie, die längs über die Seide wandert.
  float band = exp(-pow((vSide - 0.4 * sin(vS * 5.0 + uTime * 0.3)) * 2.4, 2.0));
  float pulse = exp(-pow((fract(vS * 1.4 - uTime * 0.07) - 0.5) * 5.0, 2.0));
  vec3 col = mix(uDeep, uCore, 0.25 + 0.75 * sheen);
  col = mix(col, uHi, clamp(band * sheen * 0.85 + pulse * 0.15, 0.0, 1.0));
  float ends = smoothstep(0.0, 0.16, vS) * smoothstep(1.0, 0.78, vS);
  float y = 1.0 - gl_FragCoord.y / uBufH;
  // Bänder berühren die Unterkante nie (saubere Naht) und laufen nie hinter den Intro-Text.
  float ground = 1.0 - smoothstep(0.8, 0.96, y);
  float guard = 1.0 - smoothstep(uGuard - 0.16, uGuard - 0.03, y);
  float a = soft * fibre * (0.35 + 0.65 * sheen) * ends * ground * guard * uAlpha;
  gl_FragColor = vec4(col * a, a * mix(1.0, 0.4, uDusk));
}
`;

// Lichtstaub in der Dämmerung: steigt langsam und beim Scrollen je nach Tiefe schneller.
const MOTE_VERTEX = /* glsl */ `
attribute vec4 aSeed;
uniform float uTime;
uniform float uRise;
uniform float uPx;
uniform vec2 uHalf;
varying float vA;

void main() {
  float depth = aSeed.z;
  float r = fract(aSeed.y + uTime * (0.004 + 0.008 * depth) + uRise * mix(0.25, 0.7, depth));
  float y = r * 2.0 - 1.0;
  float x = aSeed.x * 2.0 - 1.0 + 0.03 * sin(uTime * 0.3 + aSeed.w * 6.2831);
  vec3 pos = vec3(x * uHalf.x * 1.1, y * uHalf.y * 1.1, mix(-2.5, 2.0, depth));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uPx * mix(2.0, 5.0, depth);
  vA = mix(0.2, 0.75, depth) * smoothstep(1.0, 0.75, abs(y)) * (0.65 + 0.35 * sin(uTime * 0.9 + aSeed.w * 6.2831));
}
`;

const MOTE_FRAGMENT = /* glsl */ `
uniform float uAlpha;
uniform float uBufH;
uniform float uGuard;
varying float vA;
const vec3 SOFT = ${glsl("#9fd0f8")};

void main() {
  float d = length(gl_PointCoord - 0.5);
  float y = 1.0 - gl_FragCoord.y / uBufH;
  float guard = 1.0 - smoothstep(uGuard - 0.12, uGuard - 0.02, y);
  float ground = 1.0 - smoothstep(0.85, 0.97, y);
  float a = pow(smoothstep(0.5, 0.0, d), 1.8) * vA * uAlpha * guard * ground;
  gl_FragColor = vec4(SOFT * a, a * 0.5);
}
`;

const MOTES = 180;

type RibbonSpec = {
  core: string;
  deep: string;
  hi: string;
  /** Höhe, Amplitude, Phase, Tempo im Licht */
  a: [number, number, number, number];
  /** Start-x, End-x, End-y, Pendeln beim Absinken */
  b: [number, number, number, number];
  /** Breite (relativ), Verdrillung (rad über die Länge) */
  shape: [number, number];
};

// Beim Absinken laufen die drei Bänder von weit auseinander zur Bildmitte zusammen.
const RIBBONS: RibbonSpec[] = [
  { core: "#9fd0f8", deep: "#1576c4", hi: "#ffffff", a: [0.4, 0.12, 0.0, 1.0], b: [-0.85, -0.22, -0.72, 0.1], shape: [0.6, 3.2] },
  { core: "#198be8", deep: "#0b5ea8", hi: "#9fd0f8", a: [0.02, 0.14, 2.1, 0.9], b: [-0.05, 0.04, -0.62, 0.14], shape: [0.46, 3.8] },
  { core: "#9fd0f8", deep: "#198be8", hi: "#ffffff", a: [-0.36, 0.1, 4.2, 1.1], b: [0.8, 0.26, -0.8, 0.1], shape: [0.34, 2.6] },
];

function moteGeometry() {
  const seeds = new Float32Array(MOTES * 4);
  let s = 7;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  for (let i = 0; i < seeds.length; i += 1) seeds[i] = rand();
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(MOTES * 3), 3));
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 4));
  return geometry;
}

function ribbonGeometry() {
  const count = (SEGMENTS + 1) * 2;
  const along = new Float32Array(count);
  const side = new Float32Array(count);
  const index: number[] = [];
  for (let i = 0; i <= SEGMENTS; i += 1) {
    along[i * 2] = along[i * 2 + 1] = i / SEGMENTS;
    side[i * 2] = -1;
    side[i * 2 + 1] = 1;
    if (i < SEGMENTS) {
      const a = i * 2;
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute("aS", new BufferAttribute(along, 1));
  geometry.setAttribute("aSide", new BufferAttribute(side, 1));
  geometry.setIndex(index);
  return geometry;
}

export type HeroSceneOptions = {
  canvas: HTMLCanvasElement;
  section: HTMLElement;
  pin: HTMLElement;
  portal: HTMLElement;
  /** Der Intro-Text am Ende der Sektion; die Bänder halten Abstand zu ihm. */
  intro: HTMLElement;
  /** true, sobald die Szene gleich sichtbar wird: dann ohne Scroll-Pause fertig aufbauen. */
  urgent: () => boolean;
  onReady: () => void;
  onLost: () => void;
};

export type HeroScene = {
  /** Nach Scroll oder Moduswechsel: prüft, ob gezeichnet werden muss. */
  wake: () => void;
  setEnabled: (enabled: boolean) => void;
  dispose: () => void;
};

export async function createHeroScene(options: HeroSceneOptions): Promise<HeroScene | null> {
  const { canvas, section, pin, portal, intro } = options;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "default",
    });
  } catch {
    return null;
  }
  renderer.setClearColor(0x000000, 0);

  // Kontext und Szenenaufbau: zwei getrennte Tasks.
  await pause(options.urgent);
  if (renderer.getContext().isContextLost()) {
    renderer.dispose();
    return null;
  }

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 40);
  camera.position.set(0, 0, 10);
  const half = new Vector2(1, 1);

  const skyUniforms = {
    uBuf: { value: new Vector2(1, 1) },
    uView: { value: new Vector2(1, 1) },
    uDpr: { value: 1 },
    uPortal: { value: new Vector3(0, 0, 1) },
    uOpen: { value: 0 },
    uFlow: { value: 0 },
    uDusk: { value: 0 },
    uSeam: { value: 0 },
    uTime: { value: 0 },
  };
  const skyGeometry = new BufferGeometry();
  skyGeometry.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  const skyMaterial = new ShaderMaterial({
    uniforms: skyUniforms,
    vertexShader: SKY_VERTEX,
    fragmentShader: SKY_FRAGMENT,
    blending: NoBlending,
    depthTest: false,
    depthWrite: false,
  });
  const sky = new Mesh(skyGeometry, skyMaterial);
  sky.frustumCulled = false;
  sky.renderOrder = 0;
  scene.add(sky);

  // Bänder und Staub nur dort, wo der Himmel schon deckt: außerhalb des Displays bleibt der Canvas leer.
  const clipped = {
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: CustomBlending,
    blendSrc: DstAlphaFactor,
    blendDst: OneMinusSrcAlphaFactor,
    blendSrcAlpha: ZeroFactor,
    blendDstAlpha: OneFactor,
  } as const;

  const moteUniforms = {
    uTime: { value: 0 },
    uRise: { value: 0 },
    uPx: { value: 1 },
    uHalf: { value: half },
    uAlpha: { value: 0 },
    uBufH: { value: 1 },
    uGuard: { value: 2 },
  };
  const moteGeo = moteGeometry();
  const moteMaterial = new ShaderMaterial({
    uniforms: moteUniforms,
    vertexShader: MOTE_VERTEX,
    fragmentShader: MOTE_FRAGMENT,
    ...clipped,
  });
  const motes = new Points(moteGeo, moteMaterial);
  motes.frustumCulled = false;
  motes.renderOrder = 1;
  scene.add(motes);

  const ribbonGeo = ribbonGeometry();
  const ribbons = RIBBONS.map((spec, i) => {
    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uExit: { value: 0 },
        uHalf: { value: half },
        uTilt: { value: 0 },
        uGuard: { value: 2 },
        uA: { value: new Vector4(...spec.a) },
        uB: { value: new Vector4(...spec.b) },
        uShape: { value: new Vector2(...spec.shape) },
        uCore: { value: vec3(spec.core) },
        uDeep: { value: vec3(spec.deep) },
        uHi: { value: vec3(spec.hi) },
        uAlpha: { value: 0 },
        uDusk: { value: 0 },
        uBufH: { value: 1 },
      },
      vertexShader: RIBBON_VERTEX,
      fragmentShader: RIBBON_FRAGMENT,
      ...clipped,
    });
    const mesh = new Mesh(ribbonGeo, material);
    mesh.frustumCulled = false;
    mesh.renderOrder = 2 + i;
    scene.add(mesh);
    return { mesh, material, spec };
  });

  const geo = { top: 0, height: 1, pinH: 1, stickyTop: 0, introH: 0 };
  let enabled = true;
  let inView = false;
  let ready = false;
  let disposed = false;
  let raf = 0;
  let last = 0;
  let damped = -1;
  let exitDamped = 0;
  let prevP = 0;
  let boost = 0;
  let time = 0;
  let drewVisible = false;
  let measured = false;

  function measure() {
    measured = true;
    const w = Math.max(1, pin.clientWidth);
    const h = Math.max(1, pin.clientHeight);
    const budget = Math.sqrt(PIXEL_BUDGET / (w * h));
    const ratio = Math.max(MIN_DPR, Math.min(window.devicePixelRatio || 1, MAX_DPR, budget));
    // setSize/setPixelRatio sind durch sharpen-three.ts auf DPR 2 festgelegt; hier gilt 1.5.
    // Die Größe ändert sich nur bei Resize, nie mitten im Scrollen.
    if (canvas.width !== Math.floor(w * ratio) || canvas.height !== Math.floor(h * ratio)) {
      renderer.setDrawingBufferSize(w, h, ratio);
    }
    skyUniforms.uBuf.value.set(canvas.width, canvas.height);
    skyUniforms.uView.value.set(w, h);
    skyUniforms.uDpr.value = canvas.width / w;
    const s = portal.offsetWidth;
    skyUniforms.uPortal.value.set(portal.offsetLeft + s / 2, portal.offsetTop + s / 2, s);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    half.set(halfH * camera.aspect, halfH);
    const tilt = -0.2 - smooth(range(camera.aspect, 1.2, 0.5));
    for (const r of ribbons) {
      r.material.uniforms.uBufH.value = canvas.height;
      r.material.uniforms.uTilt.value = tilt;
    }
    moteUniforms.uBufH.value = canvas.height;
    moteUniforms.uPx.value = canvas.width / w;
    geo.top = section.getBoundingClientRect().top + window.scrollY;
    geo.height = section.offsetHeight;
    geo.pinH = h;
    geo.stickyTop = parseFloat(getComputedStyle(pin).top) || 0;
    geo.introH = intro.offsetHeight;
  }

  /** Oberkante des Intro-Texts, relativ zur Bühne (0 oben, 1 unten) – ohne Layout-Abfrage. */
  function guardLine() {
    const bottom = geo.top + geo.height - window.scrollY;
    const pinTop = Math.min(geo.stickyTop, bottom - geo.pinH);
    return (bottom - geo.introH - pinTop) / geo.pinH;
  }

  /** Dieselbe Formel wie useScrollScene (mode "pin"), plus Ausfahrt nach dem Pin. */
  function read() {
    const vh = window.innerHeight;
    const travel = Math.max(1, geo.height - vh);
    const y = window.scrollY - geo.top;
    return { p: clamp01(y / travel), exit: clamp01((y - travel) / vh) };
  }

  const visible = (p: number) => enabled && inView && p >= PORTAL_START - 0.01;

  function draw(now: number) {
    raf = 0;
    if (disposed) return;
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60;
    last = now;

    const { p, exit } = read();
    const k = 1 - Math.exp(-dt * 6);
    if (damped < 0) damped = p;
    damped += (p - damped) * k;
    exitDamped += (exit - exitDamped) * k;
    // Scrollen treibt den Fluss an, danach läuft er ruhig weiter.
    const speed = Math.min(Math.abs(p - prevP) / dt, 0.5);
    prevP = p;
    boost += (speed * 8 - boost) * k;
    time += dt * (1 + boost);

    const pd = damped;
    const dusk = smooth(range(pd, DUSK_START, DUSK_END));
    skyUniforms.uOpen.value = range(p, PORTAL_START, PORTAL_START + PORTAL_SPAN);
    skyUniforms.uFlow.value = smooth(range(pd, 0.62, 0.72)) * (1 - smooth(range(pd, 0.84, 0.97)));
    skyUniforms.uDusk.value = dusk;
    skyUniforms.uSeam.value = smooth(range(p, 0.9, 0.99));
    skyUniforms.uTime.value = time;
    const alpha = smooth(range(pd, 0.625, 0.74)) * (1 - exitDamped * 0.5);
    const morph = smooth(range(pd, 0.78, 1));
    const guard = guardLine();
    for (const r of ribbons) {
      const u = r.material.uniforms;
      u.uTime.value = time;
      u.uMorph.value = morph;
      u.uExit.value = exitDamped;
      u.uAlpha.value = alpha;
      u.uDusk.value = dusk;
      u.uGuard.value = guard;
    }
    moteUniforms.uTime.value = time;
    moteUniforms.uRise.value = pd;
    moteUniforms.uAlpha.value = smooth(range(pd, 0.8, 0.95));
    moteUniforms.uGuard.value = guard;

    renderer.render(scene, camera);
    drewVisible = p >= PORTAL_START - 0.01;

    const settling = Math.abs(p - damped) > 1e-3;
    if (enabled && inView && (drewVisible || settling)) raf = requestAnimationFrame(draw);
    else last = 0;
  }

  function wake() {
    if (!ready || raf || disposed) return;
    const { p } = read();
    if (visible(p) || drewVisible) raf = requestAnimationFrame(draw);
  }

  const io = new IntersectionObserver(([entry]) => {
    inView = Boolean(entry?.isIntersecting);
    wake();
  });
  io.observe(section);

  const ro = new ResizeObserver(() => {
    measure();
    wake();
  });
  ro.observe(pin);
  ro.observe(section);
  ro.observe(intro);

  const onLost = () => {
    if (disposed) return;
    ready = false;
    cancelAnimationFrame(raf);
    raf = 0;
    options.onLost();
  };
  canvas.addEventListener("webglcontextlost", onLost);

  /**
   * Kompilieren und der erste Einsatz jedes Programms (Link-Prüfung, Uniforms,
   * Buffer-Upload) laufen je in einem eigenen kurzen Task, nie als ein langer.
   */
  async function warmUp() {
    await pause(options.urgent);
    if (disposed) return;
    if (!measured) measure();
    await renderer.compileAsync(scene, camera);
    // Ohne die Erweiterung blockiert die erste Abfrage am Programm, bis es gelinkt ist.
    if (!renderer.extensions.has("KHR_parallel_shader_compile")) await drained(renderer.getContext() as WebGL2RenderingContext);
    const parts: Object3D[][] = [[sky], [motes], ribbons.map((r) => r.mesh)];
    for (const part of parts) {
      await pause(options.urgent);
      if (disposed) return;
      for (const child of scene.children) child.visible = part.includes(child);
      renderer.render(scene, camera);
    }
    for (const child of scene.children) child.visible = true;
    const programs = (renderer.info.programs ?? []) as { diagnostics?: { runnable: boolean } }[];
    if (programs.some((program) => program.diagnostics?.runnable === false)) throw new Error("shader");
    await idle();
    if (disposed) return;
    ready = true;
    damped = read().p;
    draw(performance.now());
    options.onReady();
  }

  // Die erste Messung liefert der ResizeObserver, ohne ein Layout zu erzwingen.
  warmUp().catch(onLost);

  return {
    wake,
    setEnabled(next) {
      enabled = next;
      if (next) {
        measure();
        wake();
      }
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      skyGeometry.dispose();
      skyMaterial.dispose();
      moteGeo.dispose();
      moteMaterial.dispose();
      ribbonGeo.dispose();
      for (const r of ribbons) r.material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
