import { useState } from 'react';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  MapPin,
  Layers,
  Award,
} from 'lucide-react';
import FlowerMotif from './FlowerMotif';
import GalleryLightboxModal from './GalleryLightboxModal';
import { GalleryCategoryEntry } from '../types';
import { INITIAL_GALLERY_ENTRIES } from '../data/galleryData';

export default function GallerySection() {
  const entries: GalleryCategoryEntry[] = INITIAL_GALLERY_ENTRIES;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});
  const [activeLightboxEntry, setActiveLightboxEntry] = useState<GalleryCategoryEntry | null>(null);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState<number>(0);

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

  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 relative"
    >
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
            Permanent visual documentation of academic milestones, graduation with Distinction, student leadership, technical development, and community impact. Each collection contains curated high-resolution photos.
          </p>
        </div>

        {/* Total Summary Badge in Header */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF4EC] dark:bg-[#1E171B] border border-[#E5DACF] dark:border-[#382229] text-xs font-semibold text-[#7A1B2E] dark:text-[#F1A7C1] shrink-0">
          <Layers className="w-4 h-4" />
          <span>{totalPhotosCount} Verified Photos</span>
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
            {totalPhotosCount} photos across {entries.length} category collections
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
              <div className="relative aspect-4/3 w-full bg-[#201419] overflow-hidden">
                {/* Main Active Image */}
                <img
                  src={activeImage?.url}
                  alt={activeImage?.caption || entry.title}
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
                    {activeImage?.caption}
                  </span>
                  <button
                    type="button"
                    onClick={() => openLightbox(entry, currentImageIdx)}
                    title="Open full-screen album viewer"
                    className="p-1 rounded-md bg-black/50 hover:bg-[#7A1B2E] text-white transition-colors cursor-pointer shrink-0"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Multi-Image Thumbnail Strip */}
              {totalInEntry > 1 && (
                <div className="p-3 bg-white/60 dark:bg-[#150F12] border-b border-[#E5DACF] dark:border-[#2C1C23] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  {entry.images.map((img, idx) => (
                    <button
                      key={img.id || idx}
                      type="button"
                      onClick={() => handleCardImageChange(entry.id, idx)}
                      title={`View photo ${idx + 1}: ${img.caption}`}
                      className={`w-11 h-11 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        currentImageIdx === idx
                          ? 'border-[#7A1B2E] dark:border-[#F1A7C1] scale-105 shadow-sm'
                          : 'border-transparent opacity-65 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`Thumb ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}

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
                    <span className="inline-flex items-center gap-1 truncate max-w-[120px]">
                      <MapPin className="w-3 h-3 text-[#7A1B2E] dark:text-[#F1A7C1]" />
                      {entry.location}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openLightbox(entry, currentImageIdx)}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-[#7A1B2E] hover:bg-[#8F2338] text-white transition-colors cursor-pointer"
                  >
                    View Album
                  </button>
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
        />
      )}
    </section>
  );
}
