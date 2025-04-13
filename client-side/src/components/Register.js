import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/Context/UserContext";

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
        navigate("/login");
      })
      .catch((error) => {
        window.alert("Failed registration: error creating user");
      });
  }

  return (
    <form className="input regfont" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <br></br>
      <br></br>
      <span>Username </span>
      <input
        placeholder="Enter Email"
        type="text"
        name="username"
        value={user.username}
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <span>Password </span>
      <input
        placeholder="Enter Password"
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <br />
      <br></br>
      <span>First Name </span>
      <input
        placeholder="Enter First Name"
        type="text"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
      />
      <br />
      <br></br>
      <span>Last Name </span>
      <input
        placeholder="Enter Last Name"
        type="text"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
      />
      <br />
      <button>Sign Up</button>
    </form>
  );
};

export default Register;