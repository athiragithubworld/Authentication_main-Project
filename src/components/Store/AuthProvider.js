import AuthContext from "./AuthContext";
import React, { useState } from "react";

const AuthProvider = (props) => {
  const intialToken = localStorage.getItem("token");

  const [token, setToken] = useState(intialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", "1");
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
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
