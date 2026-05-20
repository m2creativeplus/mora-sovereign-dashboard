"use client";

import React from "react";
import { Bell, BellOff } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AdhanToggleProps {
  prayerKey: string;
  enabled: boolean;
  permission?: NotificationPermission | "not_supported";
  onToggle: (key: string) => void;
  isActive?: boolean;
}

export default function AdhanToggle({
  prayerKey,
  enabled,
  permission = "default",
  onToggle,
  isActive = false,
}: AdhanToggleProps) {
  const disabled = permission === "denied" || permission === "not_supported";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) {
          onToggle(prayerKey);
        }
      }}
      type="button"
      title={
        disabled
          ? "System notifications blocked"
          : enabled
          ? "Disable Adhan browser audio alert"
          : "Enable Adhan browser audio alert"
      }
      className={cn(
        "relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 border",
        disabled
          ? "opacity-25 cursor-not-allowed bg-transparent border-white/5 text-zinc-600"
          : enabled
          ? isActive
            ? "bg-white/15 border-white/20 hover:bg-white/25 text-gold shadow-md"
            : "bg-gold/10 border-gold/20 text-gold hover:bg-gold/20 shadow-sm"
          : "bg-white/3 border-white/6 text-foreground/35 hover:border-gold/25 hover:text-gold hover:bg-gold/5"
      )}
    >
      {enabled && !disabled ? (
        <motion.div
          initial={{ scale: 0.7, rotate: -15 }}
          animate={{ scale: 1, rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ type: "spring", stiffness: 300, duration: 0.5 }}
        >
          <Bell className="w-3.5 h-3.5" />
        </motion.div>
      ) : (
        <BellOff className="w-3.5 h-3.5" />
      )}
      {enabled && !disabled && (
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-500/80" />
      )}
    </button>
  );
}
