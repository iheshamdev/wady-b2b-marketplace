export interface Category {
  id: number;
  nameEn: string;
  nameAr: string;
}

export interface Brand {
  id: number;
  nameEn: string;
  nameAr: string;
}

export interface Variant {
  id: number;
  nameEn: string;
  nameAr: string;
}

export interface Size {
  id: number;
  nameEn: string;
  nameAr: string;
}

export interface Packaging {
  id: number;
  nameEn: string;
  nameAr: string;
}

export interface Package {
  id: number;
  nameEn: string;
  nameAr: string;
  variantId: number;
  sizeId: number;
  packagingTypeId: number;
  quantity: number;
  totalPrice: string;
  pricePerUnit: string;
}

export interface Product {
  id: number;
  nameEn: string;
  nameAr: string;
  image: string;
  category: Category;
  brand: Brand;
  variants: Variant[];
  sizes: Size[];
  packagings: Packaging[];
  packages?: Package[];
}

export interface Metadata {
  currentPage: number;
  totalCount: number;
  limit: number;
  totalPages: number;
}

export interface ProductsResponse {
  data: Product[];
  metadata?: Metadata;
}
