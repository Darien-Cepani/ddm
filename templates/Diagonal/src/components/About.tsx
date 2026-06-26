import type { RefObject } from 'react';
import type { TranslationType } from '../translations';
import { Section, SectionHeading } from './ui/Section';
import Aurora from './reactbits/Aurora';

interface AboutProps {
  visionRef: RefObject<HTMLDivElement | null>;
  lang: 'sq' | 'en';
  t: TranslationType;
}

const ABOUT_IMG =
  'https://cdn.sanity.io/images/ubwtzl2q/production/2cf93a396118e4bfa87bcebbe6707da91435f313-2048x1529.jpg?w=1400&q=80';

export default function About({ visionRef, t }: AboutProps) {
  const pillars = [
    { num: '01', label: t.aboutFoundationLabel, title: t.aboutFoundationTitle, body: t.aboutFoundationDesc },
    { num: '02', label: t.aboutEthosLabel, title: t.aboutEthosTitle, body: t.aboutEthosDesc },
    { num: '03', label: t.aboutVisionLabel, title: t.aboutVisionTitle, body: t.aboutVisionDesc },
  ];

  return (
    <div ref={visionRef} className="relative bg-brand-cream border-b border-brand-line overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.5] cad-grid-background" />
      <Aurora className="opacity-70" />

      <Section id="about" className="relative !py-24 md:!py-32">
        <SectionHeading eyebrow={t.aboutEyebrow} title={t.aboutTitle} className="mb-14" />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Image + floating stat */}
          <div className="reveal parallax-wrap lg:col-span-5 relative min-h-[440px] zoom-container overflow-hidden group">
            <img src={ABOUT_IMG} alt="Diagonal architecture" className="parallax-img absolute inset-0 w-full h-[120%] -top-[10%] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/55 via-transparent to-transparent" />
            {/* corner ticks */}
            <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-white/60 z-10" />
            <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-white/60 z-10" />
            <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-white/60 z-10" />
            {/* stat chip */}
            <div className="absolute bottom-6 left-6 bg-white px-6 py-5 z-10 shadow-xl">
              <div className="font-display font-bold text-4xl text-brand-blue leading-none">22+</div>
              <div className="mt-2 text-[11px] font-display font-semibold uppercase tracking-[0.16em] text-brand-muted">
                {t.statExp}
              </div>
              <div className="mt-1 text-[11px] font-display font-medium text-brand-ink/60">EST. 2004 · Tiranë</div>
            </div>
          </div>

          {/* Statement + pillars */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Big animated statement */}
            <p className="font-display font-medium text-[1.6rem] md:text-[2.1rem] leading-[1.25] tracking-tight text-brand-ink">
              {t.aboutLede.split(' ').map((word, i) => (
                <span key={i} className="vision-word inline-block mr-[0.28em] opacity-[0.16]">
                  {word}
                </span>
              ))}
            </p>

            {/* Pillars */}
            <div className="mt-10 lg:mt-auto pt-8 border-t border-brand-line">
              {pillars.map((p) => (
                <div
                  key={p.num}
                  className="reveal group grid grid-cols-[auto_1fr] gap-x-5 md:gap-x-8 gap-y-1 py-6 border-b border-brand-line first:border-t-0 transition-colors hover:bg-white/40"
                >
                  <span className="font-display font-bold text-sm tabular-nums text-brand-blue pt-1">{p.num}</span>
                  <div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className="font-display font-bold text-lg md:text-xl tracking-tight text-brand-ink">{p.title}</h3>
                      <span className="text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-brand-muted">
                        {p.label}
                      </span>
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed font-light text-brand-muted max-w-xl">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
