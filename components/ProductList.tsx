'use client';

import Stripe from "stripe";
import { useState,} from "react";
import ProductCard from "./ProductCard";

interface ProductDetailsProps {
    products: Stripe.Product[]
}

export default function ProductList({ products }: ProductDetailsProps) {
     const [searchTerm, setSearchTerm] = useState<string>("");

     const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value);
     }

     
     const filteredProducts = products.filter((product) => {
             const term = searchTerm.toLowerCase();
             const nameMatch = product.name.toLowerCase().includes(term);
             const descriptionMatch = product.description ? product.description.toLowerCase().includes(term) : false;

             return nameMatch || descriptionMatch;
     });

    return (
         <>
           <div>
                <div className="mb-6 flex justify-center items-center">
                    <input 
                     type="text" 
                     onChange={handleOnChange} 
                     value={searchTerm}
                     placeholder="Search...." 
                     className="px-4 py-2 rounded w-full max-w-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      {
                         filteredProducts.map((product, key) => {
                              return <li key={key}>
                                   <ProductCard product={product} />
                              </li>
                         })
                      }
                 </ul>

           </div>
         </>
    );
}