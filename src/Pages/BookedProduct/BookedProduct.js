import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useTitle from "../../hooks/useTitle";
import FormError from "../../Components/Formsrror/FormError";
import { accessToken, baseURL } from "../../configs/configs";

const BookedProduct = () => {
   const { logOut, user } = useContext(AuthContext);
   // const product = useLoaderData();

   const { id } = useParams();
   console.log(id);
   const { data: product = [], isLoading } = useQuery({
      queryKey: ["product", id],
      queryFn: async () => {
         const res = await fetch(`${baseURL}/product/${id}`, {
            headers: {
               authorization: accessToken,
            },
         });

         if (res.status === 403 || res.status === 401) {
            logOut();
            return;
         }
         const data = await res.json();
         // console.log(data);
         return data.data;
      },
   });
   const { data: currentUser = {} } = useQuery({
      queryKey: ["currentUser", user?.email],
      queryFn: async () => {
         if (user?.email) {
            const res = await fetch(`${baseURL}/user?email=${user?.email}`);
            const data = await res.json();
            // console.log(data);
            return data.data.users[0];
         }
         return {};
      },
   });
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const { _id, name, sellerInfo, resellPrice, category } = product;
   console.log(product);
   useTitle(`${name}- Booking `);

   const handleBooking = async (data) => {
      const bookedProduct = {
         product: _id,
         price: resellPrice,
         category: category,
         buyerInfo: {
            id: currentUser?._id,
            email: user?.email,
            location: data.location,
            phone: data.phone,
         },
         sellerInfo: sellerInfo,
         status: "pending",
      };

      // console.log(bookedProduct);
      try {
         const res = await fetch(`${baseURL}/booking`, {
            method: "POST",
            headers: {
               "content-type": "application/json",
               authorization: accessToken,
            },
            body: JSON.stringify(bookedProduct),
         });
         if (res.status === "403" || res.status === "401") {
            return logOut();
         }
         const data = await res.json();
         if (data.status === "success") {
            toast.success(data.message);
            navigate("/dashboard/my-orders");
         }
      } catch (err) {
         toast.error(err.message);
         console.log(err);
      }
   };

   return (
      <div className="flex items-center justify-center  min-h-screen w-full  py-5">
         <form
            onSubmit={handleSubmit(handleBooking)}
            className="w-[370px] px-5 rounded-lg  py-5 bg-accent flex flex-col gap-1"
         >
            <h2 className="text-2xl text-white font-bold text-center  ">
               Booking Form
            </h2>
            <div className="flex flex-col gap-1">
               <label
                  htmlFor="name "
                  className="text-lg capitalize text-secondary font-bold "
               >
                  Name:{" "}
               </label>
               <input
                  type="name"
                  id="name"
                  placeholder="your name"
                  className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent py-1 rounded-lg "
                  defaultValue={user?.displayName}
                  readOnly
               />
            </div>
            <div>
               <label
                  className="text-lg capitalize text-secondary font-bold "
                  htmlFor="email"
               >
                  Buyer Email:{" "}
               </label>
               <input
                  type="email"
                  id="email"
                  className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent py-1 rounded-lg "
                  defaultValue={user?.email}
                  readOnly
                  placeholder="buyer email: "
               />
            </div>
            <div>
               <label
                  className="text-lg capitalize text-secondary font-bold "
                  htmlFor="ProductName"
               >
                  Product Name:{" "}
               </label>
               <input
                  type="text"
                  id="ProductName"
                  className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent py-1 rounded-lg "
                  placeholder="product name"
                  defaultValue={name}
                  readOnly
               />
            </div>
            <div>
               <label
                  className="text-lg capitalize text-secondary font-bold "
                  htmlFor="price"
               >
                  Price:{" "}
               </label>
               <input
                  type="text"
                  id="price"
                  className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent py-1 rounded-lg "
                  placeholder="price"
                  defaultValue={resellPrice}
                  readOnly
               />
            </div>
            <div>
               <label
                  className="text-lg capitalize text-secondary font-bold "
                  htmlFor="phone"
               >
                  Phone:{" "}
               </label>
               <input
                  type="text"
                  id="phone"
                  className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent py-1 rounded-lg "
                  placeholder="phone Number"
                  {...register("phone", {
                     required: "must enter a phone number",
                     pattern: {
                        value: /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
                        message: "must enter a valid number",
                     },
                  })}
               />
               {errors.phone && <FormError>{errors.phone.message}</FormError>}
            </div>
            <div>
               <label
                  className="text-lg capitalize text-secondary font-bold "
                  htmlFor="location"
               >
                  Location:{" "}
               </label>
               <input
                  type="text"
                  id="location"
                  placeholder="location"
                  className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent py-1 rounded-lg "
                  {...register("location", {
                     required: "must enter a location",
                  })}
               />
               {errors.location && (
                  <FormError>{errors.location.message}</FormError>
               )}
            </div>
            <div>
               <button className="hover:bg-opacity-75 duration-1000 mt-5 text-xl text-white bg-primary  w-full px-3 py-1 rounded-lg ">
                  Submit
               </button>
            </div>
         </form>
      </div>
   );
};

export default BookedProduct;
