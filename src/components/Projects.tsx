import { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Sparkles, Layers, Info } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectTag } from '../types';
import ProjectModal from './ProjectModal';
import FlowerMotif from './FlowerMotif';
import UploadSlot from './UploadSlot';
import {
  getProjectScreenshot,
  setProjectScreenshot,
  removeProjectScreenshot,
} from '../utils/imageStorage';

interface ProjectsProps {
  initialTagFilter?: ProjectTag | 'All';
}

export default function Projects({ initialTagFilter = 'All' }: ProjectsProps) {
  const [selectedTag, setSelectedTag] = useState<ProjectTag | 'All'>(initialTagFilter);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Screenshots state persisted in localStorage
  const [projectScreenshots, setProjectScreenshots] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const map: Record<string, string> = {};
      for (const p of PROJECTS) {
        const saved = getProjectScreenshot(p.id);
        if (saved) map[p.id] = saved;
      }
      return map;
    }
    return {};
  });

  const handleUploadScreenshot = (projectId: string, dataUrl: string) => {
    setProjectScreenshot(projectId, dataUrl);
    setProjectScreenshots((prev) => ({ ...prev, [projectId]: dataUrl }));
  };

  const handleRemoveScreenshot = (projectId: string) => {
    removeProjectScreenshot(projectId);
    setProjectScreenshots((prev) => {
      const next = { ...prev };
      delete next[projectId];
      return next;
    });
  };

  const filterOptions: Array<ProjectTag | 'All'> = ['All', 'Data & Tech', 'Development', 'Leadership'];

  const filteredProjects = selectedTag === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.tags.includes(selectedTag));

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Petal Accent */}
      <div className="absolute top-20 right-[-80px] opacity-25 dark:opacity-10 pointer-events-none">
        <FlowerMotif size={280} petalColor="#F1A7C1" centerColor="#7A1B2E" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1] mb-3">
            <span>Portfolio & Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F191B] dark:text-[#F1A7C1]">
            Featured Projects & Solutions
          </h2>
          <p className="text-sm sm:text-base text-[#5C5055] dark:text-[#BDB0B6] mt-3">
            Interactive prototypes, prompt-engineered AI assistants, and systems design projects solving real South African challenges.
          </p>
          <div className="w-12 h-1 bg-[#7A1B2E] dark:bg-[#F1A7C1] rounded-full mx-auto mt-3" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((tag) => (
            <button
              key={tag}
              id={`project-filter-${tag.toLowerCase().replace(/\s+&?\s*/g, '-')}`}
              onClick={() => setSelectedTag(tag)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#7A1B2E] text-white shadow-sm scale-102'
                  : 'bg-[#FAF4EC] dark:bg-[#1A1417] text-[#5C5055] dark:text-[#BDB0B6] hover:text-[#1F191B] dark:hover:text-white border border-[#E5DACF] dark:border-[#33232A]'
              }`}
            >
              {tag}
              <span className="ml-1.5 opacity-70 text-xs">
                ({tag === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.tags.includes(tag)).length})
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="group bg-[#FAF4EC] dark:bg-[#1A1417] rounded-3xl p-6 border border-[#E5DACF] dark:border-[#33232A] hover:border-[#7A1B2E]/60 dark:hover:border-[#F1A7C1]/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Badge & Tags Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/15 text-[#7A1B2E] dark:text-[#F1A7C1]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7A1B2E] text-white">
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Project Screenshot Slot (16:9) */}
                <div className="mb-4">
                  <UploadSlot
                    id={`proj-screen-${project.id}`}
                    label="Upload: Project Screenshot"
                    sublabel={`${project.title} (16:9)`}
                    aspectRatio="16:9"
                    shape="rounded"
                    currentImage={projectScreenshots[project.id]}
                    onImageUpload={(dataUrl) => handleUploadScreenshot(project.id, dataUrl)}
                    onImageRemove={() => handleRemoveScreenshot(project.id)}
                    onViewImage={() => setActiveModalProject(project)}
                  />
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-[#1F191B] dark:text-white group-hover:text-[#7A1B2E] dark:group-hover:text-[#F1A7C1] transition-colors mb-1.5">
                  {project.title}
                </h3>
                <p className="text-xs font-semibold text-[#7A1B2E] dark:text-[#F1A7C1]/80 mb-3 line-clamp-1">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5C5055] dark:text-[#BDB0B6] leading-relaxed mb-5 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#FAF5EE] dark:bg-[#231B1F] text-[#1F191B] dark:text-[#F5EFE6] border border-[#E5DACF] dark:border-[#382229]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-transparent text-[#7A1B2E] dark:text-[#F1A7C1] font-semibold">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-[#E5DACF] dark:border-[#33232A] flex items-center justify-between gap-2">
                <button
                  id={`project-details-btn-${project.id}`}
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A1B2E] dark:text-[#F1A7C1] hover:underline cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Deep Dive</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#FAF5EE] dark:bg-[#231B1F] border border-[#E5DACF] dark:border-[#382229] flex items-center justify-center text-[#1F191B] dark:text-[#F5EFE6] hover:text-[#7A1B2E] dark:hover:text-[#F1A7C1] hover:border-[#7A1B2E] transition-colors"
                      title="View GitHub repository"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#7A1B2E] flex items-center justify-center text-[#F1A7C1] hover:bg-[#631424] transition-colors"
                      title="Open live preview"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          screenshot={activeModalProject ? projectScreenshots[activeModalProject.id] : undefined}
          onScreenshotUpload={(dataUrl) => {
            if (activeModalProject) {
              handleUploadScreenshot(activeModalProject.id, dataUrl);
            }
          }}
          onScreenshotRemove={() => {
            if (activeModalProject) {
              handleRemoveScreenshot(activeModalProject.id);
            }
          }}
        />
      </div>
    </section>
  );
}
