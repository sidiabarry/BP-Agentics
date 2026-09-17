#!/usr/bin/env python3
"""Apply Werkstatt pixel-ratio + CanvasTexture LinearFilter patch in place."""
from pathlib import Path

p = Path("src/components/werkstatt/scene-engine.ts")
t = p.read_text()
if t.strip() == "PLACEHOLDER" or (len(t) < 100 and "PLACEHOLDER" in t):
    raise SystemExit("refusing to patch PLACEHOLDER file")
if (
    "const pixelRatio = () => Math.min(window.devicePixelRatio || 1, 2)" in t
    and "screenTex.generateMipmaps = false" in t
    and "chatTex.generateMipmaps = false" in t
):
    print("already patched")
    raise SystemExit(0)


def sub(old: str, new: str, label: str) -> None:
    global t
    if old not in t:
        raise SystemExit(f"anchor not found: {label}")
    t = t.replace(old, new, 1)
    print("ok", label)


sub(
    """  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: !lite || window.devicePixelRatio < 2,
""",
    """  const pixelRatio = () => Math.min(window.devicePixelRatio || 1, 2);
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: pixelRatio() < 2,
""",
    "renderer",
)
sub(
    "  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 1.75));\n",
    "  renderer.setPixelRatio(pixelRatio());\n",
    "setPixelRatio",
)
sub(
    """  const screenTex = new THREE.CanvasTexture(screenCanvas);
  screenTex.colorSpace = THREE.SRGBColorSpace;
""",
    """  const screenTex = new THREE.CanvasTexture(screenCanvas);
  screenTex.colorSpace = THREE.SRGBColorSpace;
  screenTex.generateMipmaps = false;
  screenTex.minFilter = THREE.LinearFilter;
  screenTex.magFilter = THREE.LinearFilter;
""",
    "screenTex",
)
sub(
    """  const chatTex = new THREE.CanvasTexture(chatCanvas);
  chatTex.colorSpace = THREE.SRGBColorSpace;
""",
    """  const chatTex = new THREE.CanvasTexture(chatCanvas);
  chatTex.colorSpace = THREE.SRGBColorSpace;
  chatTex.generateMipmaps = false;
  chatTex.minFilter = THREE.LinearFilter;
  chatTex.magFilter = THREE.LinearFilter;
""",
    "chatTex",
)
sub(
    """  function resize() {
    const { w, h } = size();
    renderer.setSize(w, h, false);
""",
    """  function resize() {
    const { w, h } = size();
    renderer.setPixelRatio(pixelRatio());
    renderer.setSize(w, h, false);
""",
    "resize",
)
p.write_text(t)
print("patched ok", p.stat().st_size)
