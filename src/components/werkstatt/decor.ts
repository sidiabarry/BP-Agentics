import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Optionale zusätzliche 3D-Objekte (Blender-Erweiterung, siehe Plan §9).
 *
 * Die Kernszene (Raum, Roboter, Monitor, Tablet) bleibt reiner Three.js-Code.
 * Für einzelne Deko-Objekte (3D-Firmenlogo, Werkzeuge, Regal-Deko) werden hier
 * `.glb`-Dateien registriert, die unter `public/models/` liegen. Ohne Einträge
 * tut diese Funktion nichts — sie blockiert die Hauptszene nicht.
 *
 * Neues Objekt ergänzen:
 *   { url: "/models/bp-logo.glb", position: [x, y, z], scale: 1 }
 */
type DecorAsset = {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

const decorAssets: DecorAsset[] = [
  // Hier werden von mir erzeugte Blender-Objekte eingetragen, sobald verfügbar.
];

export function loadDecorAssets(scene: THREE.Scene) {
  if (decorAssets.length === 0) return;
  const loader = new GLTFLoader();
  for (const asset of decorAssets) {
    loader.load(
      asset.url,
      (gltf) => {
        gltf.scene.position.set(...asset.position);
        if (asset.rotation) gltf.scene.rotation.set(...asset.rotation);
        gltf.scene.scale.setScalar(asset.scale ?? 1);
        gltf.scene.traverse((o) => {
          const mesh = o as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.warn(`Werkstatt: Deko-Objekt konnte nicht geladen werden (${asset.url})`, error);
      },
    );
  }
}
