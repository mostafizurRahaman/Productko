import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({product}) => {
   const {_id, condition, email,image,location,originalPrice,phone,postDate,postTime,productName,resellPrice,sellerName,yearsOfUse,description} = product;  
   return (
      <div className='border-2 border-accent p-3 rounded-2xl  text-white bg-accent text-sm '>
         <div className='rounded-2xl'>
               <img src={image} className=" w-full rounded-lg"  alt={productName} />
         </div>
         <div className='flex  flex-col flex-grow gap-4'>
             <div className='flex flex-col gap-2'>
               <div className='capitalize space-y-1 '>
                     <h3 className='text-2xl  mt-3'>{productName}</h3>
                     <div className='flex gap-1'>
                        <p> use : {yearsOfUse} /  </p>
                        <p>quality: {condition}</p>
                     </div>
                     <p>posted at: {postTime}  on {postDate} </p>
                     <button className='px-2 py-1 bg-secondary text-accent inline-block mr-2 rounded-xl font-semibold capitalize'>price: ${resellPrice}</button>
                     <button className='px-2 py-1 bg-secondary text-accent inline-block mr-2 rounded-xl font-semibold capitalize'>regular: ${originalPrice}</button> 
               </div>
               <div className=''>
                  <h1 className='text-2xl '>Seller Info</h1>
                  <h3>Name: {sellerName}</h3>
                  <p>email: {email}</p>
                  <p>Phone: {phone}</p>
                  <p>Location: {location}</p>
               </div>           
             </div>
             <div className=''>
                 <p>{description}</p>
             </div>
             <div>
                <Link to={`/product/${_id}`}>
                <button className='px-2 py-1 bg-secondary text-accent inline-block mr-2 rounded-xl font-bold  capitalize w-full text-xl '>Book Now</button>
                </Link>
             </div>
             
             
         </div>
         <div>
            
         </div>         
      </div>
   );
};

export default Product; 