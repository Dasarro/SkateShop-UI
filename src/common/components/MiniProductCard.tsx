import React from 'react';
import { 
    VStack,
    Image,
    Flex,
    Text } from "@chakra-ui/react";
import { Routes } from '../../routing/routes';
import { getImage } from '../helpers/getImage';
import { getFinalPrice } from '../helpers/priceOperations';

interface Props {
    id: number;
    category: string;
    price: number;
    discount: number;
}

export const MiniProductCard: React.FC<Props> = ({ id, category, price, discount }) => {
    const priceFinal = getFinalPrice(price, discount);
    const productURL = Routes.PRODUCT.replace(':productId', id.toString());
    return (
        <Flex flexDirection='column' p={3} bgColor='#574240' mx={5}>
            <a href={productURL}>
                <Image boxSize="100px" src={getImage(category)}/>
                {discount !== 0 ? (
                    <Flex flexDirection='row' justifyContent='space-between' px={2}>
                        <Flex flexDirection='column'>
                            <Text textDecoration='line-through' color='red'>
                                {price}
                            </Text>
                            <Text color='#BFA5A4'>
                                {priceFinal}
                            </Text>
                        </Flex>
                        <Flex alignItems='center' color='red'>
                            {`-${discount}%`}
                        </Flex>
                    </Flex>
                ) : (
                    <Flex color='#BFA5A4'>
                        {price}
                    </Flex>
                )}
            </a>
        </Flex>
    );
}
