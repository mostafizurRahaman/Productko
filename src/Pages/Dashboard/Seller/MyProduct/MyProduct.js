import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";

import { AiFillCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthProvider";
import Loading from "../../../../Components/Loading/Loading";
import useTitle from "../../../../hooks/useTitle";
import { accessToken, baseURL } from "../../../../configs/configs";
import { format } from "date-fns";

const MyProduct = () => {
   const { user, logOut } = useContext(AuthContext);
   useTitle("My Products");

   const {
      data: products = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["products", user?.email],
      queryFn: async () => {
         if (user?.email) {
            const res = await fetch(
               `${baseURL}/product?sellerInfo.email=${user?.email}`,
               {
                  headers: {
                     authorization: accessToken,
                  },
               }
            );
            if (res.status === 401 || res.status === 403) {
               logOut();
               return;
            }
            const data = await res.json();
            return data.data.products;
         }
         return [];
      },
   });

   if (isLoading) {
      return <Loading></Loading>;
   }

   const handleAdvertise = async (product) => {
      console.log(product._id);
      try {
         const res = await fetch(`${baseURL}/product/${product._id}`, {
            method: "PATCH",
            headers: {
               "content-type": "application/json",
               authorization: accessToken,
            },
            body: JSON.stringify({ isAdvertised: true }),
         });

         if (res.status === 403 || res.status === 401) {
            logOut();
            return;
         }

         const data = await res.json();
         if (data.status === "success") {
            toast.success("Product advertisement enabled");
            console.log(data);
            refetch();
         }
      } catch (err) {
         toast.error(err.message);
         console.log(err);
      }
   };

   const handleDelete = async (product) => {
      console.log(product);
      try {
         const res = await fetch(`${baseURL}/product/${product._id}`, {
            method: "Delete",
            headers: {
               authorization: accessToken,
            },
         });
         if (res.status === 403 || res.status === 401) {
            return logOut();
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
   return (
      <div className=" w-full">
         <div className="flex items-center justify-center ">
            <h2 className="text-center  text-3xl md:text-4xl  font-bold inline-block text-secondary   border-b-2 border-secondary   pb-3 uppercase ">
               My products
            </h2>
         </div>
         <div className="mt-5 ">
            <div className="overflow-x-auto">
               <table className="table table-compact table-zebra  w-full">
                  <thead className="text-2xl font-semibold text-primary bg-accent text-center ">
                     <tr>
                        <th>S.I.</th>
                        <th>product</th>
                        <th>CreatedAt</th>
                        <th>updatedAt</th>
                        <th>price</th>
                        <th>status </th>
                        <th>payment status</th>
                        <th>Action</th>
                        <th>advertise</th>
                     </tr>
                  </thead>
                  <tbody className="text-accent font-semibold text-center ">
                     {products.map((product, idx) => (
                        <tr key={product._id}>
                           <th>{idx + 1}</th>
                           <td>{product.name}</td>
                           <td>
                              <div className="flex gap-1">
                                 <span>
                                    {format(
                                       new Date(
                                          product.createdAt || Date.now()
                                       ),
                                       "dd/MM/yyyy"
                                    )}{" "}
                                    at
                                 </span>
                                 <span>
                                    {format(
                                       new Date(
                                          product.createdAt || Date.now()
                                       ),
                                       "h : mm aa "
                                    )}
                                 </span>
                              </div>
                           </td>
                           <td>
                              <div className="flex gap-1">
                                 <span>
                                    {format(
                                       new Date(
                                          product.createdAt || Date.now()
                                       ),
                                       "dd/MM/yyyy"
                                    )}{" "}
                                    at
                                 </span>
                                 <span>
                                    {format(
                                       new Date(
                                          product.createdAt || Date.now()
                                       ),
                                       "h : mm aa "
                                    )}
                                 </span>
                              </div>
                           </td>
                           <td>${product.resellPrice}</td>
                           <td>
                              <span
                                 className={`px-3 py-1 rounded-md  ${
                                    product.status === "available"
                                 }`}
                              >
                                 {product.status}
                              </span>
                           </td>
                           <td className="">
                              {product.status === "booked" ? (
                                 <span
                                    className={` font-bold uppercase ${
                                       product.payStatus === "paid"
                                          ? "text-green-500"
                                          : "text-red-500"
                                    }`}
                                 >
                                    {product.payStatus}
                                 </span>
                              ) : (
                                 "-"
                              )}
                           </td>
                           <td>
                              {product.status !== "booked" && (
                                 <button onClick={() => handleDelete(product)}>
                                    <AiFillCloseCircle className="text-center text-2xl font-bold text-red-500  "></AiFillCloseCircle>
                                 </button>
                              )}
                           </td>

                           <td>
                              {product.status === "available" && (
                                 <button
                                    onClick={() => handleAdvertise(product)}
                                    className={`btn btn-sm   text-secondary   font-bold text-base ${
                                       product.isAdvertised
                                          ? "bg-red-500"
                                          : "bg-primary"
                                    } `}
                                    disabled={product.isAdvertised}
                                 >
                                    {product.isAdvertised
                                       ? "advertised"
                                       : "advertise"}
                                 </button>
                              )}
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

export default MyProduct;
