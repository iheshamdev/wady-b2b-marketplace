// "use client";

// import { match } from "assert";
// import { useEffect, useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// import { Package, Packaging, Size, Variant } from "@/types/product";
// import { cn } from "@/lib/utils";

// import { Button } from "../ui";

// interface ProductVaraiantsProps {
//   variants: Variant[];
//   sizes: Size[];
//   packagings: Packaging[];
//   packages: Package[];
// }

// enum VariantType {
//   Variant = "variant",
//   Size = "size",
//   Packaging = "packaging",
// }

// type SelectedOptionId = number | undefined;
// const variantClasses =
//   "rounded border bg-white border-neutral-200 border-dashed px-4 text-sm h-10";

// export default function ProductVaraiants({
//   variants,
//   sizes,
//   packagings,
//   packages,
// }: ProductVaraiantsProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Extract values from URL (if they exist)
//   const getQueryParam = (key: string, fallback: number | undefined) => {
//     const value = searchParams.get(key);
//     return value ? parseInt(value, 10) : fallback;
//   };

//   const [selectedVariant, setSelectedVariant] = useState<SelectedOptionId>(
//     getQueryParam(
//       "variant",
//       packages.length ? packages[0]?.variantId : undefined,
//     ),
//   );
//   const [selectedSize, setSelectedSize] = useState<SelectedOptionId>(
//     getQueryParam("size", packages.length ? packages[0]?.sizeId : undefined),
//   );
//   const [selectedPackaging, setSelectedPackaging] = useState<SelectedOptionId>(
//     getQueryParam(
//       "packaging",
//       packages.length ? packages[0]?.packagingTypeId : undefined,
//     ),
//   );
//   const [selectedPackage, setSelectedPackage] = useState<Package | undefined>(
//     undefined,
//   );
//   const [lastUpdatedOption, setLastUpdatedOption] = useState<VariantType>(
//     VariantType.Variant,
//   );

//   // **Update URL when a selection changes**
//   const updateUrl = (key: string, value: number | undefined) => {
//     const params = new URLSearchParams(window.location.search);
//     console.log("params", params.toString(), key, value);
//     if (!!value) {
//       params.set(key, value.toString());
//     } else {
//       params.delete(key);
//     }
//     router.replace(`?${params.toString()}`, { scroll: false });
//   };

//   // Approach number 1
//   // const findMatchedPackage = useMemo(() => {
//   //   const fullMatchedPackage = packages.find(
//   //     (pkg) =>
//   //       pkg.variantId === selectedVariant &&
//   //       pkg.sizeId === selectedSize &&
//   //       pkg.packagingTypeId === selectedPackaging,
//   //   );
//   //   if (fullMatchedPackage) {
//   //     return fullMatchedPackage;
//   //   } else {
//   //     if (lastUpdatedOption === VariantType.Variant) {
//   //       return packages.find((pkg) => pkg.variantId === selectedVariant);
//   //     } else if (lastUpdatedOption === VariantType.Size) {
//   //       return packages.find((pkg) => pkg.sizeId === selectedSize);
//   //     } else if (lastUpdatedOption === VariantType.Packaging) {
//   //       return packages.find(
//   //         (pkg) => pkg.packagingTypeId === selectedPackaging,
//   //       );
//   //     }
//   //   }
//   // }, [selectedVariant, selectedSize, selectedPackaging, packages]);

//   useEffect(
//     () => {
//       let matchedPackage = packages.find(
//         (pkg) =>
//           pkg.variantId === selectedVariant &&
//           pkg.sizeId === selectedSize &&
//           pkg.packagingTypeId === selectedPackaging,
//       );
//       if (!matchedPackage) {
//         if (lastUpdatedOption === VariantType.Variant) {
//           matchedPackage = packages.find(
//             (pkg) => pkg.variantId === selectedVariant,
//           );
//         } else if (lastUpdatedOption === VariantType.Size) {
//           matchedPackage = packages.find((pkg) => pkg.sizeId === selectedSize);
//         } else if (lastUpdatedOption === VariantType.Packaging) {
//           matchedPackage = packages.find(
//             (pkg) => pkg.packagingTypeId === selectedPackaging,
//           );
//         }
//       }
//       // updateUrl("package", findMatchedPackage.id);
//       const params = new URLSearchParams(window.location.search);
//       params.set(
//         "package",
//         matchedPackage ? matchedPackage?.id.toString() : "NA",
//       );
//       router.replace(`?${params.toString()}`, { scroll: false });
//       console.log(
//         "findMatchedPackage",
//         matchedPackage?.variantId,
//         matchedPackage?.sizeId,
//         matchedPackage?.packagingTypeId,
//       );
//     },
//     [
//       // selectedVariant,
//       // selectedSize,
//       // selectedPackaging,
//       // packages,
//       // lastUpdatedOption,
//     ],
//   );

