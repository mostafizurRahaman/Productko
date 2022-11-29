import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../../Assests/errorimage.png";
import "./ErrorPage.css";
import useTitle from '../../hooks/useTitle'; 
const ErrorPage = () => {
          useTitle('404 error page')
   return (
      <div className="flex items-center justify-center   bg-errorPage min-h-screen px-5  md:px-10 flex-col md:flex-row ">
         <div className="space-y-4 flex items-center justify-center flex-col md:w-1/2 w-full ">
            <h1 className="text-5xl  md:text-8xl text-red-600 font-bold capitalize ">
               OPPS
            </h1>
            <h2 className="text-4xl font-bold  md:text-7xl "> 404 error </h2>
            <Link to='/'>
               <button className="capitalize  block  px-5 py-3 bg-red-600 font-bold rounded-xl border-none text-white ">
                  back to home page
               </button>
            </Link>
         </div>
         <div className="md:w-1/2 w-full ">
            <img src={errorImage} alt="error_image " />
         </div>
      </div>
   );
};

export default ErrorPage;
