import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { baseURL } from "../configs/configs";

const useIsBuyer = (email) => {
   const { logOut } = useContext(AuthContext);
   const [isBuyer, setBuyer] = useState(false);
   const [buyerLoading, setBuyerLoading] = useState(true);
   useEffect(() => {
      if (email) {
         fetch(`${baseURL}/user/me`, {
            headers: {
               authorization: `Bearer ${localStorage.getItem(
                  "productKoToken"
               )}`,
            },
         })
            .then((res) => {
               if (res.status === 403 || res.status === 401) {
                  logOut();
                  return;
               }
               return res.json();
            })
            .then((data) => {
               console.log(data);
               setBuyer(data.data.isBuyer);
               console.log(data.data.isBuyer);
               setBuyerLoading(false);
            })
            .catch((err) => console.log(err));
      }
   }, [email, logOut]);
   return { isBuyer, buyerLoading };
};

export default useIsBuyer;
