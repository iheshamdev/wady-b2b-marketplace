import Image from "next/image";
import { Heart } from "lucide-react";

import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

import { H2, H3, P, Small } from "../shared/typography";
import { Icons } from "../ui/icons";
import { QuantityCounter } from "../ui/quantity-counter";

export function ProductDetails({ product }: { product: Product }) {
  const { id, nameEn, image, variants, sizes, packagings } = product;
  const variantClasses =
    "rounded border bg-white border-neutral-200 border-dashed px-4 text-sm h-10";
  return (
    <div className="flex items-start gap-8 py-6">
      <div className="min-w-[500px] rounded-lg bg-white">
        <div className="relative aspect-square bg-neutral-50">
          <Image
            src={image}
            alt="Puck Cream Cheese"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      </div>

      <div>
        <div className="flex items-start justify-between gap-2">
          <H3>{nameEn}</H3>
          <span className="rounded bg-green-50 px-2 py-0.5 text-green-600">
            In stock
          </span>
        </div>
        <div className="my-3 text-2xl font-bold">24 QAR</div>
        <P className="border-b border-neutral-200 pb-3 text-sm">
          Due to our superior machinery and manufacturing process, we have
          superior granule formation of
        </P>

        {/* Variations */}
        <div className="space-y-5 py-3">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Type ({variants?.length}):
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {variants?.map((variant) => (
                <Button
                  variant="ghost"
                  key={variant.id}
                  className={variantClasses}
                >
                  {variant.nameEn}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-sm text-gray-500">
              Size ({sizes?.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {sizes?.map((size) => (
                <button key={size.id} className={variantClasses}>
                  {size.nameEn}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-sm text-gray-500">
              Package ({packagings?.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {packagings?.map((pkg) => (
                <button key={pkg.id} className={variantClasses}>
                  {pkg.nameEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <P>Quantity</P>
          <div className="flex gap-4">
            <QuantityCounter initialValue={5} min={5} max={50} />
            <Button className="h-[46px] flex-1">Add to cart</Button>
          </div>

          <div className="flex gap-2">
            <Icons.Truck className="text-primary" />
            <P className="flex gap-3">
              <span className="text-black">Doorstep Delivery:</span>
              Wed, Feb 12th - Thu, Feb 13th
            </P>
          </div>
        </div>
      </div>
    </div>
  );
}
