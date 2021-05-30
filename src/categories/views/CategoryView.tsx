import React, { useEffect, useState } from 'react';
import { 
    Button,
    Flex,
    Heading,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Input,
    Select
} from "@chakra-ui/react";
import { Navbar } from '../../common/components/Navbar';
import { ProductHolder } from '../components/ProductHolder';
import { useParams } from "react-router-dom";
import { useCategoryProducts } from '../../common/hooks/useProducts';
import { useCategory } from './../../common/hooks/useCategories';
import { Product } from '../../common/api/types';
import { getFinalPrice } from '../../common/helpers/priceOperations';
import { useProducers } from './../../common/hooks/useProducers';

enum SortDirection {
    Ascending,
    Descending,
    None
}

export const CategoryView: React.FC = () => {

    const { categoryId } = useParams<{ categoryId: string }>();
    const { categoryProducts, fetchCategoryProducts } = useCategoryProducts();
    const { category, fetchCategory } = useCategory(parseInt(categoryId));
    const { producers, fetchProducers } = useProducers(); 

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const [nameFilter, setNameFilter] = useState('');
    const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.None);
    const [currentProducer, setCurrentProducer] = useState<string>('All');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');


    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetchCategoryProducts(parseInt(categoryId));
        fetchCategory();
        fetchProducers();
    }, []);

    useEffect(() => {
        if (filteredProducts?.length === 0 && categoryProducts) {
            setFilteredProducts(categoryProducts);
        }
    }, [categoryProducts]);

    useEffect(() => {
        filter();
    }, [nameFilter, sortDirection, currentProducer, minPrice, maxPrice])

    const filterByName = (event: React.FormEvent<HTMLInputElement>) => setNameFilter(event.currentTarget.value);

    const filterByMinPrice = (event: React.FormEvent<HTMLInputElement>) => setMinPrice(event.currentTarget.value);

    const filterByMaxPrice = (event: React.FormEvent<HTMLInputElement>) => setMaxPrice(event.currentTarget.value);

    const filter = () => {
        let tempFilteredProducts;

        tempFilteredProducts = categoryProducts.filter(product => (
            product.name.toLowerCase().includes(nameFilter.toLowerCase()))
        );

        if (sortDirection === SortDirection.Ascending) {
            tempFilteredProducts.sort((a, b) => (
                getFinalPrice(a.price, a.discount) - getFinalPrice(b.price, b.discount)
            ));
        } else if (sortDirection === SortDirection.Descending) {
            tempFilteredProducts.sort((a, b) => (
                getFinalPrice(b.price, b.discount) - getFinalPrice(a.price, a.discount)
            ));
        }

        if (currentProducer !== 'All') {
            tempFilteredProducts = tempFilteredProducts.filter(product => (
                product.producer.name === currentProducer
            ));
        }

        const min = !isNaN(parseFloat(minPrice)) ? parseFloat(minPrice) : 0;
        const max = !isNaN(parseFloat(maxPrice)) ? parseFloat(maxPrice) : Number.MAX_VALUE;

        tempFilteredProducts = tempFilteredProducts.filter(product => {
            const price = getFinalPrice(product.price, product.discount);
            return max >= price && price >= min;
        })

        setFilteredProducts(tempFilteredProducts);
    }

    return (
        <Flex flexDirection='column' bgColor='#BFA5A4'>
            <Heading color='#574240' textAlign='center' pt={5} pb='60px' fontSize='80px'>
                {category?.name}
            </Heading>
            <ProductHolder products={filteredProducts}/>
            <Button position='fixed' right='36px' bottom='10px' onClick={onOpen}>Filter</Button>
            <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Filters</DrawerHeader>
                    <DrawerBody>
                        <Flex flexDirection='column' mb={5}>
                            <Heading fontSize='md' mb={2}>Product name</Heading>
                            <Input value={nameFilter}
                                   onChange={filterByName}/>
                        </Flex>
                        <Flex flexDirection='column' mb={5}>
                            <Heading fontSize='md' mb={2}>Producer</Heading>
                            <Select width='100%'
                                    variant='filled'
                                    onChange={({target: { value }}) => setCurrentProducer(value)}
                                    value={currentProducer}>
                                    <option>All</option>
                                    {producers.map(({ name }) => (
                                        <option value={name}>
                                            {name}
                                        </option>
                                    ))}
                            </Select>
                        </Flex>
                        <Flex flexDirection='column' mb={5}>
                            <Heading fontSize='md' mb={2}>Price</Heading>
                            <Flex justifyContent='space-between' mb={3}>
                                <Button onClick={() => setSortDirection(SortDirection.Ascending)}>Ascending</Button>
                                <Button onClick={() => setSortDirection(SortDirection.Descending)}>Descending</Button>
                            </Flex>
                            <Input placeholder='min'
                                   value={minPrice}
                                   onChange={filterByMinPrice}
                                   mb={3}/>
                            <Input placeholder='max'
                                   value={maxPrice}
                                   onChange={filterByMaxPrice}/>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>

    );
}
