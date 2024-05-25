import React, { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Sidebar from "./Components/SideBar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginSignUp from "./Components/LoginSignUp/LoginSignUp";
import Profile from "./pages/Profile/Profile";
import Home from "./Components/Home/Home";
// import "dotenv/config.js";

const App = () => {
  // const url = "https://digital-mru-backend.onrender.com";
  // const url = import.meta.env.BACKEND_URL;
  // const url = import.meta.env.VITE_BACKEND_URL;
  const [showLogin, setShowLogin] = useState(false);
  console.log(url + "  makdjfbasd");
  return (
    <div className="container">
      <ToastContainer />
      {showLogin ? <LoginSignUp setShowLogin={setShowLogin} /> : <></>}
      <BrowserRouter basename="/">
        <NavBar setShowLogin={setShowLogin} />
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
