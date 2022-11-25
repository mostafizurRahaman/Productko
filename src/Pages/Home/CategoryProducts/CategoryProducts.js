import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from '../../Shared/Product/Product';

const CategoryProducts = () => {
   const products = useLoaderData(); 
   console.log(products); 
   return (
      <div className='px-20 py-5 '>
          <div className="flex items-center justify-center">
          <h2 className='pb-2 my-12  text-4xl text-accent md:text-6xl font-bold capitalize  text-center border-b-2 border-accent '>Our Products</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full gap-10 '>
               {
                  products.map(product => <Product key={product._id} product={product} ></Product>)
               }
          </div>
      </div>
   );
};

export default CategoryProducts;