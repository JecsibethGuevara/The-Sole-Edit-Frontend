"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    console.log("Checking out with the following items:", cartItems);
    clearCart();
  };

  const handlePay = () => {
    console.log("Payment functionality not yet implemented.");
    // This button doesn't work yet, as requested.
  };

  return (
    <main className="w-full bg-background text-foreground">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <Link href="/home">
            <Button variant="ghost">Continue Shopping</Button>
          </Link>
        </div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
              <p className="text-lg font-semibold">Total:</p>
              <p className="text-lg font-semibold">${total.toFixed(2)}</p>
            </div>
            <div className="mt-4">
              <Button onClick={handlePay} className="w-full">
                Pay Now
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}