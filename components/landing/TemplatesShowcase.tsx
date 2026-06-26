"use client";

import Image from "next/image";
import Link from "next/link";
import { RiArrowRightUpLine } from "@remixicon/react";
import { Reveal } from "@/components/fx/Reveal";
import { useT } from "@/components/i18n/LocaleProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { TEMPLATES_CATALOG } from "@/lib/templates-catalog";

/** Homepage showcase of a few premium templates (real homepage screenshots). */
export function TemplatesShowcase() {
  const t = useT();
  const { locale } = useLocale();
  const featured = TEMPLATES_CATALOG.slice(0, 4);

  return (
    <section id="templates" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">{t.templates.eyebrow}</span>
            <h2 className="mt-6 font-display text-h2">{t.templates.title}</h2>
          </div>
          <p className="max-w-sm font-sans text-muted">{t.templates.lead}</p>
        </div>

        <Reveal stagger className="mt-14 grid gap-6 sm:grid-cols-2">
          {featured.map((tpl) => (
            <Link
              key={tpl.slug}
              href={`/templates#${tpl.slug}`}
              data-cursor="hover"
              className="group relative overflow-hidden rounded-3xl border border-line"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={tpl.thumb}
                  alt={tpl.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(60% 60% at 50% 0%, ${tpl.accent}22, transparent)` }}
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-6">
                <div>
                  <span className="font-sans text-xs uppercase tracking-[0.16em] text-muted">{tpl.category[locale]}</span>
                  <h3 className="mt-1 font-display text-h3">{tpl.name}</h3>
                  <p className="mt-1 font-sans text-sm text-muted">{tpl.description[locale]}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-grass">
                  <RiArrowRightUpLine size={20} />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>

        <div className="mt-12 flex justify-center">
          <Link href="/templates" data-cursor="hover" className="btn-ghost">
            {t.templates.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
