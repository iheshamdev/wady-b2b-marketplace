import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AddToCartRequest, CartItem, CartResponse } from "@/types/cart";
import { deleteApi, getApi, postApi } from "@/lib/http";

type CartState = {
  cartId: number;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  fetchCartLoading: boolean;
  addCartItemLoading: boolean;
  removeCartItemLoading: boolean;

  // Actions
  setAddCartItemLoading: (addCartItemLoading: boolean) => void;
  setFetchCartLoading: (fetchCartLoading: boolean) => void;
  setRemoveCartItemLoading: (removeCartItemLoading: boolean) => void;
  setCart: (cart: CartResponse) => void;
  removeCartItem: (cartItemId: number) => void;
  addCartItem: ({ packageId, quantity }: AddToCartRequest) => void;
  // Fetch cart from API
  fetchCart: () => Promise<void>;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: 0,
      items: [],
      totalPrice: 0,
      totalItems: 0,
      fetchCartLoading: false,
      addCartItemLoading: false,
      removeCartItemLoading: false,

      setCart: (cart) =>
        set({
          cartId: cart.cartId,
          items: cart.items,
          totalItems: cart.items.length,
          totalPrice: cart.totalPrice,
        }),

      setRemoveCartItemLoading: (removeCartItemLoading) =>
        set({ removeCartItemLoading }),
      removeCartItem: async (cartItemId: number) => {
        const state = get();
        state.setRemoveCartItemLoading(true);
        const { response } = await deleteApi<CartResponse>(
          `cart/remove/${cartItemId}`,
        );
        if (response) {
          state.setCart(response);
        } else {
          toast.error(
            "Something went wrong, please try again to remove the item from the cart",
          );
        }
        state.setRemoveCartItemLoading(false);
      },

      setAddCartItemLoading: (addCartItemLoading) =>
        set({ addCartItemLoading }),
      addCartItem: async ({ packageId, quantity }: AddToCartRequest) => {
        const state = get();
        state.setAddCartItemLoading(true);
        const { response } = await postApi<CartResponse>("cart/add", {
          packageId,
          quantity,
        });
        if (response) {
          toast.success("Added to cart successfully");
          state.setCart(response);
        } else {
          toast.error("Something went wrong, please try again");
        }
        state.setAddCartItemLoading(false);
      },

      setFetchCartLoading: (fetchCartLoading) => set({ fetchCartLoading }),
      fetchCart: async () => {
        const state = get();
        state.setFetchCartLoading(true);
        const { response } = await getApi<CartResponse>("cart");

        if (response) {
          state.setCart(response);
        }
        state.setFetchCartLoading(false);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        totalItems: state.totalItems,
      }),
    },
  ),
);