//   // const onChange = (key: VariantType, value: number) => {
//   //   switch (key) {
//   //     case VariantType.Variant: {
//   //       // setSelectedVariant(value);
//   //       const matched = findPackage({
//   //         variantId: value,
//   //         sizeId: selectedSize,
//   //         packagingId: selectedPackaging,
//   //       });
//   //       setSelectedPackage(matched);
//   //       setLastUpdatedOption(VariantType.Variant);
//   //       break;
//   //     }
//   //     case VariantType.Size: {
//   //       // setSelectedSize(value);
//   //       const matched = findPackage({
//   //         variantId: selectedVariant,
//   //         sizeId: value,
//   //         packagingId: selectedPackaging,
//   //       });
//   //       setSelectedPackage(matched);
//   //       setLastUpdatedOption(VariantType.Size);
//   //       break;
//   //     }
//   //     case VariantType.Packaging: {
//   //       // setSelectedPackaging(value);
//   //       const matched = findPackage({
//   //         variantId: selectedVariant,
//   //         sizeId: selectedSize,
//   //         packagingId: value,
//   //       });
//   //       setSelectedPackage(matched);
//   //       setLastUpdatedOption(VariantType.Packaging);
//   //       break;
//   //     }
//   //   }
//   //   // if (findPackage()) {
//   //   //   console.log("Selected: ", findPackage()?.id);
//   //   // }
//   //   // updateUrl("package", findMatchedPackage()?.id);
//   // };

//   // const findPackage = ({
//   //   variantId,
//   //   sizeId,
//   //   packagingId,
//   // }: {
//   //   variantId: number | undefined;
//   //   sizeId: number | undefined;
//   //   packagingId: number | undefined;
//   // }) => {
//   //   const exactMatchedPackage = packages.find(
//   //     (pkg) =>
//   //       pkg.variantId === variantId &&
//   //       pkg.sizeId === sizeId &&
//   //       pkg.packagingTypeId === packagingId,
//   //   );
//   //   console.log("exactMatchedPackage", exactMatchedPackage);
//   //   // updateUrl("package", exactMatchedPackage?.id);
//   //   // if (exactMatchedPackage) return exactMatchedPackage;
//   //   // const halfMatchedPackage = packages.find(
//   //   //   (pkg) =>
//   //   //     (pkg.variantId === variantId && pkg.sizeId === sizeId) ||
//   //   //     (pkg.variantId === variantId && pkg.packagingTypeId === packagingId) ||
//   //   //     (pkg.sizeId === sizeId && pkg.packagingTypeId === packagingId),
//   //   // );
//   //   // console.log("halfMatchedPackage", halfMatchedPackage);
//   //   // // updateUrl("package", halfMatchedPackage?.id);
//   //   // if (halfMatchedPackage) return halfMatchedPackage;
//   //   let suggestedPackage: Package | undefined;
//   //   if (lastUpdatedOption === VariantType.Variant) {
//   //     suggestedPackage = packages.find((pkg) => pkg.variantId === variantId);
//   //   } else if (lastUpdatedOption === VariantType.Size) {
//   //     suggestedPackage = packages.find((pkg) => pkg.sizeId === sizeId);
//   //   } else if (lastUpdatedOption === VariantType.Packaging) {
//   //     suggestedPackage = packages.find(
//   //       (pkg) => pkg.packagingTypeId === packagingId,
//   //     );
//   //   }
//   //   console.log("suggestedPackage", suggestedPackage);
//   //   // updateUrl("package", suggestedPackage?.id);
//   //   return suggestedPackage;
//   // };

