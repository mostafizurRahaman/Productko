import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import FormError from '../Shared/Formsrror/FormError';

const BookedProduct = () => {
   const product = useLoaderData(); 
   console.log(product); 
   const {register, handleSubmit, formState:{errors} } = useForm(); 
   const {user} = useContext(AuthContext); 
   const {_id,  productName,email, resellPrice, category } = product; 

   const handleBooking = (data) => {
       const date = new Date(); 
       const time = date.toLocaleTimeString(); 
       const currentDate = date.toLocaleDateString(); 
       const bookedProduct = { 
         product_id: _id, 
         productName, 
         email: user.email, 
         buyerName: user?.displayName, 
         location: data.location,
         phone: data.phone,  
         price: resellPrice, 
         sellerEmail :email, 
         orderTime: time, 
         orderDate: currentDate, 
         category_id: category, 
       }
       fetch(`http://localhost:5000/bookings`, {
         method: 'POST', 
         headers: {
            'content-type': 'application/json', 

         }, 
         body: JSON.stringify(bookedProduct)
       })
       .then(res =>res.json())
       .then(data => {
         if(data.acknowledged){
            toast.success(`${productName} is Booked.`)
         }
       })
       .catch(err =>console.log(err)); 

   }
   return (
      <div className='flex items-center justify-center  min-h-screen w-full '>
          <form onSubmit={handleSubmit(handleBooking)} className='w-[370px] px-5 rounded-lg  py-5 bg-accent flex flex-col gap-1'>
            <h2 className='text-2xl text-white font-bold text-center  '>Booking Form</h2>
            <div className='flex flex-col gap-1'>
               <label htmlFor="name " className='text-lg capitalize text-secondary font-bold '>Name: </label>
               <input type="name" id="name" placeholder="your name"  className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent py-1 rounded-lg " defaultValue={user?.displayName} readOnly
               />
            </div> 
            <div>
               <label className='text-lg capitalize text-secondary font-bold ' htmlFor="email">Buyer Email: </label>
               <input type="email" id="email"  className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent py-1 rounded-lg " defaultValue={user?.email} readOnly placeholder='buyer email: '
               />
            </div> 
            <div>
               <label className='text-lg capitalize text-secondary font-bold ' htmlFor="ProductName">Product Name: </label>
               <input type="text" id="ProductName"  className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent py-1 rounded-lg "
               placeholder='product name'
               defaultValue={productName}
               readOnly 
               />
            </div> 
            <div>
               <label className='text-lg capitalize text-secondary font-bold ' htmlFor="price">Price: </label>
               <input type="text" id="price"  className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent py-1 rounded-lg "
               placeholder='price'
               defaultValue={resellPrice}
               readOnly 
               />
            </div> 
            <div>
               <label className='text-lg capitalize text-secondary font-bold ' htmlFor="phone">Phone: </label>
               <input type="text" id="phone"  className="pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent py-1 rounded-lg "
               placeholder='phone Number'
                
               {
                  ...register('phone', {required: 'must enter a phone number' , pattern: {value: /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/, message: 'must enter a valid number'}})
               }
               />
               {
                  errors.phone &&  <FormError>{errors.phone.message}</FormError>
               }
            </div> 
            <div>
               <label className='text-lg capitalize text-secondary font-bold ' htmlFor="location">Location: </label>
               <input type="text" id='location' placeholder='location' className='pl-2  placeholder:capitalize  w-full  border-b-2 border-accent focus:border-b-primary outline-none duration-1000 transition-all focus:italic text-lg focus:text-accent py-1 rounded-lg ' 
               {...register('location', {required: "must enter a location"})}
               />
               {
                 errors.location && <FormError>{errors.location.message}</FormError>
               }
            </div>
            <div>
               <button className='text-xl text-white bg-primary  w-full px-3 py-1 rounded-lg '>Submit</button>
            </div>
          </form>
      </div>
   );
};

export default BookedProduct;
