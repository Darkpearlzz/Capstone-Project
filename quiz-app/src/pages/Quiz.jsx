import React, { useEffect, useState } from "react";

export default function Quiz({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
  onTimeout,
  timePerQuestion = 30, // default 30 seconds
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [remaining, setRemaining] = useState(timePerQuestion);

  // Reset selection + timer when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setRemaining(timePerQuestion);

    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          if (typeof onTimeout === "function") onTimeout();
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [question, timePerQuestion, onTimeout]);

  const buttonClass =
    "w-full text-white font-bold py-3 rounded-xl shadow-md transition-colors duration-300 bg-[#0C7D74] hover:bg-[#085F57]";
  const answerButtonBase =
    "w-full bg-white font-medium py-3 rounded-xl shadow-sm transition-colors duration-300 border";
  const answerButtonSelected = "border-[#0C7D74] bg-[#E6F4F3]";
  const answerButtonUnselected = "border-transparent hover:bg-gray-100";

  return (
    <div className="flex flex-col gap-6 text-gray-900">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Question {currentQuestionIndex + 1}/{totalQuestions}
        </h1>
        <div
          className="text-lg font-semibold px-3 py-1 rounded-lg"
          style={{ background: "white" }}
          aria-live="polite"
        >
          ⏲ {remaining}s
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-inner text-gray-900 text-lg text-center">
        {question.question}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {question.answers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          return (
            <button
              type="button"
              key={index}
              onClick={() => setSelectedAnswer(answer)}
              className={[
                answerButtonBase,
                isSelected ? answerButtonSelected : answerButtonUnselected,
              ].join(" ")}
            >
              {answer}
            </button>
          );
        })}
      </div>

      <div className="text-sm text-gray-500 text-center mt-2">
        <span className="font-bold">Category:</span> {question.category} |{" "}
        <span className="font-bold">Difficulty:</span> {question.difficulty}
      </div>

      {/* Submit only when an answer is selected; no skipping */}
      <button
        type="button"
        disabled={!selectedAnswer}
        onClick={() => onAnswer(selectedAnswer)}
        className={`${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Submit
      </button>
    </div>
  );
}
