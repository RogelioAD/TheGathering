import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "./components/Register";

import { UserProvider } from "./context/Provider/UserProvider";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Register />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
