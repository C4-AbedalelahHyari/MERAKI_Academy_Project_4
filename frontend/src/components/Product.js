import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import jwt_decode from "jwt-decode";
const Product = ({ name, price, rating, imageSrc, views, category, id }) => {
  const { token } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false)
  const decodedToken = token
    ? jwt_decode(token)
    : console.log("No Token to decoded!");
  console.log(decodedToken);


  return (
    <div className="product-111">
      <div className="imageCont"><img src={imageSrc} className="image" /></div>
      <div className="info_products">
      <h1>{name}</h1>
      <h1>{price}</h1>
      <h1>{rating}</h1>
      <h1>{views}</h1>
      <h1>{category}</h1>
      {decodedToken && decodedToken.role.role === "Admin" ? (
        <>
          <button onClick={} className="updateButton">Update</button>
          <button className="deleteButton">Delete</button>
        </>
      ) : (
        <></>
      )}
      </div>
    </div>
  );
};

export default Product;
