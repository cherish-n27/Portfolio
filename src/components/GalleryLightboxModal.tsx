import { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Tag,
  Check,
  Sparkles,
} from 'lucide-react';
import { GalleryCategoryEntry, GalleryImage } from '../types';

interface GalleryLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: GalleryCategoryEntry | null;
  initialImageIndex: number;
  onReplaceImage: (entryId: string, imageId: string, newUrl: string, newCaption?: string) => void;
  onAddImagesToEntry: (entryId: string, newImages: Array<{ url: string; caption: string }>) => void;
  onDeleteImage: (entryId: string, imageId: string) => void;
}

export default function GalleryLightboxModal({
  isOpen,
  onClose,
  entry,
  initialImageIndex,
  onReplaceImage,
  onAddImagesToEntry,
  onDeleteImage,
}: GalleryLightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [customCaption, setCustomCaption] = useState('');
  const [urlActionType, setUrlActionType] = useState<'replace' | 'add'>('replace');

  const replaceFileInputRef = useRef<HTMLInputElement>(null);
  const addFilesInputRef = useRef<HTMLInputElement>(null);

  // Sync index when initialImageIndex or entry changes
  useEffect(() => {
    setCurrentIndex(initialImageIndex);
  }, [initialImageIndex, entry]);

  // Keep index within bounds if images are added/removed
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
        if (isUrlModalOpen) {
          setIsUrlModalOpen(false);
        } else {
          onClose();
        }
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
  }, [isOpen, entry, currentIndex, isUrlModalOpen]);

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
    if (!currentImage?.url || currentImage.url.trim() === '') return;
    try {
      const link = document.createElement('a');
      link.href = currentImage.url;
      link.download = `Cherish_${entry.category}_${currentIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Photo download initiated');
    } catch (err) {
      console.warn('Download error:', err);
    }
  };

  // Replace active photo via file input
  const handleReplaceFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file (JPG, PNG, WEBP)');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          onReplaceImage(entry.id, currentImage.id, dataUrl);
          showToast('Photo successfully replaced in this entry!');
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.warn('FileReader error:', err);
    }
    e.target.value = '';
  };

  // Add multiple photos to current entry via file input
  const handleAddFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImagesList: Array<{ url: string; caption: string }> = [];
    let processed = 0;

    Array.from(files).forEach((file: File, idx: number) => {
      if (!file.type.startsWith('image/')) {
        processed++;
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          newImagesList.push({
            url: dataUrl,
            caption: `${entry.title} - Photo ${totalImages + idx + 1}`,
          });
        }
        processed++;

        if (processed === files.length && newImagesList.length > 0) {
          onAddImagesToEntry(entry.id, newImagesList);
          showToast(`Added ${newImagesList.length} photo(s) to this entry!`);
          setCurrentIndex(totalImages); // jump to first newly added photo
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleUrlSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    if (urlActionType === 'replace') {
      onReplaceImage(entry.id, currentImage.id, customUrl.trim(), customCaption.trim() || undefined);
      showToast('Photo replaced via URL!');
    } else {
      onAddImagesToEntry(entry.id, [
        {
          url: customUrl.trim(),
          caption: customCaption.trim() || `${entry.title} - Photo ${totalImages + 1}`,
        },
      ]);
      showToast('Photo added via URL!');
      setCurrentIndex(totalImages);
    }

    setCustomUrl('');
    setCustomCaption('');
    setIsUrlModalOpen(false);
  };

  const handleDeleteCurrent = () => {
    if (totalImages <= 1) {
      showToast('This entry must have at least one slot. You can replace the photo instead.');
      return;
    }

    onDeleteImage(entry.id, currentImage.id);
    showToast('Photo removed from entry');
    if (currentIndex >= totalImages - 1) {
      setCurrentIndex(Math.max(0, totalImages - 2));
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.title} Gallery Viewer`}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={replaceFileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleReplaceFileChange}
      />
      <input
        type="file"
        ref={addFilesInputRef}
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleAddFilesChange}
      />

      <div
        className="relative max-w-5xl w-full h-[92vh] max-h-[850px] bg-[#140D10] text-white rounded-3xl shadow-2xl border border-[#7A1B2E]/60 overflow-hidden flex flex-col justify-between animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls Bar */}
        <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 bg-[#1F1318] border-b border-[#3D222B] shrink-0 z-10">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#7A1B2E] text-[#F1A7C1] border border-[#F1A7C1]/30 shrink-0">
              <Tag className="w-3 h-3" />
              {entry.category}
            </span>
            <h3 className="text-xs sm:text-sm font-semibold text-[#FAF4EC] truncate max-w-xs sm:max-w-md">
              {entry.title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Replace Active Photo Button */}
            <button
              type="button"
              onClick={() => replaceFileInputRef.current?.click()}
              title="Replace this photo with a new image"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#2E1821] hover:bg-[#7A1B2E] text-[#F1A7C1] hover:text-white border border-[#7A1B2E] transition-all cursor-pointer"
            >
              <Upload className="w-3 h-3" />
              <span className="hidden sm:inline">Replace Photo</span>
            </button>

            {/* Add More Photos to Entry Button */}
            <button
              type="button"
              onClick={() => addFilesInputRef.current?.click()}
              title="Add more photos to this category entry (supports multiple files)"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#7A1B2E] hover:bg-[#8F2338] text-white border border-[#F1A7C1]/40 transition-all cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span className="hidden sm:inline">Add Images</span>
            </button>

            {/* URL dialog button */}
            <button
              type="button"
              onClick={() => {
                setUrlActionType('replace');
                setIsUrlModalOpen(true);
              }}
              title="Replace or add via image URL"
              className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F1A7C1]" />
            </button>

            {/* Download */}
            <button
              type="button"
              onClick={handleDownload}
              title="Download full resolution photo"
              className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Delete current photo */}
            {totalImages > 1 && (
              <button
                type="button"
                onClick={handleDeleteCurrent}
                title="Remove this photo from entry"
                className="p-1.5 rounded-full hover:bg-red-500/20 text-zinc-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              title="Close gallery viewer (Esc)"
              className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feedback Toast Notification */}
        {toastMessage && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 bg-[#7A1B2E] text-white px-4 py-1.5 rounded-full text-xs font-medium border border-[#F1A7C1]/50 shadow-xl flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
            <Check className="w-3.5 h-3.5 text-[#F1A7C1]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Photo Display Stage */}
        <div className="relative flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
          {/* Previous Button */}
          {totalImages > 1 && (
            <button
              type="button"
              onClick={goToPrev}
              title="Previous photo (Left Arrow)"
              className="absolute left-3 sm:left-6 z-20 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-[#7A1B2E] text-white backdrop-blur-xs transition-all hover:scale-110 active:scale-95 border border-white/15 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Photo Frame */}
          <div className="relative max-w-full max-h-full flex items-center justify-center group">
            {currentImage.url && currentImage.url.trim() !== '' ? (
              <>
                <img
                  key={currentImage.id + currentImage.url}
                  src={currentImage.url}
                  alt={currentImage.caption || entry.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10 transition-all duration-300"
                />

                {/* Photo Counter Overlay Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-black/65 backdrop-blur-md text-white border border-white/20 shadow-md">
                  {currentIndex + 1} / {totalImages}
                </div>
              </>
            ) : (
              /* EMPTY LABELED UPLOAD PLACEHOLDER CONTAINER */
              <div
                onClick={() => replaceFileInputRef.current?.click()}
                className="w-full max-w-lg h-[48vh] sm:h-[55vh] flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#F1A7C1]/50 bg-[#221319]/90 hover:bg-[#2A1720] rounded-3xl text-center cursor-pointer transition-all shadow-2xl"
                title="Click to upload real photo file (JPG / PNG)"
              >
                <div className="w-14 h-14 rounded-full bg-[#7A1B2E] text-[#F1A7C1] flex items-center justify-center mb-3.5 shadow-md">
                  <Upload className="w-7 h-7" />
                </div>
                <span className="text-base font-bold text-white tracking-wide mb-1">
                  Upload: Gallery Photo
                </span>
                <span className="text-xs text-[#F1A7C1]/90 max-w-sm leading-relaxed mb-4">
                  {currentImage.caption || 'Click or drop your real photograph here (JPG, PNG, WebP)'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7A1B2E] hover:bg-[#8F2338] text-white text-xs font-semibold shadow-md">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo File</span>
                </span>
                <div className="mt-4 text-[10px] text-white/50 font-mono">
                  Slot {currentIndex + 1} of {totalImages}
                </div>
              </div>
            )}
          </div>

          {/* Next Button */}
          {totalImages > 1 && (
            <button
              type="button"
              onClick={goToNext}
              title="Next photo (Right Arrow)"
              className="absolute right-3 sm:right-6 z-20 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-[#7A1B2E] text-white backdrop-blur-xs transition-all hover:scale-110 active:scale-95 border border-white/15 cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>

        {/* Bottom Information & Thumbnails Panel */}
        <div className="w-full bg-[#181014] border-t border-[#3D222B] p-3 sm:p-5 shrink-0">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Caption, Date, Location */}
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-xs sm:text-sm font-medium text-white leading-snug truncate sm:whitespace-normal">
                {currentImage.caption || entry.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-[#A6979E]">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#F1A7C1]" />
                  {currentImage.date || entry.date}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#F1A7C1]" />
                  {entry.location}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip for Multi-Image Entry */}
            {totalImages > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full sm:max-w-xs shrink-0 scrollbar-none">
                {entry.images.map((img, idx) => (
                  <button
                    key={img.id + idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    title={`View photo ${idx + 1}`}
                    className={`relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer flex items-center justify-center ${
                      currentIndex === idx
                        ? 'border-[#F1A7C1] scale-105 shadow-md shadow-[#7A1B2E]/50 ring-2 ring-[#7A1B2E]'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {img.url && img.url.trim() !== '' ? (
                      <img
                        src={img.url}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#201519] flex flex-col items-center justify-center text-[9px] text-[#F1A7C1] font-mono">
                        <Upload className="w-3 h-3 mb-0.5" />
                        <span>#{idx + 1}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal: URL Input Dialog (Alternative to file upload) */}
        {isUrlModalOpen && (
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setIsUrlModalOpen(false)}
          >
            <div
              className="bg-[#24171D] p-5 sm:p-6 rounded-2xl border border-[#7A1B2E] max-w-md w-full shadow-2xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-base font-bold text-[#F1A7C1] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {urlActionType === 'replace' ? 'Replace Photo via Image URL' : 'Add Image via URL'}
              </h4>
              <p className="text-xs text-zinc-300 mb-4">
                Paste any web image URL (JPG, PNG, WebP) to {urlActionType === 'replace' ? 'replace the active photo' : 'add it to this entry'}.
              </p>

              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#D6C7CE] mb-1">
                    Image Direct URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.example.com/photo.jpg"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#140D10] border border-[#522534] text-white focus:outline-none focus:border-[#F1A7C1]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#D6C7CE] mb-1">
                    Caption (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Caption describing this milestone"
                    value={customCaption}
                    onChange={(e) => setCustomCaption(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#140D10] border border-[#522534] text-white focus:outline-none focus:border-[#F1A7C1]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsUrlModalOpen(false)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#7A1B2E] hover:bg-[#8F2338] text-white border border-[#F1A7C1]/40"
                  >
                    {urlActionType === 'replace' ? 'Replace Photo' : 'Add Photo'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
