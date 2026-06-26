import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { LogoMark } from './ui/Logo';

interface SplashLoaderProps {
  lang: 'sq' | 'en';
  onComplete: () => void;
  /** seconds the loader counts up before sliding away (initial vs. nav transitions) */
  duration?: number;
}

export default function SplashLoader({ lang, onComplete, duration = 1.8 }: SplashLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [splashText, setSplashText] = useState(
    lang === 'sq' ? 'KRIJIMI I KOORDINATAVE...' : 'ESTABLISHING COORDINATES...'
  );
  const splashRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        const p = Math.floor(obj.val);
        setProgress(p);
        if (p < 25) {
          setSplashText(lang === 'sq' ? 'KRIJIMI I KOORDINATAVE...' : 'ESTABLISHING COORDINATES...');
        } else if (p < 50) {
          setSplashText(lang === 'sq' ? 'LEXIMI I GRIDËS...' : 'SCANNING THE GRID...');
        } else if (p < 75) {
          setSplashText(lang === 'sq' ? 'RENDEROSJA E SKENËS...' : 'RENDERING THE SCENE...');
        } else {
          setSplashText(lang === 'sq' ? 'ZBATIM ME PËRGJEGJËSI' : 'BUILT WITH RESPONSIBILITY');
        }
      },
      onComplete: () => {
        gsap.to(splashRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power3.inOut',
          onComplete,
        });
      },
    });
  }, [lang, onComplete, duration]);

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 bg-brand-blue z-50 flex flex-col justify-between p-8 md:p-14 select-none text-white overflow-hidden"
    >
      {/* Blueprint background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 blueprint-grid" />
        <div className="absolute inset-0 blueprint-hatch" />

        {/* Construction circles + axes behind the mark */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] md:w-[720px] md:h-[720px] text-white/15"
          viewBox="0 0 720 720"
          fill="none"
        >
          <circle cx="360" cy="360" r="320" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9" />
          <circle cx="360" cy="360" r="220" stroke="currentColor" strokeWidth="1" />
          <circle cx="360" cy="360" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="2 7" />
          <line x1="0" y1="360" x2="720" y2="360" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" />
          <line x1="360" y1="0" x2="360" y2="720" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" />
        </svg>

        {/* Corner crosshairs */}
        {[
          'top-10 left-10', 'top-10 right-10', 'bottom-10 left-10', 'bottom-10 right-10',
          'top-1/3 left-1/4', 'bottom-1/3 right-1/4',
        ].map((pos, i) => (
          <span key={i} className={`absolute ${pos} text-white/25 font-mono text-sm leading-none`}>+</span>
        ))}

        {/* Annotation labels */}
        <span className="absolute top-[22%] left-[10%] font-mono text-[10px] tracking-widest text-white/30 uppercase">A-01 · 1:100</span>
        <span className="absolute top-[30%] right-[12%] font-mono text-[10px] tracking-widest text-white/30 uppercase">LAT 41.3275° N</span>
        <span className="absolute bottom-[26%] left-[14%] font-mono text-[10px] tracking-widest text-white/30 uppercase">LON 19.8187° E</span>
        <span className="absolute bottom-[20%] right-[10%] font-mono text-[10px] tracking-widest text-white/30 uppercase">REV — 04</span>

        {/* Dimension line */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[16%] hidden md:flex items-center gap-2 text-white/30">
          <span className="h-2.5 w-px bg-white/30" />
          <span className="h-px w-28 bg-white/30" />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase whitespace-nowrap">Ndërtuar me përgjegjësi</span>
          <span className="h-px w-28 bg-white/30" />
          <span className="h-2.5 w-px bg-white/30" />
        </div>
      </div>

      {/* Top row */}
      <div className="flex justify-between items-center relative z-10 text-[10px] md:text-xs uppercase tracking-[0.25em] font-semibold text-white/60">
        <span>Diagonal Architects</span>
        <span>EST. 2004 · Tiranë</span>
      </div>

      {/* Center */}
      <div className="text-center relative z-10 flex flex-col items-center">
        <div className="w-[64px] md:w-[84px] mb-8 text-white animate-float">
          <LogoMark className="w-full h-full" />
        </div>
        <div className="text-[10px] md:text-xs tracking-[0.3em] font-semibold text-white/70 mb-4 uppercase h-5">
          {splashText}
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-44 bg-white/25 overflow-hidden relative">
            <div
              className="absolute left-0 top-0 bottom-0 bg-white transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-display font-semibold text-xs tracking-wider text-white tabular-nums">
            {progress.toString().padStart(3, '0')}
          </span>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex justify-between items-end relative z-10 text-[10px] md:text-xs tracking-[0.25em] text-white/60 font-semibold uppercase">
        <span>{lang === 'sq' ? 'Ndërtuar me përgjegjësi' : 'Built with responsibility'}</span>
        <span>© 2026</span>
      </div>
    </div>
  );
}
