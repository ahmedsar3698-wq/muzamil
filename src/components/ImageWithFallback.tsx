import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackText = 'AL HAFIZ CLOTHS',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // Clean path to ensure Vercel static public directory resolution
  const cleanSrc = (src || '')
    .trim()
    .replace('/src/assets/images/', '/images/')
    .replace('src/assets/images/', '/images/');

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !cleanSrc) {
    return (
      <div
        className={`bg-[#14161f] border border-[#2d3040] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden select-none ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-[#181a26]/90 to-[#222536] opacity-90" />
        <div className="relative z-10 flex flex-col items-center space-y-1">
          <Sparkles className="w-6 h-6 text-[#d4af37] animate-pulse" />
          <span className="font-display font-bold text-xs tracking-wider text-[#d4af37] uppercase">
            {fallbackText}
          </span>
          <span className="text-[10px] text-neutral-400 font-medium">
            Premium Unstitched Fabric
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      {...props}
      src={cleanSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => {
        console.warn(`[Vercel Image Fallback Triggered] Failed to load image at: ${cleanSrc}`);
        setHasError(true);
      }}
    />
  );
};
