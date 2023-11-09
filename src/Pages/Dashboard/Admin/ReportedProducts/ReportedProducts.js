import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";
import { AuthContext } from "../../../../Context/AuthProvider";
import useTitle from "../../../../hooks/useTitle";
import Loading from "../../../../Components/Loading/Loading";
import { accessToken, baseURL } from "../../../../configs/configs";
import { format } from "date-fns";

const ReportedProducts = () => {
   const { logOut } = useContext(AuthContext);
   useTitle("Reported Products");
   const {
      data: products = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
         const res = await fetch(`${baseURL}/product?status=reported`, {
            headers: {
               authorization: accessToken,
            },
         });

         if (res.status === 403 || res.status === 401) {
            logOut();
            return;
         }
         const data = await res.json();
         return data.data.products;
      },
   });

   if (isLoading) {
      return <Loading></Loading>;
   }

   const handleDelete = (product) => {
      fetch(`${baseURL}/product/${product._id}`, {
         method: "delete",
         headers: {
            authorization: `bearer ${localStorage.getItem("productKoToken")}`,
         },
      })
         .then((res) => {
            if (res.status === 403 || res.status === 401) {
               logOut();
               return;
            }
            return res.json();
         })
         .then((data) => {
            if (data.status === "success") {
               toast.success(`${product.name} is deleted Successfully`);
               refetch();
            }
         });
   };

   console.log(products);
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
                        <th>email</th>
                        <th>posted At</th>
                        <th>update at</th>
                        <th>price</th>
                        <th>isBooked </th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody className="text-accent font-semibold text-center ">
                     {products?.map((product, idx) => (
                        <tr key={product._id}>
                           <th>{idx + 1}</th>
                           <td>{product.name}</td>
                           <td>{product.sellerInfo.email}</td>
                           <td>
                              {format(
                                 new Date(product.createAt || Date.now()),
                                 "mm : hh  dd MMM yyyy"
                              )}
                           </td>
                           <td>
                              {format(
                                 new Date(product.updatedAt || Date.now()),
                                 "mm : hh  dd MMM yyyy"
                              )}
                           </td>
                           <td>{product.resellPrice}</td>
                           <td>
                              {product.status === "booked" ? (
                                 <span className="text-secondary px-2 py-1 rounded bg-red-500  font-bold capitalize ">
                                    Booked
                                 </span>
                              ) : (
                                 <span className="text-green-500 text-center font-bold uppercase ">
                                    available
                                 </span>
                              )}
                           </td>
                           <td>
                              {product.status === "booked" || (
                                 <button onClick={() => handleDelete(product)}>
                                    <AiFillCloseCircle className="text-center text-2xl font-bold text-red-500  "></AiFillCloseCircle>
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

export default ReportedProducts;
