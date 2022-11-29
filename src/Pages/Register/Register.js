
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineGithub } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { ImGoogle3 } from "react-icons/im";
import { RiImageAddFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useTitle from "../../hooks/useTitle";
import useToken from "../../hooks/useToken";

import FormError from "../Shared/Formsrror/FormError";
import Loading from "../Shared/Loading/Loading";
import "./Register.css";
const Register = () => {
   useTitle('Register'); 
   const [createdEmail, setCreatedEmail] = useState("");
   const { token } = useToken(createdEmail);
   const { createUser, addInfo, GoogleSignIn } = useContext(AuthContext);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const [generalErrors, setGeneralErrors] = useState("");
   const navigate = useNavigate();
   const [loading, setLoading] = useState("");
   const imageHostKey = process.env.REACT_APP_Image_BB_KEY;

   if (token) {
      navigate("/");
   }
   if (loading) {
      return <Loading></Loading>;
   }

   const handleRegister = (data) => {
      setLoading(true);
      setGeneralErrors("");
      if (data.password !== data.confirm) {
         setGeneralErrors("password & confirm password not matched");
         return;
      }
      const image = data.image[0];
      const formData = new FormData();
      formData.append("image", image);
      fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
         method: "POST",
         body: formData,
      })
         .then((res) => res.json())
         .then((imageData) => {
            console.log(imageData, imageData.success);
            if (imageData.success) {
               const userPhoto = imageData.data.url;
               createUser(data.email, data.password)
                  .then((res) => {
                     const user = res.user;
                     updateUser({
                        displayName: data.name,
                        photoURL: userPhoto,
                     });
                     const newUser = {
                        name: data.name,
                        email: data.email,
                        photoURL: userPhoto,
                        role: data.role,
                     };
                     savedUser(newUser);
                  })
                  .catch((err) => {
                     setGeneralErrors(err.message);
                  });
            }
         })
         .catch((err) => {
            setGeneralErrors(err.message);
         })
         .finally(() => {
            setLoading(false);
         });
   };

   const updateUser = (profile) => {
      addInfo(profile)
         .then(() => {})
         .catch((err) => console.log(err));
   };

   const handleGoogleLogin = () => {
      setLoading(true);
      setGeneralErrors("");
      GoogleSignIn()
         .then((res) => {
            const user = res.user;
            const newUser = {
               name: user.displayName,
               email: user.email,
               photoURL: user.photoURL,
               role: "buyer",
            };
            savedUser(newUser);
         })
         .catch((err) => console.log(err))
         .finally(() => {
            setLoading(false);
         });
   };

   const savedUser = (user) => {
      fetch("https://productko-server.vercel.app/users", {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.acknowledged || data.alreadyAdded) {
               setCreatedEmail(user.email);
               toast.success(
                  `Congratulations ${user.name}, your account created Successfully`
               );
               setLoading(false);
            }
         })
         .catch((err) => console.log(err));
   };
   return (
      <div className="flex items-center justify-center min-h-screen  py-5 registerBg">
         <div className=" min-h-[500px] py-2 h-auto   rounded-xl w-[360px] flex flex-col items-center justify-start bg-secondary opacity-90">
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
               <ImGoogle3
                  onClick={handleGoogleLogin}
                  className="w-8 h-8 text-accent  "
               ></ImGoogle3>
               <AiOutlineGithub className="w-8 h-8 text-accent  "></AiOutlineGithub>
               <FaFacebook className="w-8 h-8 text-accent  "></FaFacebook>
            </div>

            <form
               className="mt-5 w-[320px]  flex items-center justify-center flex-col gap-5"
               onSubmit={handleSubmit(handleRegister)}
            >
               <div className="w-full flex flex-col gap-1">
                  <input
                     type="text"
                     id="name"
                     placeholder="name"
                     className="pl-2  placeholder:capitalize   w-full  border-b-2 border-accent focus:border-b-primary focus:text-accent outline-none duration-1000 transition-all focus:italic text-lg  "
                     {...register("name", {
                        required: "please enter  valid name",
                     })}
                  />
                  {errors.name && <FormError>{errors.name.message}</FormError>}
               </div>
               <div className="w-full flex flex-col gap-1">
                  <input
                     type="email"
                     id="email"
                     placeholder="email"
                     className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent "
                     {...register("email", {
                        required: "please enter a email",
                        pattern: {
                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                           message: "email must be valid",
                        },
                     })}
                  />
                  {errors.email && (
                     <FormError>{errors.email.message}</FormError>
                  )}
               </div>
               <div className="w-full flex flex-col gap-1">
                  <input
                     type="password"
                     id="password"
                     placeholder="password"
                     className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg  focus:text-accent"
                     {...register("password", {
                        required: "please enter a password",
                        pattern: {
                           value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
                           message: "enter a valid password",
                        },
                     })}
                  />
                  {errors.password && (
                     <FormError>{errors.password.message}</FormError>
                  )}
               </div>
               <div className="w-full flex flex-col gap-1">
                  <input
                     type="password"
                     id="confirm"
                     placeholder="confirm"
                     className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg  focus:text-accent"
                     {...register("confirm", {
                        required: "please enter a confirm",
                        pattern: {
                           value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
                           message: "enter a valid confirm",
                        },
                     })}
                  />
                  {errors.confirm && (
                     <FormError>{errors.confirm.message}</FormError>
                  )}
               </div>
               <div className="w-full flex flex-col gap-1">
                  <label
                     htmlFor="image"
                     className="flex items-center gap-4 px-2 py-3 w-full 
                       border-2 border-dashed"
                  >
                     <RiImageAddFill className="w-20  h-20 text-primary"></RiImageAddFill>
                     <input
                        type="file"
                        id="image"
                        placeholder="image"
                        className=""
                        {...register("image", {
                           required: "must upload an image",
                        })}
                     />
                  </label>
                  {errors.image && (
                     <FormError>{errors.image.message}</FormError>
                  )}
               </div>
               <div className="flex items-start flex-col gap-1 w-full">
                  <label className="text-start text-accent font-bold capitalize">
                     Please your account type:
                  </label>
                  <div className="flex items-center justify-center  gap-4">
                     <label
                        htmlFor="buyer"
                        className="text-accent  font-bold  text-xl"
                     >
                        <input
                           type="radio"
                           name="role"
                           value="buyer"
                           id="buyer"
                           checked
                           className="mr-2 "
                           {...register("role", {
                              required: "please  select what type account",
                           })}
                        />
                        Buyer
                     </label>
                     <label
                        htmlFor="seller"
                        className="text-accent  font-bold  text-xl"
                     >
                        <input
                           type="radio"
                           name="role"
                           id="seller"
                           value="seller"
                           className="mr-2 "
                           {...register("role", {
                              required: "please  select what type account",
                           })}
                        />
                        Seller
                     </label>
                     {errors.role && (
                        <FormError>{errors.role.message}</FormError>
                     )}
                  </div>
               </div>
               <div>
                  {generalErrors && <FormError>{generalErrors}</FormError>}
               </div>

               <div>
                  <button
                     type="submit"
                     className="text-center text-secondary px-3 py-3 rounded-2xl my-3 w-[320px]  bg-gradient-to-r from-primary hover:from-accent hover:to-accent ease-in-out font-bold   transition-all duration-[2s] to-info "
                  >
                     Register
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Register;
