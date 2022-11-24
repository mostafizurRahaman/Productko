import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineGithub } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { ImGoogle3 } from "react-icons/im";
import { Link } from "react-router-dom";
import FormError from "../Shared/Formsrror/FormError";
import "./Register.css";
const Register = () => {
   const  {register, handleSubmit} = useForm(); 
   return (
      <div className="flex items-center justify-center min-h-screen registerBg">
         <div className=" h-[500px]  rounded-xl w-[330px] flex flex-col items-center justify-start bg-secondary opacity-90">
            <div className="w-60 border-1   font-medium capitalize text-xl  flex items-center justify-around gap-3 ">
               <Link
                  to="/register"
                  className="text-center text-secondary px-3 py-2 rounded-2xl my-3 w-1/2 bg-gradient-to-r from-primary to-info   "
               >
                  Register
               </Link>
               <Link to="/login" className="">
                  Login
               </Link>
            </div>
            <div className="flex items-center justify-center gap-5 mt-8">
               <ImGoogle3 className="w-8 h-8 text-accent  "></ImGoogle3>
               <AiOutlineGithub className="w-8 h-8 text-accent  "></AiOutlineGithub>
               <FaFacebook className="w-8 h-8 text-accent  "></FaFacebook>
            </div>

            <form className="mt-5 w-[280px]  flex items-center justify-center flex-col gap-5">
               <div className="w-full ">
                  <input
                     type="text"
                     id="name"
                     placeholder="name"
                     className="pl-2  placeholder:capitalize   w-full  border-b-2 border-accent focus:border-b-primary focus:text-accent outline-none duration-1000 transition-all focus:italic text-lg  "
                  />
               </div>
               <div className="w-full ">
                  <input
                     type="email"
                     id="email"
                     placeholder="email"
                     className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent "
                  />
               </div>
               <div className="w-full ">
                  <input
                     type="password"
                     id="password"
                     placeholder="password"
                     className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg  focus:text-accent"
                  />
               </div>
               <div className="w-full ">
                  <input
                     type="confirm"
                     id="confirm"
                     placeholder="confirm"
                     className= "pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg  focus:text-accent"
                  />
               </div>
               <div className="flex items-start flex-col gap-1 w-full">
                     <label className="text-start text-accent font-bold capitalize">Please your account type:</label>
                     <div className="flex items-center justify-center  gap-4">
                     <label htmlFor="buyer" className="text-accent  font-bold  text-xl">
                        <input
                           type="radio"
                           name="role"
                           value="buyer"
                           id="buyer"
                           checked
                           className="mr-2 "
                        />
                        Buyer
                     </label>
                     <label htmlFor="seller" className="text-accent  font-bold  text-xl">
                        <input
                           type="radio"
                           name="role"
                           id="seller"
                           value="seller"
                           className="mr-2 "
                           
                        />
                        Seller
                     </label>
                     </div>
                  </div>
               
               <div>
                  <button className="text-center text-secondary px-3 py-3 rounded-2xl my-3 w-[284px]  bg-gradient-to-r from-primary hover:from-accent hover:to-accent ease-in-out font-bold   transition-all duration-[2s] to-info ">Register</button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Register;
