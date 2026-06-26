import type { FormEvent } from 'react';
import { Globe, Coins, ShieldCheck, Video, CalendarDays, Check } from 'lucide-react';
import type { TranslationType, ExtraTranslationType } from '../translations';
import { Section, SectionHeading } from './ui/Section';
import SpotlightCard from './reactbits/SpotlightCard';

interface DiasporaViewProps {
  lang: 'sq' | 'en';
  diasporaFormData: { name: string; email: string; project: string; date: string; timezone: string };
  setDiasporaFormData: (data: { name: string; email: string; project: string; date: string; timezone: string }) => void;
  diasporaFormSubmitted: boolean;
  handleDiasporaSubmit: (e: FormEvent) => void;
  t: TranslationType;
  ex: ExtraTranslationType;
}

export default function DiasporaView({
  lang,
  diasporaFormData,
  setDiasporaFormData,
  diasporaFormSubmitted,
  handleDiasporaSubmit,
  t,
  ex,
}: DiasporaViewProps) {
  const cards = [
    { icon: Coins, title: ex.diaCard1Title, desc: ex.diaCard1Desc },
    { icon: ShieldCheck, title: ex.diaCard2Title, desc: ex.diaCard2Desc },
    { icon: Video, title: ex.diaCard3Title, desc: ex.diaCard3Desc },
  ];

  const financingPoints = lang === 'sq'
    ? ['30% parapagim standard', 'Skema private me këste pa interes', 'Koordinim i drejtpërdrejtë me escrow evropiane']
    : ['30% standard downpayment', 'Private interest-free installment plans', 'Direct coordination with European escrow'];

  const labelClass = 'text-[11px] font-display font-semibold text-brand-muted uppercase tracking-[0.14em] block mb-2';
  const fieldClass = 'w-full border border-brand-line px-4 py-3.5 text-sm focus:outline-none focus:border-brand-blue transition-colors bg-brand-cream text-brand-ink';

  return (
    <div className="bg-brand-paper">
      {/* Hero */}
      <div className="relative bg-brand-ink text-white overflow-hidden">
        {/* Background photography — seaside Golden Sand */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.sanity.io/images/ubwtzl2q/production/daf7a35c5b11b22e79ccd33c1c7ef7e72d937b02-2048x1143.jpg?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover animate-kenburns"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/85 to-brand-ink/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/90 via-brand-ink/40 to-transparent" />
        <div className="absolute inset-0 cad-grid-blue opacity-25" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="beam-ray" style={{ left: '25%', animationDelay: '0s' }} />
          <span className="beam-ray" style={{ left: '65%', animationDelay: '-6s' }} />
        </div>
        <Section className="!py-24 md:!py-32">
          <div className="max-w-3xl">
            <span className="dia-anim-title eyebrow mb-6" style={{ color: '#6b86ff' }}>
              <Globe size={13} /> {ex.diaHeroPre}
            </span>
            <h1 className="dia-anim-title font-display font-bold text-white text-[clamp(2.5rem,6vw,5rem)] leading-[1.0] tracking-tight">
              {ex.diaHeroTitle}
            </h1>
            <p className="dia-anim-desc mt-7 text-white/60 text-base md:text-lg leading-relaxed max-w-2xl font-light">
              {ex.diaHeroDesc}
            </p>
          </div>
        </Section>
      </div>

      {/* Value props */}
      <Section className="border-b border-brand-line">
        <div className="dia-anim-cards grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <SpotlightCard key={i} className="p-8 md:p-10 flex flex-col group">
                <div className="w-14 h-14 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue flex items-center justify-center mb-8 transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-bold text-xl tracking-tight mb-3 text-brand-ink">{c.title}</h3>
                <p className="text-[15px] text-brand-muted leading-relaxed font-light">{c.desc}</p>
              </SpotlightCard>
            );
          })}
        </div>
      </Section>

      {/* Financing */}
      <Section className="border-b border-brand-line">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeading eyebrow={lang === 'sq' ? 'Financim' : 'Financing'} title={ex.diaFinancingTitle} subtitle={ex.diaFinancingDesc} />
            <div className="mt-8 space-y-4">
              {financingPoints.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                    <Check size={14} />
                  </span>
                  <span className="text-sm font-medium text-brand-ink">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal parallax-wrap relative aspect-[4/3] overflow-hidden zoom-container">
            <img
              src="https://cdn.sanity.io/images/ubwtzl2q/production/daf7a35c5b11b22e79ccd33c1c7ef7e72d937b02-2048x1143.jpg?w=1400&q=80"
              alt="Golden Sand seaside villa"
              className="parallax-img w-full h-[120%] -top-[10%] absolute inset-x-0 object-cover"
            />
            <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/60" />
            <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/60" />
          </div>
        </div>
      </Section>

      {/* Booking form */}
      <Section>
        <div className="reveal max-w-3xl mx-auto card-arch p-8 md:p-12">
          {diasporaFormSubmitted ? (
            <div className="h-[320px] flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mb-6">
                <Check size={28} className="animate-scale" />
              </div>
              <h3 className="font-display font-medium text-2xl mb-2 text-brand-ink">{t.formSuccess}</h3>
              <p className="text-brand-muted text-sm max-w-xs font-light">{t.formSuccessDesc}</p>
            </div>
          ) : (
            <form onSubmit={handleDiasporaSubmit} className="space-y-8">
              <SectionHeading eyebrow={lang === 'sq' ? 'Takim virtual' : 'Virtual meeting'} title={ex.diaFormTitle} subtitle={ex.diaFormDesc} align="center" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>{t.formName} *</label>
                  <input
                    type="text" required placeholder={lang === 'sq' ? 'Emër Mbiemër' : 'First Last'} value={diasporaFormData.name}
                    onChange={(e) => setDiasporaFormData({ ...diasporaFormData, name: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{t.formEmail} *</label>
                  <input
                    type="email" required placeholder="@email.com" value={diasporaFormData.email}
                    onChange={(e) => setDiasporaFormData({ ...diasporaFormData, email: e.target.value })}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>{lang === 'sq' ? 'Zgjidh Projektin' : 'Select Project'} *</label>
                  <select
                    value={diasporaFormData.project}
                    onChange={(e) => setDiasporaFormData({ ...diasporaFormData, project: e.target.value })}
                    className={fieldClass}
                  >
                    <option value="Golden Sand">Golden Sand (Shkodër)</option>
                    <option value="Peak Tower">Peak Tower (Tiranë)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>{lang === 'sq' ? 'Data e Preferuar' : 'Preferred Date'} *</label>
                  <input
                    type="date" required value={diasporaFormData.date}
                    onChange={(e) => setDiasporaFormData({ ...diasporaFormData, date: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{ex.diaFormTz} *</label>
                  <select
                    value={diasporaFormData.timezone}
                    onChange={(e) => setDiasporaFormData({ ...diasporaFormData, timezone: e.target.value })}
                    className={fieldClass}
                  >
                    <option value="Europe/Zurich">Europe (Zurich, Geneva, Munich)</option>
                    <option value="America/New_York">USA/Canada (New York, Boston)</option>
                    <option value="Europe/London">UK (London, Dublin)</option>
                    <option value="Europe/Tirane">Balkans (Tirana, Prishtina)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="group w-full py-4 bg-brand-blue hover:bg-brand-accent text-white text-[13px] font-display font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <CalendarDays size={16} />
                {lang === 'sq' ? 'Rezervo Konsultën Tani' : 'Book Virtual Call Now'}
              </button>
            </form>
          )}
        </div>
      </Section>
    </div>
  );
}
