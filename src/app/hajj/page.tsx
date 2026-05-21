"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import SomalilandFlag from "@/components/SomalilandFlag";
import { PulsingAtoms } from "@/components/ui/PulsingAtoms";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  PlaneTakeoff, ShieldCheck, Search, Send, UserCheck, 
  CheckCircle, Building, SendToBack
} from "lucide-react";

// Mock Pilgrims registry data matching Republic of Somaliland regions
const PILGRIMS_DATA = [
  { id: "PLG-4819", name: "Mustafe Abdi Warsame", passport: "SL-0094812", region: "Maroodi-Jeex", vaccineStatus: "Vaccinated", hajjGroup: "Tawakal Travel", status: "Approved" },
  { id: "PLG-3091", name: "Nimco Omar Gelle", passport: "SL-0081290", region: "Togdheer", vaccineStatus: "Vaccinated", hajjGroup: "Daalo Travel", status: "Approved" },
  { id: "PLG-2481", name: "Mohamed Ali Kahin", passport: "SL-0071295", region: "Saaxil", vaccineStatus: "Pending Yellow Fever", hajjGroup: "Tawakal Travel", status: "Review" },
  { id: "PLG-9021", name: "Fardowsa Yusuf Eid", passport: "SL-0099812", region: "Awdal", vaccineStatus: "Vaccinated", hajjGroup: "Kaamil Hajj Agency", status: "Approved" },
  { id: "PLG-5819", name: "Ahmed Jama Egal", passport: "SL-0051280", region: "Sool", vaccineStatus: "Pending COVID Booster", hajjGroup: "Somali Express Travel", status: "Review" },
  { id: "PLG-1284", name: "Khadra Farah Elmi", passport: "SL-0083921", region: "Sanaag", vaccineStatus: "Vaccinated", hajjGroup: "Kaamil Hajj Agency", status: "Approved" }
];

// Licensed Hajj travel agencies in Somaliland
const AGENCIES = [
  { name: "Tawakal Travel & Hajj", licenses: "SL-MORA-01", quota: 2500, approved: 2310, status: "Active" },
  { name: "Daalo Travel & Tours", licenses: "SL-MORA-02", quota: 2000, approved: 1980, status: "Active" },
  { name: "Kaamil Hajj & Umrah Agency", licenses: "SL-MORA-03", quota: 1800, approved: 1620, status: "Active" },
  { name: "Sahan Hajj Agency", licenses: "SL-MORA-04", quota: 1500, approved: 1440, status: "Active" }
];

