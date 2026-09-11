import { X, ExternalLink, Github, CheckCircle, Cpu, Layers, Sparkles } from 'lucide-react';
import { Project } from '../types';
import UploadSlot from './UploadSlot';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  screenshot?: string;
  onScreenshotUpload?: (dataUrl: string) => void;
  onScreenshotRemove?: () => void;
}

export default function ProjectModal({
  project,
  onClose,
  screenshot,
  onScreenshotUpload,
  onScreenshotRemove,
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF4EC] dark:bg-[#1A1417] border border-[#E5DACF] dark:border-[#382229] rounded-3xl p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#E5DACF]/60 dark:bg-[#33232A] flex items-center justify-center text-[#1F191B] dark:text-[#F5EFE6] hover:bg-[#7A1B2E] hover:text-white dark:hover:bg-[#F1A7C1] dark:hover:text-[#1F191B] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Tags & Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3 pr-10">
          {project.badge && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7A1B2E] text-white">
              {project.badge}
            </span>
          )}
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-bold text-[#1F191B] dark:text-[#F1A7C1] mb-1">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-[#7A1B2E] dark:text-[#F1A7C1]/80 mb-4">
          {project.subtitle}
        </p>

        {/* Project Screenshot Slot (16:9) */}
        <div className="mb-6">
          <UploadSlot
            id={`modal-screen-${project.id}`}
            label="Upload: Project Screenshot"
            sublabel={`${project.title} (16:9 full preview)`}
            aspectRatio="16:9"
            shape="rounded"
            currentImage={screenshot}
            onImageUpload={onScreenshotUpload}
            onImageRemove={onScreenshotRemove}
          />
        </div>

        {/* Detailed Description */}
        <div className="text-sm sm:text-base text-[#5C5055] dark:text-[#E2D8DE] leading-relaxed mb-6 space-y-3">
          <p>{project.detailedDescription}</p>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1] mb-2.5 flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>Key Capabilities & Workflows</span>
          </h4>
          <ul className="space-y-2">
            {project.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#1F191B] dark:text-[#F5EFE6]">
                <CheckCircle className="w-4 h-4 text-[#7A1B2E] dark:text-[#F1A7C1] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Impact */}
        {project.impact && project.impact.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-[#7A1B2E]/5 dark:bg-[#F1A7C1]/5 border border-[#7A1B2E]/20 dark:border-[#F1A7C1]/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demonstrated Impact & Value</span>
            </h4>
            <ul className="space-y-1.5">
              {project.impact.map((imp, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-[#5C5055] dark:text-[#E2D8DE]">
                  • {imp}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Architecture Note */}
        {project.architectureNote && (
          <div className="mb-6 text-xs text-[#5C5055] dark:text-[#BDB0B6] flex items-start gap-2 bg-[#FAF5EE] dark:bg-[#231B1F] p-3 rounded-xl border border-[#E5DACF] dark:border-[#382229]">
            <Cpu className="w-4 h-4 text-[#7A1B2E] dark:text-[#F1A7C1] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#1F191B] dark:text-white">Architecture: </span>
              {project.architectureNote}
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C5055] dark:text-[#BDB0B6] mb-2">
            Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[#FAF5EE] dark:bg-[#231B1F] text-[#1F191B] dark:text-[#F5EFE6] border border-[#E5DACF] dark:border-[#382229]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E5DACF] dark:border-[#382229]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-[#7A1B2E] hover:bg-[#631424] text-white transition-colors"
            >
              <span>Live Demonstration</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#F1A7C1]" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-[#FAF5EE] dark:bg-[#231B1F] text-[#1F191B] dark:text-[#F5EFE6] border border-[#E5DACF] dark:border-[#382229] hover:border-[#7A1B2E] dark:hover:border-[#F1A7C1] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="ml-auto px-5 py-2.5 rounded-full text-xs font-medium text-[#5C5055] dark:text-[#BDB0B6] hover:text-[#1F191B] dark:hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
