import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../conpro/Context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let { loginUser } = useContext(UserContext);
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    loginUser(username, password)
      .then(() => {
        navigate("/profile/" + username);
      })
      .catch((error) => {
        console.log(error);
        window.alert("Failed login");
      });
  }

  function handleRegister(){
    navigate("/register")
  }

  return (
    <form className="input regfont" onSubmit={handleSubmit}>
      <h1>LOGIN</h1>
      <span>Username </span>
      <input
        placeholder="Enter username"
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br></br>
      <br></br>
      <span>Password </span>
      <input
        placeholder="Enter password"
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br></br>
      <button>Sign In</button>
      <button type="button" onClick={handleRegister}>Register</button>
    </form>
  );
};

export default Login;
