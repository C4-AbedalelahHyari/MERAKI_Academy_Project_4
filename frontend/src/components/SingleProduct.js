import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Add, Remove } from "@material-ui/icons";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [counter, setCounter] = useState(1);
  /************************************************* */
  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(result.data.product);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);
  /******************************************************* */
  const decreaseCounter = () => {
    if (counter !== 1) {
      setCounter(counter - 1);
    }
  };
  const increaseCounter = () => {
    setCounter(counter + 1);
  };
  /******************************************************* */
  const addToCart = () => {
    //console.log(product);
    localStorage.setItem("product", JSON.stringify(product));
  };
  /********************************************* */
  return (
    <div className="product-page">
      <div className="productWarper">
        <div className="imageContainer">
          <img src={product.imageSrc} className="singleProductImage" />
        </div>
        <div className="infoContainer">
          <h1 className="singleProductName">{product.name}</h1>
          <span className="singleProductPrice">{product.price} JOD</span>
          <h1>{product.rating}</h1>
          <h1>{product.views}</h1>
          <div className="addToCart">
            <div className="amountContainer">
              <Remove className="spanSingleProduct" onClick={decreaseCounter} />
              <span className="amountSpan">{counter}</span>
              <Add className="spanSingleProduct" onClick={increaseCounter} />
            </div>
            <button onClick={addToCart} className="addToCartSingle">
              Add To Cart
            </button>
          </div>
          {/* <h1>{product.category}</h1> */}
        </div>
      </div>
    </div>
  );
};

export default Product;
