import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/user";
import storage from "./firebase";
/************************************************** */
const AdminView = () => {
  const { token } = useContext(UserContext);
  /********************************************* */
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [views, setViews] = useState(0);
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  /******************************************** */
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [url, setUrl] = useState("");
  /******************************************** */
  const AddNewCategory = async () => {
    try {
      const result = await axios.post(
        "http://localhost:5000/categories",
        {
          title: newCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        return true;
      } else throw Error;
    } catch (error) {
      return false;
    }
  };
  if (image == null) return "Upload image please";
  storage.ref(`/images/${image.name}`).put(image);
  /************************************************************************************** */
  const addNewProduct = async () => {
    // download
    try {
      await storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((result) => {
          setUrl(result);
        });

      const product = {
        name,
        price,
        rating,
        views,
        description: desc,
        imageSrc: url,
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
        return false;
      }
    }
  };

  return (
    <>
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
              className="views"
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
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
            <button
              className="addProductButton"
              onClick={(e) => {
                addNewProduct();
                e.target.style.background = "yellowgreen";
                e.target.style.color = "black";
              }}
            >
              Add Product
            </button>
          </div>
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
            <button
              className="addProductButton"
              onClick={(e) => {
                AddNewCategory();
                e.target.style.background = "yellowgreen";
                e.target.style.color = "black";
              }}
            >
              Add New Category
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminView;
