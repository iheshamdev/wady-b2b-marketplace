import FCPHome from "@/components/ui/fcp-home";
import ProductsList from "@/components/product/products-list";
import { CategoryList } from "@/components/shared/categories";
import { H3 } from "@/components/shared/typography";

export default async function HomePage() {
  return (
    <div className="container py-6">
      <FCPHome />
      <CategoryList />
      <H3 className="mb-4 mt-10">Products</H3>
      <ProductsList />
    </div>
  );
}
