import Image from "next/image";
import Link from "next/link";

import { H3 } from "./typography";

// Define category type
type Category = {
  id: number;
  name: string;
  image: string;
  href: string;
};

// Category data
const categories: Category[] = [
  {
    id: 1,
    name: "Fast Food",
    image: "/images/categories/fast-food.png",
    href: "/categories/fast-food",
  },
  {
    id: 2,
    name: "Water",
    image: "/images/categories/water.png",
    href: "/categories/water",
  },
  {
    id: 3,
    name: "Electronic",
    image: "/images/categories/electronic.png",
    href: "/categories/electronic",
  },
  {
    id: 4,
    name: "Coffee",
    image: "/images/categories/cafe.png",
    href: "/categories/coffee",
  },
  {
    id: 5,
    name: "Health & Wellness",
    image: "/images/categories/health.png",
    href: "/categories/health-wellness",
  },
  {
    id: 6,
    name: "Dessert",
    image: "/images/categories/dessert.png",
    href: "/categories/dessert",
  },
  {
    id: 7,
    name: "Groceries",
    image: "/images/categories/groceries.png",
    href: "/categories/groceries",
  },
];

export function CategoryList() {
  return (
    <section>
      <H3 className="mb-4">Category</H3>
      <div className="flex flex-wrap gap-6">
        {categories.map((category) => (
          <Link key={category.id} href="#" className="group relative">
            <span className="absolute start-2 top-2 text-sm font-semibold">
              {category.name}
            </span>
            <Image
              src={category.image}
              alt={category.name}
              width={140}
              height={140}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
