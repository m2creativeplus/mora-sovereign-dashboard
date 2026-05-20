import * as React from "react";
import { cn } from "@/lib/utils";
// M2 Engine Injection - Sourced from local compilation root
import { resolveTheme, generateCssVariables } from "@/lib/design-system/token-resolver";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: string; // M2 Engine: Theme Override Prop
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, theme, style, ...props }, ref) => {
    
    // M2 Engine Logic: Resolve tokens dynamically at runtime if prop is passed
    let engineStyle = {};
    if (theme) {
       const localTokens = resolveTheme(theme);
       engineStyle = generateCssVariables(localTokens);
    }

    return (
      <div 
        ref={ref} 
        className={cn("rounded-lg border bg-[var(--theme-color-background,#ffffff)] text-[var(--theme-color-text,#09090B)] shadow-sm", className)} 
        style={{ ...engineStyle, ...style }}
        {...props} 
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight text-[var(--theme-color-primary,inherit)]", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground opacity-80", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
