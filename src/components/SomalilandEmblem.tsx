"use client";

import React from "react";

interface EmblemProps {
  className?: string;
  size?: number;
}

export default function SomalilandEmblem({ className = "", size = 48 }: EmblemProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Golden Glow Circle */}
      <circle cx="50" cy="50" r="48" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      <circle cx="50" cy="50" r="45" stroke="#D4AF37" strokeWidth="1.5" opacity="0.8" />
      <circle cx="50" cy="50" r="42" stroke="#1A5C2A" strokeWidth="1" opacity="0.5" />

      {/* Laurel Branches (Left and Right) */}
      {/* Left Laurel */}
      <path
        d="M20 50 C 18 70, 32 85, 50 85"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaves Left */}
      <path d="M 22 55 Q 16 57 20 62 Q 24 60 22 55 Z" fill="#D4AF37" />
      <path d="M 25 65 Q 19 68 23 73 Q 27 70 25 65 Z" fill="#D4AF37" />
      <path d="M 31 73 Q 26 77 30 81 Q 34 77 31 73 Z" fill="#D4AF37" />
      <path d="M 40 80 Q 36 84 41 87 Q 45 83 40 80 Z" fill="#D4AF37" />

      {/* Right Laurel */}
      <path
        d="M80 50 C 82 70, 68 85, 50 85"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaves Right */}
      <path d="M 78 55 Q 84 57 80 62 Q 76 60 78 55 Z" fill="#D4AF37" />
      <path d="M 75 65 Q 81 68 77 73 Q 73 70 75 65 Z" fill="#D4AF37" />
      <path d="M 69 73 Q 74 77 70 81 Q 66 77 69 73 Z" fill="#D4AF37" />
      <path d="M 60 80 Q 64 84 59 87 Q 55 83 60 80 Z" fill="#D4AF37" />

      {/* Green Header Box for Shahada */}
      <rect x="25" y="16" width="50" height="10" rx="2" fill="#1A5C2A" stroke="#D4AF37" strokeWidth="1" />
      
      {/* Shahada Text Arabic Representation */}
      <text x="50" y="23" fill="#FFFFFF" fontSize="4.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.3">
        لا إله إلا الله
      </text>
      
      {/* Black Star */}
      <polygon points="50,28 51.5,31 54.5,31 52,33 53,36 50,34 47,36 48,33 45.5,31 48.5,31" fill="#000000" stroke="#D4AF37" strokeWidth="0.3" />

      {/* Scales of Justice in Gold */}
      {/* Center post */}
      <line x1="50" y1="36" x2="50" y2="58" stroke="#D4AF37" strokeWidth="1.5" />
      {/* Stand base */}
      <path d="M42 58 L58 58" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      {/* Crossbeam */}
      <line x1="32" y1="40" x2="68" y2="40" stroke="#D4AF37" strokeWidth="2" />
      {/* Left scale pan cords */}
      <line x1="32" y1="40" x2="26" y2="50" stroke="#D4AF37" strokeWidth="0.8" />
      <line x1="32" y1="40" x2="38" y2="50" stroke="#D4AF37" strokeWidth="0.8" />
      {/* Left scale pan */}
      <path d="M24 50 Q32 54 40 50" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
      {/* Right scale pan cords */}
      <line x1="68" y1="40" x2="62" y2="50" stroke="#D4AF37" strokeWidth="0.8" />
      <line x1="68" y1="40" x2="74" y2="50" stroke="#D4AF37" strokeWidth="0.8" />
      {/* Right scale pan */}
      <path d="M60 50 Q68 54 76 50" fill="none" stroke="#D4AF37" strokeWidth="1.5" />

      {/* Handshake of Peace at the Bottom */}
      <g opacity="0.95">
        {/* Left hand arm sleeve */}
        <path d="M 33 71 L 40 68 L 41 73 L 34 76 Z" fill="#1A5C2A" stroke="#D4AF37" strokeWidth="0.5" />
        {/* Right hand arm sleeve */}
        <path d="M 67 71 L 60 68 L 59 73 L 66 76 Z" fill="#1A5C2A" stroke="#D4AF37" strokeWidth="0.5" />
        {/* Clasped Hands */}
        <path d="M 40 68 Q 50 63 60 68 Q 50 78 40 68" fill="#D4AF37" />
        {/* Fingers detail */}
        <path d="M 46 67 C 48 68, 48 72, 47 73" stroke="#000" strokeWidth="0.5" />
        <path d="M 49 66 C 51 67, 51 71, 50 72" stroke="#000" strokeWidth="0.5" />
        <path d="M 52 66 C 54 67, 54 71, 53 72" stroke="#000" strokeWidth="0.5" />
      </g>
    </svg>
  );
}
