"use client";

import React, { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import SomalilandFlag from "@/components/SomalilandFlag";
import { PulsingAtoms } from "@/components/ui/PulsingAtoms";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Landmark, Search, Plus, Filter, ShieldCheck, 
  ExternalLink 
} from "lucide-react";

// Robust static dataset for Somaliland Waqf Assets
const WAQF_ASSETS = [
  { id: "WQF-001", name: "Al-Azhar Waqf Commercial complex", type: "Commercial", region: "Maroodi-Jeex", district: "Hargeisa", value: 450000, yieldRate: 8.5, status: "Registered", date: "1443-05-12 AH" },
  { id: "WQF-002", name: "Burao Waqf Agricultural Orchard", type: "Agricultural", region: "Togdheer", district: "Burao", value: 180000, yieldRate: 6.2, status: "Leased", date: "1444-02-18 AH" },
  { id: "WQF-003", name: "Sheikh Ibrahim Islamic Library Building", type: "Educational", region: "Maroodi-Jeex", district: "Hargeisa", value: 310000, yieldRate: 0.0, status: "Registered", date: "1445-11-03 AH" },
  { id: "WQF-004", name: "Berbera Port Road Warehouse", type: "Commercial", region: "Saaxil", district: "Berbera", value: 650000, yieldRate: 9.8, status: "Registered", date: "1442-08-25 AH" },
  { id: "WQF-005", name: "Erigavo Community Quranic Center", type: "Educational", region: "Sanaag", district: "Erigavo", value: 95000, yieldRate: 0.0, status: "Operational", date: "1446-01-10 AH" },
  { id: "WQF-006", name: "Las Anod Waqf Apartments Block", type: "Residential", region: "Sool", district: "Las Anod", value: 240000, yieldRate: 7.4, status: "Disputed", date: "1444-09-30 AH" },
  { id: "WQF-007", name: "Gabiley Waqf Irrigation Plots", type: "Agricultural", region: "Maroodi-Jeex", district: "Gabiley", value: 140000, yieldRate: 5.8, status: "Leased", date: "1445-04-15 AH" }
];

export default function WaqfPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredAssets = useMemo(() => {
    return WAQF_ASSETS.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(search.toLowerCase()) || 
                            asset.district.toLowerCase().includes(search.toLowerCase()) ||
                            asset.id.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filterType === "All" || asset.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [search, filterType]);

  const totalValue = useMemo(() => {
    return WAQF_ASSETS.reduce((sum, asset) => sum + asset.value, 0);
  }, []);

  const totalYield = useMemo(() => {
    const incomeAssets = WAQF_ASSETS.filter(a => a.yieldRate > 0);
    const sumYield = incomeAssets.reduce((sum, asset) => sum + (asset.value * (asset.yieldRate / 100)), 0);
    return sumYield;
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-geometric relative" style={{ background: "var(--background)" }}>
      {/* Premium Motion Backdrop */}
      <PulsingAtoms />

      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden z-10">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b"
          style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <Landmark size={20} className="text-gold" />
            <div>
              <h2 className="font-outfit font-bold text-sm text-gold tracking-widest flex items-center gap-2">
                WAQF ASSET REGISTRY & ENDOWMENTS
                <SomalilandFlag width={20} height={13} className="rounded-[1px] border border-white/5 inline-block" />
              </h2>
              <p className="text-xs text-foreground/40">
                Sovereign Islamic Waqf Administration · Republic of Somaliland
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gold/10 text-gold border border-gold/20 text-xs font-semibold gap-1">
              <ShieldCheck size={12} /> SECURE CRYPTOGRAPHIC REGISTER
            </Badge>
          </div>
        </header>

        {/* Scrollable Layout */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Top KPI row */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <p className="text-xs font-bold text-gold uppercase tracking-wider">Total Endowed Value</p>
                <h3 className="font-outfit font-bold text-2xl text-white mt-1">
                  ${totalValue.toLocaleString()}
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">USD Valuation Authority</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Estimated Annual Yield</p>
                <h3 className="font-outfit font-bold text-2xl text-emerald-400 mt-1">
                  ${totalYield.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Average yield of {((totalYield / totalValue) * 100).toFixed(1)}%</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <p className="text-xs font-bold text-gold uppercase tracking-wider">Registered Estates</p>
                <h3 className="font-outfit font-bold text-2xl text-white mt-1">
                  {WAQF_ASSETS.length} Properties
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">6 regions fully cataloged</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <p className="text-xs font-bold text-amber-500 uppercase tracking-wider">Active Leases</p>
                <h3 className="font-outfit font-bold text-2xl text-amber-500 mt-1">
                  {WAQF_ASSETS.filter(a => a.status === "Leased").length} Assets
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Funding local masjid development</p>
              </CardContent>
            </Card>
          </div>

          {/* Search, Filter & Actions Grid */}
          <Card className="glass-card border-white/5 bg-white/3 p-5">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search assets by name or district..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-zinc-950/80 border border-white/10 text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-1.5 bg-zinc-950/80 border border-white/10 rounded-lg px-3 py-1 text-sm text-zinc-400">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Type:</span>
                  <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-transparent text-white focus:outline-none cursor-pointer border-none font-semibold text-xs py-1"
                  >
                    <option value="All">All Types</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Agricultural">Agricultural</option>
                    <option value="Educational">Educational</option>
                    <option value="Residential">Residential</option>
                  </select>
                </div>

                <Button className="ml-auto bg-gold hover:bg-gold/90 text-black font-semibold text-xs px-4 rounded-lg flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Register Asset
                </Button>
              </div>
            </div>

            {/* Registry Table */}
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-zinc-500">
                    <th className="py-3 px-4">Asset ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Estimated Value</th>
                    <th className="py-3 px-4">Yield Rate</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredAssets.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-sm text-zinc-500">
                        No Waqf assets found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAssets.map((asset) => (
                      <tr key={asset.id} className="hover:bg-white/2 transition-colors text-sm group">
                        <td className="py-3 px-4 font-mono text-xs text-gold/80">{asset.id}</td>
                        <td className="py-3 px-4 font-semibold text-white">{asset.name}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-zinc-800 text-zinc-300 border-white/5 text-[9px] font-bold">
                            {asset.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-xs text-zinc-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gold/60" />
                            <span>{asset.district}, {asset.region}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-zinc-300">
                          ${asset.value.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-xs font-semibold text-emerald-400">
                          {asset.yieldRate > 0 ? `${asset.yieldRate}%` : "—"}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={
                            asset.status === "Registered" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                            asset.status === "Leased" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                            asset.status === "Operational" ? "bg-gold/10 text-gold border border-gold/20" :
                            "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }>
                            {asset.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm" className="h-7 px-2 border-white/10 hover:border-gold/30 bg-transparent text-xs text-gold gap-1">
                            Details <ExternalLink className="w-3 h-3" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
          
        </div>
      </main>
    </div>
  );
}
