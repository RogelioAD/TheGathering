import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'; 
import UserContext from "../Context/UserContext";

export const UserProvider = (props) => {
  const [user, setUser] = useState({});
  const baseUrl = "http://localhost:5000/userapi/";

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);  
        setUser(decodedToken); 
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  async function getProfile(username) {
    try {
      console.log("get profile is called");
      const response = await axios.get(`${baseUrl}profile/${username}`);
      setUser(response.data); 
      return response.data;
    } catch (error) {
      console.error("Error fetching User:", error);
      return null;
    }
  }

  function logout() {
    setUser(""); 
    localStorage.removeItem("authToken"); 
  }
  

  async function createUser(userInfo) {

    const response = await axios.post(baseUrl, userInfo);
    return await new Promise((resolve) => resolve(response.data));
  }

  async function loginUser(username, password) {
    let user = { username, password };

    try {
      const response = await axios.post(`${baseUrl}login`, user);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        console.log("Login successful, token saved to localStorage");
        const decodedToken = jwtDecode(response.data.token); 
        setUser(decodedToken); 
        return response.data;
      } else {
        throw new Error("No token returned from the server.");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error;
    }
  }

  return (
    <UserContext.Provider
      value={{
        getProfile,
        createUser,
        loginUser,
        logout,
        user,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
