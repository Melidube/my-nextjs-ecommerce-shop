'use client';

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/app/store/cart-store";

interface ProductDetailsProps {
    product: Stripe.Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const price = product.default_price as Stripe.Price;
    const {items, addItem, removeItem } = useCartStore();
    const cartItem = items.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleOnClick = () => {
          addItem({
             id: product.id,
             name: product.name,
             price: price.unit_amount as number,
             imageUrl: product.images ? product.images[0] : null,
             quantity: 1
          });
    }

    return (
        <>
            <div className="container mx-auto flex flex-col items-center  md:flex-row px-4 py-8 gap-8">
                {
                    product.images && product.images[0] && (
                         <div className="relative h-90 w-full md:w-1/2 rounded overflow-hidden">
                             <Image
                              src={product.images[0]}
                              alt={product.name}
                              layout="fill"
                              objectFit="cover"
                              className="transition duration-300 hover:opacity-90" 
                             />
                         </div>
                    )
                }
                <div className="md:w-1/2">
                   <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                   {
                     product.description && (
                        <p className="text-sm text-gray-600 font-bold">{product.description}</p>
                     )
                   }
                   {
                      price && price.unit_amount && (
                         <p className="text-lg text-gray-900 font-bold">{(price.unit_amount / 100).toFixed(2)}</p>
                      )
                   }
                   <div className="flex space-x-4 items-center">
                        <Button variant="outline" onClick={() => removeItem(product.id) }>-</Button>
                           <span className="font-semibold text-lg">{ quantity }</span>
                        <Button variant="default" onClick={handleOnClick}>+</Button>
                   </div>
                </div>
            </div>
        </>
    );
}