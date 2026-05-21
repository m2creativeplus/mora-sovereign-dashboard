"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import SomalilandFlag from "@/components/SomalilandFlag";
import { PulsingAtoms } from "@/components/ui/PulsingAtoms";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Typography } from "@/components/ui/Typography";
import { 
  GraduationCap, Search, Award, MapPin, 
  BookOpen, ShieldCheck, FileCheck, 
  CheckCircle2, UserCheck2
} from "lucide-react";

// Robust dataset for Madrasas in the Republic of Somaliland
const MADRASA_DATA = [
  { id: "MDR-102", name: "Al-Najah Primary & Secondary Islamic School", district: "Hargeisa", region: "Maroodi-Jeex", students: 450, curriculumStatus: 100, principal: "Sheikh Yusuf Omar", type: "Integrated Madrasa" },
  { id: "MDR-309", name: "Burao Quran Memorization Institute", district: "Burao", region: "Togdheer", students: 310, curriculumStatus: 85, principal: "Moalim Ahmed Dahir", type: "Traditional Quranic" },
  { id: "MDR-215", name: "Darul Uloom School of Hadeeth & Fiqh", district: "Berbera", region: "Saaxil", students: 180, curriculumStatus: 95, principal: "Sheikh Hamza Gelle", type: "Specialized Seminary" },
  { id: "MDR-502", name: "Erigavo Community Quranic School", district: "Erigavo", region: "Sanaag", students: 150, curriculumStatus: 80, principal: "Moalim Ismail Duale", type: "Traditional Quranic" },
  { id: "MDR-411", name: "Las Anod Quranic Academy", district: "Las Anod", region: "Sool", students: 220, curriculumStatus: 90, principal: "Sheikh Said Warsame", type: "Integrated Madrasa" },
  { id: "MDR-088", name: "Gabiley Islamic Institute", district: "Gabiley", region: "Maroodi-Jeex", students: 190, curriculumStatus: 92, principal: "Sheikh Abdirahman Yusuf", type: "Traditional Quranic" }
];

// National Curriculum Standards Core Modules
const CURRICULUM_MODULES = [
  { name: "Quranic Recitation & Tajweed", standard: "SL-MORA-QUR-1.0", progress: 95, level: "Primary & Secondary" },
  { name: "Prophetic Traditions (Hadith)", standard: "SL-MORA-HAD-2.0", progress: 88, level: "Secondary Level" },
  { name: "Islamic Jurisprudence (Fiqh)", standard: "SL-MORA-FIQ-1.5", progress: 82, level: "Integrated Madrasa" },
  { name: "Arabic Language & Grammar", standard: "SL-MORA-ARB-3.1", progress: 90, level: "All Levels" }
];

// Certified Scholars & Moalims Registry
const TEACHERS_DATA = [
  { id: "MORA-EDU-082", name: "Moalim Abdirahman Ali", district: "Hargeisa", status: "Certified", category: "Quran Tajweed", expiry: "1448H" },
  { id: "MORA-EDU-115", name: "Moalim Fadumo Yusuf", district: "Burao", status: "Certified", category: "Islamic Studies", expiry: "1447H" },
  { id: "MORA-EDU-094", name: "Moalim Hassan Guleid", district: "Berbera", status: "Renewal Pending", category: "Hadith Science", expiry: "1446H" },
  { id: "MORA-EDU-201", name: "Moalim Zeinab Farah", district: "Gabiley", status: "Certified", category: "Quran Memorization", expiry: "1448H" }
];

