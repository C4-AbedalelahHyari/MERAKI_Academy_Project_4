import React, { useState, useEffect } from "react";
import Products from "./Products";
import banner from "../images/banner.jpg";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="banner">
          <img className="image-banner" src={banner} />
        </div>
        <h1 className="text">Featured Products</h1>
        <Products />
      </div>
    </>
  );
};

export default Home;
