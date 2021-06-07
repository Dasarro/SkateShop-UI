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
import { IoIosStats } from 'react-icons/io';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../helpers/priceOperations';
import { getFinalPrice } from './../helpers/priceOperations';
import { useAuth } from '../../authentication/context/AuthProvider';
import { StoredProduct } from './../api/types';
import { useBasket } from './../../basket/context/BasketProvider';

export const Navbar: React.FC = () => {
    const { categories, fetchCategories } = useCategories();
    const { calculateCost } = useBasket();
    const history = createBrowserHistory({ forceRefresh: true });

    const { isAuthenticated, logout } = useAuth();

    const onLogout = () => {
        logout();
        history.push(Routes.HOME);
    }

    useEffect(() => {
        fetchCategories();
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
                    color='white'
                    bg='black'
                    onChange={({target: { value }}) => (
                        history.push(`/category/${value}`)
                    )}>
                    <option selected
                            disabled
                            hidden
                            style={{backgroundColor: 'black'}}>
                        Skateboard parts
                    </option>
                    {categories.map(({categoryId, name}) => (
                        <option key={categoryId}
                                value={categoryId}
                                style={{backgroundColor: 'black'}}>
                            {name}
                        </option>
                    ))}
                </Select>
                <Button bgColor='black' onClick={() => history.push(Routes.STATISTICS)}>
                    <IoIosStats color='white' />
                </Button>
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
