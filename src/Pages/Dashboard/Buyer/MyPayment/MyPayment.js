import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { accessToken, baseURL } from "../../../../configs/configs";
import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import MyCheckoutFrom from "../../../../Components/MyCheckoutForm/MyCheckoutFrom";
import Loading from "../../../../Components/Loading/Loading";
import CheckOutFrom from "../../CheckOut/CheckOutFrom";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const MyPayment = () => {
   const { id } = useParams();
   console.log(id);
   const { logOut } = useContext(AuthContext);
   const {
      data: booking,
      refetch,
      isLoading,
   } = useQuery({
      queryKey: ["booking", id],
      queryFn: async () => {
         const res = await fetch(`${baseURL}/booking/${id}`, {
            headers: {
               authorization: accessToken,
            },
         });
         if (res.status === 403 || res.status === 401) {
            return logOut();
         }
         const data = await res.json();
         // console.log(data);
         return data.data;
      },
   });

   if (isLoading) {
      return <Loading></Loading>;
   }
   return (
      <div>
         <div className="bg-gray-800 px-5 py-5 rounded-lg ">
            <div className="text-white ">
               <h1 className="text-base font-normal capitalize ">
                  Pay{" "}
                  <span className="text-2xl text-red-500 font-bold ">
                     ${booking?.price}
                  </span>{" "}
                  for{" "}
                  <span className="text-2xl capitalize text-red-500">
                     {booking?.product?.name}
                  </span>
                  <Elements stripe={stripePromise}>
                     <MyCheckoutFrom booking={booking}></MyCheckoutFrom>
                    
                  </Elements>
               </h1>
            </div>
         </div>
      </div>
   );
};

export default MyPayment;
