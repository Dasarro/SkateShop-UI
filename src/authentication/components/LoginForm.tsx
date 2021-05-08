import React, { useState } from "react";
import {
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Routes } from '../../routing/routes';
import { useHistory } from "react-router-dom";

interface Inputs {
  login: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>();
  const [loginError, setLoginError] = useState<boolean>(false);
  const onSubmit = async (data: Inputs) => {
    await login(data.login, data.password).then((success) =>
      setLoginError(!success)
    );
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.login} isRequired>
        <FormLabel>Login</FormLabel>
        <Input
          type="text"
          placeholder="Enter email address or username"
          borderRadius={14}
          {...register('login', { required: 'This field is required! '})}
        />
        <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mt={3} isInvalid={!!errors.password} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter password"
          borderRadius={14}
          {...register('password', { required: 'This field is required! '})}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={loginError}>
        <FormErrorMessage>Wrong username/email or password!</FormErrorMessage>
      </FormControl>
      <Flex justifyContent="space-between" mt={6}>
        <Button
          type="submit"
          width="45%"
          borderRadius={14}
          isLoading={isSubmitting}
          _hover={{ transform: "scale(1.02)" }}
          _active={{ transform: "scale(1.02)" }}
        >
          Log In
        </Button>
        <Button
          width="45%"
          border="1px"
          borderRadius={14}
          _hover={{ transform: "scale(1.02)" }}
          _active={{ transform: "scale(1.02)" }}
          onClick={() => history.push(Routes.REGISTER)}
        >
          Sign Up
        </Button>
      </Flex>
    </form>
  );
};
