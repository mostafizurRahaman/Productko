import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import useIsAdmin from "../../../hooks/useIsAdmin";
import useIsBuyer from "../../../hooks/useIsBuyer";
import useIsSeller from "../../../hooks/useIsSeller";
import useTitle from "../../../hooks/useTitle";

const Dashboard = () => {
   const { user } = useContext(AuthContext);
   const { isBuyer } = useIsBuyer(user?.email);
   const { isAdmin } = useIsAdmin(user?.email);
   const { isSeller } = useIsSeller(user?.email);
   useTitle(`${user?.displayName}- dashboard`); 
   return (
      <div className="flex items-center justify-center w-full">
         <div className="rounded-2xl  bg-accent   w-96 py-5  flex items-center justify-center flex-col ">
            <div className=" rounded-full ">
               <img src={user.photoURL} alt={user.displayName} className="w-28 h-28 rounded-full"/>
            </div>
            {
               isSeller && 
               <div>
                   <h2 className="text-2xl font-bold text-secondary">Hello, <span className='text-orange-500  capitalize '>{user?.displayName}</span></h2>
                   <p className="text-center text-white  text-xl font-semibold capitalize">Grow your Business.</p>
               </div>
            }
            {
               isBuyer && 
               <div>
                   <h2 className="text-2xl font-bold text-secondary">Hello, <span className='text-orange-500  capitalize '>{user?.displayName}</span></h2>
                   <p className="text-center text-white  text-xl font-semibold capitalize">Manage your orders </p>
               </div>
            }
            {
               isAdmin &&  <div>
               <h2 className="text-2xl font-bold text-secondary">Dear Admin, <span className='text-orange-500  capitalize '>{user?.displayName}</span></h2>
               <p className="text-center text-white  text-xl font-semibold capitalize">Manage Buyers & sellers</p>
                </div>
            }
            
           
         </div>
      </div>
   );
};

export default Dashboard;


// <h1>
// Hello, {user?.displayName}, <br /> Handle Your Orders
// </h1>
// <h1>
// Hello, {user?.displayName}, <br /> handle buyers , sellers &
// products.{" "}
// </h1>