//   // useEffect(() => {
//   //   if (selectedPackage) {
//   //     updateUrl("package", selectedPackage?.id);
//   //     setSelectedVariant(selectedPackage?.variantId);
//   //     setSelectedSize(selectedPackage.sizeId);
//   //     setSelectedPackaging(selectedPackage.packagingTypeId);
//   //   }
//   // }, [selectedPackage]);

//   // useEffect(() => {
//   //   const params = new URLSearchParams(window.location.search);
//   //   console.log("params", params.toString());
//   // }, []);

//   // useEffect(() => {
//   //   const selectedPackage = findPackage({
//   //     variantId: selectedVariant,
//   //     sizeId: selectedSize,
//   //     packagingId: selectedPackaging,
//   //   });
//   //   if (selectedPackage) {
//   // setSelectedVariant(selectedPackage.variantId);
//   // setSelectedSize(selectedPackage.sizeId);
//   // setSelectedPackaging(selectedPackage.packagingTypeId);zx
//   // updateUrl("package", selectedPackage.id);
//   //   }
//   //   console.log("useEffect running with ", selectedPackage);
//   // if (!matchedPackage) {
//   //   let fallbackPackage: Package | undefined;
//   //   if (lastUpdated === "variant") {
//   //     fallbackPackage = packages.find(
//   //       (pkg) => pkg.variantId === selectedVariant,
//   //     );
//   //   } else if (lastUpdated === "size") {
//   //     fallbackPackage = packages.find((pkg) => pkg.sizeId === selectedSize);
//   //   } else if (lastUpdated === "packaging") {
//   //     fallbackPackage = packages.find(
//   //       (pkg) => pkg.packagingTypeId === selectedPackaging,
//   //     );
//   //   }
//   //   if (fallbackPackage) {
//   //     setSelectedVariant(fallbackPackage.variantId);
//   //     setSelectedSize(fallbackPackage.sizeId);
//   //     setSelectedPackaging(fallbackPackage.packagingTypeId);
//   //     // Update URL
//   //     updateUrl("package", fallbackPackage.id);
//   //   }
//   // }
//   // }, [selectedVariant, selectedSize, selectedPackaging, lastUpdated, packages]);

//   return (
//     <div className="space-y-5 py-3">
//       <div className="space-y-3">
//         <div className="flex items-center justify-between">
//           <span className="text-sm text-gray-500">
//             Type ({variants?.length}):
//           </span>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {variants?.map((variant) => (
//             <Button
//               key={variant.id}
//               variant="ghost"
//               onClick={() => {
//                 // onChange(VariantType.Variant, variant.id);
//                 setSelectedVariant(variant.id);
//                 setLastUpdatedOption(VariantType.Variant);
//               }}
//               className={cn(
//                 variantClasses,
//                 selectedVariant === variant.id &&
//                   "cursor-auto border-2 border-solid border-primary bg-primary-50 font-semibold text-primary hover:bg-primary-50 hover:text-primary",
//               )}
//             >
//               {variant.nameEn + " " + variant.id}
//             </Button>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-3">
//         <span className="text-sm text-gray-500">Size ({sizes?.length}):</span>
//         <div className="flex flex-wrap gap-2">
//           {sizes?.map((size) => (
//             <Button
//               key={size.id}
//               variant="ghost"
//               onClick={() => {
//                 // onChange(VariantType.Size, size.id);
//                 setSelectedSize(size.id);
//                 setLastUpdatedOption(VariantType.Size);
//               }}
//               className={cn(
//                 variantClasses,
//                 selectedSize === size.id &&
//                   "cursor-auto border-2 border-solid border-primary bg-primary-50 font-semibold text-primary hover:bg-primary-50 hover:text-primary",
//               )}
//             >
//               {size.nameEn + " " + size.id}
//             </Button>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-3">
//         <span className="text-sm text-gray-500">
//           Package ({packagings?.length}):
//         </span>
//         <div className="flex flex-wrap gap-2">
//           {packagings?.map((pkg) => (
//             <Button
//               key={pkg.id}
//               variant="ghost"
//               onClick={() => {
//                 // onChange(VariantType.Packaging, pkg.id);
//                 setSelectedPackaging(pkg.id);
//                 setLastUpdatedOption(VariantType.Packaging);
//               }}
//               className={cn(
//                 variantClasses,
//                 selectedPackaging === pkg.id &&
//                   "cursor-auto border-2 border-solid border-primary bg-primary-50 font-semibold text-primary hover:bg-primary-50 hover:text-primary",
//               )}
//             >
//               {pkg.nameEn + " " + pkg.id}
//             </Button>
//           ))}
//         </div>
//       </div>
//       {/* Matched Package Info */}
//       {/* {matchedPackage && (
//         <div className="text-sm text-gray-500">
//           <p>Selected: {matchedPackage.id}</p>
//         </div>
//       )} */}
//     </div>
//   );
// }

