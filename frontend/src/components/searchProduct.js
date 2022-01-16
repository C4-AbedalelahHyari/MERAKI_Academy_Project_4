import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Search } from "@material-ui/icons";
import { Input } from "@material-ui/core";
const SearchProduct = () => {
  const [product, setProduct] = useState({});
  const [search, setSearch] = useState("");
  const getProduct = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/products/${search}`
      );
      setProduct(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="searchBar">
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{
            width: "80%",
          }}
          placeholder="Search"
        />
        <Search onClick={getProduct} style={{ color: "black", fontSize: 30 }} />
      </div>
      <div>
        <h1>dsfdsfdsf</h1>
      </div>
    </>
  );
};

export default SearchProduct;
