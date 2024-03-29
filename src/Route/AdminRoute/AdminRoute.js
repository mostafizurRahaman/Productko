import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useIsAdmin from "../../hooks/useIsAdmin";
import Loading from '../../Components/Loading/Loading'; 

const AdminRoute = ({ children }) => {
   const { user, loading } = useContext(AuthContext);
   const { isAdmin, adminLoading } = useIsAdmin(user?.email);
   const location = useLocation();

   if (loading || adminLoading) {
      return <Loading></Loading>;
   }
   if (user && isAdmin) {
      return children;
   }
   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
