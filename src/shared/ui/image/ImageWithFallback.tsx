import { useState } from 'react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
}

const DEFAULT_FALLBACK = '/fallback-article.png';
const INLINE_SVG_FALLBACK =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect width="640" height="360" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="Arial,sans-serif" font-size="24">No Image</text></svg>';

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc = DEFAULT_FALLBACK,
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const [fallbackApplied, setFallbackApplied] = useState(false);

  const handleImgError = (img: HTMLImageElement) => {
    if (fallbackApplied) return;
    setFallbackApplied(true);
    img.src = fallbackSrc;

    setTimeout(() => {
      if (!img.complete || img.naturalWidth === 0) {
        img.src = INLINE_SVG_FALLBACK;
      }
    }, 100);
  };

  if (!src) {
    return (
      <div className="article-card__placeholder" aria-hidden>
        <img
          className={`${className} article-card__img--fallback`}
          src={fallbackSrc}
          alt={alt}
          loading={loading}
          onError={e => handleImgError(e.currentTarget)}
        />
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      onError={e => handleImgError(e.currentTarget)}
    />
  );
}
