import React, { useEffect } from 'react';
import { 
    VStack,
    Image,
    Flex,
    Text } from "@chakra-ui/react";
import { useDiscountedProducts } from '../../common/hooks/useProducts';
import { Navbar } from '../../common/components/Navbar';
import { SalesSection } from '../components/SalesSection';
import { Header } from '../components/Header';
    
export const MainScreen: React.FC = () => {
    const { discountedProducts, fetchDiscountedProducts } = useDiscountedProducts();
    useEffect(() => {
        fetchDiscountedProducts();
    }, []);

    return (
        <Flex flexDirection='column'>
            <Navbar />
            <Header />
            <SalesSection discountedProducts={discountedProducts} />
        </Flex>
    );
}