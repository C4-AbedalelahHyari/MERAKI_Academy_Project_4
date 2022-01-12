import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home">
        <nav className="navbar">
          <Link className="Link" to="/">
            Home
          </Link>
          <Link className="Link" to="/register">
            Register
          </Link>
          <Link className="Link" to="/login">
            Login
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Home;
