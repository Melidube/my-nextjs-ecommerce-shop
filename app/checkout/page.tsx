'use client';

import { useCartStore } from "../store/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { checkOut } from "./checkout-action";


export default function CheckOut() {
      const { items, removeItem, addItem } = useCartStore();
      const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0 );
      
      if(items.length === 0){
          return (
             <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold  mb-4">Your Cart is Empty</h1>
             </div>
        );   
      }

      return (
             <>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8 text-center">
                        Checkout
                    </h1>
                    <Card className="max-w-md mx-auto mb-8">
                        <CardHeader>
                             <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ul className="space-y-4">
                                 {
                                    items.map((item, key) => {
                                       return <li key={key} className="flex flex-col gap-2 border-b pb-2">
                                           <div className="flex justify-between">
                                              <span className="font-bold">{item.name}</span>
                                              <span className="font-semibold">
                                                {((item.price * item.quantity) / 100).toFixed(2)}
                                              </span>
                                           </div>
                                           <div className="flex items-center gap-3">
                                             <Button onClick={() => removeItem(item.id)} variant="outline" size="sm">
                                                -
                                             </Button>
                                              <span className="text-lg font-bold">{total}</span>
                                             <Button onClick={() => addItem({...item, quantity: 1})} variant="default" size="sm">+</Button>
                                           </div>
                                       </li>
                                    })
                                 }
                             </ul>
                             <div className="mt-4 border-t pt-2text-lg font-bold">
                                Total: { (total / 100).toFixed(2)}
                             </div>
                        </CardContent>
                    </Card>
                    <form action={checkOut} className="max-w-md mx-auto">
                        <input type="hidden" name="items" value={JSON.stringify(items)} />
                        <Button type="submit" variant="default" className="w-full">
                            Proceed To Payment
                        </Button>
                    </form>
                </div>
             </>
      )
 }