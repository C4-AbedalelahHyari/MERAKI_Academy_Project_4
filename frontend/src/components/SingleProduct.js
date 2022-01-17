import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import { Link, useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Add, Remove } from "@material-ui/icons";
let arr = [];

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  /******************************************* */
  const [product, setProduct] = useState({});
  const [counter, setCounter] = useState(1);
  /******************************************* */
  const { token } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  /******************************************* */
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [views, setViews] = useState(0);
  const [imageSrc, setImageSrc] = useState("");
  const [category, setCategory] = useState("");
  /************************************************* */
  const decodedToken = token
    ? jwt_decode(token)
    : console.log("No Token to decoded!");
  /************************************************** */
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
    const previousData = JSON.parse(localStorage.getItem("product")) || [];
    console.log(previousData);
    arr = [...previousData, product];
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
          {/* <h1>{product.category}</h1> populate the object id*/}
        </div>
        <br />
        <br />
      </div>
      <div className="splitter"></div>
      <br />
      <br />
      <div className="center">
        <h1>In this form you can update your product and delete it!</h1>
      </div>
      {decodedToken && decodedToken.role.role === "Admin" ? (
        <>
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
                placeholder="Image Source"
                onChange={(e) => setImageSrc(e.target.value)}
              />
              <br />
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
                      setTimeout(navigate("/"), 2000);
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
    </div>
  );
};

export default Product;
