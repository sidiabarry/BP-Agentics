import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Zusätzliche 3D-Objekte für die Werkstatt (.glb aus Blender oder einem anderen
 * 3D-Werkzeug). Die Kernszene bleibt reiner Three.js-Code — hier kommt nur
 * Ausstattung dazu.
 *
 * Der Loader macht die Modelle absichtlich robust nutzbar:
 *  - er zentriert sie selbst (viele Exporte liegen nicht im Ursprung),
 *  - skaliert auf eine gewünschte Breite in Szeneneinheiten (`fitWidth`),
 *  - wirft Kameras und Lichter aus der Datei weg, damit ein Export die
 *    Ausleuchtung der Werkstatt nicht durcheinanderbringt.
 * Damit passt jedes weitere Modell ohne Nacharbeit in der Datei selbst.
 */
type DecorAsset = {
  url: string;
  /** Zielposition des Modellmittelpunkts in Szeneneinheiten. */
  position: [number, number, number];
  rotation?: [number, number, number];
  /** Breite in Szeneneinheiten; das Modell wird proportional darauf skaliert. */
  fitWidth?: number;
  /**
   * Modell bereits in Werkstatt-Koordinaten gebaut: nicht zentrieren, nicht
   * skalieren, einfach an Ort und Stelle einsetzen.
   */
  keepOrigin?: boolean;
  /** Leichtes Eigenleuchten, damit dunkle Wandobjekte nicht absaufen. */
  emissive?: number;
  name?: string;
};

const decorAssets: DecorAsset[] = [
  {
    url: "/models/bp-logo.glb",
    name: "BP Agentics Logo an der Rückwand",
    // Freie Wandfläche oben rechts über dem Fenster: dort liegt weder die
    // Textspalte noch ein Stationsschild noch eine Hängelampe davor.
    position: [4.3, 4.35, -5.93],
    fitWidth: 1.85,
    emissive: 0.4,
  },
  {
    url: "/models/werkstatt-deko.glb",
    name: "Ausstattung: Kaffeetasse, Pflanzen, Aktenordner, Kabel",
    // In Blender direkt in Werkstatt-Koordinaten gebaut.
    position: [0, 0, 0],
    keepOrigin: true,
  },
];

export function loadDecorAssets(scene: THREE.Scene) {
  if (decorAssets.length === 0) return;
  const loader = new GLTFLoader();

  for (const asset of decorAssets) {
    loader.load(
      asset.url,
      (gltf) => {
        const root = gltf.scene;

        // Kameras und Lichter aus dem Export entfernen — die Werkstatt leuchtet selbst.
        for (const stray of [...root.children]) {
          stray.traverse((o) => {
            if ((o as THREE.Light).isLight || (o as THREE.Camera).isCamera) o.removeFromParent();
          });
        }

        // Auf Zielbreite skalieren und den Mittelpunkt in den Ursprung holen.
        // Bei keepOrigin bleibt beides unangetastet: das Modell bringt seine
        // Position selbst mit.
        if (!asset.keepOrigin) {
          const box = new THREE.Box3().setFromObject(root);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          const scale = asset.fitWidth && size.x > 0 ? asset.fitWidth / size.x : 1;
          root.scale.setScalar(scale);
          root.position.copy(center).multiplyScalar(-scale);
        }

        root.traverse((o) => {
          const mesh = o as THREE.Mesh;
          if (!mesh.isMesh) return;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          if (asset.emissive) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            for (const m of materials) {
              const standard = m as THREE.MeshStandardMaterial;
              if (!standard?.isMeshStandardMaterial) continue;
              standard.emissive = new THREE.Color(standard.color);
              standard.emissiveIntensity = asset.emissive;
            }
          }
        });

        // Ein Träger-Objekt trägt Position und Drehung, damit die Zentrierung erhalten bleibt.
        const holder = new THREE.Group();
        holder.name = asset.name ?? asset.url;
        holder.position.set(...asset.position);
        if (asset.rotation) holder.rotation.set(...asset.rotation);
        holder.add(root);
        scene.add(holder);
      },
      undefined,
      (error) => {
        console.warn(`Werkstatt: Deko-Objekt konnte nicht geladen werden (${asset.url})`, error);
      },
    );
  }
}
