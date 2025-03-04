"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { Minus, Plus } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { QuantityCounter } from "@/components/ui/quantity-counter";
import { Textarea } from "@/components/ui/textarea";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();
  const [specialInstructions, setSpecialInstructions] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Your cart</h1>

      {items.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Your cart is empty</p>
          <Button className="mt-4" variant="outline" asChild>
            <a href="/">Continue Shopping</a>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-4 grid grid-cols-12 gap-4 border-b pb-4">
            <div className="col-span-6 font-medium">Product</div>
            <div className="col-span-2 text-center font-medium">Price</div>
            <div className="col-span-2 text-center font-medium">Quantity</div>
            <div className="col-span-2 text-right font-medium">Total</div>
          </div>

          <div className="divide-y">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center gap-4 py-6"
              >
                <div className="col-span-6 flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                      <p>Type: {item.type}</p>
                      <p>Size: {item.size}</p>
                      <p>Package: {item.package}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-2 text-sm text-primary"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="col-span-2 text-center">
                  {formatCurrency(item.price)}
                  {item.discount && (
                    <div className="mt-1 text-sm text-red-500">
                      {item.discount.percentage}% (
                      {formatCurrency(item.discount.amount)})
                    </div>
                  )}
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <QuantityCounter initialValue={2} />
                </div>
                <div className="col-span-2 text-right">
                  {formatCurrency(item.totalPrice)}
                  {item.discount && (
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(item.discount.amount * item.quantity)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-medium">Order special instructions</h3>
              <Textarea
                placeholder="Add any special instructions for your order here"
                className="h-32"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
            <div className="md:ml-auto md:w-80">
              <div className="flex justify-between py-2 font-medium">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Taxes and Shipping calculated at checkout
              </p>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
