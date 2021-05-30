import React from "react";
import { RegisterForm } from "../components/RegisterForm";
import { Flex, Heading } from "@chakra-ui/react";

export const RegisterView: React.FC = () => {
  return (
    <Flex minHeight="calc(100vh - 50px)" alignItems="center" justifyContent="center" bgColor='#BFA5A4'>
      <Flex
        width="100%"
        maxWidth="500px"
        alignItems="center"
        flexDirection="column"
        p={6}
      >
        <Heading mb={6}>
          Hello, Sign Up or Log In
        </Heading>
        <RegisterForm />
      </Flex>
    </Flex>
  );
};
