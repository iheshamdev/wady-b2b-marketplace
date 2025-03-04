import type React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function PhoneInput({
  className,
  type,
  ...props
}: PhoneInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center border-r px-3">
        <span className="text-sm text-muted-foreground">+974</span>
      </div>
      <Input type="tel" className={cn("pl-16", className)} {...props} />
    </div>
  );
}
