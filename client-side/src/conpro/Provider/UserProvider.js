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

  async function createUser(userInfo) {
    console.log(userInfo); //testing

    const response = await axios.post(baseUrl, userInfo);
    return await new Promise((resolve) => resolve(response.data));
  }

  async function loginUser(username, password) {
    let user = { username, password };
    console.log(user); //testing

    const response = await axios.post(`${baseUrl}login`, user);
    localStorage.setItem("authToken", response.data.token);
    return await new Promise((resolve) => resolve(response.data));
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
