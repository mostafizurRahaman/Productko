import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import useIsBuyer from '../../../hooks/useIsBuyer';
import Advertisement from '../Advertisement/Advertisement';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';

const Home = () => {
      const {user} = useContext(AuthContext); 
      const {isBuyer} = useIsBuyer(user?.email); 
   return (
      <div>
         <Banner></Banner>
         <Categories></Categories>
         {
            isBuyer && <Advertisement></Advertisement>
         }
         
      </div>
   );
};

export default Home; 