// -------------------------------------------------------------------------------------

// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// import { Package, Packaging, Size, Variant } from "@/types/product";
// import { cn } from "@/lib/utils";

// import { Button } from "../ui";

// interface ProductVariantsProps {
//   variants: Variant[];
//   sizes: Size[];
//   packagings: Packaging[];
//   packages: Package[];
// }

// enum VariantType {
//   Variant = "variant",
//   Size = "size",
//   Packaging = "packaging",
// }

// export default function ProductVariants({
//   variants,
//   sizes,
//   packagings,
//   packages,
// }: ProductVariantsProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Extract values from URL if they exist, else fallback to first package
//   const getQueryParam = (key: string, fallback: number | undefined) => {
//     const value = searchParams.get(key);
//     return value ? parseInt(value, 10) : fallback;
//   };

//   // States for selected options
//   const [selectedVariant, setSelectedVariant] = useState(
//     getQueryParam("variant", packages[0]?.variantId),
//   );
//   const [selectedSize, setSelectedSize] = useState(
//     getQueryParam("size", packages[0]?.sizeId),
//   );
//   const [selectedPackaging, setSelectedPackaging] = useState(
//     getQueryParam("packaging", packages[0]?.packagingTypeId),
//   );
//   const [lastUpdatedOption, setLastUpdatedOption] = useState<VariantType>(
//     VariantType.Variant,
//   );

//   const firstRender = useRef(true);

//   // **Prevent unnecessary URL updates**
//   const updateUrl = (key: string, value: number | undefined) => {
//     const params = new URLSearchParams(window.location.search);
//     if (value !== undefined) {
//       params.set(key, value.toString());
//     } else {
//       params.delete(key);
//     }
//     router.replace(`?${params.toString()}`, { scroll: false });
//   };

//   // **Find best matching package based on selections**
//   const matchedPackage = useMemo(() => {
//     let pkg = packages.find(
//       (pkg) =>
//         pkg.variantId === selectedVariant &&
//         pkg.sizeId === selectedSize &&
//         pkg.packagingTypeId === selectedPackaging,
//     );

//     if (!pkg) {
//       if (lastUpdatedOption === VariantType.Variant) {
//         pkg = packages.find((pkg) => pkg.variantId === selectedVariant);
//       } else if (lastUpdatedOption === VariantType.Size) {
//         pkg = packages.find((pkg) => pkg.sizeId === selectedSize);
//       } else if (lastUpdatedOption === VariantType.Packaging) {
//         pkg = packages.find((pkg) => pkg.packagingTypeId === selectedPackaging);
//       }
//     }

//     return pkg;
//   }, [
//     selectedVariant,
//     selectedSize,
//     selectedPackaging,
//     lastUpdatedOption,
//     packages,
//   ]);

//   // **Effect: Ensure valid package is selected & update URL**
//   useEffect(() => {
//     if (firstRender.current) {
//       firstRender.current = false;
//       return; // Skip first render
//     }

//     if (
//       matchedPackage &&
//       (selectedVariant !== matchedPackage.variantId ||
//         selectedSize !== matchedPackage.sizeId ||
//         selectedPackaging !== matchedPackage.packagingTypeId)
//     ) {
//       setSelectedVariant(matchedPackage.variantId);
//       setSelectedSize(matchedPackage.sizeId);
//       setSelectedPackaging(matchedPackage.packagingTypeId);

//       updateUrl("variant", matchedPackage.variantId);
//       updateUrl("size", matchedPackage.sizeId);
//       updateUrl("packaging", matchedPackage.packagingTypeId);
//     }
//   }, [matchedPackage]);

