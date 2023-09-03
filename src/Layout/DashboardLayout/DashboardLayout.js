import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { BiShow, BiHide } from "react-icons/bi";
import "./DashboardLayout.css";
import useIsAdmin from "../../hooks/useIsAdmin";
import { AuthContext } from "../../Context/AuthProvider";
import useIsBuyer from "../../hooks/useIsBuyer";
import useIsSeller from "../../hooks/useIsSeller";
import Loading from "../../Components/Loading/Loading";

const DashboardLayout = () => {
   const [sideMenu, setSideMenu] = useState(false);
   const { user, loading } = useContext(AuthContext);
   const { isAdmin, adminLoading } = useIsAdmin(user?.email);
   const { isBuyer, buyerLoading } = useIsBuyer(user?.email);
   const { isSeller, sellerLoading } = useIsSeller(user?.email);

   if (loading || adminLoading || buyerLoading || sellerLoading) {
      return <Loading></Loading>;
   }
   return (
      <div className="relative">
         <Navbar></Navbar>
         <div className="w-full flex  relative ">
            <div
               className={`text-secondary  flex flex-col  w-60 bg-accent min-h-screen duration-1000 transition-all md:transition-none fixed md:sticky  md:top-24  md:left-0 z-40 md:z-0 ${
                  sideMenu
                     ? "left-0 bg-opacity-90 md:bg-opacity-100"
                     : "left-[-999px] "
               }`}
            >
               {isSeller && (
                  <>
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
                  </>
               )}

               {isBuyer && (
                  <Link
                     className=" font-bold text-xl  border-b-2  border-secondary  w-full flex h-12 hover:bg-primary  items-center justify-center text-center"
                     to="/dashboard/my-orders"
                  >
                     My Orders
                  </Link>
               )}

               {isAdmin && (
                  <>
                     <Link
                        className=" font-bold text-xl  border-b-2  border-secondary  w-full flex h-12 hover:bg-primary  items-center justify-center text-center"
                        to="/dashboard/sellers"
                     >
                        All sellers
                     </Link>
                     <Link
                        className=" font-bold text-xl  border-b-2  border-secondary  w-full flex h-12 hover:bg-primary  items-center justify-center text-center"
                        to="/dashboard/buyers"
                     >
                        All Buyers
                     </Link>
                     <Link
                        className=" font-bold text-xl  border-b-2  border-secondary  w-full flex h-12 hover:bg-primary  items-center justify-center text-center"
                        to="/dashboard/reported"
                     >
                        Reported Items
                     </Link>
                  </>
               )}
            </div>
            <div className="flex grow w-full p-5 dashboardLayout min-h-screen">
               <Outlet></Outlet>
            </div>
         </div>
         <div
            className=" flex items-center justify-center text-2xl text-secondary rounded-full  fixed z-50  top-8 right-20  w-8 h-8 bg-accent md:hidden "
            onClick={() => setSideMenu(!sideMenu)}
         >
            {sideMenu ? <BiHide></BiHide> : <BiShow></BiShow>}
         </div>
      </div>
   );
};

export default DashboardLayout;
