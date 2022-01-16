import React, { useState, useEffect } from "react";
import Products from "./Products";
import banner from "../images/banner.jpg";

const Home = ({ name, setInvoke }) => {
  return (
    <>
      <div className="home">
        <div className="banner">
          <img className="image-banner" src={banner} />
        </div>
        <h1 className="text">Products</h1>
        <Products name={name} setInvoke={setInvoke} />
      </div>
    </>
  );
};

export default Home;
