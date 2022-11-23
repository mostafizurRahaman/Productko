import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../../Components/PrimaryButton';
import {ImCross} from 'react-icons/im'; 
import {FaBars} from 'react-icons/fa'; 
const Navbar = () => {
   const [show, setShow] = useState(false);  
   return (
      <div className='bg-secondary flex items-center justify-between px-5 md:px-20 h-24 md:border-2 md:fixed w-full  md:top-0 '>
         <div className='text-primary text-4xl font-bold '>
           <Link to='/'>  <h2>Product<span className=' text-accent '>ko</span></h2></Link>
         </div>
         <div className={` text-secondary md:text-primary flex flex-col absolute md:static top-24 right-0 md:flex-row items-center pt-5 md:pt-0  md:justify-center gap-5 md:text-xl bg-neutral md:bg-transparent  w-full  md:w-auto  h-screen md:h-auto transition-all md:transition-all duration-1000 bg-opacity-95 ${show ? 'top-24 right-0' : "right-[-999px]"} `}>
            <Link onClick={()=>setShow(!show)} to='/home'>Home</Link>
            <Link onClick={()=>setShow(!show)} to='/blog'>Blog</Link>
            <Link onClick={()=>setShow(!show)} to='/login'><PrimaryButton btnContent='Login'></PrimaryButton></Link>
            <Link onClick={()=>setShow(!show)} to='/register'><PrimaryButton btnContent='Register'></PrimaryButton></Link>
            
         </div>
         <div className='text-2xl md:hidden ' onClick={()=>setShow(!show)}>
           {
            show ? <ImCross></ImCross> : <FaBars></FaBars> 
           }
         </div>
      </div>
   );
};

export default Navbar;