import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  let navigate;
  try {
    navigate = useNavigate();
  } catch (err) {
    // useNavigate throws if not inside a Router
    navigate = null;
  }

  const goHome = () => {
    if (navigate) navigate("/");
    else window.location.href = "/";
  };

  return (
    <header className="w-full flex items-center px-6 py-4 bg-transparent">
      <img
        src={logo}
        alt="App Logo"
        className="h-12 w-12 rounded-full object-cover shadow-md cursor-pointer"
        onClick={goHome}
      />
    </header>
  );
};

export default Navbar;
