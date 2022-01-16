import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge, Input } from "@material-ui/core";
import axios from "axios";
const Navigation = ({ setName, invoke }) => {
  const { logout, token } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <nav className="navbar">
        {token ? (
          <>
            <div className="left">
              <Link className="nav-items" to="/">
                Home
              </Link>
            </div>
            <div className="center">
              <div className="searchBar">
                <Input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  style={{
                    width: "80%",
                  }}
                  placeholder="Search"
                />
                <Search style={{ color: "black", fontSize: 30 }} />
              </div>
            </div>
            <div className="right">
              <button className="log-out" onClick={logout}>
                LogOut
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="left">
              <Link className="nav-items" to="/">
                Home
              </Link>
            </div>

            <div className="center">
              <div className="searchBar">
                <Input
                  style={{
                    width: "80%",
                  }}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Search"
                />
                <Search
                  onClick={invoke}
                  style={{ color: "black", fontSize: 30 }}
                />
              </div>
            </div>

            <div className="right">
              <div className="right-side">
                <Link className="nav-items" to="/register">
                  Register
                </Link>
              </div>
              <div className="right-side">
                <Link className="nav-items" to="/login">
                  Login
                </Link>
              </div>
              <div className="right-side">
                <Badge badgeContent={6} color="secondary" />
                <Link className="nav-items" to="/cart">
                  <ShoppingCartOutlined
                    style={{ fontSize: 35, cursor: "pointer" }}
                  />
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
