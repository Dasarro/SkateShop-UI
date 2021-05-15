import React from 'react';
import logo from './logo.svg';
import { ChakraProvider } from "@chakra-ui/react";
import { RegisterView } from './authentication/views/RegisterView';
import { AppRouter } from './routing/AppRouter';
import { AuthProvider } from './authentication/context/AuthProvider';
const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
