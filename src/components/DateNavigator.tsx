"use client";

import React from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import HijriDisplay from "./HijriDisplay";

interface DateNavigatorProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export default function DateNavigator({ date, onDateChange }: DateNavigatorProps) {
  const isTodayDate = date.toDateString() === new Date().toDateString();

  const handlePrevDay = () => {
    const prev = new Date(date);
    prev.setDate(date.getDate() - 1);
    onDateChange(prev);
  };

  const handleNextDay = () => {
    const next = new Date(date);
    next.setDate(date.getDate() + 1);
    onDateChange(next);
  };

  const handleReset = () => {
    onDateChange(new Date());
  };

  const weekdayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-center gap-3 bg-zinc-950/40 p-4 border border-white/5 rounded-2xl backdrop-blur-md max-w-sm mx-auto shadow-lg relative">
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={handlePrevDay}
        className="h-9 w-9 rounded-full border border-white/5 bg-white/3 hover:bg-white/6 hover:text-gold text-foreground/75"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <div className="text-center min-w-[180px] space-y-1">
        <p className="font-outfit text-sm font-bold text-white tracking-wide">
          {isTodayDate ? "Today" : weekdayName}
        </p>
        <p className="font-outfit text-xs text-foreground/45">
          {formattedDate}
        </p>
        <HijriDisplay date={date} />
      </div>

      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={handleNextDay}
        className="h-9 w-9 rounded-full border border-white/5 bg-white/3 hover:bg-white/6 hover:text-gold text-foreground/75"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {!isTodayDate && (
        <button
          type="button"
          onClick={handleReset}
          className="absolute -right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full border border-gold/15 bg-gold/5 text-gold hover:bg-gold/10 hover:border-gold/30 hover:scale-105 active:scale-95 transition-all duration-200"
          title="Reset to Today"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
