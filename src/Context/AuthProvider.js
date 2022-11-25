import React, { createContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'; 
import app from "../Firebase/firebase.config";
 export const AuthContext = createContext();
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

   const addInfo = (profile) => {
      return updateProfile(auth.currentUser, profile)
   }
   useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
             setUser(currentUser);
             setLoading(false);  
             console.log(currentUser); 
      })
      return () => unsubscribe(); 
   })
   const authInfo = {user,LogIn, createUser, logOut,GoogleSignIn, setLoading, loading, addInfo};
   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
 