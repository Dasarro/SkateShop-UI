import React from "react";
import { LoginForm } from "../components/LoginForm";
import { Flex, Heading } from "@chakra-ui/react";

export const LoginView: React.FC = () => {
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
          Log In to use the app
        </Heading>
        <LoginForm />
      </Flex>
    </Flex>
  );
};