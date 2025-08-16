import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Router>
      <Routes>
        {/* Welcome Page */}
        <Route path="/" element={<Welcome />} />

        {/* Placeholder routes for next stages */}
        <Route path="/selection" element={<div>Selection Page (coming soon)</div>} />
        <Route path="/quiz" element={<div>Quiz Page (coming soon)</div>} />
        <Route path="/result" element={<div>Result Page (coming soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
