import { useState, useEffect } from 'react';
import { Award, ShieldCheck, Pencil, Plus, RotateCcw, Sparkles } from 'lucide-react';
import { CERTIFICATIONS, ROADMAP_ITEMS } from '../data/portfolioData';
import { RoadmapItem } from '../types';
import EditMilestonesModal from './EditMilestonesModal';
import UploadSlot from './UploadSlot';
import { getCertBadge, setCertBadge, removeCertBadge } from '../utils/imageStorage';

const MILESTONES_STORAGE_KEY = 'cherish_active_momentum_milestones';
const PIPELINE_LABEL_STORAGE_KEY = 'cherish_active_momentum_target_label';

export default function Certifications() {
  const [filter, setFilter] = useState<'All' | 'AI & ML' | 'Development' | 'Cloud & Systems'>('All');

  // Certification badge state persisted in localStorage
  const [certBadges, setCertBadges] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const map: Record<string, string> = {};
      for (const c of CERTIFICATIONS) {
        const saved = getCertBadge(c.id);
        if (saved) map[c.id] = saved;
      }
      return map;
    }
    return {};
  });

  const handleUploadBadge = (certId: string, dataUrl: string) => {
    setCertBadge(certId, dataUrl);
    setCertBadges((prev) => ({ ...prev, [certId]: dataUrl }));
  };

  const handleRemoveBadge = (certId: string) => {
    removeCertBadge(certId);
    setCertBadges((prev) => {
      const next = { ...prev };
      delete next[certId];
      return next;
    });
  };

  // Active Momentum editable state
  const [milestones, setMilestones] = useState<RoadmapItem[]>(() => {
    try {
      const saved = localStorage.getItem(MILESTONES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return ROADMAP_ITEMS;
  });

  const [pipelineLabel, setPipelineLabel] = useState<string>(() => {
    try {
      return localStorage.getItem(PIPELINE_LABEL_STORAGE_KEY) || '2026 Target Pipeline';
    } catch {
      return '2026 Target Pipeline';
    }
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [hasCustomMilestones, setHasCustomMilestones] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(MILESTONES_STORAGE_KEY);
      setHasCustomMilestones(!!saved);
    } catch {
      setHasCustomMilestones(false);
    }
  }, [milestones]);

  const handleSaveMilestones = (updated: RoadmapItem[], updatedLabel: string) => {
    setMilestones(updated);
    setPipelineLabel(updatedLabel);
    try {
      localStorage.setItem(MILESTONES_STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(PIPELINE_LABEL_STORAGE_KEY, updatedLabel);
      setHasCustomMilestones(true);
    } catch (e) {
      console.error('Failed to save milestones to localStorage', e);
    }
  };

  const handleResetMilestones = () => {
    setMilestones(ROADMAP_ITEMS);
    setPipelineLabel('2026 Target Pipeline');
    try {
      localStorage.removeItem(MILESTONES_STORAGE_KEY);
      localStorage.removeItem(PIPELINE_LABEL_STORAGE_KEY);
      setHasCustomMilestones(false);
    } catch (e) {
      console.warn('Failed to reset milestones', e);
    }
    setIsEditModalOpen(false);
  };

  const openEditModalFor = (itemId?: string) => {
    setEditingMilestoneId(itemId || null);
    setIsEditModalOpen(true);
  };

  const getFilteredCerts = () => {
    if (filter === 'AI & ML') {
      return CERTIFICATIONS.filter((c) =>
        c.skills.some((s) => s.includes('AI') || s.includes('Machine Learning') || s.includes('Regression') || s.includes('Prompt'))
      );
    }
    if (filter === 'Development') {
      return CERTIFICATIONS.filter((c) =>
        c.skills.some((s) => s.includes('Full Stack') || s.includes('Python') || s.includes('JavaScript') || s.includes('Software'))
      );
    }
    if (filter === 'Cloud & Systems') {
      return CERTIFICATIONS.filter((c) =>
        c.skills.some((s) => s.includes('M365') || s.includes('Security') || s.includes('Cloud') || s.includes('Admin'))
      );
    }
    return CERTIFICATIONS;
  };

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF4EC]/60 dark:bg-[#150F13]/60 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1] mb-3">
            <span>Continuous Learning & Verification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F191B] dark:text-[#F1A7C1]">
            Certifications & Live Roadmap
          </h2>
          <p className="text-sm sm:text-base text-[#5C5055] dark:text-[#BDB0B6] mt-3">
            Industry credentials in Artificial Intelligence, Full-Stack Development, and Microsoft 365, paired with an active certification pipeline.
          </p>
          <div className="w-12 h-1 bg-[#7A1B2E] dark:bg-[#F1A7C1] rounded-full mx-auto mt-3" />
        </div>

        {/* Live Ticker / Active Momentum Banner */}
        <div className="mb-12 bg-gradient-to-r from-[#7A1B2E] via-[#8E2238] to-[#7A1B2E] text-white p-5 sm:p-6 rounded-3xl shadow-sm border border-[#F1A7C1]/20 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F1A7C1] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F1A7C1]"></span>
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F1A7C1]">
                    Active Momentum
                  </span>
                  {hasCustomMilestones && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F1A7C1]/20 text-[#F1A7C1] border border-[#F1A7C1]/30">
                      Customized
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Currently Learning & Next Milestones
                </h3>
              </div>
            </div>

            {/* Header Controls: Pipeline Label + Edit Milestones Button */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <span className="text-xs text-[#F1A7C1]/90 bg-white/10 px-3 py-1.5 rounded-full font-mono border border-white/10">
                {pipelineLabel}
              </span>

              {hasCustomMilestones && (
                <button
                  type="button"
                  onClick={handleResetMilestones}
                  title="Reset milestones to defaults"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-all cursor-pointer border border-white/10"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => openEditModalFor()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FAF4EC] hover:bg-white text-[#7A1B2E] shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/30"
              >
                <Pencil className="w-3.5 h-3.5 text-[#7A1B2E]" />
                <span>Edit Milestones</span>
              </button>
            </div>
          </div>

          {/* Roadmap Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {milestones.map((item) => (
              <div
                key={item.id}
                onClick={() => openEditModalFor(item.id)}
                className="group relative bg-white/10 hover:bg-white/15 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 hover:border-[#F1A7C1]/50 transition-all cursor-pointer shadow-xs"
                title={`Click to edit ${item.title}`}
              >
                {/* Floating Edit Icon on Card Hover */}
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md bg-black/40 hover:bg-black/60 text-[#F1A7C1]">
                  <Pencil className="w-3 h-3" />
                </div>

                <div className="flex items-center justify-between gap-1 mb-1.5 pr-5">
                  <span className="font-mono text-xs font-bold text-[#F1A7C1]">
                    {item.code}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/20 text-white/90">
                    {item.status}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-white leading-tight mb-1 line-clamp-1 group-hover:text-[#F1A7C1] transition-colors">
                  {item.title}
                </h4>

                {item.issuer && (
                  <p className="text-[10px] text-white/60 mb-2 truncate">
                    {item.issuer}
                  </p>
                )}

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F1A7C1] rounded-full transition-all duration-700"
                    style={{ width: `${item.progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/70 mt-1">
                  <span>{item.progressPercent}% completed</span>
                  <span className="opacity-0 group-hover:opacity-100 text-[#F1A7C1] transition-opacity">
                    Edit ✎
                  </span>
                </div>
              </div>
            ))}

            {/* Quick "Add Milestone" Card */}
            <button
              type="button"
              onClick={() => openEditModalFor()}
              className="bg-white/5 hover:bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#F1A7C1]/60 transition-all flex flex-col items-center justify-center text-center gap-1.5 group cursor-pointer min-h-[105px]"
            >
              <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#F1A7C1]/20 flex items-center justify-center text-[#F1A7C1] transition-colors">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-[#F1A7C1] transition-colors">
                Add Milestone
              </span>
              <span className="text-[10px] text-white/60">
                Customize your roadmap
              </span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(['All', 'AI & ML', 'Development', 'Cloud & Systems'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                filter === cat
                  ? 'bg-[#7A1B2E] text-white shadow-xs'
                  : 'bg-[#FAF4EC] dark:bg-[#1A1417] text-[#5C5055] dark:text-[#BDB0B6] hover:text-[#1F191B] dark:hover:text-white border border-[#E5DACF] dark:border-[#33232A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Completed Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {getFilteredCerts().map((cert) => (
            <div
              key={cert.id}
              className="bg-[#FAF4EC] dark:bg-[#1A1417] p-5 rounded-2xl border border-[#E5DACF] dark:border-[#33232A] hover:border-[#7A1B2E]/50 dark:hover:border-[#F1A7C1]/50 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-14 h-14 shrink-0">
                    <UploadSlot
                      id={`cert-badge-${cert.id}`}
                      label="Upload: Badge"
                      sublabel={cert.issuer}
                      aspectRatio="1:1"
                      compact={true}
                      shape="rounded"
                      className="w-14 h-14"
                      currentImage={certBadges[cert.id]}
                      onImageUpload={(dataUrl) => handleUploadBadge(cert.id, dataUrl)}
                      onImageRemove={() => handleRemoveBadge(cert.id)}
                    />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/15 text-[#7A1B2E] dark:text-[#F1A7C1]">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#1F191B] dark:text-white mb-1 leading-snug">
                  {cert.title}
                </h4>
                <p className="text-xs font-medium text-[#7A1B2E] dark:text-[#F1A7C1] mb-2">
                  {cert.issuer}
                </p>
                <p className="text-[11px] text-[#5C5055] dark:text-[#BDB0B6] leading-relaxed mb-4 line-clamp-3">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5DACF] dark:border-[#33232A] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#5C5055] dark:text-[#BDB0B6]">
                  {cert.date}
                </span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {cert.skills.slice(0, 2).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded-md text-[9px] bg-[#FAF5EE] dark:bg-[#231B1F] text-[#5C5055] dark:text-[#BDB0B6]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Milestones Modal */}
      <EditMilestonesModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        milestones={milestones}
        pipelineLabel={pipelineLabel}
        onSave={handleSaveMilestones}
        onReset={handleResetMilestones}
        initialEditingId={editingMilestoneId}
      />
    </section>
  );
}

