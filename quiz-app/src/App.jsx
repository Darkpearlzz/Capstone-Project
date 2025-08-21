import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Selection from "./pages/Selection";
import { QuizProvider } from "./contexts/QuizContext";

function App() {
  return (
    <Router>
      <QuizProvider>
        <Routes>
          {/* Welcome Page */}
          <Route path="/" element={<Welcome />} />

          {/*Selection Page */}
          <Route path="/selection" element={<Selection />} />

          {/* Quiz Page placeholder */}
          <Route path="/quiz" element={<div>Quiz Page (coming soon)</div>} />

          {/* Result Page placeholder */}
          <Route
            path="/result"
            element={<div>Result Page (coming soon)</div>}
          />
        </Routes>
      </QuizProvider>
    </Router>
  );
}

export default App;
