import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import Loading from "../../../Shared/Loading/Loading";
import { RiDeleteBin2Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthProvider";

const AllSellers = () => {
   const { logOut } = useContext(AuthContext);
   const {
      data: sellers = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["sellers"],
      queryFn: async () => {
         const res = await fetch(
            "https://productko-server.vercel.app/users?role=seller",
            {
               headers: {
                  authorization: `bearer ${localStorage.getItem(
                     "productKoToken"
                  )}`,
               },
            }
         );
         if (res.status === 403 || res.status === 401) {
            logOut();
            return;
         }
         const data = await res.json();
         return data;
      },
   });

   if (isLoading) {
      return <Loading></Loading>;
   }

   const handleVerify = (seller) => {
      console.log(seller);
      fetch(`https://productko-server.vercel.app/users/${seller.email}`, {
         method: "put",
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
            console.log(data, "from verify");
            if (data.modifiedCount) {
               toast.success(`${seller.name} is verified`);
               refetch();
            }
         })
         .catch((err) => console.log(err));
   };

   const handleDelete = (seller) => {
      fetch(`https://productko-server.vercel.app/users/${seller._id}`, {
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
            if (data.acknowledged) {
               toast.success(`${seller.name} is successfully deleted`);
               refetch();
            }
         });
   };
   console.log(sellers);
   return (
      <div className="w-full flex flex-col gap-5 items-center px-5">
         <div className="flex items-center justify-center mb-5">
            <h2 className="text-center  text-3xl md:text-4xl  font-bold inline-block text-secondary   border-b-2 border-secondary   pb-3 uppercase ">
               All seller
            </h2>
         </div>
         <div className="w-full">
            <div className="overflow-x-auto w-full">
               <table className="table table-compact table-zebra  w-full text-center ">
                  <thead className="text-2xl font-semibold text-center text-primary bg-accent ">
                     <tr>
                        <th>S.I.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status </th>
                        <th>Delete </th>
                     </tr>
                  </thead>
                  <tbody className="text-accent font-semibold  text-center">
                     {sellers.map((seller, idx) => (
                        <tr className="text-center " key={seller._id}>
                           <td>{idx + 1}</td>
                           <td>
                              <img
                                 src={seller.photoURL}
                                 alt={seller.name}
                                 className="w-8 h-8 rounded-full mx-auto"
                              />
                           </td>
                           <td>{seller.name}</td>
                           <td> {seller.email}</td>
                           <td>
                              {seller.isVerified ? (
                                 <span className="text-green-500 font-bold capitalize">
                                    verified
                                 </span>
                              ) : (
                                 <button
                                    onClick={() => handleVerify(seller)}
                                    className="btn btn-sm btn-primary  text-secondary "
                                 >
                                    verify
                                 </button>
                              )}
                           </td>

                           <td>
                              <RiDeleteBin2Fill
                                 onClick={() => {
                                    handleDelete(seller);
                                 }}
                                 className="text-2xl text-center mx-auto text-red-500 cursor-pointer hover:text-1xl"
                              ></RiDeleteBin2Fill>
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

export default AllSellers;
