"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getCurrentHijriDate, formatHijriDate } from "@/lib/hijri";
import {
  Volume2, AlertCircle, CheckCircle, Clock, Filter,
  Globe, Megaphone, BookOpen, Plane, GraduationCap, Share2, Download
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const TYPE_FILTERS = ["All", "official", "religious", "hajj", "education"] as const;
const TYPE_ICONS: Record<string, React.ReactNode> = {
  official:   <Megaphone size={14} />,
  religious:  <BookOpen size={14} />,
  hajj:       <Plane size={14} />,
  education:  <GraduationCap size={14} />,
};

export default function AnnouncementsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<any | null>(null);
  const hijri = getCurrentHijriDate();
  const announcements = useQuery(api.announcements.getAll);

  const filtered = announcements ? (activeFilter === "All"
    ? announcements
    : announcements.filter((a: any) => a.type === activeFilter)) : [];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b"
          style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <Volume2 size={18} style={{ color: "#D4AF37" }} />
            <div>
              <h2 className="font-outfit font-bold text-sm" style={{ color: "#D4AF37", letterSpacing: "0.08em" }}>
                OFFICIAL ANNOUNCEMENTS & CIRCULARS
              </h2>
              <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)" }}>
                Ministry of Religious Affairs & Endowments · {formatHijriDate(hijri)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge badge-gold text-xs">{announcements ? announcements.length : 0} Published</span>
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>
              <Megaphone size={13} />
              New Announcement
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Broadcast Banner — Urgent */}
          {announcements && announcements.length > 0 && (
          <div className="glass-gold p-4 mb-6 flex items-center gap-4">
            <div className="p-2 rounded-lg" style={{ background: "rgba(212,175,55,0.15)" }}>
              <AlertCircle size={20} style={{ color: "#D4AF37" }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="badge badge-gold" style={{ fontSize: "0.65rem" }}>URGENT — OFFICIAL</span>
                <span className="text-xs" style={{ color: "rgba(212,175,55,0.6)" }}>Broadcast: WhatsApp · Radio · TV</span>
              </div>
              <p className="text-sm font-semibold" style={{ color: "#E8EDE9" }}>
                {announcements[0].title}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(232,237,233,0.5)" }}>
                {announcements[0].content.slice(0, 140)}...
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: "rgba(26,92,42,0.2)", border: "1px solid rgba(26,92,42,0.3)", color: "#4ade80" }}>
                <Share2 size={12} /> Share
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(232,237,233,0.6)" }}>
                <Download size={12} /> PDF
              </button>
            </div>
          </div>
          )}

          <div className="grid grid-cols-3 gap-6">
            {/* Announcements List */}
            <div className="col-span-2 space-y-4">
              {/* Filter Tabs */}
              <div className="flex items-center gap-2">
                <Filter size={14} style={{ color: "rgba(232,237,233,0.4)" }} />
                <div className="flex gap-2 flex-wrap">
                  {TYPE_FILTERS.map(f => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize"
                      style={{
                        background: activeFilter === f ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.04)",
                        border: activeFilter === f ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(255,255,255,0.07)",
                        color: activeFilter === f ? "#D4AF37" : "rgba(232,237,233,0.5)",
                      }}>
                      {f === "All" ? "All Types" : f}
                    </button>
                  ))}
                </div>
                <span className="ml-auto text-xs" style={{ color: "rgba(232,237,233,0.3)" }}>
                  {filtered.length} results
                </span>
              </div>

              {/* Cards */}
              {filtered.map((ann) => (
                <div
                  key={ann.id}
                  className="glass-card p-5 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === ann.id ? null : ann.id)}
                >
                  <div className="flex items-start gap-3">
                    {/* Type Icon */}
                    <div className="p-2 rounded-lg flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(26,92,42,0.15)", border: "1px solid rgba(26,92,42,0.2)", color: "#4ade80" }}>
                      {TYPE_ICONS[ann.type] || <Volume2 size={14} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Badges Row */}
                      <div className="flex items-center gap-2 mb-2">
                        {ann.urgent && (
                          <span className="badge badge-gold" style={{ fontSize: "0.62rem" }}>
                            <AlertCircle size={9} /> URGENT
                          </span>
                        )}
                        <span className="badge badge-mora-green capitalize" style={{ fontSize: "0.62rem" }}>
                          {ann.type}
                        </span>
                        {ann.channels.map(ch => (
                          <span key={ch} className="badge badge-blue" style={{ fontSize: "0.6rem" }}>{ch}</span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="font-outfit font-bold text-base leading-snug" style={{ color: "#E8EDE9" }}>
                        {ann.title}
                      </h3>

                      {/* Arabic Title */}
                      <p className="font-arabic text-sm mt-1" style={{ color: "rgba(212,175,55,0.6)", direction: "rtl", textAlign: "right" }}>
                        {ann.titleArabic}
                      </p>

                      {/* Somali Title */}
                      <p className="text-xs mt-0.5 italic" style={{ color: "rgba(232,237,233,0.4)" }}>
                        {ann.titleSomali}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 mt-3">
                        <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(232,237,233,0.35)" }}>
                          <Clock size={10} /> {ann.date}
                        </span>
                        <span className="text-xs" style={{ color: "rgba(232,237,233,0.35)" }}>
                          {ann.author}
                        </span>
                      </div>

                      {/* Expanded Content */}
                      {expandedId === ann.id && (
                        <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                          <p className="text-sm leading-relaxed" style={{ color: "rgba(232,237,233,0.7)" }}>
                            {ann.content}
                          </p>
                          <div className="flex gap-2 mt-4">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                              style={{ background: "rgba(26,92,42,0.2)", border: "1px solid rgba(26,92,42,0.3)", color: "#4ade80" }}>
                              <Share2 size={12} /> Broadcast via WhatsApp
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                              style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)", color: "#D4AF37" }}>
                              <Download size={12} /> Download PDF
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(232,237,233,0.5)" }}>
                              <Globe size={12} /> Publish to Portal
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status Indicator */}
                    <div className="flex-shrink-0">
                      {ann.urgent
                        ? <AlertCircle size={16} style={{ color: "#f59e0b" }} />
                        : <CheckCircle size={16} style={{ color: "#22c55e" }} />
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Panel */}
            <div className="space-y-4">
              {/* Broadcast Stats */}
              <div className="glass-card p-5">
                <h3 className="section-title mb-4">Broadcast Channels</h3>
                {[
                  { label: "WhatsApp Groups", count: 247, pct: 94 },
                  { label: "Official Website", count: 1, pct: 100 },
                  { label: "FM Radio Stations", count: 8, pct: 88 },
                  { label: "TV Stations", count: 3, pct: 75 },
                  { label: "SMS Broadcast", count: 12840, pct: 71 },
                ].map(ch => (
                  <div key={ch.label} className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs" style={{ color: "rgba(232,237,233,0.6)" }}>{ch.label}</span>
                      <span className="text-xs font-semibold" style={{ color: "#D4AF37" }}>{ch.pct}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${ch.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Circular Types */}
              <div className="glass-card p-5">
                <h3 className="section-title mb-4">By Type</h3>
                {[
                  { type: "Official", count: 12, color: "#D4AF37" },
                  { type: "Religious", count: 34, color: "#4ade80" },
                  { type: "Hajj/Umrah", count: 8, color: "#60a5fa" },
                  { type: "Education", count: 19, color: "#a78bfa" },
                ].map(t => (
                  <div key={t.type} className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                      <span className="text-sm" style={{ color: "rgba(232,237,233,0.7)" }}>{t.type}</span>
                    </div>
                    <span className="font-outfit font-bold text-sm" style={{ color: t.color }}>{t.count}</span>
                  </div>
                ))}
              </div>

              {/* Publish Announcement CTA */}
              <div className="glass-green p-5">
                <h3 className="font-outfit font-bold text-sm mb-2" style={{ color: "#4ade80" }}>
                  Publish New Announcement
                </h3>
                <p className="text-xs mb-4" style={{ color: "rgba(232,237,233,0.5)" }}>
                  Draft, approve, and broadcast to all registered channels in one workflow.
                </p>
                <button
                  className="w-full py-2 rounded-lg text-sm font-bold transition-all"
                  style={{ background: "rgba(26,92,42,0.4)", border: "1px solid rgba(26,92,42,0.5)", color: "#4ade80" }}>
                  + New Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
