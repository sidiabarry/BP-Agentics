import * as THREE from "three";

/**
 * Kleines abstraktes System hinter der blauen Ankunft.
 * Drei verbundene Teile, Licht, Bewegung — kein GLB, keine Werkstatt-Szene.
 * Fortschritt kommt von der bestehenden Hero-Scrollfahrt (--p).
 */

export type ArrivalSystem = {
  setProgress: (p: number) => void;
  dispose: () => void;
};

const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 0],
];

const REST: Array<[number, number, number]> = [
  [-1.05, 0.62, 0.12],
  [1.12, 0.28, -0.22],
  [0.08, -0.98, 0.18],
];

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function createArrivalSystem(host: HTMLElement): ArrivalSystem {
  if (!hasWebGL()) {
    return { setProgress() {}, dispose() {} };
  }

  let disposed = false;
  let progress = 0;
  let raf = 0;

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

  const nodes = REST.map((pos, i) => {
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
    mat.opacity = 0.18 + visible * 0.55;
  }

  function resize() {
    const w = Math.max(1, host.clientWidth);
    const h = Math.max(1, host.clientHeight);
    renderer.setSize(w, h, true);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const portrait = w / h < 0.9;
    group.position.set(portrait ? 0.15 : 1.05, portrait ? 0.08 : -0.08, 0);
    group.scale.setScalar(portrait ? 0.72 : 1);
  }

  function pose(p: number, time: number) {
    const appear = THREE.MathUtils.smoothstep(p, 0, 0.42);
    const linked = THREE.MathUtils.smoothstep(p, 0.18, 0.72);
    const live = THREE.MathUtils.smoothstep(p, 0.45, 1);
    const idle = live * (0.35 + 0.65 * Math.min(1, Math.max(0, p - 0.85) / 0.15));

    nodes.forEach((node, i) => {
      const [x, y, z] = REST[i];
      const scatter = 1.85 - appear * 0.85;
      node.position.set(x * scatter, y * scatter, z * scatter);
      const s = 0.12 + appear * 0.88;
      node.scale.setScalar(s);
      node.rotation.y = time * (0.18 + i * 0.05) * (0.25 + idle);
      node.rotation.x = time * 0.08 * (0.2 + idle);
      const mat = node.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.18 + live * 0.55;
      mat.opacity = 0.25 + appear * 0.7;
    });

    core.scale.setScalar(0.2 + appear * 0.9 + Math.sin(time * 1.6) * idle * 0.08);
    core.rotation.y = time * 0.35;
    (core.material as THREE.MeshStandardMaterial).opacity = 0.15 + linked * 0.45;

    tubes.forEach((tube) => {
      placeTube(tube.mesh, nodes[tube.a].position, nodes[tube.b].position, linked);
    });

    beads.forEach((bead) => {
      const t = (bead.phase + time * 0.08 * (0.2 + live)) % 1;
      tmpA.copy(nodes[bead.a].position);
      tmpB.copy(nodes[bead.b].position);
      bead.mesh.position.lerpVectors(tmpA, tmpB, t);
      bead.mesh.scale.setScalar(linked);
      bead.mesh.visible = linked > 0.05;
    });

    key.intensity = 0.45 + live * 1.15;
    fill.intensity = 0.6 + live * 2.2;
    rim.intensity = 0.4 + live * 2.1;

    const camZ = 6.4 - live * 1.15;
    const camX = 0.15 - live * 0.2;
    camera.position.set(camX, 0.12, camZ);
    camera.lookAt(group.position.x * 0.15, 0.04, 0);
    group.rotation.y = Math.sin(time * 0.22) * 0.12 * idle;
    group.rotation.x = Math.sin(time * 0.17) * 0.05 * idle;
  }

  function frame(ms: number) {
    if (disposed) return;
    raf = window.requestAnimationFrame(frame);
    if (document.hidden) return;
    if (progress < 0.012) {
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
