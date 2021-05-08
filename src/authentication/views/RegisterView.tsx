import React from "react";
import { RegisterForm } from "../components/RegisterForm";
import { Flex, Heading } from "@chakra-ui/react";

export const RegisterView: React.FC = () => {
  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center" m={6}>
      <Flex
        width="100%"
        maxWidth="500px"
        alignItems="center"
        flexDirection="column"
      >
        <Heading mb={6}>
          Hello, Sign Up or Log In
        </Heading>
        <RegisterForm />
      </Flex>
    </Flex>
  );
};
