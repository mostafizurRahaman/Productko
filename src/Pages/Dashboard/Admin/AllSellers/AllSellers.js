import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Shared/Loading/Loading';
import {RiDeleteBin2Fill} from 'react-icons/ri'; 
const AllSellers = () => {

   
   const {data:sellers=[],isLoading, refetch}  = useQuery({
      queryKey: ['sellers'], 
      queryFn: async() => {
         const res = await fetch('http://localhost:5000/users?role=seller'); 
         const data  = await res.json(); 
         return data; 
      }
   })

   if(isLoading){
      return <Loading></Loading>
   }

   console.log(sellers); 
   return (
             <div className="overflow-x-auto mx-auto">
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
                  <tbody className="text-accent font-semibold  text-center ">
                     {
                        sellers.map( (seller , idx) => <tr className="text-center " key={seller._id}>
                           <td>{idx + 1}</td>
                           <td><img src={seller.photoURL} alt={seller.name} className="w-8 h-8 rounded-full mx-auto" /></td>
                           <td>{seller.name}</td>
                           <td> {seller.email}</td>
                           <td>{
                              seller.isVerified ? <span className='text-green-500 font-bold capitalize'>verified</span> : <button className='btn btn-sm btn-primary  text-secondary '>
                                 verify
                              </button>
                              }</td>

                           <td><RiDeleteBin2Fill className='text-2xl text-center mx-auto text-red-500 cursor-pointer hover:text-1xl'></RiDeleteBin2Fill></td>
                        </tr>
                           
                           )
                     }
                    
                  </tbody>
               </table>
            </div>
   );
};

export default AllSellers;