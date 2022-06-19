import { Button, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { useGlobalContext } from "../context";

function Questions() {
  const { loading, questions, index, checkAnswer } = useGlobalContext();

  if (loading) {
    return <div>loading</div>;
  }
  const { question, correct_answer, incorrect_answers } = questions[index];

  const options = [...incorrect_answers, correct_answer];
  options.sort(() => Math.random() - 0.5);

  return (
    <VStack minH="100vh" w="100%" justifyContent="center" bg="gray.50">
      <VStack
        w={{ base: "90%", md: "80%", lg: "50%" }}
        p={4}
        bg="white"
        spacing={8}
        borderRadius="xl"
        boxShadow="md"
      >
        <Heading>{question}</Heading>
        <VStack w="100%" spacing={4}>
          {options.map((option, index) => {
            return (
              <Button w="100%" colorScheme="yellow" key={index}>
                {option}
              </Button>
            );
          })}
        </VStack>
        <Button alignSelf="flex-end" colorScheme="blue" onClick={checkAnswer}>
          Next Question
        </Button>
      </VStack>
    </VStack>
  );
}

export default Questions;
