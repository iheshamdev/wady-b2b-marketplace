import React from "react";

import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const H1 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "scroll-m-20 text-[2.625rem] font-extrabold leading-tight tracking-tight",
        className,
      )}
      {...props}
    />
  ),
);
H1.displayName = "H1";

const H2 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "scroll-m-20 text-3xl font-bold leading-tight tracking-tight",
        className,
      )}
      {...props}
    />
  ),
);
H2.displayName = "H2";

const H3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "scroll-m-20 text-2xl font-semibold leading-tight tracking-tight",
        className,
      )}
      {...props}
    />
  ),
);
H3.displayName = "H3";

const H4 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn(
        "scroll-m-20 text-xl font-semibold leading-tight tracking-tight",
        className,
      )}
      {...props}
    />
  ),
);
H4.displayName = "H4";

const P = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-base font-medium leading-normal", className)}
      {...props}
    />
  ),
);
P.displayName = "P";

const Lead = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xl", className)} {...props} />
  ),
);
Lead.displayName = "Lead";

const Large = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  ),
);
Large.displayName = "Large";

const Small = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn("inline-block text-sm", className)}
      {...props}
    />
  ),
);
Small.displayName = "Small";

export { H1, H2, H3, H4, P, Large, Lead, Small };
