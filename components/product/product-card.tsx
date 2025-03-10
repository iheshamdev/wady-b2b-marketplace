"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { H4, P, Small } from "../shared/typography";
import { Icons } from "../ui/icons";

export function ProductCard({ product }: { product: Product }) {
  const { id, nameEn, image } = product;
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <div className="relative rounded bg-white p-3 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12)]">
      <div className="relative mb-3 aspect-video w-full rounded-sm bg-gray-50 p-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute end-3 top-3 z-10 bg-white shadow-sm"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Icons.Heart
            size={20}
            className={cn(
              "transition-colors",
              isFavorite ? "fill-primary text-primary" : "text-gray-300",
            )}
          />
        </Button>
        <Image
          src={image || "/placeholder.svg"}
          alt={nameEn}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          priority
        />
      </div>

      <div className="">
        <Link
          href={`/products/${id}`}
          className="hover:text-primary hover:underline"
        >
          <H4>{nameEn}</H4>
        </Link>
        <div className="mt-1 flex items-end text-primary">
          <P>QAR</P>
          <P className="text-xl font-semibold">24</P>
        </div>
        <Small className="mt-2 rounded-sm bg-neutral-50 px-4 py-2">
          Available in more options
        </Small>

        <Button className="mt-5 w-full">Order Now</Button>
      </div>
    </div>
  );
}
