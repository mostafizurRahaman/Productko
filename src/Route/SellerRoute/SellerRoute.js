import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useIsSeller from '../../hooks/useIsSeller';
import Loading from '../../Components/Loading/Loading';


const SellerRoute = ({children}) => {
   const { user, loading } = useContext(AuthContext);
   const { isSeller, sellerLoading } = useIsSeller(user?.email);
   const location = useLocation();

   if(loading || sellerLoading){
      return <Loading></Loading>
   }
   if(user && isSeller){
      return children;
   }


   return <Navigate to='/login' state={{form:location}} replace></Navigate>
   
   
};

export default SellerRoute;