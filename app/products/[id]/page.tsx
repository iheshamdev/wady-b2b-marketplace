import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Product } from "@/types/product";
import { getApi } from "@/lib/http";
import { ProductDetails } from "@/components/product/product-details";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { response: product } = await getApi<Product>(
    `products/${(await props.params).id}`,
  );

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.nameEn,
    description: `${product.nameEn} - ${product.category.nameEn}`,
    openGraph: {
      title: product.nameEn,
      description: `${product.nameEn} - ${product.category.nameEn}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.nameEn,
        },
      ],
    },
  };
}

export default async function ProductPage(props: Props) {
  const { response: product } = await getApi<Product>(
    `products/${(await props.params).id}`,
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-5">
      <ProductDetails product={product} />
    </div>
  );
}
