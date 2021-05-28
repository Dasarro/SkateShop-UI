import React from 'react';
import {
    Image,
    Flex,
    Text,
    Button
} from "@chakra-ui/react";
import { getImage } from '../../common/helpers/getImage';
import { getFinalPrice, formatPrice } from '../../common/helpers/priceOperations';
import { FaTrashAlt } from 'react-icons/fa';
import { Product } from '../../common/api/types';

interface Props {
    product: Product;
    quantity: number;
    onQuantityChange: (value: number) => void;
}

export const BasketProductCard: React.FC<Props> = ({product: {name, price, discount, category: {name: categoryName}}, quantity, onQuantityChange}) => {

    const finalPrice = getFinalPrice(price, discount);

    return (
        <Flex mx='10%' bgColor='#FFF' mb={5} p={2} alignItems='center' fontSize='26px' color='#574240' fontWeight='semibold'>
            <Flex width='45%' alignItems='center'>
                <Flex bgColor='#574240'
                        height='112px'
                        width='112px'
                        alignItems='center'
                        justifyContent='center'>
                    <Image boxSize='100px' src={getImage(categoryName)} />
                </Flex>
                <Text ml={5}>{name}</Text>
            </Flex>
            <Text width='15%' ml={5}>{formatPrice(finalPrice)}</Text>
            <Flex width='25%' ml={5} alignItems='center' justifyContent='space-between'>
                <Text>{quantity}</Text>
                <Flex flexDirection='column'>
                    <Button bgColor='#574240' color='white' mb={3} onClick={() => onQuantityChange(1)}>+</Button>
                    <Button bgColor='#574240' color='white' onClick={() => onQuantityChange(-1)}>-</Button>
                </Flex>
                <Button bgColor='#574240' color='white' mr={14} onClick={() => onQuantityChange(-quantity)}><FaTrashAlt /></Button>
            </Flex>
            <Text width='15%' ml={5}>{formatPrice(quantity * finalPrice)}</Text>
        </Flex>
    )
}