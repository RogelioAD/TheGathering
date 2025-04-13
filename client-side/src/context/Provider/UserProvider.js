import axios from "axios";
import { useState } from "react";
import UserContext from "../Context/UserContext";

export const UserProvider = (props) => {
  const [user, setUser] = useState("");
  const baseUrl = "http://localhost:5000/userapi/";

  async function getProfile(username) {
    try {
      const response = await axios.get(`${baseUrl}profile/${username}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching User:", error);
    }
  }

  function createUser(userInfo) {
    console.log(userInfo); //testing

    return axios.post(baseUrl, userInfo).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function loginUser(username, password) {
    let user = { username, password };
    console.log(user); //testing

    return axios.post(`${baseUrl}login`, user).then((response) => {
      localStorage.setItem("authToken", response.data.token);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  return (
    <UserContext.Provider
      value={{
        getProfile,
        createUser,
        loginUser,
        user,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
