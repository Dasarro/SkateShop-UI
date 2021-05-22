import React, { useState, useEffect } from 'react';
import { 
    Flex,
    Select,
    Button,
    Text
} from "@chakra-ui/react";
import { useCategories } from '../hooks/useCategories';
import { createBrowserHistory } from 'history';
import { Routes } from '../../routing/routes';
import { FaHome, FaShoppingBasket } from 'react-icons/fa';
import { useProducts } from '../hooks/useProducts';
import { Product } from './../api/types';
import { formatPrice } from '../helpers/priceOperations';

interface StoredProduct {
    productId: number;
    quantity: number;
}

export const Navbar: React.FC = () => {
    const { categories, fetchCategories } = useCategories();
    const { products, fetchProducts } = useProducts();
    const history = createBrowserHistory({ forceRefresh: true });

    const basket = localStorage.getItem('basket');
    let basketProducts: StoredProduct[];
    basket !== null && basket !== '' ? basketProducts = JSON.parse(basket)
                                     : basketProducts = [];

    let filteredProducts: Product[];

    filteredProducts = products.filter(product => (
        basketProducts.some(basketProduct => basketProduct.productId === product.id)
    ));

    const calculateCost = (): number => {
        let cost = 0;
        filteredProducts.forEach(({id, price, discount}) => {
            const basketProduct = basketProducts.find(x => x.productId === id);
            if (basketProduct) {
                cost += basketProduct.quantity * (price - price * 0.01 * discount);
            }
        });
        return cost;
    }

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    return (
        <Flex width='100%' height='50px' bgColor='black' justifyContent='space-between'>
            <Flex alignItems='center'>
                <Button bgColor='black' onClick={() => history.push(Routes.HOME)}>
                    <FaHome color='white' />
                </Button>
                <Select
                    width='fit-content'
                    variant='filled'
                    icon={<></>}
                    placeholder='Skateboard parts'
                    color='white'
                    bg='black'
                    onChange={({target: { value }}) => (
                        history.push(`/category/${value}`)
                    )}>
                    {categories.map(({categoryId, name}) => (
                        <option value={categoryId}
                                style={{backgroundColor: 'black'}}>
                            {name}
                        </option>
                    ))}
                </Select>
            </Flex>

            <Flex alignItems='center'>
                <Button bgColor='black' color='white' onClick={() => history.push(Routes.BASKET)}>
                    <FaShoppingBasket />
                    <Text ml={3}>{formatPrice(calculateCost())}</Text>
                </Button>
            </Flex>
        </Flex>
        
    );
}
