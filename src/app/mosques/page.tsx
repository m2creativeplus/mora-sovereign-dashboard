"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { REGIONS } from "@/lib/data";
import { Building2, Search, MapPin, Users, Filter } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

// Reusable Components Sourced from M2 Design System
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { cn } from "@/lib/utils";

const STATUS_FILTERS = ["All", "Operational", "Renovation", "Needs Repair"];

interface Mosque {
  _id: string;
  name: string;
  region: string;
  district: string;
  capacity: number;
  waqf: boolean;
  status: string;
  imam: string;
}

export default function MosquesPage() {
  const [regionFilter, setRegionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const mosques = useQuery(api.mosques.getAll);
  const [selected, setSelected] = useState<Mosque | null>(null);

  const filtered = mosques ? mosques.filter((m: Mosque) => {
    const matchRegion = regionFilter === "All" || m.region === regionFilter;
    const matchStatus = statusFilter === "All" || m.status === statusFilter;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.imam.toLowerCase().includes(search.toLowerCase()) ||
      m.region.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchStatus && matchSearch;
  }) : [];

  const getStatusType = (s: string): 'active' | 'processing' | 'error' | 'offline' | 'idle' => {
    if (s === "Operational") return "active";
    if (s === "Renovation") return "processing";
    return "error";
  };

  const getStatusBadgeClass = (s: string) => {
    if (s === "Operational") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (s === "Renovation") return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    return "bg-red-500/10 text-red-400 border-red-500/20";
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b"
          style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <Building2 size={18} className="text-gold" />
            <div>
              <h2 className="font-outfit font-bold text-sm text-gold tracking-widest">
                NATIONAL MOSQUE REGISTRY
              </h2>
              <p className="text-xs text-foreground/40">
                2,847 mosques across all regions of Somaliland
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-semibold">
              2,847 Registered
            </Badge>
            <Button
              size="sm"
              variant="outline"
              className="bg-gold/5 border-gold/20 text-gold hover:bg-gold/10 hover:border-gold/30 font-semibold"
            >
              + Register Mosque
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Regional Stats Row */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {REGIONS.slice(0, 4).map(r => (
              <Card
                key={r.name}
                className="glass-card border-white/5 bg-white/3 p-4 cursor-pointer hover:border-white/10 transition-all duration-300"
                onClick={() => setRegionFilter(r.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <MapPin size={16} className="text-gold" />
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-bold">
                    {r.waqfAssets} waqf
                  </Badge>
                </div>
                <p className="font-outfit font-bold text-2xl text-foreground">{r.mosques}</p>
                <p className="text-sm font-semibold text-gold">{r.name}</p>
                <p className="text-xs text-foreground/40">{r.scholars} scholars</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Mosque List */}
            <div className="col-span-2 space-y-4">
              {/* Search + Filters */}
              <Card className="glass-card border-white/5 bg-white/3 p-4 space-y-3">
                {/* Search */}
                <div className="relative">
                  <Search size={14} className="text-foreground/30 absolute left-3 top-1/2 -translate-y-1/2" />
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

                {/* Filters */}
                <div className="flex items-center gap-2 pt-1 border-t border-white/4">
                  <Filter size={12} className="text-foreground/40" />
                  <span className="text-xs text-foreground/40 mr-2 font-semibold">Filters:</span>
                  
                  {STATUS_FILTERS.map(s => (
                    <Button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      size="sm"
                      variant="outline"
                      className={cn(
                        "px-2.5 py-1 h-auto text-[10px] font-semibold transition-all rounded-lg",
                        statusFilter === s
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                          : "bg-white/3 border-white/6 text-foreground/40 hover:bg-white/6"
                      )}
                    >
                      {s}
                    </Button>
                  ))}
                  <span className="ml-auto text-xs text-foreground/30">
                    {filtered.length} shown
                  </span>
                </div>
              </Card>

              {/* Mosque Cards */}
              <div className="space-y-2">
                {filtered.map(mosque => (
                  <Card
                    key={mosque._id}
                    className={cn(
                      "glass-card border-white/5 bg-white/3 p-4 cursor-pointer hover:border-white/10 transition-all duration-300",
                      selected?._id === mosque._id ? "border-gold/30" : ""
                    )}
                    onClick={() => setSelected(selected?._id === mosque._id ? null : mosque)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <Building2 size={18} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-outfit font-bold text-sm text-foreground">{mosque.name}</h3>
                          {mosque.waqf && (
                            <Badge className="bg-gold/10 text-gold border-gold/20 text-[9px] font-bold">
                              WAQF
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs text-foreground/45">
                            <MapPin size={9} /> {mosque.region}, {mosque.district}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-foreground/45">
                            <Users size={9} /> Cap: {mosque.capacity.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs mt-0.5 text-foreground/40">
                          Imam: {mosque.imam}
                        </p>
                      </div>

                      <div className="flex-shrink-0 flex items-center gap-3">
                        <StatusIndicator status={getStatusType(mosque.status)} />
                        <Badge className={cn("text-[9px] font-bold capitalize", getStatusBadgeClass(mosque.status))}>
                          {mosque.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Expanded Detail */}
                    {selected?._id === mosque._id && (
                      <div className="mt-4 pt-4 border-t border-white/6">
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
                              <p className="text-[10px] font-bold text-gold/60">{f.label}</p>
                              <p className="text-xs text-foreground mt-0.5">{f.value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="bg-gold/8 text-gold border border-gold/15 hover:bg-gold/15 text-xs font-semibold">
                            Edit Record
                          </Button>
                          <Button size="sm" className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25 text-xs font-semibold">
                            View on Map
                          </Button>
                          <Button size="sm" variant="outline" className="bg-white/4 text-foreground/50 border border-white/8 hover:bg-white/8 text-xs font-semibold">
                            Maintenance Log
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-4">
              {/* Status Summary */}
              <Card className="glass-card border-white/5 bg-white/3 p-5">
                <h3 className="section-title mb-4 font-outfit font-bold text-sm text-foreground">
                  Status Summary
                </h3>
                {[
                  { label: "Operational", count: 2601, pct: 91, color: "bg-emerald-500", badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                  { label: "Under Renovation", count: 183, pct: 6, color: "bg-blue-500", badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                  { label: "Needs Repair", count: 63, pct: 2, color: "bg-red-500", badgeClass: "bg-red-500/10 text-red-400 border-red-500/20" },
                ].map(s => (
                  <div key={s.label} className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-foreground/75">{s.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-outfit font-bold text-sm text-foreground/90">{s.count.toLocaleString()}</span>
                        <Badge className={`${s.badgeClass} text-[9px] font-bold`}>{s.pct}%</Badge>
                      </div>
                    </div>
                    <Progress value={s.pct} className="h-1.5 bg-white/5" />
                  </div>
                ))}
              </Card>

              {/* All Regions */}
              <Card className="glass-card border-white/5 bg-white/3 p-5">
                <h3 className="section-title mb-4 font-outfit font-bold text-sm text-foreground">
                  All Regions
                </h3>
                <div className="space-y-2">
                  {REGIONS.map(r => (
                    <div key={r.name}
                      className={cn(
                        "flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer transition-all border border-transparent",
                        regionFilter === r.name ? "bg-gold/8 border-gold/15" : "hover:bg-white/3"
                      )}
                      onClick={() => setRegionFilter(r.name)}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className={regionFilter === r.name ? "text-gold" : "text-foreground/30"} />
                        <span className={cn("text-sm", regionFilter === r.name ? "text-gold font-semibold" : "text-foreground/70")}>
                          {r.name}
                        </span>
                      </div>
                      <span className={cn("font-outfit font-bold text-sm", regionFilter === r.name ? "text-gold" : "text-foreground")}>
                        {r.mosques}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
