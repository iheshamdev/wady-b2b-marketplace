// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// // Types based on the API response
// export type ProductInfo = {
//   id: number;
//   nameEn: string;
//   nameAr: string;
//   image: string;
//   category?: {
//     id: number;
//     nameEn: string;
//     nameAr: string;
//   };
//   brand?: {
//     id: number;
//     nameEn: string;
//     nameAr: string;
//   };
// };

// export type VariantInfo = {
//   id: number;
//   nameEn: string;
//   nameAr: string;
// };

// export type SizeInfo = {
//   id: number;
//   nameEn: string;
//   nameAr: string;
// };

// export type PackagingTypeInfo = {
//   id: number;
//   nameEn: string;
//   nameAr: string;
// };

// export type PricingInfo = {
//   totalPrice: number;
//   pricePerUnit: number;
// };

// export type PackageInfo = {
//   id: number;
//   nameEn: string;
//   nameAr: string;
//   product: ProductInfo;
//   variant: VariantInfo;
//   size: SizeInfo;
//   packagingType: PackagingTypeInfo;
//   pricing: PricingInfo;
// };

// export type CartItem = {
//   cartItemId: number;
//   package: PackageInfo;
//   quantity: number;
//   totalPrice: number;
// };

// export type CartResponse = {
//   cartId: number;
//   items: CartItem[];
//   totalPrice: number;
// };

// type CartState = {
//   cartId: number;
//   items: CartItem[];
//   totalItems: number;
//   totalPrice: number;
//   isLoading: boolean;

//   // Actions
//   setCart: (cart: CartResponse) => void;
//   addItem: (item: CartItem) => void;
//   removeItem: (cartItemId: number) => void;
//   updateQuantity: (cartItemId: number, quantity: number) => void;
//   clearCart: () => void;
//   setLoading: (isLoading: boolean) => void;

//   // Fetch cart from API
//   fetchCart: () => Promise<void>;
// };

// export const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       cartId: 0,
//       items: [],
//       totalItems: 0,
//       totalPrice: 0,
//       isLoading: false,

//       setCart: (cart) =>
//         set({
//           cartId: cart.cartId,
//           items: cart.items,
//           totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
//           totalPrice: cart.totalPrice,
//         }),

//       addItem: (item) =>
//         set((state) => {
//           const existingItemIndex = state.items.findIndex(
//             (i) => i.cartItemId === item.cartItemId,
//           );

//           let newItems = [...state.items];

//           if (existingItemIndex >= 0) {
//             // Update existing item quantity
//             newItems[existingItemIndex] = {
//               ...newItems[existingItemIndex],
//               quantity: newItems[existingItemIndex].quantity + item.quantity,
//               totalPrice:
//                 newItems[existingItemIndex].package.pricing.pricePerUnit *
//                 (newItems[existingItemIndex].quantity + item.quantity),
//             };
//           } else {
//             // Add new item
//             newItems = [...newItems, item];
//           }

//           const totalItems = newItems.reduce(
//             (sum, item) => sum + item.quantity,
//             0,
//           );
//           const totalPrice = newItems.reduce(
//             (sum, item) => sum + item.totalPrice,
//             0,
//           );

//           return { items: newItems, totalItems, totalPrice };
//         }),

//       removeItem: (cartItemId) =>
//         set((state) => {
//           const newItems = state.items.filter(
//             (item) => item.cartItemId !== cartItemId,
//           );
//           const totalItems = newItems.reduce(
//             (sum, item) => sum + item.quantity,
//             0,
//           );
//           const totalPrice = newItems.reduce(
//             (sum, item) => sum + item.totalPrice,
//             0,
//           );

//           return { items: newItems, totalItems, totalPrice };
//         }),

//       updateQuantity: (cartItemId, quantity) =>
//         set((state) => {
//           const newItems = state.items.map((item) => {
//             if (item.cartItemId === cartItemId) {
//               return {
//                 ...item,
//                 quantity,
//                 totalPrice: item.package.pricing.pricePerUnit * quantity,
//               };
//             }
//             return item;
//           });

//           const totalItems = newItems.reduce(
//             (sum, item) => sum + item.quantity,
//             0,
//           );
//           const totalPrice = newItems.reduce(
//             (sum, item) => sum + item.totalPrice,
//             0,
//           );

//           return { items: newItems, totalItems, totalPrice };
//         }),

//       clearCart: () =>
//         set({
//           cartId: 0,
//           items: [],
//           totalItems: 0,
//           totalPrice: 0,
//         }),

//       setLoading: (isLoading) => set({ isLoading }),

//       fetchCart: async () => {
//         const state = get();
//         state.setLoading(true);

//         try {
//           const response = await fetch("/api/cart");

//           if (!response.ok) {
//             throw new Error("Failed to fetch cart");
//           }

//           const cart: CartResponse = await response.json();
//           state.setCart(cart);
//         } catch (error) {
//           console.error("Error fetching cart:", error);
//         } finally {
//           state.setLoading(false);
//         }
//       },
//     }),
//     {
//       name: "cart-storage",
//     },
//   ),
// );

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
