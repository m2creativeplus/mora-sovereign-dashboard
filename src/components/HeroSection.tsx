"use client";

import React from "react";
import SomalilandFlag from "./SomalilandFlag";
import CountdownTimer from "./CountdownTimer";
import { MapPin } from "lucide-react";

interface HeroSectionProps {
  cityKey?: string;
}

export default function HeroSection({ cityKey = "hargeisa" }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-white/10 p-6 md:p-10 shadow-2xl">
      {/* Premium Emerald/Gold glowing background spheres */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Islamic geometric pattern overlay with extremely subtle opacity */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="28" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="28" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
              <circle cx="60" cy="0" r="28" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
              <circle cx="0" cy="60" r="28" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
              <circle cx="60" cy="60" r="28" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left side: Metadata, flags, calligraphy, and description */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Location badge with flag */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <SomalilandFlag width={60} height={40} className="hover:scale-105 transition-transform duration-300" />
            <div className="space-y-0.5 text-center sm:text-left">
              <p className="font-outfit text-xs font-bold uppercase tracking-[0.2em] text-white">
                Republic of Somaliland
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-foreground/45 uppercase tracking-[0.1em] font-semibold">
                <MapPin className="w-3 h-3 text-gold" />
                Hargeisa Capital · 9.56°N, 44.07°E
              </div>
            </div>
          </div>

          {/* Calligraphy block */}
          <div className="py-2">
            <p className="font-arabic text-3xl md:text-4xl text-center lg:text-left text-gold leading-normal selection:bg-gold/20 select-none">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          </div>

          <div className="space-y-2">
            <h1 className="font-outfit text-2xl md:text-3xl font-black text-white leading-tight tracking-wide">
              Jamhuuriyadda Somaliland
            </h1>
            <p className="font-outfit text-xs md:text-sm text-emerald-400 font-semibold uppercase tracking-widest">
              Tirsiga Hijriga Qaranka · National Islamic Gateway
            </p>
            <p className="font-outfit text-xs text-foreground/60 leading-relaxed max-w-lg mx-auto lg:mx-0">
              The official portal managed by the Ministry of Religious Affairs & Endowments, providing high-precision astronomically calibrated prayer telemetry using the Muslim World League Method and Shafi&apos;i calculations corrected for local elevation (1,334m).
            </p>
          </div>
        </div>

        {/* Right side: Interactive Countdown Timer */}
        <div className="lg:col-span-5 w-full max-w-sm mx-auto">
          <CountdownTimer cityKey={cityKey} />
        </div>
      </div>
    </div>
  );
}
