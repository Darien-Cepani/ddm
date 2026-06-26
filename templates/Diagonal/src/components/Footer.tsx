import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import type { FormEvent, RefObject } from 'react';
import type { TranslationType } from '../translations';
import Beams from './Beams';
import { Logo } from './ui/Logo';
import FooterMap from './ui/FooterMap';

interface FooterProps {
  lang: 'sq' | 'en';
  changeView: (view: 'home' | 'investors' | 'diaspora', section?: string) => void;
  t: TranslationType;
  contactCanvasRef: RefObject<HTMLCanvasElement | null>;
  contactSubmitted: boolean;
  formData: { name: string; email: string; phone: string; message: string };
  setFormData: (data: { name: string; email: string; phone: string; message: string }) => void;
  handleHomeContactSubmit: (e: FormEvent) => void;
}

export default function Footer({
  lang,
  changeView,
  t,
  contactSubmitted,
  formData,
  setFormData,
  handleHomeContactSubmit,
}: FooterProps) {
  const inputClass =
    'w-full border-b border-white/15 focus:border-brand-blue bg-transparent text-white py-3.5 px-0 text-sm focus:outline-none transition-colors placeholder-white/35';

  return (
    <footer id="contact" className="relative pt-28 pb-10 overflow-hidden z-20 text-white flex flex-col justify-between">
      {/* WebGL Beams backdrop (ReactBits) */}
      <div className="absolute inset-0 z-0">
        <Beams speed={3} rotation={-45} noiseIntensity={1.6} beamNumber={12} />
      </div>
      <div className="absolute inset-0 z-0 bg-brand-ink/30 pointer-events-none" />

      {/* Main grid */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20 grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">
        {/* Left: form */}
        <div className="reveal lg:col-span-7">
          <span className="eyebrow mb-5">{t.contactEyebrow}</span>
          <h2 className="font-display font-bold text-white text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-tight">
            {t.contactTitle}
          </h2>
          <p className="mt-5 text-white/55 text-sm md:text-base leading-relaxed max-w-lg font-light">
            {t.contactSubtitle}
          </p>

          {contactSubmitted ? (
            <div className="mt-12 py-10 border border-white/15 px-8 animate-fade-in">
              <div className="w-11 h-11 bg-brand-blue text-white flex items-center justify-center mb-5">
                <ArrowRight size={18} />
              </div>
              <h3 className="font-display font-medium text-2xl mb-2 text-white">{t.formSuccess}</h3>
              <p className="text-white/55 text-sm max-w-md font-light">{t.formSuccessDesc}</p>
            </div>
          ) : (
            <form onSubmit={handleHomeContactSubmit} className="mt-12 space-y-7 max-w-2xl">
              <input
                type="text" required placeholder={t.formName} value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <input
                  type="email" required placeholder={t.formEmail} value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="tel" placeholder={t.formPhone} value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
              <textarea
                required rows={3}
                placeholder={lang === 'sq' ? 'Mesazhi juaj...' : 'Your message...'}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-3 py-4 px-8 bg-brand-blue hover:bg-brand-accent text-white text-[13px] font-display font-semibold tracking-wide transition-all duration-300 cursor-pointer"
              >
                {t.formSend}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>

        {/* Right: directory */}
        <div className="reveal lg:col-span-4 lg:col-start-9 space-y-10">
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-brand-blue mt-0.5 shrink-0" />
              <p className="text-sm text-white/70 leading-relaxed font-light">
                Rruga "Faik Konica", Golden Park Residence, {lang === 'sq' ? 'Tiranë, Shqipëri' : 'Tirana, Albania'}
              </p>
            </div>
            <a href="tel:+355698043269" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
              <Phone size={16} className="text-brand-blue shrink-0" />
              +355 69 80 43 269
            </a>
            <a href="mailto:info@dpz.al" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
              <Mail size={16} className="text-brand-blue shrink-0" />
              info@dpz.al
            </a>
          </div>

          <FooterMap label={lang === 'sq' ? 'Hap në Google Maps' : 'Open in Google Maps'} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20 border-t border-white/10 pt-9 mt-20 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="text-white">
            <Logo className="h-5" />
          </div>
          <span className="text-[11px] text-white/40 font-light">© {t.rights}</span>
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-2 text-[12px] text-white/55 font-display font-medium tracking-wide">
          <button onClick={() => changeView('home', 'about')} className="hover:text-white transition-colors cursor-pointer">{t.navAbout}</button>
          <button onClick={() => changeView('home', 'projects')} className="hover:text-white transition-colors cursor-pointer">{t.navProjects}</button>
          <button onClick={() => changeView('home', 'services')} className="hover:text-white transition-colors cursor-pointer">{t.navServices}</button>
          <button onClick={() => changeView('investors')} className="hover:text-white transition-colors cursor-pointer">{t.navInvestors}</button>
          <a href="#privacy" className="hover:text-white transition-colors">{t.privacy}</a>
        </div>
      </div>
    </footer>
  );
}
