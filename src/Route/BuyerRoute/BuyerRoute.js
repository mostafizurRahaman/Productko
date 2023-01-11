import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useIsBuyer from '../../hooks/useIsBuyer';
import Loading from '../../Pages/Shared/Loading/Loading';

const BuyerRoute = ({children}) => { 
   const { user, loading } = useContext(AuthContext);
   const { isBuyer, buyerLoading } = useIsBuyer(user?.email);
   const location = useLocation();

   if(loading || buyerLoading){
      return <Loading></Loading>
   }
   if(user?.email && isBuyer){
      return children; 
   }
   return <Navigate to="/login" state={{form: location}} replace></Navigate>
};

export default BuyerRoute;