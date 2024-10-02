import React, { createContext, useState } from 'react';

// Creating the context object
const LoginContext = createContext();

// Context provider component
const LoginContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({
    isloggedIn: false,
    jwt: null,
    userId: '',
    email: '',
    name:''
  });

  return (
    <LoginContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginContextProvider };
