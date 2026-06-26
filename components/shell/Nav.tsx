"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { gsap, ScrollTrigger } from "@/lib/motion";

const LINKS = [
  { label: "Work", href: "#showcase" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const barRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const st = ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        const scrolled = self.scroll() > 80;
        bar.classList.toggle("nav-solid", scrolled);
      },
    });
    return () => st.kill();
  }, []);

  // progress line
  const progRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = progRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(el, { scaleX: self.progress }),
    });
    return () => st.kill();
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left">
        <div ref={progRef} className="h-full w-full origin-left scale-x-0 bg-accent" />
      </div>

      <header
        ref={barRef}
        className="fixed left-0 top-0 z-50 w-full transition-colors duration-500"
      >
        <div className="shell flex items-center justify-between py-5">
          <Wordmark className="text-2xl" />

          <nav className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="hover"
                className="group relative font-sans text-sm text-ink/80 transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <MagneticButton
              href="#contact"
              className="hidden rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-medium text-grass sm:inline-flex"
            >
              Start a project
            </MagneticButton>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center md:hidden"
            >
              <span className="flex flex-col gap-1.5">
                <span className={`h-px w-5 bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 transition-opacity duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-5xl text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
