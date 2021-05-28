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
import { FaHome, FaShoppingBasket, FaDoorOpen, FaUserCircle } from 'react-icons/fa';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../helpers/priceOperations';
import { getFinalPrice } from './../helpers/priceOperations';
import { useAuth } from '../../authentication/context/AuthProvider';

interface StoredProduct {
    productId: number;
    quantity: number;
}

export const Navbar: React.FC = () => {
    const { categories, fetchCategories } = useCategories();
    const { products, fetchSpecifiedProducts } = useProducts();
    const history = createBrowserHistory({ forceRefresh: true });

    const { isAuthenticated, logout } = useAuth();

    const basket = localStorage.getItem('basket');
    const [basketProducts, setBasketProducts] = useState<StoredProduct[]>(basket !== null && basket !== '' ? JSON.parse(basket) : [])

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

    const onLogout = () => {
        logout();
        history.push(Routes.HOME);
    }

    useEffect(() => {
        fetchCategories();
        fetchSpecifiedProducts(basketProducts.map(product => product.productId));
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
                {isAuthenticated ?
                    <Button bgColor='black' color='white' onClick={onLogout}>
                        <FaDoorOpen />
                    </Button> :
                    <Button bgColor='black' color='white' onClick={() => history.push(Routes.LOGIN)}>
                        <FaUserCircle />
                    </Button>
                }
            </Flex>
        </Flex>
        
    );
}
