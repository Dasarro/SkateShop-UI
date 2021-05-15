import React, { useEffect } from 'react';
import { 
    Button,
    Flex,
    Heading,
    Image,
    Text,
} from "@chakra-ui/react";
import { Navbar } from '../../common/components/Navbar';
import { useParams } from "react-router-dom";
import { useCategoryProducts, useProduct } from '../../common/hooks/useProducts';
import logo from '../../bearings.jpg'
import { OrderProductForm } from '../components/OrderProductForm';

export const ProductView: React.FC = () => {

    const { productId } = useParams<{ productId: string }>();
    const { product, fetchProduct } = useProduct(parseInt(productId));
    // let categoryProducts, fetchCategoryProducts;
    // categoryProducts = useCategoryProducts(product.category.categoryId).categoryProducts;
    // fetchCategoryProducts = useCategoryProducts(product.category.categoryId).fetchCategoryProducts;

    useEffect(() => {
        fetchProduct();
        // if (product) {
        //     fetchCategoryProducts();
        // }
    }, []);

    return (
        <Flex flexDirection='column' bgColor='#BFA5A4' minHeight='100vh'>
            <Navbar />
            <Heading color='#574240' textAlign='center' pt={5} pb='60px' fontSize='80px'>
                <Text>{product?.name}</Text>
            </Heading>
            <Flex justifyContent='space-between'>
                <Flex bgColor='#574240'
                        height='286px'
                        width='286px'
                        alignItems='center'
                        justifyContent='center'
                        ml='10%'>
                    <Image boxSize="256px" src={logo} />
                </Flex>
                <Flex flexDirection='column' justifyContent='space-between' p={10} mr='10%'>
                    <Text>{product?.description}</Text>
                    <OrderProductForm productId={product?.id}
                                      price={product?.price}
                                      discount={product?.discount}/>
                </Flex>
            </Flex>
        </Flex>

    );
}
