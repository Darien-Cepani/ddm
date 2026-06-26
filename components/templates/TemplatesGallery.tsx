"use client";

import Image from "next/image";
import Link from "next/link";
import { RiArrowLeftLine, RiArrowRightUpLine } from "@remixicon/react";
import { Reveal } from "@/components/fx/Reveal";
import { useT, useLocale } from "@/components/i18n/LocaleProvider";
import { TEMPLATES_CATALOG } from "@/lib/templates-catalog";

export function TemplatesGallery() {
  const t = useT();
  const { locale } = useLocale();

  return (
    <main className="pt-32">
      <div className="shell">
        <Link href="/" data-cursor="hover" className="inline-flex items-center gap-2 font-sans text-sm text-muted hover:text-ink">
          <RiArrowLeftLine size={16} /> {t.templatesPage.back}
        </Link>

        <header className="mt-10 max-w-3xl">
          <span className="eyebrow">{t.templatesPage.eyebrow}</span>
          <h1 className="mt-6 font-display text-hero">{t.templatesPage.title}</h1>
          <p className="mt-6 font-sans text-lead text-muted">{t.templatesPage.lead}</p>
        </header>
      </div>

      <div className="shell mt-16 grid gap-10 sm:grid-cols-2">
        {TEMPLATES_CATALOG.map((tpl) => (
          <Reveal key={tpl.slug}>
            <article id={tpl.slug} className="group scroll-mt-28 overflow-hidden rounded-3xl border border-line">
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
              <div className="flex flex-col gap-4 p-7">
                <div>
                  <span className="font-sans text-xs uppercase tracking-[0.16em] text-muted">{tpl.category[locale]}</span>
                  <h2 className="mt-1 font-display text-h3">{tpl.name}</h2>
                  <p className="mt-2 font-sans text-muted">{tpl.description[locale]}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={tpl.href}
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-medium text-grass"
                  >
                    {t.templatesPage.view} <RiArrowRightUpLine size={16} />
                  </Link>
                  <Link href="/#contact" data-cursor="hover" className="btn-ghost px-5 py-2.5 text-sm">
                    {t.templatesPage.use}
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="shell mt-20">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-surface p-10 text-center sm:p-14">
          <p className="max-w-xl font-display text-h2">{t.templatesPage.cta}</p>
          <Link href="/#contact" data-cursor="hover" className="btn-primary">
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </main>
  );
}
