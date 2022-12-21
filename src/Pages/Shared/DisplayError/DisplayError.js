import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const DisplayError = () => {
   const {logOut} = useContext(AuthContext); 
   const error = useRouteError(); 
   const navigate = useNavigate(); 
   
   const handleLogOut = () => {
       logOut()
       .then(()=>{
            navigate('/login'); 
       })
       .catch(err =>console.log(err));    
   }

   return (
      <div className='flex items-center justify-center  flex-col gap-5 min-h-screen'>
         <h3 className=' text-4xl md:text-7xl font-bold capitalize  text-red-600'>You are not a buyer.</h3>
         <button className='px-5 py-2 bg-primary rounded-xl text-secondary  text-base font-bold ' onClick={handleLogOut}>LogOut </button>
         <p className='text-2xl md:text-3xl text-red-500 font-bold '>Please and login as a buyer</p>

      </div>
   )
};

export default DisplayError;