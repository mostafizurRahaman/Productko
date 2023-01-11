import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useIsBuyer = (email) => {
   const {logOut} = useContext(AuthContext); 
   const [isBuyer, setBuyer] = useState(false);
   const [buyerLoading, setBuyerLoading] = useState(true);
   useEffect(() => {
      if (email) {
         fetch(`https://productko-server.vercel.app/users/buyer/${email}`, {
            headers: {
               authorization: `Bearer ${localStorage.getItem(
                  "productKoToken"
               )}`,
            },
         })
         .then(res => {
            if(res.status === 403  || res.status===401){
               logOut();
               return; 
            }
            return res.json(); 
         })
            .then((data) => {

               setBuyer(data.isBuyer);
               console.log(data.isBuyer);
               setBuyerLoading(false);
            })
            .catch((err) => console.log(err));
      }
   }, [email, logOut]);
   return { isBuyer, buyerLoading};
};

export default useIsBuyer;
