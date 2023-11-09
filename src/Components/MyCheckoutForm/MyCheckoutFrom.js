import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { accessToken, baseURL } from "../../configs/configs";
import { AuthContext } from "../../Context/AuthProvider";
import toast from "react-hot-toast";
import postcss from "postcss";
import Loading from "../Loading/Loading";

const MyCheckoutFrom = ({ booking, refetch }) => {
   const { logOut } = useContext(AuthContext);
   const [cardErrors, setCardErrors] = useState("");
   const [success, setSuccess] = useState("");
   const [transactionId, setTransactionId] = useState("");
   const [processing, setProcessing] = useState(false);
   const [clientSecret, setClientSecret] = useState("");

   const stripe = useStripe();
   const elements = useElements();

   console.log(booking);

   useEffect(() => {
      fetch(`${baseURL}/payment/create-payment-intent`, {
         method: "POST",
         headers: {
            "content-type": "application/json",
            authorization: accessToken,
         },
         body: JSON.stringify(booking),
      })
         .then((res) => {
            if (res.status === 403 || res.status === 401) {
               return logOut();
            }
            return res.json();
         })
         .then((data) => {
            if (data.status === "success") {
               setClientSecret(data.data.clientSecret);
               console.log(data.data.clientSecret, "client secret ");
            }
         })
         .catch((err) => console.log(err));
   }, [booking, logOut]);

   const handleSubmit = async (event) => {
      event.preventDefault();
      setCardErrors("");
      if (!stripe || !elements) {
         return;
      }

      //  create a card element:
      const card = elements.getElement(CardElement);

      if (card === null) {
         return;
      }

      const { error, paymentMethods } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });

      if (error) {
         setCardErrors(error.message);
      } else {
         setCardErrors("");
      }
      setSuccess("");
      setTransactionId("");
      setProcessing(true);

      const { paymentIntent, error: confirmError } =
         await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
               card: card,
               billing_details: {
                  email: booking.buyerInfo.email,
               },
            },
         });

      if (confirmError) {
         setCardErrors(confirmError.message);
         setProcessing(false);
         return;
      }

      if (paymentIntent.status === "succeeded") {
         const payment = {
            product: booking?.product,
            booking: booking._id,
            buyer: booking.buyerInfo.id,
            transaction: paymentIntent.id,
         };

         try {
            const res = await fetch(`${baseURL}/payment`, {
               method: "POST",
               headers: {
                  "content-type": "application/json",
                  authorization: accessToken,
               },
               body: JSON.stringify(payment),
            });
            if (res.status === 403 || res.status === 401) {
               return logOut();
            }
            const data = await res.json();
            console.log(data);
            if (data.status === "success") {
               toast.success(data.message);
               setSuccess(data.message);
               setProcessing(false);
               setTransactionId(data.data.transaction);
               refetch();
            } else {
               toast.error(data.message);
               setProcessing(false);
            }
         } catch (err) {
            toast.error(err.message);
            setProcessing(false);
         }
      }
   };
   // if (processing) {
   //    return <Loading></Loading>;
   // }
   return (
      <form
         onSubmit={handleSubmit}
         className="flex flex-col gap-7 mt-10 w-[380px] h-auto"
      >
         {processing && <Loading></Loading>}
         <CardElement
            options={{
               style: {
                  base: {
                     fontSize: "16px",
                     color: "#ffffff",
                     "::placeholder": {
                        color: "#aab7c4",
                     },
                  },
                  invalid: {
                     color: "#9e2146",
                  },
               },
            }}
         />
         <button
            disabled={
               !stripe ||
               !clientSecret ||
               processing ||
               booking.status === "paid"
            }
            className={`bg-blue-500 px-3 py-1   rounded-lg capitalize font-medium ${
               (!stripe ||
                  !clientSecret ||
                  processing ||
                  booking.status === "paid") &&
               "bg-red-500 cursor-not-allowed"
            }`}
         >
            {booking.status === "paid" ? "paid" : "pay"}
         </button>

         {success && (
            <div className="text-green-500">
               <h3 className="text-sm font-bold capitalize ">{success}</h3>
               <p className="text-sm font-bold capitalize">
                  transaction : {transactionId}
               </p>
            </div>
         )}
      </form>
   );
};

export default MyCheckoutFrom;
