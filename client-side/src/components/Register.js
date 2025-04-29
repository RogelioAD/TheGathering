import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../conpro/Context/UserContext";
import "../styles/styles.css";

const Register = () => {
  let [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  let { createUser } = useContext(UserContext);
  let navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    createUser(user)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        window.alert("Failed registration: error creating user");
      });
  }

  return (
    <form className="input helveticaText" onSubmit={handleSubmit}>
      <h1 className="mainDisplay title space-mono-bold">Create an account</h1>

      <div className="centerAlign space-mono-regular">
        <div className="inputBox">
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="inputBox">
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="inputBox">
          <input
            placeholder="First Name"
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="inputBox">
          <input
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>

        <button className="register">Sign Up</button>
      </div>
    </form>
  );
};

export default Register;
