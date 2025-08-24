import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  let navigate;
  try {
    navigate = useNavigate();
  } catch (err) {
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
        className="h-16 w-16 rounded-full object-cover shadow-md cursor-pointer"
        onClick={goHome}
      />
    </header>
  );
};

export default Navbar;
