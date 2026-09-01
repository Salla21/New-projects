'use client';

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy py-12 sm:py-16">
      {/* Decorative palm trees */}
      <svg className="absolute left-4 bottom-0 h-32 w-16 text-white/10" viewBox="0 0 64 128" fill="currentColor" aria-hidden="true">
        <path d="M30 128V60M30 60C20 50 10 45 5 40M30 60C40 50 50 45 55 40M30 60C25 48 20 42 15 35M30 60C35 48 40 42 45 35M28 80h4M27 90h6M26 100h8M25 110h10M24 120h12" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
      <svg className="absolute right-4 bottom-0 h-32 w-16 text-white/10" viewBox="0 0 64 128" fill="currentColor" aria-hidden="true">
        <path d="M30 128V60M30 60C20 50 10 45 5 40M30 60C40 50 50 45 55 40M30 60C25 48 20 42 15 35M30 60C35 48 40 42 45 35M28 80h4M27 90h6M26 100h8M25 110h10M24 120h12" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>

      {/* Coat of arms watermark (center, very subtle) */}
      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 text-white/[0.06]" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
        {/* Simplified two lions facing a central shield */}
        <path d="M60 140C50 130 45 120 45 110C45 100 50 90 55 85L60 80L65 85C65 85 60 75 55 70C50 65 45 60 50 55C55 50 60 55 65 60L70 65L75 60C80 55 85 50 90 55C95 60 90 65 85 70C80 75 75 85 75 85L80 80L85 85C90 90 95 100 95 110C95 120 90 130 80 140" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M140 140C150 130 155 120 155 110C155 100 150 90 145 85L140 80L135 85C135 85 140 75 145 70C150 65 155 60 150 55C145 50 140 55 135 60L130 65L125 60C120 55 115 50 110 55C105 60 110 65 115 70C120 75 125 85 125 85L120 80L115 85C110 90 105 100 105 110C105 120 110 130 120 140" stroke="currentColor" strokeWidth="2" fill="none"/>
        {/* Central shield */}
        <rect x="85" y="70" width="30" height="40" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
        {/* River Gambia - wavy line through shield */}
        <path d="M85 90C90 88 95 92 100 90C105 88 110 92 115 90" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-display text-white">
          The <span className="text-orange">Gambia</span> in One Place
        </h2>
        <p className="mt-3 text-body text-white/70">
          Your source for news, media, and stories from across the Smiling Coast
        </p>
      </div>
    </div>
  );
}
