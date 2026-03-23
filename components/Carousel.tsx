'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Stripe from "stripe";
import Image from "next/image";

interface CarouselProps {
  products: Stripe.Product[]
}

export default function Carousel({ products }: CarouselProps) {
     const [current, setCurrent ] = useState<number>(0);

     useEffect(() => {
         const  interval = setInterval(() => {
              setCurrent((prev) => (prev + 1) % products.length);
         }, 3000);

         return () => clearInterval(interval);
     }, [products.length]);

     const currentProduct = products[current];
     const price = currentProduct.default_price as Stripe.Price;

    return (
       <>
           <Card className="relative rounded-lg overflow-hidden shadow-md bg-gray-300">
             {
               currentProduct.images && currentProduct.images[0] && (
                  <div className="relative w-full h-80">
                      <Image
                        src={currentProduct.images[0]}
                        alt={currentProduct.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-opacity duration-500 ease-in-out" 
                      />
                  </div>
               )
             }
             <CardContent className="flex flex-col justify-center items-center absolute inset-0 bg-black bg-opacity-50">
                   <CardTitle className="text-3xl text-white font-bold mb-2">
                       {currentProduct.name}
                   </CardTitle>
                   {
                     price && price.unit_amount && (
                        <p className="text-lg text-white font-semibold">${(price.unit_amount / 100).toFixed(2)}</p>
                     )
                   }
             </CardContent>
           </Card>
       </>
    )
}