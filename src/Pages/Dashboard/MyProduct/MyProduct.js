import React from "react";

const MyProduct = () => {
   return (
      <div className=" w-full">
         <div className="flex items-center justify-center ">
            <h2 className="text-center  text-3xl md:text-4xl  font-bold inline-block text-accent  border-b-2 border-accent  pb-3 uppercase ">
               My products
            </h2>
         </div>
         <div>
            <div className="overflow-x-auto">
               <table className="table table-compact w-full">
                  <thead>
                     <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>company</th>
                        <th>location</th>
                        <th>Last Login</th>
                        <th>Favorite Color</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Littel, Schaden and Vandervort</td>
                        <td>Canada</td>
                        <td>12/16/2020</td>
                        <td>Blue</td>
                     </tr> 
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default MyProduct;
