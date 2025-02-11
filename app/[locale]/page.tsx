"use client";

import useAuthRedirect from "@/hooks/useAuthRedirect";
import { Progress } from "@/components/ui/progress";
import { CategoryList } from "@/components/shared/categories";
import { HeroCarousel } from "@/components/shared/hero-carousel";
import { ProductCard } from "@/components/shared/product-card";

const products = [
  {
    name: "Puck Cream Cheese",
    price: 24,
    currency: "QAR",
    image: "/images/products/1.png",
    inStock: true,
    productTypes: [
      { label: "Low-Fat", value: "low_fat" },
      { label: "Full-Fat", value: "full_fat" },
      { label: "No salt", value: "no_salt" },
    ],
    sizes: [
      { label: "500g", value: "500g" },
      { label: "910g", value: "910g" },
      { label: "2.4kg", value: "2.4kg" },
    ],
    packageTypes: [
      { label: "Glass Jar", value: "glass_jar" },
      { label: "Squeeze Bottle", value: "squeeze_bottle" },
      { label: "Carton Box", value: "carton_box" },
    ],
  },
  {
    name: "Al Rayyan Pasta",
    price: 12,
    currency: "QAR",
    image: "/images/products/2.png",
    inStock: true,
    productTypes: [
      { label: "Whole Wheat", value: "whole_wheat" },
      { label: "Gluten-Free", value: "gluten_free" },
      { label: "Penne Rigate", value: "penne_rigate" },
    ],
    sizes: [
      { label: "400g", value: "400g" },
      { label: "1KG", value: "1KG" },
      { label: "5KG", value: "5KG" },
    ],
    packageTypes: [
      { label: "Plastic Bag", value: "plastic_bag" },
      { label: "Vacuum Pack", value: "vacuum_pack" },
      { label: "Box Pack", value: "box_pack" },
    ],
  },
  {
    name: "Puck Cream Cheese",
    price: 19,
    currency: "QAR",
    image: "/images/products/3.png",
    inStock: false,
    productTypes: [
      { label: "Gold Blend", value: "low-fat" },
      { label: "Black Roast", value: "full-fat" },
      { label: "Espresso Powder", value: "no-salt" },
    ],
    sizes: [
      { label: "50g", value: "50g" },
      { label: "100g", value: "100g" },
      { label: "200g", value: "200g" },
    ],
    packageTypes: [
      { label: "Glass Jar", value: "glass_jar" },
      { label: "Squeeze Bottle", value: "squeeze_bottle" },
      { label: "Carton Box", value: "carton_box" },
    ],
  },
];

function HomePage() {
  useAuthRedirect();

  return (
    <>
      {/* <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#ff0088",
          borderRadius: 5,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1 }}
      /> */}
      <div className="container py-6">
        <div className="flex items-center justify-between">
          {/* Welcome Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome
              <span role="img" aria-label="waving hand">
                👋
              </span>
            </h1>
            <p className="text-neutral-600">
              Start exploring a seamless shopping experience
            </p>
          </div>

          {/* Profile Completion */}
          <div className="w-[400px] max-w-full rounded bg-neutral-50 px-6 py-3">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="font-semibold">Complete your profile</h2>
            </div>
            <p className="text-sm text-neutral-600">
              Fill in your profile to unlock the full experience.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm">20%</span>
              <Progress value={20} className="h-[5px] w-full" />
            </div>
          </div>
        </div>
        <div className="mb-10 mt-5">
          <HeroCarousel />
        </div>
        {/* <div className="banner mb-10 mt-5 h-[285px] rounded bg-neutral-200"></div> */}
        <CategoryList />
        <h2 className="mb-4 mt-10 text-xl font-semibold">Products</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
