"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLMotionProps, motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex gap-2 items-center justify-center whitespace-nowrap rounded text-sm font-medium shadow-sm transition-colors focus:ring-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        black: "bg-black text-white",
        white: "bg-white text-black",
        destructive:
          "bg-destructive/20 text-destructive hover:bg-destructive/30",
        warning: "bg-warning/20 text-warning hover:bg-warning/30",
        outline:
          "border border-input bg-transparent text-black hover:text-background-foreground",
        ghost: "backdrop-blur-md bg-black/5 hover:bg-black/10",
        link: "text-black text-primary underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "primary",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps extends ButtonVariantProps {
  hoverAnimation?: boolean;
  tapAnimation?: boolean;
}

type MotionButtonProps = Omit<HTMLMotionProps<"button">, keyof ButtonProps>;

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & MotionButtonProps
>(
  (
    {
      className,
      variant,
      size,
      hoverAnimation = true,
      tapAnimation = true,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.button
        className={cn(buttonVariants({ size, variant, className }))}
        ref={ref}
        whileTap={tapAnimation ? { scale: 0.95 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
