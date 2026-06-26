import { ArrowRight } from 'lucide-react';
import type { TranslationType } from '../translations';
import Magnetic from './reactbits/Magnetic';

interface BannerProps {
  lang: 'sq' | 'en';
  changeView: (view: 'home' | 'investors' | 'diaspora', section?: string) => void;
  t: TranslationType;
}

export default function Banner({ changeView, t }: BannerProps) {
  return (
    <section className="relative bg-brand-ink z-20 overflow-hidden">
      {/* Beams + grid backdrop */}
      <div className="absolute inset-0 cad-grid-blue opacity-[0.4]" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="beam-ray" style={{ left: '18%', animationDelay: '0s', height: '60%' }} />
        <span className="beam-ray" style={{ left: '46%', animationDelay: '-5s', height: '60%' }} />
        <span className="beam-ray" style={{ left: '82%', animationDelay: '-9s', height: '60%' }} />
      </div>
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[420px] h-[420px] aurora-blob" style={{ background: 'rgba(22,10,255,0.35)' }} />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20 py-24 md:py-28 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="reveal max-w-xl">
          <span className="eyebrow eyebrow--center !text-brand-blue mb-6" style={{ color: '#5b7bff' }}>
            {t.bannerEyebrow}
          </span>
          <h2 className="font-display font-bold text-white text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-tight">
            {t.ideaTitle}
          </h2>
        </div>
        <div className="reveal max-w-md">
          <p className="text-white/60 text-base md:text-lg leading-relaxed font-light">{t.ideaDesc}</p>
          <Magnetic strength={0.3}>
            <button
              onClick={() => changeView('home', 'contact')}
              className="group mt-8 inline-flex items-center gap-2.5 px-7 py-4 text-[13px] font-display font-semibold tracking-wide bg-white text-brand-ink hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
            >
              {t.bannerCta}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
