import React from 'react';
import { Link } from 'react-router-dom';
import {ImGoogle3} from "react-icons/im";
import {AiOutlineGithub} from 'react-icons/ai';  
import { FaFacebook } from 'react-icons/fa';
import './Login.css'; 
const Login = () => {
   return (
      <div className='flex items-center justify-center min-h-screen  loginBg  '   >
            <div className=' h-[330px] rounded-xl w-[330px] flex flex-col items-center justify-start bg-secondary '>
               <div className='w-60 border-1   font-medium capitalize text-xl  flex items-center justify-between gap-3 '>
               <Link to='/register' className='w-1/2'>Register</Link>
                <Link to='/login' className='text-center text-secondary px-3 py-2 rounded-2xl my-3 w-1/2 bg-gradient-to-r from-primary to-info   ' >Login</Link>
              
               </div>
               <div className='flex items-center justify-center gap-5  mt-8'>
                  <ImGoogle3 className='w-8 h-8 text-accent  '></ImGoogle3>                 
                  <AiOutlineGithub className='w-8 h-8 text-accent  '></AiOutlineGithub>
                  <FaFacebook className='w-8 h-8 text-accent  '></FaFacebook>
               </div>

               <form className="mt-5 w-[280px]  flex items-center justify-center flex-col gap-5">
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
               
               
               <div>
                  <button className="text-center text-secondary px-3 py-3 rounded-2xl my-3 w-[284px]  bg-gradient-to-r from-primary hover:from-accent hover:to-accent ease-in-out font-bold   transition-all duration-[2s] to-info " type='submit'>Login</button>
               </div>
            </form>
            </div>
      </div>
   );
};

export default Login;