import Image from "next/image";
import { redirect } from "next/navigation";

import { Product, ProductsResponse } from "@/types/product";
import { STATUS_CODES } from "@/lib/constants";
import { getApi } from "@/lib/http";

import { ProductCard } from "./product-card";

export default async function ProductsList() {
  const { response, error, status } =
    await getApi<ProductsResponse>("products");

  console.log("products", response);
  // if (status === STATUS_CODES.UNAUTHORIZED) {
  //   redirect("/login");
  // }
  if (response?.data?.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {response?.data.map((product: Product) => (
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
