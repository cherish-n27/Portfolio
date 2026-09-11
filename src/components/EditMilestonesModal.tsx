import { useState, useEffect, FormEvent } from 'react';
import { X, Plus, Trash2, RotateCcw, Check, MoveUp, MoveDown, Pencil, Sparkles, BookOpen } from 'lucide-react';
import { RoadmapItem } from '../types';

interface EditMilestonesModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestones: RoadmapItem[];
  pipelineLabel: string;
  onSave: (updatedMilestones: RoadmapItem[], updatedLabel: string) => void;
  onReset: () => void;
  initialEditingId?: string | null;
}

const COMMON_STATUS_OPTIONS = [
  'Currently Learning',
  'Next Up',
  'Target 2026',
  'In Progress',
  'Completed',
] as const;

export default function EditMilestonesModal({
  isOpen,
  onClose,
  milestones: initialMilestones,
  pipelineLabel: initialPipelineLabel,
  onSave,
  onReset,
  initialEditingId,
}: EditMilestonesModalProps) {
  const [milestones, setMilestones] = useState<RoadmapItem[]>([]);
  const [pipelineLabel, setPipelineLabel] = useState(initialPipelineLabel);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // New item form state
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newIssuer, setNewIssuer] = useState('');
  const [newStatus, setNewStatus] = useState<string>('Currently Learning');
  const [newFocus, setNewFocus] = useState('');
  const [newProgress, setNewProgress] = useState(50);
  const [formError, setFormError] = useState('');
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMilestones(JSON.parse(JSON.stringify(initialMilestones)));
      setPipelineLabel(initialPipelineLabel);
      setEditingItemId(initialEditingId || null);
      setShowAddForm(false);
      setFormError('');
      setSavedFeedback(false);
    }
  }, [isOpen, initialMilestones, initialPipelineLabel, initialEditingId]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Add new milestone handler
  const handleAddMilestone = (e: FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newTitle.trim()) {
      setFormError('Please provide at least a Code (e.g. AZ-900) and Title.');
      return;
    }

    const newItem: RoadmapItem = {
      id: `milestone-${Date.now()}`,
      code: newCode.trim(),
      title: newTitle.trim(),
      issuer: newIssuer.trim() || 'Self-Paced / Industry',
      status: newStatus.trim() || 'Currently Learning',
      focus: newFocus.trim() || 'Core competencies & practical assessments',
      progressPercent: Math.min(100, Math.max(0, Number(newProgress) || 0)),
    };

    setMilestones((prev) => [...prev, newItem]);
    // Reset form
    setNewCode('');
    setNewTitle('');
    setNewIssuer('');
    setNewStatus('Currently Learning');
    setNewFocus('');
    setNewProgress(50);
    setFormError('');
    setShowAddForm(false);
  };

  // Update specific milestone field
  const handleUpdateItem = (id: string, field: keyof RoadmapItem, value: string | number) => {
    setMilestones((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          [field]: field === 'progressPercent' ? Math.min(100, Math.max(0, Number(value))) : value,
        };
      })
    );
  };

  // Delete milestone
  const handleDeleteItem = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    if (editingItemId === id) {
      setEditingItemId(null);
    }
  };

  // Move up / down
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= milestones.length) return;

    const updated = [...milestones];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setMilestones(updated);
  };

  // Save all changes
  const handleSaveAll = () => {
    onSave(milestones, pipelineLabel.trim() || '2026 Target Pipeline');
    setSavedFeedback(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#FAF4EC] dark:bg-[#1A1417] text-[#1F191B] dark:text-[#F3EBE1] rounded-3xl shadow-2xl border border-[#E5DACF] dark:border-[#33232A] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5DACF] dark:border-[#33232A] bg-[#FAF4EC]/90 dark:bg-[#1A1417]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 flex items-center justify-center text-[#7A1B2E] dark:text-[#F1A7C1]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1F191B] dark:text-white leading-tight">
                Edit Active Momentum & Learning Milestones
              </h3>
              <p className="text-xs text-[#5C5055] dark:text-[#BDB0B6]">
                Add, update, adjust progress percentages, or remove roadmap milestones.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#5C5055] hover:text-[#1F191B] dark:text-[#BDB0B6] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Target Pipeline Badge customization */}
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#251A20] border border-[#E5DACF] dark:border-[#33232A]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1] mb-1.5">
              Pipeline Badge Header Label
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={pipelineLabel}
                onChange={(e) => setPipelineLabel(e.target.value)}
                placeholder="e.g. 2026 Target Pipeline"
                className="flex-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF4EC] dark:bg-[#1A1417] border border-[#E5DACF] dark:border-[#33232A] text-[#1F191B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A1B2E]/40"
              />
              <span className="text-[11px] text-[#5C5055] dark:text-[#BDB0B6] self-center">
                (Displays on the top right of the Active Momentum card)
              </span>
            </div>
          </div>

          {/* Action Bar: Add Milestone button */}
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1]">
              Milestones List ({milestones.length})
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#7A1B2E] hover:bg-[#8F2338] text-white transition-all shadow-xs cursor-pointer"
            >
              {showAddForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{showAddForm ? 'Close Add Form' : 'Add New Milestone'}</span>
            </button>
          </div>

          {/* Add Milestone Collapsible Form */}
          {showAddForm && (
            <form
              onSubmit={handleAddMilestone}
              className="p-5 rounded-2xl bg-[#7A1B2E]/5 dark:bg-[#F1A7C1]/5 border-2 border-dashed border-[#7A1B2E]/30 dark:border-[#F1A7C1]/30 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7A1B2E] dark:text-[#F1A7C1] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> New Learning Milestone
                </span>
                <span className="text-[11px] text-[#5C5055] dark:text-[#BDB0B6]">Fill in milestone details</span>
              </div>

              {formError && (
                <div className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-xl border border-red-200 dark:border-red-900">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Code / Acronym <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="e.g. AZ-900, CompTIA A+, Cisco NetAcad"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#251A20] border border-[#E5DACF] dark:border-[#33232A] text-[#1F191B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A1B2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">
                    Title / Full Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Microsoft Azure Fundamentals"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#251A20] border border-[#E5DACF] dark:border-[#33232A] text-[#1F191B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A1B2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Platform / Issuer</label>
                  <input
                    type="text"
                    value={newIssuer}
                    onChange={(e) => setNewIssuer(e.target.value)}
                    placeholder="e.g. Microsoft, CompTIA, Google, Cisco"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#251A20] border border-[#E5DACF] dark:border-[#33232A] text-[#1F191B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A1B2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#251A20] border border-[#E5DACF] dark:border-[#33232A] text-[#1F191B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A1B2E]"
                  >
                    {COMMON_STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Key Focus / Core Topics</label>
                <input
                  type="text"
                  value={newFocus}
                  onChange={(e) => setNewFocus(e.target.value)}
                  placeholder="e.g. Cloud architecture, compute, storage, security governance"
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#251A20] border border-[#E5DACF] dark:border-[#33232A] text-[#1F191B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A1B2E]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1">
                  <span>Current Progress:</span>
                  <span className="font-mono font-bold text-[#7A1B2E] dark:text-[#F1A7C1]">
                    {newProgress}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={newProgress}
                  onChange={(e) => setNewProgress(Number(e.target.value))}
                  className="w-full accent-[#7A1B2E] dark:accent-[#F1A7C1] cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#5C5055] dark:text-[#BDB0B6] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#7A1B2E] hover:bg-[#8F2338] text-white shadow-xs cursor-pointer"
                >
                  Add Milestone to Pipeline
                </button>
              </div>
            </form>
          )}

          {/* Milestones Cards List */}
          <div className="space-y-3">
            {milestones.length === 0 ? (
              <div className="text-center py-10 px-4 rounded-2xl border-2 border-dashed border-[#E5DACF] dark:border-[#33232A]">
                <p className="text-sm text-[#5C5055] dark:text-[#BDB0B6] mb-3">
                  No active learning milestones currently in the pipeline.
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#7A1B2E] text-white cursor-pointer"
                >
                  Add Your First Milestone
                </button>
              </div>
            ) : (
              milestones.map((item, index) => {
                const isEditing = editingItemId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all p-4 ${
                      isEditing
                        ? 'bg-[#7A1B2E]/5 dark:bg-[#F1A7C1]/5 border-[#7A1B2E]/40 dark:border-[#F1A7C1]/40 ring-2 ring-[#7A1B2E]/20'
                        : 'bg-white/70 dark:bg-[#251A20]/80 border-[#E5DACF] dark:border-[#33232A] hover:border-[#7A1B2E]/30'
                    }`}
                  >
                    {/* Collapsed / Normal view */}
                    {!isEditing ? (
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/15 text-[#7A1B2E] dark:text-[#F1A7C1]">
                              {item.code}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#5C5055] dark:text-[#BDB0B6]">
                              {item.status}
                            </span>
                            {item.issuer && (
                              <span className="text-xs text-[#5C5055] dark:text-[#BDB0B6]">
                                • {item.issuer}
                              </span>
                            )}
                          </div>

                          {/* Reorder and action buttons */}
                          <div className="flex items-center gap-1 self-end sm:self-auto">
                            <button
                              onClick={() => handleMove(index, 'up')}
                              disabled={index === 0}
                              title="Move Up"
                              className="p-1.5 rounded-lg text-[#5C5055] dark:text-[#BDB0B6] hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                            >
                              <MoveUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleMove(index, 'down')}
                              disabled={index === milestones.length - 1}
                              title="Move Down"
                              className="p-1.5 rounded-lg text-[#5C5055] dark:text-[#BDB0B6] hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                            >
                              <MoveDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingItemId(item.id)}
                              title="Edit milestone details"
                              className="p-1.5 rounded-lg text-[#7A1B2E] dark:text-[#F1A7C1] hover:bg-[#7A1B2E]/10 cursor-pointer flex items-center gap-1 text-xs font-semibold px-2"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              title="Delete milestone"
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-[#1F191B] dark:text-white">
                            {item.title}
                          </h4>
                          {item.focus && (
                            <p className="text-xs text-[#5C5055] dark:text-[#BDB0B6] mt-0.5">
                              {item.focus}
                            </p>
                          )}
                        </div>

                        {/* Interactive Progress Slider */}
                        <div className="pt-1">
                          <div className="flex items-center justify-between text-xs font-medium mb-1">
                            <span className="text-[#5C5055] dark:text-[#BDB0B6]">Syllabus Progress</span>
                            <span className="font-mono font-bold text-[#7A1B2E] dark:text-[#F1A7C1]">
                              {item.progressPercent}%
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              step="1"
                              value={item.progressPercent}
                              onChange={(e) =>
                                handleUpdateItem(item.id, 'progressPercent', Number(e.target.value))
                              }
                              className="flex-1 accent-[#7A1B2E] dark:accent-[#F1A7C1] cursor-pointer h-1.5"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Expanded Edit Form for this specific milestone */
                      <div className="space-y-4 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between border-b border-[#E5DACF] dark:border-[#33232A] pb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1]">
                            Editing: {item.code || 'Milestone'}
                          </span>
                          <button
                            onClick={() => setEditingItemId(null)}
                            className="text-xs font-semibold text-[#5C5055] dark:text-[#BDB0B6] hover:text-[#1F191B] dark:hover:text-white cursor-pointer"
                          >
                            Done Editing Item
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium mb-1">Code / Short Code</label>
                            <input
                              type="text"
                              value={item.code}
                              onChange={(e) => handleUpdateItem(item.id, 'code', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-[#1A1417] border border-[#E5DACF] dark:border-[#33232A] text-[#1F191B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A1B2E]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1">Title</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-[#1A1417] border border-[#E5DACF] dark:border-[#33232A] text-[#1F191B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A1B2E]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1">Issuer / Platform</label>
                            <input
                              type="text"
                              value={item.issuer}
                              onChange={(e) => handleUpdateItem(item.id, 'issuer', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-[#1A1417] border border-[#E5DACF] dark:border-[#33232A] text-[#1F191B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A1B2E]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1">Status</label>
                            <select
                              value={item.status}
                              onChange={(e) => handleUpdateItem(item.id, 'status', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-[#1A1417] border border-[#E5DACF] dark:border-[#33232A] text-[#1F191B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A1B2E]"
                            >
                              {COMMON_STATUS_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1">Key Focus / Notes</label>
                          <input
                            type="text"
                            value={item.focus || ''}
                            onChange={(e) => handleUpdateItem(item.id, 'focus', e.target.value)}
                            placeholder="e.g. Core concepts, hardware diagnostics, networking"
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-[#1A1417] border border-[#E5DACF] dark:border-[#33232A] text-[#1F191B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A1B2E]"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs font-medium mb-1">
                            <span>Progress ({item.progressPercent}%)</span>
                            <div className="flex items-center gap-1">
                              {[25, 50, 75, 100].map((preset) => (
                                <button
                                  type="button"
                                  key={preset}
                                  onClick={() => handleUpdateItem(item.id, 'progressPercent', preset)}
                                  className="text-[10px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 hover:bg-[#7A1B2E]/10 dark:hover:bg-[#F1A7C1]/20 font-mono"
                                >
                                  {preset}%
                                </button>
                              ))}
                            </div>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={item.progressPercent}
                            onChange={(e) =>
                              handleUpdateItem(item.id, 'progressPercent', Number(e.target.value))
                            }
                            className="w-full accent-[#7A1B2E] dark:accent-[#F1A7C1] cursor-pointer"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingItemId(null)}
                            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#7A1B2E] text-white cursor-pointer"
                          >
                            Done Editing
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-[#E5DACF] dark:border-[#33232A] bg-[#FAF4EC]/95 dark:bg-[#1A1417]/95">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C5055] dark:text-[#BDB0B6] hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Milestones</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5C5055] dark:text-[#BDB0B6] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#7A1B2E] hover:bg-[#8F2338] text-white shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              {savedFeedback ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Milestones</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
