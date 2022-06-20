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
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useGlobalContext } from "../context";

function Questions() {
  const {
    loading,
    error,
    questions,
    index,
    correct,
    checkAnswer,
    nextQuestion,
    openModal,
  } = useGlobalContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    error && navigate("/", { replace: true });
    // questions.length === 0 && navigate("/", { replace: true });
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  const { question, correct_answer, incorrect_answers } = questions[index];

  const options = [...incorrect_answers, correct_answer];
  options.sort(() => Math.random() - 0.5);

  return (
    <VStack minH="100vh" w="100%" justifyContent="center" bg="gray.50">
      <VStack
        w={{ base: "90%", md: "80%", lg: "50%" }}
        p={4}
        my={4}
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
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        motionPresent="slideInBottom"
        isCentered
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>
            <Heading>Result</Heading>
          </ModalHeader>
          <ModalBody>
            <Text fontSize="2xl">
              You got{" "}
              <strong>
                {((correct / questions.length) * 100).toPrecision(2)}%
              </strong>{" "}
              answers right !!!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => navigate("/", { replace: true })}
            >
              Try Again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default Questions;
