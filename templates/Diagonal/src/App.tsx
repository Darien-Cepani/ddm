import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';

import { translations, extraTranslations } from './translations';
import { getProjectsList } from './data/projects';

// Components
import SplashLoader from './components/SplashLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Values from './components/Values';
import Banner from './components/Banner';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import InvestorsView from './components/InvestorsView';
import DiasporaView from './components/DiasporaView';
import ProjectPage from './components/ProjectPage';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [lang, setLang] = useState<'sq' | 'en'>('sq');
  const [currentView, setCurrentView] = useState<'home' | 'investors' | 'diaspora'>('home');
  const [showSplash, setShowSplash] = useState(true);
  const [splashDuration, setSplashDuration] = useState(1.8);

  const t = translations[lang];
  const ex = extraTranslations[lang];

  const [projectPageId, setProjectPageId] = useState<number | null>(null);
  const [projectTab, setProjectTab] = useState<'completed' | 'new'>('new');
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);
  const [mobileMenuOpen, setMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [investorFormSubmitted, setInvestorFormSubmitted] = useState(false);
  const [diasporaFormSubmitted, setDiasporaFormSubmitted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Transparent / Scrolled navigation state listener
  const [scrolled, setScrolled] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [investorFormData, setInvestorFormData] = useState({ name: '', email: '', company: '', amount: '100000', hasNda: false });
  const [diasporaFormData, setDiasporaFormData] = useState({ name: '', email: '', project: 'Golden Sand', date: '', timezone: 'Europe/Zurich' });

  // ROI Calculator states
  const [calcAmount, setCalcAmount] = useState<number>(150000);
  const [calcYears, setCalcYears] = useState<number>(5);

  // Refs for ScrollTriggers & Animators
  const viewRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const activeProjImgRef = useRef<HTMLImageElement>(null);
  const contactCanvasRef = useRef<HTMLCanvasElement>(null);

  const projectsList = getProjectsList(lang);

  // Filter project database dynamically based on tab selection
  const filteredProjects = projectsList.filter(p => p.status === projectTab);
  const activeProjectData = filteredProjects.find(p => p.id === selectedProjectId) || filteredProjects[0] || projectsList[0];

  // Handle tab switching and updating active selected project
  const handleTabChange = (tab: 'completed' | 'new') => {
    setProjectTab(tab);
    const filtered = projectsList.filter(p => p.status === tab);
    if (filtered.length > 0) {
      handleProjectSwitch(filtered[0].id);
    }
  };

  // Re-show the loader briefly so a new page can lazily load its assets behind it
  const playNavSplash = () => {
    setSplashDuration(1.1);
    setShowSplash(true);
  };

  // JS-driven smooth scroll (reliable across long jumps + the live footer canvas)
  const animateScroll = (targetY: number) => {
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const finalY = Math.min(Math.max(targetY, 0), maxY);
    const start = window.scrollY;
    const dist = finalY - start;
    if (Math.abs(dist) < 2) return;
    const dur = 700;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let startTs: number | undefined;
    const stepFrame = (ts: number) => {
      if (startTs === undefined) startTs = ts;
      const p = Math.min((ts - startTs) / dur, 1);
      window.scrollTo({ top: start + dist * ease(p), behavior: 'instant' as ScrollBehavior });
      if (p < 1) requestAnimationFrame(stepFrame);
    };
    requestAnimationFrame(stepFrame);
    // Safety net: if rAF is starved (heavy WebGL/map init), guarantee the landing.
    window.setTimeout(() => {
      if (Math.abs(window.scrollY - finalY) > 4) {
        window.scrollTo({ top: finalY, behavior: 'instant' as ScrollBehavior });
      }
    }, dur + 300);
  };
  const sectionY = (id: string, offset = 80) => {
    const el = document.getElementById(id);
    if (!el) return null;
    // #contact is the final footer — snap to the very bottom so it's fully framed
    if (id === 'contact') return document.documentElement.scrollHeight;
    return el.getBoundingClientRect().top + window.scrollY - offset;
  };

  // Open / close full project detail page
  const openProject = (id: number) => {
    setMenuOpen(false);
    setProjectPageId(id);
    playNavSplash();
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };
  const closeProject = () => {
    setProjectPageId(null);
    setCurrentView('home');
    playNavSplash();
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setTimeout(() => {
      const y = sectionY('projects');
      if (y !== null) window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
    }, 500);
  };
  const projectPageData = projectPageId !== null ? projectsList.find(p => p.id === projectPageId) : null;

  // Listen to viewport scroll state to flip transparent/white navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom cursor and CAD coordinates
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // HTML5 Interactive Canvas Dot-Field Background Component (ReactBits Dot-Field)
  useEffect(() => {
    if (showSplash || currentView !== 'home' || !contactCanvasRef.current) return;
    const canvas = contactCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || 800;
    let height = canvas.height = canvas.parentElement?.clientHeight || 600;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Grid of dots setup
    const dots: Array<{ x: number; y: number; baseX: number; baseY: number; size: number }> = [];
    const spacing = 40;
    for (let x = spacing / 2; x < width; x += spacing) {
      for (let y = spacing / 2; y < height; y += spacing) {
        dots.push({ x, y, baseX: x, baseY: y, size: 1.2 });
      }
    }

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const maxDist = 120;

      dots.forEach(dot => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          dot.x -= (dx / dist) * force * 12;
          dot.y -= (dy / dist) * force * 12;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.08;
          dot.y += (dot.baseY - dot.y) * 0.08;
        }

        ctx.fillStyle = dist < maxDist ? '#5951ff' : 'rgba(22, 10, 255, 0.45)';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showSplash, currentView]);

  // Handle Dynamic GSAP Switching on Projects
  const handleProjectSwitch = (id: number) => {
    if (id === selectedProjectId) return;
    gsap.timeline()
      .to(activeProjImgRef.current, { opacity: 0, scale: 0.96, duration: 0.25, ease: "power2.in" })
      .call(() => setSelectedProjectId(id))
      .to(activeProjImgRef.current, { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" });
  };

  // GSAP scroll-reveals, parallax & entrances
  useGSAP(() => {
    if (showSplash) return;

    // Site-wide scroll reveal — any element with `.reveal` fades + rises in as it
    // enters. Per-element `once` triggers also resolve elements already scrolled
    // past (e.g. after a jump-to-section), so nothing can stay stuck hidden.
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    // Subtle parallax on flagged images (inside an overflow-hidden `.parallax-wrap`)
    gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.parallax-wrap') || img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    if (currentView === 'home') {
      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, delay: 0.2 })
        .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.9')
        .fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.8')
        .fromTo(btnsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.7');

      // About statement word-by-word reveal on scroll
      const words = document.querySelectorAll('.vision-word');
      if (words.length > 0 && visionRef.current) {
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: { trigger: visionRef.current, start: 'top 75%', end: 'top 25%', scrub: true },
          }
        );
      }

      // Stat counters
      document.querySelectorAll('.stat-counter').forEach((stat) => {
        const targetVal = parseInt(stat.getAttribute('data-target') || '0', 10);
        const obj = { value: 0 };
        gsap.to(obj, {
          value: targetVal,
          scrollTrigger: { trigger: stat, start: 'top 85%' },
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => {
            stat.textContent = Math.ceil(obj.value).toString() + (stat.getAttribute('data-suffix') || '');
          },
        });
      });
    }

    if (currentView === 'investors') {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.inv-anim-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo('.inv-anim-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.8');
    }

    if (currentView === 'diaspora') {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.dia-anim-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo('.dia-anim-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.8');
    }

    // Recompute positions once images/layout settle
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(refreshId);
  }, [currentView, lang, showSplash, projectPageId]);

  // Submission handlers
  const handleHomeContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 5000);
  };

  const handleInvestorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!investorFormData.name || !investorFormData.email) return;
    setInvestorFormSubmitted(true);
    setTimeout(() => {
      setInvestorFormSubmitted(false);
      setInvestorFormData({ name: '', email: '', company: '', amount: '100000', hasNda: false });
    }, 5000);
  };

  const handleDiasporaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diasporaFormData.name || !diasporaFormData.email || !diasporaFormData.date) return;
    setDiasporaFormSubmitted(true);
    setTimeout(() => {
      setDiasporaFormSubmitted(false);
      setDiasporaFormData({ name: '', email: '', project: 'Golden Sand', date: '', timezone: 'Europe/Zurich' });
    }, 5000);
  };

  // Smooth routing: switch views (with a brief loader) or scroll within the current view
  const changeView = (view: 'home' | 'investors' | 'diaspora', sectionId?: string) => {
    setMenuOpen(false);
    const viewChanged = view !== currentView || projectPageId !== null;

    if (viewChanged) {
      setProjectPageId(null);
      setCurrentView(view);
      playNavSplash();
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      if (sectionId) {
        // position the target section behind the loader, revealed when it lifts
        setTimeout(() => {
          const y = sectionY(sectionId);
          if (y !== null) window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
        }, 500);
      }
    } else if (sectionId) {
      const y = sectionY(sectionId);
      if (y !== null) animateScroll(y);
    } else {
      animateScroll(0);
    }
  };

  const isTransparentNavbar = currentView === 'home' && projectPageId === null && !scrolled;

  return (
    <div className="bg-brand-paper min-h-screen text-brand-ink antialiased overflow-x-hidden selection:bg-brand-blue selection:text-white font-sans relative">
      
      {/* Splash Loader */}
      {showSplash && (
        <SplashLoader lang={lang} duration={splashDuration} onComplete={() => setShowSplash(false)} />
      )}

      {/* Navigation */}
      <Navbar 
        lang={lang}
        setLang={setLang}
        currentView={currentView}
        changeView={changeView}
        isTransparentNavbar={isTransparentNavbar}
        mobileMenuOpen={mobileMenuOpen}
        setMenuOpen={setMenuOpen}
        t={t}
      />

      {/* Active Animated View Portal */}
      <div ref={viewRef} className={`${currentView === 'home' && projectPageId === null ? 'pt-0' : 'pt-20'} min-h-screen`}>

        {projectPageData ? (
          <ProjectPage
            project={projectPageData}
            allProjects={projectsList}
            lang={lang}
            t={t}
            onBack={closeProject}
            onOpenProject={openProject}
            onInquire={() => changeView('home', 'contact')}
          />
        ) : (
        <>
        {/* VIEW 1: HOME VIEW */}
        {currentView === 'home' && (
          <>
            <Hero 
              heroRef={heroRef}
              titleRef={titleRef}
              subtitleRef={subtitleRef}
              descRef={descRef}
              btnsRef={btnsRef}
              lang={lang}
              changeView={changeView}
              t={t}
            />

            <Stats statsRef={statsRef} t={t} />

            <About visionRef={visionRef} lang={lang} t={t} />

            <Projects 
              activeProjImgRef={activeProjImgRef}
              lang={lang}
              projectTab={projectTab}
              handleTabChange={handleTabChange}
              selectedProjectId={selectedProjectId}
              setSelectedProjectId={handleProjectSwitch}
              activeProjectData={activeProjectData}
              filteredProjects={filteredProjects}
              onOpenProject={openProject}
              t={t}
            />

            <Services t={t} />

            <Banner 
              lang={lang}
              changeView={changeView}
              t={t}
            />

            <Timeline lang={lang} t={t} />

            <Values t={t} />
          </>
        )}

        {/* VIEW 2: INVESTORS VIEW */}
        {currentView === 'investors' && (
          <InvestorsView
            lang={lang}
            calcAmount={calcAmount}
            setCalcAmount={setCalcAmount}
            calcYears={calcYears}
            setCalcYears={setCalcYears}
            investorFormData={investorFormData}
            setInvestorFormData={setInvestorFormData}
            investorFormSubmitted={investorFormSubmitted}
            handleInvestorSubmit={handleInvestorSubmit}
            t={t}
            ex={ex}
          />
        )}

        {/* VIEW 3: DIASPORA VIEW */}
        {currentView === 'diaspora' && (
          <DiasporaView
            lang={lang}
            diasporaFormData={diasporaFormData}
            setDiasporaFormData={setDiasporaFormData}
            diasporaFormSubmitted={diasporaFormSubmitted}
            handleDiasporaSubmit={handleDiasporaSubmit}
            t={t}
            ex={ex}
          />
        )}
        </>
        )}

      </div>

      {/* Global Footer (Unified with Contact Form) */}
      <Footer 
        lang={lang} 
        changeView={changeView} 
        t={t}
        contactCanvasRef={contactCanvasRef}
        contactSubmitted={contactSubmitted}
        formData={formData}
        setFormData={setFormData}
        handleHomeContactSubmit={handleHomeContactSubmit}
      />

      {/* Custom Square Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block border border-brand-blue" style={{ transform: "translate(-50%, -50%)" }}>
        <div className="w-1.5 h-1.5 bg-brand-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-none"></div>
      </div>

      {/* Smooth Back to Top corner button */}
      {showScrollTop && (
        <button 
          onClick={() => animateScroll(0)}
          className="fixed bottom-8 right-8 w-12 h-12 bg-brand-ink border border-brand-ink flex items-center justify-center shadow-xl transition-all duration-300 z-40 animate-fade-in hover:scale-105 cursor-pointer text-white hover:bg-brand-blue hover:border-brand-blue"
        >
          <ArrowUp size={20} />
        </button>
      )}

    </div>
  );
}
