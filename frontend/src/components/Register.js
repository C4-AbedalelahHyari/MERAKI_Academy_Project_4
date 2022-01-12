import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "61db4af3202167e1eaa4767f";
  /********************************************* */
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  /******************************************************** */
  const addNewUser = async () => {
    try {
      const result = await axios.post("http://localhost:5000/users", {
        userName,
        country,
        email,
        password,
        role,
      });
      if (result.data.success) {
        setStatus(true);
        setMessage("The user has been created successfully");
      }
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };
  return (
    <>
      <div className="RegisterForm">
        <h1>Register Form</h1>
        <div className="Register">
          <br />
          <input
            className="userName"
            type="text"
            placeholder="User Name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <input
            className="country"
            type="text"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <br />
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
          <br />
          <button className="registerButton" onClick={addNewUser}>
            Register
          </button>
        </div>
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
    </>
  );
};
export default Register;
