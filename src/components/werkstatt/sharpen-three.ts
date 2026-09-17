import * as THREE from "three";

/**
 * Phones used lite mode with pixel ratio 1.5, then CSS-stretched the canvas.
 * Keep lite for fps/lights, but always draw at min(devicePixelRatio, 2).
 */
function applyWerkstattSharpness() {
  if (typeof window === "undefined") return;
  const proto = THREE.WebGLRenderer.prototype as THREE.WebGLRenderer & {
    __bpWerkstattSharp?: boolean;
  };
  if (proto.__bpWerkstattSharp) return;
  proto.__bpWerkstattSharp = true;

  const cap = () => Math.min(window.devicePixelRatio || 1, 2);

  const origSetPixelRatio = THREE.WebGLRenderer.prototype.setPixelRatio;
  THREE.WebGLRenderer.prototype.setPixelRatio = function cappedPixelRatio() {
    return origSetPixelRatio.call(this, cap());
  };

  const origSetSize = THREE.WebGLRenderer.prototype.setSize;
  THREE.WebGLRenderer.prototype.setSize = function cappedSetSize(
    width: number,
    height: number,
    updateStyle?: boolean,
  ) {
    origSetPixelRatio.call(this, cap());
    return origSetSize.call(this, width, height, updateStyle);
  };
}

applyWerkstattSharpness();
