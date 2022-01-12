import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
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
  useEffect(() => {
    if (isLoggedIn) {
      navigator("/");
    }
  });
  return (
    <div className="LoginForm">
      <h1>Login Form</h1>
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
      </div>
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </div>
  );
};

export default Login;
