import { useState, MouseEvent } from 'react';
import { ZoomIn } from 'lucide-react';
import FlowerMotif from './FlowerMotif';
import { profilePhoto } from '../assets';

interface ProfileAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showStatusDot?: boolean;
  showFlowerAccent?: boolean;
  showViewHint?: boolean;
  interactive?: boolean;
  imageSrc?: string;
  onClick?: () => void;
  className?: string;
  altText?: string;
}

export default function ProfileAvatar({
  size = 'lg',
  showStatusDot = true,
  showFlowerAccent = false,
  showViewHint = true,
  interactive = true,
  imageSrc = profilePhoto,
  onClick,
  className = '',
  altText = 'Cherish Nwachukwu profile portrait in graduation cap and gown',
}: ProfileAvatarProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const displaySrc = imageSrc || profilePhoto;

  const sizeClasses = {
    xs: 'w-7 h-7 ring-1',
    sm: 'w-9 h-9 ring-2',
    md: 'w-12 h-12 ring-2',
    lg: 'w-24 h-24 ring-3',
    xl: 'w-36 h-36 sm:w-44 sm:h-44 ring-4',
  };

  const statusDotSizes = {
    xs: 'w-1.5 h-1.5 -bottom-0.5 -right-0.5',
    sm: 'w-2.5 h-2.5 bottom-0 right-0 border-[1.5px]',
    md: 'w-3 h-3 bottom-0.5 right-0.5 border-2',
    lg: 'w-4 h-4 bottom-1 right-1 border-2',
    xl: 'w-5 h-5 bottom-2 right-2 border-2',
  };

  const handleClick = (e: MouseEvent) => {
    if (interactive && onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={interactive ? 'View Cherish Nwachukwu portrait photo' : altText}
    >
      {/* Outer ambient glow ring for xl size in hero */}
      {size === 'xl' && (
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#7A1B2E] via-[#F1A7C1] to-[#7A1B2E] opacity-60 blur-md pointer-events-none transition-all duration-300 group-hover:opacity-90 animate-pulse" />
      )}

      {/* Main Circular Frame */}
      <div
        className={`relative rounded-full overflow-hidden bg-[#7A1B2E] ring-[#F1A7C1] dark:ring-[#7A1B2E] shadow-lg transition-all duration-300 ${
          sizeClasses[size]
        } ${
          interactive
            ? 'cursor-pointer hover:scale-105 hover:ring-[#7A1B2E] dark:hover:ring-[#F1A7C1] hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F1A7C1]'
            : ''
        }`}
      >
        {/* Monogram fallback while loading or on error */}
        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#7A1B2E] text-[#F1A7C1] font-bold font-mono">
            <span>CN</span>
          </div>
        )}

        {/* Real Profile Image */}
        {!imageError && (
          <img
            src={displaySrc}
            alt={altText}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Hover View Hint Overlay (for larger sizes) */}
        {interactive && showViewHint && (size === 'lg' || size === 'xl') && (
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white gap-1 p-2">
            <ZoomIn className={size === 'xl' ? 'w-6 h-6 text-[#F1A7C1]' : 'w-4 h-4 text-[#F1A7C1]'} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white">
              View Photo
            </span>
          </div>
        )}
      </div>

      {/* Pulsing Status Dot (Open to Work / Active Trainee) */}
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
