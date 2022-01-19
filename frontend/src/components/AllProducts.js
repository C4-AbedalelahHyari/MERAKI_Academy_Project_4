import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import Footer from "./Footer";
/*********************************************************** */
let arr = [];
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const navigate = useNavigate();
  /*************************************************** */
  const getAllProducts = async (limit, skip) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/products?limit=${limit}&skip=${skip}`
      );
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
    getAllProducts(limit, skip);
  }, [skip, limit]);
  /***************************** */

  const nextPage = () => {
    setSkip(skip + limit);
  };

  const previousPage = () => {
    setSkip(skip - limit);
  };
  /************************************************ */
  // const addToCart = () => {
  //   const previousData = JSON.parse(localStorage.getItem("product")) || [];
  //   console.log(previousData);
  //   arr = [...previousData, product];
  //   localStorage.setItem("product", JSON.stringify(arr));
  // };

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
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <button className="pagButton" onClick={nextPage}>
          Previous Page
        </button>
        <button className="pagButton" onClick={previousPage}>
          Next Page
        </button>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
