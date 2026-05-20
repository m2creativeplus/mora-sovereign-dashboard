"use client";

import Sidebar from "@/components/Sidebar";
import { GraduationCap, AlertCircle } from "lucide-react";

export default function EducationPage() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b"
          style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <GraduationCap size={18} style={{ color: "#D4AF37" }} />
            <div>
              <h2 className="font-outfit font-bold text-sm" style={{ color: "#D4AF37", letterSpacing: "0.08em" }}>
                RELIGIOUS EDUCATION
              </h2>
              <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)" }}>
                Madrasa Directory and Curriculum Standards
              </p>
            </div>
          </div>
          <span className="badge badge-gold">Phase 3</span>
        </header>
        <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
           <div className="glass-card p-10 max-w-lg text-center">
              <GraduationCap size={48} style={{ color: "#D4AF37", margin: "0 auto", opacity: 0.5 }} />
              <h3 className="font-outfit font-bold text-xl mt-6" style={{ color: "#E8EDE9" }}>Education Digitization</h3>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: "rgba(232,237,233,0.6)" }}>
                This module will provide a national madrasa directory, teacher certification tracking, and a management system for the National Quran Recitation Competition.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                 <AlertCircle size={14} style={{ color: "#D4AF37" }} />
                 <span className="text-sm font-bold" style={{ color: "#D4AF37" }}>Scheduled for Phase 3 Deployment</span>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
