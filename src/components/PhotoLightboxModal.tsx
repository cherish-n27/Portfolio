import { useEffect, useState } from 'react';
import { X, Download, GraduationCap, Award, MapPin, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { profilePhoto, gradPhoto } from '../assets';

interface PhotoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
}

export default function PhotoLightboxModal({
  isOpen,
  onClose,
  imageSrc = profilePhoto,
}: PhotoLightboxModalProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<'portrait' | 'full'>(
    imageSrc === gradPhoto ? 'full' : 'portrait'
  );

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

  const currentDisplayPhoto = selectedPhoto === 'portrait' ? profilePhoto : gradPhoto;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentDisplayPhoto;
    link.download = `Cherish_Nwachukwu_Graduation_${selectedPhoto}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#FAF4EC] dark:bg-[#1A1417] rounded-3xl overflow-hidden shadow-2xl border border-[#E5DACF] dark:border-[#382229]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5DACF] dark:border-[#382229] bg-[#FAF4EC]/80 dark:bg-[#1A1417]/80 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#1F191B] dark:text-[#F1A7C1]">
              Academic Graduation Portrait
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7A1B2E] text-white">
              Official Regalia
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#7A1B2E] hover:bg-[#631424] text-white transition-all cursor-pointer shadow-xs active:scale-95"
              title="Download full resolution photo"
            >
              <Download className="w-3.5 h-3.5 text-[#F1A7C1]" />
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#E5DACF]/60 dark:bg-[#33232A] flex items-center justify-center text-[#1F191B] dark:text-[#F5EFE6] hover:bg-[#7A1B2E] hover:text-white dark:hover:bg-[#F1A7C1] dark:hover:text-[#1F191B] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Photo Container */}
        <div className="p-6 flex flex-col items-center">
          <div className="relative max-h-[55vh] flex items-center justify-center overflow-hidden rounded-2xl bg-zinc-900 border border-[#E5DACF] dark:border-[#382229] shadow-inner mb-4">
            <img
              src={currentDisplayPhoto}
              alt="Cherish Nwachukwu graduation portrait"
              referrerPolicy="no-referrer"
              className="max-h-[55vh] w-auto object-contain transition-all duration-300"
            />
          </div>

          {/* Toggle between Portrait Close-up & Full Ceremony Regalia */}
          <div className="flex items-center gap-2 mb-4 bg-[#FAF5EE] dark:bg-[#231B1F] p-1.5 rounded-full border border-[#E5DACF] dark:border-[#382229]">
            <button
              onClick={() => setSelectedPhoto('portrait')}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedPhoto === 'portrait'
                  ? 'bg-[#7A1B2E] text-white shadow-xs'
                  : 'text-[#5C5055] dark:text-[#BDB0B6] hover:text-[#1F191B] dark:hover:text-white'
              }`}
            >
              Close-up Portrait
            </button>
            <button
              onClick={() => setSelectedPhoto('full')}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedPhoto === 'full'
                  ? 'bg-[#7A1B2E] text-white shadow-xs'
                  : 'text-[#5C5055] dark:text-[#BDB0B6] hover:text-[#1F191B] dark:hover:text-white'
              }`}
            >
              Full-Length Regalia
            </button>
          </div>

          {/* Academic Honors Caption */}
          <div className="w-full bg-[#FAF5EE] dark:bg-[#231B1F] p-4 rounded-2xl border border-[#E5DACF] dark:border-[#382229]">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-sm font-bold text-[#1F191B] dark:text-white flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#7A1B2E] dark:text-[#F1A7C1]" />
                <span>Bachelor of Information Technology in Business Systems</span>
              </h4>
              <span className="text-xs font-bold text-[#7A1B2E] dark:text-[#F1A7C1]">
                Class of 2025
              </span>
            </div>

            <p className="text-xs text-[#5C5055] dark:text-[#BDB0B6] mb-3">
              IIE Rosebank College • Conferred with Distinction • Golden Key International Honour Society
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E5DACF]/80 dark:border-[#382229]/80 text-[11px] text-[#5C5055] dark:text-[#BDB0B6]">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#7A1B2E] dark:text-[#F1A7C1]" /> Cape Town, South Africa
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-[#7A1B2E] dark:text-[#F1A7C1] font-semibold">
                <Sparkles className="w-3 h-3" /> NQF Level 7
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
