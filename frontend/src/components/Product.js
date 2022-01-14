import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(result.data.product);
        console.log(result.data.product);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  return (
    <>
      <div className="product-page">
        <img src={product.imageSrc} className="image" />
        <h1>{product.title}</h1>
        <h1>{product.price}</h1>
        <h1>{product.rating}</h1>
        <h1>{product.views}</h1>
      </div>
    </>
  );
};

export default Product;
