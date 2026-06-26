import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import type { Project } from '../types';
import type { TranslationType } from '../translations';
import { Section, SectionHeading } from './ui/Section';

interface ProjectPageProps {
  project: Project;
  allProjects: Project[];
  lang: 'sq' | 'en';
  t: TranslationType;
  onBack: () => void;
  onOpenProject: (id: number) => void;
  onInquire: () => void;
}

export default function ProjectPage({ project, allProjects, lang, t, onBack, onOpenProject, onInquire }: ProjectPageProps) {
  const others = allProjects.filter((p) => p.id !== project.id);
  const gallery = [project.image, ...others.map((p) => p.image)].slice(0, 5);
  const idx = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(idx + 1) % allProjects.length];

  const statusText =
    project.status === 'completed' ? (lang === 'sq' ? 'Përfunduar' : 'Completed') : t.statusValue;

  const facts = [
    { label: t.location, value: project.location },
    { label: t.area, value: project.area },
    { label: t.status, value: statusText },
    ...(project.year ? [{ label: lang === 'sq' ? 'Viti' : 'Year', value: project.year }] : []),
  ];

  const specs = [
    { label: lang === 'sq' ? 'Struktura' : 'Structure', value: project.spec.structure },
    { label: lang === 'sq' ? 'Fasada' : 'Facade', value: project.spec.facade },
    { label: lang === 'sq' ? 'Efikasiteti Energjetik' : 'Energy Efficiency', value: project.spec.energy },
  ];

  return (
    <div className="bg-brand-paper">
      {/* Breadcrumb / back */}
      <div className="border-b border-brand-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between">
          <button onClick={onBack} className="group inline-flex items-center gap-2 text-sm font-display font-medium text-brand-muted hover:text-brand-ink transition-colors cursor-pointer">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            {t.projBack}
          </button>
          <span className="text-[11px] font-display font-medium uppercase tracking-[0.16em] text-brand-muted">
            {t.projectCategory}
          </span>
        </div>
      </div>

      {/* Title block */}
      <Section className="!pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="eyebrow mb-5">{statusText}</span>
            <h1 className="font-display font-bold text-brand-ink text-[clamp(2.5rem,6vw,5rem)] leading-[1.0] tracking-tight">
              {project.title}
            </h1>
            <div className="mt-5 flex items-center gap-2 text-brand-muted text-sm uppercase tracking-[0.14em]">
              <MapPin size={15} className="text-brand-blue" />
              {project.location}
            </div>
          </div>
          <button
            onClick={onInquire}
            className="group shrink-0 inline-flex items-center gap-2.5 px-7 py-4 bg-brand-blue hover:bg-brand-accent text-white text-[13px] font-display font-semibold tracking-wide transition-colors cursor-pointer"
          >
            {t.projInquire}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </Section>

      {/* Hero image */}
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20">
        <div className="reveal parallax-wrap relative aspect-[16/9] overflow-hidden">
          <img src={project.image} alt={project.title} className="parallax-img w-full h-[120%] -top-[10%] absolute inset-x-0 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 to-transparent" />
          <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-white/60" />
          <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-white/60" />
        </div>
      </div>

      {/* Key facts */}
      <Section className="!py-12">
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-line border border-brand-line">
          {facts.map((f, i) => (
            <div key={i} className="bg-brand-paper p-6">
              <div className="text-[10px] font-display font-semibold uppercase tracking-[0.16em] text-brand-muted mb-2">{f.label}</div>
              <div className="font-display font-medium text-brand-ink text-base md:text-lg leading-snug">{f.value}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Overview + specs */}
      <Section className="!pt-4 border-b border-brand-line">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <SectionHeading eyebrow={t.projOverview} title={lang === 'sq' ? 'Vizioni i projektit' : 'The project vision'} />
            <p className="mt-6 text-lg leading-relaxed text-brand-ink/80 font-light">
              {lang === 'sq' ? project.desc.sq : project.desc.en}
            </p>
            {project.features?.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {project.features.map((f, i) => (
                  <span key={i} className="text-xs font-medium text-brand-ink bg-brand-grey border border-brand-line px-3 py-1.5">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="reveal">
            <span className="eyebrow mb-6">{t.projSpecs}</span>
            <div className="mt-2 space-y-3">
              {specs.map((s, i) => (
                <div key={i} className="p-5 border border-brand-line bg-white">
                  <div className="text-[10px] text-brand-muted uppercase tracking-[0.16em] font-display font-semibold mb-1.5">{s.label}</div>
                  <p className="text-brand-ink text-[15px] font-light">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Gallery / renders */}
      <Section className="border-b border-brand-line">
        <SectionHeading eyebrow={t.projGallery} title={lang === 'sq' ? 'Renderime & pamje' : 'Renders & views'} className="mb-12" />
        <div className="grid md:grid-cols-2 gap-4">
          {gallery.map((src, i) => (
            <div key={i} className={`reveal zoom-container relative overflow-hidden ${i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}>
              <img src={src} alt={`${project.title} — ${i + 1}`} className="w-full h-full object-cover" />
              <span className="absolute bottom-4 left-4 text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-white/80 bg-brand-ink/40 px-2.5 py-1 backdrop-blur-sm">
                {lang === 'sq' ? 'Vizualizim' : 'Render'} {(i + 1).toString().padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Next project */}
      <button
        onClick={() => onOpenProject(nextProject.id)}
        className="group relative block w-full overflow-hidden text-left"
      >
        <div className="absolute inset-0">
          <img src={nextProject.image} alt={nextProject.title} className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-[1200ms]" />
          <div className="absolute inset-0 bg-brand-ink/80" />
        </div>
        <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <span className="eyebrow mb-4" style={{ color: '#6b86ff' }}>{t.projNext}</span>
          <div className="flex items-center justify-between gap-6">
            <h2 className="font-display font-bold text-white text-[clamp(2rem,5vw,4rem)] leading-none tracking-tight">{nextProject.title}</h2>
            <ArrowUpRight size={48} className="text-white shrink-0 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
          </div>
        </div>
      </button>
    </div>
  );
}
