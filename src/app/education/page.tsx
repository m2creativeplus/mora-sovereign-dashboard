"use client";

import Sidebar from "@/components/Sidebar";
import { GraduationCap, AlertCircle } from "lucide-react";

// Reusable Components Sourced from M2 Design System
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EducationPage() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b"
          style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <GraduationCap size={18} className="text-gold" />
            <div>
              <h2 className="font-outfit font-bold text-sm text-gold tracking-widest">
                RELIGIOUS EDUCATION
              </h2>
              <p className="text-xs text-foreground/40">
                Madrasa Directory and Curriculum Standards
              </p>
            </div>
          </div>
          <Badge className="bg-gold/10 text-gold border-gold/20 text-xs">Phase 3</Badge>
        </header>
        <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
          <Card className="glass-card border-white/5 bg-white/3 p-10 max-w-lg text-center">
            <GraduationCap size={48} className="text-gold mx-auto opacity-50" />
            <h3 className="font-outfit font-bold text-xl mt-6 text-foreground">Education Digitization</h3>
            <p className="text-sm mt-3 leading-relaxed text-foreground/60">
              This module will provide a national madrasa directory, teacher certification tracking, and a management system for the National Quran Recitation Competition.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/5 border border-gold/15">
              <AlertCircle size={14} className="text-gold" />
              <span className="text-sm font-bold text-gold">Scheduled for Phase 3 Deployment</span>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
