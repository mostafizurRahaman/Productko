import React from "react";
import { useQuery } from "@tanstack/react-query";
import Category from "../Category/Category";

const Categories = () => {
   const { data: categories = [], isLoading } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
         const res = await fetch(
            "https://productko-server.vercel.app/categories"
         );
         const data = await res.json();
         return data;
      },
   });

   return (
      <div className="py-14">
         <h2 className="text-4xl font-bold capitalize text-neutral text-center">
            Our Categories
         </h2>
         <p className="text-neutral mt-4 text-capitalize text-xl text-center">
            Productko's all categories are available here. You can see all
            product's here by clicking our categories .{" "}
         </p>
         <div className=" pt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5 md:px-20 ">
            {categories.map((category) => (
               <Category key={category._id} category={category}></Category>
            ))}
         </div>
      </div>
   );
};

export default Categories;
