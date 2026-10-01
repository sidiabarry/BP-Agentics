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
      const specs = [
        { geo: new THREE.IcosahedronGeometry(0.92, 1), mat: glass },
        { geo: new THREE.TorusGeometry(1.05, 0.028, 16, 64), mat: glass },
        { geo: new THREE.IcosahedronGeometry(0.38, 0), mat: ink },
        { geo: new THREE.SphereGeometry(0.14, 20, 16), mat: ink },
      ];
      for (const spec of specs) {
        const mesh = new THREE.Mesh(spec.geo, spec.mat);
        scene.add(mesh);
        meshes.push(mesh);
      }

      const place = () => {
        const halfH = Math.tan((32 * Math.PI) / 180 / 2) * camera.position.z;
        const halfW = halfH * camera.aspect;
        const narrow = camera.aspect < 1.15;
        const edge = narrow ? 0.72 : 0.92;
        meshes[0].position.set(halfW * edge, narrow ? halfH * 0.72 : 0.15, -1.15);
        meshes[0].scale.setScalar(narrow ? 0.42 : 1);
        meshes[1].position.set(halfW * (narrow ? 0.78 : 0.62), halfH * (narrow ? 0.78 : 0.62), -1.6);
        meshes[1].scale.setScalar(narrow ? 0.45 : 0.9);
        meshes[2].position.set(-halfW * 0.86, halfH * 0.78, -1.3);
        meshes[2].scale.setScalar(narrow ? 0.55 : 0.85);
        meshes[3].position.set(narrow ? halfW * 0.8 : -halfW * 0.72, -halfH * 0.78, -0.4);
        meshes[3].scale.setScalar(narrow ? 0.7 : 1);
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
        meshes[0].rotation.set(spin * 0.15, spin * 0.22, 0);
        meshes[1].rotation.z = spin * 0.1;
        meshes[1].rotation.x = 0.7 + Math.sin(spin * 0.2) * 0.08;
        meshes[2].rotation.y = spin * 0.2;
        glow.position.x = meshes[0].position.x - 0.4 + Math.sin(spin * 0.35) * 0.35;
        glow.position.y = meshes[0].position.y + Math.cos(spin * 0.28) * 0.25;
        warm.position.x = meshes[1].position.x;
        warm.position.y = meshes[1].position.y - 0.4;
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
