import React from 'react';
import {
    Flex,
    Heading
} from "@chakra-ui/react";

export const OrderRedirectionView: React.FC = () => {
    return (
        <Flex flexDirection='column'>
            <Flex height='calc(100vh - 50px)' alignItems='center' justifyContent='center' bgColor='#BFA5A4'>
                <Heading color='#574240'>Thanks for your order! Now you will be redirected...</Heading>
            </Flex>
        </Flex>

    );
}
