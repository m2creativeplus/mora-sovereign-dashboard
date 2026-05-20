"use client";

import React, { useState, useEffect } from "react";
import { Clock, Volume2, VolumeX } from "lucide-react";
import { getPrayerEntries } from "@/lib/prayer-times";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownTimerProps {
  cityKey?: string;
}

export default function CountdownTimer({ cityKey = "hargeisa" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    nextPrayerName: string;
    nextPrayerNameArabic: string;
    nextPrayerNameSomali: string;
    targetTimeStr: string;
  } | null>(null);

  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    
    // Lazy-load audio element safely in the browser context
    if (typeof window !== "undefined") {
      audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-500.wav"); // Gentle digital chime
      audio.volume = 0.4;
    }

    const updateTimer = () => {
      const now = new Date();
      
      // Calculate today's prayer times
      const todayEntries = getPrayerEntries(now, cityKey);
      
      // Tomorrow's Fajr calculations
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      const tomorrowEntries = getPrayerEntries(tomorrow, cityKey);
      
      const parseTimeToDate = (timeStr: string, baseDate: Date): Date => {
        const [timePart, period] = timeStr.split(" ");
        const [hStr, mStr] = timePart.split(":");
        let hours = parseInt(hStr, 10);
        const minutes = parseInt(mStr, 10);
        
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        
        const target = new Date(baseDate);
        target.setHours(hours, minutes, 0, 0);
        return target;
      };

      // Map entries to absolute Date objects
      const activeTargets = todayEntries.map(entry => ({
        ...entry,
        dateTarget: parseTimeToDate(entry.time, now)
      }));

      // Find the first prayer whose target is in the future
      let next = activeTargets.find(t => t.dateTarget.getTime() > now.getTime());
      
      // If all of today's prayers have passed, target tomorrow's Fajr
      if (!next) {
        const firstTomorrow = tomorrowEntries[0]; // Fajr
        next = {
          ...firstTomorrow,
          dateTarget: parseTimeToDate(firstTomorrow.time, tomorrow)
        };
      }

      const diffMs = next.dateTarget.getTime() - now.getTime();
      
      // Countdown trigger for adhan alert when difference hits exact zero
      if (diffMs <= 1000 && diffMs > 0 && audio && !isMuted) {
        audio.play().catch(() => {});
      }

      const totalSecs = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSecs / 3600);
      const minutes = Math.floor((totalSecs % 3600) / 60);
      const seconds = totalSecs % 60;

      setTimeLeft({
        hours,
        minutes,
        seconds,
        nextPrayerName: next.name,
        nextPrayerNameArabic: next.nameArabic,
        nextPrayerNameSomali: next.nameSomali,
        targetTimeStr: next.time,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [cityKey, isMuted]);

  if (!timeLeft) {
    return (
      <div className="flex items-center justify-center h-12 bg-white/2 border border-white/5 rounded-2xl animate-pulse">
        <span className="font-outfit text-xs text-foreground/45">Ticking telemetry system...</span>
      </div>
    );
  }

  const formatNum = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-950/30 border border-white/5 rounded-2xl backdrop-blur-md relative overflow-hidden shadow-lg select-none">
      {/* Decorative vertical separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span className="font-outfit text-[11px] text-foreground/45 uppercase tracking-widest font-semibold">
            Next Adhan Countdown
          </span>
        </div>
        
        {/* Toggle sound check */}
        <button
          onClick={() => setIsMuted(prev => !prev)}
          className={`p-1 rounded-md border transition-all duration-300 ${
            isMuted
              ? "border-white/5 hover:border-white/10 text-foreground/30 hover:text-foreground/50 bg-white/2"
              : "border-gold/20 hover:border-gold/40 text-gold bg-gold/5"
          }`}
          title={isMuted ? "Unmute countdown alert" : "Mute countdown alert"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="text-center space-y-1 mb-4">
        <p className="font-arabic text-xl text-gold selection:bg-gold/20 leading-none">
          {timeLeft.nextPrayerNameArabic}
        </p>
        <h4 className="font-outfit text-sm font-bold text-white tracking-wide uppercase">
          {timeLeft.nextPrayerName} · {timeLeft.nextPrayerNameSomali}
        </h4>
        <p className="font-outfit text-[10px] text-foreground/45 uppercase tracking-widest">
          Scheduled at {timeLeft.targetTimeStr}
        </p>
      </div>

      {/* Countdown numbers with micro-animations */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <div className="bg-white/5 border border-white/6 rounded-xl w-14 py-2 text-center shadow-md relative overflow-hidden">
            <span className="font-outfit text-2xl font-black text-white tabular-nums tracking-tight">
              {formatNum(timeLeft.hours)}
            </span>
          </div>
          <span className="font-outfit text-[9px] text-foreground/40 uppercase tracking-widest mt-1">Hours</span>
        </div>

        <span className="font-outfit text-xl font-bold text-gold mb-4 animate-pulse">:</span>

        <div className="flex flex-col items-center">
          <div className="bg-white/5 border border-white/6 rounded-xl w-14 py-2 text-center shadow-md relative overflow-hidden">
            <span className="font-outfit text-2xl font-black text-white tabular-nums tracking-tight">
              {formatNum(timeLeft.minutes)}
            </span>
          </div>
          <span className="font-outfit text-[9px] text-foreground/40 uppercase tracking-widest mt-1">Mins</span>
        </div>

        <span className="font-outfit text-xl font-bold text-gold mb-4 animate-pulse">:</span>

        <div className="flex flex-col items-center">
          <div className="bg-white/5 border border-white/6 rounded-xl w-14 py-2 text-center shadow-md relative overflow-hidden">
            <span className="font-outfit text-2xl font-black text-gold tabular-nums tracking-tight">
              {formatNum(timeLeft.seconds)}
            </span>
          </div>
          <span className="font-outfit text-[9px] text-foreground/40 uppercase tracking-widest mt-1">Secs</span>
        </div>
      </div>
    </div>
  );
}
