import Cookies from "js-cookie";

import { ProductsResponse } from "@/types/product";
import { getApi } from "@/lib/http";
import { H1, H2 } from "@/components/shared/typography";

import ProductList from "./list";

async function getProducts() {
  try {
    const response = await getApi<ProductsResponse>("products");
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      data: [],
      metadata: { currentPage: 1, totalCount: 0, limit: 10, totalPages: 1 },
    };
  }
}

export default async function ProductsPage() {
  const { data: products, metadata } = await getProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <H2 className="mb-8 text-3xl font-bold">Our Products</H2>
      {/* {products?.map((product) => <p key={product.id}>{product.nameEn}</p>)} */}
      {/* <ProductList products={products} /> */}
      {/* <div className="mt-4 text-sm text-gray-500">
        Page {metadata.currentPage} of {metadata.totalPages} | Total products:{" "}
        {metadata.totalCount}
      </div> */}
    </main>
  );
}
