import React from 'react';

interface SolvryLogoProps {
  className?: string;
  size?: number;
  color?: string;
  showText?: boolean;
}

export default function SolvryLogo({
  className = '',
  size = 36,
  color = '#E2E8F0', // Slate Light Grey (#E2E8F0)
  showText = true,
}: SolvryLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {/* 3D Isometric Geometric Ribbon 'S' Logo Mark */}
      <svg
        width={size}
        height={size * 1.05}
        viewBox="0 0 100 105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105"
      >
        {/* Top Ribbon Plane */}
        <polygon
          points="28,15 88,33 72,43 12,25"
          fill={color}
          fillOpacity="0.95"
        />
        {/* Top Ribbon Front Face */}
        <polygon
          points="12,25 72,43 72,51 12,33"
          fill="#CBD5E1"
        />
        {/* Top Ribbon Right Bevel */}
        <polygon
          points="88,33 88,41 72,51 72,43"
          fill="#94A3B8"
        />

        {/* Middle Ribbon Plane (Connecting fold going back) */}
        <polygon
          points="28,45 68,57 52,66 12,54"
          fill="#94A3B8"
          fillOpacity="0.9"
        />
        {/* Middle Ribbon Front Face */}
        <polygon
          points="12,54 52,66 52,73 12,61"
          fill="#64748B"
        />

        {/* Bottom Ribbon Plane */}
        <polygon
          points="28,63 88,81 72,91 12,73"
          fill={color}
        />
        {/* Bottom Ribbon Front Face */}
        <polygon
          points="12,73 72,91 72,99 12,81"
          fill="#CBD5E1"
        />
        {/* Bottom Ribbon Right Bevel */}
        <polygon
          points="88,81 88,89 72,99 72,91"
          fill="#94A3B8"
        />
      </svg>

      {showText && (
        <span 
          data-value="SOLVRY"
          className="glitch-hover-target text-lg sm:text-xl font-extrabold tracking-[0.4em] uppercase font-sans text-[#F1F5F9] hover:text-white"
        >
          SOLVRY
        </span>
      )}
    </div>
  );
}
