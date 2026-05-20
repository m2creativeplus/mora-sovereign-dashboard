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

// Reusable Components Sourced from M2 Design System
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
            <Volume2 size={18} className="text-gold" />
            <div>
              <h2 className="font-outfit font-bold text-sm text-gold tracking-widest">
                OFFICIAL ANNOUNCEMENTS & CIRCULARS
              </h2>
              <p className="text-xs text-foreground/40">
                Ministry of Religious Affairs & Endowments · {formatHijriDate(hijri)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gold/10 text-gold border-gold/20 text-xs">
              {announcements ? announcements.length : 0} Published
            </Badge>
            <Button
              size="sm"
              variant="outline"
              className="bg-gold/5 border-gold/25 text-gold hover:bg-gold/10 hover:border-gold/30"
            >
              <Megaphone size={13} />
              New Announcement
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Broadcast Banner — Urgent */}
          {announcements && announcements.length > 0 && (
            <Card className="glass-gold border-gold/20 bg-gold/5 p-4 mb-6 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-gold/15 flex-shrink-0">
                <AlertCircle size={20} className="text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <Badge className="bg-gold/20 text-gold border-gold/30 text-[9px] font-bold">URGENT — OFFICIAL</Badge>
                  <span className="text-xs text-gold/60">Broadcast: WhatsApp · Radio · TV</span>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {announcements[0].title}
                </p>
                <p className="text-xs mt-0.5 text-foreground/50 truncate">
                  {announcements[0].content.slice(0, 140)}...
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button size="sm" variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30">
                  <Share2 size={12} /> Share
                </Button>
                <Button size="sm" variant="outline" className="bg-white/5 text-foreground/60 border-white/10 hover:bg-white/10">
                  <Download size={12} /> PDF
                </Button>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-3 gap-6">
            {/* Announcements List */}
            <div className="col-span-2 space-y-4">
              {/* Filter Tabs */}
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-foreground/40" />
                <div className="flex gap-2 flex-wrap">
                  {TYPE_FILTERS.map(f => (
                    <Button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      size="sm"
                      variant="outline"
                      className={cn(
                        "text-xs capitalize transition-all",
                        activeFilter === f
                          ? "bg-gold/15 text-gold border-gold/30 hover:bg-gold/25"
                          : "bg-white/4 text-foreground/50 border-white/7 hover:bg-white/8"
                      )}
                    >
                      {f === "All" ? "All Types" : f}
                    </Button>
                  ))}
                </div>
                <span className="ml-auto text-xs text-foreground/35">
                  {filtered.length} results
                </span>
              </div>

              {/* Cards */}
              {filtered.map((ann) => (
                <Card
                  key={ann._id}
                  className="glass-card border-white/5 bg-white/3 p-5 cursor-pointer hover:border-white/10 transition-all duration-300"
                  onClick={() => setExpandedId(expandedId === ann._id ? null : ann._id)}
                >
                  <div className="flex items-start gap-3">
                    {/* Type Icon */}
                    <div className="p-2 rounded-lg flex-shrink-0 mt-0.5 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400">
                      {TYPE_ICONS[ann.type] || <Volume2 size={14} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Badges Row */}
                      <div className="flex items-center gap-2 mb-2">
                        {ann.urgent && (
                          <Badge className="bg-gold/10 text-gold border-gold/20 text-[9px] font-bold">
                            <AlertCircle size={9} className="mr-0.5" /> URGENT
                          </Badge>
                        )}
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-bold capitalize">
                          {ann.type}
                        </Badge>
                        {ann.channels.map((ch: any) => (
                          <Badge key={ch} className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[9px] font-bold">
                            {ch}
                          </Badge>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="font-outfit font-bold text-base leading-snug text-foreground">
                        {ann.title}
                      </h3>

                      {/* Arabic Title */}
                      <p className="font-arabic text-sm mt-1 text-gold/60" style={{ direction: "rtl", textAlign: "right" }}>
                        {ann.titleArabic}
                      </p>

                      {/* Somali Title */}
                      <p className="text-xs mt-0.5 italic text-foreground/40">
                        {ann.titleSomali}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 mt-3">
                        <span className="flex items-center gap-1 text-xs text-foreground/35">
                          <Clock size={10} /> {ann.date}
                        </span>
                        <span className="text-xs text-foreground/35">
                          {ann.author}
                        </span>
                      </div>

                      {/* Expanded Content */}
                      {expandedId === ann._id && (
                        <div className="mt-4 pt-4 border-t border-white/6">
                          <p className="text-sm leading-relaxed text-foreground/70">
                            {ann.content}
                          </p>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30">
                              <Share2 size={12} /> Broadcast via WhatsApp
                            </Button>
                            <Button size="sm" variant="outline" className="bg-gold/8 text-gold border-gold/15 hover:bg-gold/15">
                              <Download size={12} /> Download PDF
                            </Button>
                            <Button size="sm" variant="outline" className="bg-white/4 text-foreground/50 border-white/8 hover:bg-white/8">
                              <Globe size={12} /> Publish to Portal
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status Indicator */}
                    <div className="flex-shrink-0">
                      {ann.urgent
                        ? <AlertCircle size={16} className="text-amber-500" />
                        : <CheckCircle size={16} className="text-emerald-500" />
                      }
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Right Panel */}
            <div className="space-y-4">
              {/* Broadcast Stats */}
              <Card className="glass-card border-white/5 bg-white/3 p-5">
                <h3 className="section-title mb-4 font-outfit font-bold text-sm text-foreground flex items-center gap-1.5">
                  Broadcast Channels
                </h3>
                {[
                  { label: "WhatsApp Groups", count: 247, pct: 94 },
                  { label: "Official Website", count: 1, pct: 100 },
                  { label: "FM Radio Stations", count: 8, pct: 88 },
                  { label: "TV Stations", count: 3, pct: 75 },
                  { label: "SMS Broadcast", count: 12840, pct: 71 },
                ].map(ch => (
                  <div key={ch.label} className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground/60">{ch.label}</span>
                      <span className="text-xs font-semibold text-gold">{ch.pct}%</span>
                    </div>
                    <Progress value={ch.pct} className="h-1.5 bg-white/5" />
                  </div>
                ))}
              </Card>

              {/* Recent Circular Types */}
              <Card className="glass-card border-white/5 bg-white/3 p-5">
                <h3 className="section-title mb-4 font-outfit font-bold text-sm text-foreground flex items-center gap-1.5">
                  By Type
                </h3>
                {[
                  { type: "Official", count: 12, color: "#D4AF37" },
                  { type: "Religious", count: 34, color: "#4ade80" },
                  { type: "Hajj/Umrah", count: 8, color: "#60a5fa" },
                  { type: "Education", count: 19, color: "#a78bfa" },
                ].map(t => (
                  <div key={t.type} className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                      <span className="text-sm text-foreground/70">{t.type}</span>
                    </div>
                    <span className="font-outfit font-bold text-sm" style={{ color: t.color }}>{t.count}</span>
                  </div>
                ))}
              </Card>

              {/* Publish Announcement CTA */}
              <Card className="glass-green border-emerald-500/20 bg-emerald-500/5 p-5">
                <h3 className="font-outfit font-bold text-sm mb-2 text-emerald-400">
                  Publish New Announcement
                </h3>
                <p className="text-xs mb-4 text-foreground/50">
                  Draft, approve, and broadcast to all registered channels in one workflow.
                </p>
                <Button
                  className="w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 font-bold"
                >
                  + New Draft
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
