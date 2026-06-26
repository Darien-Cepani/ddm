"use client";

import type { ClientData } from "@/lib/clients";
import { pickLocale } from "@/lib/clients";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";

/**
 * "Aurora" — starter client template (a standalone business site).
 *
 * Locale-aware: client content is `Localized`, resolved against the active
 * locale; chrome labels come from the shared dictionary. No agency branding.
 */
export function AuroraTemplate({ data }: { data: ClientData }) {
  const { locale } = useLocale();
  const t = useT();
  const accent = data.accent ?? "#C0F53D";
  const L = (v: Parameters<typeof pickLocale>[0]) => pickLocale(v, locale);

  const services = (data.services ?? []).map(L);
  const navItems = services.length ? services.slice(0, 4) : [t.clientTemplate.home, t.clientTemplate.about, t.clientTemplate.contact];

  return (
    <div className="min-h-screen bg-grass text-milk" style={{ ["--client-accent" as string]: accent }}>
      <header className="mx-auto flex max-w-shell items-center justify-between px-6 py-6 sm:px-8">
        <span className="font-display text-2xl font-semibold">{data.name}</span>
        <nav className="hidden gap-8 font-sans text-sm text-milk/70 sm:flex">
          {navItems.map((s, i) => (
            <a key={i} href="#" className="hover:text-milk">
              {s}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${data.contact?.email ?? "hello@example.com"}`}
          className="rounded-full px-5 py-2.5 font-sans text-sm font-medium text-grass"
          style={{ background: accent }}
        >
          {t.clientTemplate.getInTouch}
        </a>
      </header>

      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[40vmax] w-[40vmax] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${accent}, transparent)` }}
        />
        <div className="relative mx-auto max-w-shell px-6 py-28 sm:px-8 sm:py-40">
          {data.sector && (
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-milk/60">{L(data.sector)}</span>
          )}
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,7vw,6rem)] leading-[1.0]">{L(data.tagline)}</h1>
          <p className="mt-6 max-w-xl font-sans text-lg text-milk/70">{L(data.description)}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#" className="rounded-full px-7 py-3.5 font-sans text-sm font-medium text-grass" style={{ background: accent }}>
              {t.clientTemplate.explore}
            </a>
            <a href="#" className="rounded-full border border-milk/25 px-7 py-3.5 font-sans text-sm font-medium">
              {t.clientTemplate.learnMore}
            </a>
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <section className="border-y border-milk/10">
          <div className="mx-auto grid max-w-shell grid-cols-2 gap-px bg-milk/10 sm:grid-cols-4">
            {services.map((s, i) => (
              <div key={i} className="bg-grass px-6 py-10 font-display text-xl">
                {s}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-shell px-6 py-28 sm:px-8">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)]">{t.clientTemplate.sayHello}</h2>
        <div className="mt-8 flex flex-col gap-2 font-sans text-milk/70">
          {data.contact?.email && <span>{data.contact.email}</span>}
          {data.contact?.phone && <span>{data.contact.phone}</span>}
          {data.contact?.address && <span>{L(data.contact.address)}</span>}
        </div>
      </section>

      <footer className="border-t border-milk/10 py-10">
        <div className="mx-auto flex max-w-shell items-center justify-center px-6">
          <span className="font-sans text-sm text-milk/50">
            © {new Date().getFullYear()} {data.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
