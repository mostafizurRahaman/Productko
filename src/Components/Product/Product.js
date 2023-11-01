import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { BsFlagFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";
import { format } from "date-fns";
import { accessToken, baseURL } from "../../configs/configs";

const Product = ({ product, refetch }) => {
   const {
      _id,
      condition,
      image,
      originalPrice,

      createdAt,
      name,
      resellPrice,
      sellerInfo,
      yearsOfUse,
      description,
      status,
   } = product;
   const { logOut } = useContext(AuthContext);

   const handleReport = async (product) => {
      try {
         const res = await fetch(`${baseURL}/product/${product._id}`, {
            method: "PATCH",
            headers: {
               "content-type": "application/json",
               authorization: accessToken,
            },
            body: JSON.stringify({
               status: "reported",
            }),
         });
         if (res.status === 403 || res.status === 401) {
            logOut();
            return;
         }
         const data = await res.json();
         console.log(data);
         if (data.status === "success") {
            toast.success(`${product.name} reported `);
            refetch();
         } else {
            toast.error("product doesn't reported successfully");
         }
      } catch (err) {
         toast.error(err.message);
      }
   };
   return (
      <div className="border-2 border-accent relative p-3 rounded-2xl pb-16 text-white bg-accent text-sm ">
         <div className="rounded-2xl relative">
            <img
               src={image}
               className=" w-full h-[300px] rounded-lg"
               alt={name}
            />
         </div>
         <div className="flex  flex-col flex-grow gap-4">
            <div className="flex flex-col gap-2">
               <div className="capitalize space-y-1 ">
                  <div className="flex justify-between items-center mt-3">
                     <h3 className="text-2xl">{name}</h3>
                     <div className="flex items-center justify-center gap-3  text-base">
                        <BsFlagFill
                           onClick={() => handleReport(product)}
                           className={`cursor-pointer text-xl ${
                              status === "reported" && "text-red-500"
                           }`}
                        ></BsFlagFill>
                        <p>{status === "reported" ? "reported" : "report"}</p>
                     </div>
                  </div>

                  <div className="flex gap-1">
                     <p> use : {yearsOfUse} / </p>
                     <p>quality: {condition}</p>
                  </div>
                  <p>
                     posted at:{" "}
                     {format(new Date(createdAt || Date.now()), "yyyy/MM/dd")}{" "}
                     on {format(new Date(createdAt || Date.now()), "h:m aaa")}
                  </p>
                  <button className="px-2 py-1 bg-secondary text-accent inline-block mr-2 rounded-xl font-semibold capitalize">
                     price: ${resellPrice}
                  </button>
                  <button className="px-2 py-1 bg-secondary text-accent inline-block mr-2 rounded-xl font-semibold capitalize">
                     regular: ${originalPrice}
                  </button>
               </div>
               <div className="capitalize">
                  <h1 className="text-2xl ">Seller Info</h1>
                  <h3 className="text-base font-bold flex items-center justify-start gap-1">
                     Name: {sellerInfo.id.name}
                     {sellerInfo.id.isVerified && (
                        <MdVerified className="text-[20px] text-green-500 "></MdVerified>
                     )}
                  </h3>
                  <p>
                     email:{" "}
                     <span className=" normal-case ">
                        {sellerInfo?.id?.email}
                     </span>
                  </p>
                  <p>Phone: {sellerInfo.phone}</p>
                  <p>Location: {sellerInfo.location}</p>
               </div>
            </div>
            <div className="">
               <p>{description}</p>
            </div>
            <div className="absolute w-full px-5 left-0  bottom-2">
               <Link to={`/product/${_id}`} className="w-full block">
                  <button className="px-2 py-1  bg-secondary text-accent inline-block mr-2 rounded-xl font-bold  capitalize w-full text-xl ">
                     Book Now
                  </button>
               </Link>
            </div>
         </div>
         <div></div>
      </div>
   );
};

export default Product;
