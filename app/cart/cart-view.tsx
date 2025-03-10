"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";

import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { QuantityCounter } from "@/components/ui/quantity-counter";
import { Textarea } from "@/components/ui/textarea";

export default function CartPage() {
  const {
    items,
    totalPrice,
    fetchCart,
    removeCartItem,
    removeCartItemLoading,
  } = useCartStore();
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Your cart</h1>

      {items.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Your cart is empty</p>
          <Button className="mt-4" variant="outline" asChild>
            <Link href="/">Continue Shopping</Link>
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
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center gap-4 py-6"
              >
                {/* {console.log(item)} */}
                <div className="col-span-6 flex gap-4">
                  <div className="size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item?.package?.product?.image || "/placeholder.svg"}
                      alt={item?.package?.product?.nameEn}
                      width={80}
                      height={80}
                      className="size-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {item?.package?.product?.nameEn}
                    </h3>
                    <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                      <p>Type: {item.package.packagingType.nameEn}</p>
                      <p>
                        {`Size: ${item.package.size.quantity} ${item.package.size.unitEn}`}
                      </p>
                      <p>Package: {item.package.variant.nameEn}</p>
                    </div>
                    <button
                      onClick={() => removeCartItem(item.cartItemId)}
                      className="mt-2 text-sm text-primary"
                      disabled={removeCartItemLoading}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="col-span-2 text-center">
                  {formatPrice(Number(item?.package?.pricing?.pricePerUnit))}
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <QuantityCounter initialValue={item.quantity} />
                </div>
                <div className="col-span-2 text-right">
                  {formatPrice(Number(item.totalPrice))}
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
                <span>Total price</span>
                <span>{formatPrice(totalPrice)}</span>
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
