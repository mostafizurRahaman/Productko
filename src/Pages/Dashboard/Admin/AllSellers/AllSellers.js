import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Loading from "../../../../Components/Loading/Loading";
import { RiDeleteBin2Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthProvider";
import useTitle from "../../../../hooks/useTitle";
import { accessToken, baseURL } from "../../../../configs/configs";
const AllSellers = () => {
   const { logOut } = useContext(AuthContext);
   useTitle("All sellers");
   const {
      data: sellers = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["sellers"],
      queryFn: async () => {
         const res = await fetch(`${baseURL}/user?role=seller`, {
            headers: {
               authorization: accessToken,
            },
         });
         if (res.status === 403 || res.status === 401) {
            logOut();
            return;
         }
         const data = await res.json();
         return data.data.users;
      },
   });

   if (isLoading) {
      return <Loading></Loading>;
   }

   const handleVerify = async (seller) => {
      console.log(seller);
      try {
         const res = await fetch(`${baseURL}/user/${seller?._id}`, {
            method: "PATCH",
            headers: {
               "content-type": "application/json",
               authorization: accessToken,
            },
            body: JSON.stringify({ isVerified: true }),
         });

         if (res.status === 403 || res.status === 401) {
            logOut();
            return;
         }

         const data = await res.json();
         if (data.status === "success") {
            refetch();
            toast.success(`${seller.name} is verified`);
         } else {
            toast.error(data.message);
         }
      } catch (err) {
         toast.error(err.message);
         console.log(err);
      }
   };

   const handleDelete = async (seller) => {
      try {
         const res = await fetch(`${baseURL}/user/${seller._id}`, {
            method: "DELETE",
            headers: {
               authorization: accessToken,
            },
         });

         if (res.status === 401 || res.status === 403) {
            return logOut();
         }

         const data = await res.json();
         if (data.status === "success") {
            toast.success(data.message);
            refetch();
         } else {
            toast.error(data.message);
         }
      } catch (err) {
         toast.error(err.message);
      }
   };

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
                        <th>role</th>
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
                           <td> {seller.role}</td>
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
