import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
   return (
      <div className=''>
         <footer className="footer items-center p-4 bg-accent text-secondary sticky  ">
  <div className="items-center grid-flow-col">
  <Link to='/' className='text-2xl font-bold '>  <h2>Product<span className=' text-primary   '>ko</span></h2></Link>
  </div> 
  <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
         <p>Copyright © 2022 - All right reserved by productKo</p>
  </div>
</footer>
      </div>
   );
};

export default Footer;