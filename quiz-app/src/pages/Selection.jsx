import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import { useQuiz } from "../contexts/QuizContext";
import Footer from "../components/Footer";

const difficulties = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const Selection = () => {
  const { categories, loading, error } = useCategories();
  const { setSettings } = useQuiz();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleNext = () => {
    setSettings((prev) => ({
      ...prev,
      category,
      categoryName,
      difficulty,
    }));
    navigate("/quiz");
  };

  const isValid = category && difficulty;

  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen text-center p-6"
      style={{ backgroundColor: "#FFAE00" }}
    >
      {/* Center Content */}
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-black">
          Make a choice
        </h1>

        {/* Category */}
        <div className="w-full mb-6">
          <label
            className="block text-lg mb-2 text-black text-left"
            htmlFor="category"
          >
            Categories
          </label>
          {loading ? (
            <div className="h-12 bg-gray-300 animate-pulse rounded-lg" />
          ) : error ? (
            <p className="text-red-700">Error loading categories</p>
          ) : (
            <select
              id="category"
              value={category}
              onChange={(e) => {
                const id = e.target.value;
                setCategory(id);
                const name = categories.find((c) => c.id == id)?.name || "";
                setCategoryName(name);
              }}
              className="w-full p-3 rounded-lg bg-gray-200"
            >
              <option value="">-- Select category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Difficulty */}
        <div className="w-full mb-6">
          <label
            className="block text-lg mb-2 text-black text-left"
            htmlFor="difficulty"
          >
            Difficulty Level
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-200"
          >
            <option value="">-- Select difficulty --</option>
            {difficulties.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Next Button */}
        <button
          onClick={() => navigate("/quiz")}
          className="mt-6 px-6 py-3 text-lg rounded-full shadow-lg transition text-black hover:text-white"
          style={{ backgroundColor: "#0C7D74" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#085F57")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0C7D74")}
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Selection;
