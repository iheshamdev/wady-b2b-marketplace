"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Package, Packaging, Size, Variant } from "@/types/product";
import { cn } from "@/lib/utils";

import { Button } from "../ui";

interface ProductVariantsProps {
  variants: Variant[];
  sizes: Size[];
  packagings: Packaging[];
  packages: Package[];
  onPackageChange: (pkg: Package) => void;
}

enum VariantType {
  Variant = "variant",
  Size = "size",
  Packaging = "packaging",
}

export default function ProductVariants({
  variants,
  sizes,
  packagings,
  packages,
  onPackageChange,
}: ProductVariantsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPackage, setSelectedPackage] = useState<Package | undefined>();
  const [lastUpdatedOption, setLastUpdatedOption] = useState<VariantType>(
    VariantType.Variant,
  );

  const variantBaseClasses =
    "h-10 rounded border border-dashed border-neutral-200 bg-white px-4 text-sm";
  const VariantActiveClasses =
    "cursor-auto border-2 border-solid border-primary bg-primary-50 font-semibold text-primary";

  useEffect(() => {
    const packageId = searchParams.get("package") || "";
    setSelectedPackage(packages.find((pkg) => pkg.id === parseInt(packageId)));
  }, [searchParams]);

  // useEffect(() => {
  //   console.log("Selected_package", selectedPackage?.id, selectedPackage);
  // }, [selectedPackage]);

  // useEffect(() => {
  //   console.log("on init", selectedPackage, packages[0].id);
  // }, []);

  const firstRender = useRef(true);

  // **Update URL immediately when package changes**
  const updateUrl = (packageId: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("package", packageId.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // **Find the best matching package based on selections**
  const matchedPackage = useMemo(() => {
    let pkg = packages.find(
      (pkg) =>
        pkg.variantId === selectedPackage?.variantId &&
        pkg.sizeId === selectedPackage?.sizeId &&
        pkg.packagingTypeId === selectedPackage?.packagingTypeId,
    );

    if (!pkg) {
      if (lastUpdatedOption === VariantType.Variant) {
        pkg = packages.find(
          (pkg) => pkg.variantId === selectedPackage?.variantId,
        );
      } else if (lastUpdatedOption === VariantType.Size) {
        pkg = packages.find((pkg) => pkg.sizeId === selectedPackage?.sizeId);
      } else if (lastUpdatedOption === VariantType.Packaging) {
        pkg = packages.find(
          (pkg) => pkg.packagingTypeId === selectedPackage?.packagingTypeId,
        );
      }
    }

    return pkg;
  }, [selectedPackage, lastUpdatedOption, packages]);

  // **Effect: Ensure valid package is selected & update URL**
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; // Skip first render
    }

    if (matchedPackage && matchedPackage.id !== selectedPackage?.id) {
      setSelectedPackage(matchedPackage);
      console.log("matchedPackage", matchedPackage);
      onPackageChange(matchedPackage);
      updateUrl(matchedPackage.id);
    }
  }, [matchedPackage]);

  return (
    <div className="space-y-5 py-3">
      {/* Variant Selection */}
      <div className="space-y-3">
        <span className="text-sm text-gray-500">Type ({variants.length}):</span>
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => {
            const newPackage = packages.find(
              (pkg) => pkg.variantId === variant.id,
            );
            return (
              <Button
                key={variant.id}
                variant="ghost"
                onClick={() => {
                  if (newPackage && newPackage.id !== selectedPackage?.id) {
                    setSelectedPackage(newPackage);
                    setLastUpdatedOption(VariantType.Variant);
                    onPackageChange(newPackage);
                    updateUrl(newPackage.id); // ✅ Immediate update
                  }
                }}
                className={cn(
                  variantBaseClasses,
                  selectedPackage?.variantId === variant.id &&
                    VariantActiveClasses,
                )}
              >
                {variant.nameEn}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-3">
        <span className="text-sm text-gray-500">Size ({sizes.length}):</span>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const newPackage = packages.find((pkg) => pkg.sizeId === size.id);
            return (
              <Button
                key={size.id}
                variant="ghost"
                onClick={() => {
                  if (newPackage && newPackage.id !== selectedPackage?.id) {
                    setSelectedPackage(newPackage);
                    setLastUpdatedOption(VariantType.Size);
                    onPackageChange(newPackage);
                    updateUrl(newPackage.id); // ✅ Immediate update
                  }
                }}
                className={cn(
                  variantBaseClasses,
                  selectedPackage?.sizeId === size.id && VariantActiveClasses,
                )}
              >
                {size.nameEn}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Packaging Selection */}
      <div className="space-y-3">
        <span className="text-sm text-gray-500">
          Package ({packagings.length}):
        </span>
        <div className="flex flex-wrap gap-2">
          {packagings.map((pkg) => {
            const newPackage = packages.find(
              (p) => p.packagingTypeId === pkg.id,
            );
            return (
              <Button
                key={pkg.id}
                variant="ghost"
                onClick={() => {
                  if (newPackage && newPackage.id !== selectedPackage?.id) {
                    setSelectedPackage(newPackage);
                    setLastUpdatedOption(VariantType.Packaging);
                    onPackageChange(newPackage);
                    updateUrl(newPackage.id); // ✅ Immediate update
                  }
                }}
                className={cn(
                  variantBaseClasses,
                  selectedPackage?.packagingTypeId === pkg.id &&
                    VariantActiveClasses,
                )}
              >
                {pkg.nameEn}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
