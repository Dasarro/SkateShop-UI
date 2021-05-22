import React, { useEffect } from 'react';
import { 
    Flex,
    Heading
} from "@chakra-ui/react";
import { Navbar } from '../../common/components/Navbar';
import { ProductHolder } from '../components/ProductHolder';
import { useParams } from "react-router-dom";
import { useCategoryProducts } from '../../common/hooks/useProducts';
import { useCategory } from './../../common/hooks/useCategories';

export const CategoryView: React.FC = () => {

    const { categoryId } = useParams<{ categoryId: string }>();
    const { categoryProducts, fetchCategoryProducts } = useCategoryProducts();
    const { category, fetchCategory } = useCategory(parseInt(categoryId));

    useEffect(() => {
        fetchCategoryProducts(parseInt(categoryId));
        fetchCategory();
    }, []);

    return (
        <Flex flexDirection='column' bgColor='#BFA5A4'>
            <Navbar />
            <Heading color='#574240' textAlign='center' pt={5} pb='60px' fontSize='80px'>
                {category?.name}
            </Heading>
            <ProductHolder products={categoryProducts}/>
        </Flex>

    );
}
