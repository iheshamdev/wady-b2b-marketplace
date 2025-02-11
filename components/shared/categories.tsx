import Image from "next/image";
import Link from "next/link";

// Define category type
type Category = {
  id: number;
  name: string;
  image: string;
  bgColor: string;
  href: string;
};

// Category data
const categories: Category[] = [
  {
    id: 1,
    name: "Fast Food",
    image: "/images/categories/fast-food.png",
    bgColor: "bg-[#FFF5E9]",
    href: "/categories/fast-food",
  },
  {
    id: 2,
    name: "Water",
    image: "/images/categories/water.png",
    bgColor: "bg-[#EBF4FF]",
    href: "/categories/water",
  },
  {
    id: 3,
    name: "Electronic",
    image: "/images/categories/electronic.png",
    bgColor: "bg-[#F5F5F5]",
    href: "/categories/electronic",
  },
  {
    id: 4,
    name: "Coffee",
    image: "/images/categories/cafe.png",
    bgColor: "bg-[#FFF3E9]",
    href: "/categories/coffee",
  },
  {
    id: 5,
    name: "Health & Wellness",
    image: "/images/categories/health.png",
    bgColor: "bg-[#EBFFF3]",
    href: "/categories/health-wellness",
  },
  {
    id: 6,
    name: "Dessert",
    image: "/images/categories/dessert.png",
    bgColor: "bg-[#FFE9F3]",
    href: "/categories/dessert",
  },
  {
    id: 7,
    name: "Groceries",
    image: "/images/categories/groceries.png",
    bgColor: "bg-[#FFFAE9]",
    href: "/categories/groceries",
  },
];

export function CategoryList() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Category</h2>
      <div className="flex flex-wrap gap-6">
        {categories.map((category) => (
          <Link key={category.id} href="#" className="group relative">
            <span className="absolute start-2 top-2 text-sm font-semibold text-neutral-800">
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
