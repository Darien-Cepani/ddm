"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion, isLowPower } from "@/lib/motion";

/**
 * Spacey particle point-cloud hero backdrop.
 * - Theme aware: reads `.dark` on <html> to pick palette + opacity.
 * - Cursor parallax drift, slow rotation.
 * - Pauses when off-screen (IntersectionObserver), DPR capped at 2.
 * - Reduced-motion / low-power: renders a static CSS gradient + sparse dots fallback.
 */
export function Starfield() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Fallback path: no WebGL spectacle.
    if (prefersReducedMotion() || isLowPower()) {
      mount.classList.add("starfield-fallback");
      return;
    }

    const isDark = () => document.documentElement.classList.contains("dark");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // --- particle geometry ---
    const COUNT = window.innerWidth < 768 ? 3500 : 9000;
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // flatten => galaxy band
      positions[i * 3 + 2] = r * Math.cos(phi);
      scales[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color(isDark() ? "#FAFFF3" : "#3a4a25") },
        uAccent: { value: new THREE.Color("#C0F53D") },
        uOpacity: { value: isDark() ? 0.9 : 0.5 },
        uSize: { value: isDark() ? 26 : 20 },
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aScale;
        uniform float uSize;
        uniform float uTime;
        varying float vMix;
        void main() {
          vec3 p = position;
          float drift = sin(uTime * 0.2 + p.x * 0.3) * 0.15;
          p.y += drift;
          vMix = aScale;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * aScale * (1.0 / -mv.z);
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uColor;
        uniform vec3 uAccent;
        uniform float uOpacity;
        varying float vMix;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.0, d) * uOpacity;
          vec3 col = mix(uColor, uAccent, step(0.93, vMix) * 0.8);
          gl_FragColor = vec4(col, a);
        }
      `,
    });

    const points = new THREE.Points(geo, material);
    scene.add(points);

    // --- resize ---
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // --- cursor parallax ---
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 0.6;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("pointermove", onMove);

    // --- theme observer ---
    const themeObs = new MutationObserver(() => {
      const dark = isDark();
      (material.uniforms.uColor.value as THREE.Color).set(dark ? "#FAFFF3" : "#3a4a25");
      material.uniforms.uOpacity.value = dark ? 0.9 : 0.5;
      material.uniforms.uSize.value = dark ? 26 : 20;
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // --- render loop, paused off-screen ---
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      points.rotation.y = t * 0.02 + pointer.x;
      points.rotation.x = pointer.y * 0.5;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      themeObs.disconnect();
      geo.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
