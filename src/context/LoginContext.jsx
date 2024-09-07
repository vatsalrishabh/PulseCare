// /src/context/LoginContext.jsx
import React, { createContext, useState } from 'react';

// Creating the context object
const LoginContext = createContext();  //ek object banaya ye kb aur kaha use hog dekhte hai

// Context provider component
const LoginContextProvider = ({ children }) => {
  const [isloggedIn, setIsLoggedIn] = useState({
    login: false,
    jwt: 'null',
    userType: 'patient',
    userId: '',
    email: ''
  });

  // Function to log in the user
  const loginUser = (jwt, userType, userId, email) => {
    setIsLoggedIn({
      login: true,
      jwt,
      userType,
      userId,
      email,
    });
  };

  // Function to log out the user
  const logoutUser = () => {
    setIsLoggedIn({
      login: false,
      jwt: 'null',
      userType: 'patient',
      userId: '',
      email: ''
    });
  };

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    return isloggedIn.login;
  };

  return (
    <LoginContext.Provider value={{ isloggedIn, setIsLoggedIn, loginUser, logoutUser, isAuthenticated }}>
    {children}
  </LoginContext.Provider>
  );
};

export { LoginContext, LoginContextProvider };
