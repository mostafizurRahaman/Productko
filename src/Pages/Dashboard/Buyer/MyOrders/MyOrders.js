import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";

const MyOrders = () => {
   const { user } = useContext(AuthContext);
   const { data: orders = [] } = useQuery({
      queryKey: ["orders", user?.email],
      queryFn: async () => {
         const res = await fetch(
            `http://localhost:5000/bookings?email=${user?.email}`
         );
         const data = await res.json();
         return data;
      },
   });

   console.log(orders);
   return (
      <div className="w-full">
         <div className="flex items-center justify-center ">
            <h2 className="text-center  text-3xl md:text-4xl  font-bold inline-block text-secondary   border-b-2 border-secondary   pb-3 uppercase ">
               My orders
            </h2>
         </div>
         <div className="mt-5 ">
            <div className="overflow-x-auto w-full ">
               <table className="table table-compact w-full text-center ">
                  <thead className="text-xl  md:text-2xl  font-semibold text-primary bg-accent ">
                     <tr>
                        <th>S.I.</th>
                        <th>Buyer Name</th>
                        <th>Product</th>
                        <th>product Image</th>
                        <th>price</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody className="text-accent font-semibold  text-center ">
                     {
                        orders.map( (order , idx) => <tr className="text-center " key={order._id}>
                           <td>{idx + 1}</td>
                           <td>{order.buyerName}</td>
                           <td>{order.productName}</td>
                           <td><img src={order.image}  className="w-10 h-10 rounded-circle mx-auto " alt={order.productName} /></td>
                           <td>${order.price}</td>
                           <td>{order.paymentStatus=== 'true' ?<span className="text-green-500 font-bold capitalize ">paid</span> : <button className="btn btn-sm bg-accent ">pay</button>  }</td>
                        </tr>
                           
                           )
                     }
                    
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default MyOrders;
