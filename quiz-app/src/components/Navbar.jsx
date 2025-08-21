import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full flex items-center px-6 py-4 bg-transparent">
      {/* Logo */}
      <img
        src={logo}
        alt="App Logo"
        className="h-16 w-16 rounded-full object-cover shadow-md cursor-pointer"
        onClick={() => navigate("/")}
      />
    </header>
  );
};

export default Navbar;
