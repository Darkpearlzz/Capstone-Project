import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-4 right-6 flex space-x-6">
      <a
        href="https://x.com/darkpearlzz"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-white transition"
      >
        <i className="bi bi-twitter text-2xl"></i>
      </a>
      <a
        href="https://www.linkedin.com/in/rhodaugboro"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-white transition"
      >
        <i className="bi bi-linkedin text-2xl"></i>
      </a>
      <a
        href="https://github.com/Darkpearlzz"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-white transition"
      >
        <i className="bi bi-github text-2xl"></i>
      </a>
    </footer>
  );
};

export default Footer;
