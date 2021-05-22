import React, { useEffect } from 'react';
import { 
    Button,
    Flex,
    Heading,
    Image,
    Text,
} from "@chakra-ui/react";
import { Navbar } from '../../common/components/Navbar';
import { useProducts } from '../../common/hooks/useProducts';
import { BasketProductHolder } from '../components/BasketProductHolder';
import { Product } from './../../common/api/types';
import { BasketHeader } from '../components/BasketHeader';
import { getFinalPrice, formatPrice } from './../../common/helpers/priceOperations';
import { postOrder } from '../../common/api/ordersAPI';
import { useState } from 'react';

interface StoredProduct {
    productId: number;
    quantity: number;
}

export const BasketView: React.FC = () => {

    const { products, fetchSpecifiedProducts } = useProducts();

    const basket = localStorage.getItem('basket');
    const [basketProducts, setBasketProducts] = useState<StoredProduct[]>(basket !== null && basket !== '' ? JSON.parse(basket) : []);

    const calculateCost = (): number => {
        let cost = 0;
        products.forEach(({id, price, discount}) => {
            const basketProduct = basketProducts.find(x => x.productId === id);
            if (basketProduct) {
                cost += basketProduct.quantity * getFinalPrice(price, discount);
            }
        });
        return cost;
    }

    const submitOrder = async () => {
        await postOrder(basketProducts.map(product => [product.productId, product.quantity]));
    }

    const onStorage = () => {
        const basket = localStorage.getItem('basket');
        basket !== null && basket !== '' ? setBasketProducts(JSON.parse(basket))
                                         : setBasketProducts([]);
        console.log('siema eniu')
    }

    useEffect(() => {
        window.addEventListener('storage', onStorage);
        window.dispatchEvent(new Event('storage'));
        return (() => {
            window.removeEventListener('storage', onStorage);
        })
    }, []);

    useEffect(() => {
        fetchSpecifiedProducts(basketProducts.map(product => product.productId));
    }, [basketProducts]);

    return (
        <Flex flexDirection='column' bgColor='#BFA5A4' minHeight='100vh'>
            <Navbar />
            <BasketHeader />
            <BasketProductHolder products={products}
                                 basketProducts={basketProducts} />
            <Flex flexDirection='row-reverse'
                  mx='10%' 
                  color='#574240'
                  fontSize='36px'
                  fontWeight='semibold'>
                {`Total cost: ${formatPrice(calculateCost())}`}
            </Flex>
            <Flex flexDirection='row-reverse'
                  mx='10%'
                  mb={5}>
                <Button color='#574240'
                        fontSize='36px'
                        fontWeight='semibold'
                        p={7}
                        onClick={submitOrder}>CHECKOUT</Button>
            </Flex>
        </Flex>

    );
}
