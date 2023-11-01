import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AuthContext } from "../../../../Context/AuthProvider";
import useTitle from "../../../../hooks/useTitle";
import Loading from "../../../../Components/Loading/Loading";
import { accessToken, baseURL } from "../../../../configs/configs";

const AllBuyers = () => {
   const { logOut } = useContext(AuthContext);
   useTitle("All Buyers");

   const {
      data: buyers = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["buyers"],
      queryFn: async () => {
         const res = await fetch(`${baseURL}/user?role=buyer`, {
            headers: {
               authorization: accessToken,
            },
         });
         if (res.status === 403 || res.status === 401) {
            logOut();
            return;
         }
         const data = await res.json();
         console.log(data);
         return data.data.users;
      },
   });

   if (isLoading) {
      return <Loading></Loading>;
   }

   const handleDelete = async (buyer) => {
      try {
         const res = await fetch(`${baseURL}/user/${buyer._id}`, {
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

   console.log(buyers);
   return (
      <div className="w-full flex flex-col gap-5 items-center px-5">
         <div className="flex items-center justify-center mb-5">
            <h2 className="text-center  text-3xl md:text-4xl  font-bold inline-block text-secondary   border-b-2 border-secondary   pb-3 uppercase ">
               All Buyers
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
                        <th>role </th>
                        <th>Delete </th>
                     </tr>
                  </thead>
                  <tbody className="text-accent font-semibold  text-center">
                     {buyers?.map((buyer, idx) => (
                        <tr className="text-center " key={buyer._id}>
                           <td>{idx + 1}</td>
                           <td>
                              <img
                                 src={buyer.photoURL}
                                 alt={buyer.name}
                                 className="w-8 h-8 rounded-full mx-auto"
                              />
                           </td>
                           <td>{buyer.name}</td>
                           <td> {buyer.email}</td>
                           <td> {buyer.role}</td>
                           <td>
                              <RiDeleteBin2Fill
                                 onClick={() => {
                                    handleDelete(buyer);
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

export default AllBuyers;
