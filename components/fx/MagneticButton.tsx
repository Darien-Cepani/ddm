"use client";

import { useRef, useEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  ariaLabel?: string;
};

/** Element that pulls toward the cursor and springs back on leave. */
export function MagneticButton({ children, className, href, onClick, strength = 0.4, ariaLabel }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  if (href) {
    return (
      <a ref={ref} href={href} className={className} aria-label={ariaLabel} data-cursor="hover">
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" onClick={onClick} className={className} aria-label={ariaLabel} data-cursor="hover">
      {children}
    </button>
  );
}
