import type { FormEvent } from 'react';
import { TrendingUp, Coins, Building2, Building, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import type { TranslationType, ExtraTranslationType } from '../translations';
import { Section, SectionHeading } from './ui/Section';
import SpotlightCard from './reactbits/SpotlightCard';
import ServiceCard from './ui/ServiceCard';

interface InvestorsViewProps {
  lang: 'sq' | 'en';
  calcAmount: number;
  setCalcAmount: (val: number) => void;
  calcYears: number;
  setCalcYears: (val: number) => void;
  investorFormData: { name: string; email: string; company: string; amount: string; hasNda: boolean };
  setInvestorFormData: (data: { name: string; email: string; company: string; amount: string; hasNda: boolean }) => void;
  investorFormSubmitted: boolean;
  handleInvestorSubmit: (e: FormEvent) => void;
  t: TranslationType;
  ex: ExtraTranslationType;
}

export default function InvestorsView({
  lang,
  calcAmount,
  setCalcAmount,
  calcYears,
  setCalcYears,
  investorFormData,
  setInvestorFormData,
  investorFormSubmitted,
  handleInvestorSubmit,
  t,
  ex,
}: InvestorsViewProps) {
  const annualReturnRate = 0.195;
  const projectedNetReturn = Math.round(calcAmount * (Math.pow(1 + annualReturnRate, calcYears) - 1));
  const equivalentSqm = Math.round(calcAmount / 2100);

  const statCards = [
    {
      value: '18–22%',
      label: ex.invStatIrr,
      accent: true,
      desc: lang === 'sq'
        ? 'Vlerësim dhe të ardhura nga qiraja, të kombinuara në projekte kryesore.'
        : 'Appreciation and rental yield combined across landmark developments.',
    },
    {
      value: '100%',
      label: ex.invStatEquity,
      accent: false,
      desc: lang === 'sq'
        ? 'I mbështetur plotësisht nga asete kryesore të paluajtshme, pa levë bankare.'
        : 'Backed fully by primary real estate assets with zero external bank leverage.',
    },
    {
      value: '€120M+',
      label: ex.invStatAum,
      accent: true,
      desc: lang === 'sq'
        ? 'Asete aktive dhe të përfunduara të menaxhuara nga Diagonal në zona metropolitane.'
        : 'Active and completed assets managed by Diagonal in metropolitan zones.',
    },
  ];

  const stripNum = (s: string) => s.replace(/^\d+\.\s*/, '');
  const models = [
    { icon: Building, num: '01', title: stripNum(ex.invModel1Title), desc: ex.invModel1Desc },
    { icon: Coins, num: '02', title: stripNum(ex.invModel2Title), desc: ex.invModel2Desc },
    { icon: TrendingUp, num: '03', title: stripNum(ex.invModel3Title), desc: ex.invModel3Desc },
  ];

  return (
    <div className="bg-brand-paper">
      {/* Hero */}
      <div className="relative bg-brand-ink text-white overflow-hidden">
        {/* Background photography */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.sanity.io/images/ubwtzl2q/production/a384fb35ac23b36184e22a2346e151b7b6fdcb71-2048x1143.jpg?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover animate-kenburns"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/85 to-brand-ink/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/90 via-brand-ink/40 to-transparent" />
        <div className="absolute inset-0 cad-grid-blue opacity-25" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="beam-ray" style={{ left: '20%', animationDelay: '0s' }} />
          <span className="beam-ray" style={{ left: '60%', animationDelay: '-6s' }} />
          <span className="beam-ray" style={{ left: '85%', animationDelay: '-10s' }} />
        </div>
        <Section className="!py-24 md:!py-32">
          <div className="max-w-3xl">
            <span className="inv-anim-title eyebrow mb-6" style={{ color: '#6b86ff' }}>
              <TrendingUp size={13} /> {ex.invHeroPre}
            </span>
            <h1 className="inv-anim-title font-display font-bold text-white text-[clamp(2.5rem,6vw,5rem)] leading-[1.0] tracking-tight">
              {ex.invHeroTitle}
            </h1>
            <p className="inv-anim-desc mt-7 text-white/60 text-base md:text-lg leading-relaxed max-w-2xl font-light">
              {ex.invHeroDesc}
            </p>
          </div>
        </Section>
      </div>

      {/* Stats */}
      <Section className="border-b border-brand-line">
        <div className="inv-anim-stats grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((s, i) => (
            <SpotlightCard key={i} className="p-8 md:p-10 flex flex-col justify-between">
              <div className={`font-display font-medium text-5xl md:text-6xl tracking-tight ${s.accent ? 'text-brand-blue' : 'text-brand-ink'}`}>
                {s.value}
              </div>
              <div className="mt-6">
                <h4 className="font-display font-medium text-lg mb-2 text-brand-ink">{s.label}</h4>
                <p className="text-sm text-brand-muted leading-relaxed font-light">{s.desc}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </Section>

      {/* ROI calculator */}
      <Section className="border-b border-brand-line">
        <div className="reveal grid lg:grid-cols-5 gap-10 lg:gap-14 items-stretch card-arch p-8 md:p-12">
          <div className="lg:col-span-3 space-y-9">
            <SectionHeading
              eyebrow={lang === 'sq' ? 'Simulim ROI' : 'ROI Simulator'}
              title={ex.invCalcTitle}
              subtitle={ex.invCalcDesc}
            />

            {/* Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-display font-semibold uppercase tracking-[0.14em] text-brand-muted">{ex.invCalcAmount}</span>
                <span className="text-brand-blue text-xl font-display font-medium tabular-nums">€ {calcAmount.toLocaleString()}</span>
              </div>
              <input
                type="range" min="50000" max="1000000" step="10000" value={calcAmount}
                onChange={(e) => setCalcAmount(parseInt(e.target.value, 10))}
                className="w-full h-1.5 appearance-none cursor-pointer bg-brand-grey accent-brand-blue focus:outline-none"
              />
              <div className="flex justify-between text-[11px] text-brand-muted font-medium tabular-nums">
                <span>€ 50,000</span><span>€ 1,000,000</span>
              </div>
            </div>

            {/* Years */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-display font-semibold uppercase tracking-[0.14em] text-brand-muted">{ex.invCalcYears}</span>
                <span className="text-brand-blue text-xl font-display font-medium tabular-nums">{calcYears} {lang === 'sq' ? 'Vite' : 'Years'}</span>
              </div>
              <input
                type="range" min="1" max="10" step="1" value={calcYears}
                onChange={(e) => setCalcYears(parseInt(e.target.value, 10))}
                className="w-full h-1.5 appearance-none cursor-pointer bg-brand-grey accent-brand-blue focus:outline-none"
              />
              <div className="flex justify-between text-[11px] text-brand-muted font-medium">
                <span>1 {lang === 'sq' ? 'Vit' : 'Year'}</span><span>10 {lang === 'sq' ? 'Vite' : 'Years'}</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 p-8 bg-brand-ink text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 cad-grid-blue opacity-30" />
            <div className="space-y-6 relative z-10">
              <div>
                <span className="text-[10px] text-white/45 font-semibold uppercase tracking-[0.16em]">{ex.invCalcProjYield}</span>
                <div className="text-3xl font-display font-medium text-emerald-400 mt-1 tabular-nums">+ € {projectedNetReturn.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-[10px] text-white/45 font-semibold uppercase tracking-[0.16em]">{ex.invCalcIrr}</span>
                <div className="text-2xl font-display font-medium text-brand-blue mt-1">19.5% p.a. {lang === 'sq' ? '(Komponuar)' : '(Compounded)'}</div>
              </div>
              <div>
                <span className="text-[10px] text-white/45 font-semibold uppercase tracking-[0.16em]">{ex.invCalcSqm}</span>
                <div className="text-xl font-display font-medium text-white mt-1 flex items-center gap-2 tabular-nums">
                  <Building2 size={16} className="text-brand-blue" /> {equivalentSqm} m²
                </div>
              </div>
            </div>
            <div className="mt-8 pt-5 border-t border-white/10 relative z-10 text-[11px] text-white/40 leading-relaxed font-light">
              {lang === 'sq'
                ? '* Kthimet llogariten në mënyrë dinamike duke supozuar një çmim mesatar blerjeje prej €2,100/m² dhe 19.5% vlerësim kapital vjetor e të ardhura pasive nga qiraja.'
                : '* Returns are calculated dynamically assuming an average purchase price of €2,100/sqm and 19.5% combined annual capital appreciation and passive rental yield.'}
            </div>
          </div>
        </div>
      </Section>

      {/* Models */}
      <Section className="border-b border-brand-line">
        <SectionHeading
          eyebrow={lang === 'sq' ? 'Modelet e investimit' : 'Investment models'}
          title={ex.invModelTitle}
          subtitle={ex.invModelDesc}
          align="center"
          className="mb-16"
        />
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {models.map((m) => (
            <ServiceCard key={m.num} icon={m.icon} num={m.num} title={m.title} desc={m.desc} />
          ))}
        </div>
      </Section>

      {/* Form */}
      <Section>
        <div className="reveal max-w-3xl mx-auto card-arch p-8 md:p-12">
          {investorFormSubmitted ? (
            <div className="h-[320px] flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mb-6">
                <Check size={28} className="animate-scale" />
              </div>
              <h3 className="font-display font-medium text-2xl mb-2 text-brand-ink">{t.formSuccess}</h3>
              <p className="text-brand-muted text-sm max-w-xs font-light">{t.formSuccessDesc}</p>
            </div>
          ) : (
            <form onSubmit={handleInvestorSubmit} className="space-y-8">
              <SectionHeading
                eyebrow={lang === 'sq' ? 'OM & NDA' : 'OM & NDA'}
                title={ex.invCalcFormTitle}
                subtitle={ex.invCalcFormDesc}
                align="center"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: `${t.formName} *`, key: 'name', type: 'text', required: true, ph: lang === 'sq' ? 'Emër Mbiemër' : 'First Last' },
                  { label: `${t.formEmail} *`, key: 'email', type: 'email', required: true, ph: '@email.com' },
                  { label: lang === 'sq' ? 'Kompania / Fondi' : 'Company / Fund', key: 'company', type: 'text', required: false, ph: 'Capital Group Ltd' },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-[11px] font-display font-semibold text-brand-muted uppercase tracking-[0.14em] block mb-2">{f.label}</label>
                    <input
                      type={f.type} required={f.required} placeholder={f.ph}
                      value={investorFormData[f.key as 'name' | 'email' | 'company']}
                      onChange={(e) => setInvestorFormData({ ...investorFormData, [f.key]: e.target.value })}
                      className="w-full border border-brand-line px-4 py-3.5 text-sm focus:outline-none focus:border-brand-blue transition-colors bg-brand-cream text-brand-ink"
                    />
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox" checked={investorFormData.hasNda}
                  onChange={(e) => setInvestorFormData({ ...investorFormData, hasNda: e.target.checked })}
                  className="w-4 h-4 accent-brand-blue cursor-pointer"
                />
                <span className="text-xs text-brand-muted flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-brand-blue" />
                  {lang === 'sq' ? 'Pranoj marrëveshjen automatike të konfidencialitetit (NDA)' : 'I accept the automatic confidentiality agreement (NDA)'}
                </span>
              </label>
              <button
                type="submit"
                className="group w-full py-4 bg-brand-blue hover:bg-brand-accent text-white text-[13px] font-display font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {lang === 'sq' ? 'Kërko Memorandumin e Plotë' : 'Request Full Memorandum'}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </Section>
    </div>
  );
}
