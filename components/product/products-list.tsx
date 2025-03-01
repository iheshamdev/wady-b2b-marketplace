import Image from "next/image";

import { Product, ProductsResponse } from "@/types/product";
import { getApi } from "@/lib/http";

import { ProductCard } from "./product-card";

async function getProducts() {
  try {
    const response = await getApi<ProductsResponse>("products");
    return {
      data: response.data || [],
      metadata: response.metadata || {
        currentPage: 1,
        totalCount: 0,
        limit: 10,
        totalPages: 1,
      },
    };
  } catch (error) {
    return {
      data: [],
      metadata: { currentPage: 1, totalCount: 0, limit: 10, totalPages: 1 },
    };
  }
}
export default async function ProductsList() {
  const { data: products, metadata } = await getProducts();

  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* <div className="mt-4 text-sm text-gray-500">
        Page {metadata.currentPage} of {metadata.totalPages} | Total products:{" "}
        {metadata.totalCount}
      </div> */}
    </div>
  );
}
