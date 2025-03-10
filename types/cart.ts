import { Brand, Category, Packaging, Size, Variant } from "./product";

export interface CartPackage {
  id: number;
  nameEn: string;
  nameAr: string;
  product: {
    id: number;
    nameEn: string;
    nameAr: string;
    image: string;
    category: Category;
    brand: Brand;
  };
  variant: Variant;
  size: {
    id: number;
    unitEn: string;
    unitAr: string;
    quantity: string;
  };
  packagingType: Packaging;
  pricing: {
    totalPrice: number;
    pricePerUnit: number;
  };
}

export interface CartItem {
  cartItemId: number;
  package: CartPackage;
  quantity: number;
  totalPrice: number;
}

export interface CartResponse {
  cartId: number;
  items: CartItem[];
  totalPrice: number;
}

export interface AddToCartRequest {
  packageId: number;
  quantity: number;
}
