import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/user";
import Footer from "./Footer";
const GetMyOrder = () => {
  const [myOrder, setMyOrder] = useState([]);
  const { token } = useContext(UserContext);
  /******************************************** */
  const getMyOrder = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders/myOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setMyOrder(res.data.orders[0].product_id);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  /****************************************************** */
  return (
    <>
      <div>
        <h1 className="center">Your Order on the way!</h1>
        <button onClick={getMyOrder}>GET</button>
      </div>
      <div className="cartBottom">
        <div className="cartInfo">
          {myOrder
            ? myOrder.map((element, index) => {
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
                        <div className="productActualPrice">
                          {element.price} JOD
                        </div>
                        <br />
                      </div>
                    </div>
                    <div className="splitter"></div>
                  </>
                );
              })
            : "Your dont have any order yet"}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GetMyOrder;
