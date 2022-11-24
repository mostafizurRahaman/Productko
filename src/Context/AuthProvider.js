import React, { createContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'; 
import app from "../Firebase/firebase.config";
const AuthContext = createContext();
const auth = getAuth(app); 
const googleProvider = new GoogleAuthProvider(); 
const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null); 
   const [loading, setLoading] = useState(true); 

   const createUser = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password); 
   }
   const LogIn = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password); 
   }

   const logOut = () => {
      return signOut(auth); 
   }

   const GoogleSignIn = () => {
      return signInWithPopup(auth, googleProvider); 
   }

   useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
             setUser(currentUser);
             setLoading(false);  
      })
      return () => unsubscribe(); 
   })
   const authInfo = {user,LogIn, createUser, logOut,GoogleSignIn, setLoading, loading};
   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
 