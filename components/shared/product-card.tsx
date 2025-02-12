"use client";

import * as React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Icons } from "../ui/icons";
import { H4, Small } from "./typography";

interface ProductOption {
  label: string;
  value: string;
}

interface ProductCardProps {
  name: string;
  price: number;
  currency?: string;
  image: string;
  inStock?: boolean;
  productTypes: ProductOption[];
  sizes: ProductOption[];
  packageTypes: ProductOption[];
}

export function ProductCard({
  name,
  price,
  currency = "QAR",
  image,
  inStock = true,
  productTypes,
  sizes,
  packageTypes,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState(
    productTypes[0]?.value,
  );
  const [selectedSize, setSelectedSize] = React.useState(sizes[0]?.value);
  const [selectedPackage, setSelectedPackage] = React.useState(
    packageTypes[0]?.value,
  );

  return (
    <div className="relative rounded bg-white p-3 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12)]">
      {/* Out of Stock Label */}

      {/* Product Image */}
      <div className="relative mb-3 aspect-video w-full rounded-sm bg-gray-50 p-4">
        {!inStock && (
          <div className="absolute start-3 top-3 z-10 rounded-sm bg-red-50 px-2 py-0.5">
            <span className="text-xs text-red-500">Out of stock</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute right-4 top-4 z-10"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Icons.Heart
            size={20}
            className={cn(
              "transition-colors",
              isFavorite ? "fill-primary text-primary" : "text-gray-300",
            )}
          />
        </button>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          priority
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <H4>{name}</H4>
            {/* <p className="text-xs text-gray-500">{quantity}</p> */}
          </div>
          <p className="whitespace-nowrap text-xl font-semibold text-primary">
            {price} {currency}
          </p>
        </div>

        {/* Product Type */}
        <div className="space-y-1.5">
          <Small className="text-neutral-700">Product Type :</Small>
          <div className="flex flex-wrap gap-1.5">
            {productTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={cn(
                  "rounded-sm border px-3 py-1 text-xs transition-colors",
                  selectedType === type.value
                    ? "border-solid border-neutral-600 bg-neutral-50"
                    : "border-dashed border-neutral-200 bg-transparent hover:bg-neutral-200",
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="space-y-1.5">
          <Small className="text-neutral-700">Size :</Small>
          <div className="flex flex-wrap gap-1.5">
            {sizes.map((size) => (
              <button
                key={size.value}
                onClick={() => setSelectedSize(size.value)}
                className={cn(
                  "rounded-sm border px-3 py-1 text-xs transition-colors",
                  selectedSize === size.value
                    ? "border-solid border-neutral-600 bg-neutral-50"
                    : "border-dashed border-neutral-200 bg-transparent hover:bg-neutral-200",
                )}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Package Type */}
        <div className="space-y-1.5">
          <Small className="text-neutral-700">Package Type :</Small>
          <div className="flex flex-wrap gap-1.5">
            {packageTypes.map((pkg) => (
              <button
                key={pkg.value}
                onClick={() => setSelectedPackage(pkg.value)}
                className={cn(
                  "rounded-sm border px-3 py-1 text-xs transition-colors",
                  selectedPackage === pkg.value
                    ? "border-solid border-neutral-600 bg-neutral-50"
                    : "border-dashed border-neutral-200 bg-transparent hover:bg-neutral-200",
                )}
              >
                {pkg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="mt-2 h-10 w-full bg-primary text-sm hover:bg-primary/90"
          disabled={!inStock}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
