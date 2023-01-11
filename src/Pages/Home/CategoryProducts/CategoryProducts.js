import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import Product from "../../Shared/Product/Product";

const CategoryProducts = () => {
   const { logOut } = useContext(AuthContext);
   // const products = useLoaderData();
   let { id } = useParams();
   console.log(id);

   const { data: products = [] } = useQuery({
      queryKey: ["products", id],
      queryFn: async () => {
         const res = await fetch(
            `https://productko-server.vercel.app/categories/${id}`,
            {
               headers: {
                  authorization: `bearer ${localStorage.getItem(
                     "productKoToken"
                  )}`,
               },
            }
         );
         if (res.status === 403 || res.status === 401) {
            logOut();
            return;
         }
         const data = await res.json();
         return data;
      },
   });
   console.log(products);
   return (
      <div className="px-20 py-5 ">
         <div className="flex items-center justify-center">
            <h2 className="pb-2 my-12  text-4xl text-accent md:text-6xl font-bold capitalize  text-center border-b-2 border-accent ">
               Our Products
            </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full gap-10 ">
            {products.map((product) => (
               <Product key={product._id} product={product}></Product>
            ))}
         </div>
      </div>
   );
};

export default CategoryProducts;
