import React from 'react';

const MyOrders = () => {
   return (
      <div className=" w-full">
      <div className="flex items-center justify-center ">
         <h2 className="text-center  text-3xl md:text-4xl  font-bold inline-block text-secondary   border-b-2 border-secondary   pb-3 uppercase ">
            My orders 
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

               </tbody>
            </table>
         </div>
      </div>
   </div>
   );
};

export default MyOrders;