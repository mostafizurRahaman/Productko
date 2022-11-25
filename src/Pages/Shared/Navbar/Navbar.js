import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import NavbarButton from '../../../Components/NavbarButton';
import {ImCross} from 'react-icons/im'; 
import {FaBars} from 'react-icons/fa'; 
import { AuthContext } from '../../../Context/AuthProvider';
import { RiContactsBookLine } from 'react-icons/ri';
const Navbar = () => {
   const [show, setShow] = useState(false);  
   const {user, logOut} = useContext(AuthContext); 
   const navigate  = useNavigate(); 
   const handleLogOut = () => {
      logOut()
      .then(()=>{
            localStorage.removeItem('productKoToken'); 
            navigate('/login'); 
      })
      .catch(err => console.log(logOut)); 
   }
   return (
      <div className='bg-secondary flex items-center justify-between px-5 md:px-20 h-24 md:border-2 sticky w-full  top-0 z-50 '>
         <div className='text-primary text-4xl font-bold '>
           <Link to='/'>  <h2>Product<span className=' text-accent '>ko</span></h2></Link>
         </div>
         <div className={` text-secondary md:text-primary flex flex-col absolute md:static top-24 right-0 md:flex-row items-center pt-5 md:pt-0  md:justify-center gap-5 md:text-xl bg-neutral md:bg-transparent  w-full  md:w-auto  h-screen md:h-auto transition-all md:transition-all duration-1000 bg-opacity-95 ${show ? 'top-24 right-0' : "right-[-999px]"} `}>
            <Link className='bg-primary text-secondary text-xl px-6 rounded-3xl hover:bg-transparent hover:text-primary  hover:border-2 border-primary transition-all duration-500  py-1 ' onClick={()=>setShow(!show)} to='/home'>Home</Link>
            <Link className='bg-primary text-secondary text-xl px-6 rounded-3xl hover:bg-transparent hover:text-primary  hover:border-2 border-primary transition-all duration-500  py-1 ' onClick={()=>setShow(!show)} to='/dashboard/addProducts'>Add Products</Link>
            <Link className='bg-primary text-secondary text-xl px-6 rounded-3xl hover:bg-transparent hover:text-primary  hover:border-2 border-primary transition-all duration-500  py-1 '  onClick={()=>setShow(!show)} to='/blog'>Blog</Link>
           {
            user?.uid 
            ? 

            <>
               <button onClick={()=>{
                  setShow(!show)
                  handleLogOut(); 
               }}  className='bg-primary text-secondary text-xl px-6 rounded-3xl hover:bg-transparent hover:text-primary  hover:border-2 border-primary transition-all duration-500  py-1 '>Log out</button>
               <Link><img src={user?.photoURL} alt={user?.displayName}  className="rounded-full w-10 h-10 "/></Link>
            </>
            : 
            <>
                <Link  onClick={()=>setShow(!show)} to='/login'><NavbarButton btnContent='Login'></NavbarButton></Link>
               <Link onClick={()=>setShow(!show)} to='/register'><NavbarButton btnContent='Register'></NavbarButton></Link>
            </>

           }
            
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