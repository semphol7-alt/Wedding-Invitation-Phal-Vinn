import React from 'react';

interface AnimatedButterflyProps {
  size?: number;
  className?: string;
  flyAnimation?: 'animate-butterfly-1' | 'animate-butterfly-2' | 'animate-butterfly-3';
  style?: React.CSSProperties;
}

export const AnimatedButterfly: React.FC<AnimatedButterflyProps> = ({
  size = 40,
  className = '',
  flyAnimation = 'animate-butterfly-1',
  style = {},
}) => {
  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${flyAnimation} ${className}`}
      style={{ width: size, height: size * 0.85, ...style }}
    >
      <svg
        viewBox="0 0 100 85"
        className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,140,180,0.45)]"
        style={{ perspective: 600 }}
      >
        <defs>
          {/* Iridescent Turquoise-Blue and Gold Gradient */}
          <linearGradient id={`wingGrad_${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#80e5ff" />
            <stop offset="25%" stopColor="#29b6f6" />
            <stop offset="60%" stopColor="#0288d1" />
            <stop offset="85%" stopColor="#ffd54f" />
            <stop offset="100%" stopColor="#43281c" />
          </linearGradient>

          {/* Golden Wing Patterns */}
          <linearGradient id={`goldDust_${size}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffe082" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0277bd" stopOpacity="0.4" />
          </linearGradient>

          <filter id={`glow_${size}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Center Butterfly Body & Antennae */}
        <g fill="#2e1c12">
          {/* Head & Body */}
          <ellipse cx="50" cy="42" rx="2.5" ry="14" />
          <circle cx="50" cy="27" r="3" />
          {/* Antennae */}
          <path
            d="M 49 25 Q 43 12 36 10 M 51 25 Q 57 12 64 10"
            stroke="#2e1c12"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="36" cy="10" r="1.2" fill="#ffd54f" />
          <circle cx="64" cy="10" r="1.2" fill="#ffd54f" />
        </g>

        {/* Left Wings Group (Flapping 3D) */}
        <g className="wing-left" style={{ transformOrigin: '50px 42px' }}>
          {/* Forewing */}
          <path
            d="M 49 38 C 40 22 18 10 6 22 C -2 30 4 48 24 50 C 35 51 46 44 49 38 Z"
            fill={`url(#wingGrad_${size})`}
            stroke="#ffd54f"
            strokeWidth="0.8"
          />
          {/* Hindwing */}
          <path
            d="M 48 45 C 38 48 18 52 14 64 C 10 74 26 82 36 74 C 42 68 47 55 48 45 Z"
            fill={`url(#wingGrad_${size})`}
            stroke="#ffd54f"
            strokeWidth="0.6"
          />
          {/* Gold Sparkle Veins & Dust */}
          <path
            d="M 46 36 C 36 28 22 22 12 28 M 44 40 C 32 38 18 42 12 45 M 46 48 C 36 54 26 62 20 68"
            stroke={`url(#goldDust_${size})`}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
          <circle cx="16" cy="26" r="1.5" fill="#ffffff" filter={`url(#glow_${size})`} />
          <circle cx="28" cy="36" r="1.2" fill="#ffe082" />
          <circle cx="22" cy="62" r="1.2" fill="#ffffff" />
        </g>

        {/* Right Wings Group (Flapping 3D) */}
        <g className="wing-right" style={{ transformOrigin: '50px 42px' }}>
          {/* Forewing */}
          <path
            d="M 51 38 C 60 22 82 10 94 22 C 102 30 96 48 76 50 C 65 51 54 44 51 38 Z"
            fill={`url(#wingGrad_${size})`}
            stroke="#ffd54f"
            strokeWidth="0.8"
          />
          {/* Hindwing */}
          <path
            d="M 52 45 C 62 48 82 52 86 64 C 90 74 74 82 64 74 C 58 68 53 55 52 45 Z"
            fill={`url(#wingGrad_${size})`}
            stroke="#ffd54f"
            strokeWidth="0.6"
          />
          {/* Gold Sparkle Veins & Dust */}
          <path
            d="M 54 36 C 64 28 78 22 88 28 M 56 40 C 68 38 82 42 88 45 M 54 48 C 64 54 74 62 80 68"
            stroke={`url(#goldDust_${size})`}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
          <circle cx="84" cy="26" r="1.5" fill="#ffffff" filter={`url(#glow_${size})`} />
          <circle cx="72" cy="36" r="1.2" fill="#ffe082" />
          <circle cx="78" cy="62" r="1.2" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};
