import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import storage from "./firebase";
import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import Footer from "./Footer";
/*********************************************************** */
let arr = [];
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(5); // fixed
  const [skip, setSkip] = useState(5); //
  const [page, setPage] = useState(1);
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
  useEffect(() => {
    getAllProducts(limit, skip);
  }, [skip, limit]);
  /*************************************** */

  const nextPage = () => {
    setSkip(skip + limit);
  };

  const previousPage = () => {
    setSkip(skip - limit);
  };
  /************************************************ */
  return (
    <>
      <div className="selectContainer">
        <select className="selectOptions">
          <option value="">men clothing</option>
          <option value="">jewelry</option>
          <option value="">electronics</option>
          <option value="">women clothing</option>
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
