"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import {
  calculatePrayerTimes,
  getPrayerEntries,
  SOMALILAND_CITIES,
  SomalilandCity
} from "@/lib/prayer-times";
import {
  gregorianToHijri,
  formatHijriDate,
  formatHijriDateArabic,
  HIJRI_MONTH_NAMES
} from "@/lib/hijri";
import {
  Moon,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  Info,
  CalendarDays,
  FileDown,
  Sparkles
} from "lucide-react";

// Reusable components sourced from the M2 Design System
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function MonthlyPrayersPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [selectedCityKey, setSelectedCityKey] = useState("hargeisa");
  
  // Set current year and month based on local timezone
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(new Date());
    }, 0);
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const activeCity = SOMALILAND_CITIES[selectedCityKey] || SOMALILAND_CITIES.hargeisa;

  // Navigate months
  const prevMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Generate days in the selected Gregorian month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let day = 1; day <= totalDays; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const monthDays = getDaysInMonth(viewDate);
  const today = new Date();

  // Helper to format Gregorian Month Name
  const formatGregorianMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Map Somali week days
  const SOMALI_WEEKDAYS: Record<string, string> = {
    Sunday: "Alhad",
    Monday: "Isniin",
    Tuesday: "Talaado",
    Wednesday: "Arbaco",
    Thursday: "Khamiis",
    Friday: "Jimce",
    Saturday: "Sabti"
  };

  // Map Arabic week days
  const ARABIC_WEEKDAYS: Record<string, string> = {
    Sunday: "الأحد",
    Monday: "الإثنين",
    Tuesday: "الثلاثاء",
    Wednesday: "الأربعاء",
    Thursday: "الخميس",
    Friday: "الجمعة",
    Saturday: "السبت"
  };

  // Format dynamic page header values
  const currentHijri = currentTime ? gregorianToHijri(currentTime) : null;
  const pageGregorian = currentTime ? currentTime.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) : "";
  const pageWeekday = currentTime ? currentTime.toLocaleDateString("en-US", { weekday: "long" }) : "";
  const pageWeekdaySomali = pageWeekday ? SOMALI_WEEKDAYS[pageWeekday] || pageWeekday : "";
  const pageWeekdayArabic = pageWeekday ? ARABIC_WEEKDAYS[pageWeekday] || pageWeekday : "";

  return (
    <div className="flex h-screen overflow-hidden bg-geometric" style={{ background: "var(--background)" }}>
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Dynamic Top Announcement Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b z-10"
          style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          
          <div className="flex items-center gap-3">
            <Link href="/calendar" className="p-2 rounded-lg bg-white/3 border border-white/5 hover:border-gold/20 text-gold transition-all duration-200">
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h2 className="font-outfit font-bold text-sm text-gold tracking-widest uppercase">
                Monthly Prayer Schedules
              </h2>
              <p className="text-xs text-foreground/40">
                Official national civic timing system · Republic of Somaliland
              </p>
            </div>
          </div>

          {/* Dynamic Trilingual Live Clock & Dates */}
          {currentTime && currentHijri && (
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-xs font-semibold text-foreground/80 font-mono">
                  {pageGregorian} · <span className="text-gold">{pageWeekdaySomali} ({pageWeekday}) · <span className="font-arabic text-xs">{pageWeekdayArabic}</span></span>
                </p>
                <p className="text-[10px] text-foreground/45 mt-0.5">
                  Live local time Hargeisa
                </p>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-gold/5 border border-gold/15 flex flex-col items-end">
                <p className="text-xs font-bold text-gold font-arabic" style={{ direction: "rtl" }}>
                  {formatHijriDateArabic(currentHijri)}
                </p>
                <p className="text-[9px] text-gold/60 uppercase tracking-widest font-semibold mt-0.5">
                  {formatHijriDate(currentHijri)}
                </p>
              </div>
            </div>
          )}
        </header>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-zinc-950/40 p-4 border border-white/5 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Calendar className="text-gold" size={18} />
              <span className="font-outfit font-bold text-white text-base">
                Founding National Hijri Edition (1447 AH)
              </span>
              <Badge className="bg-gold/10 text-gold border-gold/20 text-[9px] font-bold">
                ESTABLISHED 2025–2026
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* City Selection Dropdown */}
              <div className="flex items-center gap-2 bg-zinc-900 border border-white/8 rounded-xl px-3 py-1.5">
                <MapPin size={14} className="text-gold" />
                <select
                  value={selectedCityKey}
                  onChange={(e) => setSelectedCityKey(e.target.value)}
                  className="bg-transparent border-none text-xs text-white focus:outline-none cursor-pointer font-semibold uppercase tracking-wider"
                >
                  {Object.values(SOMALILAND_CITIES).map((city) => (
                    <option key={city.key} value={city.key} className="bg-neutral-900 text-white">
                      {city.name} · {city.nameArabic}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center gap-2">
                <Button onClick={prevMonth} size="icon" variant="outline" className="w-8 h-8 bg-white/4 border-white/8 hover:bg-white/8 text-gold">
                  <ChevronLeft size={16} />
                </Button>
                
                <span className="text-xs font-bold text-white px-3 py-1 bg-white/3 border border-white/5 rounded-lg min-w-[130px] text-center font-mono">
                  {formatGregorianMonth(viewDate)}
                </span>

                <Button onClick={nextMonth} size="icon" variant="outline" className="w-8 h-8 bg-white/4 border-white/8 hover:bg-white/8 text-gold">
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Geo Coordinates Metadata Panel */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="glass-card bg-emerald-950/5 border border-emerald-500/10 p-4">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400">Selected Region</p>
              <h4 className="font-outfit font-bold text-lg text-white mt-1 uppercase">{activeCity.name}</h4>
              <p className="text-xs text-foreground/45 mt-0.5">{activeCity.nameArabic} · {activeCity.nameSomali}</p>
            </Card>

            <Card className="glass-card bg-white/2 border border-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-gold">GPS Lat / Lng</p>
              <h4 className="font-mono font-bold text-base text-white mt-1">
                {activeCity.lat.toFixed(4)}° N, {activeCity.lng.toFixed(4)}° E
              </h4>
              <p className="text-xs text-foreground/45 mt-0.5">National Islamic Geocoding</p>
            </Card>

            <Card className="glass-card bg-white/2 border border-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-gold">Territorial Elevation</p>
              <h4 className="font-outfit font-bold text-base text-white mt-1">
                ~{activeCity.elevation} meters ({activeCity.elevation === 0 ? "Sea Level" : "High Altitude"})
              </h4>
              <p className="text-xs text-foreground/45 mt-0.5">Astronomic Horizon Correction Enabled</p>
            </Card>

            <Card className="glass-card bg-white/2 border border-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-gold">Calculation Standards</p>
              <h4 className="font-outfit font-bold text-sm text-emerald-400 mt-1 flex items-center gap-1.5">
                <Sparkles size={13} className="text-gold" />
                MWL (18° Fajr / 17° Isha)
              </h4>
              <p className="text-xs text-foreground/45 mt-0.5">Somaliland MoRA Sovereign Standard</p>
            </Card>
          </div>

          {/* The Master Prayer Table */}
          <Card className="glass-card bg-zinc-950/30 border border-white/5 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between flex-wrap gap-4 bg-zinc-950/50">
              <div>
                <h3 className="font-outfit font-bold text-base text-white flex items-center gap-2">
                  <CalendarDays size={16} className="text-gold" />
                  Detailed Timing Matrix — {formatGregorianMonth(viewDate)}
                </h3>
                <p className="text-xs text-foreground/40 mt-0.5">
                  Calculated dynamically with high-altitude solar correction factors.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-foreground/50 bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Friday Jimce Highlighted
                </div>
                <div className="flex items-center gap-1.5 text-xs text-foreground/50 bg-gold/5 px-2.5 py-1 rounded-md border border-gold/10">
                  <span className="w-2 h-2 rounded-full bg-gold"></span>
                  Sacred Month Days Marked
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/2 text-[11px] font-bold text-foreground/40 uppercase tracking-widest font-outfit">
                    <th className="py-4 px-5">Day Name</th>
                    <th className="py-4 px-4 text-center">Gregorian Date</th>
                    <th className="py-4 px-4 text-center">Hijri Date</th>
                    <th className="py-4 px-4 text-center text-gold">Fajr</th>
                    <th className="py-4 px-4 text-center text-zinc-500">Sunrise</th>
                    <th className="py-4 px-4 text-center text-gold">Dhuhr</th>
                    <th className="py-4 px-4 text-center text-gold">Asr</th>
                    <th className="py-4 px-4 text-center text-gold">Maghrib</th>
                    <th className="py-4 px-4 text-center text-gold">Isha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-sm">
                  {monthDays.map((date) => {
                    const times = calculatePrayerTimes(date, selectedCityKey);
                    const hijri = gregorianToHijri(date);
                    
                    const dayString = date.toLocaleDateString("en-US", { weekday: "long" });
                    const isFriday = dayString === "Friday";
                    const isCurrentDay = today.toDateString() === date.toDateString();

                    const monthInfo = HIJRI_MONTH_NAMES[hijri.month];
                    const isSacredMonth = monthInfo?.isSacred || false;

                    const daySomali = SOMALI_WEEKDAYS[dayString] || dayString;
                    const dayArabic = ARABIC_WEEKDAYS[dayString] || dayString;

                    return (
                      <tr 
                        key={date.toISOString()} 
                        className={cn(
                          "transition-all duration-150 hover:bg-white/2",
                          isCurrentDay ? "bg-gold/5 border-l-2 border-l-gold" : "",
                          isFriday ? "bg-emerald-950/5" : ""
                        )}
                      >
                        {/* Day Name */}
                        <td className="py-3 px-5 font-outfit font-bold">
                          <div className="flex items-center gap-1.5">
                            <span className={cn(isFriday ? "text-emerald-400" : isCurrentDay ? "text-gold" : "text-white")}>
                              {dayString}
                            </span>
                            <span className="text-foreground/30 text-xs font-normal">
                              · {daySomali} · <span className="font-arabic text-[10px] text-gold/60">{dayArabic}</span>
                            </span>
                            {isFriday && (
                              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[8px] font-bold h-4 py-0">
                                JIMCE
                              </Badge>
                            )}
                          </div>
                        </td>

                        {/* Gregorian Date */}
                        <td className="py-3 px-4 text-center text-xs font-semibold text-foreground/70">
                          {date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                        </td>

                        {/* Hijri Date */}
                        <td className="py-3 px-4 text-center text-xs font-semibold">
                          <div className="flex flex-col items-center">
                            <span className="text-foreground/90 font-arabic leading-none" style={{ direction: "rtl" }}>
                              {hijri.day} {hijri.monthNameArabic} {hijri.year} هـ
                            </span>
                            <span className="text-[10px] text-foreground/40 mt-1 flex items-center gap-1 leading-none">
                              {hijri.day} {hijri.monthName} ({hijri.monthNameSomali})
                              {isSacredMonth && <span className="text-gold" title="Sacred Month">☾</span>}
                            </span>
                          </div>
                        </td>

                        {/* Prayer Times */}
                        <td className="py-3 px-4 text-center font-bold text-gold/90">{times.fajr}</td>
                        <td className="py-3 px-4 text-center text-zinc-500 text-xs">{times.sunrise}</td>
                        <td className="py-3 px-4 text-center font-bold text-foreground/90">{times.dhuhr}</td>
                        <td className="py-3 px-4 text-center font-bold text-foreground/90">{times.asr}</td>
                        <td className="py-3 px-4 text-center font-bold text-emerald-400">{times.maghrib}</td>
                        <td className="py-3 px-4 text-center font-bold text-gold/90">{times.isha}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Footer Info Disclaimer */}
          <div className="flex items-center gap-2 bg-emerald-500/5 p-4 border border-emerald-500/10 rounded-2xl text-xs text-foreground/50 leading-relaxed">
            <Info size={16} className="text-emerald-400 flex-shrink-0" />
            <p>
              <strong>Astronomic Verification System:</strong> This calendar system compiles the official civil prayer calculation norms of the Republic of Somaliland. Moon-sighting dates remain subject to localized eye-witness confirmations mandated by the Ministry of Religious Affairs (MoRA) crescent observation committee, Hargeisa.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
