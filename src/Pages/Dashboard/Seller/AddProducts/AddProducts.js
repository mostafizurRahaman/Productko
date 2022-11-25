import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { RiImageAddFill } from "react-icons/ri";
import FormError from "../../../Shared/Formsrror/FormError";
import './AddProducts.css' ; 
const AddProducts = () => {
   const { data: categories = [], isLoading } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
         const res = await fetch("http://localhost:5000/categories");
         const data = await res.json();
         return data;
      },
   });
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const handleAddProduct = (data) => {
      console.log(data);
   };
   return (
      <div className="addProduct ">
         <div className="  my-6 flex items-center justify-center">
            <form
               onSubmit={handleSubmit(handleAddProduct)}
               className="bg-neutral w-11/12 md:w-3/5 p-5 rounded-2xl"
            >
               <h2 className="text-4xl mb-3 font-bold text-center capitalize text-secondary ">
                  Add Your product
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-secondary ">
                  <div>
                     <label className="capitalize text-xl font-semibold" htmlFor="sellerName">Seller Name</label>
                     <input
                        type="text"
                        placeholder="Name"
                        className="input w-full border-2 border-neutral"
                        id="sellerName"
                        {...register("sellerName", {
                           required: "must enter your name",
                        })}
                     />
                     {errors.sellerName && (
                        <FormError>{errors.sellerName.message}</FormError>
                     )}
                  </div>
                  <div>
                     <label className="capitalize text-xl font-semibold" htmlFor="product-name">Product Name:</label>
                     <input
                        type="text"
                        placeholder="product name"
                        className="input w-full border-2 border-neutral"
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
                     <label className="capitalize text-xl font-semibold" htmlFor="email">Email:</label>
                     <input
                        type="email"
                        placeholder="email"
                        className="input w-full border-2 border-neutral"
                        id="seller-email"
                        {...register("email", {
                           required: "must enter product name",
                           pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "email must be valid",
                           },
                        })}
                     />
                  </div>
                  <div>
                     <label className="capitalize text-xl font-semibold" htmlFor="phone">phone:</label>
                     <input
                        type="text"
                        placeholder="phone number"
                        className="input w-full border-2 border-neutral"
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
                     <label className="capitalize text-xl font-semibold" htmlFor="original-price">Original price:</label>
                     <input
                        type="text"
                        placeholder="original-price"
                        className="input w-full border-2 border-neutral"
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
                     <label className="capitalize text-xl font-semibold" htmlFor="resellPrice">reselling price:</label>
                     <input
                        type="text"
                        placeholder="resellPrice"
                        className="input w-full border-2 border-neutral"
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
                     <label className="capitalize text-xl font-semibold" htmlFor="yearsOfUse">Years of Use: </label>
                     <input
                        type="text"
                        placeholder="years of use"
                        className="input w-full border-2 border-neutral"
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
                     <label className="capitalize text-xl font-semibold" htmlFor="location">location</label>
                     <input
                        type="text"
                        placeholder="location"
                        className="input w-full border-2 border-neutral"
                        id="location"
                        {...register("sellerLocation", {
                           required: "enter a location",
                        })}
                     />
                  </div>

                  <div className="">
                     <label className="capitalize font-semibold text-xl" htmlFor="product-category">category</label>
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
                        <label className="capitalize text-xl font-semibold my-2 block" htmlFor="condition">Condition</label>
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
                     <label htmlFor="image" className="text-xl capitalize font-semibold ">Upload Image:</label>
                     <label htmlFor="image" className="flex items-center gap-4 px-2 py-4 w-full 
                       border-2 border-dashed">
                     <RiImageAddFill className="w-16  h-16 text-primary"></RiImageAddFill>
                     <input
                     type="file"
                     id="image"
                     placeholder="image"
                     className="placeholder:text-accent text-base"
                     {
                        ...register('image', {required: "must upload an image"})
                       }
                  />
                  </label>
                  {
                     errors.image && <FormError>{errors.image.message}</FormError>
                  }
                  
               </div>
                  
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
