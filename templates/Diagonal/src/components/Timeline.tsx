import type { TranslationType } from '../translations';
import { Section, SectionHeading } from './ui/Section';

interface TimelineProps {
  lang: 'sq' | 'en';
  t: TranslationType;
}

const entries = [
  {
    year: '2004',
    title: { sq: 'Themelimi i Diagonal', en: 'Diagonal is founded' },
    body: {
      sq: 'Projektet tona të para nisën me një studio modeste inxhinierie dhe arkitekture në qendër të Tiranës. Fokusi ynë që në ditët e para ishte saktësia konstruktive dhe përgjegjësia maksimale.',
      en: 'Our first projects started with a modest engineering and architecture studio in the center of Tirana. From day one, our focus was structural precision and maximum responsibility.',
    },
  },
  {
    year: '2010',
    title: { sq: 'Zgjerim në zhvillim pasurish', en: 'Expansion into real estate development' },
    body: {
      sq: 'Kalimi nga shërbimet e projektimit në zhvillimin e plotë të pasurive të paluajtshme — rezidencat e para luksoze shumëfamiljare me standarde premium izolimi dhe dorëzim me çelësa në dorë.',
      en: 'A move from pure design services to full real estate development — the first premium multi-family residences, with superior insulation standards and turn-key delivery.',
    },
  },
  {
    year: '2018',
    title: { sq: 'Projekte me ndikim urban', en: 'Urban-impact projects' },
    body: {
      sq: 'Nisja e projekteve me ndikim të lartë arkitekturor dhe urban në zona strategjike bregdetare e metropolitane, duke krijuar vlerë afatgjatë për komunitetet përmes dizajnit bashkëkohor.',
      en: 'Launching high-impact architectural and urban developments in strategic coastal and metropolitan locations, creating long-term value for communities through contemporary design.',
    },
  },
  {
    year: '2026',
    title: { sq: 'Komplekset ikonike të reja', en: 'New iconic complexes' },
    body: {
      sq: 'Arritje të reja me projekte si “Golden Sand” në Shkodër dhe “Peak Tower” në Tiranë — materiale inteligjente, efikasitet maksimal energjie dhe arkitekturë moderne.',
      en: 'New heights with signature developments like “Golden Sand” in Shkodër and “Peak Tower” in Tirana — smart materials, maximum energy efficiency and modern architecture.',
    },
  },
];

export default function Timeline({ lang, t }: TimelineProps) {
  return (
    <Section className="bg-brand-cream border-b border-brand-line" innerClassName="max-w-3xl">
      <SectionHeading
        eyebrow={t.journeyEyebrow}
        title={t.journeyTitle}
        subtitle={t.journeySubtitle}
        align="center"
        className="mb-20"
      />

      <div className="relative border-l border-brand-line pl-10 md:pl-14 ml-2 space-y-14">
        {entries.map((e, i) => {
          const last = i === entries.length - 1;
          return (
            <div key={e.year} className="reveal relative">
              <div
                className={`absolute -left-[44px] md:-left-[60px] top-2 w-3.5 h-3.5 rotate-45 bg-brand-paper border-2 z-10 ${
                  i === 0 || last ? 'border-brand-blue' : 'border-brand-line'
                }`}
              />
              <div
                className={`font-display font-medium text-3xl md:text-4xl mb-2 tabular-nums ${
                  i === 0 || last ? 'text-brand-blue' : 'text-brand-muted'
                }`}
              >
                {e.year}
              </div>
              <h3 className="font-display font-medium text-lg md:text-xl mb-3 text-brand-ink">{e.title[lang]}</h3>
              <p className="text-[15px] leading-relaxed text-brand-muted font-light max-w-xl">{e.body[lang]}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
