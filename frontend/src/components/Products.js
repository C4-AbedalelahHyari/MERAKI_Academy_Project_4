import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
/*********************************************************** */
let arr = [];
/************************************************ */
const Products = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  /*************************************************** */
  const getAllProducts = async (limit, skip) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/products?limit=${limit}&skip=${skip}`
      );
      if (result.data.success) {
        setProducts(result.data.products);
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  /*************************************** */
  useEffect(() => {
    getAllProducts(limit, skip);
  }, [skip, limit]);
  /************************************ */

  const nextPage = () => {
    setSkip(skip + limit);
  };

  const previousPage = () => {
    setSkip(skip - limit);
  };
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
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
