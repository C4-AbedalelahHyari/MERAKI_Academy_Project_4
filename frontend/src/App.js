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

function App() {
  const [name, setName] = useState("");
  const [invoke, setInvoke] = useState("");
  return (
    <div className="App">
      <Navigation setName={setName} />
      <Routes>
        <Route path="/" element={<Home name={name} setInvoke={setInvoke} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
