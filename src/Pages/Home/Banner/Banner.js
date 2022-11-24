import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../../Components/PrimaryButton';
import heroImage from '../../../Assests/hero-image.png'; 
const Banner = () => {
   return (
      <div className='w-full px-20 py-5 md:py-10 flex  md:flex-row flex-col-reverse  items-center justify-center gap-10'>
          <div className="">
               <h2 className='text-3xl md:text-6xl  font-bold text-accent' style={{lineHeight: '1.3em'}}><span className='text-primary'>Buy Good</span> <br />Products at low price. </h2>
               <p className='text-xl font-medium  text-accent'>We are a reseller company who provides you some products at low price.</p>
               <Link to='/' className='mt-5 inline-block '><PrimaryButton btnContent='Buy Now'></PrimaryButton></Link>
          </div>
          <div>
               <img src={heroImage} alt='reseller_image' className='md:w-full mx-auto' />
          </div>
      </div>
   );
};

export default Banner;