import * as THREE from "three";

/**
 * Kleines abstraktes System hinter der blauen Ankunft.
 * Die drei Teile treiben von rechts nach links, langsam, wie durch Wasser.
 * Kein Einschnappen in ein Ruhedreieck. Kein GLB, keine Werkstatt-Szene.
 */

export type ArrivalSystem = {
  setProgress: (p: number) => void;
  setPointer: (nx: number, ny: number, active: boolean) => void;
  dispose: () => void;
};

type Vec3 = [number, number, number];

const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 0],
];

/** Lockere Abstände — nicht als gesetztes Dreieck komponiert. */
const OFFSET_WIDE: Vec3[] = [
  [-0.18, 0.46, 0.18],
  [0.88, 0.08, -0.2],
  [0.28, -0.4, 0.12],
];
const OFFSET_NARROW: Vec3[] = [
  [-0.12, 0.24, 0.12],
  [0.46, 0.04, -0.14],
  [0.1, -0.34, 0.1],
];

const START_X_WIDE = 4.15;
const END_X_WIDE = 0.22;
const START_X_NARROW = 1.72;
const END_X_NARROW = 0.28;

/** Bei p=1 erst ~70 % der Strecke — noch in Bewegung oder gerade überquert. */
const TRAVEL_AT_END = 0.7;
const DRAG = [0.78, 1.12, 0.94];

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function easeDrag(raw: number) {
  const t = Math.min(1, Math.max(0, raw));
  return 1 - Math.pow(1 - t, 1.35);
}

