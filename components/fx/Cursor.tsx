"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/**
 * Custom lime cursor ring that lags the pointer and grows over interactive
 * elements. Pointer-fine devices only; hidden on touch.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.body.classList.add("has-cursor");

    const xTo = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const isInteractive = (el: Element | null) =>
      !!el?.closest("a, button, [data-cursor='hover'], input, textarea, [role='button']");

    const over = (e: PointerEvent) => {
      if (isInteractive(e.target as Element)) {
        gsap.to(ring, { scale: 2.4, opacity: 0.5, duration: 0.3 });
      } else {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ringRef}
        className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-accent"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
