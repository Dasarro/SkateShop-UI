import React from 'react';
import {
    Image,
    Flex,
    Text,
    Heading,
    Button
} from "@chakra-ui/react";
import { getImage } from '../../common/helpers/getImage';
import { getFinalPrice, formatPrice } from '../../common/helpers/priceOperations';
import { FaTrashAlt } from 'react-icons/fa';

interface Props {
    id: number;
    name: string;
    price: number;
    discount: number;
    quantity: number;
    categoryName: string;
}

interface StoredProduct {
    productId: number;
    quantity: number;
}

export const BasketProductCard: React.FC<Props> = ({id, name, price, discount, quantity, categoryName}) => {

    const finalPrice = getFinalPrice(price, discount);

    const changeQuantity = (value: number): void => {
        const basket = localStorage.getItem('basket');
        let products: StoredProduct[];
        basket !== null && basket !== '' ? products = JSON.parse(basket)
                                         : products = [];
        
        const productPosition = products.findIndex(product => product.productId === id);
        const product = products[productPosition];
        if (product) {
            const result = product.quantity + value;
            if (result <= 0) {
                products.splice(productPosition, 1);
            } else {
                product.quantity = result;
            }
            localStorage.setItem('basket', JSON.stringify(products));
            window.dispatchEvent(new Event('storage'));
        }
    }

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
                    <Button bgColor='#574240' color='white' mb={3} onClick={() => changeQuantity(1)}>+</Button>
                    <Button bgColor='#574240' color='white' onClick={() => changeQuantity(-1)}>-</Button>
                </Flex>
                <Button bgColor='#574240' color='white' mr={14} onClick={() => changeQuantity(-quantity)}><FaTrashAlt /></Button>
            </Flex>
            <Text width='15%' ml={5}>{formatPrice(quantity * finalPrice)}</Text>
        </Flex>
    )
}