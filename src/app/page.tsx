"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { calculatePrayerTimes, getPrayerEntries, getCurrentPrayer } from "@/lib/prayer-times";
import { getCurrentHijriDate, formatHijriDate, formatHijriDateArabic } from "@/lib/hijri";
import { MORA_STATS, REGIONS, HAJJ_STATS } from "@/lib/data";
import {
  Building2, MapPin, Users, Plane, Volume2, Moon, BarChart3,
  TrendingUp, AlertCircle, CheckCircle, Clock, Megaphone, Globe
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function OverviewPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState(calculatePrayerTimes());
  const [activePrayer, setActivePrayer] = useState<string>("fajr");

  const announcements = useQuery(api.announcements.getAll);
  const mosques = useQuery(api.mosques.getAll);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const times = calculatePrayerTimes(now);
      setPrayerTimes(times);
      setActivePrayer(getCurrentPrayer(times));
    }, 30000);
    setActivePrayer(getCurrentPrayer(prayerTimes));
    return () => clearInterval(timer);
  }, []);

  const hijri = getCurrentHijriDate();
  const prayers = getPrayerEntries(currentTime);

  const statIcons = {
    mosques: <Building2 size={22} style={{ color: "#D4AF37" }} />,
    waqfAssets: <MapPin size={22} style={{ color: "#D4AF37" }} />,
    scholars: <Users size={22} style={{ color: "#D4AF37" }} />,
    pilgrims: <Plane size={22} style={{ color: "#D4AF37" }} />,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-geometric" style={{ background: "var(--background)" }}>
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b" style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div>
            <h2 className="font-outfit font-bold text-sm" style={{ color: "#D4AF37", letterSpacing: "0.08em" }}>
              REPUBLIC OF SOMALILAND — MINISTRY OF RELIGIOUS AFFAIRS & ENDOWMENTS
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "rgba(232,237,233,0.4)" }}>
              Sovereign Intelligence Dashboard · Hargeisa, Somaliland
            </p>
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
                <div key={key} className="stat-card fade-in">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg" style={{ background: "rgba(212,175,55,0.08)" }}>
                      {statIcons[key]}
                    </div>
                    <span className="badge badge-gold">{stat.trend}</span>
                  </div>
                  <p className="font-outfit font-bold text-2xl" style={{ color: "#E8EDE9" }}>
                    {stat.value.toLocaleString()}
                  </p>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: "#D4AF37" }}>{stat.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(232,237,233,0.4)" }}>{stat.subLabel}</p>
                </div>
              );
            })}
          </div>

          {/* Prayer Times + Active Announcement */}
          <div className="grid grid-cols-5 gap-4">
            {/* Prayer Times — full width panel */}
            <div className="col-span-3 glass-card p-5">
              <div className="section-header">
                <h3 className="section-title">
                  <Moon size={16} style={{ color: "#D4AF37" }} />
                  Prayer Times — Hargeisa
                </h3>
                <span className="badge badge-mora-green">
                  <span className="pulse-gold">●</span> Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {prayers.filter(p => p.key !== "sunrise").map((prayer) => (
                  <div
                    key={prayer.key}
                    className={`prayer-card ${activePrayer === prayer.key ? "active-prayer" : ""}`}
                  >
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
                      <span className="badge badge-gold mt-2 w-full justify-center" style={{ fontSize: "0.6rem" }}>
                        CURRENT
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: "rgba(232,237,233,0.25)" }}>
                Method: Muslim World League (MWL) · Coordinates: 9.5596°N, 44.0650°E · EAT (UTC+3)
              </p>
            </div>

            {/* Hijri Calendar Quick View */}
            <div className="col-span-2 glass-card p-5">
              <div className="section-header">
                <h3 className="section-title">Islamic Date</h3>
              </div>
              <div className="text-center mb-4">
                <p className="font-arabic text-3xl font-bold" style={{ color: "#D4AF37", direction: "rtl" }}>
                  {hijri.monthNameArabic}
                </p>
                <p className="font-outfit font-bold text-4xl mt-1" style={{ color: "#E8EDE9" }}>
                  {hijri.day}
                </p>
                <p className="text-sm font-semibold" style={{ color: "#D4AF37" }}>
                  {hijri.monthName} {hijri.year} AH
                </p>
                <p className="text-xs mt-1" style={{ color: "rgba(232,237,233,0.4)" }}>
                  {hijri.monthNameSomali}
                </p>
              </div>
              <div className="divider-gold my-3" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "rgba(232,237,233,0.5)" }}>Gregorian Date</span>
                  <span className="text-xs font-semibold" style={{ color: "#E8EDE9" }}>
                    {currentTime.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "rgba(232,237,233,0.5)" }}>Moon Sighting</span>
                  <span className="badge badge-green" style={{ fontSize: "0.65rem" }}>
                    <CheckCircle size={10} /> Confirmed
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "rgba(232,237,233,0.5)" }}>Next Event</span>
                  <span className="text-xs font-semibold" style={{ color: "#D4AF37" }}>Dhu al-Hijja 1446H</span>
                </div>
              </div>
            </div>
          </div>

          {/* Announcements + Regional Map */}
          <div className="grid grid-cols-5 gap-4">
            {/* Announcements */}
            <div className="col-span-3 glass-card p-5">
              <div className="section-header">
                <h3 className="section-title">
                  <Megaphone size={15} />
                  Official Announcements
                </h3>
                <button className="text-xs font-semibold" style={{ color: "#D4AF37" }}>View All →</button>
              </div>
              <div className="space-y-3">
                {announcements && announcements.slice(0, 3).map((ann: any) => (
                  <div key={ann._id} className="announcement-card">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {ann.urgent
                          ? <AlertCircle size={14} style={{ color: "#f59e0b" }} />
                          : <CheckCircle size={14} style={{ color: "#22c55e" }} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {ann.urgent && <span className="badge badge-gold" style={{ fontSize: "0.6rem" }}>URGENT</span>}
                          <span className="badge badge-blue" style={{ fontSize: "0.6rem" }}>{ann.type.toUpperCase()}</span>
                        </div>
                        <p className="text-sm font-semibold leading-snug" style={{ color: "#E8EDE9" }}>{ann.title}</p>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(232,237,233,0.5)" }}>
                          {ann.content.slice(0, 110)}...
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs flex items-center gap-1" style={{ color: "rgba(232,237,233,0.35)" }}>
                            <Clock size={10} /> {ann.date}
                          </span>
                          <div className="flex gap-1">
                            {ann.channels.map(ch => (
                              <span key={ch} className="badge badge-mora-green" style={{ fontSize: "0.58rem" }}>
                                {ch}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Stats */}
            <div className="col-span-2 glass-card p-5">
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
                      <span className="text-xs font-semibold" style={{ color: "#E8EDE9" }}>{region.name}</span>
                      <span className="text-xs" style={{ color: "#D4AF37" }}>{region.mosques} mosques</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${(region.mosques / 624) * 100}%` }}
                      />
                    </div>
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
                <div className="glass-card p-3" style={{ borderRadius: "8px" }}>
                  <p className="font-outfit font-bold text-xl" style={{ color: "#D4AF37" }}>
                    {HAJJ_STATS.approved.toLocaleString()}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)" }}>Approved</p>
                </div>
                <div className="glass-card p-3" style={{ borderRadius: "8px" }}>
                  <p className="font-outfit font-bold text-xl" style={{ color: "#4ade80" }}>
                    {HAJJ_STATS.utilizationPct}%
                  </p>
                  <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)" }}>Quota Used</p>
                </div>
              </div>
              <div className="progress-bar mt-3">
                <div className="progress-fill" style={{ width: `${HAJJ_STATS.utilizationPct}%` }} />
              </div>
              <p className="text-xs mt-1 text-right" style={{ color: "rgba(232,237,233,0.35)" }}>
                {HAJJ_STATS.pending} applications pending review
              </p>
            </div>
          </div>

          {/* Bottom Row — Recent Mosques + System Status */}
          <div className="grid grid-cols-5 gap-4">
            {/* Mosques */}
            <div className="col-span-3 glass-card p-5">
              <div className="section-header">
                <h3 className="section-title">
                  <Building2 size={15} />
                  Mosque Registry — Recent
                </h3>
                <button className="text-xs font-semibold" style={{ color: "#D4AF37" }}>Full Registry →</button>
              </div>
              <div className="space-y-2">
                {mosques && mosques.slice(0, 5).map((mosque: any) => (
                  <div key={mosque._id} className="mosque-card flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(26,92,42,0.2)" }}>
                      <Building2 size={14} style={{ color: "#4ade80" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "#E8EDE9" }}>{mosque.name}</p>
                      <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)" }}>
                        {mosque.region} · {mosque.district} · Cap: {mosque.capacity.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {mosque.waqf && <span className="badge badge-gold" style={{ fontSize: "0.6rem" }}>WAQF</span>}
                      <span className={`badge ${mosque.status === "Operational" ? "badge-green" : mosque.status === "Renovation" ? "badge-blue" : "badge-red"}`} style={{ fontSize: "0.6rem" }}>
                        {mosque.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System + Quick Actions */}
            <div className="col-span-2 glass-card p-5">
              <div className="section-header">
                <h3 className="section-title">
                  <BarChart3 size={15} />
                  System Status
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Prayer Times API", status: "Live", ok: true },
                  { label: "Hijri Calendar Engine", status: "Active", ok: true },
                  { label: "WhatsApp Broadcast", status: "Connected", ok: true },
                  { label: "Waqf Registry", status: "Database Ready", ok: true },
                  { label: "Moon Sighting System", status: "Monitoring", ok: true },
                  { label: "Publications Archive", status: "Online", ok: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "rgba(232,237,233,0.6)" }}>{item.label}</span>
                    <span className="badge badge-green" style={{ fontSize: "0.6rem" }}>
                      <span className="pulse-gold" style={{ color: "#22c55e" }}>●</span>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="divider-gold my-4" />

              {/* Quick Actions */}
              <div className="space-y-2">
                <p className="text-xs font-bold" style={{ color: "rgba(212,175,55,0.6)", letterSpacing: "0.08em" }}>QUICK ACTIONS</p>
                {[
                  { label: "Publish Announcement", icon: <Volume2 size={13} /> },
                  { label: "Update Prayer Times", icon: <Moon size={13} /> },
                  { label: "Register New Mosque", icon: <Building2 size={13} /> },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all"
                    style={{
                      background: "rgba(212,175,55,0.06)",
                      border: "1px solid rgba(212,175,55,0.12)",
                      color: "#D4AF37",
                    }}
                  >
                    {action.icon}
                    {action.label}
                    <span className="ml-auto" style={{ color: "rgba(212,175,55,0.4)" }}>→</span>
                  </button>
                ))}
              </div>
            </div>
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
