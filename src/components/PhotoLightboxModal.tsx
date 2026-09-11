import { useEffect, useRef, useState, ChangeEvent, DragEvent } from 'react';
import { X, Download, GraduationCap, Award, MapPin, Upload, RefreshCw, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface PhotoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
  onPhotoUpdate?: (newPhotoUrl: string) => void;
  onResetPhoto?: () => void;
  isCustomPhoto?: boolean;
}

export default function PhotoLightboxModal({
  isOpen,
  onClose,
  imageSrc = '',
  onPhotoUpdate,
  onResetPhoto,
  isCustomPhoto = false,
}: PhotoLightboxModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!imageSrc || imageSrc.trim() === '') return;
    try {
      const link = document.createElement('a');
      link.href = imageSrc;
      link.download = 'Cherish_Nwachukwu_Profile.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.warn('Download error:', err);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file (JPEG, PNG, WEBP, etc.)');
      setTimeout(() => setFileError(null), 3500);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result && onPhotoUpdate) {
          onPhotoUpdate(result);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
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
    if (file) {
      processFile(file);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cherish Nwachukwu Profile Photo"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#181114] text-white rounded-3xl shadow-2xl border border-[#7A1B2E]/50 overflow-hidden flex flex-col items-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between px-5 py-3.5 bg-[#24171C] border-b border-[#3D222B]">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#F1A7C1]" />
            <span className="text-xs font-bold tracking-wide uppercase text-[#F1A7C1]">
              Academic Portrait • Class of 2025
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Upload / Replace Photo Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload your exact real photo file"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#7A1B2E] hover:bg-[#8F2338] text-[#FAF4EC] transition-colors cursor-pointer border border-[#F1A7C1]/30 shadow-xs"
            >
              <Upload className="w-3 h-3" />
              <span>{imageSrc ? 'Replace Photo' : 'Upload: Profile Picture'}</span>
            </button>

            {/* Remove / Clear photo button if a photo is loaded */}
            {imageSrc && onResetPhoto && (
              <button
                type="button"
                onClick={onResetPhoto}
                title="Remove photo (return to empty upload box)"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium hover:bg-red-950/60 text-red-300 border border-red-500/30 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Remove</span>
              </button>
            )}

            {imageSrc && (
              <button
                onClick={handleDownload}
                title="Download Photo"
                className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              title="Close viewer (Esc)"
              className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Success toast notification */}
        {uploadSuccess && (
          <div className="w-full bg-emerald-950/90 border-b border-emerald-500/40 px-4 py-2 text-emerald-300 text-xs flex items-center justify-center gap-1.5 animate-in fade-in duration-200">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Profile photo updated successfully across entire portfolio!</span>
          </div>
        )}

        {/* Circular Large View in Modal */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center w-full">
          <div
            className={`relative group mb-5 cursor-pointer ${
              isDragging ? 'ring-4 ring-[#F1A7C1] rounded-full scale-105 transition-all' : ''
            }`}
            onClick={() => fileInputRef.current?.click()}
            title={imageSrc ? "Click or drag & drop to replace photo" : "Click or drop file to upload Profile Picture"}
          >
            {/* Ambient burgundy/pink glow aura */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#7A1B2E] via-[#F1A7C1] to-[#7A1B2E] opacity-70 blur-md group-hover:opacity-95 transition-opacity" />

            {/* Circular Photo Container or Empty Upload Box */}
            {imageSrc ? (
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-[#FAF4EC] shadow-2xl bg-[#7A1B2E]">
                <img
                  src={imageSrc}
                  alt="Cherish Nwachukwu in graduation cap and gown"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Hover overlay to replace */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-3 gap-1">
                  <Upload className="w-6 h-6 text-[#F1A7C1]" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Click to Replace
                  </span>
                  <span className="text-[10px] text-zinc-300">or drop image here</span>
                </div>
              </div>
            ) : (
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full flex flex-col items-center justify-center p-6 border-4 border-dashed border-[#F1A7C1]/60 bg-[#25151C] shadow-2xl text-center">
                <div className="w-12 h-12 rounded-full bg-[#7A1B2E] text-[#F1A7C1] flex items-center justify-center mb-2.5">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                  Upload: Profile Picture
                </span>
                <span className="text-xs text-[#F1A7C1]/90 max-w-[160px] leading-tight">
                  Click or drag & drop your real photo here (JPG / PNG)
                </span>
              </div>
            )}

            {/* Golden Key / Distinction Badge Overlay */}
            <div className="absolute bottom-1 right-2 bg-[#7A1B2E] text-white p-2 rounded-full border-2 border-[#FAF4EC] shadow-md">
              <Award className="w-4 h-4 text-[#F1A7C1]" />
            </div>
          </div>

          {/* Name & Academic Credentials */}
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
            {PERSONAL_INFO.name}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-[#F1A7C1] mb-2 uppercase tracking-wide">
            {PERSONAL_INFO.title}
          </p>

          <p className="text-xs text-[#D6C7CE] max-w-sm leading-relaxed mb-4">
            Bachelor of Information Technology in Business Systems (NQF Level 7, <span className="text-white font-semibold">Graduated with Distinction</span>). Member of the <span className="text-white font-semibold">Golden Key International Honour Society</span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-[#A6979E]">
            <span className="inline-flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#F1A7C1]" /> IIE Rosebank College
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#F1A7C1]" /> Cape Town, South Africa
            </span>
          </div>
        </div>

        {/* Footer info note */}
        <div className="w-full py-2.5 px-4 bg-[#1F1418] border-t border-[#3D222B] text-center text-[11px] text-[#8C7A82] flex items-center justify-between">
          <span>Tip: You can drag & drop your <strong className="text-zinc-300 font-mono">Photo.jpeg</strong> directly here</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-zinc-300 font-mono text-[10px]">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
