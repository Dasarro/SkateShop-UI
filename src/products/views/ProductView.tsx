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
import { OrderProductForm } from '../components/OrderProductForm';
import { getImage } from '../../common/helpers/getImage';
import { RecommendedProducts } from '../components/RecommendedProducts';

export const ProductView: React.FC = () => {

    const { productId } = useParams<{ productId: string }>();
    const { product, fetchProduct } = useProduct(parseInt(productId));
    const { categoryProducts, fetchRandomCategoryProducts } = useCategoryProducts();

    useEffect(() => {
        fetchProduct();
        fetchRandomCategoryProducts(parseInt(productId));
    }, []);

    return (
        <Flex flexDirection='column' bgColor='#BFA5A4'>
            <Navbar />
            <Flex flexDirection='column' minHeight='calc(100vh - 50px)' pb={12}>
                <Heading color='#574240' textAlign='center' pt={5} pb='60px' fontSize='80px'>
                    <Text>{product?.name}</Text>
                </Heading>
                <Flex justifyContent='center'>
                    <Flex justifyContent='space-between'
                        p={5}
                        bgColor='#a88b8a'
                        border='10px solid #574240'
                        fontSize='20px'>
                        <Image boxSize='256px' src={getImage(product?.category.name)} border='15px solid #574240'/>
                        <Flex flexDirection='column' justifyContent='space-between' px={10}>
                            <Text>{product?.description}</Text>
                            <OrderProductForm productId={product?.id}
                                              price={product?.price}
                                              discount={product?.discount}/>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <RecommendedProducts products={categoryProducts}/>
        </Flex>

    );
}