export default function EducationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  
  // Interactive Teacher Certification Simulator States
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherCategory, setNewTeacherCategory] = useState("Quran Memorization");
  const [newTeacherDistrict, setNewTeacherDistrict] = useState("Hargeisa");
  const [teachersList, setTeachersList] = useState(TEACHERS_DATA);
  const [notification, setNotification] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredMadrasas = useMemo(() => {
    return MADRASA_DATA.filter(madrasa => {
      const matchesSearch = madrasa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            madrasa.principal.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            madrasa.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === "All" || madrasa.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  const totalStudents = useMemo(() => {
    return MADRASA_DATA.reduce((sum, item) => sum + item.students, 0);
  }, []);

  const handleCertifyTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `MORA-EDU-${Math.floor(100 + Math.random() * 900)}`;
      const newTeacher = {
        id: generatedId,
        name: newTeacherName,
        district: newTeacherDistrict,
        status: "Certified",
        category: newTeacherCategory,
        expiry: "1449H"
      };

      setTeachersList([newTeacher, ...teachersList]);
      setNotification(`Successfully certified ${newTeacherName} with ID: ${generatedId}!`);
      setNewTeacherName("");
      setIsSubmitting(false);

      setTimeout(() => setNotification(""), 5000);
    }, 1200);
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
            <GraduationCap size={20} className="text-gold" />
            <div>
              <h2 className="font-outfit font-bold text-sm text-gold tracking-widest flex items-center gap-2">
                RELIGIOUS EDUCATION PORTAL
                <SomalilandFlag width={20} height={13} className="rounded-[1px] border border-white/5 inline-block" />
              </h2>
              <p className="text-xs text-foreground/40">
                Ministry of Religious Affairs & Endowments · Madrasa National Curricula & Scholars Registry
              </p>
            </div>
          </div>
          <div>
            <Badge className="bg-gold/10 text-gold border border-gold/20 text-xs font-semibold gap-1">
              <ShieldCheck size={12} /> SOVEREIGN CURRICULUM REGISTER
            </Badge>
          </div>
        </header>

        {/* Scrollable container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <Typography variant="label" className="text-gold">Total Madrasa Enrollment</Typography>
                <h3 className="font-outfit font-bold text-2xl text-white mt-1">
                  {totalStudents.toLocaleString()} Students
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Cataloged pilot database</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <Typography variant="label" className="text-emerald-400">Curriculum Compliance</Typography>
                <h3 className="font-outfit font-bold text-2xl text-emerald-400 mt-1">
                  91.2% Average
                </h3>
                <Progress value={91.2} className="h-1 mt-2 bg-white/5 animate-pulse" />
                <p className="text-[11px] text-zinc-500 mt-1">National Standards framework</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <Typography variant="label" className="text-gold">Certified Educators</Typography>
                <h3 className="font-outfit font-bold text-2xl text-white mt-1">
                  {teachersList.length} Moalims
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Active biometric credentials</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <Typography variant="label" className="text-amber-500">Traditional Quranic</Typography>
                <h3 className="font-outfit font-bold text-2xl text-amber-500 mt-1">
                  {MADRASA_DATA.filter(m => m.type === "Traditional Quranic").length} Centers
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Primary oral transmission focus</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">

            {/* Main Madrasas Directory Panel */}
            <Card className="col-span-2 glass-card border-white/5 bg-white/3 p-5">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
                <h3 className="font-outfit font-bold text-sm text-foreground flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-gold" /> Madrasas & Islamic Schools Directory
                </h3>
                <div className="flex items-center gap-2">
                  <div className="relative w-40 sm:w-48">
                    <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-zinc-500" />
                    <input 
                      type="text" 
                      placeholder="Search school name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-zinc-950/80 border border-white/10 text-white focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="bg-zinc-950 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Regions</option>
                    <option value="Maroodi-Jeex">Maroodi-Jeex</option>
                    <option value="Togdheer">Togdheer</option>
                    <option value="Saaxil">Saaxil</option>
                    <option value="Sanaag">Sanaag</option>
                    <option value="Sool">Sool</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[9px] uppercase tracking-wider text-zinc-500">
                      <th className="py-2.5 px-3">School ID</th>
                      <th className="py-2.5 px-3">Name</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Students</th>
                      <th className="py-2.5 px-3">Region & District</th>
                      <th className="py-2.5 px-3">Principal</th>
                      <th className="py-2.5 px-3">Standard Alignment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredMadrasas.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-xs text-zinc-500">
                          No matching religious institutions found.
                        </td>
                      </tr>
                    ) : (
                      filteredMadrasas.map((madrasa) => (
                        <tr key={madrasa.id} className="text-xs hover:bg-white/2 transition-colors">
                          <td className="py-3 px-3 font-mono text-[10px] text-gold/80">{madrasa.id}</td>
                          <td className="py-3 px-3 font-semibold text-white">{madrasa.name}</td>
                          <td className="py-3 px-3">
                            <Badge className="bg-zinc-800 text-zinc-300 border-white/5 text-[9px]">
                              {madrasa.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-3 font-mono text-zinc-300">{madrasa.students}</td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                              <MapPin className="w-3 h-3 text-gold/50" />
                              <span>{madrasa.district}, {madrasa.region}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-zinc-400">{madrasa.principal}</td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-emerald-400">{madrasa.curriculumStatus}%</span>
                              <div className="w-12 bg-white/5 rounded-full h-1 overflow-hidden">
                                <div 
                                  className="bg-emerald-500 h-1 rounded-full" 
                                  style={{ width: `${madrasa.curriculumStatus}%` }} 
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* National Curriculum Progress Tracker */}
            <Card className="glass-card border-white/5 bg-white/3 p-5 space-y-4">
              <h3 className="font-outfit font-bold text-sm text-foreground flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-gold" /> National Core Curricula Standards
              </h3>
              <div className="space-y-4">
                {CURRICULUM_MODULES.map((module) => (
                  <div key={module.standard} className="p-3 bg-white/2 border border-white/5 rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">{module.name}</p>
                        <span className="text-[9px] text-zinc-500 block mt-0.5">{module.standard}</span>
                      </div>
                      <Badge className="bg-gold/10 text-gold border border-gold/10 text-[9px]">
                        {module.level}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-zinc-500">Active deployment progress</span>
                        <span className="text-emerald-400 font-bold">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-1 bg-white/5" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          <div className="grid grid-cols-3 gap-6">

            {/* Certified Scholars Table */}
            <Card className="col-span-2 glass-card border-white/5 bg-white/3 p-5">
              <h3 className="font-outfit font-bold text-sm text-foreground flex items-center gap-1.5 mb-4">
                <Award className="w-4 h-4 text-gold" /> Licensed Islamic Scholars & Teachers Registry (Moalims)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[9px] uppercase tracking-wider text-zinc-500">
                      <th className="py-2 px-3">Educator ID</th>
                      <th className="py-2 px-3">Moalim Name</th>
                      <th className="py-2 px-3">Domain Specialization</th>
                      <th className="py-2 px-3">Assigned District</th>
                      <th className="py-2 px-3">Sovereign Licensing Status</th>
                      <th className="py-2 px-3">Accreditation Expiry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {teachersList.map((teacher) => (
                      <tr key={teacher.id} className="text-xs hover:bg-white/2 transition-colors">
                        <td className="py-3 px-3 font-mono text-[10px] text-gold/80">{teacher.id}</td>
                        <td className="py-3 px-3 font-semibold text-white">{teacher.name}</td>
                        <td className="py-3 px-3 text-zinc-300 font-medium">{teacher.category}</td>
                        <td className="py-3 px-3">{teacher.district}</td>
                        <td className="py-3 px-3">
                          <Badge className={
                            teacher.status === "Certified"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 text-[9px]"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/10 text-[9px] animate-pulse"
                          }>
                            {teacher.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 font-mono text-zinc-400 text-[10px]">{teacher.expiry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Certify Teacher Simulator Form */}
            <Card className="glass-card border-white/5 bg-white/3 p-5">
              <h3 className="font-outfit font-bold text-sm text-foreground flex items-center gap-1.5 mb-3">
                <UserCheck2 className="w-4 h-4 text-gold" /> Certify New Moalim Simulator
              </h3>
              <form onSubmit={handleCertifyTeacher} className="space-y-3.5">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Scholar Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sheikh Abdirahman Omar"
                    value={newTeacherName}
                    onChange={(e) => setNewTeacherName(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-gold"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Domain Specialty</label>
                    <select
                      value={newTeacherCategory}
                      onChange={(e) => setNewTeacherCategory(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="Quran Memorization">Quran Mem.</option>
                      <option value="Hadith Science">Hadith Sci.</option>
                      <option value="Quran Tajweed">Quran Tajweed</option>
                      <option value="Islamic Studies">Islamic Stud.</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">District</label>
                    <select
                      value={newTeacherDistrict}
                      onChange={(e) => setNewTeacherDistrict(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="Hargeisa">Hargeisa</option>
                      <option value="Burao">Burao</option>
                      <option value="Berbera">Berbera</option>
                      <option value="Erigavo">Erigavo</option>
                      <option value="Las Anod">Las Anod</option>
                      <option value="Gabiley">Gabiley</option>
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !newTeacherName.trim()}
                  className="w-full bg-gold hover:bg-gold/90 text-black text-xs font-bold py-2 rounded flex items-center justify-center gap-1.5 mt-2"
                >
                  {isSubmitting ? (
                    <>Issuing Certificate...</>
                  ) : (
                    <>
                      <Award className="w-3.5 h-3.5" /> Issue Sovereign License
                    </>
                  )}
                </Button>

                {notification && (
                  <div className="flex items-center gap-2 p-2 bg-emerald-500/10 border border-emerald-500/25 rounded text-emerald-400 text-[10px] font-bold leading-normal">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    {notification}
                  </div>
                )}
              </form>
            </Card>

          </div>

        </div>
      </main>
    </div>
  );
}
