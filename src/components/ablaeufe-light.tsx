"use client";

import { useEffect, useRef } from "react";

export function AblaeufeLight({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dead = false;
    let frame = 0;

    const start = async () => {
      const THREE = await import("three");
      if (dead) return;

      const rendererInstance = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      rendererInstance.outputColorSpace = THREE.SRGBColorSpace;
      rendererInstance.toneMapping = THREE.ACESFilmicToneMapping;
      rendererInstance.toneMappingExposure = 1.05;
      rendererInstance.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
      camera.position.set(0, 0, 7.2);

      scene.add(new THREE.HemisphereLight("#f3efe6", "#0c3f73", 0.55));
      const key = new THREE.DirectionalLight("#ffffff", 0.7);
      key.position.set(2.4, 3.2, 4);
      scene.add(key);
      const glow = new THREE.PointLight("#198be8", 8, 14, 2);
      glow.position.set(-2.2, 0.4, 2.4);
      scene.add(glow);
      const warm = new THREE.PointLight("#f3efe6", 3.2, 12, 2);
      warm.position.set(2.6, -0.8, 2);
      scene.add(warm);

      const glass = new THREE.MeshPhysicalMaterial({
        color: "#198be8",
        roughness: 0.18,
        metalness: 0.04,
        transmission: 0.72,
        thickness: 0.8,
        transparent: true,
        opacity: 0.9,
        emissive: "#198be8",
        emissiveIntensity: 0.35,
      });
      const ink = new THREE.MeshStandardMaterial({
        color: "#14161c",
        roughness: 0.42,
        metalness: 0.12,
        emissive: "#198be8",
        emissiveIntensity: 0.18,
      });

      const meshes: InstanceType<typeof THREE.Mesh>[] = [];
      const radii = [0.62, 0.58, 0.28, 0.12];
      const specs = [
        { geo: new THREE.IcosahedronGeometry(radii[0], 1), mat: glass },
        { geo: new THREE.TorusGeometry(radii[1], 0.018, 12, 48), mat: glass },
        { geo: new THREE.IcosahedronGeometry(radii[2], 0), mat: ink },
        { geo: new THREE.SphereGeometry(radii[3], 20, 16), mat: ink },
      ];
      for (const spec of specs) {
        const mesh = new THREE.Mesh(spec.geo, spec.mat);
        scene.add(mesh);
        meshes.push(mesh);
      }

      const depthHalf = (z: number) => {
        const distance = camera.position.z - z;
        const halfH = Math.tan((32 * Math.PI) / 180 / 2) * distance;
        return { halfH, halfW: halfH * camera.aspect };
      };
      const toWorld = (px: number, py: number, z: number, width: number, height: number) => {
        const { halfW, halfH } = depthHalf(z);
        const ndcX = (px / width) * 2 - 1;
        const ndcY = -((py / height) * 2 - 1);
        return { x: ndcX * halfW, y: ndcY * halfH };
      };

      const place = () => {
        const width = host.clientWidth;
        const height = host.clientHeight;
        if (width < 2 || height < 2) return;
        const hostRect = host.getBoundingClientRect();
        let textRight = hostRect.left;
        for (const node of host.querySelectorAll("p")) {
          const box = node.getBoundingClientRect();
          if (box.width < 2 || box.height < 2) continue;
          textRight = Math.max(textRight, box.right);
        }
        const gap = Math.max(28, width * 0.035);
        const fieldLeft = Math.min(width - 56, textRight - hostRect.left + gap);
        const fieldRight = width - 18;
        const fieldW = Math.max(36, fieldRight - fieldLeft);
        const spots = [
          { px: fieldRight - fieldW * 0.32, py: height * 0.28, z: -0.35 },
          { px: fieldLeft + fieldW * 0.38, py: height * 0.2, z: -1.15 },
          { px: fieldRight - fieldW * 0.24, py: height * 0.68, z: -0.7 },
          { px: fieldLeft + fieldW * 0.46, py: height * 0.74, z: -0.45 },
        ];
        spots.forEach((spot, index) => {
          const { halfW } = depthHalf(spot.z);
          const pixelRadius = (radii[index] / halfW) * (width / 2);
          const room = Math.max(8, fieldW * 0.42);
          const scale = Math.min(1, room / Math.max(pixelRadius, 1));
          const mesh = meshes[index];
          mesh.scale.setScalar(scale);
          const reach = pixelRadius * scale;
          const px = Math.min(fieldRight - reach, Math.max(fieldLeft + reach, spot.px));
          const py = Math.min(height - reach - 12, Math.max(reach + 12, spot.py));
          const world = toWorld(px, py, spot.z, width, height);
          mesh.position.set(world.x, world.y, spot.z);
        });
      };

      const resize = () => {
        const width = host.clientWidth;
        const height = host.clientHeight;
        if (width < 2 || height < 2) return;
        rendererInstance.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        rendererInstance.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        place();
      };
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(host);

      let running = true;
      const onScreen = new IntersectionObserver(([entry]) => {
        running = entry?.isIntersecting ?? true;
      });
      onScreen.observe(host);

      const clock = new THREE.Clock();
      const tick = () => {
        if (dead) return;
        frame = window.requestAnimationFrame(tick);
        if (!running) return;
        const t = clock.getElapsedTime();
        const spin = reduced ? 0.4 : t;
        place();
        meshes[0].rotation.set(spin * 0.15, spin * 0.22, 0);
        meshes[1].rotation.z = spin * 0.1;
        meshes[1].rotation.x = 0.7 + Math.sin(spin * 0.2) * 0.08;
        meshes[2].rotation.y = spin * 0.2;
        glow.position.x = meshes[0].position.x + Math.sin(spin * 0.35) * 0.12;
        glow.position.y = meshes[0].position.y + Math.cos(spin * 0.28) * 0.1;
        warm.position.x = meshes[1].position.x;
        warm.position.y = meshes[1].position.y;
        rendererInstance.render(scene, camera);
      };
      tick();

      return () => {
        observer.disconnect();
        onScreen.disconnect();
        for (const mesh of meshes) {
          mesh.geometry.dispose();
        }
        glass.dispose();
        ink.dispose();
        rendererInstance.dispose();
      };
    };

    let dispose: (() => void) | undefined;
    start().then((done) => {
      if (dead) done?.();
      else dispose = done;
    });

    return () => {
      dead = true;
      window.cancelAnimationFrame(frame);
      dispose?.();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
