import React from 'react';
import { getImagePath } from '../../common/helpers/imagePath';
import { 
    VStack,
    Image,
    Flex,
    Text } from "@chakra-ui/react";
import logo from '../../bearings.jpg'

interface Props {
    category: string;
    price: number;
    discount: number;
}

export const ProductCard: React.FC<Props> = ({ category, price, discount }) => {
    const priceFinal = price - price * 0.01 * discount;
    return (
        <Flex flexDirection='column' p={3} bgColor='#574240' mx={5}>
            <Image boxSize="100px" src={logo}/>
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
        </Flex>
    );
}
