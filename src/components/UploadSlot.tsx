import { useState, useRef, ChangeEvent, DragEvent, ReactNode } from 'react';
import { Upload, X, RefreshCw, Eye, Image as ImageIcon } from 'lucide-react';

interface UploadSlotProps {
  id: string;
  label: string; // e.g. "Upload: Profile Picture", "Upload: Project Screenshot", "Upload: Certification Badge"
  sublabel?: string; // e.g. "16:9 Screenshot", "Recommended 1:1 Portrait"
  aspectRatio?: '1:1' | '16:9' | '4:3' | 'auto';
  shape?: 'rounded' | 'circle';
  currentImage?: string | null;
  onImageUpload?: (dataUrl: string) => void;
  onImageRemove?: () => void;
  onViewImage?: () => void;
  className?: string;
  compact?: boolean;
  emptyHeightClass?: string;
  children?: ReactNode; // Optional custom overlay elements
}

export default function UploadSlot({
  id,
  label,
  sublabel,
  aspectRatio = '16:9',
  shape = 'rounded',
  currentImage,
  onImageUpload,
  onImageRemove,
  onViewImage,
  className = '',
  compact = false,
  emptyHeightClass,
  children,
}: UploadSlotProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WEBP)');
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result && typeof onImageUpload === 'function') {
          onImageUpload(result);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.warn('FileReader error:', err);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const triggerPicker = () => {
    fileInputRef.current?.click();
  };

  // Determine aspect ratio class
  const aspectClass = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-4/3',
    'auto': '',
  }[aspectRatio];

  const roundedClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';

  // If a real user image has been uploaded into this slot
  if (currentImage && currentImage.trim() !== '') {
    return (
      <div
        className={`relative overflow-hidden group ${aspectClass} ${roundedClass} bg-[#1F1418] border border-[#E5DACF] dark:border-[#382229] ${className}`}
      >
        <input
          id={`file-input-${id}`}
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Real User Image (Exact file preserved without AI filter/alteration) */}
        <img
          src={currentImage}
          alt={label}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-102"
        />

        {/* Hover Controls Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 z-20">
          {onViewImage && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewImage();
              }}
              title="View full image"
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs transition-transform hover:scale-110 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerPicker();
            }}
            title="Replace with another file"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#7A1B2E] hover:bg-[#912338] text-white text-xs font-semibold shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Replace</span>
          </button>

          {onImageRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onImageRemove();
              }}
              title="Remove image (return to empty upload box)"
              className="p-2 rounded-full bg-red-500/80 hover:bg-red-600 text-white transition-transform hover:scale-110 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {children}
      </div>
    );
  }

  // EMPTY UPLOAD PLACEHOLDER
  // Labeled, styled container sized correctly for its spot in layout
  return (
    <div
      id={`upload-slot-${id}`}
      role="button"
      tabIndex={0}
      onClick={triggerPicker}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerPicker();
        }
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative select-none flex flex-col items-center justify-center text-center transition-all cursor-pointer ${aspectClass} ${roundedClass} ${
        emptyHeightClass ? emptyHeightClass : ''
      } ${
        isDragging
          ? 'bg-[#7A1B2E]/15 dark:bg-[#F1A7C1]/15 border-2 border-[#7A1B2E] dark:border-[#F1A7C1] scale-101'
          : 'bg-[#FAF4EC]/70 dark:bg-[#1A1417]/80 hover:bg-[#FAF4EC] dark:hover:bg-[#201519] border-2 border-dashed border-[#D6C7BC] dark:border-[#402B33] hover:border-[#7A1B2E] dark:hover:border-[#F1A7C1]'
      } ${compact ? 'p-2' : 'p-5'} ${className}`}
      title={`Click or drop file to ${label}`}
    >
      <input
        id={`file-input-${id}`}
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
        {/* Upload Icon inside circular badge */}
        <div
          className={`rounded-full bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1] flex items-center justify-center ${
            compact ? 'w-7 h-7' : 'w-10 h-10 mb-0.5'
          }`}
        >
          <Upload className={compact ? 'w-3.5 h-3.5' : 'w-5 h-5'} />
        </div>

        {/* Primary Clear Label */}
        <span
          className={`font-bold tracking-tight text-[#7A1B2E] dark:text-[#F1A7C1] leading-tight ${
            compact ? 'text-[11px]' : 'text-xs sm:text-sm'
          }`}
        >
          {label}
        </span>

        {/* Sublabel / Instruction */}
        {!compact && (
          <span className="text-[11px] text-[#5C5055] dark:text-[#BDB0B6] max-w-[200px] leading-snug">
            {errorMessage || sublabel || 'Click or drop real image file (JPG / PNG)'}
          </span>
        )}
        {compact && errorMessage && (
          <span className="text-[9px] text-red-500 font-semibold leading-tight">
            Invalid image
          </span>
        )}
      </div>

      {children}
    </div>
  );
}
