import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import { baseURL } from "../../configs/configs";

const Advertisement = () => {
   const { data: products = [], isLoading } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
         const res = await fetch(
            `${baseURL}/product?isAdvertised=true&page=1&limit=6`
         );
         const data = await res.json();
         console.log(data);
         return data.data.products;
      },
   });

   if (isLoading) {
      return <Loading></Loading>;
   }

   return (
      <>
         {products.length > 0 && (
            <div className="px-20 py-5 ">
               <div className="flex items-center justify-center">
                  <h2 className="pb-2 my-12  text-4xl text-accent md:text-5xl font-bold capitalize  text-center border-b-2 border-accent ">
                     Our Advertisements
                  </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full gap-10 ">
                  {products.map((product) => (
                     <Product key={product._id} product={product}></Product>
                  ))}
               </div>
            </div>
         )}
      </>
   );
};

export default Advertisement;
