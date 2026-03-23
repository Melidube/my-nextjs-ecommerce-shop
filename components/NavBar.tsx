'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCartIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { useCartStore } from "@/app/store/cart-store";

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const { items } = useCartStore();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    
    useEffect(() => {
         const handleResize = () => {
               if(window.innerWidth >= 768){
                   setMobileOpen(false);
               }
         }

         window.addEventListener("resize", handleResize);

         return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
         <>
            <nav className="bg-black/90 sticky z-50 top-zero text-white border-b border-orange-500">
                 <div className="flex justify-between items-center mx-auto p-4">
                    <Link href="/" className="text-lg font-semibold">style<span className="text-lg text-orange-500">H</span>ouse</Link>
                    {/** nav menu */}
                    <div className="flex space-x-4 items-center">
                        <Link href="/" className="hover:text-orange-500">home</Link>
                        <Link href="/products" className="hover:text-orange-500">products</Link>
                        <Link href="/checkout" className="hover:text-orange-500">checkout</Link>
                    </div>
                    {/** cart items */}
                    <div className="flex space-x-4 items-center">
                         <Link href="/checkout" className="relative">
                             <ShoppingCartIcon className="w-6 h-6" />
                             {
                                <span className="absolute -top-2 -right-2 flex justify-center items-center text-sm text-white bg-red-500 w-4 h-4 rounded-full">
                                   { cartCount }          
                                </span>
                             }
                         </Link>
                         <Button onClick={() => setMobileOpen((prev) => !prev)} variant="ghost" className="md:hidden">
                            {
                                mobileOpen ? (<XMarkIcon className="w-6 h-6"/>) : (<Bars3Icon className="w-6 h-6"/>)
                            }
                         </Button>
                    </div>
                 </div>
                 {/** mobile menu */}
                 {
                    mobileOpen && (
                        <nav className="md:hidden bg-white shadow-md text-black">
                            <ul className="flex flex-col p-2 space-y-2">
                                <li><Link href="/" className="hover:text-orange-500">home</Link></li>
                                <li><Link href="/products" className="hover:text-orange-500">products</Link></li>
                                <li><Link href="/checkout" className="hover:text-orange-500">checkout</Link></li>
                            </ul>
                        </nav>
                    )
                 }
            </nav>
         </>
    );
}