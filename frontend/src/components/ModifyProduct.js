import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/user";
import Product from "./Product";
const ModifyProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [views, setViews] = useState(0);
  const [imageSrc, setImageSrc] = useState("");
  const [category, setCategory] = useState("");
  const { token } = useContext(UserContext);
  /******************************************** */
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  /******************************************** */
  const [products, setProducts] = useState([]);
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
  useEffect(() => {
    getAllProducts();
  }, []);
  const addNewProduct = async () => {
    try {
      const product = {
        name,
        price,
        rating,
        views,
        imageSrc,
        category,
      };
      const result = await axios.post(
        "http://localhost:5000/products/add",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setMessage("The Product has been created successfully");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  return (
    <>
      <div className="ProductForm">
        <h1>Add Product</h1>
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
          <button className="addProductButton" onClick={addNewProduct}>
            Add Product
          </button>
        </div>
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
      <div className="allProducts">
        <div className="products">
          {products.map((element, index) => {
            return (
              <div key={index} className="data">
                <Product
                  imageSrc={element.imageSrc}
                  name={element.name}
                  price={element.price}
                  rating={element.rating}
                  views={element.views}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ModifyProduct;
