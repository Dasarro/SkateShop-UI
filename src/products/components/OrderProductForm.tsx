import React from "react";
import {
  Flex,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Routes } from '../../routing/routes';
import { createBrowserHistory } from 'history';
import { PriceHolder } from "./PriceHolder";

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
  const history = createBrowserHistory({ forceRefresh: true });
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = ({productQuantity}: Inputs) => {
    const quantity = parseInt(productQuantity);
    let products: StoredProduct[];
    const basket = localStorage.getItem('basket');
    basket !== null && basket !== '' ? products = JSON.parse(basket)
                                     : products = [];
    if (productId === undefined) return;

    const product = products.find(product => product.productId === productId);
    if (product) {
      product.quantity += quantity;
      localStorage.setItem('basket', JSON.stringify(products));
      history.push(Routes.BASKET);
      return;
    }

    products.push({productId, quantity})
    localStorage.setItem('basket', JSON.stringify(products));
    history.push(Routes.BASKET);
  };

  return (
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection='column'>
            <PriceHolder price={price} discount={discount}/>
            <Flex justifyContent='space-between' alignItems='center'>
              <NumberInput min={1}
                           defaultValue={1}>
                <NumberInputField {...register('productQuantity')}/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button type='submit' ml={4} bgColor='#574240' color='white'>Add to basket</Button>
            </Flex>
          </Flex>
        </form>
    
  );
};
