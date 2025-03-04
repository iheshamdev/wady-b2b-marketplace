// import { notFound } from "next/navigation";

// import { Product } from "@/types/product";
// import { getApi } from "@/lib/http";
// import { ProductDetails } from "@/components/product/product-details";

// async function getProduct(id: number) {
//   try {
//     const response = await getApi<Product>(`products/${id}`);
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//     notFound();
//     // return {};
//   }
// }

// export default async function ProductPage({
//   params,
// }: {
//   params: { id: number };
// }) {
//   // const { id } = params;
//   const product = await getProduct(params.id);
//   if (!product) {
//     return (
//       <div className="container py-5 text-center">
//         <p className="text-lg font-semibold text-red-500">
//           Failed to load product details. Please try again later.
//         </p>
//       </div>
//     );
//   }
//   return (
//     <div className="container py-5">
//       <ProductDetails product={product} />
//     </div>
//   );
// }

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { Product } from "@/types/product";
import { getApi } from "@/lib/http";
import { ProductDetails } from "@/components/product/product-details";

async function getProduct(id: string): Promise<Product> {
  try {
    const response = await getApi<Product>(`products/${id}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    notFound();
  }
}

type Props = {
  params: { id: string; locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: product.nameEn,
    description: `${product.nameEn} - ${product.category.nameEn}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  return (
    <div className="container py-5">
      <ProductDetails product={product} />
    </div>
  );
}
