import React, { useEffect, useState, useRef } from "react";

export default function Quiz({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
  onTimeout,
  timePerQuestion = 15,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [remaining, setRemaining] = useState(timePerQuestion);
  const [showFeedback, setShowFeedback] = useState(false);

  const timerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const FEEDBACK_DELAY = 1500; // ms

  // helper to check correct answer
  const isCorrect = (answer) => answer === question.correctAnswer;

  useEffect(() => {
    // reset state when question changes
    setSelectedAnswer(null);
    setRemaining(timePerQuestion);
    setShowFeedback(false);

    // clear any existing timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }

    // start countdown
    timerRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          // time's up: stop timer, reveal correct answer, then call onTimeout after delay
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setShowFeedback(true);
          feedbackTimeoutRef.current = setTimeout(() => {
            if (typeof onTimeout === "function") onTimeout();
            feedbackTimeoutRef.current = null;
          }, FEEDBACK_DELAY);
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = null;
      }
    };
  }, [question, timePerQuestion, onTimeout]);

  const handleSubmit = () => {
    if (!selectedAnswer || showFeedback) return;

    // stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // show feedback (green/red)
    setShowFeedback(true);

    // after delay, notify parent of the chosen answer (parent handles scoring + advance)
    feedbackTimeoutRef.current = setTimeout(() => {
      if (typeof onAnswer === "function") onAnswer(selectedAnswer);
      feedbackTimeoutRef.current = null;
    }, FEEDBACK_DELAY);
  };

  const buttonClass =
    "w-full text-white font-bold py-3 rounded-xl shadow-md transition-colors duration-300 bg-[#0C7D74] hover:bg-[#085F57]";
  const answerButtonBase =
    "w-full font-medium py-3 rounded-xl shadow-sm transition-colors duration-300 border flex items-center justify-between px-4";
  const defaultUnselected =
    "bg-white text-gray-900 border-transparent hover:bg-gray-100";
  const selectedNeutral = "border-[#0C7D74] bg-[#E6F4F3] text-gray-900";
  const correctClass = "border-green-600 bg-green-100 text-green-800";
  const wrongClass = "border-red-600 bg-red-100 text-red-800";
  const dimmed = "opacity-70";

  const getAnswerClass = (answer) => {
    if (!showFeedback) {
      // before submission: visually highlight selected one
      return `${answerButtonBase} ${
        selectedAnswer === answer ? selectedNeutral : defaultUnselected
      }`;
    }

    // after submission/timeout: reveal correct & wrong
    if (isCorrect(answer)) {
      return `${answerButtonBase} ${correctClass}`;
    }
    if (answer === selectedAnswer && !isCorrect(answer)) {
      return `${answerButtonBase} ${wrongClass}`;
    }
    // other answers - dim
    return `${answerButtonBase} ${defaultUnselected} ${dimmed}`;
  };

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
        {(question.answers || []).map((answer, index) => {
          const chosen = selectedAnswer === answer;
          const disabled = showFeedback; // disable selection when feedback showing
          return (
            <button
              type="button"
              key={index}
              onClick={() => {
                if (showFeedback) return;
                setSelectedAnswer(answer);
              }}
              disabled={disabled}
              className={getAnswerClass(answer)}
            >
              <span>{answer}</span>

              {/* show check or cross during feedback */}
              {showFeedback && isCorrect(answer) && (
                <span className="ml-2 font-bold">✓</span>
              )}
              {showFeedback && chosen && !isCorrect(answer) && (
                <span className="ml-2 font-bold">✕</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="text-sm text-gray-500 text-center mt-2">
        <span className="font-bold">Category:</span> {question.category} |{" "}
        <span className="font-bold">Difficulty:</span> {question.difficulty}
      </div>

      <button
        type="button"
        disabled={!selectedAnswer || showFeedback}
        onClick={handleSubmit}
        className={`${buttonClass} ${
          !selectedAnswer || showFeedback ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Submit
      </button>
    </div>
  );
}
