import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import { BiShow, BiHide } from "react-icons/bi";
import './DashboardLayout.css'; 

const DashboardLayout = () => {
   const [sideMenu, setSideMenu] = useState(false);
   return (
      <div className="relative">
         <Navbar></Navbar>
         <div className="w-full flex  relative ">
            <div
               className={`text-secondary  flex flex-col  w-60 bg-accent min-h-screen duration-1000 transition-all md:transition-none absolute md:sticky  md:top-24  md:left-0 z-50 md:z-0  ${
                  sideMenu
                     ? "left-0 bg-opacity-90 md:bg-opacity-100"
                     : "left-[-999px] "
               }`}
            >

                  <Link
                     className=" font-bold text-xl  border-b-2  border-secondary  w-full flex h-12 hover:bg-primary  items-center justify-center text-center"
                     to="/dashboard/addProducts"
                  >
                     ADD Product
                  </Link>            
                  <Link
                     className=" font-bold text-xl  border-b-2  border-secondary  w-full flex h-12 hover:bg-primary  items-center justify-center text-center"
                     to="/dashboard/myProducts"
                  >
                     My products
                  </Link>
                  <Link
                     className=" font-bold text-xl  border-b-2  border-secondary  w-full flex h-12 hover:bg-primary  items-center justify-center text-center"
                     to="/dashboard/my-orders"
                  >
                     My Orders
                  </Link>
                  <Link
                     className=" font-bold text-xl  border-b-2  border-secondary  w-full flex h-12 hover:bg-primary  items-center justify-center text-center"
                     to="/dashboard/sellers"
                  >
                     All sellers
                  </Link>
               
            </div>
            <div className="flex grow w-full p-5 dashboardLayout">
               <Outlet></Outlet>
            </div>
         </div>
         <div
            className="z-50 flex items-center justify-center text-2xl text-secondary rounded-full absolute top-8 right-16  w-8 h-8 bg-accent md:hidden "
            onClick={() => setSideMenu(!sideMenu)}
         >
            {sideMenu ? <BiHide></BiHide> : <BiShow></BiShow>}
         </div>
      </div>
   );
};

export default DashboardLayout;
