import React from 'react';
import { Flex, Heading } from "@chakra-ui/react";
import image from '../../images/header.png'


export const Header: React.FC = () => {
    return (
        <Flex justifyContent='center'
              alignItems='center'
              width='100%'
              height='500px'
              bgImage={`url(${image})`}>
            <Heading color='white' fontSize='128px' textShadow='-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'>
                SkatePassion.com
            </Heading>
        </Flex>
    );
}
