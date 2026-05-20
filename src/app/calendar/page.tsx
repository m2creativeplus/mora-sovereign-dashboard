"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  getCurrentHijriDate,
  gregorianToHijri,
  getDaysInHijriMonth,
  getEventsForMonth,
  HIJRI_MONTH_NAMES,
  formatHijriDateArabic,
  IslamicEvent,
} from "@/lib/hijri";
import { getPrayerEntries } from "@/lib/prayer-times";
import { Moon, ChevronLeft, ChevronRight, Star, AlertCircle, Calendar } from "lucide-react";

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
            <Moon size={18} style={{ color: "#D4AF37" }} />
            <div>
              <h2 className="font-outfit font-bold text-sm" style={{ color: "#D4AF37", letterSpacing: "0.08em" }}>
                HIJRI CALENDAR — ISLAMIC DATE AUTHORITY
              </h2>
              <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)" }}>
                Official Somaliland Moon-Sighting & Calendar System
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge badge-green text-xs">
              <span className="pulse-gold" style={{ color: "#22c55e" }}>●</span>
              Moon Sighting: Confirmed
            </span>
            <div className="px-3 py-1.5 rounded-lg" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
              <p className="text-xs font-semibold font-arabic" style={{ color: "#D4AF37", direction: "rtl" }}>
                {formatHijriDateArabic(today)}
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-6">

            {/* Main Calendar */}
            <div className="col-span-2 glass-card p-6">
              {/* Month Nav */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className="p-2 rounded-lg transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <ChevronLeft size={16} style={{ color: "#D4AF37" }} />
                </button>

                <div className="text-center">
                  <h3 className="font-arabic font-bold text-2xl" style={{ color: "#D4AF37", direction: "rtl" }}>
                    {monthInfo?.ar}
                  </h3>
                  <p className="font-outfit font-semibold text-lg mt-0.5" style={{ color: "#E8EDE9" }}>
                    {monthInfo?.en} {viewYear} AH
                  </p>
                  <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)" }}>
                    {monthInfo?.so} · {daysInMonth} days
                  </p>
                </div>

                <button onClick={nextMonth} className="p-2 rounded-lg transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <ChevronRight size={16} style={{ color: "#D4AF37" }} />
                </button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {WEEKDAYS.map(wd => (
                  <div key={wd} className="text-center py-2">
                    <span className="text-xs font-bold" style={{
                      color: wd === "Fri" ? "#D4AF37" : "rgba(232,237,233,0.35)",
                      letterSpacing: "0.06em"
                    }}>{wd}</span>
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
                            <span className="mt-0.5" style={{ fontSize: "0.55rem", color: "#4ade80", textAlign: "center", lineHeight: 1.2 }}>
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
              <div className="flex items-center gap-4 mt-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded calendar-day today" style={{ padding: 0 }} />
                  <span className="text-xs" style={{ color: "rgba(232,237,233,0.5)" }}>Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded calendar-day event" style={{ padding: 0 }} />
                  <span className="text-xs" style={{ color: "rgba(232,237,233,0.5)" }}>Islamic Event</span>
                </div>
                <span className="text-xs ml-auto" style={{ color: "rgba(232,237,233,0.3)" }}>
                  Friday prayers highlighted · EAT (UTC+3)
                </span>
              </div>
            </div>

            {/* Sidebar Panels */}
            <div className="space-y-4">
              {/* Today's Full Prayer Schedule */}
              <div className="glass-card p-5">
                <div className="section-header">
                  <h3 className="section-title">
                    <Moon size={14} />
                    Today's Prayers
                  </h3>
                </div>
                <p className="text-xs mb-3" style={{ color: "rgba(232,237,233,0.4)" }}>
                  Hargeisa · 9.5596°N, 44.0650°E
                </p>
                <div className="space-y-2">
                  {prayers.map(prayer => (
                    <div key={prayer.key} className="flex items-center justify-between py-2 px-3 rounded-lg"
                      style={{ background: "rgba(26,92,42,0.08)", border: "1px solid rgba(26,92,42,0.15)" }}>
                      <div>
                        <span className="text-sm font-semibold" style={{ color: "#E8EDE9" }}>{prayer.name}</span>
                        <span className="ml-2 font-arabic text-xs" style={{ color: "rgba(212,175,55,0.7)" }}>{prayer.nameArabic}</span>
                      </div>
                      <span className="font-mono text-sm font-bold" style={{ color: "#D4AF37" }}>{prayer.time}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-3" style={{ color: "rgba(232,237,233,0.25)" }}>
                  Method: Muslim World League
                </p>
              </div>

              {/* Events This Month */}
              <div className="glass-card p-5">
                <div className="section-header">
                  <h3 className="section-title">
                    <Star size={14} />
                    Events This Month
                  </h3>
                </div>
                {monthEvents.length === 0 ? (
                  <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)" }}>
                    No major events this month.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {monthEvents.map((event, i) => (
                      <div key={i} className="announcement-card">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`badge ${event.type === "major" ? "badge-gold" : "badge-mora-green"}`}
                            style={{ fontSize: "0.6rem" }}>
                            {event.type.toUpperCase()}
                          </span>
                          <span className="text-xs font-semibold" style={{ color: "#D4AF37" }}>
                            {viewMonth}/{event.hijriDay}
                          </span>
                        </div>
                        <p className="text-sm font-semibold" style={{ color: "#E8EDE9" }}>{event.name}</p>
                        <p className="font-arabic text-xs mt-1" style={{ color: "rgba(212,175,55,0.6)", direction: "rtl" }}>
                          {event.nameArabic}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "rgba(232,237,233,0.4)" }}>
                          {event.nameSomali}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Moon Sighting Status */}
              <div className="glass-green p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} style={{ color: "#4ade80", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p className="text-sm font-bold" style={{ color: "#4ade80" }}>Moon Sighting Confirmed</p>
                    <p className="text-xs mt-1" style={{ color: "rgba(232,237,233,0.5)" }}>
                      The crescent moon of {monthInfo?.en} {viewYear} AH was officially sighted
                      and confirmed by the MORA Moon Sighting Committee, Hargeisa.
                    </p>
                    <p className="text-xs mt-2 font-semibold" style={{ color: "rgba(212,175,55,0.7)" }}>
                      MORA Official Announcement · {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Islamic Events Reference */}
          <div className="glass-card p-6 mt-6">
            <div className="section-header">
              <h3 className="section-title">
                <Calendar size={15} />
                Islamic Calendar Reference — 1446–1447 AH
              </h3>
              <span className="badge badge-gold text-xs">Official MORA Reference</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => {
                const mInfo = HIJRI_MONTH_NAMES[m];
                const mEvents = getEventsForMonth(m);
                const isCurrent = m === today.month;
                return (
                  <div key={m} className={`glass-card p-4 cursor-pointer transition-all ${isCurrent ? "glass-gold" : ""}`}
                    onClick={() => setViewMonth(m)}
                    style={{ borderRadius: "10px" }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold" style={{ color: isCurrent ? "#D4AF37" : "rgba(232,237,233,0.5)", letterSpacing: "0.04em" }}>
                        Month {m}
                      </span>
                      {mEvents.length > 0 && (
                        <span className="badge badge-gold" style={{ fontSize: "0.58rem" }}>{mEvents.length} events</span>
                      )}
                    </div>
                    <p className="font-outfit font-semibold text-sm" style={{ color: isCurrent ? "#E8EDE9" : "rgba(232,237,233,0.7)" }}>
                      {mInfo?.en}
                    </p>
                    <p className="font-arabic text-xs mt-0.5" style={{ color: isCurrent ? "rgba(212,175,55,0.8)" : "rgba(232,237,233,0.3)", direction: "rtl" }}>
                      {mInfo?.ar}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
