import { Card, CardContent, CardTitle, CardHeader } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { Button } from "./ui/button";

interface  ProductCardProps {
    product: Stripe.Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const price = product.default_price as Stripe.Price;

    console.log(product);

    return (
        <>
           <Link href={`/products/${product.id}`} className="block h-full">
                <Card className="flex flex-col border-gray-300 group hover:shadow-2xl h-full ">
                    {
                        product.images && product.images[0] && (
                            <div className="relative h-80 w-full">
                                <Image
                                src={product.images[0]} 
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                                className="transition-opacity duration-300 group-hover:opacity-90 rounded-t-lg"
                                />
                            </div>
                        )
                    }
                    <CardHeader className="p-4">
                         <CardTitle className="text-xl font-bold text-gray-800">
                             { product.name }
                         </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between grow p-4">
                       {
                          product.description && (
                            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                          )
                       }
                       {
                          price  && price.unit_amount && (
                              <p className="text-lg text-gray-900 font-semibold">{(price.unit_amount / 100).toFixed(2)}</p>
                          )
                       }
                       <Button className="w-full bg-black text-white mt-4">View Details</Button>
                    </CardContent>
                </Card>
           </Link>
           
        </>
    );
}