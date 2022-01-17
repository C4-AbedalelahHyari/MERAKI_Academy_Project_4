import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { Search, Security, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge, Input } from "@material-ui/core";
import axios from "axios";
/******************************************************************* */
const Navigation = () => {
  const { logout, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  /*************************************************** */
  const getAllProducts = async () => {
    try {
      const result = await axios.get("http://localhost:5000/products/");
      if (result.data.success) {
        setProducts(result.data.products);
      } else {
        console.log(`cannot Get the Products`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  getAllProducts();
  const func = () => {
    const result = products
      ? products.find((element, index) => {
          if (element.name.toLowerCase() == name.toLowerCase()) {
            navigate(`/product/${element._id}`);
          }
        })
      : "Nothing To Show";
  };

  return (
    <div className="nav-container">
      <nav className="navbar">
        {token ? (
          <>
            <div className="left">
              <Link className="nav-items" to="/">
                Home
              </Link>
              <Link className="nav-items" to="/myOrders">
                My Orders
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
                <Search
                  className="SearchIcon"
                  onClick={func}
                  style={{ color: "black", fontSize: 30 }}
                />
              </div>
            </div>
            <div className="right">
              <div className="together">
                <Security
                  className="nav-items"
                  style={{ color: "white", cursor: "pointer", fontSize: 35 }}
                />
                <Link className="nav-items" to="/admin">
                  Admin Panel
                </Link>
              </div>
              <button className="log-out" onClick={logout}>
                LogOut
              </button>
              <div className="together">
                <Badge badgeContent={6} color="secondary" />
                <Link className="nav-items" to="/cart">
                  <ShoppingCartOutlined
                    style={{ fontSize: 35, cursor: "pointer" }}
                  />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="left">
              <div className="together_2">
                <Link className="nav-items" to="/">
                  Home
                </Link>
                <Link className="nav-items" to="/myOrders">
                  My Orders
                </Link>
              </div>
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
                  className="SearchIcon"
                  onClick={func}
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
