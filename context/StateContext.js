import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onIdTokenChanged, signOut } from 'firebase/auth';
import {auth} from '@/backend/Firebase'

const Context = createContext();

export const StateContext = ({ children }) => {

  // Variables to Carry Across Multiple Pages
  const [user, setUser] = useState(undefined)

  const router = useRouter()
  const { asPath } = useRouter()

  // AUTHENTICATION REMEMBER ME USEEFFECT
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      if(user){
        console.log('Token or user state changed:', user)
        user.getIdToken().then((token) => {
          console.log('New ID token:', token)
        })
        setUser(user)
      } else {
        setUser(null) //there is no user signed in
      }
    });
    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/auth/signup")
  }



return(
    <Context.Provider
    value={{
        user,
        setUser,
        signOutUser
    }}
    >
      {children}
    </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
