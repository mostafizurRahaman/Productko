import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { baseURL } from "../configs/configs";

const useIsSeller = (email) => {
   const { logOut } = useContext(AuthContext);
   const [isSeller, setIsSeller] = useState(false);
   const [sellerLoading, setSellerLoading] = useState(true);
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
               setIsSeller(data.data.isSeller);
               setSellerLoading(false);
            })
            .catch((err) => console.log(err));
      }
   }, [email, logOut]);
   return { isSeller, sellerLoading };
};

export default useIsSeller;
