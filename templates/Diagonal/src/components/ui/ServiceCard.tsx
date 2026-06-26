import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  num: string;
  title: string;
  desc: string;
  /** keep the title on one line (used for the short homepage service titles) */
  noWrapTitle?: boolean;
}

/**
 * Distinctive card: oversized ghost index, icon tile, and an ink wipe that
 * fills the card on hover (text turns white, icon flips to blue, base line draws in).
 * Shared by the homepage Services section and the Investors co-investment models.
 */
export default function ServiceCard({ icon: Icon, num, title, desc, noWrapTitle = false }: ServiceCardProps) {
  return (
    <div className="reveal service-card group relative overflow-hidden border border-brand-line bg-white transition-colors duration-500 hover:border-brand-ink">
      {/* Ink wipe on hover */}
      <div className="absolute inset-0 bg-brand-ink translate-y-full group-hover:translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
      {/* Oversized ghost index */}
      <span className="absolute -top-6 right-1 font-display font-bold text-[7.5rem] leading-none text-brand-grey select-none pointer-events-none transition-colors duration-500 group-hover:text-white/[0.07]">
        {num}
      </span>
      {/* Base accent line draws in on hover */}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-brand-blue transition-all duration-500 group-hover:w-full z-20" />

      <div className="relative z-10 p-8 md:p-10 flex flex-col justify-between min-h-[320px]">
        <div className="w-14 h-14 flex items-center justify-center border border-brand-blue/15 bg-brand-blue/5 text-brand-blue transition-all duration-500 group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white">
          <Icon size={22} strokeWidth={1.6} />
        </div>

        <div className="mt-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-6 bg-brand-blue" />
            <span className="font-display text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-blue">{num}</span>
          </div>
          <h3
            className={`font-display font-bold text-base md:text-lg tracking-tight mb-3 text-brand-ink transition-colors duration-500 group-hover:text-white ${
              noWrapTitle ? 'whitespace-nowrap' : ''
            }`}
          >
            {title}
          </h3>
          <p className="text-[15px] leading-relaxed font-light text-brand-muted transition-colors duration-500 group-hover:text-white/65">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
