"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?: "single" | "multiple";
  collapsible?: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-1.5", className)} {...props}>
        {children}
      </div>
    );
  }
);
Accordion.displayName = "Accordion";

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

const AccordionContext = React.createContext<{
  openItems: string[];
  toggleItem: (value: string) => void;
} | null>(null);

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleItem = (_val: string) => {
      setIsOpen(prev => !prev);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "border border-white/5 rounded-xl bg-white/2 overflow-hidden transition-all duration-300",
          isOpen ? "border-gold/20 bg-gold/3" : "hover:border-white/10",
          className
        )}
        {...props}
      >
        <AccordionContext.Provider value={{ openItems: isOpen ? [value] : [], toggleItem }}>
          {children}
        </AccordionContext.Provider>
      </div>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    if (!context) throw new Error("AccordionTrigger must be used inside AccordionItem");

    const isOpen = context.openItems.length > 0;

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => context.toggleItem("item")}
        className={cn(
          "flex w-full items-center justify-between py-4 px-5 text-sm font-semibold transition-all text-left text-foreground/80 hover:text-white hover:underline focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300",
            isOpen && "rotate-180 text-gold"
          )}
        />
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    if (!context) throw new Error("AccordionContent must be used inside AccordionItem");

    const isOpen = context.openItems.length > 0;

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[1000px] border-t border-white/5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
        {...props}
      >
        <div className={cn("pb-4 pt-4 px-5 text-xs text-foreground/50 leading-relaxed", className)}>
          {children}
        </div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";
