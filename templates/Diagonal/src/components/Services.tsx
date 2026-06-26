import { Building2, DraftingCompass, KeyRound } from 'lucide-react';
import type { TranslationType } from '../translations';
import { Section, SectionHeading } from './ui/Section';
import ServiceCard from './ui/ServiceCard';

interface ServicesProps {
  t: TranslationType;
}

export default function Services({ t }: ServicesProps) {
  const services = [
    { icon: Building2, num: '01', title: t.service1Title, desc: t.service1Desc },
    { icon: DraftingCompass, num: '02', title: t.service2Title, desc: t.service2Desc },
    { icon: KeyRound, num: '03', title: t.service3Title, desc: t.service3Desc },
  ];

  return (
    <Section id="services" className="bg-white border-b border-brand-line">
      <SectionHeading
        eyebrow={t.servicesEyebrow}
        title={t.servicesTitle}
        subtitle={t.servicesSubtitle}
        align="center"
        className="mb-16"
      />

      <div className="grid md:grid-cols-3 gap-6 items-stretch services-grid">
        {services.map((s) => (
          <ServiceCard key={s.num} icon={s.icon} num={s.num} title={s.title} desc={s.desc} noWrapTitle />
        ))}
      </div>
    </Section>
  );
}
