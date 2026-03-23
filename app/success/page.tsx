'use client';

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "../store/cart-store";

export default function SuccessPage() {
     const { clearCart } = useCartStore();

     useEffect(() => {
        clearCart();
     }, [clearCart]);

    return (
           <>
             <div className="container mx-auto px-4 py-8 text-center">
                  <h1 className="text-3xl font-bold text-center mb-4">Payment Successful</h1>
                  <p className="text-lg font-bold mb-4">Thank you for shopping with us we have sent you an email</p>
                  <Link href="/products" className="text-blue-500 hover:underline">
                       Continue Shopping.
                  </Link>
             </div>
           </>
    );
}