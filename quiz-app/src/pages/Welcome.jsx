import React from "react";

const Welcome = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Icon */}
      <div className="mb-4">
        <i className="bi bi-patch-question text-black text-9xl"></i>
      </div>

      {/* App Title */}
      <h1 className="text-5xl font-extrabold text-black text-center">
        The Quiz Corner
      </h1>

      {/* Subtitle */}
      <p className="text-lg mt-2 text-black font-medium text-center">
        Where fun meets knowledge
      </p>

      {/* Start Quiz Button */}
      <div className="mt-6">
        <button
          onClick={() => onStart && onStart()}
          className="px-6 py-3 text-lg rounded-full shadow-lg transition text-black hover:text-white bg-[#0C7D74] hover:bg-[#085F57]"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Welcome;
