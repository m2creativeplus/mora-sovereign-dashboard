"use client";

import React from "react";
import { gregorianToHijri } from "@/lib/hijri";

interface HijriDisplayProps {
  date: Date;
}

export default function HijriDisplay({ date }: HijriDisplayProps) {
  const hijri = gregorianToHijri(date);
  const isToday = date.toDateString() === new Date().toDateString();

  return (
    <div className="text-center space-y-0.5">
      <p className="font-arabic text-sm text-gold leading-tight">
        {hijri.day} {hijri.monthNameArabic} {hijri.year}هـ
      </p>
      <p className="font-outfit text-[10px] text-foreground/45 uppercase tracking-wider">
        {hijri.day} {hijri.monthName} / {hijri.monthNameSomali} {hijri.year} AH
        {isToday && (
          <span className="ml-1.5 inline-flex items-center gap-1">
            {hijri.monthName === "Ramadan" && (
              <span className="text-emerald-400 font-semibold">· 🌙 Ramadaan</span>
            )}
            {hijri.monthName === "Dhul Hijjah" && hijri.day <= 10 && (
              <span className="text-gold font-semibold">· 🕋 10-ka Dul-Xijjah</span>
            )}
            {hijri.isSacred && hijri.monthName !== "Dhul Hijjah" && (
              <span className="text-emerald-500/80">· 🛡️ Bil Xurmo</span>
            )}
          </span>
        )}
      </p>
    </div>
  );
}
