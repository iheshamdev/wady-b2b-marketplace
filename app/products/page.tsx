import ProductsList from "@/components/product/products-list";
import { H2 } from "@/components/shared/typography";

export default async function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <H2 className="mb-8 text-3xl font-bold">Our Products</H2>
      <ProductsList />
    </main>
  );
}
