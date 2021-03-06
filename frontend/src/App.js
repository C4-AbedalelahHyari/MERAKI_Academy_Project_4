import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import AdminView from "./components/AdminView";
import Navigation from "./components/Navigation";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import GetMyOrder from "./components/GetMyOrder";
import Products from "./components/Products";
import AllProducts from "./components/AllProducts";

function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myOrders" element={<GetMyOrder />} />
        <Route path="/products/All" element={<AllProducts />} />
        <Route
          path="*"
          element={
            <h1 className="center">
              {" "}
              404 NOT FOUND: The page you are looking for doesn't exist{" "}
            </h1>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
