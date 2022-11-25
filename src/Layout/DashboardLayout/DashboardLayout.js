import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../Pages/Shared/Navbar/Navbar'; 
import {BiShow, BiHide} from 'react-icons/bi'; 

const DashboardLayout = () => {
   const [sideMenu , setSideMenu ]  =useState(false); 
   return (
      <div className='relative'>
         <Navbar></Navbar>
         <div className='w-full flex relative '>
             <div className={`  gap-5 text-secondary  flex w-60 bg-accent min-h-screen absolute md:sticky md:top-24 md:left-0 ${sideMenu ? 'left-0 bg-opacity-90 md:bg-opacity-100' : "left-[-999px] "}`}>
              <Link className='w-full'  to='/dashboard/AddProducts'>
                  <button className='font-bold text-xl  border-b-2  border-secondary  w-full py-3 hover:bg-primary inline-block text-center'>Add Product</button>
              </Link>
               
             </div>
             <div className='flex grow'>
                <Outlet></Outlet>
             </div>
         </div>
         <div className='z-50 flex items-center justify-center text-2xl text-secondary rounded-full absolute top-8 right-16  w-8 h-8 bg-accent md:hidden ' onClick={()=>setSideMenu(!sideMenu)}> 
               {
                     sideMenu ?<BiHide></BiHide> :  <BiShow></BiShow>
               }
         </div>
      </div>
   );
};

export default DashboardLayout; 