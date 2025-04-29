import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../conpro/Context/UserContext";
import "../styles/styles.css";

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

  function handleRegister() {
    navigate("/register");
  }

  return (
    <form className="input" onSubmit={handleSubmit}>
      <div className="mainDisplay">
        <h1 className="title space-mono-bold">Welcome to TheGathering</h1>
        <p className="subHeading space-mono-regular">A verse with your friends</p>
      </div>
      <div className="centerAlign">
        <div className="space-mono-regular">
          <div className="inputBox input ">
            <input
              placeholder="Username"
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login">LOGIN</button>
        </div>

        <div className="questionRegister space-mono-regular">
          <p>
            Don't have an account?{" "}
            <button
              className="registerButton"
              type="button"
              onClick={handleRegister}
            >
              Register!
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
