import React, { useContext } from "react";
import { Add, DeleteForever, Remove } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import axios from "axios";
/******************************************************************** */
const Cart = () => {
  const { token } = useContext(UserContext);
  const productInLocalStorage = JSON.parse(localStorage.getItem("product"));
  console.log(productInLocalStorage);
  /******************************************************************** */
  const product_id = productInLocalStorage
    ? productInLocalStorage.map((element, index) => {
        return element._id;
      })
    : "";
  console.log(product_id);
  /******************************************************************** */
  const totalPrice = productInLocalStorage
    ? productInLocalStorage.reduce((acc, element, index) => {
        return acc + element.price;
      }, 0)
    : "";
  console.log(totalPrice);
  /******************************************************************** */
  const createOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/orders",
        {
          product_id,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        console.log(res.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  /******************************************************************** */
  return (
    <div className="Cart">
      <div className="CartContainer">
        <h1 className="cartTitle">Your Cart</h1>
        <div className="cartTop">
          <Link to="/">
            <button className="BackToHome">Back To Home</button>
          </Link>
          <div className="topTexts">
            <span className="textTopCart">
              Shopping List (
              {productInLocalStorage ? (
                productInLocalStorage.length
              ) : (
                <>Item(0)</>
              )}
              )
            </span>
          </div>
          <button onClick={createOrder} className="checkOutButton">
            Check Out
          </button>
        </div>
        <div className="cartBottom">
          <div className="cartInfo">
            {productInLocalStorage
              ? productInLocalStorage.map((element, index) => {
                  return (
                    <>
                      <div className="productCart" key={index}>
                        <div className="ProductInfo" key={index}>
                          <img
                            className="productImageCart"
                            src={element.imageSrc}
                          />
                          <div className="infos">
                            <h4>Product Name:</h4>
                            <h6>{element.name}</h6>
                          </div>
                        </div>
                        <div className="PriceInfo">
                          <div className="ProductAmountContainer">
                            <Add />
                            <div className="productAmount">1</div>
                            <Remove />
                          </div>
                          <div className="productActualPrice">
                            {element.price} JOD
                          </div>
                          <br />
                          <DeleteForever
                            onClick={() => {
                              productInLocalStorage.splice(index, 1);
                              localStorage.setItem(
                                "product",
                                JSON.stringify(productInLocalStorage)
                              );
                            }}
                            style={{ fontSize: 40, cursor: "pointer" }}
                          />
                        </div>
                      </div>
                      <div className="splitter"></div>
                    </>
                  );
                })
              : "Your Cart is Empty"}
          </div>
          <div className="cartDetails">
            <h3 className="summaryTitle">Order Summary</h3>
            <div className="summaryItem">
              <span className="itemText">Subtotal</span>
              <span className="itemPrice">{totalPrice} JOD</span>
            </div>
            <div className="summaryItem">
              <span className="itemText">Sales Tax (16%)</span>
              <span className="itemPrice">
                {Math.round(totalPrice * 0.16)} JOD
              </span>
            </div>
            <div className="splitter"></div>
            <div className="summaryItem">
              <h4 className="itemText">Total</h4>
              <h4 className="itemPrice">
                {" "}
                {totalPrice
                  ? totalPrice - Math.round(totalPrice * 0.16)
                  : ""}{" "}
                JOD
              </h4>
            </div>
            <button onClick={createOrder} className="checkOutCart">
              Check Out Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
