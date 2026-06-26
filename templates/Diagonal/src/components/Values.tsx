import type { TranslationType } from '../translations';
import { Section, SectionHeading } from './ui/Section';
import SpotlightCard from './reactbits/SpotlightCard';

interface ValuesProps {
  t: TranslationType;
}

export default function Values({ t }: ValuesProps) {
  const values = [
    { num: '01', title: t.value1Title, desc: t.value1Desc },
    { num: '02', title: t.value2Title, desc: t.value2Desc },
    { num: '03', title: t.value3Title, desc: t.value3Desc },
  ];

  return (
    <div className="relative bg-brand-paper border-b border-brand-line">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60 cad-grid-background" />
      <Section id="values">
        <SectionHeading eyebrow={t.valuesEyebrow} title={t.valuesHeading} className="mb-16" />

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {values.map((v) => (
            <SpotlightCard key={v.num} className="p-8 md:p-10 flex flex-col">
              <div className="flex items-baseline justify-between mb-8">
                <h3 className="font-display font-bold text-2xl tracking-tight text-brand-ink">{v.title}</h3>
                <span className="font-display text-sm font-semibold tabular-nums text-brand-blue">/ {v.num}</span>
              </div>
              <p className="text-[15px] leading-relaxed text-brand-muted font-light">{v.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </Section>
    </div>
  );
}
