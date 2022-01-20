import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/user";
import Footer from "./Footer";
const GetMyOrder = () => {
  const [myOrder, setMyOrder] = useState([]);
  const { token } = useContext(UserContext);
  const [message, setMessage] = useState("");
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
      setMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    getMyOrder();
  }, [myOrder]);
  /****************************************************** */
  return (
    <>
      <div>
        <h1 className="center">
          {message ? (
            message
          ) : (
            <h4 className="center">Your order on the way!</h4>
          )}
        </h1>
        {/* <button className="getMyOrder" onClick={getMyOrder}>
          GET
        </button> */}
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