//   return (
//     <div className="space-y-5 py-3">
//       {/* Variant Selection */}
//       <div className="space-y-3">
//         <span className="text-sm text-gray-500">Type ({variants.length}):</span>
//         <div className="flex flex-wrap gap-2">
//           {variants.map((variant) => (
//             <Button
//               key={variant.id}
//               variant="ghost"
//               onClick={() => {
//                 if (selectedVariant !== variant.id) {
//                   setSelectedVariant(variant.id);
//                   setLastUpdatedOption(VariantType.Variant);
//                 }
//               }}
//               className={cn(
//                 "h-10 rounded border border-dashed border-neutral-200 bg-white px-4 text-sm",
//                 selectedVariant === variant.id &&
//                   "border-2 border-primary bg-primary-50 font-semibold text-primary",
//               )}
//             >
//               {variant.nameEn}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Size Selection */}
//       <div className="space-y-3">
//         <span className="text-sm text-gray-500">Size ({sizes.length}):</span>
//         <div className="flex flex-wrap gap-2">
//           {sizes.map((size) => (
//             <Button
//               key={size.id}
//               variant="ghost"
//               onClick={() => {
//                 if (selectedSize !== size.id) {
//                   setSelectedSize(size.id);
//                   setLastUpdatedOption(VariantType.Size);
//                 }
//               }}
//               className={cn(
//                 "h-10 rounded border border-dashed border-neutral-200 bg-white px-4 text-sm",
//                 selectedSize === size.id &&
//                   "border-2 border-primary bg-primary-50 font-semibold text-primary",
//               )}
//             >
//               {size.nameEn}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Packaging Selection */}
//       <div className="space-y-3">
//         <span className="text-sm text-gray-500">
//           Package ({packagings.length}):
//         </span>
//         <div className="flex flex-wrap gap-2">
//           {packagings.map((pkg) => (
//             <Button
//               key={pkg.id}
//               variant="ghost"
//               onClick={() => {
//                 if (selectedPackaging !== pkg.id) {
//                   setSelectedPackaging(pkg.id);
//                   setLastUpdatedOption(VariantType.Packaging);
//                 }
//               }}
//               className={cn(
//                 "h-10 rounded border border-dashed border-neutral-200 bg-white px-4 text-sm",
//                 selectedPackaging === pkg.id &&
//                   "border-2 border-primary bg-primary-50 font-semibold text-primary",
//               )}
//             >
//               {pkg.nameEn}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Matched Package Info */}
//       {matchedPackage && (
//         <div className="text-sm text-gray-500">
//           <p>Selected Package: {matchedPackage.id}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// -------------------------------------------------------------------------------------

// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// import { Package, Packaging, Size, Variant } from "@/types/product";
// import { cn } from "@/lib/utils";

// import { Button } from "../ui";

// interface ProductVariantsProps {
//   variants: Variant[];
//   sizes: Size[];
//   packagings: Packaging[];
//   packages: Package[];
// }

// export default function ProductVariants({
//   variants,
//   sizes,
//   packagings,
//   packages,
// }: ProductVariantsProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Extract `package` ID from URL or fallback to first package
//   const getInitialPackage = () => {
//     const packageIdFromUrl = searchParams.get("package");
//     if (packageIdFromUrl) {
//       const foundPackage = packages.find(
//         (pkg) => pkg.id === parseInt(packageIdFromUrl, 10),
//       );
//       if (foundPackage) return foundPackage;
//     }
//     return packages[0]; // Default to first package if no valid package in URL
//   };

//   const [selectedPackage, setSelectedPackage] = useState<Package | undefined>(
//     getInitialPackage(),
//   );

//   // Track last valid package to prevent unnecessary updates
//   const lastValidPackageRef = useRef<Package | undefined>(selectedPackage);

//   // Update package selection when user chooses variant, size, or packaging
//   const handleSelectionChange = (newPackage: Package) => {
//     setSelectedPackage(newPackage);

