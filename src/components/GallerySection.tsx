import { useState, useEffect, useRef, ChangeEvent } from 'react';
import {
  Camera,
  Plus,
  RefreshCw,
  Upload,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  MapPin,
  Layers,
  Award,
  Sparkles,
  Trash2,
  Check,
  X,
} from 'lucide-react';
import FlowerMotif from './FlowerMotif';
import GalleryLightboxModal from './GalleryLightboxModal';
import AddCategoryModal from './AddCategoryModal';
import { GalleryCategoryEntry, GalleryImage } from '../types';
import { INITIAL_GALLERY_ENTRIES } from '../data/galleryData';

const STORAGE_KEY = 'cherish_portfolio_gallery_v1';

export default function GallerySection() {
  const [entries, setEntries] = useState<GalleryCategoryEntry[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Strictly enforce real user-uploaded files only - strip out any legacy placeholder paths
            return parsed.map((entry: GalleryCategoryEntry) => ({
              ...entry,
              images: entry.images.map((img: GalleryImage): GalleryImage => ({
                ...img,
                url: img.url && img.url.startsWith('/gallery/') ? '' : img.url,
              })),
            }));
          }
        } catch {
          // fallback to initial
        }
      }
    }
    return INITIAL_GALLERY_ENTRIES;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});
  const [activeLightboxEntry, setActiveLightboxEntry] = useState<GalleryCategoryEntry | null>(null);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Targets for card-level file inputs
  const [targetEntryForAdd, setTargetEntryForAdd] = useState<string | null>(null);
  const [targetForReplace, setTargetForReplace] = useState<{ entryId: string; imageId: string } | null>(null);

  const cardAddFileInputRef = useRef<HTMLInputElement>(null);
  const cardReplaceFileInputRef = useRef<HTMLInputElement>(null);

  // Persist entries to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }
  }, [entries]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Distinct categories
  const categories = ['All', ...Array.from(new Set(entries.map((e) => e.category)))];

  const filteredEntries =
    selectedCategory === 'All'
      ? entries
      : entries.filter((e) => e.category === selectedCategory);

  const totalPhotosCount = entries.reduce((acc, curr) => acc + curr.images.length, 0);

  // Switch displayed photo for a specific entry card
  const handleCardImageChange = (entryId: string, newIndex: number) => {
    setActiveImageIndices((prev) => ({
      ...prev,
      [entryId]: newIndex,
    }));
  };

  // Open Lightbox for an entry at current card index
  const openLightbox = (entry: GalleryCategoryEntry, index?: number) => {
    const activeIdx = index !== undefined ? index : activeImageIndices[entry.id] || 0;
    setActiveLightboxEntry(entry);
    setLightboxInitialIndex(activeIdx);
  };

  // Handler: Replace an image in an entry
  const handleReplaceImage = (
    entryId: string,
    imageId: string,
    newUrl: string,
    newCaption?: string
  ) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id !== entryId) return entry;
        return {
          ...entry,
          images: entry.images.map((img) => {
            if (img.id !== imageId) return img;
            return {
              ...img,
              url: newUrl,
              caption: newCaption !== undefined ? newCaption : img.caption,
            };
          }),
        };
      })
    );

    // Update active lightbox if open
    if (activeLightboxEntry && activeLightboxEntry.id === entryId) {
      setActiveLightboxEntry((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          images: prev.images.map((img) =>
            img.id === imageId
              ? { ...img, url: newUrl, caption: newCaption !== undefined ? newCaption : img.caption }
              : img
          ),
        };
      });
    }

    showToast('Photo successfully replaced!');
  };

  // Handler: Add multiple images to an entry
  const handleAddImagesToEntry = (
    entryId: string,
    newImages: Array<{ url: string; caption: string }>
  ) => {
    const createdImages = newImages.map((item, idx) => ({
      id: `img-${Date.now()}-${idx}`,
      url: item.url,
      caption: item.caption,
      date: '2025',
    }));

    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id !== entryId) return entry;
        return {
          ...entry,
          images: [...entry.images, ...createdImages],
        };
      })
    );

    // Update active lightbox entry if open
    if (activeLightboxEntry && activeLightboxEntry.id === entryId) {
      setActiveLightboxEntry((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          images: [...prev.images, ...createdImages],
        };
      });
    }

    showToast(`Added ${newImages.length} photo(s) to entry!`);
  };

  // Handler: Delete an image from an entry
  const handleDeleteImage = (entryId: string, imageId: string) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id !== entryId) return entry;
        return {
          ...entry,
          images: entry.images.filter((img) => img.id !== imageId),
        };
      })
    );

    if (activeLightboxEntry && activeLightboxEntry.id === entryId) {
      setActiveLightboxEntry((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          images: prev.images.filter((img) => img.id !== imageId),
        };
      });
    }
  };

  // Handler: Add brand new category entry
  const handleAddEntry = (newEntry: GalleryCategoryEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
    showToast(`Created collection "${newEntry.title}" with ${newEntry.images.length} photo(s)!`);
  };

  // Handler: Delete whole category entry
  const handleDeleteEntry = (entryId: string, _title: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== entryId));
    showToast('Collection removed');
  };

  // Reset to original default gallery
  const handleResetGallery = () => {
    setEntries(INITIAL_GALLERY_ENTRIES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    showToast('Gallery restored to defaults');
  };

  // Card file input triggers
  const triggerAddPhotosForEntry = (entryId: string) => {
    setTargetEntryForAdd(entryId);
    cardAddFileInputRef.current?.click();
  };

  const handleCardAddFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !targetEntryForAdd) return;

    const newImagesList: Array<{ url: string; caption: string }> = [];
    let processed = 0;

    Array.from(files).forEach((file: File, idx: number) => {
      if (!file.type.startsWith('image/')) {
        processed++;
        return;
      }

      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          if (dataUrl) {
            newImagesList.push({
              url: dataUrl,
              caption: `Photo ${idx + 1}`,
            });
          }
          processed++;

          if (processed === files.length && newImagesList.length > 0) {
            handleAddImagesToEntry(targetEntryForAdd, newImagesList);
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.warn('FileReader error:', err);
        processed++;
      }
    });

    e.target.value = '';
    setTargetEntryForAdd(null);
  };

  const triggerReplaceForImage = (entryId: string, imageId: string) => {
    setTargetForReplace({ entryId, imageId });
    cardReplaceFileInputRef.current?.click();
  };

  const handleCardReplaceFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetForReplace) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file (JPG, PNG, WEBP)');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          handleReplaceImage(targetForReplace.entryId, targetForReplace.imageId, dataUrl);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.warn('FileReader error:', err);
    }

    e.target.value = '';
    setTargetForReplace(null);
  };

  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 relative"
    >
      {/* Hidden File Inputs for Card Quick Actions */}
      <input
        type="file"
        ref={cardAddFileInputRef}
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleCardAddFilesChange}
      />
      <input
        type="file"
        ref={cardReplaceFileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleCardReplaceFileChange}
      />

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#7A1B2E] text-white px-5 py-2.5 rounded-full text-xs font-semibold border border-[#F1A7C1]/50 shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-[#F1A7C1]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E5DACF] dark:border-[#382229] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7A1B2E]/10 dark:bg-[#7A1B2E]/30 text-[#7A1B2E] dark:text-[#F1A7C1] border border-[#7A1B2E]/20 dark:border-[#F1A7C1]/30 mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Milestones & Memories</span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F191B] dark:text-white tracking-tight">
              Personal & Academic Gallery
            </h2>
            <FlowerMotif size={28} className="hidden sm:inline-block text-[#7A1B2E] dark:text-[#F1A7C1]" />
          </div>

          <p className="text-sm sm:text-base text-[#5C5055] dark:text-[#BDB0B6] mt-2 max-w-2xl leading-relaxed">
            A visual documentation of academic milestones, graduation with Distinction, student leadership, technical development, and community impact. Each collection contains multiple high-resolution photos.
          </p>
        </div>

        {/* Action Controls in Header */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#7A1B2E] hover:bg-[#8F2338] text-white shadow-md shadow-[#7A1B2E]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-[#F1A7C1]/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Collection Entry</span>
          </button>

          <button
            type="button"
            onClick={handleResetGallery}
            title="Reset gallery to default photos"
            className="p-2 rounded-full border border-[#E5DACF] dark:border-[#382229] bg-[#FAF4EC] dark:bg-[#1E171B] hover:bg-white dark:hover:bg-[#2A1D23] text-[#5C5055] dark:text-zinc-300 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Filter Pills & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#7A1B2E] text-white shadow-sm shadow-[#7A1B2E]/30 scale-105'
                  : 'bg-[#FAF4EC] dark:bg-[#1E171B] text-[#5C5055] dark:text-[#BDB0B6] hover:bg-white dark:hover:bg-[#2A1D23] border border-[#E5DACF] dark:border-[#382229]'
              }`}
            >
              {cat}
              {cat === 'All' ? ` (${entries.length})` : ''}
            </button>
          ))}
        </div>

        {/* Total Summary */}
        <div className="text-xs text-[#5C5055] dark:text-[#A6979E] font-medium flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-[#7A1B2E] dark:text-[#F1A7C1]" />
          <span>
            {totalPhotosCount} photos across {entries.length} category {entries.length === 1 ? 'collection' : 'collections'}
          </span>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {filteredEntries.map((entry) => {
          const currentImageIdx = activeImageIndices[entry.id] || 0;
          const activeImage = entry.images[currentImageIdx] || entry.images[0];
          const totalInEntry = entry.images.length;

          return (
            <div
              key={entry.id}
              className="flex flex-col bg-[#FAF4EC] dark:bg-[#1A1417] rounded-3xl border border-[#E5DACF] dark:border-[#33232A] shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Card Photo Stage */}
              <div className="relative aspect-4/3 w-full bg-[#FAF4EC]/80 dark:bg-[#1A1417]/80 overflow-hidden">
                {activeImage?.url && activeImage.url.trim() !== '' ? (
                  <>
                    {/* Main Real Active Image */}
                    <img
                      src={activeImage.url}
                      alt={activeImage.caption || entry.title}
                      referrerPolicy="no-referrer"
                      onClick={() => openLightbox(entry, currentImageIdx)}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />

                    {/* Ambient vignette gradient */}
                    <div
                      onClick={() => openLightbox(entry, currentImageIdx)}
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"
                    />

                    {/* Category Pill on Image */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#7A1B2E]/90 text-[#F1A7C1] backdrop-blur-md border border-[#F1A7C1]/30 shadow-md">
                        {entry.category}
                      </span>
                      {entry.badge && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-[#FAF4EC]/95 text-[#7A1B2E] backdrop-blur-md shadow-md">
                          <Award className="w-3 h-3 text-[#7A1B2E]" />
                          {entry.badge}
                        </span>
                      )}
                    </div>

                    {/* Total Photos in this category entry Badge */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-black/70 text-white backdrop-blur-md border border-white/20 shadow-md">
                      <Layers className="w-3 h-3 text-[#F1A7C1]" />
                      <span>
                        {currentImageIdx + 1} of {totalInEntry} {totalInEntry === 1 ? 'photo' : 'photos'}
                      </span>
                    </div>

                    {/* Quick Prev / Next Arrows on Card (if entry has multiple images) */}
                    {totalInEntry > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardImageChange(
                              entry.id,
                              currentImageIdx > 0 ? currentImageIdx - 1 : totalInEntry - 1
                            );
                          }}
                          title="Previous photo in this entry"
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/60 hover:bg-[#7A1B2E] text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardImageChange(
                              entry.id,
                              currentImageIdx < totalInEntry - 1 ? currentImageIdx + 1 : 0
                            );
                          }}
                          title="Next photo in this entry"
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/60 hover:bg-[#7A1B2E] text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Bottom Overlay Info on Image */}
                    <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-white text-xs">
                      <span className="truncate pr-2 font-medium opacity-90 text-[11px]">
                        {activeImage.caption}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => triggerReplaceForImage(entry.id, activeImage.id)}
                          title="Replace this photo"
                          className="p-1 rounded-md bg-black/50 hover:bg-[#7A1B2E] text-white transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openLightbox(entry, currentImageIdx)}
                          title="Open full-screen album viewer"
                          className="p-1 rounded-md bg-black/50 hover:bg-[#7A1B2E] text-white transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* EMPTY LABELED UPLOAD PLACEHOLDER CONTAINER */
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => triggerReplaceForImage(entry.id, activeImage?.id || entry.images[0]?.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        triggerReplaceForImage(entry.id, activeImage?.id || entry.images[0]?.id);
                      }
                    }}
                    className="w-full h-full border-2 border-dashed border-[#D6C7BC] dark:border-[#402B33] hover:border-[#7A1B2E] dark:hover:border-[#F1A7C1] transition-all flex flex-col items-center justify-center text-center p-4 cursor-pointer group/empty"
                    title={`Click to upload ${entry.category} photo`}
                  >
                    {/* Category Pill on Empty Stage */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#7A1B2E]/90 text-[#F1A7C1] border border-[#F1A7C1]/30 shadow-xs">
                        {entry.category}
                      </span>
                      {entry.badge && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-[#FAF4EC] dark:bg-[#2A1820] text-[#7A1B2E] dark:text-[#F1A7C1] shadow-xs">
                          <Award className="w-3 h-3 text-[#7A1B2E] dark:text-[#F1A7C1]" />
                          {entry.badge}
                        </span>
                      )}
                    </div>

                    {/* Photos Count Badge */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#FAF4EC] dark:bg-[#201519] text-[#7A1B2E] dark:text-[#F1A7C1] border border-[#E5DACF] dark:border-[#382229]">
                      <Layers className="w-3 h-3 text-[#7A1B2E] dark:text-[#F1A7C1]" />
                      <span>
                        {currentImageIdx + 1} of {totalInEntry} {totalInEntry === 1 ? 'slot' : 'slots'}
                      </span>
                    </div>

                    {/* Central Clear Label & Upload Box */}
                    <div className="flex flex-col items-center justify-center pointer-events-none mt-4">
                      <div className="w-10 h-10 rounded-full bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1] flex items-center justify-center mb-2 group-hover/empty:scale-110 transition-transform">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#7A1B2E] dark:text-[#F1A7C1] tracking-tight leading-tight mb-1">
                        Upload: {entry.category} Photo
                      </span>
                      <span className="text-[11px] text-[#5C5055] dark:text-[#BDB0B6] max-w-[220px] leading-snug line-clamp-2 mb-2.5">
                        {activeImage?.caption || 'Click or drop real photo (JPG/PNG)'}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#7A1B2E] text-white shadow-xs group-hover/empty:bg-[#8F2338] transition-colors">
                        <Upload className="w-3 h-3" />
                        <span>Browse Image</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Multi-Image Thumbnail Strip with Add & Replace Quick Actions */}
              <div className="p-3 bg-white/60 dark:bg-[#150F12] border-b border-[#E5DACF] dark:border-[#2C1C23] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {entry.images.map((img, idx) => (
                  <div key={img.id + idx} className="relative group/thumb shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCardImageChange(entry.id, idx)}
                      title={`Photo ${idx + 1}: ${img.caption || 'Empty slot'}`}
                      className={`w-11 h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex items-center justify-center ${
                        currentImageIdx === idx
                          ? 'border-[#7A1B2E] dark:border-[#F1A7C1] scale-105 shadow-sm'
                          : 'border-dashed border-[#D6C7BC] dark:border-[#402B33] opacity-70 hover:opacity-100'
                      }`}
                    >
                      {img.url && img.url.trim() !== '' ? (
                        <img
                          src={img.url}
                          alt={`Thumb ${idx + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#FAF4EC] dark:bg-[#201519] flex flex-col items-center justify-center text-[9px] text-[#7A1B2E] dark:text-[#F1A7C1] font-bold p-0.5">
                          <Upload className="w-3 h-3 mb-0.5" />
                          <span>#{idx + 1}</span>
                        </div>
                      )}
                    </button>

                    {/* Replace / Upload icon on thumbnail hover */}
                    <button
                      type="button"
                      onClick={() => triggerReplaceForImage(entry.id, img.id)}
                      title={img.url ? "Replace this photo" : "Upload photo into this slot"}
                      className="absolute -top-1 -right-1 z-10 p-0.5 rounded-full bg-[#7A1B2E] text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity shadow-sm hover:scale-110 cursor-pointer"
                    >
                      <Upload className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}

                {/* "+ Add Photo to Entry" Quick Button in Strip */}
                <button
                  type="button"
                  onClick={() => triggerAddPhotosForEntry(entry.id)}
                  title="Add photos to this collection entry"
                  className="w-11 h-11 rounded-lg border-2 border-dashed border-[#7A1B2E]/40 hover:border-[#7A1B2E] text-[#7A1B2E] dark:text-[#F1A7C1] hover:bg-[#7A1B2E]/10 flex flex-col items-center justify-center shrink-0 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Card Text Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1F191B] dark:text-white leading-tight mb-1">
                    {entry.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#7A1B2E] dark:text-[#F1A7C1] mb-2.5 leading-snug">
                    {entry.subtitle}
                  </p>

                  <p className="text-xs text-[#5C5055] dark:text-[#D6C7CE] leading-relaxed mb-4 line-clamp-2">
                    {entry.description}
                  </p>
                </div>

                {/* Card Footer Meta & Controls */}
                <div className="pt-3 border-t border-[#E5DACF]/80 dark:border-[#2C1C23] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-[#5C5055] dark:text-[#A6979E]">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#7A1B2E] dark:text-[#F1A7C1]" />
                      {entry.date}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 truncate max-w-[110px]">
                      <MapPin className="w-3 h-3 text-[#7A1B2E] dark:text-[#F1A7C1]" />
                      {entry.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* View Album Button */}
                    <button
                      type="button"
                      onClick={() => openLightbox(entry, currentImageIdx)}
                      className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#7A1B2E] hover:bg-[#8F2338] text-white transition-colors cursor-pointer"
                    >
                      View Album
                    </button>

                    {/* Delete Entry Button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteEntry(entry.id, entry.title)}
                      title="Remove this category collection"
                      className="p-1 rounded-full hover:bg-red-500/10 text-[#5C5055] hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxEntry && (
        <GalleryLightboxModal
          isOpen={!!activeLightboxEntry}
          onClose={() => setActiveLightboxEntry(null)}
          entry={activeLightboxEntry}
          initialImageIndex={lightboxInitialIndex}
          onReplaceImage={handleReplaceImage}
          onAddImagesToEntry={handleAddImagesToEntry}
          onDeleteImage={handleDeleteImage}
        />
      )}

      {/* Add New Category Entry Modal */}
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEntry={handleAddEntry}
        existingCategories={Array.from(new Set(entries.map((e) => e.category)))}
      />
    </section>
  );
}
