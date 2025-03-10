import Image from "next/image";
import { redirect } from "next/navigation";

import { Product, ProductsResponse } from "@/types/product";
import { STATUS_CODES } from "@/lib/constants";
import { getApi } from "@/lib/http";

import { ProductCard } from "./product-card";

export default async function ProductsList() {
  const { response, error } = await getApi<ProductsResponse>("products");

  if (error) {
    return <p>Failed to load products. Please try again later.</p>;
  }

  if (response?.data?.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {response?.data.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
