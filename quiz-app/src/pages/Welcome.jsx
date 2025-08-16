import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-between h-screen text-center"
      style={{ backgroundColor: "#FFAE00" }}
    >
      {/* Center Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Logo/Icon */}
        <div className="mb-6">
           <i className="bi bi-patch-question text-black text-9xl"></i>
        </div>

        {/* App Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-black">
          The Quiz Corner
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl mt-2 text-black font-medium">
          Where fun meets knowledge
        </p>

        {/* Start Quiz Button */}
        <button
          onClick={() => navigate("/selection")}
          className="mt-6 px-6 py-3 text-lg rounded-full shadow-lg transition 
                    text-black hover:text-white"
          style={{
            backgroundColor: "#0C7D74",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#085F57")} // darker teal
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0C7D74")}
        >
          Start Quiz
        </button>

      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default Welcome;
