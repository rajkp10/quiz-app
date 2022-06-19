import { Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

function Loader() {
  const variants = {
    hidden: { opacity: 1 },
    visible: {
      scale: [1, 1.5, 1.5, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      transition: {
        repeat: Infinity,
        duration: 2,
      },
    },
  };

  return (
    <VStack h="100vh" w="100%" justifyContent="center" bg="gray.50">
      <Box
        h="4rem"
        w="4rem"
        bg="yellow.400"
        as={motion.div}
        variants={variants}
        initial="hidden"
        animate="visible"
      ></Box>
    </VStack>
  );
}

export default Loader;
