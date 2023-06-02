import AuthContext from "./AuthContext";
import React, { useState } from "react";

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const AuthProvider = (props) => {
  const intialToken = localStorage.getItem("token");

  const [token, setToken] = useState(intialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);

    const remainingTime = calculateRemainingTime(expirationTime);

    // setTimeout(logoutHandler, remainingTime);

    setTimeout(() => {
      logoutHandler();
    }, 5000);
  };

  const contextvalue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextvalue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
