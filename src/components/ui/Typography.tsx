import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "small" | "tiny" | "caption" | "label" | "arabic";
  className?: string;
  gradient?: boolean;
}

export function Typography({
  children,
  variant = "body",
  className = "",
  gradient = false,
}: TypographyProps) {
  const baseClasses = gradient ? "text-gold-gradient inline-block" : "";
  
  switch (variant) {
    case "h1":
      // Large, bold, authoritarian (Avintiv Hero Style)
      return (
        <h1 className={cn("font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white", baseClasses, className)}>
          {children}
        </h1>
      );
    case "h2":
      // Italicized grace for sub-headings
      return (
        <h2 className={cn("font-outfit text-2xl sm:text-3xl font-semibold leading-[1.2] text-[#D4AF37]", baseClasses, className)}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={cn("font-outfit text-xl sm:text-2xl font-bold tracking-tight text-[#E8EDE9]", baseClasses, className)}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={cn("font-outfit text-lg font-bold tracking-wide text-foreground", baseClasses, className)}>
          {children}
        </h4>
      );
    case "label":
      // Accented uppercase labels
      return (
        <span className={cn("font-outfit text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]/75 block mb-1.5", className)}>
          {children}
        </span>
      );
    case "body":
      return (
        <p className={cn("font-inter text-sm leading-relaxed text-[#E8EDE9]/80", className)}>
          {children}
        </p>
      );
    case "small":
      return (
        <p className={cn("font-inter text-xs leading-normal text-[#E8EDE9]/65", className)}>
          {children}
        </p>
      );
    case "tiny":
      return (
        <p className={cn("font-outfit text-[10px] font-extrabold uppercase tracking-[3px] text-[#D4AF37]", className)}>
          {children}
        </p>
      );
    case "caption":
      return (
        <span className={cn("font-inter text-[11px] text-[#E8EDE9]/40", className)}>
          {children}
        </span>
      );
    case "arabic":
      return (
        <p className={cn("font-arabic text-base leading-relaxed text-right text-gold/90", className)} dir="rtl">
          {children}
        </p>
      );
    default:
      return <p className={cn("font-inter text-sm", className)}>{children}</p>;
  }
}
