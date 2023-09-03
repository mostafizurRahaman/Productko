import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import FormError from "../../../Components/Formsrror/FormError";

const CheckOutFrom = ({ booking }) => {
   //create a state for handle payment card errors :
   useTitle("checkout form");
   const { logOut } = useContext(AuthContext);
   const [cardErrors, setCardErrors] = useState("");
   const [clientSecret, setClientSecret] = useState("");
   const [transaction, setTransaction] = useState("");
   const [success, setSuccess] = useState("");
   const [processing, setProcessing] = useState("");

   //create element and stripe :
   const stripe = useStripe();
   const elements = useElements();

   //useEffect :
   useEffect(() => {
      fetch(`https://productko-server.vercel.app/create-payment-intent`, {
         method: "POST",
         headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("productKoToken")}`,
         },
         body: JSON.stringify(booking),
      })
         .then((res) => {
            if (res.status === 403 || res.status === 401) {
               logOut();
               return;
            }

            return res.json();
         })
         .then((data) => {
            setClientSecret(data.clientSecret);
         })
         .catch((err) => console.log(err));
   }, [booking, logOut]);

   // payment card handle function is here:
   const handleSubmit = async (event) => {
      event.preventDefault();
      setCardErrors("");
      //check stripe isLoaded or not and check also elements:
      if (!stripe || !elements) {
         return;
      }

      //get card element by element.getElement(CardElement);
      const card = elements.getElement(CardElement);

      // if card is not available don't forward :
      if (card === null) {
         return;
      }

      //create a payment method thats return us an object with property {errors ,payment Methods :}
      const { error, paymentMethods } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });

      if (error) {
         console.log(error);
         setCardErrors(error.message);
      } else {
         setCardErrors("");
      }
      setSuccess("");
      setTransaction("");
      setProcessing(true);
      const { paymentIntent, error: confirmError } =
         await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
               card: card,
               billing_details: {
                  name: booking.buyerName,
                  email: booking.email,
               },
            },
         });

      if (confirmError) {
         setCardErrors(confirmError.message);
         return;
      }
      if (paymentIntent.status === "succeeded") {
         const payment = {
            productName: booking.productName,
            buyerName: booking.buyerName,
            email: booking.email,
            transactionId: transaction,
            product_id: booking.product_id,
            bookingId: booking._id,
            paymentStatus: true,
         };
         fetch(`https://productko-server.vercel.app/payments/`, {
            method: "POST",
            headers: {
               "content-type": "application/json",
               authorization: `bearer ${localStorage.getItem(
                  "productKoToken"
               )}`,
            },
            body: JSON.stringify(payment),
         })
            .then((res) => {
               if (res.status === 403 || res.status === 401) {
                  logOut();
                  return;
               }

               return res.json();
            })
            .then((data) => {
               console.log(data);
               if (data.acknowledged) {
                  setSuccess(
                     `Congratulations, payment is succeeded for ${booking.productName} `
                  );
                  setTransaction(paymentIntent.id);
               }
            })
            .catch((err) => console.log(err));
      }

      setProcessing(false);
   };

   return (
      <form onSubmit={handleSubmit}>
         <CardElement
            options={{
               style: {
                  base: {
                     fontSize: "16px",
                     color: "#424770",
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
            type="submit"
            disabled={
               !stripe || !clientSecret || processing || booking.paymentStatus
            }
            className="btn btn-sm btn-primary text-accent font-bold mt-5  "
         >
            {booking?.paymentStatus ? "paid" : "Pay"}
         </button>
         {cardErrors && <FormError>{cardErrors}</FormError>}
         {success && (
            <div className="text-green-500">
               <h3 className="text-sm font-bold capitalize ">{success}</h3>
               <p className="text-sm font-bold capitalize">
                  transaction : {transaction}
               </p>
            </div>
         )}
      </form>
   );
};

export default CheckOutFrom;
