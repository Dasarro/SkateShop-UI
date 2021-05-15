import React, { useState } from "react";
import {
  Flex,
  Text,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Routes } from '../../routing/routes';
import { useHistory } from "react-router-dom";

interface Inputs {
  productQuantity: string;
}

interface Props {
    productId: number | undefined;
    price: number | undefined;
    discount: number | undefined;
}

interface StoredProduct {
    productId: number;
    quantity: number;
}

export const OrderProductForm: React.FC<Props> = ({productId, price, discount}) => {
  const history = useHistory();
  const { register, handleSubmit } = useForm<Inputs>();
  const [productQuantity, setProductQuantity] = useState('1');

  const onSubmit = ({productQuantity}: Inputs) => {
    console.log(productQuantity);
    const quantity = parseInt(productQuantity);
    let products: Array<StoredProduct>;
    const storage = localStorage.getItem('basket');
    storage !== null && storage !== '' ? products = JSON.parse(storage)
                                       : products = [];
    if (productId === undefined) return;

    for (const product of products) {
        if (product.productId === productId) {
            product.quantity += quantity;
            localStorage.setItem('basket', JSON.stringify(products));
            return;
        }
    }

    products.push({productId, quantity})
    localStorage.setItem('basket', JSON.stringify(products));

  };

  return (
    
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <Flex justifyContent='space-between' alignItems='center'>
                <Text>{price !== undefined && discount !== undefined ? price - price * 0.01 * discount : ''}</Text>
                <NumberInput {...register('productQuantity')}
                             onChange={(valueString) => setProductQuantity(valueString)}
                             value={productQuantity}
                             min={1}
                             defaultValue={1}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Button type='submit'>Add to basket</Button>
            </Flex>
        </form>
    
  );
};
