import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { Search, Security, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge, Input } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import axios from "axios";
import logo1 from "../images/logo1.png";
import logo from "../images/logo.jpg";
/******************************************************************* */
const Navigation = () => {
  const { logout, token, cart } = useContext(UserContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const productInLocalStorage = JSON.parse(localStorage.getItem("product"));
  const decodedToken = token ? jwt_decode(token) : "";
  /************************************************************************** */
  const getAllProducts = async () => {
    try {
      const result = await axios.get("http://localhost:5000/products/");
      if (result.data.success) {
        setProducts(result.data.products);
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  /************************************************************************** */
  const func = () => {
    const result = products
      ? products.find((element, index) => {
          if (element.name.toLowerCase() == name.toLowerCase()) {
            navigate(`/product/${element._id}`);
          }
        })
      : "";
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  /************************************************************************** */
  return (
    <div className="nav-container">
      <nav className="navbar">
        {token ? (
          <>
            {/******************************************************************** */}
            <div className="left">
              <div className="together_2">
                <Link className="nav-items" to="/">
                  E-Shop<span className="eee_nav">eee</span>
                </Link>
                <Link className="nav-items" to="/myOrders">
                  My Order
                </Link>
                <Link className="nav-items" to="/products/All">
                  All Products
                </Link>
              </div>
            </div>
            {/******************************************************************** */}
            <div className="center">
              <div className="searchBar">
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  style={{
                    width: "80%",
                  }}
                  placeholder="Search"
                />
                <Search
                  className="SearchIcon"
                  onClick={() => {
                    func();
                    setName("");
                  }}
                  style={{ color: "black", fontSize: 30 }}
                />
              </div>
            </div>
            {/******************************************************************** */}
            <div className="right">
              {decodedToken &&
              decodedToken.role &&
              decodedToken.role.role === "Admin" ? (
                <Link className="nav-items" to="/admin">
                  <Security
                    style={{
                      color: "white",
                      cursor: "pointer",
                      fontSize: 20,
                    }}
                  />
                  Admin Panel
                </Link>
              ) : (
                <></>
              )}
              {/******************************************************************** */}
              <button className="log-out" onClick={logout}>
                LogOut
              </button>
              <div className="together">
                <Badge
                  badgeContent={cart ? cart.length : "0"}
                  color="secondary"
                />
                <Link className="nav-items" to="/cart">
                  <ShoppingCartOutlined
                    style={{ fontSize: 35, cursor: "pointer" }}
                  />
                </Link>
              </div>
            </div>
            {/******************************************************************** */}
          </>
        ) : (
          <>
            {/******************************************************************** */}
            <div className="left">
              <div className="together_2">
                <Link className="nav-items" to="/">
                  E-Shop<span className="eee_nav">eee</span>
                </Link>
                <Link className="nav-items" to="/myOrders">
                  My Order
                </Link>
                <Link className="nav-items" to="/products/All">
                  All Products
                </Link>
              </div>
            </div>
            {/******************************************************************** */}
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
                  className="SearchIcon"
                  onClick={func}
                  style={{ color: "black", fontSize: 30 }}
                />
              </div>
            </div>
            {/******************************************************************** */}
            <div className="right">
              <div className="right-side">
                <Link className="nav-items" to="/register">
                  Register
                </Link>
              </div>
              <Link className="nav-items" to="/login">
                Login
              </Link>
              <div className="right-badge">
                <Badge
                  badgeContent={cart ? cart.length : "0"}
                  color="secondary"
                />
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
