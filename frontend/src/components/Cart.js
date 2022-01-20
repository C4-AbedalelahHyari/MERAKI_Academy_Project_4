import React, { useContext, useState, useEffect } from "react";
import { Add, DeleteForever, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user";
import axios from "axios";
import Footer from "./Footer";
/******************************************************************** */
const Cart = () => {
  const { token, setCart, cart } = useContext(UserContext);
  const productInLocalStorage = JSON.parse(localStorage.getItem("product"));
  const [message, setMessage] = useState("");
  const [totalPriceValue, setTotalPrice] = useState(
    cart
      ? cart.reduce((acc, element, index) => {
          return acc + element.price;
        }, 0)
      : 0
  );
  useEffect(() => {
    setTotalPrice(
      cart
        ? cart.reduce((acc, element, index) => {
            return acc + element.price;
          }, 0)
        : 0
    );
  }, [cart]);
  /******************************************************************** */
  const product_id = productInLocalStorage
    ? productInLocalStorage.map((element, index) => {
        return element._id;
      })
    : "";
  /******************************************************************** */
  // const totalPrice = cart
  //   ? cart.reduce((acc, element, index) => {
  //       return acc + element.price;
  //     }, 0)
  //   : "";
  //setTotalPrice(totalPrice);
  /******************************************************************** */
  const createOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/orders",
        {
          product_id,
          totalPrice: totalPriceValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        console.log(res.data);
        localStorage.removeItem("product");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  /******************************************************************** */
  return (
    <>
      <div className="Cart">
        <div className="CartContainer">
          <h1 className="cartTitle">Your Cart</h1>
          <div className="cartTop">
            <Link to="/">
              <button className="BackToHome">Back To Home</button>
            </Link>
            <div className="topTexts">
              <span className="textTopCart">
                Shopping List ({cart ? cart.length : <>Item(0)</>})
              </span>
            </div>
            <button onClick={createOrder} className="checkOutButton">
              Check Out
            </button>
          </div>
          <div className="cartBottom">
            <div className="cartInfo">
              {cart
                ? cart.map((element, index) => {
                    return (
                      <>
                        <div className="productCart" key={index}>
                          <div className="ProductInfo" key={index}>
                            <img
                              className="productImageCart"
                              src={element.imageSrc}
                            />
                            <div className="infos">
                              <h3>{element.name}</h3>
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
                                setCart(
                                  localStorage.getItem("product")
                                    ? productInLocalStorage
                                    : []
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
                <span className="itemPrice">{totalPriceValue} JOD</span>
              </div>
              <div className="summaryItem">
                <span className="itemText">Sales Tax (16%)</span>
                <span className="itemPrice">
                  {Math.round(totalPriceValue * 0.16)} JOD
                </span>
              </div>
              <div className="splitter"></div>
              <div className="summaryItem">
                <h4 className="itemText">Total</h4>
                <h4 className="itemPrice">
                  {totalPriceValue
                    ? Math.round(
                        totalPriceValue - Math.round(totalPriceValue * 0.16)
                      )
                    : ""}
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
      <Footer />
    </>
  );
};

export default Cart;
