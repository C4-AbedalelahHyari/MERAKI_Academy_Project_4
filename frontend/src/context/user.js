import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

// =================================================================

const LoginProvider = (props) => {
  const history = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [cart, setCart] = useState(
    localStorage.getItem("product")
      ? JSON.parse(localStorage.getItem("product"))
      : []
  ); //local || []

  // =================================================================

  const saveToken = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };

  // =================================================================

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    history("/login");
    setToken("");
    setCart([]);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // =================================================================

  const state = {
    token,
    isLoggedIn,
    logout,
    saveToken,
    setIsLoggedIn,
    cart,
    setCart,
  };
  // =================================================================

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};

export default LoginProvider;
