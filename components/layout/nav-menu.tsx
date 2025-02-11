import { Link } from "@/i18n/routing";

import { cn } from "@/lib/utils";

import { P } from "../shared/typography";
import { Icons } from "../ui/icons";

const navItems = [
  {
    id: "store",
    name: "Store",
    url: "#",
    icon: <Icons.Store size={20} />,
    isActive: true,
  },
  {
    id: "order",
    name: "Order",
    url: "#",
    icon: <Icons.Logs size={20} />,
    isActive: false,
  },
  {
    id: "favourite",
    name: "Favourite",
    url: "#",
    icon: <Icons.Heart size={20} />,
    isActive: false,
  },
  {
    id: "cart",
    name: "Cart",
    url: "#",
    icon: <Icons.ShoppingBag size={20} />,
    isActive: false,
  },
];
export default function NavMenu() {
  return (
    <nav className="flex items-center justify-center gap-3">
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          className={cn(
            "flex items-center gap-2 rounded px-4 py-2 text-sm font-medium text-white hover:bg-primary-600",
            item.isActive ? "bg-primary-600" : "bg-transparent",
          )}
        >
          {item.icon}
          <P>{item.name}</P>
        </Link>
      ))}
    </nav>
  );
}
