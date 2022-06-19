import React from "react";
import {
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

function Home() {
  const navigate = useNavigate();
  const { quiz, handleChange, handleSubmit } = useGlobalContext();

  return (
    <VStack minH="100vh" w="100%" justifyContent="center" bg="gray.50">
      <VStack
        w={{ base: "90%", md: "80%", lg: "50%" }}
        spacing={8}
        p={4}
        bg="white"
        borderRadius="xl"
        boxShadow="md"
      >
        <Heading>Quiz</Heading>
        <FormControl>
          <FormLabel htmlFor="">Number of Questions</FormLabel>
          <Select
            variant="filled"
            bg="yellow.400"
            name="amount"
            value={quiz.amount}
            onChange={handleChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="">Category</FormLabel>
          <Select
            variant="filled"
            bg="yellow.400"
            name="category"
            value={quiz.category}
            onChange={handleChange}
          >
            <option value="sports">Sports</option>
            <option value="history">History</option>
            <option value="politics">Politics</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="">Difficulty</FormLabel>
          <Select
            variant="filled"
            bg="yellow.400"
            name="difficulty"
            value={quiz.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </FormControl>
        <Button
          colorScheme="blue"
          onClick={(e) => {
            handleSubmit(e);
            navigate("/questions");
          }}
        >
          Start
        </Button>
      </VStack>
    </VStack>
  );
}

export default Home;
