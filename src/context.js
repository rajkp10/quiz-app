import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";

const API = "https://opentdb.com/api.php?";

const categoryTable = {
  film: 11,
  sports: 21,
  history: 23,
  politics: 24,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const nextQuestion = () => {
    const newIndex = index + 1;
    if (newIndex === questions.length - 1) {
      console.log("hll");
      setOpenModal(true);
    }
    if (newIndex !== questions.length) {
      setIndex(newIndex);
    }
  };

  const checkAnswer = (status) => {
    if (status) {
      setCorrect(correct + 1);
    }
    console.log(correct);
    nextQuestion();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { amount, category, difficulty } = quiz;
    const URL = `${API}amount=${amount}&difficulty=${difficulty}&category=${categoryTable[category]}&type=multiple`;
    const res = await axios.get(URL).catch((err) => setError(true));
    const data = res.data.results;
    if (data.length > 0) {
      setQuestions(res.data.results);
      setLoading(false);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Please try different values",
        status: "error",
        isClosable: true,
      });
    }
    setError(false);
  }, [error]);

  return (
    <AppContext.Provider
      value={{
        quiz,
        loading,
        error,
        questions,
        index,
        correct,
        openModal,
        handleChange,
        handleSubmit,
        checkAnswer,
        nextQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
