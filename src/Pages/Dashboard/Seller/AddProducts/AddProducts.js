import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import FormError from "../../../Shared/Formsrror/FormError";

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
      <div>
         <div className="  my-6 flex items-center justify-center">
            <form
               onSubmit={handleSubmit(handleAddProduct)}
               className="bg-neutral w-3/5 p-5 rounded-2xl"
            >
               <h2 className="text-4xl mb- font-bold text-center capitalize text-secondary ">
                  Add Your product
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-secondary ">
                  <div>
                     <label htmlFor="sellerName">Seller Name</label>
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
                     <label htmlFor="product-name">Product Name:</label>
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
                     <label htmlFor="email">Email:</label>
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
                     <label htmlFor="phone">phone:</label>
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
                     <label htmlFor="original-price">Original price:</label>
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
                     <label htmlFor="resellPrice">reselling price:</label>
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
                     <label htmlFor="yearsOfUse">Years of Use: </label>
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
                     <label htmlFor="location">location</label>
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

                  <div>
                     <label htmlFor="product-category">category</label>
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
                  </div>
                  <div>
                     <label htmlFor="condition">Condition</label>
                     <label htmlFor="excellent">
                        <input
                           type="radio"
                           name="condition"
                           value="excellent"
                           id="excellent"
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
                           {...register("condition", {
                              required: "must select an condition",
                           })}
                        />
                        fair
                     </label>
                     {errors.condition && (
                        <FormError>{errors.condition.message}</FormError>
                     )}
                  </div>
               </div>

               <div>
                  <button
                     type="submit"
                     className="bg-primary text-secondary text-xl px-6 rounded-3xl hover:bg-transparent hover:text-primary  hover:border-2 border-primary transition-all duration-500   py-1"
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
