import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Product from "../../Components/Product/Product";
import { accessToken, baseURL } from "../../configs/configs";

const CategoryProducts = () => {
   let { id } = useParams();
   console.log(id);

   const { data: products = [], refetch: categoryProductRefetch } = useQuery({
      queryKey: ["products", id],
      queryFn: async () => {
         const res = await fetch(
            `${baseURL}/product?category=${id}&status[$ne]=booked`,
            {
               headers: {
                  authorization: `${accessToken}`,
               },
            }
         );
         // if (res.status === 403 || res.status === 401) {
         //    logOut();
         //    return;
         // }
         const data = await res.json();
         console.log(data);
         return data.data.products;
      },
   });

   return (
      <div className="px-20 py-5 ">
         <div className="flex items-center justify-center">
            <h2 className="pb-2 my-12  text-4xl text-accent md:text-6xl font-bold capitalize  text-center border-b-2 border-accent ">
               Our Products
            </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full gap-10 ">
            {products.map((product) => (
               <Product
                  key={product._id}
                  product={product}
                  refetch={categoryProductRefetch}
               ></Product>
            ))}
         </div>
      </div>
   );
};

export default CategoryProducts;
