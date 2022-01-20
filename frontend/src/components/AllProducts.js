import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import storage from "./firebase";
import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
/*********************************************************** */
let arr = [];
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  let [limit, setLimit] = useState(9);
  let [skip, setSkip] = useState(0);
  let [page, setPage] = useState(1);
  /********************************************* */
  const [filterCategory, setFilterCategory] = useState("");
  /*************************************************** */
  const getAllProducts = async (limit, skip) => {
    // download
    // storage.ref("/images").child(image.name).getDownloadURL().then((result)=>{setUrl(result)})
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
  /************************************************** */
  useEffect(() => {
    getAllProducts(limit, skip);
  }, [skip, limit]);
  /******************************************* */
  const filteredCategory = products.filter((e, i) => {
    return e.category.title === filterCategory;
  });
  /**************************** */
  useEffect(() => {
    if (filteredCategory.length) {
      setProducts(filteredCategory);
    }
  }, [products, filteredCategory, filterCategory]);
  /*************************************** */

  const nextPage = () => {
    if (skip <= products.length) {
      setSkip(skip + limit);
      setPage(++page);
    }
  };

  const previousPage = () => {
    if (skip > 0) {
      setSkip(skip - limit);
      setPage(--page);
    }
  };
  /************************************************ */
  return (
    <>
      <div>
        <div className="selectContainer">
          <h2>Filter By Category:</h2>
          <select
            onChange={(e) => {
              setFilterCategory(e.target.value);
            }}
            className="selectOptions"
          >
            <option>Category</option>
            <option value="men clothing">men clothing</option>
            <option value="jewelry">jewelry</option>
            <option value="electronics">electronics</option>
            <option value="women clothing">women clothing</option>
          </select>
        </div>

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
          <button className="pagButton" onClick={previousPage}>
            Previous Page
          </button>
          <h1>( {page} )</h1>
          <button className="pagButton" onClick={nextPage}>
            Next Page
          </button>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
