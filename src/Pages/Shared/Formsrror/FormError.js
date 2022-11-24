import React from 'react';
import {MdOutlineError} from 'react-icons/md'; 
const FormError = ({children}) => {
   return (
      <div>
         <p className='text-red-500 font-bold flex items-center gap-3'> <MdOutlineError></MdOutlineError> <span className=''>{children}</span></p>    
      </div>
   );
};

export default FormError;