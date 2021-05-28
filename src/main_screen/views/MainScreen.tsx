import React, { useEffect } from 'react';
import { 
    VStack,
    Image,
    Flex,
    Text } from "@chakra-ui/react";
import { useProducts } from '../../common/hooks/useProducts';
import { Navbar } from '../../common/components/Navbar';
import { SalesSection } from '../components/SalesSection';
import { BestsellersSection } from '../components/BestsellersSection';
import { Header } from '../components/Header';
    
export const MainScreen: React.FC = () => {
    const { products: discountedProducts, fetchDiscountedProducts } = useProducts();
    const { products: bestsellingProducts, fetchBestsellingProducts } = useProducts();
    
    useEffect(() => {
        fetchDiscountedProducts();
        fetchBestsellingProducts();
    }, []);

    return (
        <Flex flexDirection='column'>
            <Navbar />
            <Header />
            <SalesSection products={discountedProducts} />
            <BestsellersSection products={bestsellingProducts} />
        </Flex>
    );
}