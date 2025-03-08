import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";

import { cn } from "@/lib/utils";

import { P } from "../shared/typography";
import { Icons } from "../ui/icons";

const navItems = [
  {
    id: "store",
    name: "Store",
    pathname: "/",
    icon: <Icons.Store size={20} />,
  },
  {
    id: "order",
    name: "Order",
    pathname: "/orders",
    icon: <Icons.Logs size={20} />,
  },
  {
    id: "wishlist",
    name: "Wishlist",
    pathname: "/wishlist",
    icon: <Icons.Heart size={20} />,
  },
  {
    id: "account",
    name: "My Account",
    pathname: "/profile",
    icon: <Icons.User size={20} />,
  },
  {
    id: "cart",
    name: "Cart",
    pathname: "/cart",
    icon: <Icons.ShoppingBag size={20} />,
  },
];
export default function NavMenu() {
  const pathname = usePathname();
  const { totalItems } = useCartStore();

  return (
    <nav className="flex items-center justify-center gap-3">
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={item.pathname}
          className={cn(
            "relative flex items-center gap-2 rounded px-4 py-2 text-sm font-medium text-white hover:bg-primary-600",
            pathname === item.pathname ? "bg-primary-600" : "bg-transparent",
          )}
        >
          {item.icon}
          <P>{item.name}</P>
          {item.id === "cart" && totalItems > 0 && (
            <span className="absolute left-2 top-2 flex size-4 items-center justify-center rounded-full bg-[#F0BC42] text-xs font-medium text-primary">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
          {/* {item.id === "cart" && "2"} */}
        </Link>
      ))}
    </nav>
  );
}
