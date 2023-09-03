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
         console.log(data);
         return data;
      },
   });

   return (
      <div className="py-14">
         <div className="flex items-center justify-center">
            <h2 className="pb-2 mt-12 mb-6  text-4xl text-accent md:text-5xl font-bold capitalize  text-center border-b-2 border-accent ">
               Our Categories
            </h2>
         </div>
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
