import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Add, Remove, Star } from "@material-ui/icons";
import Footer from "./Footer";
/***************************************************************************************************************** */
let arr = [];
/**************************************************** */
const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  /********************************************* */
  const [product, setProduct] = useState({});
  const [counter, setCounter] = useState(1);
  /**************************************** */
  const { token, cart, setCart } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  /***************************************** */
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [views, setViews] = useState(0);
  const [imageSrc, setImageSrc] = useState("");
  const [category, setCategory] = useState("");
  /************************************************* */
  const decodedToken = token ? jwt_decode(token) : "";
  /************************************************** */
  const getProduct = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(result.data.product);
    } catch (err) {
      console.log(err);
    }
  };
  /************************* */
  useEffect(() => {
    getProduct();
  }, []);
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
    const previousData = cart;
    arr = [...previousData, product];
    setCart(arr);
    localStorage.setItem("product", JSON.stringify(arr));
  };

  /********************************************* */
  return (
    <div className="product-page">
      <div className="productWarper">
        <div className="imageContainer">
          <img src={product.imageSrc} className="singleProductImage" />
        </div>
        <div className="infoContainer">
          <h2 className="singleProductName">{product.name}</h2>
          <span className="singleProductPrice">{product.price} JOD</span>
          <div className="rating-star">
            <h1 className="ratingProduct">
              {product.rating}
              <Star style={{ color: "tomato", fontSize: 40 }} />
            </h1>
          </div>
          <p>{product.description}</p>
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
        </div>
        <br />
        <br />
      </div>
      {decodedToken &&
      decodedToken.role &&
      decodedToken.role.role === "Admin" ? (
        <>
          <div className="splitter"></div>
          <br />
          <br />
          <div className="center">
            <h1>In this form you can update your product and delete it!</h1>
          </div>
          <div className="ProductForm">
            <h1>Update The Product</h1>
            <div className="Product">
              <br />
              <input
                className="productName"
                type="text"
                placeholder="Product Name"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <input
                className="price"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <br />
              <input
                className="rating"
                placeholder="Rating"
                onChange={(e) => setRating(e.target.value)}
              />
              <br />
              <input
                className="views"
                placeholder="Views"
                onChange={(e) => setViews(e.target.value)}
              />
              <br />
              <input
                className="imageSrc"
                placeholder="ImageSrc"
                onChange={(e) => {
                  setImageSrc(e.target.value);
                }}
              />
              <input
                className="category"
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
              />
              <br />
              <br />
              <button
                onClick={async () => {
                  try {
                    const updatedProduct = {
                      name,
                      price,
                      rating,
                      views,
                      imageSrc,
                      category,
                    };
                    const result = await axios.put(
                      `http://localhost:5000/products/${id}`,
                      updatedProduct,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="updateButtonAdmin"
              >
                Update
              </button>
              <br />
              <br />
              <button
                onClick={async () => {
                  try {
                    const result = await axios.delete(
                      `http://localhost:5000/products/${id}`,

                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    if (result.success) {
                      return true;
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
                className="deleteButtonAdmin"
              >
                Delete
              </button>
            </div>
            {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
          </div>
        </>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  );
};

export default Product;
