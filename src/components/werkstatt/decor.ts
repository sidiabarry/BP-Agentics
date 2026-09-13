import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Ausstattung aus `werkstatt-deko.glb`, zerlegt nach Objektnamen.
 * Y kommt aus den Bounding-Boxen der benannten Flächen in der Szene
 * (`Tischplatte`, `Regal_unten` / `_mitte` / `_oben`) — nicht aus den
 * alten Raum-Koordinaten im GLB. Das Wandlogo sitzt mittig hinter
 * dem Tablet. `Kabel_*` bleibt weg, weil `scene-engine.ts` den Schlauch
 * zum CRT schon baut.
 */

type SurfaceId = "table" | "shelfLow" | "shelfMid" | "shelfHigh";

type DecorPiece = {
  name: string;
  surface: SurfaceId;
  /** Mittelpunkt auf der Fläche (X/Z). */
  x: number;
  z: number;
  fitWidth: number;
  rotationY?: number;
  /** Auf die Oberkante eines schon gesetzten Teils setzen (Stapel). */
  stackOn?: string;
};

const SURFACE_MESH: Record<SurfaceId, string> = {
  table: "Tischplatte",
  shelfLow: "Regal_unten",
  shelfMid: "Regal_mitte",
  shelfHigh: "Regal_oben",
};

/**
 * Pflanzen hinten auf den Regalen; Tasse links am CRT neben der Tastatur;
 * Ordner rechts vom Roboter auf der Platte, nicht vor ihm.
 */
const DECOR_PIECES: DecorPiece[] = [
  { name: "Pflanze_Regal", surface: "shelfHigh", x: -2.72, z: -5.48, fitWidth: 0.95 },
  { name: "Pflanze_Tisch", surface: "shelfMid", x: -4.35, z: -5.48, fitWidth: 0.62 },
  { name: "Kaffeetasse", surface: "table", x: -2.12, z: 1.18, fitWidth: 0.2, rotationY: -0.42 },
  { name: "Ordner_1", surface: "table", x: 2.12, z: -0.42, fitWidth: 0.15, rotationY: 0.1 },
  { name: "Ordner_2", surface: "table", x: 2.24, z: -0.4, fitWidth: 0.14, rotationY: 0.08 },
  { name: "Ordner_3", surface: "table", x: 2.36, z: -0.41, fitWidth: 0.16, rotationY: 0.12 },
  { name: "Ordner_liegend_1", surface: "table", x: 2.22, z: -0.88, fitWidth: 0.34, rotationY: 0.22 },
  {
    name: "Ordner_liegend_2",
    surface: "table",
    x: 2.18,
    z: -0.84,
    fitWidth: 0.34,
    rotationY: 0.28,
    stackOn: "Ordner_liegend_1",
  },
];

function surfaceTopY(scene: THREE.Scene, meshName: string): number | null {
  const obj = scene.getObjectByName(meshName);
  if (!obj) return null;
  obj.updateWorldMatrix(true, true);
  const box = new THREE.Box3().setFromObject(obj);
  if (!Number.isFinite(box.max.y)) return null;
  return box.max.y;
}

/** Tisch- und Regal-Oberkante aus den Mesh-Bounding-Boxen, nicht geraten. */
export function measureStudioSurfaces(scene: THREE.Scene): Partial<Record<SurfaceId, number>> {
  const tops: Partial<Record<SurfaceId, number>> = {};
  for (const [id, meshName] of Object.entries(SURFACE_MESH) as [SurfaceId, string][]) {
    const y = surfaceTopY(scene, meshName);
    if (y !== null) tops[id] = y;
  }
  return tops;
}

function findPiece(root: THREE.Object3D, name: string): THREE.Object3D | null {
  return root.children.find((child) => child.name === name) ?? root.getObjectByName(name) ?? null;
}

function stripCamerasAndLights(root: THREE.Object3D) {
  root.traverse((o) => {
    if ((o as THREE.Light).isLight || (o as THREE.Camera).isCamera) o.removeFromParent();
  });
}

function seatOnSurface(holder: THREE.Group, sitY: number) {
  holder.updateWorldMatrix(true, true);
  const box = new THREE.Box3().setFromObject(holder);
  holder.position.y += sitY + 0.001 - box.min.y;
}

function sitHeight(scene: THREE.Scene, spec: DecorPiece, surfaceY: number): number {
  if (!spec.stackOn) return surfaceY;
  const under = scene.getObjectByName(spec.stackOn);
  if (!under) return surfaceY;
  under.updateWorldMatrix(true, true);
  return new THREE.Box3().setFromObject(under).max.y;
}

function placePiece(scene: THREE.Scene, source: THREE.Object3D, spec: DecorPiece, sitY: number) {
  const piece = source.clone(true);
  piece.position.set(0, 0, 0);
  piece.rotation.set(0, 0, 0);
  piece.scale.set(1, 1, 1);
  piece.updateWorldMatrix(true, true);

  const box = new THREE.Box3().setFromObject(piece);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  piece.position.sub(center);
  const scale = spec.fitWidth / Math.max(size.x, 1e-4);
  piece.scale.multiplyScalar(scale);
  piece.position.multiplyScalar(scale);

  piece.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const holder = new THREE.Group();
  holder.name = spec.name;
  holder.position.set(spec.x, 0, spec.z);
  if (spec.rotationY) holder.rotation.y = spec.rotationY;
  holder.add(piece);
  scene.add(holder);
  seatOnSurface(holder, sitHeight(scene, spec, sitY));
}

function loadWallLogo(scene: THREE.Scene) {
  const loader = new GLTFLoader();
  loader.load(
    "/models/bp-logo.glb",
    (gltf) => {
      const root = gltf.scene;
      stripCamerasAndLights(root);
      const box = new THREE.Box3().setFromObject(root);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const scale = 2.15 / Math.max(size.x, 1e-4);
      root.scale.setScalar(scale);
      root.position.copy(center).multiplyScalar(-scale);
      root.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.castShadow = true;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of materials) {
          const standard = m as THREE.MeshStandardMaterial;
          if (!standard?.isMeshStandardMaterial) continue;
          standard.emissive = new THREE.Color(standard.color);
          standard.emissiveIntensity = 0.55;
        }
      });
      const holder = new THREE.Group();
      holder.name = "BP Wandlogo";
      holder.position.set(0, 2.52, -5.92);
      holder.add(root);
      scene.add(holder);
    },
    undefined,
    (error) => {
      console.warn("Werkstatt: Wandlogo konnte nicht geladen werden (/models/bp-logo.glb)", error);
    },
  );
}

export function loadDecorAssets(scene: THREE.Scene) {
  loadWallLogo(scene);
  const surfaces = measureStudioSurfaces(scene);
  const loader = new GLTFLoader();

  loader.load(
    "/models/werkstatt-deko.glb",
    (gltf) => {
      const library = gltf.scene;
      stripCamerasAndLights(library);

      for (const spec of DECOR_PIECES) {
        const sitY = surfaces[spec.surface];
        if (sitY === undefined) {
          console.warn(`Werkstatt: Fläche ${SURFACE_MESH[spec.surface]} fehlt — ${spec.name} nicht gesetzt.`);
          continue;
        }
        const source = findPiece(library, spec.name);
        if (!source) {
          console.warn(`Werkstatt: Mesh ${spec.name} fehlt in werkstatt-deko.glb.`);
          continue;
        }
        placePiece(scene, source, spec, sitY);
      }
    },
    undefined,
    (error) => {
      console.warn("Werkstatt: Deko-Objekt konnte nicht geladen werden (/models/werkstatt-deko.glb)", error);
    },
  );
}
