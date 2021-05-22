import React from 'react';
import { 
    Flex
} from "@chakra-ui/react";
import { BasketProductCard } from './BasketProductCard';
import { Product } from '../../common/api/types';

interface StoredProduct {
    productId: number;
    quantity: number;
}

interface Props {
    products: Product[];
    basketProducts: StoredProduct[];
}

export const BasketProductHolder: React.FC<Props> = ({ products, basketProducts }) => {
    return (
        <Flex flexDirection='column'
              width='100%'
              bgColor='#BFA5A4'
              justifyContent='space-between'>
            {products.map(({id, price, discount, name, category}) => {
                const basketProduct = basketProducts.find(product => product.productId === id);
                const quantity = basketProduct ? basketProduct.quantity : 0;

                return <BasketProductCard id={id}
                                          key={id}
                                          name={name}
                                          price={price} 
                                          discount={discount}
                                          quantity={quantity}
                                          categoryName={category.name}
                />
            })}
        </Flex>
    );
}
