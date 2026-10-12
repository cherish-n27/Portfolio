import { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  MapPin,
  Tag,
  Sparkles,
} from 'lucide-react';
import { GalleryCategoryEntry, GalleryImage } from '../types';

interface GalleryLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: GalleryCategoryEntry | null;
  initialImageIndex: number;
}

export default function GalleryLightboxModal({
  isOpen,
  onClose,
  entry,
  initialImageIndex,
}: GalleryLightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync index when initialImageIndex or entry changes
  useEffect(() => {
    setCurrentIndex(initialImageIndex);
  }, [initialImageIndex, entry]);

  // Keep index within bounds
  useEffect(() => {
    if (!entry || entry.images.length === 0) return;
    if (currentIndex >= entry.images.length) {
      setCurrentIndex(Math.max(0, entry.images.length - 1));
    }
  }, [entry, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !entry) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, entry, currentIndex]);

  if (!isOpen || !entry || entry.images.length === 0) return null;

  const currentImage: GalleryImage = entry.images[currentIndex] || entry.images[0];
  const totalImages = entry.images.length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage.url;
    link.download = `Cherish_${entry.category.replace(/\s+/g, '_')}_${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Photo download initiated');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[96vh] flex flex-col bg-[#140E11] text-white rounded-3xl border border-[#382229] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#1F1418] border-b border-[#382229] shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#7A1B2E] text-white shrink-0">
              {entry.category}
            </span>
            <span className="text-xs text-[#F1A7C1] font-mono shrink-0">
              {currentIndex + 1} of {totalImages}
            </span>
            <span className="hidden sm:inline-block text-zinc-400 text-xs truncate">
              • {entry.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Download high-resolution photo"
            >
              <Download className="w-3.5 h-3.5 text-[#F1A7C1]" />
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#7A1B2E] flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Lightbox Body: Image + Navigation */}
        <div className="relative flex-1 min-h-[50vh] sm:min-h-[58vh] bg-black flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
          {/* Main Photo View */}
          <div className="relative max-h-[62vh] sm:max-h-[66vh] max-w-full flex items-center justify-center">
            <img
              key={currentImage.id || currentImage.url}
              src={currentImage.url}
              alt={currentImage.caption || entry.title}
              referrerPolicy="no-referrer"
              className="max-h-[62vh] sm:max-h-[66vh] w-auto max-w-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-200"
            />
          </div>

          {/* Left Arrow Button */}
          {totalImages > 1 && (
            <button
              onClick={goToPrev}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#7A1B2E] border border-white/20 hover:border-[#F1A7C1] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow Button */}
          {totalImages > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#7A1B2E] border border-white/20 hover:border-[#F1A7C1] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Thumbnail Filmstrip Bar (if more than 1 image) */}
        {totalImages > 1 && (
          <div className="px-4 py-2.5 bg-[#1A1115] border-t border-[#382229] flex items-center gap-2 overflow-x-auto scrollbar-thin">
            {entry.images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'border-[#F1A7C1] scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-90'
                }`}
                title={img.caption || `Photo ${idx + 1}`}
              >
                <img
                  src={img.url}
                  alt={img.caption || `Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Photo Metadata & Details Footer */}
        <div className="p-4 sm:p-5 bg-[#1F1418] border-t border-[#382229] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex-1 pr-4">
            <h4 className="text-sm font-bold text-white mb-1 leading-snug">
              {currentImage.caption || entry.title}
            </h4>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#F1A7C1]" />
                {currentImage.date || entry.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F1A7C1]" />
                {entry.location}
              </span>
              {entry.badge && (
                <span className="flex items-center gap-1 text-[#F1A7C1]">
                  <Sparkles className="w-3 h-3" />
                  {entry.badge}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#7A1B2E] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg border border-[#F1A7C1]/30">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}
