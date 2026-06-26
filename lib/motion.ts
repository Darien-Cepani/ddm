/**
 * Centralized GSAP registration, eases, durations and small helpers.
 * Import { gsap, ScrollTrigger } from here so plugins register exactly once.
 */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

registerGsap();

export const EASE = {
  out: "expo.out",
  ui: "power3.out",
  loop: "power2.inOut",
} as const;

export const DUR = {
  reveal: 1.0,
  micro: 0.4,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Cheap heuristic for low-power devices to skip heavy WebGL. */
export function isLowPower(): boolean {
  if (typeof navigator === "undefined") return false;
  const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 8;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  return cores <= 4 || mem <= 4;
}

export { gsap, ScrollTrigger };
