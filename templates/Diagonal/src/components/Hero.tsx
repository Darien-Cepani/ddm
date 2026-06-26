import type { RefObject } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import type { TranslationType } from '../translations';
import Magnetic from './reactbits/Magnetic';

interface HeroProps {
  heroRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  subtitleRef: RefObject<HTMLHeadingElement | null>;
  descRef: RefObject<HTMLDivElement | null>;
  btnsRef: RefObject<HTMLDivElement | null>;
  lang: 'sq' | 'en';
  changeView: (view: 'home' | 'investors' | 'diaspora', section?: string) => void;
  t: TranslationType;
}

export default function Hero({
  heroRef,
  titleRef,
  subtitleRef,
  descRef,
  btnsRef,
  lang,
  changeView,
  t,
}: HeroProps) {
  return (
    <header
      id="hero"
      ref={heroRef}
      className="relative w-full h-screen min-h-[640px] bg-brand-ink overflow-hidden flex flex-col justify-end px-6 md:px-12 lg:px-20"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <iframe
          src="https://player.vimeo.com/video/1203377343?background=1&autoplay=1&loop=1&muted=1&autopause=0&playsinline=1"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-screen min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-70 scale-105"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Diagonal"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/55 to-brand-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/80 via-transparent to-transparent" />
        <div className="absolute inset-0 cad-grid-background opacity-[0.15]" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1280px] mx-auto pb-16 md:pb-24 pt-28">
        {/* Eyebrow */}
        <div
          ref={descRef}
          className="opacity-0 flex items-center gap-3 text-[11px] md:text-xs font-display font-semibold tracking-[0.22em] uppercase text-white/70 mb-7"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue" />
          </span>
          <span>{t.heroEyebrow}</span>
          <span className="h-px w-12 bg-white/25 hidden sm:block" />
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="opacity-0 font-display font-bold text-white leading-[0.95] tracking-tight"
        >
          <span className="block text-[clamp(2.5rem,7vw,5.5rem)]">{t.heroTitle}</span>
          <span
            ref={subtitleRef}
            className="block text-brand-blue font-bold text-[clamp(3rem,10vw,8.5rem)] leading-[0.9] -mt-1"
          >
            {t.heroSubtitle}
          </span>
        </h1>

        {/* Lede + CTAs */}
        <div ref={btnsRef} className="opacity-0 mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <p className="max-w-md text-white/65 text-sm md:text-base leading-relaxed font-light">
            {t.heroLede}
          </p>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Magnetic strength={0.3}>
              <button
                onClick={() => changeView('home', 'projects')}
                className="group px-7 py-4 bg-brand-blue hover:bg-brand-accent text-white font-display font-semibold text-[13px] tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
              >
                {lang === 'sq' ? 'Portofoli Ynë' : 'Our Portfolio'}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <button
              onClick={() => changeView('home', 'contact')}
              className="px-7 py-4 border border-white/25 text-white hover:bg-white hover:text-brand-ink font-display font-semibold text-[13px] tracking-wide transition-all duration-300 cursor-pointer backdrop-blur-sm"
            >
              {t.heroCtaSecondary}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom meta strip */}
      <div className="relative z-20 w-full max-w-[1280px] mx-auto border-t border-white/10 py-5 flex items-center justify-between text-[10px] md:text-xs font-display font-medium tracking-[0.18em] uppercase text-white/45">
        <span>EST. 2004</span>
        <span className="hidden sm:block">41.3275° N · 19.8187° E</span>
        <span className="flex items-center gap-2">
          {t.scrollLabel}
          <ArrowDown size={13} className="animate-bounce" />
        </span>
      </div>
    </header>
  );
}
