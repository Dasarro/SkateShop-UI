import React, { useEffect } from 'react';
import { 
    Flex,
    Select,
    Button
} from "@chakra-ui/react";
import { useCategories } from '../hooks/useCategories';
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { Routes } from '../../routing/routes';
import { FaHome } from 'react-icons/fa';

export const Navbar: React.FC = () => {
    const { categories, fetchCategories } = useCategories();
    const history = createBrowserHistory({ forceRefresh: true })

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Flex width='100%' height='50px' bgColor='black' alignItems='center'>
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
    );
}
