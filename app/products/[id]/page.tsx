import { notFound } from "next/navigation";

import { Product } from "@/types/product";
import { getApi } from "@/lib/http";
import { ProductDetails } from "@/components/product/product-details";

async function getProduct(id: number) {
  try {
    const response = await getApi<Product>(`products/${id}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    notFound();
    // return {};
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <p className="text-lg font-semibold text-red-500">
          Failed to load product details. Please try again later.
        </p>
      </div>
    );
  }
  return (
    <div className="container py-5">
      <ProductDetails product={product} />
    </div>
  );
}
