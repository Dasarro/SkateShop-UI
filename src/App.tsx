import React from 'react';
import logo from './logo.svg';
import { ChakraProvider } from "@chakra-ui/react";
import { RegisterView } from './authentication/views/RegisterView';
import { AppRouter } from './routing/AppRouter';
import { AuthProvider } from './authentication/context/AuthProvider';
import { BasketProvider } from './basket/context/BasketProvider';
import { Navbar } from './common/components/Navbar';
const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BasketProvider>
          <Navbar />
          <AppRouter />
        </BasketProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