export default function HajjPage() {
  const [search, setSearch] = useState("");
  const [smsTarget, setSmsTarget] = useState("All Approved Pilgrims");
  const [smsMessage, setSmsMessage] = useState("Official MORA Alert: Please ensure you have received your final Meningitis vaccine dose by 15 Dhu al-Qi'dah at Hargeisa General Hospital.");
  const [smsSent, setSmsSent] = useState(false);
  const [sendingSms, setSendingSms] = useState(false);

  const filteredPilgrims = useMemo(() => {
    return PILGRIMS_DATA.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.passport.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsMessage) return;
    setSendingSms(true);
    setTimeout(() => {
      setSendingSms(false);
      setSmsSent(true);
      setTimeout(() => setSmsSent(false), 5000);
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-geometric relative" style={{ background: "var(--background)" }}>
      {/* Background ambient glows */}
      <PulsingAtoms />

      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden z-10">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b"
          style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <PlaneTakeoff size={20} className="text-gold" />
            <div>
              <h2 className="font-outfit font-bold text-sm text-gold tracking-widest flex items-center gap-2">
                HAJJ & UMRAH OPERATIONS
                <SomalilandFlag width={20} height={13} className="rounded-[1px] border border-white/5 inline-block" />
              </h2>
              <p className="text-xs text-foreground/40">
                Ministry of Religious Affairs & Endowments · Hajj Logistics Register 1446H
              </p>
            </div>
          </div>
          <div>
            <Badge className="bg-gold/10 text-gold border border-gold/20 text-xs font-semibold gap-1">
              <ShieldCheck size={12} /> SECURE NATIONAL REGISTRATION
            </Badge>
          </div>
        </header>

        {/* main container content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Overview statistics */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <p className="text-xs font-bold text-gold uppercase tracking-wider">Total Quota Allocation</p>
                <h3 className="font-outfit font-bold text-2xl text-white mt-1">10,000 Pilgrims</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Sovereign Treaty Agreement</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-semibold">Approved Registrations</p>
                <h3 className="font-outfit font-bold text-2xl text-emerald-400 mt-1">7,850 Approved</h3>
                <Progress value={78.5} className="h-1 mt-2 bg-white/5" />
                <p className="text-[11px] text-zinc-500 mt-1">78.5% Quota Utilization</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <p className="text-xs font-bold text-amber-500 uppercase tracking-wider font-semibold">Pending Verification</p>
                <h3 className="font-outfit font-bold text-2xl text-amber-500 mt-1">1,420 Applications</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Document audit outstanding</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-semibold">Registered Agencies</p>
                <h3 className="font-outfit font-bold text-2xl text-white mt-1">4 Licensed Operators</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">MORA Regulatory Endorsed</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">
            
            {/* Pilgrim Registry List */}
            <Card className="col-span-2 glass-card border-white/5 bg-white/3 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-outfit font-bold text-sm text-foreground flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-gold" /> Registered Pilgrim Registry
                </h3>
                <div className="relative w-48 sm:w-60">
                  <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Search by name/passport..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-zinc-950/80 border border-white/10 text-white focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[9px] uppercase tracking-wider text-zinc-500">
                      <th className="py-2.5 px-3">Reg ID</th>
                      <th className="py-2.5 px-3">Pilgrim Name</th>
                      <th className="py-2.5 px-3">Passport No.</th>
                      <th className="py-2.5 px-3">Region</th>
                      <th className="py-2.5 px-3">Medical / Vaccine</th>
                      <th className="py-2.5 px-3">Travel Agency</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredPilgrims.map((pilgrim) => (
                      <tr key={pilgrim.id} className="text-xs hover:bg-white/2 transition-colors">
                        <td className="py-3 px-3 font-mono text-[10px] text-gold/80">{pilgrim.id}</td>
                        <td className="py-3 px-3 font-semibold text-white">{pilgrim.name}</td>
                        <td className="py-3 px-3 font-mono text-[10px] text-zinc-400">{pilgrim.passport}</td>
                        <td className="py-3 px-3">{pilgrim.region}</td>
                        <td className="py-3 px-3">
                          <Badge className={
                            pilgrim.vaccineStatus.includes("Vaccinated") 
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 text-[9px]"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/10 text-[9px]"
                          }>
                            {pilgrim.vaccineStatus}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 font-semibold text-zinc-300">{pilgrim.hajjGroup}</td>
                        <td className="py-3 px-3">
                          <span className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${pilgrim.status === "Approved" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
                            <span className="font-semibold">{pilgrim.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Travel Agency Operator Quotas */}
            <div className="space-y-4">
              <Card className="glass-card border-white/5 bg-white/3 p-5">
                <h3 className="font-outfit font-bold text-sm text-foreground flex items-center gap-1.5 mb-4">
                  <Building className="w-4 h-4 text-gold" /> Licensed Travel Agencies
                </h3>
                <div className="space-y-3.5">
                  {AGENCIES.map((agency) => (
                    <div key={agency.licenses} className="p-3 bg-white/2 border border-white/5 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-white truncate max-w-[150px]">{agency.name}</p>
                        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px]">
                          {agency.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-500">
                        <span>Quota utilization</span>
                        <span className="font-mono text-gold">{agency.approved} / {agency.quota}</span>
                      </div>
                      <Progress value={(agency.approved / agency.quota) * 100} className="h-1 bg-white/5" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* SMS Simulator Dispatch Console */}
              <Card className="glass-card border-white/5 bg-white/3 p-5">
                <h3 className="font-outfit font-bold text-sm text-foreground flex items-center gap-1.5 mb-3">
                  <SendToBack className="w-4 h-4 text-gold" /> SMS Alert Broadcast Simulator
                </h3>
                <form onSubmit={handleSendSms} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Target Group</label>
                    <select
                      value={smsTarget}
                      onChange={(e) => setSmsTarget(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-gold"
                    >
                      <option value="All Approved Pilgrims">All Approved Pilgrims ({PILGRIMS_DATA.filter(p => p.status === "Approved").length})</option>
                      <option value="Review Pending Cases">Review Pending Cases ({PILGRIMS_DATA.filter(p => p.status === "Review").length})</option>
                      <option value="Specific Travel Agency">Tawakal Travel Agency Group</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">SMS message content</label>
                    <textarea
                      rows={3}
                      value={smsMessage}
                      onChange={(e) => setSmsMessage(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-gold resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={sendingSms || !smsMessage}
                    className="w-full bg-gold hover:bg-gold/90 text-black text-xs font-bold py-2 rounded flex items-center justify-center gap-1.5"
                  >
                    {sendingSms ? (
                      <>Processing Broadcast...</>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" /> Dispatch SMS Alerts
                      </>
                    )}
                  </Button>
                  {smsSent && (
                    <div className="flex items-center gap-2 p-2 bg-emerald-500/10 border border-emerald-500/25 rounded text-emerald-400 text-[10px] font-bold leading-normal">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      SMS alerts successfully pushed to mobile gateway!
                    </div>
                  )}
                </form>
              </Card>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
