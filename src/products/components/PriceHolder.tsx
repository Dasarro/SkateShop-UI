import React from 'react';
import {
    Flex,
    Text
} from "@chakra-ui/react";
import { getFinalPrice, formatPrice } from '../../common/helpers/priceOperations';

interface Props {
    price: number | undefined;
    discount: number | undefined;
}

export const PriceHolder: React.FC<Props> = ({price, discount}) => {
    if (price === undefined || discount === undefined) return <></>
    const finalPrice = getFinalPrice(price, discount);
    if (discount > 0) {
      return (
        <Flex alignSelf='flex-end' mb={4} fontSize='26px' fontWeight='semibold'>
            <Text color='#DC143C' textDecoration='line-through' mr={4}>
                {formatPrice(price)}
            </Text>
            <Text>
                {formatPrice(finalPrice)}
            </Text>
        </Flex>
      );
    } else {
        return (
            <Text alignSelf='flex-end' mb={4} fontSize='26px' fontWeight='semibold'>
              {formatPrice(finalPrice)}
            </Text>
        );
    }
}