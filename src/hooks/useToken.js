import { useEffect, useState } from "react";
import { baseURL } from "../configs/configs";

const useToken = (email) => {
   const [token, setToken] = useState("");
   useEffect(() => {
      if (email) {
         fetch(`${baseURL}/user/jwt?email=${email}`)
            .then((res) => res.json())
            .then((data) => {
               if (data.status === "success") {
                  setToken(data?.data?.accessToken);
                  console.log(data?.data?.accessToken);
                  localStorage.setItem(
                     "productKoToken",
                     data.data?.accessToken
                  );
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }, [email]);

   return { token };
};

export default useToken;
