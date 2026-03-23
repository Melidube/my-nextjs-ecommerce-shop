import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import stripe from "@/lib/stripe";
import Carousel from "@/components/Carousel";

export default async function Home() {
  const products = await stripe.products.list({
       expand: ["data.default_price"],
       limit: 5
  });

  return (
       <>
          <section className="bg-neutral-100 rounded py-8 sm:py-12">
              <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center px-8 sm:px-16">
                <div className="max-w-md space-y-4">
                   <h2 className="text-3xl font-bold">Welcome To style<span className="text-3xl md:text-4xl text-orange-500">H</span>ouse</h2>
                    <p className="text-lg text-neutral-800 ">
                       Get the latest fashion at a very low cost
                    </p>
                     <Button asChild className="inline-flex justify-center items-center rounded-full px-4 py-2">
                       <Link href="/products" className="inline-flex justify items-center rounded-full bg-black text-white px-4 py-2">
                             Browse Products
                       </Link>
                     </Button>
                </div>
                <Image
                  src={products.data[0].images[0]} 
                  alt="hero image"
                  width= "400"
                  height="400"
                  className="rounded"
                  sizes="(max-width: 450px) 100vw, (max-width: 1200px) 50vw, 800px"
                />
              </div>
          </section>
          <section className="p-3">
               <Carousel  products={products.data} />
          </section>
       </>
  );
}
