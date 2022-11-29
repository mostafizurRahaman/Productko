import React, { useContext, useImperativeHandle } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import useIsBuyer from '../../../hooks/useIsBuyer';
import Advertisement from '../Advertisement/Advertisement';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import OurServicesSection from '../OurSevicesSection/OurServicesSection';
import useTitle from '../../../hooks/useTitle'; 
const Home = () => {
      useTitle('Home')

   return (
      <div>
         <Banner></Banner>
         <Categories></Categories>
         <Advertisement></Advertisement>
         <OurServicesSection></OurServicesSection>
      </div>
   );
};

export default Home; 