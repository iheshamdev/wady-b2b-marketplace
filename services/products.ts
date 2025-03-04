import type { Product } from "@/types/product";
import { getApi } from "@/lib/http";

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const product = await getApi<Product>(`products/${id}`);
    return product;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    return null;
  }
}
