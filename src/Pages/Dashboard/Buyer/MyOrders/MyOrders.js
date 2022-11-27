import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";

const MyOrders = () => {
   const { user } = useContext(AuthContext);
   const { data: orders = [], isLoading, refetch } = useQuery({
      queryKey: ["orders", user?.email],
      queryFn: async () => {
         const res = await fetch(
            `http://localhost:5000/bookings?email=${user?.email}`
         );
         const data = await res.json();
         return data;
      },
   });

   if(isLoading){
      return <Loading></Loading>
   }

   const handleDelete = (order) =>{
      console.log(order);
      fetch(`http://localhost:5000/bookings/${order._id}`, {
         method: "delete", 
         headers: {
            'content-type': 'application/json', 
         }, 
         body: JSON.stringify(order) 
      })
      .then(res =>res.json())
      .then(data => {
         if(data.deletedCount > 0){
            toast.success(`${order.productName} is deleted successfully`); 
            refetch(); 
         }
      })
      .catch(err =>console.log(err)); 
   }
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
                        <th>action </th>
                        <th>Payment status</th>
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
                           <td>{order.paymentStatus || <button onClick={()=> handleDelete(order)}><AiFillCloseCircle className="text-center text-2xl font-bold text-red-500  "></AiFillCloseCircle></button>}
                           </td>
                           <td>{order.paymentStatus ?<span className="text-green-500 font-bold capitalize ">paid</span> : <Link to={`/dashboard/payment/${order._id}`}><button className="btn btn-sm bg-accent ">pay</button></Link>  }</td>
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
