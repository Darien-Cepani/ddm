"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "@/components/i18n/LocaleToggle";
import { useT } from "@/components/i18n/LocaleProvider";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { gsap, ScrollTrigger } from "@/lib/motion";

export function Nav() {
  const t = useT();
  const barRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.templates, href: "#templates" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const bar = barRef.current;
    const prog = progRef.current;
    if (!bar || !prog) return;
    const a = ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => bar.classList.toggle("nav-solid", self.scroll() > 80),
    });
    const b = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(prog, { scaleX: self.progress }),
    });
    return () => {
      a.kill();
      b.kill();
    };
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left">
        <div ref={progRef} className="h-full w-full origin-left scale-x-0 bg-accent" />
      </div>

      <header ref={barRef} className="fixed left-0 top-0 z-50 w-full transition-colors duration-500">
        <div className="shell flex items-center justify-between py-4">
          <Wordmark height={22} />

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
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

          <div className="flex items-center gap-2.5">
            <LocaleToggle className="hidden sm:flex" />
            <ThemeToggle />
            <MagneticButton
              href="#contact"
              className="hidden rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-medium text-grass lg:inline-flex"
            >
              {t.nav.cta}
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

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 transition-opacity duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display text-5xl text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mt-10 flex items-center gap-4">
          <LocaleToggle />
        </div>
      </div>
    </>
  );
}
