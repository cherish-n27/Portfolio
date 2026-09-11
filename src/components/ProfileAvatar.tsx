import { useState, useRef, MouseEvent, ChangeEvent, DragEvent } from 'react';
import { Upload, Eye, RefreshCw } from 'lucide-react';
import FlowerMotif from './FlowerMotif';

interface ProfileAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showStatusDot?: boolean;
  showFlowerAccent?: boolean;
  showViewHint?: boolean;
  interactive?: boolean;
  imageSrc?: string;
  onClick?: () => void;
  onPhotoUpload?: (dataUrl: string) => void;
  className?: string;
  altText?: string;
}

export default function ProfileAvatar({
  size = 'lg',
  showStatusDot = true,
  showFlowerAccent = false,
  showViewHint = true,
  interactive = true,
  imageSrc = '',
  onClick,
  onPhotoUpload,
  className = '',
  altText = 'Cherish Nwachukwu profile portrait',
}: ProfileAvatarProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const hasImage = Boolean(imageSrc && imageSrc.trim() !== '' && !imageError);

  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36 sm:w-44 sm:h-44',
  };

  const statusDotSizes = {
    xs: 'w-1.5 h-1.5 -bottom-0.5 -right-0.5',
    sm: 'w-2.5 h-2.5 bottom-0 right-0 border-[1.5px]',
    md: 'w-3 h-3 bottom-0.5 right-0.5 border-2',
    lg: 'w-4 h-4 bottom-1 right-1 border-2',
    xl: 'w-5 h-5 bottom-2 right-2 border-2',
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        return;
      }
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result && onPhotoUpload) {
            onPhotoUpload(result);
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.warn('FileReader error:', err);
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && onPhotoUpload) {
      if (!file.type.startsWith('image/')) {
        return;
      }
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result && onPhotoUpload) {
            onPhotoUpload(result);
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.warn('FileReader error:', err);
      }
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (interactive) {
      e.stopPropagation();
      if (!hasImage && onPhotoUpload && !onClick) {
        fileInputRef.current?.click();
      } else if (onClick) {
        onClick();
      } else if (onPhotoUpload) {
        fileInputRef.current?.click();
      }
    }
  };

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          if (!hasImage && onPhotoUpload && !onClick) {
            fileInputRef.current?.click();
          } else if (onClick) {
            onClick();
          }
        }
      }}
      aria-label={hasImage ? altText : 'Upload: Profile Picture'}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Outer ambient glow ring for xl size in hero */}
      {size === 'xl' && hasImage && (
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#7A1B2E] via-[#F1A7C1] to-[#7A1B2E] opacity-60 blur-md pointer-events-none transition-all duration-300 group-hover:opacity-90 animate-pulse" />
      )}

      {/* IF REAL USER IMAGE IS LOADED */}
      {hasImage ? (
        <div
          className={`relative rounded-full overflow-hidden bg-[#7A1B2E] ring-2 ring-[#F1A7C1] dark:ring-[#7A1B2E] shadow-lg transition-all duration-300 ${
            sizeClasses[size]
          } ${
            interactive
              ? 'cursor-pointer hover:scale-105 hover:ring-[#7A1B2E] dark:hover:ring-[#F1A7C1] hover:shadow-xl focus:outline-none'
              : ''
          }`}
        >
          <img
            src={imageSrc}
            alt={altText}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Hover View / Replace Hint Overlay */}
          {interactive && showViewHint && (size === 'lg' || size === 'xl') && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white gap-1 p-2">
              <Eye className={size === 'xl' ? 'w-5 h-5 text-[#F1A7C1]' : 'w-4 h-4 text-[#F1A7C1]'} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                View Photo
              </span>
            </div>
          )}
        </div>
      ) : (
        /* EMPTY UPLOAD PLACEHOLDER CONTAINER */
        /* Sized correctly for its spot in layout, bordered box with icon and "Upload: Profile Picture" */
        <div
          className={`relative rounded-full flex flex-col items-center justify-center text-center transition-all duration-200 ${
            sizeClasses[size]
          } ${
            isDragging
              ? 'border-2 border-[#7A1B2E] dark:border-[#F1A7C1] bg-[#7A1B2E]/15 dark:bg-[#F1A7C1]/15 scale-102'
              : 'border-2 border-dashed border-[#CFC0B5] dark:border-[#422C35] hover:border-[#7A1B2E] dark:hover:border-[#F1A7C1] bg-[#FAF4EC]/80 dark:bg-[#1C1418]/80 hover:bg-[#FAF4EC] dark:hover:bg-[#22161B]'
          } ${
            interactive
              ? 'cursor-pointer hover:scale-103 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E]'
              : ''
          }`}
          title="Upload: Profile Picture (Click or drop real photo)"
        >
          {size === 'xl' ? (
            <div className="flex flex-col items-center justify-center p-2 text-center pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1] flex items-center justify-center mb-1">
                <Upload className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#7A1B2E] dark:text-[#F1A7C1] tracking-tight leading-tight">
                Upload: Profile Picture
              </span>
              <span className="text-[10px] text-[#5C5055] dark:text-[#BDB0B6] mt-0.5">
                Drop JPG / PNG
              </span>
            </div>
          ) : size === 'lg' ? (
            <div className="flex flex-col items-center justify-center p-1 text-center pointer-events-none">
              <Upload className="w-4 h-4 text-[#7A1B2E] dark:text-[#F1A7C1] mb-0.5" />
              <span className="text-[10px] font-bold text-[#7A1B2E] dark:text-[#F1A7C1] leading-tight">
                Upload: Profile
              </span>
            </div>
          ) : size === 'md' ? (
            <div className="flex flex-col items-center justify-center text-center pointer-events-none">
              <Upload className="w-3.5 h-3.5 text-[#7A1B2E] dark:text-[#F1A7C1]" />
              <span className="text-[9px] font-bold text-[#7A1B2E] dark:text-[#F1A7C1]">
                Upload
              </span>
            </div>
          ) : (
            <Upload className="w-3 h-3 text-[#7A1B2E] dark:text-[#F1A7C1]" />
          )}
        </div>
      )}

      {/* Pulsing Status Dot */}
      {showStatusDot && (
        <span
          title="Active Digital Associate & CAPACITI Trainee"
          className={`absolute rounded-full bg-emerald-500 border-white dark:border-[#1F1418] shadow-xs flex items-center justify-center ${
            statusDotSizes[size]
          }`}
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500"></span>
        </span>
      )}

      {/* Decorative Brand Flower Motif Accent */}
      {showFlowerAccent && size === 'xl' && (
        <div
          className="absolute -bottom-2 -right-2 p-1 rounded-full bg-[#FAF4EC] dark:bg-[#1A1417] border border-[#E5DACF] dark:border-[#382229] shadow-md pointer-events-none"
          title="Cherish Brand Motif"
        >
          <FlowerMotif size={26} petalColor="#F1A7C1" centerColor="#7A1B2E" />
        </div>
      )}
    </div>
  );
}
