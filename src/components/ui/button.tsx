import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
// M2 Engine Injection - Sourced from local compilation root
import { resolveTheme, generateCssVariables } from "@/lib/design-system/token-resolver";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--theme-color-primary,#0f172a)] text-[var(--theme-color-background,#ffffff)] hover:opacity-90",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-[var(--theme-color-primary,#0f172a)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  theme?: string; // M2 Engine: Theme Override Prop
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, theme, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // M2 Engine Logic: Resolve tokens dynamically at runtime if prop is passed
    let engineStyle = {};
    if (theme) {
       const localTokens = resolveTheme(theme);
       engineStyle = generateCssVariables(localTokens);
    }
    
    return (
      <Comp 
        className={cn(buttonVariants({ variant, size, className }), theme ? `theme-${theme}` : "")} 
        style={{ ...engineStyle, ...style }}
        ref={ref} 
        {...props} 
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
