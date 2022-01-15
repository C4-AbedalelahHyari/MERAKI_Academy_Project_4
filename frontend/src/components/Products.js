import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";

/*********************************************************** */
const Product = () => {
  const { token } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  /*************************************************** */
  const decodedToken = token
    ? jwt_decode(token)
    : console.log("No Token to decoded!");
  /************************************************** */
  useEffect(() => {
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
    getAllProducts();
  }, [products]);

  /************************************************ */

  return (
    <>
      <div className="product-container-map">
        {products.map((element, index) => {
          return (
            <div className="product-container" key={index}>
              <img src={element.imageSrc} className="image" />

              <div className="products_info">
                <div className="Icon">
                  <ShoppingCartOutlined />
                </div>
                <div className="Icon">
                  <Link className="link" to={`/product/${element._id}`}>
                    <SearchOutlined />
                  </Link>
                </div>
                {decodedToken && decodedToken.role.role === "Admin" ? (
                  <>
                    <button className="updateButton">Update</button>
                    <button
                      onClick={async () => {
                        try {
                          const result = await axios.delete(
                            `http://localhost:5000/products/${element.product_ID}`,

                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );
                          if (result.success) {
                            //setIsClicked(true);
                          }
                        } catch (error) {
                          if (error.response && error.response.data) {
                            return setMessage(error.response.data.message);
                          }
                          setMessage(
                            "Error happened while Deleting the product, please try again"
                          );
                        }
                      }}
                      className="deleteButton"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Product;
