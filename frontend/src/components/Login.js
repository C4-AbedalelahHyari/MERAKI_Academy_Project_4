import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Footer from "./Footer";
const Login = () => {
  const { setIsLoggedIn, isLoggedIn, saveToken } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const navigator = useNavigate();
  /******************************************************** */
  const login = async () => {
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      if (result.data.success) {
        setMessage("");
        saveToken(result.data.token);
        setIsLoggedIn(true);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };
  /**************************************** */
  useEffect(() => {
    if (isLoggedIn) {
      navigator("/");
    }
  });
  /*************************************** */
  const responseGoogle = (response) => {
    const googleToken = response.tokenObj.id_token;
    console.log(response);
    saveToken(googleToken);
    setIsLoggedIn(true);
  };

  return (
    <div className="LoginForm">
      <h1 className="center" style={{ "margin-top": "25px" }}>
        Login Form
      </h1>
      <div className="Login">
        <input
          className="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="loginButton" onClick={login}>
          Login
        </button>
        <br />

        <GoogleLogin
          clientId="171142303177-dlklu0me533t11g37ll28pjmd603vh8c.apps.googleusercontent.com"
          buttonText="Sign with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>

      <div className="center">
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
