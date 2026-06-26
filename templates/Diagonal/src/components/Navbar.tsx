import { Menu, X, ArrowUpRight } from 'lucide-react';
import type { TranslationType } from '../translations';
import { Logo } from './ui/Logo';

interface NavbarProps {
  lang: 'sq' | 'en';
  setLang: (lang: 'sq' | 'en') => void;
  currentView: 'home' | 'investors' | 'diaspora';
  changeView: (view: 'home' | 'investors' | 'diaspora', section?: string) => void;
  isTransparentNavbar: boolean;
  mobileMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  t: TranslationType;
}

export default function Navbar({
  lang,
  setLang,
  currentView,
  changeView,
  isTransparentNavbar,
  mobileMenuOpen,
  setMenuOpen,
  t,
}: NavbarProps) {
  // While the mobile menu is open, the light overlay needs a dark logo/icons.
  const onHero = isTransparentNavbar && !mobileMenuOpen;
  const navClasses = onHero
    ? 'bg-transparent text-white border-b border-white/10'
    : mobileMenuOpen
      ? 'bg-transparent text-brand-ink'
      : 'glassmorphism text-brand-ink';

  const primaryLinks = [
    { label: t.navHome, action: () => changeView('home') },
    { label: t.navAbout, action: () => changeView('home', 'about') },
    { label: t.navProjects, action: () => changeView('home', 'projects') },
    { label: t.navServices, action: () => changeView('home', 'services') },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-6 md:px-12 lg:px-20 z-40 transition-all duration-500 ${navClasses}`}
      >
        {/* Logo */}
        <button
          className="flex items-center cursor-pointer group shrink-0"
          onClick={() => changeView('home')}
          aria-label="Diagonal — home"
        >
          <Logo
            className="h-6 md:h-7"
            tagline
            lang={lang}
          />
        </button>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-9 font-display font-medium text-[13px] tracking-wide">
          {primaryLinks.map((link, i) => (
            <button
              key={i}
              onClick={link.action}
              className={`relative py-1 transition-colors duration-300 cursor-pointer group/link ${
                onHero ? 'text-white/80 hover:text-white' : 'text-brand-ink/70 hover:text-brand-ink'
              } ${i === 0 && currentView === 'home' ? (onHero ? 'text-white' : 'text-brand-ink') : ''}`}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-blue transition-all duration-300 group-hover/link:w-full" />
            </button>
          ))}

          <span className={`h-4 w-px ${onHero ? 'bg-white/20' : 'bg-brand-line'}`} />

          <button
            onClick={() => changeView('investors')}
            className={`py-1 transition-colors duration-300 cursor-pointer ${
              currentView === 'investors'
                ? 'text-brand-blue'
                : onHero
                  ? 'text-white/80 hover:text-white'
                  : 'text-brand-ink/70 hover:text-brand-ink'
            }`}
          >
            {t.navInvestors}
          </button>
          <button
            onClick={() => changeView('diaspora')}
            className={`py-1 transition-colors duration-300 cursor-pointer ${
              currentView === 'diaspora'
                ? 'text-brand-blue'
                : onHero
                  ? 'text-white/80 hover:text-white'
                  : 'text-brand-ink/70 hover:text-brand-ink'
            }`}
          >
            {t.navDiaspora}
          </button>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language toggle */}
          <div
            className={`hidden sm:flex items-center text-[11px] font-display font-semibold tracking-wider border ${
              onHero ? 'border-white/20' : 'border-brand-line'
            }`}
          >
            <button
              onClick={() => setLang('sq')}
              className={`px-2.5 py-1.5 transition-all cursor-pointer ${
                lang === 'sq'
                  ? 'bg-brand-blue text-white'
                  : onHero
                    ? 'text-white/60 hover:text-white'
                    : 'text-brand-muted hover:text-brand-ink'
              }`}
            >
              SQ
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1.5 transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-brand-blue text-white'
                  : onHero
                    ? 'text-white/60 hover:text-white'
                    : 'text-brand-muted hover:text-brand-ink'
              }`}
            >
              EN
            </button>
          </div>

          {/* Contact CTA */}
          <button
            onClick={() => changeView('home', 'contact')}
            className={`hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-display font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
              onHero
                ? 'bg-white text-brand-ink hover:bg-white/90'
                : 'bg-brand-blue text-white hover:bg-brand-accent'
            }`}
          >
            {t.navContact}
            <ArrowUpRight size={14} />
          </button>

          {/* Mobile trigger */}
          <button
            onClick={() => setMenuOpen(!mobileMenuOpen)}
            className={`flex lg:hidden p-2 border cursor-pointer ${
              onHero ? 'border-white/20 text-white' : 'border-brand-line text-brand-ink'
            }`}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-brand-paper z-30 flex flex-col justify-center px-8 animate-fade-in lg:hidden">
          <div className="cad-grid-background absolute inset-0 opacity-40 pointer-events-none" />
          <div className="relative flex flex-col gap-5 text-3xl font-display font-medium text-brand-ink">
            <button onClick={() => changeView('home')} className="text-left hover:text-brand-blue transition-colors">{t.navHome}</button>
            <button onClick={() => changeView('home', 'about')} className="text-left hover:text-brand-blue transition-colors">{t.navAbout}</button>
            <button onClick={() => changeView('home', 'projects')} className="text-left hover:text-brand-blue transition-colors">{t.navProjects}</button>
            <button onClick={() => changeView('home', 'services')} className="text-left hover:text-brand-blue transition-colors">{t.navServices}</button>
            <button onClick={() => changeView('investors')} className="text-left hover:text-brand-blue transition-colors">{t.navInvestors}</button>
            <button onClick={() => changeView('diaspora')} className="text-left hover:text-brand-blue transition-colors">{t.navDiaspora}</button>
            <button onClick={() => changeView('home', 'contact')} className="text-left text-brand-blue">{t.navContact}</button>
          </div>
          <div className="relative mt-10 flex items-center gap-2 text-sm font-display font-semibold">
            <button onClick={() => setLang('sq')} className={`px-3 py-1.5 border ${lang === 'sq' ? 'bg-brand-blue text-white border-brand-blue' : 'border-brand-line text-brand-muted'}`}>SQ</button>
            <button onClick={() => setLang('en')} className={`px-3 py-1.5 border ${lang === 'en' ? 'bg-brand-blue text-white border-brand-blue' : 'border-brand-line text-brand-muted'}`}>EN</button>
          </div>
        </div>
      )}
    </>
  );
}
