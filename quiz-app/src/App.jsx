import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import Selection from "./pages/Selection";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

export default function App() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://opentdb.com/api_category.php");
        const data = await res.json();
        setCategories(data.trivia_categories || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const handleStartQuiz = async () => {
    if (!selectedCategory || !selectedDifficulty) {
      setError("Please choose a category and difficulty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setShowResults(false);
      setScore(0);
      setCurrentQuestionIndex(0);

      const url = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.response_code !== 0 || !Array.isArray(data.results)) {
        throw new Error("Invalid response from API");
      }

      const normalized = data.results.map((q) => {
        const decodedQuestion = decodeHtml(q.question);
        const decodedCorrect = decodeHtml(q.correct_answer);
        const decodedIncorrect = q.incorrect_answers.map((a) => decodeHtml(a));
        const answers = shuffleArray([decodedCorrect, ...decodedIncorrect]);
        return {
          question: decodedQuestion,
          answers,
          correctAnswer: decodedCorrect,
          category: q.category,
          difficulty: q.difficulty,
        };
      });

      setQuestions(normalized);
      setIsQuizStarted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    const current = questions[currentQuestionIndex];
    if (answer && answer === current.correctAnswer) {
      setScore((s) => s + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= questions.length) {
      setShowResults(true);
      setIsQuizStarted(false); // stop showing quiz
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handleTimeout = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= questions.length) {
      setShowResults(true);
      setIsQuizStarted(false);
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handleRestartQuiz = () => {
    setIsQuizStarted(false);
    setShowResults(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "#FFAE00" }}
    >
      {/* Global Navbar fixed at top-left (absolute) */}
      <div className="absolute top-4 left-4 z-50">
        <Navbar />
      </div>

      {/* Main centered area */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Loading / Error */}
          {loading && (
            <div className="text-center text-gray-800 text-lg mb-4">
              Loading...
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 text-lg mb-4">
              Error: {error}
            </div>
          )}

          {/* Welcome screen (shown first) */}
          {!hasSeenWelcome && !loading && !error && (
            <div>
              <Welcome onStart={() => setHasSeenWelcome(true)} />
            </div>
          )}

          {/* Selection screen (after welcome) */}
          {hasSeenWelcome &&
            !isQuizStarted &&
            !loading &&
            !error &&
            !showResults && (
              <div>
                <Selection
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedDifficulty={selectedDifficulty}
                  setSelectedDifficulty={setSelectedDifficulty}
                  onStartQuiz={handleStartQuiz}
                />
              </div>
            )}

          {/* Quiz screen */}
          {isQuizStarted && !showResults && questions.length > 0 && (
            <div>
              <Quiz
                question={questions[currentQuestionIndex]}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                onAnswer={handleAnswer}
                onTimeout={handleTimeout}
                timePerQuestion={15}
              />
            </div>
          )}

          {/* Results screen */}
          {showResults && (
            <div>
              <Results
                score={score}
                total={questions.length}
                onRetry={() => {
                  setScore(0);
                  setCurrentQuestionIndex(0);
                  setShowResults(false);
                  setIsQuizStarted(true);
                }}
                onChooseNew={() => {
                  setIsQuizStarted(false);
                  setShowResults(false);
                  setQuestions([]);
                  setCurrentQuestionIndex(0);
                  setScore(0);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer positioned at bottom-center but outside the card */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <Footer />
      </div>
    </div>
  );
}
