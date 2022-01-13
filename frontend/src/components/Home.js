import axios from "axios";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import banner from "../images/banner.png";
const Home = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const result = await axios.get("http://localhost:5000/products/");
      if (result.data.success) {
        setProducts(result.data.products);
      } else {
        console.log(`cannot Get`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <div className="home">
        <div className="banner">
          <img className="image-banner" src={banner} />
        </div>
        <div className="products">
          {products.map((element, index) => {
            return (
              <Product
                imageSrc={element.imageSrc}
                name={element.name}
                price={element.price}
                rating={element.rating}
                views={element.views}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
