import {
  Button,
  Heading,
  VStack,
  HStack,
  Text,
  Spacer,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useGlobalContext } from "../context";

function Questions() {
  const {
    loading,
    questions,
    index,
    correct,
    checkAnswer,
    nextQuestion,
    openModal,
  } = useGlobalContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Heading dangerouslySetInnerHTML={{ __html: question }} />
        <VStack w="100%" spacing={4}>
          {options.map((option, index) => {
            return (
              <Button
                w="100%"
                colorScheme="yellow"
                key={index}
                onClick={(e) => {
                  checkAnswer(correct_answer === option);
                  if (openModal) {
                    console.log("hello");
                    onOpen();
                  }
                }}
              >
                {option}
              </Button>
            );
          })}
        </VStack>
        <HStack w="100%">
          <Text>
            {correct} / {index + 1}
          </Text>
          <Spacer />
          <Button
            alignSelf="flex-end"
            colorScheme="blue"
            onClick={nextQuestion}
          >
            {openModal ? "Submit Quiz" : "Next Question"}
          </Button>
        </HStack>
      </VStack>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalContent>
          <ModalHeader>Result</ModalHeader>
          <ModalBody>
            {correct} out of {index + 1}
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default Questions;
