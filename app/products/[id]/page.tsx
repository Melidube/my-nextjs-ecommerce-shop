import stripe from "@/lib/stripe";
import ProductDetails from "@/components/ProductDetails";


interface ProductDetailsPageProps {
    params: Promise<{id: string}>
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
     const { id } = await params;

     const product = await stripe.products.retrieve(id, {
         expand: ["default_price"]
     });


     const plainProducts = JSON.parse(JSON.stringify(product));

    return (
          <>
            <ProductDetails product={plainProducts} /> 
          </>
    )
}