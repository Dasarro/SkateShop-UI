import React from 'react';
import { 
    Flex,
    Heading,
    SimpleGrid
} from "@chakra-ui/react";
import { CategoryProductCard } from './CategoryProductCard';
import { Product } from '../../common/api/types';

interface Props {
    products: Product[]
}

export const ProductHolder: React.FC<Props> = ({ products }) => {
    return (
        <Flex width='100%'
              minHeight='100vh'
              bgColor='#BFA5A4'
              p={4}
              flexWrap='wrap'
              justifyContent='space-between'>
            {products.map(({id, category, price, discount, name}) => (
                <CategoryProductCard id={id}
                                     category={category.name}
                                     price={price} 
                                     discount={discount}
                                     name={name}/>
            ))}
        </Flex>
    );
}
