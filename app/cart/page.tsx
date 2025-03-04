import type { Metadata } from "next";

import CartPage from "./cart-view";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "View and manage your shopping cart items",
};

export default function Page() {
  return <CartPage />;
}
