import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";

import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider";
import useTitle from "../../../../hooks/useTitle";
import Loading from "../../../../Components/Loading/Loading";
import { accessToken, baseURL } from "../../../../configs/configs";
const MyOrders = () => {
   const { user, logOut } = useContext(AuthContext);
   useTitle("My Orders");
   const {
      data: orders = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["orders", user?.email],
      queryFn: async () => {
         if (user?.email) {
            const res = await fetch(
               `${baseURL}/booking?buyerInfo.email=${user?.email}`,
               {
                  headers: {
                     "content-type": "application/json",
                     authorization: accessToken,
                  },
               }
            );
            if (res.status === 401 || res.status === 403) {
               logOut();
               return;
            }
            const data = await res.json();
            console.log(data);
            return data.data.bookings;
         }
         return [];
      },
   });

   if (isLoading) {
      return <Loading></Loading>;
   }

   const handleDelete = async (order) => {
      try {
         console.log(order);
         const res = await fetch(`${baseURL}/booking/${order._id}`, {
            method: "delete",
            headers: {
               "content-type": "application/json",
               authorization: accessToken,
            },
            body: JSON.stringify(order),
         });

         if (res.status === 403 || res.status === 401) {
            logOut();
            return;
         }

         const data = await res.json();

         if (data.status === "success") {
            toast.success(data.message);
            refetch();
         }
      } catch (err) {
         console.log(err);
      }
   };
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
                        <th>Payment status</th>
                        <th>action </th>
                     </tr>
                  </thead>
                  <tbody className="text-accent font-semibold  text-center ">
                     {orders.map((order, idx) => (
                        <tr className="text-center " key={order._id}>
                           <td>{idx + 1}</td>
                           <td>{order?.buyerInfo?.id?.name}</td>
                           <td>{order?.product?.name}</td>
                           <td>
                              <img
                                 src={order?.product?.image}
                                 className="w-10 h-10 rounded-circle mx-auto "
                                 alt={order?.product?.name}
                              />
                           </td>
                           <td>${order?.price}</td>

                           <td>
                              <p
                                 className={`text-white px-2 py-1 inline-block rounded-md text-xs capitalize ${
                                    order.status === "pending"
                                       ? "bg-orange-500"
                                       : "bg-red-500"
                                 } ${
                                    order.status === "paid" && "bg-green-600"
                                 }`}
                              >
                                 {order.status}
                              </p>
                           </td>
                           <td>
                              <div className="flex gap-1 items-center justify-center">
                                 {order.status === "paid" || (
                                    <button onClick={() => handleDelete(order)}>
                                       <AiFillCloseCircle className="text-center text-2xl font-bold text-red-500  "></AiFillCloseCircle>
                                    </button>
                                 )}
                                 {order.status === "pending" && (
                                    <Link
                                       to={`/dashboard/payment/${order._id}`}
                                    >
                                       <button className="btn btn-sm bg-accent ">
                                          pay
                                       </button>
                                    </Link>
                                 )}
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default MyOrders;
