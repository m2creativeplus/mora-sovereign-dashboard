"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { FileText, Download, Search, BookOpen, Scale, FileCheck, Plane } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const TYPE_CONFIG: Record<string, { label: string; icon: React.ReactNode; badge: string }> = {
  fatwa:    { label: "Fatwa",    icon: <Scale size={14} />,     badge: "badge-gold" },
  guidance: { label: "Guidance", icon: <BookOpen size={14} />,  badge: "badge-mora-green" },
  policy:   { label: "Policy",   icon: <FileCheck size={14} />, badge: "badge-blue" },
  hajj:     { label: "Hajj",     icon: <Plane size={14} />,     badge: "badge-red" },
};

export default function PublicationsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const publications = useQuery(api.publications.getAll);

  const filtered = publications ? publications.filter((p: any) => {
    const matchType = typeFilter === "All" || p.type === typeFilter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.scholar.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  }) : [];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b"
          style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <FileText size={18} style={{ color: "#D4AF37" }} />
            <div>
              <h2 className="font-outfit font-bold text-sm" style={{ color: "#D4AF37", letterSpacing: "0.08em" }}>
                KNOWLEDGE REPOSITORY & PUBLICATIONS
              </h2>
              <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)" }}>
                Fatwas, Religious Guidance, Policies & Scholarly Archives
              </p>
            </div>
          </div>
          <span className="badge badge-gold">{publications ? publications.length : 0} Publications</span>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Search + Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={14} style={{ color: "rgba(232,237,233,0.3)", position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
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
                <button key={t} onClick={() => setTypeFilter(t)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                  style={{
                    background: typeFilter === t ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.04)",
                    border: typeFilter === t ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(255,255,255,0.07)",
                    color: typeFilter === t ? "#D4AF37" : "rgba(232,237,233,0.5)",
                  }}>{t === "All" ? "All Types" : t}</button>
              ))}
            </div>
          </div>

          {/* Publications Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filtered.map(pub => {
              const config = TYPE_CONFIG[pub.type] || TYPE_CONFIG.guidance;
              return (
                <div key={pub.id} className="glass-card p-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl flex-shrink-0"
                      style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
                      <span style={{ color: "#D4AF37" }}>{config.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`badge ${config.badge}`} style={{ fontSize: "0.62rem" }}>
                          {config.label}
                        </span>
                        <span className="badge badge-blue" style={{ fontSize: "0.6rem" }}>{pub.language}</span>
                      </div>
                      <h3 className="font-outfit font-bold text-sm leading-snug" style={{ color: "#E8EDE9" }}>
                        {pub.title}
                      </h3>
                      <p className="font-arabic text-xs mt-1" style={{ color: "rgba(212,175,55,0.6)", direction: "rtl", textAlign: "right" }}>
                        {pub.titleArabic}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <p className="text-xs font-semibold" style={{ color: "rgba(232,237,233,0.5)" }}>{pub.scholar}</p>
                          <p className="text-xs" style={{ color: "rgba(232,237,233,0.3)" }}>{pub.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-outfit font-bold text-sm" style={{ color: "#D4AF37" }}>
                              {pub.downloads.toLocaleString()}
                            </p>
                            <p className="text-xs" style={{ color: "rgba(232,237,233,0.3)" }}>downloads</p>
                          </div>
                          <button className="p-2 rounded-lg transition-all"
                            style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
                            <Download size={14} style={{ color: "#D4AF37" }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Search CTA */}
          <div className="glass-gold p-5 mt-6 flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: "rgba(212,175,55,0.12)" }}>
              <BookOpen size={22} style={{ color: "#D4AF37" }} />
            </div>
            <div>
              <p className="font-outfit font-bold text-sm" style={{ color: "#D4AF37" }}>
                AI-Assisted Knowledge Search (Phase 3)
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(232,237,233,0.5)" }}>
                Semantic search across all fatwas, khutbahs, and publications in Somali, Arabic, and English.
                Retrieval only — no autonomous religious content generation.
              </p>
            </div>
            <span className="badge badge-gold flex-shrink-0">Coming Phase 3</span>
          </div>
        </div>
      </main>
    </div>
  );
}
