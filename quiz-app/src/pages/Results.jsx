import React from "react";

export default function Results({
  score = 0,
  total = 0,
  onRetry,
  onChooseNew,
}) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-gray-900">
      <h1 className="text-4xl font-bold text-center pb-6">Quiz Completed</h1>

      <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
        Your Score: {score} / {total}
      </p>

      <p className="text-4x1 text-gray-800 mt-6 mb-6">
        {percent >= 80
          ? "🎉 Excellent! You're rocking it 🎉"
          : percent >= 50
          ? "Nice work — some room to improve 👍"
          : "Keep practicing — you'll get better 💪"}
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onRetry}
          className="px-6 py-2 rounded-xl shadow-md transition-colors duration-300 text-black hover:text-white bg-[#0C7D74] hover:bg-[#085F57] "
        >
          Retry
        </button>

        <button
          onClick={onChooseNew}
          className="px-6 py-2 rounded-xl shadow-md transition-colors duration-300 text-black hover:text-white bg-[#0C7D74] hover:bg-[#085F57]"
        >
          Choose new topic
        </button>
      </div>
    </div>
  );
}
