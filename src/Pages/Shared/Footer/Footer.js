import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <div className="">
         <footer className="flex gap-3 justify-between md:flex-row flex-col  items-center p-4 py-6 bg-accent text-secondary sticky  ">
            <div>
               <Link to="/" className="text-2xl font-bold ">
                  <h2>
                     Product<span className=" text-primary">ko</span>
                  </h2>
               </Link>
            </div>

            <div className="text-base font-bold">
               <p>Copyright © 2022 - All right reserved by productKo</p>
            </div>
         </footer>
      </div>
   );
};

export default Footer;
