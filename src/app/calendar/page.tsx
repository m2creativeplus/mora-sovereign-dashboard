"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  getCurrentHijriDate,
  getDaysInHijriMonth,
  getEventsForMonth,
  HIJRI_MONTH_NAMES,
  formatHijriDateArabic,
  IslamicEvent,
} from "@/lib/hijri";
import { getPrayerEntries } from "@/lib/prayer-times";
import { Moon, ChevronLeft, ChevronRight, Star, AlertCircle, Calendar } from "lucide-react";

// Reusable Components Sourced from M2 Design System
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { cn } from "@/lib/utils";

export default function CalendarPage() {
  const today = getCurrentHijriDate();
  const [viewMonth, setViewMonth] = useState(today.month);
  const [viewYear, setViewYear] = useState(today.year);

  const daysInMonth = getDaysInHijriMonth(viewMonth, viewYear);
  const monthEvents = getEventsForMonth(viewMonth);
  const prayers = getPrayerEntries(new Date());

  const monthInfo = HIJRI_MONTH_NAMES[viewMonth];

  const prevMonth = () => {
    if (viewMonth === 1) { setViewMonth(12); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 12) { setViewMonth(1); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isToday = (day: number) =>
    day === today.day && viewMonth === today.month && viewYear === today.year;

  const dayHasEvent = (day: number): IslamicEvent | undefined =>
    monthEvents.find(e => e.hijriDay === day);

  // Build calendar grid rows (7 days per row, Hijri week starts Sunday)
  const rows: number[][] = [];
  let row: number[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    row.push(d);
    if (row.length === 7) { rows.push(row); row = []; }
  }
  if (row.length > 0) rows.push(row);

  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b"
          style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <Moon size={18} className="text-gold" />
            <div>
              <h2 className="font-outfit font-bold text-sm text-gold tracking-widest">
                HIJRI CALENDAR — ISLAMIC DATE AUTHORITY
              </h2>
              <p className="text-xs text-foreground/40">
                Official Somaliland Moon-Sighting & Calendar System
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Moon Sighting: Confirmed
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-gold/5 border border-gold/15">
              <p className="text-xs font-semibold font-arabic text-gold" style={{ direction: "rtl" }}>
                {formatHijriDateArabic(today)}
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-6">

            {/* Main Calendar */}
            <Card className="col-span-2 glass-card border-white/5 bg-white/3 p-6">
              {/* Month Nav */}
              <div className="flex items-center justify-between mb-6">
                <Button onClick={prevMonth} size="icon" variant="outline" className="bg-white/4 border-white/8 hover:bg-white/8 text-gold">
                  <ChevronLeft size={16} />
                </Button>

                <div className="text-center">
                  <h3 className="font-arabic font-bold text-2xl text-gold" style={{ direction: "rtl" }}>
                    {monthInfo?.ar}
                  </h3>
                  <p className="font-outfit font-semibold text-lg mt-0.5 text-foreground">
                    {monthInfo?.en} {viewYear} AH
                  </p>
                  <p className="text-xs text-foreground/40">
                    {monthInfo?.so} · {daysInMonth} days
                  </p>
                </div>

                <Button onClick={nextMonth} size="icon" variant="outline" className="bg-white/4 border-white/8 hover:bg-white/8 text-gold">
                  <ChevronRight size={16} />
                </Button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {WEEKDAYS.map(wd => (
                  <div key={wd} className="text-center py-2">
                    <span className={cn(
                      "text-xs font-bold tracking-wider",
                      wd === "Fri" ? "text-gold" : "text-foreground/35"
                    )}>{wd}</span>
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="space-y-1">
                {rows.map((row, ri) => (
                  <div key={ri} className="grid grid-cols-7 gap-1">
                    {row.map((day) => {
                      const event = dayHasEvent(day);
                      const todayDay = isToday(day);
                      return (
                        <div
                          key={day}
                          className={`calendar-day ${todayDay ? "today" : event ? "event" : ""}`}
                          style={{ padding: "8px 4px" }}
                        >
                          <span className="font-outfit font-semibold text-sm">{day}</span>
                          {event && (
                            <span className="mt-0.5 text-[9px] text-emerald-400 font-bold leading-none">
                              ★
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {/* Fill remaining cells */}
                    {Array(7 - row.length).fill(0).map((_, i) => (
                      <div key={`empty-${i}`} className="calendar-day" style={{ opacity: 0 }} />
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded calendar-day today" style={{ padding: 0 }} />
                  <span className="text-xs text-foreground/50">Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded calendar-day event" style={{ padding: 0 }} />
                  <span className="text-xs text-foreground/50">Islamic Event</span>
                </div>
                <span className="text-xs ml-auto text-foreground/30">
                  Friday prayers highlighted · EAT (UTC+3)
                </span>
              </div>
            </Card>

            {/* Sidebar Panels */}
            <div className="space-y-4">
              {/* Today's Full Prayer Schedule */}
              <Card className="glass-card border-white/5 bg-white/3 p-5">
                <h3 className="section-title mb-1 font-outfit font-bold text-sm text-foreground flex items-center gap-1.5">
                  <Moon size={14} className="text-gold" />
                  Today's Prayers
                </h3>
                <p className="text-xs text-foreground/45 mb-3">
                  Hargeisa · 9.5596°N, 44.0650°E
                </p>
                <div className="space-y-2">
                  {prayers.map(prayer => (
                    <div key={prayer.key} className="flex items-center justify-between py-2 px-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <div>
                        <span className="text-sm font-semibold text-foreground">{prayer.name}</span>
                        <span className="ml-2 font-arabic text-xs text-gold/70">{prayer.nameArabic}</span>
                      </div>
                      <span className="font-mono text-sm font-bold text-gold">{prayer.time}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] mt-3 text-foreground/25">
                  Method: Muslim World League
                </p>
              </Card>

              {/* Events This Month */}
              <Card className="glass-card border-white/5 bg-white/3 p-5">
                <h3 className="section-title mb-4 font-outfit font-bold text-sm text-foreground flex items-center gap-1.5">
                  <Star size={14} className="text-gold" />
                  Events This Month
                </h3>
                {monthEvents.length === 0 ? (
                  <p className="text-xs text-foreground/40">
                    No major events this month.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {monthEvents.map((event, i) => (
                      <Card key={i} className="glass-card border-white/4 bg-white/2 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn(
                            "text-[8px] font-bold",
                            event.type === "major" ? "bg-gold/10 text-gold border-gold/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          )}>
                            {event.type.toUpperCase()}
                          </Badge>
                          <span className="text-xs font-semibold text-gold">
                            {viewMonth}/{event.hijriDay}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">{event.name}</p>
                        <p className="font-arabic text-xs mt-1 text-gold/60" style={{ direction: "rtl" }}>
                          {event.nameArabic}
                        </p>
                        <p className="text-xs mt-1 text-foreground/40">
                          {event.nameSomali}
                        </p>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>

              {/* Moon Sighting Status */}
              <Card className="glass-green border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-emerald-400">Moon Sighting Confirmed</p>
                    <p className="text-xs mt-1 text-foreground/50 leading-relaxed">
                      The crescent moon of {monthInfo?.en} {viewYear} AH was officially sighted
                      and confirmed by the MORA Moon Sighting Committee, Hargeisa.
                    </p>
                    <p className="text-xs mt-2 font-semibold text-gold/70">
                      MORA Official Announcement · {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* All Islamic Events Reference */}
          <Card className="glass-card border-white/5 bg-white/3 p-6 mt-6">
            <div className="section-header mb-4 flex items-center justify-between">
              <h3 className="section-title font-outfit font-bold text-sm text-foreground flex items-center gap-1.5">
                <Calendar size={15} className="text-gold" />
                Islamic Calendar Reference — 1446–1447 AH
              </h3>
              <Badge className="bg-gold/10 text-gold border-gold/20 text-xs font-semibold">Official MORA Reference</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => {
                const mInfo = HIJRI_MONTH_NAMES[m];
                const mEvents = getEventsForMonth(m);
                const isCurrent = m === today.month;
                return (
                  <Card key={m} className={cn(
                    "p-4 cursor-pointer transition-all duration-300",
                    isCurrent ? "glass-gold border-gold/20 bg-gold/5" : "glass-card border-white/5 bg-white/2 hover:border-white/10"
                  )}
                    onClick={() => setViewMonth(m)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={cn("text-xs font-bold tracking-wider", isCurrent ? "text-gold" : "text-foreground/40")}>
                        Month {m}
                      </span>
                      {mEvents.length > 0 && (
                        <Badge className="bg-gold/10 text-gold border-gold/20 text-[9px] font-bold">{mEvents.length} events</Badge>
                      )}
                    </div>
                    <p className={cn("font-outfit font-semibold text-sm", isCurrent ? "text-foreground" : "text-foreground/70")}>
                      {mInfo?.en}
                    </p>
                    <p className={cn("font-arabic text-xs mt-0.5", isCurrent ? "text-gold/80" : "text-foreground/30")} style={{ direction: "rtl" }}>
                      {mInfo?.ar}
                    </p>
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
