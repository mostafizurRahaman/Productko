import { useEffect, useState } from "react";

const useToken = (email) => {
   const [token, setToken] = useState("");
   useEffect(() => {
      if (email) {
         fetch(`https://productko-server.vercel.app/jwt?email=${email}`)
            .then((res) => res.json())
            .then((data) => {
               setToken(data.token);
               localStorage.setItem("productKoToken", data.token);
            })
            .catch((err) => console.log(err));
      }
   }, [email]);

   return { token };
};

export default useToken;
