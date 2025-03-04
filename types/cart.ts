import { z } from "zod";

export const CartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  image: z.string(),
  type: z.string().optional(),
  size: z.string().optional(),
  package: z.string().optional(),
  totalPrice: z.number().positive(),
  discount: z
    .object({
      percentage: z.number(),
      amount: z.number().positive(),
    })
    .optional(),
});

export type CartItem = z.infer<typeof CartItemSchema>;

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  readonly subtotal: number;
}
