import React from "react";
import Products from "./Products";
import banner from "../images/banner.jpg";
import FooterHome from "./FooterHome";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="banner">
          <img className="image-banner" src={banner} />
          <h1 className="deal">Super Deal 50% OFF</h1>
        </div>
      </div>
      <h1 className="text">Featured Products</h1>
      <Products />
      <FooterHome />
    </>
  );
};

export default Home;
