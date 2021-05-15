import React from 'react';
import { 
    Flex,
    Heading } from "@chakra-ui/react";
import { Product } from '../../common/api/types';
import { ProductCard } from './ProductCard';

interface Props {
    discountedProducts: Product[]
}

export const SalesSection: React.FC<Props> = ({ discountedProducts }) => {
    return (
        <Flex width='100%' bgColor='#DC143C' p={4}>
            <Heading display='flex' alignItems='center' color='white' fontSize='64px' mr={10}>SALES</Heading>
            {discountedProducts.map(product => (
                <ProductCard id={product.id}
                             category={product.category.name}
                             price={product.price} 
                             discount={product.discount} />
            ))}
        </Flex>
    );
}
