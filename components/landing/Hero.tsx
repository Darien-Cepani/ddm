"use client";

import { useEffect, useRef } from "react";
import { RiArrowDownLine } from "@remixicon/react";
import { Starfield } from "@/components/fx/Starfield";
import { SplitReveal } from "@/components/fx/SplitReveal";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { Marquee } from "@/components/fx/Marquee";
import { useT } from "@/components/i18n/LocaleProvider";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/motion";

export function Hero() {
  const t = useT();
  const rootRef = useRef<HTMLElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) {
      if (subRef.current) gsap.set(subRef.current.children, { autoAlpha: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(subRef.current!.children, { autoAlpha: 0, y: 24 });
      gsap.to(subRef.current!.children, { autoAlpha: 1, y: 0, duration: 1, ease: EASE.out, stagger: 0.12, delay: 0.6 });
      gsap.to(".hero-content", {
        yPercent: -16,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* WebGL backdrop — softened a touch */}
      <div className="absolute inset-0 blur-[2.5px]">
        <Starfield />
      </div>

      {/* glow + grain + readability scrim */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[42%] h-[65vmax] w-[65vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
          style={{ background: "radial-gradient(closest-side, rgb(var(--accent) / 0.18), transparent)" }}
        />
        <div className="grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(125% 90% at 50% 55%, transparent 38%, rgb(var(--bg) / 0.72) 100%)" }}
        />
      </div>

      {/* main content */}
      <div className="hero-content shell relative z-10 flex flex-1 flex-col justify-center pt-28">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="eyebrow">{t.hero.eyebrow}</span>
        </div>

        <SplitReveal as="h1" type="words" trigger="load" delay={0.2} className="mt-7 max-w-[16ch] text-hero font-display">
          {t.hero.headA}
          <span className="italic text-accent">{t.hero.accent}</span>
          {t.hero.headB}
        </SplitReveal>

        <div ref={subRef} className="mt-7 flex max-w-xl flex-col gap-6">
          <p className="text-lead text-ink/80">{t.hero.sub}</p>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="#problems" className="btn-primary">
              {t.hero.ctaPrimary}
            </MagneticButton>
            <a href="#services" className="btn-ghost" data-cursor="hover">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* rotating scroll badge */}
        <a
          href="#problems"
          data-cursor="hover"
          aria-label={t.hero.scroll}
          className="group absolute bottom-4 right-0 hidden h-28 w-28 place-items-center text-ink sm:grid"
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite]">
            <defs>
              <path id="ddm-scroll-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
            </defs>
            <text className="fill-current font-sans text-[9px] uppercase tracking-[0.16em]">
              <textPath href="#ddm-scroll-circle">{t.hero.scrollBadge.repeat(2)}</textPath>
            </text>
          </svg>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-grass transition-transform duration-300 group-hover:translate-y-1">
            <RiArrowDownLine size={20} />
          </span>
        </a>
      </div>

      {/* value ticker pinned to the bottom edge */}
      <div className="relative z-10 border-t border-line bg-bg/40 py-4 font-sans text-sm uppercase tracking-[0.18em] text-muted backdrop-blur-sm">
        <Marquee items={[...t.hero.ticker]} speed={26} separator="✦" />
      </div>
    </section>
  );
}
