import React from "react";
import { Add, Remove } from "@material-ui/icons";
const Cart = () => {
  const productInLocalStorage = JSON.parse(localStorage.getItem("product"));
  console.log(productInLocalStorage);
  return (
    <div className="Cart">
      <div className="CartContainer">
        <h1 className="cartTitle">Your Cart</h1>
        <div className="cartTop">
          <button className="BackToHome">Back To Home</button>
          <div className="topTexts">
            <span className="textTopCart">Shopping List (1)</span>
          </div>
          <button className="checkOutButton">Check Out</button>
        </div>
        <div className="cartBottom">
          <div className="cartInfo">
            <div className="productCart">
              <div className="ProductInfo">
                <img
                  className="productImageCart"
                  src={productInLocalStorage.imageSrc}
                />
                <div className="infos">
                  <h4>Product Name:</h4>
                  <h6>{productInLocalStorage.name}</h6>
                  <h4>Product ID:</h4>
                  <h6>{productInLocalStorage._id}</h6>
                  <h4>views:</h4>
                  <h6>{productInLocalStorage.views}</h6>
                  <h4>rating:</h4>
                  <h6>{productInLocalStorage.rating}</h6>
                </div>
              </div>
              <div className="PriceInfo">
                <div className="ProductAmountContainer">
                  <Add />
                  <div className="productAmount">1</div>
                  <Remove />
                </div>
                <div className="productActualPrice">
                  {productInLocalStorage.price} JOD
                </div>
              </div>
            </div>
            <div className="splitter"></div>
          </div>
          <div className="cartDetails">
            <h3 className="summaryTitle">Order Summary</h3>
            <div className="summaryItem">
              <span className="itemText">Subtotal</span>
              <span className="itemPrice">250 JOD</span>
            </div>
            <div className="summaryItem">
              <span className="itemText">Sales Tax (16%)</span>
              <span className="itemPrice">- 40 JOD</span>
            </div>
            <div className="splitter"></div>
            <div className="summaryItem">
              <h4 className="itemText">Total</h4>
              <h4 className="itemPrice">210 JOD</h4>
            </div>
            <button className="checkOutCart">Check Out Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;