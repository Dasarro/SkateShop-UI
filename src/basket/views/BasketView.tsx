import React, { useEffect } from 'react';
import { 
    Button,
    Flex
} from "@chakra-ui/react";
import { Navbar } from '../../common/components/Navbar';
import { useProducts } from '../../common/hooks/useProducts';
import { BasketProductCard } from '../components/BasketProductCard';
import { BasketHeader } from '../components/BasketHeader';
import { getFinalPrice, formatPrice } from './../../common/helpers/priceOperations';
import { postOrder } from '../../common/api/ordersAPI';
import { useState } from 'react';
import { createBrowserHistory } from 'history';
import { Routes } from '../../routing/routes';
import { StoredProduct } from './../../common/api/types';
import { useBasket } from './../context/BasketProvider';

export const BasketView: React.FC = () => {

    const history = createBrowserHistory({ forceRefresh: true });
    const { products, basketProducts, calculateCost, setBasketProducts } = useBasket();

    const submitOrder = async () => {
        const order = await postOrder(basketProducts.map(product => [product.productId, product.quantity]));
        if (!order) return;
        
        localStorage.setItem('basket', JSON.stringify([]));
        history.push(Routes.BASKET_REDIRECTION);
    }

    return (
        <Flex flexDirection='column' bgColor='#BFA5A4' minHeight='100vh'>
            <BasketHeader />
            <Flex flexDirection='column'
                  width='100%'
                  bgColor='#BFA5A4'
                  justifyContent='space-between'>
                {products !== undefined && products.length > 0 && basketProducts.map(basketProduct => {
                    const product = products.find(product => product.id === basketProduct.productId);

                    const handleQuantityChange = (value: number) => {
                        basketProduct.quantity += value;
                        setBasketProducts(basketProducts.filter(basketProduct => basketProduct.quantity > 0));
                    }

                    return <BasketProductCard key={basketProduct.productId}
                                              quantity={basketProduct.quantity}
                                              product={product!}
                                              onQuantityChange={handleQuantityChange}
                            />
                })}
            </Flex>
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
