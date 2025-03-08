"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

import type { Package, Product } from "@/types/product";
import { postApi } from "@/lib/http";
import { Button } from "@/components/ui/button";

import { H3, P } from "../shared/typography";
import { Icons } from "../ui/icons";
import { QuantityCounter } from "../ui/quantity-counter";
import ProductVaraiants from "./product-variants";

export function ProductDetails({ product }: { product: Product }) {
  const { id, nameEn, image, variants, sizes, packagings, packages } = product;
  const [title, setTitle] = useState(nameEn);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const addItem = useCartStore((state) => state.addItem);

  const fetchCart = useCartStore((state) => state.fetchCart);

  // Initialize selected package from URL param if available
  useEffect(() => {
    const packageId = searchParams.get("package");
    if (packageId && packages) {
      const pkg = packages.find((p) => p.id === Number(packageId));
      if (pkg) {
        handlePackageChange(pkg);
      }
    }
  }, [searchParams, packages]);

  const handlePackageChange = (pkg: Package) => {
    setSelectedPackage(pkg);
    setTitle(pkg.nameEn);
    setPrice(Number.parseInt(pkg.pricePerUnit));
  };

  const addToCartHandler = async () => {
    if (!selectedPackage) {
      toast.error("Please select a package option");
      return;
    }

    setIsLoading(true);

    try {
      // Add to backend cart
      const { response, error } = await postApi("cart/add", {
        packageId: selectedPackage.id,
        quantity,
      });

      // Fetch updated cart from API to sync with local store
      await fetchCart();

      toast.success("Added to cart successfully");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-8 py-6 md:flex-row">
      <div className="w-full rounded-lg bg-white md:min-w-[500px]">
        <div className="relative aspect-square bg-neutral-50">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-start justify-between gap-2">
          <H3>{title}</H3>
          <span className="rounded bg-green-50 px-2 py-0.5 text-green-600">
            In stock
          </span>
        </div>
        <div className="my-3 text-2xl font-bold">
          {price > 0 ? `${price} QAR` : "Select options"}
        </div>
        <P className="border-b border-neutral-200 pb-3 text-sm">
          Due to our superior machinery and manufacturing process, we have
          superior granule formation of
        </P>

        <ProductVaraiants
          variants={variants}
          sizes={sizes}
          packagings={packagings}
          packages={packages ?? []}
          onPackageChange={handlePackageChange}
        />

        <div className="mt-4 space-y-4">
          <P>Quantity</P>
          <div className="flex gap-4">
            <QuantityCounter
              initialValue={quantity}
              min={1}
              max={10}
              onChange={(value) => setQuantity(value)}
            />
            <Button
              className="h-[46px] flex-1"
              onClick={addToCartHandler}
              disabled={isLoading || !selectedPackage}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">Adding...</span>
              ) : (
                "Add to cart"
              )}
            </Button>
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
