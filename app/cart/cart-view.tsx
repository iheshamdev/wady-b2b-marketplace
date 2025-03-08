// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useCartStore } from "@/store/cart-store";

// import { formatCurrency } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { QuantityCounter } from "@/components/ui/quantity-counter";
// import { Textarea } from "@/components/ui/textarea";

// export default function CartPage() {
//   const { items, removeItem, subtotal } = useCartStore();
//   const [specialInstructions, setSpecialInstructions] = useState("");

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="mb-6 text-2xl font-bold">Your cart</h1>

//       {items.length === 0 ? (
//         <div className="py-12 text-center">
//           <p className="text-muted-foreground">Your cart is empty</p>
//           <Button className="mt-4" variant="outline" asChild>
//             <Link href="/">Continue Shopping</Link>
//           </Button>
//         </div>
//       ) : (
//         <>
//           <div className="mb-4 grid grid-cols-12 gap-4 border-b pb-4">
//             <div className="col-span-6 font-medium">Product</div>
//             <div className="col-span-2 text-center font-medium">Price</div>
//             <div className="col-span-2 text-center font-medium">Quantity</div>
//             <div className="col-span-2 text-right font-medium">Total</div>
//           </div>

//           <div className="divide-y">
//             {items.map((item) => (
//               <div
//                 key={item.id}
//                 className="grid grid-cols-12 items-center gap-4 py-6"
//               >
//                 <div className="col-span-6 flex gap-4">
//                   <div className="size-20 shrink-0 overflow-hidden rounded-md bg-muted">
//                     <Image
//                       src={item.image || "/placeholder.svg"}
//                       alt={item.name}
//                       width={80}
//                       height={80}
//                       className="size-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <h3 className="font-medium">{item.name}</h3>
//                     <div className="mt-1 space-y-1 text-sm text-muted-foreground">
//                       <p>Type: {item.type}</p>
//                       <p>Size: {item.size}</p>
//                       <p>Package: {item.package}</p>
//                     </div>
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="mt-2 text-sm text-primary"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//                 <div className="col-span-2 text-center">
//                   {formatCurrency(item.price)}
//                   {item.discount && (
//                     <div className="mt-1 text-sm text-red-500">
//                       {item.discount.percentage}% (
//                       {formatCurrency(item.discount.amount)})
//                     </div>
//                   )}
//                 </div>
//                 <div className="col-span-2 flex items-center justify-center">
//                   <QuantityCounter initialValue={2} />
//                 </div>
//                 <div className="col-span-2 text-right">
//                   {formatCurrency(item.totalPrice)}
//                   {item.discount && (
//                     <div className="text-sm text-muted-foreground">
//                       {formatCurrency(item.discount.amount * item.quantity)}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
//             <div>
//               <h3 className="mb-2 font-medium">Order special instructions</h3>
//               <Textarea
//                 placeholder="Add any special instructions for your order here"
//                 className="h-32"
//                 value={specialInstructions}
//                 onChange={(e) => setSpecialInstructions(e.target.value)}
//               />
//             </div>
//             <div className="md:ml-auto md:w-80">
//               <div className="flex justify-between py-2 font-medium">
//                 <span>Subtotal</span>
//                 <span>{formatCurrency(subtotal)}</span>
//               </div>
//               <p className="mb-4 text-sm text-muted-foreground">
//                 Taxes and Shipping calculated at checkout
//               </p>
//               <Button className="w-full" size="lg">
//                 Checkout
//               </Button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { postApi } from "@/lib/http";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CartPage() {
  const { items, totalPrice, fetchCart, isLoading } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleQuantityChange = async (
    cartItemId: number,
    currentQuantity: number,
    increment: boolean,
  ) => {
    const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;

    if (newQuantity < 1) return;

    try {
      const { error } = await postApi("cart/update-quantity", {
        cartItemId,
        quantity: newQuantity,
      });

      await fetchCart();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      const { response, error } = await postApi("cart/remove-item", {
        cartItemId,
      });

      await fetchCart();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex h-[400px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-8">
        <h1 className="mb-6 text-2xl font-semibold">Your cart</h1>
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-2xl font-semibold">Your cart</h1>

      <div className="grid gap-6">
        {/* Header */}
        <div className="grid-cols-cart hidden items-center gap-6 border-b pb-4 md:grid">
          <div className="font-medium">Product</div>
          <div className="font-medium">Price</div>
          <div className="font-medium">Quantity</div>
          <div className="text-right font-medium">Total</div>
        </div>

        {/* Cart Items */}
        <div className="grid gap-6">
          {items.map((item) => (
            <div
              key={item.cartItemId}
              className="md:grid-cols-cart grid items-center gap-4 border-b pb-4 md:gap-6"
            >
              {/* Product */}
              <div className="grid items-start gap-4 md:flex md:items-center">
                <div className="relative aspect-square w-20 overflow-hidden rounded-lg bg-neutral-50">
                  <Image
                    src={item.package.product.image || "/placeholder.svg"}
                    alt={item.package.product.nameEn}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">{item.package.product.nameEn}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Type: {item.package.variant.nameEn}</p>
                    <p>Size: {item.package.size.nameEn}</p>
                    <p>Package: {item.package.packagingType.nameEn}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.cartItemId)}
                    className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="text-sm md:text-base">
                {item.package.pricing.pricePerUnit} QAR
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    handleQuantityChange(item.cartItemId, item.quantity, false)
                  }
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    handleQuantityChange(item.cartItemId, item.quantity, true)
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Total */}
              <div className="text-right font-medium">
                {item.totalPrice} QAR
              </div>
            </div>
          ))}
        </div>

        {/* Order Instructions */}
        <div className="mt-6">
          <label
            htmlFor="instructions"
            className="mb-2 block text-sm font-medium"
          >
            Order special instructions
          </label>
          <Textarea
            id="instructions"
            placeholder="Add any special instructions for your order..."
            className="max-w-xl"
          />
        </div>

        {/* Summary */}
        <div className="mt-6 md:ml-auto md:w-72">
          <div className="rounded-lg bg-neutral-50 p-4">
            <div className="mb-2 flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">{totalPrice} QAR</span>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Taxes and Shipping calculated at checkout
            </p>
            <Button className="w-full bg-[#8B1E3F] hover:bg-[#7A1A37]">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
