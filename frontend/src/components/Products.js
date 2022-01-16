import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
/*********************************************************** */
const Products = ({ name, setInvoke }) => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  /*************************************************** */
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
  const func = () => {
    const search1 = products
      ? products.find((element, index) => {
          if (element.name == name) {
            setTimeout(() => {
              navigate(`/product/${element._id}`);
            }, 3000);
          }
        })
      : "Nothing To Show";

    console.log(search1);
  };
  useEffect(() => {
    getAllProducts();
    func();
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
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
