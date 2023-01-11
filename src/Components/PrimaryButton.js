import React from 'react';

const PrimaryButton = ({btnContent}) => {
   return (
     <button className='mt-1 ml-1 hover:-mt-1 hover:-ml-1 bg-primary text-secondary text-xl px-6 hover:px-5 rounded-3xl hover:bg-transparent hover:text-primary  hover:border-2 border-primary transition-all duration-[1.4s]  py-2 ' style={{letterSpacing: '1.2px'}}>{btnContent}</button>
   );
};

export default PrimaryButton;