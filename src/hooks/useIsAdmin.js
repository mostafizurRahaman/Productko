import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useIsAdmin = (email) => {
   const {logOut} =useContext(AuthContext); 
   const [isAdmin, setIsAdmin] = useState(false);
   const [adminLoading, setAdminLoading] = useState(true);
   useEffect(() => {
      if (email) {
         fetch(`http://localhost:5000/users/admin/${email}`, {
            headers: {
               authorization: `Bearer ${localStorage.getItem('productKoToken')}`,
            }
         })
         .then(res => {
            if(res.status === 403  || res.status===401){
               logOut();
               return; 
            }
            return res.json(); 
         })
            .then((data) => {
               setIsAdmin(data.isAdmin);
               setAdminLoading(false);
            })
            .catch((err) => console.log(err));
      }
   }, [email, logOut]);
   return {isAdmin, adminLoading};
};

export default useIsAdmin;


