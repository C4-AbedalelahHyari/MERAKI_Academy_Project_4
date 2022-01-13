import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user";
const Navigation = () => {
  const { logout } = useContext(UserContext);
  return (
    <div>
      <nav className="navbar">
        <Link className="Link" to="/">
          Home
        </Link>
        <Link className="Link" to="/register">
          Register
        </Link>
        <Link className="Link" to="/login">
          Login
        </Link>
        <i className="bi bi-cart-check">Cart</i>
        <button onClick={logout}>LogOut</button>
      </nav>
    </div>
  );
};

export default Navigation;
