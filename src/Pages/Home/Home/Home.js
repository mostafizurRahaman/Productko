import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import useIsBuyer from '../../../hooks/useIsBuyer';
import Advertisement from '../Advertisement/Advertisement';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import OurServicesSection from '../OurSevicesSection/OurServicesSection';

const Home = () => {
      const {user} = useContext(AuthContext); 
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