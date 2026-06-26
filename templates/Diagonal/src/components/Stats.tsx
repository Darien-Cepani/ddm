import type { RefObject } from 'react';
import type { TranslationType } from '../translations';

interface StatsProps {
  statsRef: RefObject<HTMLDivElement | null>;
  t: TranslationType;
}

export default function Stats({ statsRef, t }: StatsProps) {
  const stats = [
    { target: '22', suffix: '+', label: t.statExp, accent: false },
    { target: '8', suffix: '+', label: t.statProj, accent: true },
    { target: '120', suffix: 'K+', label: t.statSqm, accent: false },
    { target: '45', suffix: '+', label: t.statTeam, accent: true },
  ];

  return (
    <section ref={statsRef} className="relative bg-brand-paper z-20 border-y border-brand-line">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20 py-14 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col ${i !== 0 ? 'lg:pl-10' : ''} ${i !== stats.length - 1 ? 'lg:border-r border-brand-line' : ''}`}
            >
              <div
                className={`stat-counter font-display font-medium text-5xl md:text-6xl lg:text-7xl tracking-tight mb-3 tabular-nums ${
                  s.accent ? 'text-brand-blue' : 'text-brand-ink'
                }`}
                data-target={s.target}
                data-suffix={s.suffix}
              >
                0
              </div>
              <div className="text-[11px] md:text-xs text-brand-muted font-display font-medium uppercase tracking-[0.16em] max-w-[12rem]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