//     // Update URL without causing unnecessary re-renders
//     const params = new URLSearchParams(window.location.search);
//     params.set("package", newPackage.id.toString());
//     router.replace(`?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <div className="space-y-5 py-3">
//       {/* Variant Selection */}
//       <div className="space-y-3">
//         <span className="text-sm text-gray-500">Type ({variants.length}):</span>
//         <div className="flex flex-wrap gap-2">
//           {variants.map((variant) => {
//             const newPackage = packages.find(
//               (pkg) => pkg.variantId === variant.id,
//             );
//             return (
//               <Button
//                 key={variant.id}
//                 variant="ghost"
//                 onClick={() => newPackage && handleSelectionChange(newPackage)}
//                 className={cn(
//                   "h-10 rounded border border-dashed border-neutral-200 bg-white px-4 text-sm",
//                   selectedPackage?.variantId === variant.id &&
//                     "border-2 border-primary bg-primary-50 font-semibold text-primary",
//                 )}
//               >
//                 {variant.nameEn}
//               </Button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Size Selection */}
//       <div className="space-y-3">
//         <span className="text-sm text-gray-500">Size ({sizes.length}):</span>
//         <div className="flex flex-wrap gap-2">
//           {sizes.map((size) => {
//             const newPackage = packages.find((pkg) => pkg.sizeId === size.id);
//             return (
//               <Button
//                 key={size.id}
//                 variant="ghost"
//                 onClick={() => newPackage && handleSelectionChange(newPackage)}
//                 className={cn(
//                   "h-10 rounded border border-dashed border-neutral-200 bg-white px-4 text-sm",
//                   selectedPackage?.sizeId === size.id &&
//                     "border-2 border-primary bg-primary-50 font-semibold text-primary",
//                 )}
//               >
//                 {size.nameEn}
//               </Button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Packaging Selection */}
//       <div className="space-y-3">
//         <span className="text-sm text-gray-500">
//           Package ({packagings.length}):
//         </span>
//         <div className="flex flex-wrap gap-2">
//           {packagings.map((pkg) => {
//             const newPackage = packages.find(
//               (p) => p.packagingTypeId === pkg.id,
//             );
//             return (
//               <Button
//                 key={pkg.id}
//                 variant="ghost"
//                 onClick={() => newPackage && handleSelectionChange(newPackage)}
//                 className={cn(
//                   "h-10 rounded border border-dashed border-neutral-200 bg-white px-4 text-sm",
//                   selectedPackage?.packagingTypeId === pkg.id &&
//                     "border-2 border-primary bg-primary-50 font-semibold text-primary",
//                 )}
//               >
//                 {pkg.nameEn}
//               </Button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Selected Package Info */}
//       {selectedPackage && (
//         <div className="text-sm text-gray-500">
//           <p>Selected Package ID: {selectedPackage.id}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// -------------------------------------------------------------------------------------

"use client";

import { on } from "events";
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

  // Extract package ID from URL or fallback to first package
  const getInitialPackage = () => {
    const packageIdFromUrl = searchParams.get("package");
    if (packageIdFromUrl) {
      const foundPackage = packages.find(
        (pkg) => pkg.id === parseInt(packageIdFromUrl, 10),
      );
      if (foundPackage) {
        console.log("matchedPackage 111", foundPackage);
        foundPackage && onPackageChange(foundPackage);
        return foundPackage;
      }
    }
    console.log("matchedPackage 111", packages[0]);
    packages[0] && onPackageChange(packages[0]);
    return packages[0]; // Default to first package if no valid package in URL
  };

  const [selectedPackage, setSelectedPackage] = useState<Package | undefined>(
    getInitialPackage(),
  );
  const [lastUpdatedOption, setLastUpdatedOption] = useState<VariantType>(
    VariantType.Variant,
  );

  useEffect(() => {
    getInitialPackage();
  }, []);

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
                  "h-10 rounded border border-dashed border-neutral-200 bg-white px-4 text-sm",
                  selectedPackage?.variantId === variant.id &&
                    "border-2 border-primary bg-primary-50 font-semibold text-primary",
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
                  "h-10 rounded border border-dashed border-neutral-200 bg-white px-4 text-sm",
                  selectedPackage?.sizeId === size.id &&
                    "border-2 border-primary bg-primary-50 font-semibold text-primary",
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
                  "h-10 rounded border border-dashed border-neutral-200 bg-white px-4 text-sm",
                  selectedPackage?.packagingTypeId === pkg.id &&
                    "border-2 border-primary bg-primary-50 font-semibold text-primary",
                )}
              >
                {pkg.nameEn}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Selected Package Info */}
      {selectedPackage && (
        <div className="text-sm text-gray-500">
          <p>Selected Package ID: {selectedPackage.id}</p>
        </div>
      )}
    </div>
  );
}
