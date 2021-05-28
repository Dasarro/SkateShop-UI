import React from 'react';
import { 
    Flex,
    Text
} from '@chakra-ui/react';


export const BasketHeader: React.FC = () => {
    return (
        <Flex bgColor='#574240' color='white' mx='10%' my={5} fontSize='36px' p={2}>
            <Text width='45%'>PRODUCT</Text>
            <Text width='15%'>PRICE</Text>
            <Text width='25%'>QUANTITY</Text>
            <Text width='15%'>TOTAL</Text>
        </Flex>
    );
}