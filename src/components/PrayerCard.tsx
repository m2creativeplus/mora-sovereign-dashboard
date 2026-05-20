"use client";

import React from "react";
import { motion } from "framer-motion";
import AdhanToggle from "./AdhanToggle";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PrayerEntry } from "@/lib/prayer-times";

interface PrayerCardProps {
  prayer: PrayerEntry;
  index: number;
  isActive: boolean;
  adhanEnabled: boolean;
  notificationPermission: NotificationPermission | "not_supported";
  onToggleAdhan: (key: string) => void;
}

export default function PrayerCard({
  prayer,
  index,
  isActive,
  adhanEnabled,
  notificationPermission,
  onToggleAdhan,
}: PrayerCardProps) {
  const isSunrise = prayer.key === "sunrise";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.08,
        type: "spring",
        stiffness: 260,
        damping: 22,
      }}
      className={cn(
        "relative rounded-2xl border p-5 transition-all duration-300 group overflow-hidden",
        isActive
          ? "bg-gold/8 border-gold/25 shadow-lg shadow-gold/5"
          : isSunrise
          ? "bg-zinc-900/40 border-white/5 opacity-70"
          : "bg-white/3 border-white/6 hover:border-white/12 hover:bg-white/5"
      )}
    >
      {/* Active prayer glow ring */}
      {isActive && (
        <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/20 pointer-events-none" />
      )}

      {/* Adhan toggle, top-right corner */}
      {!isSunrise && (
        <div className="absolute top-3 right-3 z-10">
          <AdhanToggle
            prayerKey={prayer.key}
            enabled={adhanEnabled}
            permission={notificationPermission}
            onToggle={onToggleAdhan}
            isActive={isActive}
          />
        </div>
      )}

      {/* Arabic name */}
      <p
        className={cn(
          "font-arabic text-base font-semibold leading-none mb-2",
          isActive ? "text-gold" : isSunrise ? "text-zinc-600" : "text-foreground/50"
        )}
        style={{ direction: "rtl" }}
      >
        {prayer.nameArabic}
      </p>

      {/* Time */}
      <p
        className={cn(
          "font-outfit font-black text-2xl tracking-tight leading-none",
          isActive ? "text-gold" : isSunrise ? "text-zinc-500" : "text-white"
        )}
      >
        {prayer.time}
      </p>

      {/* Name + Somali name */}
      <div className="flex items-center gap-1.5 mt-2">
        <span
          className={cn(
            "font-outfit text-xs font-bold uppercase tracking-wider",
            isActive ? "text-gold/80" : "text-foreground/35"
          )}
        >
          {prayer.name}
        </span>
        <span className="text-[10px] text-foreground/20">·</span>
        <span
          className={cn(
            "font-outfit text-[10px] tracking-wider",
            isActive ? "text-gold/60" : "text-foreground/25"
          )}
        >
          {prayer.nameSomali}
        </span>
      </div>

      {/* Current badge */}
      {isActive && (
        <Badge className="mt-3 w-full justify-center bg-gold/10 text-gold border-gold/20 text-[9px] font-bold tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse mr-1.5" />
          CURRENT PRAYER
        </Badge>
      )}
    </motion.div>
  );
}
