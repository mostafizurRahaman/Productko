
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import {AiFillCloseCircle, AiOutlineConsoleSql} from 'react-icons/ai'; 
import toast from "react-hot-toast";

const MyProduct = () => {
   const {user} = useContext(AuthContext); 
  
  
   const {data:products=[], isLoading, refetch}  = useQuery({
      queryKey: ["products", user?.email],  
      queryFn: async() => {
         const res  = await fetch(`http://localhost:5000/products?email=${user.email}`)
         const data = await res.json(); 
         return data; 
      }
   })

   if(isLoading){
      return <Loading></Loading>
   }

   const handleAdvertise = (product) => {
         fetch(`http://localhost:5000/products/${product._id}`, {
            method: "PUT", 
            headers: {
               'content-type': 'application/json',
            }, 
            body: JSON.stringify({isAdvertised: true})
         })
         .then(res => res.json())
         .then(data => {
             if(data.modifiedCount){
                  toast.success(`${product.productName} is added for advertised.`)
                  refetch(); 
             }
         })
         .catch(err => console.log(err)); 
   }

   const handleDelete = (product) => {
      fetch(`http://localhost:5000/products/${product._id}`, {
         method: "Delete"
      })
      .then(res => res.json())
      .then(data => {
         console.log(data);
         if(data.deletedCount > 0){
               toast.success(`${product.name } is deleted  Successfully`); 
               refetch(); 
         }
      })
      .catch(err => console.log(err)); 
   }
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
                  <thead className="text-2xl font-semibold text-primary bg-accent ">
                     <tr >
                        <th>S.I.</th>
                        <th>product</th>
                        <th>posted date</th>
                        <th>posted time</th>
                        <th>price</th>
                        <th>Booked </th>
                        <th>Action</th>                        
                        <th>advertise</th>
                     </tr>
                  </thead>
                  <tbody className="text-accent font-semibold ">
                     {
                        products.map((product, idx) => <tr key={product._id}>
                           <th>{idx + 1}</th>
                           <td>{product.productName}</td>
                           <td>{product.postDate}</td>
                           <td>{product.postTime}</td>
                           <td>{product.resellPrice}</td>
                           <td>{product.isBooked ? <span className="text-secondary px-2 py-1 rounded bg-red-500  font-bold capitalize ">Booked</span> : <span className="text-green-800 font-bold uppercase ">available</span> }</td>
                           <td>{product.isBooked || <button onClick={()=> handleDelete(product)}><AiFillCloseCircle className="text-center text-2xl font-bold text-red-500  "></AiFillCloseCircle></button>}</td>
                           <td>{product.isBooked || <button onClick={()=> handleAdvertise(product)} className={`btn btn-sm   text-secondary   font-bold text-base ${  
                              product.isAdvertised ? "bg-red-500" : "bg-primary"
                           } `} disabled={product.isAdvertised}>
                              {
                                 product.isAdvertised ? 'advertised' : "advertise"  
                              }
                              </button>}</td>
                        </tr> )
                     }
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default MyProduct;
