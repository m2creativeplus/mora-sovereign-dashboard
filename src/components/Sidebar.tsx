"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Moon,
  Volume2,
  BookOpen,
  Building2,
  MapPin,
  Plane,
  GraduationCap,
  Settings,
  Shield,
  FileText,
} from "lucide-react";

interface NavItem {
  label: string;
  labelArabic: string;
  icon: React.ReactNode;
  href: string;
  section?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview",      labelArabic: "نظرة عامة",    icon: <LayoutDashboard size={17} />, href: "/",            section: "CORE" },
  { label: "Hijri Calendar",labelArabic: "التقويم الهجري", icon: <Moon size={17} />,           href: "/calendar",    section: "CORE" },
  { label: "Announcements", labelArabic: "الإعلانات",      icon: <Volume2 size={17} />,        href: "/announcements" },
  { label: "Publications",  labelArabic: "المنشورات",      icon: <FileText size={17} />,       href: "/publications" },
  { label: "Mosque Registry",labelArabic: "سجل المساجد",  icon: <Building2 size={17} />,      href: "/mosques",     section: "REGISTRY" },
  { label: "Waqf Assets",   labelArabic: "الأوقاف",       icon: <MapPin size={17} />,         href: "/waqf" },
  { label: "Hajj & Umrah",  labelArabic: "الحج والعمرة",  icon: <Plane size={17} />,          href: "/hajj" },
  { label: "Education",     labelArabic: "التعليم",        icon: <GraduationCap size={17} />,  href: "/education",   section: "SERVICES" },
  { label: "Knowledge Hub", labelArabic: "مركز المعرفة",   icon: <BookOpen size={17} />,       href: "/knowledge" },
];

export default function Sidebar() {
  const pathname = usePathname();
  let lastSection = "";

  return (
    <aside className="sidebar flex flex-col h-screen sticky top-0 flex-shrink-0" style={{ width: "var(--sidebar-width)" }}>
      {/* Logo */}
      <div className="p-5 border-b" style={{ borderColor: "rgba(26,92,42,0.2)" }}>
        <div className="flex items-center gap-3 mb-3">
          {/* MORA Emblem */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(26,92,42,0.25)", border: "1px solid rgba(26,92,42,0.4)" }}>
            <Moon size={18} style={{ color: "#D4AF37" }} />
          </div>
          <div>
            <h1 className="font-outfit font-bold text-sm leading-tight" style={{ color: "#E8EDE9" }}>
              MORA <span style={{ color: "#D4AF37" }}>SOVEREIGN</span>
            </h1>
            <p className="text-xs" style={{ color: "rgba(232,237,233,0.4)", fontFamily: "'Noto Naskh Arabic', serif" }}>
              وزارة الشؤون الدينية
            </p>
          </div>
        </div>
        <div className="text-center py-2 px-3 rounded-lg" style={{ background: "rgba(26,92,42,0.15)", border: "1px solid rgba(26,92,42,0.2)" }}>
          <p className="text-xs font-semibold" style={{ color: "#4ade80", letterSpacing: "0.08em" }}>
            🟢 SYSTEM OPERATIONAL
          </p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(232,237,233,0.4)" }}>
            Republic of Somaliland
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const showSection = item.section && item.section !== lastSection;
          if (item.section) lastSection = item.section;
          const isActive = pathname === item.href;

          return (
            <div key={item.href}>
              {showSection && (
                <p className="nav-section-label" style={{ marginTop: "12px", marginBottom: "4px" }}>
                  {item.section}
                </p>
              )}
              <Link href={item.href} className={`nav-item ${isActive ? "active" : ""}`}>
                <span style={{ color: isActive ? "#D4AF37" : "rgba(232,237,233,0.4)" }}>
                  {item.icon}
                </span>
                <div className="flex-1">
                  <span className="block" style={{ fontSize: "0.83rem" }}>{item.label}</span>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#D4AF37", flexShrink: 0 }} />
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: "rgba(26,92,42,0.2)" }}>
        <Link href="/settings" className="nav-item">
          <Settings size={16} style={{ color: "rgba(232,237,233,0.3)" }} />
          <span style={{ fontSize: "0.8rem", color: "rgba(232,237,233,0.4)" }}>Settings</span>
        </Link>
        <div className="mt-3 px-2">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={12} style={{ color: "#D4AF37" }} />
            <span style={{ fontSize: "0.65rem", color: "rgba(212,175,55,0.6)", letterSpacing: "0.06em", fontWeight: 600 }}>
              M2 CREATIVE & CONSULTING
            </span>
          </div>
          <p style={{ fontSize: "0.6rem", color: "rgba(232,237,233,0.2)", lineHeight: 1.5 }}>
            Sovereign Infrastructure Platform<br />
            Built for the Republic of Somaliland
          </p>
        </div>
      </div>
    </aside>
  );
}
