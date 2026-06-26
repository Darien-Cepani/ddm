import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="shell flex flex-col gap-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Wordmark className="text-3xl" />
            <p className="mt-3 max-w-xs font-sans text-sm text-muted">
              Do Digital Media. We build brands that dominate the market.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-6 font-sans text-sm">
            <div className="flex flex-col gap-2">
              <span className="eyebrow">Contact</span>
              <a href="mailto:contact@ddm.al" className="text-ink hover:text-accent" data-cursor="hover">
                contact@ddm.al
              </a>
              <span className="text-muted">Tirana, Albania</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="eyebrow">Social</span>
              {["Instagram", "LinkedIn", "Behance"].map((s) => (
                <a key={s} href="#" className="text-ink hover:text-accent" data-cursor="hover">
                  {s}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="eyebrow">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} DDM — Do Digital Media. All rights reserved.</span>
          <span className="font-sans uppercase tracking-[0.18em]">Stop planning · Start doing</span>
        </div>
      </div>
    </footer>
  );
}
