import React from 'react';
import {
    Image,
    Flex,
    Text,
    Heading
} from "@chakra-ui/react";
import { Routes } from '../../routing/routes';
import { getImage } from '../../common/helpers/getImage';
import { formatPrice } from '../../common/helpers/priceOperations';

interface Props {
    id: number;
    category: string;
    price: number;
    discount: number;
    name: string;
}

export const CategoryProductCard: React.FC<Props> = ({ id, category, price, discount, name }) => {
    const priceFinal = price - price * 0.01 * discount;
    const productURL = Routes.PRODUCT.replace(':productId', id.toString());
    return (
        <Flex flexDirection='column' p={3} bgColor='#574240' mx={5} mb={7} height='fit-content' fontSize='24px'>
            <a href={productURL}>
                <Image boxSize="256px" src={getImage(category)}/>
                <Heading textAlign='center' color='#BFA5A4'>{name}</Heading>
                {discount !== 0 ? (
                    <Flex flexDirection='row' justifyContent='space-between' px={2} height='72px'>
                        <Flex flexDirection='column'>
                            <Text textDecoration='line-through' color='#DC143C'>
                                {formatPrice(price)}
                            </Text>
                            <Text color='#BFA5A4'>
                                {formatPrice(priceFinal)}
                            </Text>
                        </Flex>
                        <Flex alignItems='center' color='#DC143C'>
                            {`-${discount}%`}
                        </Flex>
                    </Flex>
                ) : (
                    <Flex color='#BFA5A4' px={2} height='72px' alignItems='center' justifyContent='center'>
                        {formatPrice(price)}
                    </Flex>
                )}
            </a>
        </Flex>
    );
}
