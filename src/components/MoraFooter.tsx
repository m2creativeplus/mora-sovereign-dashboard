"use client";

import React from "react";
import SomalilandEmblem from "./SomalilandEmblem";

export default function MoraFooter() {
  return (
    <footer className="w-full py-12 px-6 border-t border-white/5 bg-zinc-950/20 backdrop-blur-md text-center space-y-6 relative overflow-hidden">
      {/* Subtle institutional backdrop glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="flex flex-col items-center justify-center space-y-3 relative z-10">
        <SomalilandEmblem size={56} className="filter drop-shadow-[0_0_12px_rgba(212,175,55,0.15)] hover:scale-105 transition-transform duration-500" />
        
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/30" />
          <span className="font-arabic text-sm text-gold tracking-wide selection:bg-gold/20">
            وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </div>

      <div className="space-y-1.5 relative z-10">
        <p className="font-outfit text-xs font-bold text-white/80 uppercase tracking-widest">
          MORA · Jamhuuriyadda Somaliland
        </p>
        <p className="font-outfit text-[11px] text-foreground/45 uppercase tracking-wider">
          Ministry of Religious Affairs & Endowments
        </p>
        <p className="font-outfit text-[10px] text-emerald-500/60 font-semibold uppercase tracking-widest">
          Muslim World League (MWL) Method · Shafi&apos;i Jurisprudence (Madhab)
        </p>
      </div>

      <div className="pt-4 border-t border-white/5 max-w-lg mx-auto relative z-10">
        <p className="font-outfit text-[9px] text-foreground/30 uppercase tracking-wider">
          © {new Date().getFullYear()} Republic of Somaliland. All rights reserved. Managed under Sovereign Governance systems.
        </p>
      </div>
    </footer>
  );
}
