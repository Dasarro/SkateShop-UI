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
import { useAuth } from '../../authentication/context/AuthProvider';
import { getToken } from '../../authentication/helpers/tokenStorage';
import jwt_decode from 'jwt-decode';
import { JwtPayload } from './../../common/api/types';


interface StoredProduct {
    productId: number;
    quantity: number;
}

export const BasketView: React.FC = () => {

    const { products, fetchSpecifiedProducts } = useProducts();
    const { isAuthenticated, logout } = useAuth();
    const history = createBrowserHistory({ forceRefresh: true });
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
        const jwtToken = getToken();
        let expired = true;
        if (jwtToken) {
            expired = jwt_decode<JwtPayload>(jwtToken).exp < Date.now() / 1000;
        }

        if (isAuthenticated && !expired) {
            await postOrder(basketProducts.map(product => [product.productId, product.quantity]));
            localStorage.setItem('basket', JSON.stringify([]));
            history.push(Routes.BASKET_REDIRECTION);
        } else {
            logout();
            history.push(Routes.LOGIN);
        }
    }

    useEffect(() => {
        fetchSpecifiedProducts(basketProducts.map(product => product.productId));
        localStorage.setItem('basket', JSON.stringify(basketProducts));
    }, [basketProducts]);

    return (
        <Flex flexDirection='column' bgColor='#BFA5A4' minHeight='100vh'>
            <Navbar />
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
