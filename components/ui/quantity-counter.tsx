"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Icons } from "./icons";

interface QuantityCounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export function QuantityCounter({
  initialValue = 2,
  min = 2,
  max = 100,
  onChange,
  className,
}: QuantityCounterProps) {
  const [value, setValue] = useState(initialValue || min);

  const increment = () => {
    if (value < max) {
      const newValue = value + 1;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const decrement = () => {
    if (value > min) {
      const newValue = value - 1;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div
      className={cn(
        "flex h-[46px] select-none items-center rounded bg-primary-50 px-3",
        className,
      )}
    >
      <Button
        size="icon"
        className="size-8 rounded bg-primary text-white hover:bg-primary/90"
        onClick={decrement}
        disabled={value <= min}
      >
        <Icons.Minus size={20} />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <div className="flex w-12 items-center justify-center font-medium">
        {value}
      </div>
      <Button
        size="icon"
        className="size-8 rounded bg-primary text-white hover:bg-primary/90"
        onClick={increment}
        disabled={value >= max}
      >
        <Icons.Plus size={20} />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}
