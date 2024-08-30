// /src/context/LoginContext.jsx
import React, { createContext, useState } from 'react';

// Creating the context object
const LoginContext = createContext();

// Context provider component
const LoginContextProvider = ({ children }) => {
  const [isloggedIn, setIsLoggedIn] = useState({
    login: false,
    jwt: 'null',
    userType: 'patient',
    userId: '',
    email: ''
  });

  return (
    <LoginContext.Provider value={{ isloggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginContextProvider };
