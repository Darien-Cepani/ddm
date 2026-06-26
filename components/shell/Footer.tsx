"use client";

import { RiArrowRightUpLine, RiInstagramLine, RiLinkedinBoxLine, RiWhatsappLine } from "@remixicon/react";
import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "@/components/i18n/LocaleToggle";
import { useT } from "@/components/i18n/LocaleProvider";

// const SOCIALS = [
//   { label: "Instagram", icon: RiInstagramLine, href: "#" },
//   { label: "LinkedIn", icon: RiLinkedinBoxLine, href: "#" },
//   { label: "WhatsApp", icon: RiWhatsappLine, href: "#" },
// ];

export function Footer() {
  const t = useT();

  return (
    <footer className="relative overflow-hidden bg-grass text-milk">
      {/* glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[40vmax] w-[80vmax] -translate-x-1/2 translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(192,245,61,0.25), transparent)" }}
      />

      <div className="shell relative py-20">
        {/* big CTA row */}
        <div className="flex flex-col gap-8 border-b border-milk/10 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-sans text-eyebrow uppercase tracking-[0.18em] text-milk/50">{t.footer.cta}</p>
            <a
              href="#contact"
              data-cursor="hover"
              className="group mt-4 inline-flex items-center gap-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-none"
            >
              contact@ddm.al
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-grass transition-transform duration-300 group-hover:rotate-45 sm:h-16 sm:w-16">
                <RiArrowRightUpLine className="h-6 w-6 sm:h-8 sm:w-8" />
              </span>
            </a>
          </div>
        </div>

        {/* lower grid */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Wordmark height={30} href="" className="text-milk" />
            <p className="mt-4 max-w-xs font-sans text-sm text-milk/60">{t.footer.blurb}</p>
          </div>

          {/* <div className="flex flex-col gap-3">
            <span className="font-sans text-eyebrow uppercase tracking-[0.18em] text-milk/40">{t.footer.social}</span>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                data-cursor="hover"
                className="group inline-flex items-center gap-2 font-sans text-sm text-milk/70 hover:text-milk"
              >
                <s.icon size={18} className="text-milk/40 transition-colors group-hover:text-accent" />
                {s.label}
              </a>
            ))}
          </div> */}

          <div className="flex flex-col gap-4">
            <span className="font-sans text-eyebrow uppercase tracking-[0.18em] text-milk/40">{t.footer.contact}</span>
            <span className="font-sans text-sm text-milk/70">{t.footer.location}</span>
            <div className="flex items-center gap-3">
              <LocaleToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-milk/10 pt-6 text-xs text-milk/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} DDM — Do Digital Media. {t.footer.rights}</span>
          <span className="font-sans uppercase tracking-[0.18em]">{t.footer.slogan}</span>
        </div>
      </div>
    </footer>
  );
}
