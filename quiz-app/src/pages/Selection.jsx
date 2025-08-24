import React from "react";

export default function Selection({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  onStartQuiz,
}) {
  const buttonClass =
    "w-full text-white font-bold py-3 rounded-xl shadow-md transition-colors duration-300 bg-[#0C7D74] hover:bg-[#085F57]";

  return (
    <div className="flex flex-col gap-6 text-gray-900">
      <h1
        className="text-4xl font-bold text-center mb-8"
        style={{ color: "black" }}
      >
        Make a choice
      </h1>
      <div className="flex flex-col">
        <label
          htmlFor="category"
          className="text-lg font-medium text-gray-900 mb-2"
        >
          Categories
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border-none rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0C7D74]"
        >
          <option value="">-- Choose Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="difficulty"
          className="text-lg font-medium text-gray-900 mb-2"
        >
          Difficulty Level
        </label>
        <select
          id="difficulty"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="p-3 border-none rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0C7D74]"
        >
          <option value="">-- Choose Difficulty --</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button onClick={onStartQuiz} className={buttonClass}>
        Next
      </button>
    </div>
  );
}
