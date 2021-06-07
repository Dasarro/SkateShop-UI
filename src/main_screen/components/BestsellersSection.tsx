import React from 'react';
import { 
    Flex,
    Heading } from "@chakra-ui/react";
import { Product } from '../../common/api/types';
import { MiniProductCard } from '../../common/components/MiniProductCard';

interface Props {
    products: Product[]
}

export const BestsellersSection: React.FC<Props> = ({ products }) => {
    return (
        <Flex width='100%' bgColor='#BFA5A4' p={4}>
            <Heading display='flex' alignItems='center' color='white' fontSize='64px' mr={10} width='200px'>HOT</Heading>
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
