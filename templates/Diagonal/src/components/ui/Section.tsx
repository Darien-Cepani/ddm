import type { ReactNode, RefObject } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  sectionRef?: RefObject<HTMLElement | null>;
}

/** Consistent vertical rhythm + max-width container for every section. */
export function Section({ id, children, className = '', innerClassName = '', sectionRef }: SectionProps) {
  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative py-24 md:py-32 px-6 md:px-12 lg:px-20 ${className}`}
    >
      <div className={`mx-auto w-full max-w-[1280px] ${innerClassName}`}>{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

/** Reusable eyebrow → headline → lede pattern. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  dark = false,
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  return (
    <div
      className={`reveal ${isCenter ? 'text-center mx-auto items-center' : 'items-start'} flex flex-col ${
        isCenter ? 'max-w-2xl' : 'max-w-3xl'
      } ${className}`}
    >
      {eyebrow && (
        <span className={`eyebrow ${isCenter ? 'eyebrow--center justify-center' : ''} mb-5`}>
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display font-bold tracking-tight leading-[1.02] text-[clamp(2rem,4.5vw,3.5rem)] ${
          dark ? 'text-white' : 'text-brand-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-6 text-base md:text-lg leading-relaxed font-light max-w-xl ${
            dark ? 'text-white/60' : 'text-brand-muted'
          } ${isCenter ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
