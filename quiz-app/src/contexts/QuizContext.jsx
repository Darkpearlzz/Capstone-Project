import React, { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    category: "",
    categoryName: "",
    difficulty: "",
    amount: 10,
    timePerQuestion: 30,
  });

  return (
    <QuizContext.Provider value={{ settings, setSettings }}>
      {children}
    </QuizContext.Provider>
  );
};
