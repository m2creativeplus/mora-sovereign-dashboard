"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { FileText, Download, Search, BookOpen, Scale, FileCheck, Plane } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

// Reusable Components Sourced from M2 Design System
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TYPE_CONFIG: Record<string, { label: string; icon: React.ReactNode; badgeClass: string }> = {
  fatwa:    { label: "Fatwa",    icon: <Scale size={14} />,     badgeClass: "bg-gold/10 text-gold border-gold/20" },
  guidance: { label: "Guidance", icon: <BookOpen size={14} />,  badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  policy:   { label: "Policy",   icon: <FileCheck size={14} />, badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  hajj:     { label: "Hajj",     icon: <Plane size={14} />,     badgeClass: "bg-red-500/10 text-red-400 border-red-500/20" },
};

interface Publication {
  _id: string;
  type: string;
  title: string;
  titleArabic: string;
  scholar: string;
  date: string;
  language: string;
  downloads: number;
}

export default function PublicationsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const publications = useQuery(api.publications.getAll);

  const filtered = publications ? publications.filter((p: Publication) => {
    const matchType = typeFilter === "All" || p.type === typeFilter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.scholar.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  }) : [];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b"
          style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-gold" />
            <div>
              <h2 className="font-outfit font-bold text-sm text-gold tracking-widest">
                KNOWLEDGE REPOSITORY & PUBLICATIONS
              </h2>
              <p className="text-xs text-foreground/40">
                Fatwas, Religious Guidance, Policies & Scholarly Archives
              </p>
            </div>
          </div>
          <Badge className="bg-gold/10 text-gold border-gold/20 text-xs">
            {publications ? publications.length : 0} Publications
          </Badge>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Search + Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="text-foreground/30 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search publications, scholars..."
                className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#E8EDE9", outline: "none" }}
              />
            </div>
            <div className="flex gap-2">
              {["All", "fatwa", "guidance", "policy"].map(t => (
                <Button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  size="sm"
                  variant="outline"
                  className={`capitalize transition-all font-semibold ${
                    typeFilter === t
                      ? "bg-gold/15 text-gold border-gold/30 hover:bg-gold/25"
                      : "bg-white/4 text-foreground/50 border-white/7 hover:bg-white/8"
                  }`}
                >
                  {t === "All" ? "All Types" : t}
                </Button>
              ))}
            </div>
          </div>

          {/* Publications Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filtered.map(pub => {
              const config = TYPE_CONFIG[pub.type] || TYPE_CONFIG.guidance;
              return (
                <Card
                  key={pub._id}
                  className="glass-card border-white/5 bg-white/3 p-5 hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl flex-shrink-0 bg-gold/8 border border-gold/15 text-gold">
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${config.badgeClass} text-[9px] font-bold`}>
                          {config.label}
                        </Badge>
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[9px] font-bold">
                          {pub.language}
                        </Badge>
                      </div>
                      <h3 className="font-outfit font-bold text-sm leading-snug text-foreground">
                        {pub.title}
                      </h3>
                      <p className="font-arabic text-xs mt-1 text-gold/60" style={{ direction: "rtl", textAlign: "right" }}>
                        {pub.titleArabic}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <p className="text-xs font-semibold text-foreground/50">{pub.scholar}</p>
                          <p className="text-xs text-foreground/30">{pub.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-outfit font-bold text-sm text-gold">
                              {pub.downloads.toLocaleString()}
                            </p>
                            <p className="text-xs text-foreground/30">downloads</p>
                          </div>
                          <Button
                            size="icon"
                            variant="outline"
                            className="w-8 h-8 rounded-lg bg-gold/8 border border-gold/15 text-gold hover:bg-gold/15"
                          >
                            <Download size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* AI Search CTA */}
          <Card className="glass-gold border-gold/20 bg-gold/5 p-5 mt-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gold/12 flex-shrink-0 text-gold">
              <BookOpen size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-outfit font-bold text-sm text-gold">
                AI-Assisted Knowledge Search (Phase 3)
              </p>
              <p className="text-xs mt-0.5 text-foreground/50 leading-relaxed">
                Semantic search across all fatwas, khutbahs, and publications in Somali, Arabic, and English.
                Retrieval only — no autonomous religious content generation.
              </p>
            </div>
            <Badge className="bg-gold/15 text-gold border-gold/25 text-xs flex-shrink-0">
              Coming Phase 3
            </Badge>
          </Card>
        </div>
      </main>
    </div>
  );
}
