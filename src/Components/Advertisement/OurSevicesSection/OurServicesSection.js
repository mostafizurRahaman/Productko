import React from "react";
import { FaHome } from "react-icons/fa";
import { AiTwotoneHome } from "react-icons/ai";
import {TiTick}from 'react-icons/ti'; 
const OurServicesSection = () => {
   return (
      <div className="my-20">
        
         <div className="flex items-center justify-center">
                  <h2 className="pb-2 mt-12 mb-6  text-4xl text-accent md:text-5xl font-bold capitalize  text-center border-b-2 border-accent ">
                    Our Services 
                  </h2>
               </div>
         <p className="text-accent text-xl capitalize  text-center mb-6">We provide the best services to customers. </p>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-7 px-20 ">
            <div className="bg-accent text-white p-5  rounded-xl space-y-3">
               <div className="text-7xl ">
                  <FaHome></FaHome>
               </div>
               <h2 className="text-xl font-bold capitalize ">Buy From Home</h2>
               <p>
                  we sell our products online and you can buy a products from
                  home.
               </p>
               <button className="rounded-full hover:bg-secondary hover:text-accent   bg-primary text-white   duration-200 px-5 py-2 font-bold ">
                  see more....
               </button>
            </div>
            <div className="bg-accent text-white p-5  rounded-xl space-y-3" >
               <div className="text-7xl ">
                  <AiTwotoneHome></AiTwotoneHome>
               </div>
               <h2 className="text-xl font-bold capitalize  space-y-3">sell from Home</h2>
               <p>
                  You can sell your products from home without  wasting  your time . We saves you time. 
               </p>
               <button className="rounded-full hover:bg-secondary hover:text-accent   bg-primary text-white   duration-200 px-5 py-2 font-bold ">
                  see more....
               </button>
            </div>
            <div className="bg-accent text-white p-5  rounded-xl  space-y-3">
               <div className="text-7xl "><TiTick></TiTick></div>
               <h2 className="text-xl font-bold capitalize ">Buy Authentic Product</h2>
               <p>
               without hesitation you can buy our prodocuts, because we sells authentic products . 
               </p>
               <button className="rounded-full hover:bg-secondary hover:text-accent   bg-primary text-white   duration-200 px-5 py-2 font-bold ">
                  see more....
               </button>
            </div>
         </div>
      </div>
   );
};

export default OurServicesSection;
