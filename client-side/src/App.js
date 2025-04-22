import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { UserProvider } from "./conpro/Provider/UserProvider";
import { GroupProvider } from "./conpro/Provider/GroupProvider";
import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <GroupProvider>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/profile/:username/group/:groupId" element={<Chat />} />
          </Routes>
        </GroupProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