export function createArrivalSystem(host: HTMLElement): ArrivalSystem {
  if (!hasWebGL()) {
    return { setProgress() {}, setPointer() {}, dispose() {} };
  }

  let disposed = false;
  let progress = 0;
  let raf = 0;
  let lastTime = 0;
  let startX = START_X_WIDE;
  let endX = END_X_WIDE;
  let offsets = OFFSET_WIDE;
  let onScreen = true;
  let pointerNear = 0;
  let tide = 0;
  let resizeTimer = 0;
  let pushSpan = 1.55;
  const RESIZE_WAIT = 140;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: (window.devicePixelRatio || 1) < 2,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.12, 30);
  camera.position.set(0, 0.08, 6.25);
  camera.lookAt(0, 0.02, 0);
  const group = new THREE.Group();
  scene.add(group);

  scene.add(new THREE.HemisphereLight("#d7ebfb", "#0a4e8f", 0.7));
  const key = new THREE.DirectionalLight("#ffffff", 0.85);
  key.position.set(1.6, 2.2, 2.8);
  scene.add(key);
  const fill = new THREE.PointLight("#7cbcf1", 1.4, 10, 2);
  fill.position.set(-1.6, -0.4, 1.4);
  scene.add(fill);
  const rim = new THREE.PointLight("#ffffff", 1.8, 8, 2);
  rim.position.set(0.4, -1.2, -1.6);
  scene.add(rim);

  const ice = new THREE.MeshStandardMaterial({
    color: "#b7d8f3",
    emissive: "#198be8",
    emissiveIntensity: 0.22,
    roughness: 0.42,
    metalness: 0.18,
    transparent: true,
    opacity: 0.96,
  });
  const glass = ice.clone();
  glass.color = new THREE.Color("#e8f4ff");
  glass.emissive = new THREE.Color("#7cbcf1");
  glass.opacity = 0.7;
  glass.roughness = 0.18;

  const nodes = OFFSET_WIDE.map((off, i) => {
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(i === 1 ? 0.28 : 0.22, 0), ice.clone());
    mesh.position.set(START_X_WIDE + off[0], off[1], off[2]);
    group.add(mesh);
    return mesh;
  });

  const drifted = nodes.map((node) => node.position.clone());

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.09, 1), glass);
  group.add(core);

  const tubes = LINKS.map(([a, b]) => {
    const geo = new THREE.CylinderGeometry(0.018, 0.018, 1, 8, 1, true);
    const mat = new THREE.MeshBasicMaterial({
      color: "#9fd0f8",
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);
    return { mesh, a, b };
  });

  const beads = LINKS.map(([a, b], i) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 10, 8),
      new THREE.MeshBasicMaterial({ color: i === 1 ? "#ffffff" : "#b9e4ff" }),
    );
    group.add(mesh);
    return { mesh, a, b, phase: i / 3 };
  });

  const desired = new THREE.Vector3();
  const tmpA = new THREE.Vector3();
  const tmpB = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const yAxis = new THREE.Vector3(0, 1, 0);

  function placeTube(
    mesh: THREE.Mesh,
    a: THREE.Vector3,
    b: THREE.Vector3,
    visible: number,
  ) {
    tmp.copy(b).sub(a);
    const len = tmp.length();
    mesh.scale.set(1, Math.max(0.001, len), 1);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    if (len > 0.0001) {
      quat.setFromUnitVectors(yAxis, tmp.normalize());
      mesh.quaternion.copy(quat);
    }
    const mat = mesh.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.18 + visible * 0.42;
  }

  function applySize() {
    const w = Math.max(1, host.clientWidth);
    const h = Math.max(1, host.clientHeight);
    renderer.setSize(w, h, true);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const portrait = w / h < 0.9;
    startX = portrait ? START_X_NARROW : START_X_WIDE;
    endX = portrait ? END_X_NARROW : END_X_WIDE;
    offsets = portrait ? OFFSET_NARROW : OFFSET_WIDE;
    pushSpan = portrait ? 0.7 : 1.55;
    group.position.set(portrait ? 0.12 : 0, portrait ? -0.08 : 0, 0);
    group.scale.setScalar(portrait ? 0.62 : 1);
  }

  function resize() {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(applySize, RESIZE_WAIT);
  }

  function kick() {
    if (disposed || raf || document.hidden || !onScreen) return;
    lastTime = 0;
    raf = window.requestAnimationFrame(frame);
  }

  function stop() {
    if (!raf) return;
    window.cancelAnimationFrame(raf);
    raf = 0;
    lastTime = 0;
  }

  function pose(p: number, time: number) {
    const dt = lastTime ? Math.min(0.048, Math.max(0, time - lastTime)) : 0.016;
    lastTime = time;

    const travel = TRAVEL_AT_END * easeDrag(p);
    const crawl = THREE.MathUtils.smoothstep(p, 0.35, 1) * (1 - Math.exp(-time * 0.07)) * 0.26;
    const tideK = 1 - Math.exp(-dt / 0.9);
    tide += (pointerNear - tide) * tideK;
    const cx = startX + (endX - startX) * travel - crawl + tide * pushSpan;
    const live = THREE.MathUtils.smoothstep(p, 0.04, 0.28);

    nodes.forEach((node, i) => {
      const [ox, oy, oz] = offsets[i];
      desired.set(
        cx + ox + Math.sin(time * 0.21 + i * 1.4) * 0.035,
        0.06 + oy + Math.sin(time * 0.31 + i * 1.9) * 0.055,
        oz + Math.sin(time * 0.17 + i) * 0.04,
      );
      const k = 1 - Math.exp(-dt / DRAG[i]);
      drifted[i].lerp(desired, k);
      node.position.copy(drifted[i]);
      node.scale.setScalar(1);
      node.rotation.y = time * (0.055 + i * 0.012);
      node.rotation.x = time * 0.028 + Math.sin(time * 0.19 + i) * 0.08;
      const mat = node.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.2 + live * 0.45;
      mat.opacity = 0.96;
    });

    tmp.set(0, 0, 0);
    drifted.forEach((pos) => tmp.add(pos));
    core.position.copy(tmp).multiplyScalar(1 / drifted.length);
    core.scale.setScalar(0.88 + Math.sin(time * 0.7) * 0.04);
    core.rotation.y = time * 0.12;
    (core.material as THREE.MeshStandardMaterial).opacity = 0.22 + live * 0.4;

    tubes.forEach((tube) => {
      placeTube(tube.mesh, drifted[tube.a], drifted[tube.b], live);
    });

    beads.forEach((bead) => {
      const t = (bead.phase + time * 0.035 * (0.4 + live)) % 1;
      tmpA.copy(drifted[bead.a]);
      tmpB.copy(drifted[bead.b]);
      bead.mesh.position.lerpVectors(tmpA, tmpB, t);
      bead.mesh.scale.setScalar(0.4 + live * 0.6);
      bead.mesh.visible = live > 0.04;
    });

    key.intensity = 0.55 + live * 1.05;
    fill.intensity = 0.7 + live * 2.05;
    rim.intensity = 0.5 + live * 1.95;

    group.rotation.y = Math.sin(time * 0.09) * 0.035;
    group.rotation.x = Math.sin(time * 0.07) * 0.018;
  }

  function frame(ms: number) {
    raf = 0;
    if (disposed) return;
    if (document.hidden || !onScreen) return;
    if (progress < 0.008) {
      renderer.clear();
      return;
    }
    pose(progress, ms / 1000);
    renderer.render(scene, camera);
    raf = window.requestAnimationFrame(frame);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      if (onScreen) kick();
      else stop();
    },
    { threshold: 0.02 },
  );
  io.observe(host);
  const onVisible = () => {
    if (document.hidden) stop();
    else kick();
  };
  document.addEventListener("visibilitychange", onVisible);
  applySize();
  kick();

  return {
    setProgress(next) {
      progress = Math.min(1, Math.max(0, next));
      if (progress >= 0.008) kick();
    },
    setPointer(nx, ny, active) {
      if (!active) {
        pointerNear = 0;
        return;
      }
      const dx = nx - 0.64;
      const dy = (ny - 0.48) * 1.15;
      pointerNear = Math.min(1, Math.max(0, 1 - Math.hypot(dx, dy) / 0.44));
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      stop();
      if (resizeTimer) window.clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVisible);
      ro.disconnect();
      io.disconnect();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const mat of mats) mat.dispose();
      });
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    },
  };
}
