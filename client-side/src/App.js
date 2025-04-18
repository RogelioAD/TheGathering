import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { UserProvider } from "./conpro/Provider/UserProvider";
import { GroupProvider } from "./conpro/Provider/GroupProvider";

function App() {
  return (
    <UserProvider>
      <GroupProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </GroupProvider>
    </UserProvider>
  );
}

export default App;
