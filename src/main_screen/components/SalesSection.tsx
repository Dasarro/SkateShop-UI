import React from 'react';
import { 
    Flex,
    Heading } from "@chakra-ui/react";
import { Product } from '../../common/api/types';
import { MiniProductCard } from '../../common/components/MiniProductCard';

interface Props {
    products: Product[]
}

export const SalesSection: React.FC<Props> = ({ products }) => {
    return (
        <Flex width='100%' bgColor='#DC143C' p={4}>
            <Heading display='flex' alignItems='center' color='white' fontSize='64px' width='200px' mr={10}>SALES</Heading>
            {products.map(product => (
                <MiniProductCard id={product.id}
                                 key={product.id}
                                 category={product.category.name}
                                 price={product.price} 
                                 discount={product.discount} />
            ))}
        </Flex>
    );
}
