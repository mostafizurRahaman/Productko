import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiImageAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider";
import useTitle from "../../../../hooks/useTitle";
import FormError from "../../../Shared/Formsrror/FormError";
import Loading from "../../../Shared/Loading/Loading";
import "./AddProducts.css";
const AddProducts = () => {
   const { user, logOut } = useContext(AuthContext);
   useTitle("Add Product"); 
   const navigate = useNavigate();
   const { data: categories = [], isLoading } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
         const res = await fetch(
            "https://productko-server.vercel.app/categories"
         );
         const data = await res.json();
         return data;
      },
   });

   

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   if (!user) {
      return <Loading></Loading>;
   }
   

   const imageHostKey = process.env.REACT_APP_Image_BB_KEY; 
  
   const handleAddProduct = (data) => {
      const image = data.image[0];
      const formData = new FormData();
      formData.append("image", image);
      fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
         method: "POST",
         body: formData,
      })
         .then((res) => res.json())
         .then((imageData) => {
            if (imageData.success) {
               const img = imageData.data.url;
               const date = new Date();
               const currentTime = date.toLocaleTimeString();
               const currentDate = date.toLocaleDateString();
               const product = {
                  sellerName: data.sellerName,
                  email: data.email,
                  phone: data.phone,
                  productName: data.productName,
                  originalPrice: parseFloat(data.originalPrice),
                  resellPrice: parseFloat(data.resellPrice),
                  image: img,
                  location: data.sellerLocation,
                  postDate: currentDate,
                  postTime: currentTime,
                  category: data.category,
                  condition: data.condition,
                  yearsOfUse: data.yearsOfUse,
                  description: data.description,
               };
               console.log(product);
               fetch(`https://productko-server.vercel.app/products`, {
                  method: "POST",
                  headers: {
                     "content-type": "application/json",
                     authorization: `bearer ${localStorage.getItem(
                        "productKoToken"
                     )}`,
                  },
                  body: JSON.stringify(product),
               })
                  .then((res) => {
                     if (res.status === 403 || res.status === 401) {
                        logOut();
                        return;
                     }

                     return res.json();
                  })
                  .then((data) => {
                     if (data.acknowledged) {
                        toast.success(
                           `${product.productName} is added successfully`
                        );
                        navigate("/dashboard/myProducts");
                     }
                  })
                  .catch((err) => console.log(err));
            }
         })
         .catch((err) => console.log(err));
   };

   return (
      <div className="addProduct w-full">
         <div className=" my-5 flex items-center justify-center">
            <form
               onSubmit={handleSubmit(handleAddProduct)}
               className="bg-neutral w-11/12 md:w-4/5 p-5 rounded-2xl"
            >
               <h2 className="text-4xl mb-3 font-bold text-center capitalize text-secondary ">
                  Add Your product
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-secondary ">
                  <div>
                     <label
                        className="capitalize text-xl font-semibold"
                        htmlFor="sellerName"
                     >
                        Seller Name :
                     </label>
                     <input
                        type="text"
                        placeholder="Name"
                        className="input w-full border-2 border-neutral text-accent"
                        id="sellerName"
                        defaultValue={user?.displayName}
                        readOnly
                        {...register("sellerName")}
                     />
                  </div>
                  <div>
                     <label
                        className="capitalize text-xl font-semibold"
                        htmlFor="product-name"
                     >
                        Product Name :
                     </label>
                     <input
                        type="text"
                        placeholder="product name"
                        className="input w-full border-2 border-neutral text-accent"
                        id="product-name"
                        {...register("productName", {
                           required: "must enter product name",
                        })}
                     />
                     {errors.productName && (
                        <FormError>{errors.productName.message}</FormError>
                     )}
                  </div>
                  <div>
                     <label
                        className="capitalize text-xl font-semibold"
                        htmlFor="email"
                     >
                        Email :
                     </label>
                     <input
                        type="email"
                        placeholder="email"
                        className="input w-full border-2 border-neutral text-accent"
                        defaultValue={user?.email}
                        readOnly
                        id="seller-email"
                        {...register("email")}
                     />
                     {errors.email && (
                        <FormError>{errors.email.message}</FormError>
                     )}
                  </div>
                  <div>
                     <label
                        className="capitalize text-xl font-semibold"
                        htmlFor="phone"
                     >
                        phone :
                     </label>
                     <input
                        type="text"
                        placeholder="phone number"
                        className="input w-full border-2 border-neutral text-accent"
                        id="seller-number"
                        {...register("phone", {
                           required: "must enter phone number",
                           pattern: {
                              value: /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
                              message: "must enter a valid phone number",
                           },
                        })}
                     />
                     {errors.phone && (
                        <FormError>{errors.phone.message}</FormError>
                     )}
                  </div>
                  <div>
                     <label
                        className="capitalize text-xl font-semibold"
                        htmlFor="original-price"
                     >
                        Original price :
                     </label>
                     <input
                        type="text"
                        placeholder="original-price"
                        className="input w-full border-2 border-neutral text-accent"
                        id="original-price"
                        {...register("originalPrice", {
                           required: "must enter the price: ",
                           pattern: {
                              value: /^\d+$/,
                              message: "must enter  a valid price ",
                           },
                        })}
                     />
                     {errors.originalPrice && (
                        <FormError>{errors.originalPrice.message}</FormError>
                     )}
                  </div>
                  <div>
                     <label
                        className="capitalize text-xl font-semibold"
                        htmlFor="resellPrice"
                     >
                        reselling price :
                     </label>
                     <input
                        type="text"
                        placeholder="resellPrice"
                        className="input w-full border-2 border-neutral text-accent"
                        id="resellPrice"
                        {...register("resellPrice", {
                           required: "must enter a price: ",
                           pattern: {
                              value: /^\d+$/,
                              message: "must enter a valid price",
                           },
                        })}
                     />
                     {errors.resellPrice && (
                        <FormError>{errors.resellPrice.message}</FormError>
                     )}
                  </div>
                  <div>
                     <label
                        className="capitalize text-xl font-semibold"
                        htmlFor="yearsOfUse"
                     >
                        Years of Use :{" "}
                     </label>
                     <input
                        type="text"
                        placeholder="years of use"
                        className="input w-full border-2 border-neutral text-accent "
                        id="yearsOfUse"
                        {...register("yearsOfUse", {
                           required: "must enter how many years use.",
                        })}
                     />
                     {errors.yearsOfUse && (
                        <FormError>{errors.yearsOfUse.message}</FormError>
                     )}
                  </div>
                  <div>
                     <label
                        className="capitalize text-xl font-semibold"
                        htmlFor="location"
                     >
                        location :
                     </label>
                     <input
                        type="text"
                        placeholder="location"
                        className="input w-full border-2 border-neutral text-accent "
                        id="location"
                        {...register("sellerLocation", {
                           required: "enter a location",
                        })}
                     />
                     {errors.sellerLocation && (
                        <FormError>{errors.sellerLocation.message}</FormError>
                     )}
                  </div>

                  <div className="">
                     <label
                        className="capitalize font-semibold text-xl"
                        htmlFor="product-category"
                     >
                        category:
                     </label>
                     <div>
                        <select
                           name="category"
                           id="category"
                           className="input w-full border-2 border-neutral text-neutral "
                           {...register("category", {
                              required: "please select a category",
                           })}
                        >
                           {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                 {category.category_name}
                              </option>
                           ))}
                        </select>
                        {errors.category && (
                           <FormError>{errors.category.message}</FormError>
                        )}
                     </div>
                     <div>
                        <label
                           className="capitalize text-xl font-semibold my-2 block"
                           htmlFor="condition"
                        >
                           Condition :
                        </label>
                        <div className="flex  gap-3 capitalize">
                           <label htmlFor="excellent">
                              <input
                                 type="radio"
                                 name="condition"
                                 value="excellent"
                                 id="excellent"
                                 className="mr-1"
                                 {...register("condition", {
                                    required: "must select an condition",
                                 })}
                              />
                              excellent
                           </label>
                           <label htmlFor="good">
                              <input
                                 type="radio"
                                 name="condition"
                                 id="good"
                                 value="good"
                                 className="mr-1"
                                 {...register("condition", {
                                    required: "must select an condition",
                                 })}
                              />
                              good
                           </label>
                           <label htmlFor="fair">
                              <input
                                 type="radio"
                                 name="condition"
                                 value="fair"
                                 id="fair"
                                 className="mr-1"
                                 {...register("condition", {
                                    required: "must select an condition",
                                 })}
                              />
                              fair
                           </label>
                        </div>
                        {errors.condition && (
                           <FormError>{errors.condition.message}</FormError>
                        )}
                     </div>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                     <label
                        htmlFor="image"
                        className="text-xl capitalize font-semibold "
                     >
                        Upload Image:
                     </label>
                     <label
                        htmlFor="image"
                        className="flex items-center gap-4 px-2 py-4 w-full 
                       border-2 border-dashed"
                     >
                        <RiImageAddFill className="w-16  h-16 text-primary"></RiImageAddFill>
                        <input
                           type="file"
                           id="image"
                           placeholder="image"
                           className="placeholder:text-accent text-base"
                           {...register("image", {
                              required: "must upload an image",
                           })}
                        />
                     </label>
                     {errors.image && (
                        <FormError>{errors.image.message}</FormError>
                     )}
                  </div>
               </div>

               <div className="flex gap-2 flex-col mt-3">
                  <label
                     htmlFor="message"
                     className="text-white font-semibold capitalize text-xl "
                  >
                     message :
                  </label>
                  <textarea
                     name="message"
                     id="message"
                     cols="30"
                     rows="5"
                     className="rounded-lg text-accent p-3"
                     placeholder="Message"
                     {...register("description", {
                        required: "must enter a description",
                        minLength: {
                           value: 30,
                           message: "description must be 30 character",
                        },
                     })}
                  ></textarea>
                  {errors.description && (
                     <FormError>{errors.description.message}</FormError>
                  )}
               </div>
               <div className="flex items-center justify-center  mt-4">
                  <button
                     type="submit"
                     className="bg-primary text-secondary text-xl px-6 rounded-3xl hover:bg-transparent hover:text-primary  hover:border-2 border-primary transition-all duration-500   py-1 "
                  >
                     Add Product{" "}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddProducts;
