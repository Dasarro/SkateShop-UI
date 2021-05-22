import axios from 'axios';
import { Order } from './types';

export const postOrder = (productsWithQuantities: [number, number][]): Promise<Order> => (
    axios.post('/api/Order/orders', productsWithQuantities)
         .then(response => response.data)
         .catch(() => null)
);