"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { REGIONS } from "@/lib/data";
import { Building2, Search, MapPin, Users, CheckCircle, AlertTriangle, Wrench, Filter } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const REGION_FILTERS = ["All", ...REGIONS.map(r => r.name)];
const STATUS_FILTERS = ["All", "Operational", "Renovation", "Needs Repair"];

export default function MosquesPage() {
  const [regionFilter, setRegionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const mosques = useQuery(api.mosques.getAll);
  const [selected, setSelected] = useState<any | null>(null);

  const filtered = mosques ? mosques.filter((m: any) => {
    const matchRegion = regionFilter === "All" || m.region === regionFilter;
    const matchStatus = statusFilter === "All" || m.status === statusFilter;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.imam.toLowerCase().includes(search.toLowerCase()) ||
      m.region.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchStatus && matchSearch;
  }) : [];

  const statusIcon = (s: string) => {
    if (s === "Operational") return <CheckCircle size={14} style={{ color: "#22c55e" }} />;
    if (s === "Renovation") return <Wrench size={14} style={{ color: "#60a5fa" }} />;
    return <AlertTriangle size={14} style={{ color: "#f87171" }} />;
  };

  const statusBadge = (s: string) => {
    if (s === "Operational") return "badge-green";
    if (s === "Renovation") return "badge-blue";
    return "badge-red";
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b"
          style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <Building2 size={18} style={{ color: "#D4AF37" }} />
            <div>
              <h2 className="font-outfit font-bold text-sm" style={{ color: "#D4AF37", letterSpacing: "0.08em" }}>
                NATIONAL MOSQUE REGISTRY
              </h2>
              <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)" }}>
                2,847 mosques across all regions of Somaliland
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge badge-mora-green">2,847 Registered</span>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>
              + Register Mosque
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Regional Stats Row */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {REGIONS.slice(0, 4).map(r => (
              <div key={r.name} className="stat-card cursor-pointer" onClick={() => setRegionFilter(r.name)}>
                <div className="flex items-center justify-between mb-2">
                  <MapPin size={16} style={{ color: "#D4AF37" }} />
                  <span className="badge badge-mora-green" style={{ fontSize: "0.6rem" }}>{r.waqfAssets} waqf</span>
                </div>
                <p className="font-outfit font-bold text-2xl" style={{ color: "#E8EDE9" }}>{r.mosques}</p>
                <p className="text-sm font-semibold" style={{ color: "#D4AF37" }}>{r.name}</p>
                <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)" }}>{r.scholars} scholars</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Mosque List */}
            <div className="col-span-2 space-y-4">
              {/* Search + Filters */}
              <div className="glass-card p-4 space-y-3">
                {/* Search */}
                <div className="relative">
                  <Search size={14} style={{ color: "rgba(232,237,233,0.3)", position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, imam, or region..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#E8EDE9",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Region filter */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter size={13} style={{ color: "rgba(232,237,233,0.4)" }} />
                  {REGION_FILTERS.map(r => (
                    <button key={r} onClick={() => setRegionFilter(r)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: regionFilter === r ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.03)",
                        border: regionFilter === r ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(255,255,255,0.06)",
                        color: regionFilter === r ? "#D4AF37" : "rgba(232,237,233,0.4)",
                      }}>{r}</button>
                  ))}
                </div>

                {/* Status filter */}
                <div className="flex items-center gap-2">
                  {STATUS_FILTERS.map(s => (
                    <button key={s} onClick={() => setStatusFilter(s)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: statusFilter === s ? "rgba(26,92,42,0.2)" : "rgba(255,255,255,0.03)",
                        border: statusFilter === s ? "1px solid rgba(26,92,42,0.3)" : "1px solid rgba(255,255,255,0.06)",
                        color: statusFilter === s ? "#4ade80" : "rgba(232,237,233,0.4)",
                      }}>{s}</button>
                  ))}
                  <span className="ml-auto text-xs" style={{ color: "rgba(232,237,233,0.3)" }}>
                    {filtered.length} shown
                  </span>
                </div>
              </div>

              {/* Mosque Cards */}
              <div className="space-y-2">
                {filtered.map(mosque => (
                  <div
                    key={mosque.id}
                    className="mosque-card cursor-pointer"
                    onClick={() => setSelected(selected?.id === mosque.id ? null : mosque)}
                    style={{ border: selected?.id === mosque.id ? "1px solid rgba(212,175,55,0.3)" : undefined }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(26,92,42,0.2)", border: "1px solid rgba(26,92,42,0.25)" }}>
                        <Building2 size={18} style={{ color: "#4ade80" }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-outfit font-bold text-sm" style={{ color: "#E8EDE9" }}>{mosque.name}</h3>
                          {mosque.waqf && <span className="badge badge-gold" style={{ fontSize: "0.58rem" }}>WAQF</span>}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(232,237,233,0.45)" }}>
                            <MapPin size={9} /> {mosque.region}, {mosque.district}
                          </span>
                          <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(232,237,233,0.45)" }}>
                            <Users size={9} /> Cap: {mosque.capacity.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(232,237,233,0.4)" }}>
                          Imam: {mosque.imam}
                        </p>
                      </div>

                      <div className="flex-shrink-0 flex items-center gap-2">
                        {statusIcon(mosque.status)}
                        <span className={`badge ${statusBadge(mosque.status)}`} style={{ fontSize: "0.6rem" }}>
                          {mosque.status}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Detail */}
                    {selected?.id === mosque.id && (
                      <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: "Region", value: mosque.region },
                            { label: "District", value: mosque.district },
                            { label: "Capacity", value: mosque.capacity.toLocaleString() },
                            { label: "Waqf Status", value: mosque.waqf ? "Yes — Documented" : "Not Waqf" },
                            { label: "Imam", value: mosque.imam },
                            { label: "Status", value: mosque.status },
                          ].map(f => (
                            <div key={f.label}>
                              <p className="text-xs font-semibold" style={{ color: "rgba(212,175,55,0.6)" }}>{f.label}</p>
                              <p className="text-sm" style={{ color: "#E8EDE9" }}>{f.value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                            style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>
                            Edit Record
                          </button>
                          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                            style={{ background: "rgba(26,92,42,0.15)", border: "1px solid rgba(26,92,42,0.25)", color: "#4ade80" }}>
                            View on Map
                          </button>
                          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(232,237,233,0.5)" }}>
                            Maintenance Log
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-4">
              {/* Status Summary */}
              <div className="glass-card p-5">
                <h3 className="section-title mb-4">Status Summary</h3>
                {[
                  { label: "Operational", count: 2601, pct: 91, color: "#22c55e", badge: "badge-green" },
                  { label: "Under Renovation", count: 183, pct: 6, color: "#60a5fa", badge: "badge-blue" },
                  { label: "Needs Repair", count: 63, pct: 2, color: "#f87171", badge: "badge-red" },
                ].map(s => (
                  <div key={s.label} className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm" style={{ color: "rgba(232,237,233,0.7)" }}>{s.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-outfit font-bold text-sm" style={{ color: s.color }}>{s.count.toLocaleString()}</span>
                        <span className={`badge ${s.badge}`} style={{ fontSize: "0.6rem" }}>{s.pct}%</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: "4px", transition: "width 0.5s ease" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* All Regions */}
              <div className="glass-card p-5">
                <h3 className="section-title mb-4">All Regions</h3>
                <div className="space-y-2">
                  {REGIONS.map(r => (
                    <div key={r.name}
                      className="flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer transition-all"
                      onClick={() => setRegionFilter(r.name)}
                      style={{
                        background: regionFilter === r.name ? "rgba(212,175,55,0.08)" : "transparent",
                        border: regionFilter === r.name ? "1px solid rgba(212,175,55,0.15)" : "1px solid transparent",
                      }}>
                      <div className="flex items-center gap-2">
                        <MapPin size={12} style={{ color: regionFilter === r.name ? "#D4AF37" : "rgba(232,237,233,0.3)" }} />
                        <span className="text-sm" style={{ color: regionFilter === r.name ? "#D4AF37" : "rgba(232,237,233,0.7)" }}>
                          {r.name}
                        </span>
                      </div>
                      <span className="font-outfit font-bold text-sm" style={{ color: regionFilter === r.name ? "#D4AF37" : "#E8EDE9" }}>
                        {r.mosques}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
