import Image from "next/image";

import { Product } from "@/types/product";

export default function ProductList({ products }: { products: Product[] }) {
  if (products?.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <div key={product.id} className="rounded-lg border p-4 shadow-md">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.nameEn}
            width={200}
            height={200}
            className="mb-4 h-48 w-full rounded object-cover"
          />
          <h2 className="text-lg font-semibold">{product.nameEn}</h2>
          <p className="text-sm text-gray-500">{product.nameAr}</p>
          <p className="mt-2 text-sm">Category: {product.category.nameEn}</p>
          <p className="text-sm">Brand: {product.brand.nameEn}</p>
          <div className="mt-2">
            <p className="text-sm font-semibold">Variants:</p>
            <ul className="list-inside list-disc text-xs">
              {product.variants.map((variant) => (
                <li key={variant.id}>{variant.nameEn}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
