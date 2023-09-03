import React from "react";
import Advertisement from "../../Components/Advertisement/Advertisement";
import Banner from "../../Components/Banner/Banner";
import Categories from "../../Components/Categories/Categories";
import OurServicesSection from "../../Components/Advertisement/OurSevicesSection/OurServicesSection";
import useTitle from "../../hooks/useTitle";
const Home = () => {
   useTitle("Home");

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
