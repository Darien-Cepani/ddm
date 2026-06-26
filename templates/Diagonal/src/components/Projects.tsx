import type { RefObject } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '../types';
import type { TranslationType } from '../translations';
import { Section, SectionHeading } from './ui/Section';

interface ProjectsProps {
  activeProjImgRef: RefObject<HTMLImageElement | null>;
  lang: 'sq' | 'en';
  projectTab: 'completed' | 'new';
  handleTabChange: (tab: 'completed' | 'new') => void;
  selectedProjectId: number;
  setSelectedProjectId: (id: number) => void;
  activeProjectData: Project;
  filteredProjects: Project[];
  onOpenProject: (id: number) => void;
  t: TranslationType;
}

export default function Projects({
  activeProjImgRef,
  lang,
  projectTab,
  handleTabChange,
  selectedProjectId,
  setSelectedProjectId,
  activeProjectData,
  filteredProjects,
  onOpenProject,
  t,
}: ProjectsProps) {
  return (
    <Section id="projects" className="bg-brand-paper border-b border-brand-line">
      {/* Header + tabs */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-14">
        <SectionHeading eyebrow={t.projectsEyebrow} title={t.newProjects} />
        <div className="flex border border-brand-line">
          {(['new', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 md:px-6 py-3 text-[12px] font-display font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                projectTab === tab ? 'bg-brand-blue text-white' : 'text-brand-muted hover:text-brand-ink'
              }`}
            >
              {tab === 'new' ? t.newTab : t.completedTab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start border-t border-brand-line pt-10">
        {/* Image */}
        <div
          onClick={() => onOpenProject(activeProjectData.id)}
          className="reveal relative aspect-[4/3] lg:aspect-[5/6] w-full overflow-hidden bg-brand-grey group cursor-pointer zoom-container"
        >
          <img
            ref={activeProjImgRef}
            src={activeProjectData.image}
            alt={activeProjectData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-transparent" />
          {/* corner ticks */}
          <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/50" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/50" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/50" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/50" />

          <div className="absolute top-6 left-6 flex flex-col gap-2 items-start">
            <span className="bg-brand-blue text-white text-[10px] font-display font-semibold uppercase px-3 py-1.5 tracking-[0.15em]">
              {t.projectCategory}
            </span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <div className="font-display font-medium text-2xl md:text-3xl tracking-tight">{activeProjectData.title}</div>
              <div className="text-xs text-white/70 mt-1 tracking-wide">{activeProjectData.location}</div>
            </div>
            <div className="text-right text-[11px] font-display tracking-wider text-white/80">
              <div className="text-white/50 uppercase">{t.area}</div>
              <div className="font-semibold">{activeProjectData.area}</div>
            </div>
          </div>
        </div>

        {/* Right: description + selector */}
        <div className="reveal flex flex-col">
          <p className="text-lg md:text-xl leading-relaxed text-brand-ink/80 font-light">{t.projectDesc}</p>
          <button
            onClick={() => onOpenProject(activeProjectData.id)}
            className="mt-7 self-start group inline-flex items-center gap-2.5 px-6 py-3.5 text-[12px] font-display font-semibold tracking-wide uppercase bg-brand-ink text-white hover:bg-brand-blue transition-colors cursor-pointer"
          >
            {lang === 'sq' ? 'Detajet e Projektit' : 'View Details'}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>

          <ul className="mt-10">
            {filteredProjects.map((project, idx) => {
              const isActive = project.id === selectedProjectId;
              return (
                <li
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`group border-t border-brand-line last:border-b py-5 transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 ${
                    isActive ? 'pl-3' : 'pl-0 opacity-50 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`font-display font-medium text-sm tabular-nums transition-colors ${
                        isActive ? 'text-brand-blue' : 'text-brand-muted'
                      }`}
                    >
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <span className="block font-display font-medium text-lg md:text-xl text-brand-ink leading-tight">
                        {project.title}
                      </span>
                      <span className="block text-[11px] font-medium text-brand-muted uppercase tracking-[0.14em] mt-0.5">
                        {project.location}
                        {project.year ? ` · ${project.year}` : ''}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className={`shrink-0 transition-all duration-300 ${
                      isActive ? 'text-brand-blue translate-x-0' : 'text-brand-line group-hover:text-brand-muted'
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
