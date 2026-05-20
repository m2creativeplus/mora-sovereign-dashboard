"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { calculatePrayerTimes, getPrayerEntries, getCurrentPrayer } from "@/lib/prayer-times";
import { getCurrentHijriDate, formatHijriDate, formatHijriDateArabic, gregorianToHijri } from "@/lib/hijri";
import { MORA_STATS, REGIONS, HAJJ_STATS } from "@/lib/data";
import {
  Building2, MapPin, Users, Plane, Volume2, Moon, BarChart3,
  TrendingUp, AlertCircle, CheckCircle, Clock, Megaphone, Globe,
  ChevronLeft, ChevronRight, CalendarDays, Undo2
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Reusable Components Sourced from M2 Design System
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { cn } from "@/lib/utils";
import SomalilandEmblem from "@/components/SomalilandEmblem";
import SomalilandFlag from "@/components/SomalilandFlag";
import { PulsingAtoms } from "@/components/ui/PulsingAtoms";
import QiblaCompass from "@/components/QiblaCompass";


export default function OverviewPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [prayerTimes, setPrayerTimes] = useState(calculatePrayerTimes(selectedDate));
  const [activePrayer, setActivePrayer] = useState<string>("fajr");

  // Adhan notification toggles state
  const [adhanAlerts, setAdhanAlerts] = useState<Record<string, boolean>>({});
  const [lastNotified, setLastNotified] = useState<string>("");

  const announcements = useQuery(api.announcements.getAll);
  const mosques = useQuery(api.mosques.getAll);

  useEffect(() => {
    // Load enabled adhan alarms from localStorage
    const saved = localStorage.getItem("adhanAlerts");
    if (saved) {
      try {
        setAdhanAlerts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse adhan alerts:", e);
      }
    }
  }, []);

  const toggleAdhan = (key: string) => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
    const updated = { ...adhanAlerts, [key]: !adhanAlerts[key] };
    setAdhanAlerts(updated);
    localStorage.setItem("adhanAlerts", JSON.stringify(updated));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // If selectedDate is today, keep updating the prayer schedule live
      const isSelectedToday = selectedDate.toDateString() === now.toDateString();
      if (isSelectedToday) {
        const times = calculatePrayerTimes(now);
        setPrayerTimes(times);
        setActivePrayer(getCurrentPrayer(times));
      }

      // Check for Adhan notification triggers on the active live prayer times
      const liveTimes = calculatePrayerTimes(now);
      const activePr = getCurrentPrayer(liveTimes);
      const currentPrayerTime = liveTimes[activePr as keyof typeof liveTimes];
      
      if (currentPrayerTime) {
        const [timePart, period] = currentPrayerTime.split(" ");
        const [hStr, mStr] = timePart.split(":");
        let h = Number(hStr);
        let m = Number(mStr);
        if (period === "PM" && h !== 12) h += 12;
        if (period === "AM" && h === 12) h = 0;

        const curH = now.getHours();
        const curM = now.getMinutes();

        // If hours/minutes match exactly and we haven't popped a notification during this minute block
        const notifyKey = `${now.toDateString()}:${activePr}`;
        if (curH === h && curM === m && adhanAlerts[activePr] && lastNotified !== notifyKey) {
          if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
            const prayerName = activePr.charAt(0).toUpperCase() + activePr.slice(1);
            new Notification(`MORA Adhan Alert: ${prayerName}`, {
              body: `It is time for the ${prayerName} prayer in Hargeisa. (${currentPrayerTime})`,
              icon: "/favicon.ico",
              tag: activePr
            });
            setLastNotified(notifyKey);
          }
        }
      }
    }, 10000); // Poll every 10 seconds to catch the exact minute match

    const isSelectedToday = selectedDate.toDateString() === new Date().toDateString();
    if (isSelectedToday) {
      setActivePrayer(getCurrentPrayer(prayerTimes));
    } else {
      setActivePrayer(""); // Clear current highlight for navigated dates
    }
    
    return () => clearInterval(timer);
  }, [selectedDate, adhanAlerts, lastNotified, prayerTimes]);

  const navigateDate = (days: number) => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(nextDate);
    
    const times = calculatePrayerTimes(nextDate);
    setPrayerTimes(times);
    
    const isToday = nextDate.toDateString() === new Date().toDateString();
    if (isToday) {
      setActivePrayer(getCurrentPrayer(times));
    } else {
      setActivePrayer("");
    }
  };

  const resetToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    const times = calculatePrayerTimes(today);
    setPrayerTimes(times);
    setActivePrayer(getCurrentPrayer(times));
  };

  const hijri = gregorianToHijri(selectedDate);
  const prayers = getPrayerEntries(selectedDate);

  const statIcons = {
    mosques: <Building2 size={22} style={{ color: "#D4AF37" }} />,
    waqfAssets: <MapPin size={22} style={{ color: "#D4AF37" }} />,
    scholars: <Users size={22} style={{ color: "#D4AF37" }} />,
    pilgrims: <Plane size={22} style={{ color: "#D4AF37" }} />,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-geometric relative" style={{ background: "var(--background)" }}>
      {/* Premium Ambient Background Motion */}
      <PulsingAtoms />

      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden z-10">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b z-10" style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <SomalilandEmblem size={34} className="drop-shadow-[0_0_8px_rgba(212,175,55,0.3)] flex-shrink-0" />
            <div>
              <h2 className="font-outfit font-bold text-sm" style={{ color: "#D4AF37", letterSpacing: "0.08em" }}>
                REPUBLIC OF SOMALILAND — MINISTRY OF RELIGIOUS AFFAIRS & ENDOWMENTS
              </h2>
              <p className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: "rgba(232,237,233,0.4)" }}>
                Sovereign Intelligence Dashboard · Hargeisa, Somaliland
                <span className="opacity-30">|</span>
                <SomalilandFlag width={20} height={13} className="inline-block rounded-[1px] border border-white/5 shadow-sm" />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Live Clock */}
            <div className="text-right">
              <p className="text-sm font-mono font-bold" style={{ color: "#E8EDE9" }}>
                {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
              </p>
              <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)" }}>
                {currentTime.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })} · EAT
              </p>
            </div>

            {/* Hijri Date */}
            <div className="text-right px-4 py-2 rounded-lg" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
              <p className="text-xs font-semibold" style={{ color: "#D4AF37" }}>
                {formatHijriDate(hijri)}
              </p>
              <p className="text-xs font-arabic" style={{ color: "rgba(212,175,55,0.7)", direction: "rtl" }}>
                {formatHijriDateArabic(hijri)}
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* KPI Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            {(Object.keys(MORA_STATS) as Array<keyof typeof MORA_STATS>).map((key) => {
              const stat = MORA_STATS[key];
              return (
                <Card key={key} className="stat-card border-white/5 bg-white/3 hover:border-gold/15 transition-all duration-250 fade-in">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-gold/5">
                        {statIcons[key]}
                      </div>
                      <Badge className="bg-gold/10 text-gold border-gold/20 font-bold text-[10px]">{stat.trend}</Badge>
                    </div>
                    <p className="font-outfit font-bold text-2xl text-foreground">
                      {stat.value.toLocaleString()}
                    </p>
                    <p className="text-sm font-semibold mt-0.5 text-gold">{stat.label}</p>
                    <p className="text-xs mt-0.5 text-muted-foreground">{stat.subLabel}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Prayer Times + Active Announcement */}
          <div className="grid grid-cols-5 gap-4">
            {/* Prayer Times — full width panel */}
            <Card className="col-span-3 glass-card border-white/5 bg-white/3 p-5">
              <div className="section-header">
                <h3 className="section-title">
                  <Moon size={16} style={{ color: "#D4AF37" }} />
                  Prayer Times — Hargeisa
                </h3>
                <Badge className={cn(
                  "border font-bold gap-1.5",
                  selectedDate.toDateString() === new Date().toDateString() 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : "bg-zinc-800 text-zinc-400 border-white/10"
                )}>
                  <span className={cn(
                    "text-xs",
                    selectedDate.toDateString() === new Date().toDateString() ? "pulse-gold text-gold" : "text-zinc-500"
                  )}>●</span> {selectedDate.toDateString() === new Date().toDateString() ? "Live" : "Scheduled"}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {prayers.filter(p => p.key !== "sunrise").map((prayer) => {
                  const isAdhanEnabled = adhanAlerts[prayer.key] || false;
                  return (
                    <div
                      key={prayer.key}
                      className={`prayer-card relative ${activePrayer === prayer.key ? "active-prayer" : ""}`}
                    >
                      {/* Adhan Toggle Bell */}
                      <button
                        onClick={() => toggleAdhan(prayer.key)}
                        className={`absolute top-2.5 right-2.5 p-1 rounded-full border transition-all ${
                          isAdhanEnabled
                            ? "bg-gold/10 border-gold/30 text-gold shadow-md"
                            : "bg-white/2 border-white/5 text-zinc-500 hover:text-zinc-300"
                        }`}
                        title={isAdhanEnabled ? "Disable Adhan Browser Notification" : "Enable Adhan Browser Notification"}
                      >
                        <Volume2 size={11} className={isAdhanEnabled ? "animate-pulse" : ""} />
                      </button>

                      <p className="font-arabic text-sm font-semibold" style={{ color: activePrayer === prayer.key ? "#D4AF37" : "rgba(232,237,233,0.6)", direction: "rtl", marginBottom: "4px" }}>
                        {prayer.nameArabic}
                      </p>
                      <p className="font-outfit font-bold text-lg" style={{ color: activePrayer === prayer.key ? "#D4AF37" : "#E8EDE9" }}>
                        {prayer.time}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "rgba(232,237,233,0.4)" }}>
                        {prayer.nameSomali}
                      </p>
                      {activePrayer === prayer.key && (
                        <Badge className="mt-2 w-full justify-center bg-gold/10 text-gold border-gold/20 text-[9px] font-bold">
                          CURRENT
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-xs mt-3 text-muted-foreground opacity-60">
                Method: Muslim World League (MWL) · Coordinates: 9.5596°N, 44.0650°E · EAT (UTC+3)
              </p>
            </Card>

            {/* Interactive Date Navigator & Hijri Display */}
            <Card className="col-span-1 glass-card border-white/5 bg-white/3 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                  <h3 className="section-title text-xs font-bold text-foreground flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-gold" />
                    Date Navigator
                  </h3>
                  {selectedDate.toDateString() !== new Date().toDateString() && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={resetToToday}
                      className="h-5 px-1.5 text-[9px] font-bold text-gold bg-transparent border-white/10 hover:border-gold/30"
                    >
                      <Undo2 className="w-2.5 h-2.5 mr-0.5" /> TODAY
                    </Button>
                  )}
                </div>

                {/* Gregorian Navigator Controls */}
                <div className="flex items-center justify-between bg-zinc-950/60 border border-white/5 rounded-lg p-2.5 mb-3.5">
                  <Button 
                    onClick={() => navigateDate(-1)} 
                    size="icon" 
                    variant="outline" 
                    className="w-7 h-7 bg-white/3 border-white/6 hover:bg-white/6 text-gold"
                  >
                    <ChevronLeft size={14} />
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-xs font-bold text-white leading-none">
                      {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-1 font-mono">
                      {selectedDate.getFullYear()} Gregorian
                    </p>
                  </div>

                  <Button 
                    onClick={() => navigateDate(1)} 
                    size="icon" 
                    variant="outline" 
                    className="w-7 h-7 bg-white/3 border-white/6 hover:bg-white/6 text-gold"
                  >
                    <ChevronRight size={14} />
                  </Button>
                </div>

                {/* Calculated Hijri Display Directly Underneath */}
                <div className="text-center p-3 bg-gold/5 border border-gold/12 rounded-lg">
                  <p className="font-arabic text-2xl font-bold text-gold" style={{ direction: "rtl" }}>
                    {hijri.monthNameArabic}
                  </p>
                  <p className="font-outfit font-bold text-3xl text-white mt-1">
                    {hijri.day}
                  </p>
                  <p className="text-xs font-bold text-gold uppercase tracking-wider mt-1">
                    {hijri.monthName} {hijri.year} AH
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5 font-semibold">
                    {hijri.monthNameSomali}
                  </p>
                </div>
              </div>

              <div className="divider-gold my-3" />

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500 font-semibold">Moon Sighting</span>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] gap-1 font-bold h-4">
                    <CheckCircle size={9} /> Confirmed
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500 font-semibold">Regional Calib.</span>
                  <span className="text-white font-mono font-bold">Hargeisa SL</span>
                </div>
              </div>
            </Card>

            {/* Qibla Direction Compass */}
            <div className="col-span-1">
              <QiblaCompass />
            </div>
          </div>

          {/* Announcements + Regional Map */}
          <div className="grid grid-cols-5 gap-4">
            {/* Announcements */}
            <Card className="col-span-3 glass-card border-white/5 bg-white/3 p-5">
              <div className="section-header">
                <h3 className="section-title">
                  <Megaphone size={15} />
                  Official Announcements
                </h3>
                <Button variant="link" className="text-xs font-semibold text-gold h-auto p-0 hover:no-underline">
                  View All →
                </Button>
              </div>
              <div className="space-y-3">
                {announcements && announcements.slice(0, 3).map((ann: any) => (
                  <div key={ann._id} className="announcement-card">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {ann.urgent
                          ? <AlertCircle size={14} className="text-amber-500" />
                          : <CheckCircle size={14} className="text-emerald-500" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {ann.urgent && <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[9px] font-bold">URGENT</Badge>}
                          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[9px] font-bold">{ann.type.toUpperCase()}</Badge>
                        </div>
                        <p className="text-sm font-semibold leading-snug text-foreground">{ann.title}</p>
                        <p className="text-xs mt-1 leading-relaxed text-muted-foreground">
                          {ann.content.slice(0, 110)}...
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs flex items-center gap-1 text-muted-foreground opacity-60">
                            <Clock size={10} /> {ann.date}
                          </span>
                          <div className="flex gap-1">
                            {ann.channels.map((ch: any) => (
                              <Badge key={ch} className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-semibold">
                                {ch}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Regional Stats */}
            <Card className="col-span-2 glass-card border-white/5 bg-white/3 p-5">
              <div className="section-header">
                <h3 className="section-title">
                  <Globe size={15} />
                  Regional Coverage
                </h3>
              </div>
              <div className="space-y-3">
                {REGIONS.slice(0, 6).map((region) => (
                  <div key={region.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-foreground">{region.name}</span>
                      <span className="text-xs text-gold font-semibold">{region.mosques} mosques</span>
                    </div>
                    <Progress value={(region.mosques / 624) * 100} className="h-1 bg-white/5" />
                  </div>
                ))}
              </div>
              <div className="divider-gold my-4" />
              {/* Hajj Quick Stats */}
              <div className="section-header" style={{ marginBottom: "12px" }}>
                <h3 className="section-title">
                  <Plane size={14} />
                  Hajj 1446H
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="glass-card bg-white/2 border border-white/5 p-3 rounded-lg">
                  <p className="font-outfit font-bold text-xl text-gold">
                    {HAJJ_STATS.approved.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Approved</p>
                </div>
                <div className="glass-card bg-white/2 border border-white/5 p-3 rounded-lg">
                  <p className="font-outfit font-bold text-xl text-emerald-400">
                    {HAJJ_STATS.utilizationPct}%
                  </p>
                  <p className="text-xs text-muted-foreground">Quota Used</p>
                </div>
              </div>
              <Progress value={HAJJ_STATS.utilizationPct} className="h-1 bg-white/5 mt-3" />
              <p className="text-xs mt-1 text-right text-muted-foreground opacity-60">
                {HAJJ_STATS.pending} applications pending review
              </p>
            </Card>
          </div>

          {/* Bottom Row — Recent Mosques + System Status */}
          <div className="grid grid-cols-5 gap-4">
            {/* Mosques */}
            <Card className="col-span-3 glass-card border-white/5 bg-white/3 p-5">
              <div className="section-header">
                <h3 className="section-title">
                  <Building2 size={15} />
                  Mosque Registry — Recent
                </h3>
                <Button variant="link" className="text-xs font-semibold text-gold h-auto p-0 hover:no-underline">
                  Full Registry →
                </Button>
              </div>
              <div className="space-y-2">
                {mosques && mosques.slice(0, 5).map((mosque: any) => (
                  <div key={mosque._id} className="mosque-card flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-950/20">
                      <Building2 size={14} className="text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate text-foreground">{mosque.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {mosque.region} · {mosque.district} · Cap: {mosque.capacity.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {mosque.waqf && <Badge className="bg-gold/10 text-gold border-gold/20 text-[9px] font-bold">WAQF</Badge>}
                      <Badge 
                        className={cn(
                          "text-[9px] font-semibold",
                          mosque.status === "Operational" 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                            : mosque.status === "Renovation" 
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        )}
                      >
                        {mosque.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* System + Quick Actions */}
            <Card className="col-span-2 glass-card border-white/5 bg-white/3 p-5">
              <div className="section-header">
                <h3 className="section-title">
                  <BarChart3 size={15} />
                  System Status
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Prayer Times API", status: "active" as const },
                  { label: "Hijri Calendar Engine", status: "active" as const },
                  { label: "WhatsApp Broadcast", status: "active" as const },
                  { label: "Waqf Registry", status: "active" as const },
                  { label: "Moon Sighting System", status: "processing" as const },
                  { label: "Publications Archive", status: "active" as const },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <StatusIndicator status={item.status} />
                  </div>
                ))}
              </div>

              <div className="divider-gold my-4" />

              {/* Quick Actions */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-gold/60 tracking-wider">QUICK ACTIONS</p>
                {[
                  { label: "Publish Announcement", icon: <Volume2 size={13} /> },
                  { label: "Update Prayer Times", icon: <Moon size={13} /> },
                  { label: "Register New Mosque", icon: <Building2 size={13} /> },
                ].map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="w-full justify-start text-xs font-semibold text-gold bg-gold/5 border-gold/12 hover:bg-gold/10 hover:border-gold/20"
                  >
                    {action.icon}
                    {action.label}
                    <span className="ml-auto opacity-40">→</span>
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between py-2 px-1">
            <p className="text-xs" style={{ color: "rgba(232,237,233,0.2)" }}>
              DEMO PLATFORM · All data is illustrative · Built by M2 Creative & Consulting
            </p>
            <div className="flex items-center gap-4">
              <p className="text-xs" style={{ color: "rgba(232,237,233,0.2)" }}>
                MORA Sovereign Platform v1.0
              </p>
              <TrendingUp size={12} style={{ color: "rgba(212,175,55,0.3)" }} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
