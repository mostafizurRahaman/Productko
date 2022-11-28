import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast  from "react-hot-toast";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AuthContext } from "../../../../Context/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";

const AllBuyers = () => {
   const {logOut } = useContext(AuthContext); 
   
   const {
      data: buyers = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["buyers"],
      queryFn: async () => {
         const res = await fetch("http://localhost:5000/users?role=buyer", {
            headers: {
               authorization: `bearer ${localStorage.getItem(
                  "productKoToken"
               )}`,
            },

         });
         if(res.status === 403  || res.status===401){
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

   const handleDelete = (buyer) => {
      fetch(`http://localhost:5000/users/${buyer._id}`, {
         method: "delete",
         headers: {
            authorization: `bearer ${localStorage.getItem("productKoToken")}`,
         },
      })
         .then((res) => {
            if(res.status === 403  || res.status===401){
               logOut();
               return; 
            }

            return res.json(); 
         })
         .then((data) => {
            if (data.deletedCount > 0) {
               toast.success(`${buyer.name} is deleted successfully.`);
               refetch();
            }
         })
         .catch((err) => console.log(err));
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
                     {buyers.map((buyer, idx) => (
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
