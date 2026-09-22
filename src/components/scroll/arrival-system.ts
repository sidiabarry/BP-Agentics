import * as THREE from "three";

/**
 * Kleines abstraktes System hinter der blauen Ankunft.
 * Drei Teile fliegen durchs Bild (von einer Kante über das Feld in die Ruhe),
 * gebunden an die Hero-Scrollfahrt (--p). Kein GLB, keine Werkstatt-Szene.
 */

export type ArrivalSystem = {
  setProgress: (p: number) => void;
  dispose: () => void;
};

type Vec3 = [number, number, number];

const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 0],
];

/** Start links außerhalb, VIA quer durchs Feld (näher an der Kamera), REST lesbar. */
const START_WIDE: Vec3[] = [
  [-4.55, 1.58, 1.25],
  [-5.15, 0.32, 0.62],
  [-4.2, -1.28, 1.05],
];
const VIA_WIDE: Vec3[] = [
  [-0.28, 0.92, 1.55],
  [0.22, 0.18, 1.05],
  [-0.42, -0.22, 1.32],
];
const REST_WIDE: Vec3[] = [
  [0.72, 0.48, 0.16],
  [2.02, 0.1, -0.22],
  [1.08, -0.62, 0.2],
];

const START_NARROW: Vec3[] = [
  [-2.95, 1.12, 1.15],
  [-3.25, 0.18, 0.52],
  [-2.7, -1.02, 0.98],
];
const VIA_NARROW: Vec3[] = [
  [-0.82, 0.48, 1.22],
  [0.08, 0.1, 0.78],
  [-0.32, -0.18, 1.05],
];
const REST_NARROW: Vec3[] = [
  [-0.62, 0.26, 0.12],
  [0.76, 0.14, -0.16],
  [0.06, -0.5, 0.16],
];

const STAGGER = 0.1;
const FLIGHT = 0.8;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function flightT(p: number, i: number) {
  return Math.min(1, Math.max(0, (p - i * STAGGER) / FLIGHT));
}

function bezier(out: THREE.Vector3, a: Vec3, b: Vec3, c: Vec3, t: number) {
  const u = 1 - t;
  out.set(
    u * u * a[0] + 2 * u * t * b[0] + t * t * c[0],
    u * u * a[1] + 2 * u * t * b[1] + t * t * c[1],
    u * u * a[2] + 2 * u * t * b[2] + t * t * c[2],
  );
}

export function createArrivalSystem(host: HTMLElement): ArrivalSystem {
  if (!hasWebGL()) {
    return { setProgress() {}, dispose() {} };
  }

  let disposed = false;
  let progress = 0;
  let raf = 0;
  let start = START_WIDE;
  let via = VIA_WIDE;
  let rest = REST_WIDE;

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

  const nodes = START_WIDE.map((pos, i) => {
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(i === 1 ? 0.28 : 0.22, 0), ice.clone());
    mesh.position.set(...pos);
    group.add(mesh);
    return mesh;
  });

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
    mat.opacity = 0.22 + visible * 0.5;
  }

  function resize() {
    const w = Math.max(1, host.clientWidth);
    const h = Math.max(1, host.clientHeight);
    renderer.setSize(w, h, true);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const portrait = w / h < 0.9;
    start = portrait ? START_NARROW : START_WIDE;
    via = portrait ? VIA_NARROW : VIA_WIDE;
    rest = portrait ? REST_NARROW : REST_WIDE;
    group.position.set(0, 0, 0);
    group.scale.setScalar(portrait ? 0.78 : 1);
  }

  function pose(p: number, time: number) {
    const live = THREE.MathUtils.smoothstep(p, 0.08, 0.55);
    const idle = THREE.MathUtils.smoothstep(p, 0.88, 1);

    nodes.forEach((node, i) => {
      const t = flightT(p, i);
      bezier(node.position, start[i], via[i], rest[i], t);
      node.scale.setScalar(1);
      const spin = 0.28 + (1 - t) * 0.85 + idle * 0.55;
      node.rotation.y = time * (0.2 + i * 0.05) * spin;
      node.rotation.x = time * 0.09 * (0.25 + (1 - t) * 0.6);
      const mat = node.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.2 + live * 0.5;
      mat.opacity = 0.96;
    });

    tmp.set(0, 0, 0);
    nodes.forEach((node) => tmp.add(node.position));
    core.position.copy(tmp).multiplyScalar(1 / nodes.length);
    core.scale.setScalar(0.85 + Math.sin(time * 1.6) * idle * 0.1);
    core.rotation.y = time * 0.35;
    (core.material as THREE.MeshStandardMaterial).opacity = 0.22 + live * 0.42;

    tubes.forEach((tube) => {
      placeTube(tube.mesh, nodes[tube.a].position, nodes[tube.b].position, live);
    });

    beads.forEach((bead) => {
      const t = (bead.phase + time * 0.08 * (0.25 + live)) % 1;
      tmpA.copy(nodes[bead.a].position);
      tmpB.copy(nodes[bead.b].position);
      bead.mesh.position.lerpVectors(tmpA, tmpB, t);
      bead.mesh.scale.setScalar(0.35 + live * 0.65);
      bead.mesh.visible = live > 0.04;
    });

    key.intensity = 0.55 + live * 1.05;
    fill.intensity = 0.7 + live * 2.05;
    rim.intensity = 0.5 + live * 1.95;

    group.rotation.y = Math.sin(time * 0.22) * 0.1 * idle;
    group.rotation.x = Math.sin(time * 0.17) * 0.04 * idle;
  }

  function frame(ms: number) {
    if (disposed) return;
    raf = window.requestAnimationFrame(frame);
    if (document.hidden) return;
    if (progress < 0.008) {
      renderer.clear();
      return;
    }
    pose(progress, ms / 1000);
    renderer.render(scene, camera);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();
  raf = window.requestAnimationFrame(frame);

  return {
    setProgress(next) {
      progress = Math.min(1, Math.max(0, next));
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      window.cancelAnimationFrame(raf);
      ro.disconnect();
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
