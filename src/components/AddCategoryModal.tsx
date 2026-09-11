import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { X, Upload, Plus, Image as ImageIcon, Trash2, Tag, Calendar, MapPin } from 'lucide-react';
import { GalleryCategoryEntry } from '../types';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEntry: (newEntry: GalleryCategoryEntry) => void;
  existingCategories: string[];
}

export default function AddCategoryModal({
  isOpen,
  onClose,
  onAddEntry,
  existingCategories,
}: AddCategoryModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(existingCategories[0] || 'Academic Distinction');
  const [customCategory, setCustomCategory] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2025');
  const [location, setLocation] = useState('Cape Town, South Africa');
  const [badge, setBadge] = useState('');
  const [images, setImages] = useState<Array<{ url: string; caption: string }>>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFilesSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File, idx: number) => {
      if (!file.type.startsWith('image/')) return;

      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          if (dataUrl) {
            setImages((prev) => [
              ...prev,
              {
                url: dataUrl,
                caption: title ? `${title} - Photo ${prev.length + idx + 1}` : `Photo ${prev.length + idx + 1}`,
              },
            ]);
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.warn('FileReader error:', err);
      }
    });

    e.target.value = '';
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleUpdateCaption = (index: number, newCaption: string) => {
    setImages((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, caption: newCaption } : item))
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('Please enter a title for this collection entry.');
      return;
    }

    if (images.length === 0) {
      setValidationError('Please add at least one image to this category entry.');
      return;
    }

    const finalCategory = isNewCategory && customCategory.trim() ? customCategory.trim() : category;

    const newEntry: GalleryCategoryEntry = {
      id: `entry-${Date.now()}`,
      category: finalCategory,
      title: title.trim(),
      subtitle: subtitle.trim() || `${finalCategory} Collection`,
      description: description.trim() || 'Visual documentation and memorable milestones in tech, education, and leadership.',
      date: date.trim() || '2025',
      location: location.trim() || 'Cape Town, South Africa',
      badge: badge.trim() || undefined,
      images: images.map((img, idx) => ({
        id: `img-${Date.now()}-${idx}`,
        url: img.url,
        caption: img.caption,
        date: date.trim(),
        featured: idx === 0,
      })),
    };

    onAddEntry(newEntry);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFilesSelected}
      />

      <div
        className="relative max-w-2xl w-full max-h-[90vh] bg-[#FAF4EC] dark:bg-[#1A1316] text-[#1F191B] dark:text-white rounded-3xl shadow-2xl border border-[#E5DACF] dark:border-[#422631] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5DACF] dark:border-[#382029] bg-white/50 dark:bg-[#23171D]">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1F191B] dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#7A1B2E] dark:text-[#F1A7C1]" />
              Add New Category Entry
            </h3>
            <p className="text-xs text-[#5C5055] dark:text-[#BDB0B6]">
              Create an album entry and upload multiple images in one category
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#5C5055] dark:text-zinc-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 text-xs sm:text-sm">
          {/* Category Select & Custom Option */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1] mb-1.5 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Category *
              </label>
              {!isNewCategory ? (
                <select
                  value={category}
                  onChange={(e) => {
                    if (e.target.value === '__NEW__') {
                      setIsNewCategory(true);
                    } else {
                      setCategory(e.target.value);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DACF] dark:border-[#4A2937] bg-white dark:bg-[#120B0E] text-[#1F191B] dark:text-white focus:ring-2 focus:ring-[#7A1B2E] focus:outline-none text-xs"
                >
                  {existingCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="__NEW__">+ Create New Category...</option>
                </select>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Industry Panels & Hackathons"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E5DACF] dark:border-[#4A2937] bg-white dark:bg-[#120B0E] text-[#1F191B] dark:text-white focus:ring-2 focus:ring-[#7A1B2E] focus:outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setIsNewCategory(false)}
                    className="text-xs text-[#7A1B2E] dark:text-[#F1A7C1] underline px-1"
                  >
                    Select existing
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1] mb-1.5">
                Highlight Badge (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Distinction, Leadership Award, 2025"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DACF] dark:border-[#4A2937] bg-white dark:bg-[#120B0E] text-[#1F191B] dark:text-white focus:ring-2 focus:ring-[#7A1B2E] focus:outline-none text-xs"
              />
            </div>
          </div>

          {/* Title & Subtitle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1] mb-1.5">
              Entry Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. University Graduation Day & Honours Ceremony"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DACF] dark:border-[#4A2937] bg-white dark:bg-[#120B0E] text-[#1F191B] dark:text-white focus:ring-2 focus:ring-[#7A1B2E] focus:outline-none text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1] mb-1.5">
              Subtitle / Focus
            </label>
            <input
              type="text"
              placeholder="e.g. Celebrating Degree with Distinction & Academic Excellence"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DACF] dark:border-[#4A2937] bg-white dark:bg-[#120B0E] text-[#1F191B] dark:text-white focus:ring-2 focus:ring-[#7A1B2E] focus:outline-none text-xs"
            />
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1] mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Date / Period
              </label>
              <input
                type="text"
                placeholder="e.g. April 2025 or 2024 – 2025"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DACF] dark:border-[#4A2937] bg-white dark:bg-[#120B0E] text-[#1F191B] dark:text-white focus:ring-2 focus:ring-[#7A1B2E] focus:outline-none text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1] mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Location
              </label>
              <input
                type="text"
                placeholder="e.g. Cape Town, South Africa"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DACF] dark:border-[#4A2937] bg-white dark:bg-[#120B0E] text-[#1F191B] dark:text-white focus:ring-2 focus:ring-[#7A1B2E] focus:outline-none text-xs"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1] mb-1.5">
              Description & Milestone Notes
            </label>
            <textarea
              rows={2}
              placeholder="Add key context, takeaways, or achievements depicted in these photos..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DACF] dark:border-[#4A2937] bg-white dark:bg-[#120B0E] text-[#1F191B] dark:text-white focus:ring-2 focus:ring-[#7A1B2E] focus:outline-none text-xs leading-relaxed"
            />
          </div>

          {/* Multiple Images Upload Box */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1] flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" /> Upload Images to This Entry * ({images.length} added)
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#7A1B2E] hover:bg-[#8F2338] text-white transition-colors cursor-pointer"
              >
                <Upload className="w-3 h-3" /> Select Images
              </button>
            </div>

            {images.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-[#7A1B2E]/40 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#7A1B2E] hover:bg-[#7A1B2E]/5 transition-all"
              >
                <Upload className="w-8 h-8 text-[#7A1B2E] dark:text-[#F1A7C1] mb-2 opacity-80" />
                <p className="text-xs font-bold text-[#1F191B] dark:text-white">
                  Click to select multiple photos
                </p>
                <p className="text-[11px] text-[#5C5055] dark:text-[#BDB0B6] mt-0.5">
                  Supports JPEG, PNG, WebP (select multiple files at once)
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-48 overflow-y-auto p-1">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-[#120B0E] border border-[#E5DACF] dark:border-[#382229]"
                  >
                    <img
                      src={img.url}
                      alt={`Upload ${idx + 1}`}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <input
                      type="text"
                      value={img.caption}
                      onChange={(e) => handleUpdateCaption(idx, e.target.value)}
                      placeholder="Photo caption..."
                      className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-[#E5DACF] dark:border-[#4A2937] bg-transparent text-[#1F191B] dark:text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      title="Remove image"
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Validation Error */}
          {validationError && (
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold">
              {validationError}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#E5DACF] dark:border-[#382029]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#5C5055] dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={images.length === 0}
              className="px-5 py-2 rounded-full text-xs font-bold bg-[#7A1B2E] hover:bg-[#8F2338] text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Save Entry ({images.length} {images.length === 1 ? 'image' : 'images'})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
