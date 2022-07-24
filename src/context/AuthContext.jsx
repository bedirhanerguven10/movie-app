import React, { useEffect } from 'react';
// import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { userObserver } from '../auth/firebase';

export const AuthContext = createContext();
//* with custom hook


const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    
    userObserver(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

