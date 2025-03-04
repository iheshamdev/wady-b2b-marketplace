import { cookies } from "next/headers";

import CompleteProfileCard from "@/components/ui/complete-profile-card";
import ProductsList from "@/components/product/products-list";
import { CategoryList } from "@/components/shared/categories";
import { HeroCarousel } from "@/components/shared/hero-carousel";
import { H2, H3, Lead } from "@/components/shared/typography";

export default async function HomePage() {
  const user = (await cookies()).get("user")
    ? JSON.parse((await cookies()).get("user")?.value || "{}")
    : null;

  console.log(user);

  return (
    <>
      <div className="container py-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <H2>
              Welcome
              <span role="img" aria-label="waving hand">
                👋
              </span>
            </H2>
            <Lead className="text-neutral-600">
              Start exploring a seamless shopping experience
            </Lead>
          </div>

          {/* Profile Completion */}
          {!user?.businessProfile && <CompleteProfileCard />}
        </div>
        <div className="mb-10 mt-5">
          <HeroCarousel />
        </div>
        <CategoryList />
        <H3 className="mb-4 mt-10">Products</H3>
        <ProductsList />
      </div>
    </>
  );
}
