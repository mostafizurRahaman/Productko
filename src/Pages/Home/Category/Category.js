import React from "react";
import { Link } from "react-router-dom";
import NavbarButton from "../../../Components/NavbarButton";
import "./Category.css"; 
const Category = ({ category }) => {
   const { category_name, _id, image } = category;
   return (
      <div className="transition-all duration-[2s] border-1 border-black bg-neutral  shadow-sm hover:shadow-md  shadow-neutral   flex items-center justify-center flex-col p-5 pt-10 rounded-2xl gap-7 category-card">
         <div className="overflow-hidden flex items-center justify-center h-48 rounded-full  w-48">
            <img
               src={image}
               alt={category_name}
               className="h-48 rounded-full  w-48"

            />
         </div>
         <div className="w-full flex items-center justify-between ">
            <h2 className='text-secondary  font-bold text-4xl  capitalize '>{category_name}</h2>
            <Link to={`/category/${_id}`}>
               <NavbarButton btnContent="see products"></NavbarButton>
            </Link>
         </div>
      </div>
   );
};

export default Category;
