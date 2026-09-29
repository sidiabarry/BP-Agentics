import {
  BufferAttribute,
  BufferGeometry,
  CustomBlending,
  DstAlphaFactor,
  Mesh,
  NoBlending,
  OneFactor,
  OneMinusSrcAlphaFactor,
  PerspectiveCamera,
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

const MAX_DPR = 1.5;
const MIN_DPR = 0.75;
const SEGMENTS = 160;

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
  vec2 b1 = vec2(aspect * (0.26 + 0.09 * sin(tm * 0.23)), 0.24 + 0.08 * cos(tm * 0.19));
  vec2 b2 = vec2(aspect * (0.76 + 0.07 * cos(tm * 0.17 + 1.3)), 0.5 + 0.1 * sin(tm * 0.21 + 0.7));
  vec2 b3 = vec2(aspect * (0.48 + 0.13 * sin(tm * 0.13 + 2.1)), 0.84 + 0.06 * cos(tm * 0.25));
  col = mix(col, P0, exp(-dot(n - b1, n - b1) * 7.0) * 0.42 * uFlow);
  col = mix(col, LINE, exp(-dot(n - b2, n - b2) * 5.0) * 0.34 * uFlow);
  col = mix(col, SOFT, exp(-dot(n - b3, n - b3) * 8.0) * 0.3 * uFlow);

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
  col = mix(col, LINE, lift * 0.26 * smoothstep(0.35, 1.0, uDusk));

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
uniform vec4 uA;
uniform vec4 uB;
uniform vec2 uShape;
varying float vS;
varying float vSide;
varying float vFacing;

const float TAU = 6.2831853;

// Im Licht: ein langer, flacher Schwung quer durchs Bild.
vec3 drift(float s, float t) {
  float v = uA.x
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
  float angle = uShape.y * aS + uTime * 0.4 * uA.w + uA.z;
  vec3 across = cos(angle) * side + sin(angle) * lift;
  float width = uShape.x * min(uHalf.x, uHalf.y) * (0.2 + 0.8 * sin(3.14159 * aS));
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
varying float vS;
varying float vSide;
varying float vFacing;

void main() {
  float soft = smoothstep(0.0, 0.6, 1.0 - abs(vSide));
  float fibre = 0.84 + 0.16 * sin(vSide * 38.0 + vS * 14.0);
  float sheen = pow(vFacing, 2.2);
  float pulse = exp(-pow((fract(vS * 1.4 - uTime * 0.07) - 0.5) * 5.0, 2.0));
  vec3 col = mix(uDeep, uCore, 0.25 + 0.75 * sheen);
  col = mix(col, uHi, clamp(smoothstep(0.78, 1.0, vFacing) * 0.7 + pulse * 0.18, 0.0, 1.0));
  float ends = smoothstep(0.0, 0.16, vS) * smoothstep(1.0, 0.78, vS);
  // Bänder berühren die Unterkante nie, damit die Naht zur Werkstatt sauber bleibt.
  float ground = smoothstep(0.04, 0.3, gl_FragCoord.y / uBufH);
  float a = soft * fibre * (0.2 + 0.8 * sheen) * ends * ground * uAlpha;
  gl_FragColor = vec4(col * a, a * mix(1.0, 0.4, uDusk));
}
`;

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

const RIBBONS: RibbonSpec[] = [
  { core: "#9fd0f8", deep: "#1576c4", hi: "#ffffff", a: [0.42, 0.12, 0.0, 1.0], b: [-0.72, 0.05, -0.28, 0.08], shape: [0.34, 5.2] },
  { core: "#198be8", deep: "#0b5ea8", hi: "#9fd0f8", a: [0.12, 0.14, 2.1, 0.9], b: [-0.28, 0.48, -0.2, 0.1], shape: [0.26, 6.4] },
  { core: "#9fd0f8", deep: "#198be8", hi: "#ffffff", a: [-0.18, 0.1, 4.2, 1.1], b: [0.18, 0.86, -0.34, 0.07], shape: [0.2, 4.1] },
];

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
  onReady: () => void;
  onLost: () => void;
};

export type HeroScene = {
  /** Nach Scroll oder Moduswechsel: prüft, ob gezeichnet werden muss. */
  wake: () => void;
  setEnabled: (enabled: boolean) => void;
  dispose: () => void;
};

export function createHeroScene(options: HeroSceneOptions): HeroScene | null {
  const { canvas, section, pin, portal } = options;

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

  const ribbonGeo = ribbonGeometry();
  const ribbons = RIBBONS.map((spec, i) => {
    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uExit: { value: 0 },
        uHalf: { value: half },
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
      transparent: true,
      depthTest: false,
      depthWrite: false,
      // Bänder nur dort, wo der Himmel schon deckt: außerhalb des Displays bleibt der Canvas leer.
      blending: CustomBlending,
      blendSrc: DstAlphaFactor,
      blendDst: OneMinusSrcAlphaFactor,
      blendSrcAlpha: ZeroFactor,
      blendDstAlpha: OneFactor,
    });
    const mesh = new Mesh(ribbonGeo, material);
    mesh.frustumCulled = false;
    mesh.renderOrder = 1 + i;
    scene.add(mesh);
    return { mesh, material, spec };
  });

  const geo = { top: 0, height: 1, dpr: 1 };
  let quality = Math.min(window.devicePixelRatio || 1, MAX_DPR);
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
  let samples: number[] = [];

  function measure() {
    const w = Math.max(1, pin.clientWidth);
    const h = Math.max(1, pin.clientHeight);
    const ratio = Math.max(MIN_DPR, Math.min(quality, MAX_DPR));
    // setSize/setPixelRatio sind durch sharpen-three.ts auf DPR 2 festgelegt; hier gilt 1.5.
    renderer.setDrawingBufferSize(w, h, ratio);
    geo.dpr = ratio;
    skyUniforms.uBuf.value.set(canvas.width, canvas.height);
    skyUniforms.uView.value.set(w, h);
    skyUniforms.uDpr.value = canvas.width / w;
    const s = portal.offsetWidth;
    skyUniforms.uPortal.value.set(portal.offsetLeft + s / 2, portal.offsetTop + s / 2, s);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    half.set(halfH * camera.aspect, halfH);
    for (const r of ribbons) r.material.uniforms.uBufH.value = canvas.height;
    geo.top = section.getBoundingClientRect().top + window.scrollY;
    geo.height = section.offsetHeight;
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
    const dusk = smooth(range(pd, 0.7, 0.98));
    skyUniforms.uOpen.value = range(p, PORTAL_START, PORTAL_START + PORTAL_SPAN);
    skyUniforms.uFlow.value = smooth(range(pd, 0.62, 0.72)) * (1 - smooth(range(pd, 0.8, 0.96)));
    skyUniforms.uDusk.value = dusk;
    skyUniforms.uSeam.value = smooth(range(p, 0.86, 0.96));
    skyUniforms.uTime.value = time;
    const alpha = smooth(range(pd, 0.625, 0.74)) * (1 - exitDamped * 0.5);
    const morph = smooth(range(pd, 0.73, 0.99));
    for (const r of ribbons) {
      const u = r.material.uniforms;
      u.uTime.value = time;
      u.uMorph.value = morph;
      u.uExit.value = exitDamped;
      u.uAlpha.value = alpha;
      u.uDusk.value = dusk;
    }

    renderer.render(scene, camera);
    drewVisible = p >= PORTAL_START - 0.01;
    adapt(dt);

    const settling = Math.abs(p - damped) > 1e-3;
    if (enabled && inView && (drewVisible || settling)) raf = requestAnimationFrame(draw);
    else last = 0;
  }

  /** Dynamische Auflösung: bleibt die Bildrate unter ~45 fps, wird der Puffer kleiner. */
  function adapt(dt: number) {
    if (quality <= MIN_DPR) return;
    samples.push(dt);
    if (samples.length < 60) return;
    const median = samples.sort((a, b) => a - b)[30];
    samples = [];
    if (median > 1 / 45) {
      quality = Math.max(MIN_DPR, quality * 0.75);
      measure();
    }
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

  const onLost = () => {
    if (disposed) return;
    ready = false;
    cancelAnimationFrame(raf);
    raf = 0;
    options.onLost();
  };
  canvas.addEventListener("webglcontextlost", onLost);

  measure();
  renderer
    .compileAsync(scene, camera)
    .then(() => {
      if (disposed) return;
      ready = true;
      const { p } = read();
      damped = p;
      draw(performance.now());
      options.onReady();
    })
    .catch(onLost);

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
      ribbonGeo.dispose();
      for (const r of ribbons) r.material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
