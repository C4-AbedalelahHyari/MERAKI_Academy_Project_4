import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/user";
import Product from "./Products";
import Footer from "./Footer";
const AdminView = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [views, setViews] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const { token } = useContext(UserContext);
  /******************************************** */
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  /******************************************** */
  const AddNewCategory = async () => {
    try {
      const result = await axios.post(
        "http://localhost:5000/categories",
        {
          newCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        console.log(`The Category has been created successfully`);
      } else throw Error;
    } catch (error) {
      console.log(error.response);
    }
  };
  /************************************************* */
  const addNewProduct = async () => {
    // const upload = () => {
    //   if (image == null) return;
    //   storage
    //     .ref(`/images/${image.name}`)
    //     .put(image)
    //     .on("state_changed", alert("success"), alert);
    //   console.log(storage);

    // download
    //  storage.ref("/images").child(image.name).getDownloadURL().then((result)=>{setUrl(result)})

    // };
    try {
      const product = {
        name,
        price,
        rating,
        views,
        image,
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
    <div className="flexAdmin">
      <div className="ProductForm">
        <h1>Add New Product</h1>
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
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
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
      <div className="CategoryForm">
        <h1>Add New Category</h1>
        <div className="Category">
          <input
            className="category"
            placeholder="Add New Category"
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <br />
          <button className="addProductButton" onClick={AddNewCategory}>
            Add New Category
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminView;
