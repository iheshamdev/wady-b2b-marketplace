import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CartItemSchema, type CartState } from "@/types/cart";

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: "1",
          name: "Puck Cream Cheese - 12 Jars x 500g per carton",
          price: 24,
          quantity: 2,
          image: "/placeholder.svg?height=80&width=80",
          type: "low fat",
          size: "510g",
          package: "Glass jar",
          totalPrice: 48,
        },
        {
          id: "2",
          name: "Puck Cream Cheese - 12 Jars x 500g per carton",
          price: 24,
          quantity: 4,
          image: "/placeholder.svg?height=80&width=80",
          type: "low fat",
          size: "510g",
          package: "Glass jar",
          totalPrice: 96,
        },
        {
          id: "3",
          name: "Puck Cream Cheese - 12 Jars x 500g per carton",
          price: 24,
          quantity: 2,
          image: "/placeholder.svg?height=80&width=80",
          type: "low fat",
          size: "510g",
          package: "Glass jar",
          totalPrice: 48,
          discount: {
            percentage: 15,
            amount: 10,
          },
        },
      ],

      addItem: (item) => {
        const parsedItem = CartItemSchema.parse(item);
        const { items } = get();
        const existingItem = items.find((i) => i.id === parsedItem.id);

        if (existingItem) {
          return set({
            items: items.map((i) =>
              i.id === parsedItem.id
                ? {
                    ...i,
                    quantity: i.quantity + parsedItem.quantity,
                    totalPrice: (i.quantity + parsedItem.quantity) * i.price,
                  }
                : i,
            ),
          });
        }

        set({
          items: [
            ...items,
            {
              ...parsedItem,
              totalPrice: parsedItem.quantity * parsedItem.price,
            },
          ],
        });
      },

      updateQuantity: (id, quantity) => {
        const { items } = get();
        set({
          items: items.map((item) =>
            item.id === id
              ? { ...item, quantity, totalPrice: quantity * item.price }
              : item,
          ),
        });
      },

      removeItem: (id) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== id) });
      },

      clearCart: () => set({ items: [] }),

      get subtotal() {
        return get().items.reduce((total, item) => total + item.totalPrice, 0);
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);

export { useCartStore };
