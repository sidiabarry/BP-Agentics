import type * as THREE from "three";

/**
 * Der Roboter ist bewusst als unveränderter, unbetypter `.js`-Import belassen
 * (siehe Plan §5) — dichter, in sich geschlossener Geometrie-Code mit genau
 * einer Aufrufstelle. Diese Datei typisiert nur die öffentliche Grenze.
 */
export function createRobot(
  three: typeof THREE,
  parent?: THREE.Object3D,
): {
  group: THREE.Group;
  animate: (t: number, reduced: boolean) => void;
};
