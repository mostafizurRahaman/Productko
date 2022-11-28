import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckOutFrom from "../CheckOut/CheckOutFrom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
   const booking = useLoaderData();

   return (
      <div className="w-full ">
         <div className="flex items-center justify-center w-full ">
            <h2 className=" border-b-2 pb-3 text-white text-3xl font-bold uppercase text-center ">
               confirm Payment for{" "}
               <span className="text-primary  font-bold  ">
                  {booking.productName}
               </span>{" "}
            </h2>
         </div>
         <div className="w-full px-5 md:w-2/4 rounded-2xl  h-[300px] bg-secondary  mt-5 mx-auto p-10 ">
          <p className="text-xl capitalize text-accent font-bold  block mb-5 ">Please pay <span className='text-2xl font-extrabold text-red-500     '>${booking.price}</span> for booking confirmation </p>
         <Elements stripe={stripePromise}> 
                  <CheckOutFrom booking={booking} ></CheckOutFrom> 
         </Elements>
         </div>
      </div>
   );
};

export default Payment;
