import React from 'react';

const NavbarButton = ({btnContent}) => {
   return (
      <button className='bg-primary text-secondary text-xl px-6 rounded-3xl hover:bg-transparent hover:text-primary  hover:border-2 border-primary transition-all duration-500   py-1 ' style={{letterSpacing: '1.2px'}}>{btnContent}</button>
   );
};

export default NavbarButton;