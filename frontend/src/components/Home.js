import axios from "axios";
import React, { useState, useEffect } from "react";
import Product from "./Products";
import banner from "../images/banner.jpg";

const Home = () => {
  
  return (
    <>
      <div className="home">
        <div className="banner">
          <img className="image-banner" src={banner} />
        </div>
        <h1 className="text">Products</h1>
        <Product />
      </div>
    </>
  );
};

export default Home;
